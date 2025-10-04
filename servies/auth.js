import jwt from 'jsonwebtoken';
export function setId(user){
    const payload = {
        _id : user._id,
        name:user.name,
        email : user.email,
        role : user.role
    }
    
    return jwt.sign(payload, process.env.SECRET)
}

export function getId(token){
    if(!token) return null;
    try {
        const user = jwt.verify(token, process.env.SECRET)
        return user
    } catch (error) {
        return null;
    }
  
}