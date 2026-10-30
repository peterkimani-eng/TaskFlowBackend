const Tasks=require('./index.js');


exports.getTasks=(userId)=>Tasks.find({userId}).sort({orderId:-1});

exports.getTasksById=(id)=>Tasks.findById(id);

exports.createTask = (userId, body) =>
                   Tasks.create({
                     userId,
                     dateCreated: body.dateCreated,
                     task: body.task,
                     status: false,
                     orderId: body.orderId
                 });


exports.swapTaskOrder = async (id1, id2) => {
                    const task1 = await Tasks.findById(id1);
                    const task2 = await Tasks.findById(id2);
                    if (!task1 || !task2) throw new Error("Task not found");

                    [task1.orderId, task2.orderId] = [task2.orderId, task1.orderId];

                    await task1.save();
                    await task2.save();
                     return { task1, task2 };
                  };                 

exports.updateTaskTitle = async (id, title) =>
                   Tasks.findByIdAndUpdate(id, { task: title }, { new: true, runValidators: true }); 

exports.toggleTaskStatus = async (id) => {
                   const task = await Tasks.findById(id);
                   if (!task) throw new Error("Task not found");

                   task.status = !task.status;
                   await task.save();
                   return task;
                 };

exports.deleteTask = async (id) =>
                   Tasks.findByIdAndDelete(id).lean();