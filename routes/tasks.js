const express = require('express');
const router = express.Router();

const {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
} = require('../controllers/tasks');

router.get('/', (req, res) => {
	res.send('API is working fine');
  });
router.route('/tasks').get(getAllTasks).post(createTask);
router.route('/tasks/:id').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;
