const express=require ('express');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const router=express.Router();

const{findByUserName,createUser,findUsers}=require('./auth-services');

const app=express();


app.use(express.json());




router.get('/admin/users',async(req,res)=>{
    const users= await findUsers();
    res.json(users);
})

router.post('/user/signIn',async(req,res)=>{
   try {
    const { fullName, userName, password } = req.body.form || {};
    if (!fullName || !userName || !password)
      return res.status(400).json({ error: "All fields required" });

    const exists = await findByUserName(userName);
    if (exists) return res.status(409).json({ error: "Username already taken" });

    const user = await createUser(req.body.form);
    res.status(201).json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/user/logIn',async(req,res)=>{
  console.log(req.body);
    try {
    const { userName, password } = req.body;
    if (!userName || !password)
      return res.status(400).json({ error: "Username and password required" });

    const user = await findByUserName(userName);
    if (!user) return res.status(401).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    res.json({ userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports= router;