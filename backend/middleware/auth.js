import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {
    console.log("Headers:", req.headers); // Debug: see all headers
    
    const {token} = req.headers;
    console.log("Token:", token); // Debug: see if token exists
    
    if (!token) {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
   
try {
    
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode); // Debug: see decoded data
    req.body.userId = token_decode.id;
    console.log("req.body.userId set to:", req.body.userId); // Debug: confirm userId was set
    next();
} catch (error) {
    console.log("JWT Error:", error);
    res.json({success:false,message:"Error"})
    
}
}

export default authMiddleware;