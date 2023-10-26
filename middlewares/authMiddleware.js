import JWT from 'jsonwebtoken';
import userModel from '../Models/userModel.js';

// TOken BAsed Protected Route

export const requireSignIn = (req, res, next) => {
      try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
      } catch (error) {
        console.log(error)
        return res.status(401).send({
          success: false,
          message:"Error in Validation",
          error
        })
      }
};

export const IsAdmin = async (req, res, next) =>{
try {
  const user = await userModel.findById(req.user._id)
  if(user.role === 1){
    next();
  } else{
    return res.status(401).send({
      success: true,
      message: "Unauthorized Access"
    });
  }
  
} catch (error) {
  console.log(error)
  return res.status(401).send({
    success: false,
    message: "Error in admin MiddleWare",
    error
  })
}
}