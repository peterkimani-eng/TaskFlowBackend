
const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');




// 2. Define the Schema and Model correctly
const taskSchema = new mongoose.Schema({
  dateCreated:{type:Date,default:Date.now},// still exists but use createdAt!
  task:{ type: String, required: true },
  status: { type: Boolean, default: false },
  orderId:{type: Number,default:100},
  userId:{type:String,required:true }
}, { timestamps: true });

const Task= mongoose.model('Task', taskSchema);

module.exports={Task}


const userDbSchema= new mongoose.Schema({
    fullName:{type:String,required:true},
    userName:{type:String,required:true},
    password:{type:String,required:true}
},{timestamps:true});  

userDbSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const Users= mongoose.model('Users',userDbSchema);

module.exports={Users,Task}


