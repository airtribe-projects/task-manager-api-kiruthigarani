
### Overview
**Task Manager API** is a small Express-based REST API that serves and manages a list of tasks stored in task.json. It's designed for learning and prototyping basic CRUD workflows (list, get, create, update, delete) plus simple filters (completed status, priority).

---

## ⚙️ Quick setup & run instructions

1. Clone or open the project repository  

2. Install dependencies: Express
   -`npm install express`

3. Make sure the server parses JSON bodies (required for POST/PUT), In index.js 
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   
4. Start the server:
   - Direct: `node index.js`
   - (Optional) Add a start script and use `npm start`:
    
5. Server runs by default on port **3000**:
   - URL: http://localhost:3000

> ⚠️ Note: Currently the API updates are made in-memory (pushed into the `tasks` array). New tasks are not persisted to disk unless you add explicit file write logic (see task_manager-apis.js for where to add `fs.writeFileSync`).

---

## 🔌 API Endpoints (documented)

Base: http://localhost:3000

All endpoints return JSON.

### 1) GET /tasks ✅
- Description: Return all tasks.
- Example:
   RestMethod : `GET http://localhost:3000/tasks`
---

### 2) GET /tasks/:id ✅
- Description: Return the task matching the numeric `:id`.
- Example:
  - RestMethod: `GET http://localhost:3000/tasks/2`
- Response:
  - 200 OK — task object
  - 200 OK with `{ message: "Task not found" }` if not found (current implementation returns a JSON message).

---

### 3) POST /addnewtask ✅
- Description: Create a new task (adds into in-memory array).
- Request body (JSON) — required fields per current validation:
  ```json
  {
    "id": 11,
    "title": "New Task",
    "description": "Description here",
    "completed": false,
    "priority": "low"
  }
  ```
  - **Important:** Current code requires `id` to be present (client-provided) and `completed` must be boolean (`true` or `false`).

- Response:
  - 201 or 200-like JSON success message (current code returns `{ message: "Task created successfully", newTask }`)
  - 400 Bad Request if required fields missing or `completed` is not boolean.

---

### 4) PUT /updatetask/:id ✅
- Description: Update the task with id `:id` (expects full data in body and `completed` boolean).
- Request body (JSON) — same validation as create (current code requires `id`, `title`, `description`, `completed`):
  ```json
  {
    "id": 2,
    "title": "Updated task",
    "description": "Updated description",
    "completed": true,
    "priority": "medium"
  }
  ```

- Response:
  - 200 OK with success message and updated tasks array
  - 400 Bad Request on validation failure
  - 200 with `{ message: "Task not found" }` when id not found

---

### 5) DELETE /deletetask/:id ✅
- Description: Delete a task by `id`.
- Example:
  - RestMethod: `DELETE http://localhost:3000/deletetask/3`
- Response:
  - 200 OK with `{ message: "Task deleted successfully", tasks }`
  - 200 with `{ message: "Task not found" }` if id not present

---

### 6) GET /filtertasks?completed=<true|false> ✅
- Description: Filter tasks by completion status.
- Example:
- RestMethod: `GET "http://localhost:3000/filtertasks?completed=true"`
- Response: 
 200 OK — array of tasks matching completed status
 
---

### 7) GET /tasks/priority/:priority ✅
- Description: Filter tasks by `priority` (possible values from task.json: `high`, `medium`, `low`)
- Example:
  - RestMethod: `GET http://localhost:3000/tasks/priority/high`
- Response: 200 OK — array of tasks with matching priority

---

## 💡 Testing tips / examples

- Use `curl` or PowerShell `Invoke-RestMethod` for quick testing.
- Example PowerShell POST:
  ```powershell
  $body = @{ id=11; title="Task"; description="desc"; completed=$false; priority="low" } | ConvertTo-Json
  Invoke-RestMethod -Uri http://localhost:3000/addnewtask -Method Post -Body $body -ContentType 'application/json'
  ```

---

## Notes, potential improvements & gotchas 🔧
- Currently create/update push to in-memory `tasks` array — changes are lost after server restart. Add disk persistence with `fs.writeFileSync(path, JSON.stringify(tasks, null, 2))` if you want durable changes.
- Validation: current implementation expects `id` on create. Consider generating IDs server-side to avoid collisions.
- Make sure `app.use(express.json())` is enabled or `req.body` will be `undefined`.
- You may want to return proper HTTP status codes (201 for created, 404 for not found) consistently — the current code returns JSON messages for not-found cases.


