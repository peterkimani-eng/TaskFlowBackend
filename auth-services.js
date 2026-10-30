const Users=require('./authentication');
const bcrypt=require('bcryptjs');

exports.findByUserName = (userName) => Users.findOne({ userName });

exports.createUser = async (form) => {
  const hashed = await bcrypt.hash(form.password, 10);
  return Users.create({
    fullName: form.fullName,
    userName: form.userName,
    password: hashed
  });
};