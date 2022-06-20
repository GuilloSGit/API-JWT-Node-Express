import {validationResult} from 'express-validator';

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    /* bad request */
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}