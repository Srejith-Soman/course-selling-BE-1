import express from "express";
import { signin, signup } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", (req,res)=> {
    res.send("user route")
})

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

export default userRouter;