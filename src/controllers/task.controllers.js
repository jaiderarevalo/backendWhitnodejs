import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id, // es para que  me traiga las datos de mi usuario nomas
      //recordar que el req.user.id es el id del usuario que se loguio y luego paso por el token se puede llamar  req.user.id
    }).populate("user"); // este populate es para poner los datos del usuario como email  password etc
    res.json(tasks);
  } catch (error) {
    return res.status(404).json(["task not fun"]);
  }
};
export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log(req.user);
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savetask = await newTask.save();

    res.json(savetask);
  } catch (error) {
    return res.status(404).json(["task not fun"]);
  }
};
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ message: "task not found " });
    } else {
      res.json(task);
    }
  } catch (error) {
    return res.status(404).json(["task not fun"]);
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: "task not deleted " });
    } else {
      return res.sendStatus(204); // es para que no retornenada , significa que esta bien
    }
  } catch (error) {
    return res.status(404).json(["task not fun"]);
  }
};
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // ese  new true es para que muestre el nuevo valor actualizado
    if (!task) {
      res.status(404).json({ message: "se actualizo correctamente " });
    } else {
      res.json(task);
    }
  } catch (error) {
    return res.status(404).json(["task not fun"]);
  }
};
