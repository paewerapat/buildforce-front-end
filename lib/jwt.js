import jwt from 'jsonwebtoken'

export function signJwtAccessToken(payload, options) {
    const secret_key = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret_key, {
        expiresIn: options
    })
    return token
}

export function verifyJwt(token) {
    try {
        const secret_key = process.env.JWT_SECRET;
        const decocde = jwt.verify(token, secret_key)
        return decocde
    } catch (error) {
        console.log("[verifyJwt] - error ", error)
        return null;
    }
}