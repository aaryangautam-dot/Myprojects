import jwt from 'jsonwebtoken'


const userAuth = async(req, res, next) =>{
    const {token} = req.headers;

    if(!token){
        return res.json({success: false, message: "Not Authorized Login again"})

    }

    try {
         const token = req.headers.token;
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecode.id){
            if (!req.body) req.body = {}; 
            req.body.userId = tokenDecode.id;
            next();
        }else{
            return res.json({success: false, message: 'Not Authorized. Login Again'});
        }

    

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export default userAuth;