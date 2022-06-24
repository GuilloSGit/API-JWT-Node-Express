import jwt from "jsonwebtoken"

/**
 * It generates a token for a user with a given uid
 * @param uid - user id
 */
export const generateToken = (uid) => {
    /* token is valid for mins: 15 */
    const expiresIn = 60 * 15;

    try {
        const token = jwt.sign({ uid: uid }, process.env.JWT_SECRET_KEY, { expiresIn: expiresIn });
        return { token, expiresIn };
    } catch (error) {
        console.log(error);
    }

}