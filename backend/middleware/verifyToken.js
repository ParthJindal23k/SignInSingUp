const jwt = require("jsonwebtoken");
const JWT_SECRET   = process.env.JWT_SECRET;
const dotenv = require("dotenv")

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        return res.status(400).json({message:"Access denied, Token Missing"});
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({message:"Invalid Token"});
    }
}


module.exports = verifyToken;
