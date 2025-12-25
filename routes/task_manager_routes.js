const router = require('express').Router();
const { allTasks, taskById,createTask,updateTask, deleteTask, filterTasks, taskBasedOnPriority} = require('../components/task_manager-apis');


router.get('/tasks', allTasks);
router.get('/tasks/:id', taskById);
router.post('/addnewtask', createTask);
router.put('/updatetask/:id', updateTask);
router.delete('/deletetask/:id', deleteTask);

router.get('/filtertasks', filterTasks);
router.get('/tasks/priority/:priority', taskBasedOnPriority);

module.exports = router;