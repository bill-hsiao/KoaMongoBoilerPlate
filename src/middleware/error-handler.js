module.exports = errorHandler;

function errorHandler(err, ctx, next) {
    if (typeof (err) === 'string') {
        return ctx.response.status(400).json({ message: err });
    }
    if (err.name === 'ValidationError') {
        return ctx.response.status(400).json({ message: err.message });
    }
    if (err.name === 'UnauthorizedError') {
        return ctx.response.status(401).json({ message: 'Invalid Token' });
    }
    return ctx.response.status(500).json({ message: err.message });
}
