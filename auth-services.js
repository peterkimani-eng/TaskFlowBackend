const {Users}=require('./models');
const bcrypt=require('bcryptjs');

exports.findUsers=async()=>{return(Users.find());}

exports.findByUserName = async(userName) =>{return( Users.findOne({ userName }));}



exports.createUser = async (form) => {
  const hashed = await bcrypt.hash(form.password, 10);
  return Users.create({
    fullName: form.fullName,
    userName: form.userName,
    password: hashed
  });
};