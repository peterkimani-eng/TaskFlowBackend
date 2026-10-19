const express=require ('express');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const router=express.Router();


const app=express();


app.use(express.json());


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

router.get('/admin/users',async(req,res)=>{
    const users= await Users.find();
    res.json(users);
})

router.post('/user/signIn',async(req,res)=>{
    try{
        console.log("sign in initiated");

         let uSer;
        const user = await Users.create({
            fullName:req.body.form.fullName,
            userName:req.body.form.userName,
            password:req.body.form.password
        });
       /*await Users.create(user)
         .then(uSer= await Users.find({userName:user.userName}))  
        */
         res.json(user._id);
        console.log(user._id);
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.post('/user/logIn',async(req,res)=>{
    try{ 
        const user=await Users.findOne({userName:req.body.userName});
        if(!user){
            res.status(401).json("error");
        }else{
              const match = await bcrypt.compare(req.body.password, user.password);

            if (match){
            res.json(user._id);
        }else{9
            res.status(201).json({error:'Invalid credentials'});
        }
        }
        

    }catch{
        res.status(500).json({ error: err.message });
    }
})

module.exports= router;