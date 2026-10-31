const {Users,Task}=require('./models');

 
exports.gettasks = async () => {
  return await Task.find().sort({ orderId: -1 });
};

exports.getTasks=async(userId)=>{return await(Task.find({userId}).sort({orderId:-1}));}

exports.getTasksById=async(id)=>{return(Task.findById(id));}

exports.createTask =async (userId, body) =>
                   Task.create({
                     userId,
                     dateCreated: body.dateCreated,
                     task: body.task,
                     status: false,
                     orderId: body.orderId
                 });


exports.swapTaskOrder = async (id1, id2) => {
                    const task1 = await Task.findById(id1);
                    const task2 = await Task.findById(id2);
                    if (!task1 || !task2) throw new Error("Task not found");

                    [task1.orderId, task2.orderId] = [task2.orderId, task1.orderId];

                    await task1.save();
                    await task2.save();
                     return { task1, task2 };
                  };                 

exports.updateTaskTitle = async (id, title) =>
                   Task.findByIdAndUpdate(id, { task: title }, { new: true, runValidators: true }); 

exports.toggleTaskStatus = async (id) => {
                   const task = await Task.findById(id);
                   if (!task) throw new Error("Task not found");

                   task.status = !task.status;
                   await task.save();
                   return task;
                 };

exports.deleteTask = async (id) =>
                   Task.findByIdAndDelete(id).lean();