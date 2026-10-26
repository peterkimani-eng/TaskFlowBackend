const Tasks=require('./index.js');


exports.getTasks=(userId)=>Tasks.find({userId}).sort({orderId:-1});

exports.getTasksById=(id)=>Tasks.findById(id);