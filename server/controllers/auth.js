import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import User from "../models/User.js"

//register user

export const register = async (req, res) => {
    try {
        console.log(req.body);
        const{
            username,
            email,
            date,
            password,
            trades,
            following,
            followers

        } = req.body

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            date,
            password: passwordHash,
            trades,
            following,
            followers
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err){
        res.status(500).json({ error: err.message});
    }
}

// loggin in

export const login = async (req, res) => {
    try{
        const { email, password} = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg:"User does not exist."});

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
        delete user.password;
        res.status(200).json({token, user})
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

