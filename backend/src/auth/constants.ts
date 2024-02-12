export const jwtConstants = {
    secret: process.env.SECRET_KEY || 'secret-key',
    expiresIn: process.env.EXPIRES_IN || '1800s',
};