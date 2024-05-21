const  bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')
const User = require('../models/userModel')


//  SignUp  ////////// 
const signup = async (req,res) => {
    console.log("Hiitted");

    try {
        
    const {firstName, lastName, password, email} = req.body;
    console.log(email);

    const userExist =  await User.findOne({ email  });

    if (userExist) {
        return res.send("User already existed")
    }

    const saltRounts= 10;
    const hashPassword = await bcrypt.hash(password, saltRounts)


    const newUser  = new User({
        email,
        firstName,
        lastName,
        hashPassword
    });

    const newUserCreated = await newUser.save();
    console.log("newUserCreated");

    if(!newUser){
        return res.send("User not created")
    }

    const token = generateToken(email)
    res.cookie("token", token)
    res.send("Signed Successfully")
        
    } catch (error) {
        console.log(error, "Something worng");
        res.status(500).send("Internal Server Error")
    }

  };


       // SignIn //////////

    const signin = async (req, res) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})
            
            if(!user){
                return res.send("User not exist")
            }

            const matchPassword = await bcrypt.compare(password, user.hashPassword);

            if(!matchPassword){
                return res.send("password incorrect");
            }

            const token = generateToken(email);
            res.cookie("token", token);
            res.send("Logged in!")

        } catch (error) {
            console.log(error, "Somthing wrong");
            res.status(500).send("Internal Server Error")
        }
    }

