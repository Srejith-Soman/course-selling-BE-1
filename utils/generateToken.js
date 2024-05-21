import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SE;

const generateToken = (email) =>{
    return jsonWebToken.sign({ data: email }, secretKey, {expiresIn: "1d"});
};

export default generateToken;