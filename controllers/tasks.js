const Task = require('../models/task');
const mongoose = require('mongoose');
const asyncWrapper = require('../middleware/async_js');
const { createCustomError } = require('../errors/custom-error');


//@desc		Fetch All Tasks
//@route    GET /tasks
//@access   public
const getAllTasks = asyncWrapper(async (req, res) => {
	const tasks = await Task.find({}, 'title description status dueDate createdAt updatedAt');
	res.status(200).json({ tasks });
});

 
//@desc		Create New Task/Tasks
//@route    POST /tasks
//@access   public
const createTask = asyncWrapper(async (req, res) => {
	const { title, description, status, dueDate } = req.body;
  
	// Validation 
	if (!title || !description) {
	  return res.status(400).json({ error: 'title and description fields are required' });
	}
  
	try {
	  const taskData = {
		title,
		description,
		status,
		dueDate
	  };
  
	  const task = await Task.create(taskData);
	  res.status(201).json({ task });
	} catch (err) {
	  res.status(500).json({ error: 'Could not create task' });
	}
});


//@desc		Fetch Single Task
//@route    GET /tasks/:id
//@access   public
const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;

	const task = await Task.findOne({ _id: taskID });
	if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	}
	res.status(200).json({ task });
});


//@desc		Update Task by Id
//@route    PUT /tasks/:id
//@access   public
const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const isValidObjectId = mongoose.Types.ObjectId.isValid(taskID); 
  
	if (!isValidObjectId) {
	  return next(createCustomError(`Invalid task ID: ${taskID}`, 400)); 
	}
  
	const allowedUpdates = ['description', 'status', 'dueDate'];
	const updates = {};
	
	// Check if any of the disallowed fields are present in the request
	const disallowedFields = Object.keys(req.body).filter(
	  key => !allowedUpdates.includes(key)
	);
  
	if (disallowedFields.length > 0) {
	  return next(createCustomError(`Cannot update: ${disallowedFields.join(', ')}`, 400));
	}
  
	// Construct the updates object with allowed fields
	for (const key in req.body) {
	  if (allowedUpdates.includes(key)) {
		updates[key] = req.body[key];
	  }
	}
  
	try {
	  const task = await Task.findOneAndUpdate(
		{ _id: taskID },
		updates,
		{ new: true, runValidators: true }
	  );
  
	  if (!task) {
		return next(createCustomError(`No task with id: ${taskID}`, 404));
	  }
  
	  res.status(200).json({ task });
	} catch (error) {
	  return next(createCustomError('Could not update task', 500));
	}
  });
  


//@desc		Delete Task by Id
//@route    DELETE /tasks/:id
//@access   public
const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });
	if (!task) {
	  return next(createCustomError(`No task with id: ${taskID}`, 404));
	}
  
	const taskTitle = task.title;
	const deleteInfo = {
	  message: `${taskTitle} has been deleted`,
	};
	res.status(200).json(deleteInfo);
  });

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
