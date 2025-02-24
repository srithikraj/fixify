/**
 * Used to protect routes that require authentication
 */
function verifyToken(request, response, next) {
    try {
        const token = request.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        request.userData = decoded
        next()
    } catch (error) {
        return response.status(401).json({message: "Authentication Failed!"})
    }
}

module.exports = {
    verifyToken
}