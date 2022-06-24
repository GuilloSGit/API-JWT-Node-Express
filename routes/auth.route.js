import { Router } from 'express';
import { infoUser, login, register } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';

const router = Router();

router.post('/register', [
    body('email')
        .trim()
        .isEmail().withMessage('Email must be valid: Incorrect format')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.repassword) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }).withMessage('Password confirmation must match password'),
    ],
    validationResultExpress,
    register
);

router.post('/login', [
    body('email')
        .trim()
        .isEmail().withMessage('Email must be valid: Incorrect format')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    ],
    validationResultExpress,
    login
);

router.get('/protected', requireToken ,infoUser);

export default router;