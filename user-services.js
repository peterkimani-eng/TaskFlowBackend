const {Users}=require('./models');


exports.getUser = async (userId) => {
  return await Users.findById(userId);
};