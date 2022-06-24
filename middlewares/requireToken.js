import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization;
        if (!token) {
            throw new Error("No Bearer");
        }

        token = token.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.uid = uid;
        next();
    }
    catch (error) {
        console.log(error.message);
        const TokenVerificationError = {
            "invalid signature": {
                status: 401,
                message: "The signature is not valid"
            },
            "No Bearer": {
                status: 401,
                message: "Use Bearer token, please"
            },
            "invalid token": {
                status: 401,
                message: "Token is invalid. Access denied"
            },
            "jwt expired": {
                status: 401,
                message: "The token has expired"
            }
        };
        return res.status( TokenVerificationError[error.message].status )
            .json({ error: TokenVerificationError[error.message].message });
    }


};
