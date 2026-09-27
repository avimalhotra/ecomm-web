import jwt from "jsonwebtoken";


function getCookie(req, name) {
     const cookieHeader = req.headers.cookie;

     if (!cookieHeader) return null;

     const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
     const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));

     if (!match) return null;

     return decodeURIComponent(match.slice(name.length + 1));
}


export default function authenticate(req,res,next){
     const authHeader=req.headers.authorization;
     const token=authHeader?.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : getCookie(req, "token");

     if(!token){
          return res.status(401).json({message: 'Token Missing'})
     }

     try{
          const decode=jwt.verify(token,process.env.JWT_SECRET);
          req.user=decode;
          next();
     }
     catch(err){
          return res.status(401).json({message:'Invalid or Expired Token'})
     }

}
