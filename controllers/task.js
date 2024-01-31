import { validationResult } from "express-validator";
import Task from "../models/Task.js";
import { handleErrors, isValidDateFormat } from "../utils/routerUtils.js";

//Function To Create The New Task
export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return handleErrors(res, 400, errors.array()[0].msg, false);
    }

    const { title, description } = req.body;

    const newTask = new Task({
      user: req.user.id,
      title,
      description,
    });

    await newTask.save();

    res.status(201).json({
      success: true,
      message: "Task added successfully",
      newTask,
    });
  } catch (error) {
    return handleErrors(res, 500, error.message, false);
  }
};

//Function To Get Existing Task
export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ user: userId }).populate("user", "name");

    if (tasks.length === 0) {
      return res
        .status(401)
        .json({ message: "You Dont Have Any Task Please Create First" });
    }

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

//Function To Update Existing Task
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updateFields = req.body;

    if (
      (!updateFields.title && !updateFields.description) ||
      updateFields.title == "" ||
      updateFields.description == ""
    ) {
      return res
        .status(401)
        .json({ message: "Please Perovide Query Properly" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
      new: true,
    }).populate("user", "name");

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }

    res.status(200).json({
      success: true,
      message: "Task Updated Successfully",
      updatedTask,
    });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

//Function To Change Status Of Existing Task
export const markCompleted = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }
    if (task.isCompleted) {
      return res
        .status(401)
        .json({ message: "This Task is already marked as completed" });
    }

    await task.updateOne({ isCompleted: true }, { new: true });

    res
      .status(200)
      .json({ success: true, message: "Task Marked As Completed" });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

//Function To Change Delete Existing Task
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }
    await task.deleteOne();

    return res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (error) {
    return handleErrors(
      res,
      500,
      "Server error occurred. Please try again.",
      false
    );
  }
};

//Function Change Due Date
export const changeDueDate = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Please Enter Due Date" });
    }

    if (!isValidDateFormat(date)) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Please use MM/DD/YYYY." });
    }

    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }

    const dueDate = new Date(date);

    await task.updateOne({ dueDate }, { new: true });

    return res.json({ message: "Due Date Changed Successfully", dueDate });
  } catch (error) {
    return handleErrors(res, 500, error.message, false);
  }
};
