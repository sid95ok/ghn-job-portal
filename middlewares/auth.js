import jwt from 'jsonwebtoken';

const authenticate = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || authHeader.notStartsWith(`Bearer`)) {
            next(`Authentication Failed`);
        };
        const token = authHeader.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        request.user = {
            userId: payload.userId
        };
        next();
    } catch (error) {
        next(`Authentication Failed`);
    }
};

export default authenticate;
