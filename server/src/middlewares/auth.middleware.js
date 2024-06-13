import { object, string } from 'yup';
import { ApiError } from './error.middleware.js';
import jwt from 'jsonwebtoken';

const loginSchema = object({
  username: string().required(),
  password: string().min(6).required()
});
export const login = async (req, res, next) => {
    try {
        req.body = await loginSchema.validate(req.body);        
    } catch (error) {
        return next(new ApiError(400, error.message));
    }
    next();
};

export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next(new ApiError(401, 'Unauthorized'));
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return next(new ApiError(401, 'Unauthorized'));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Unauthorized'));
  }

}

export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Forbidden'));
    }
    next();
  }
}