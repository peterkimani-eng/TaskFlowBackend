const Users=require('./authentication.js');

exports.getUser=(userId)=>Users.findOne({userId});