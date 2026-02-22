import jwt from "jsonwebtoken"

const verifySession = (req, res, next)=> {
    try {
        const token  = req.cookies.token;
        
        if(!token) return res.json({message: 'Invalid Token'});
        
        const decoded = jwt.verify(token, process.env.JWT);    
        
        req.user = decoded
        
        next();
    } catch (error) {
        console.log('Error or Invalid Token at backend');
        return res.json({message: 'Invalid Token'});
    }
}

export default verifySession;