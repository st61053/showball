export default () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    database: {
        uri: process.env.DATABASE_URI || 'mongodb://localhost:2701',
        username: process.env.DATABASE_USERNAME || 'admin',
        password: process.env.DATABASE_PASSWORD || 'admin',
        name: process.env.DATABASE_NAME || 'showball',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
    file: {
        uploadLocation: process.env.UPLOAD_LOCATION || './uploads',
        maxFileSize: process.env.MAX_FILE_SIZE || 1024 * 1024 * 4,
    },
});