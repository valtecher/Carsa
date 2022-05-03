import { body, matchedData } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const useRegistrationSchema = [
    body('first_name')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isAlpha('en-US', { ignore: /[\s-']+/ }).bail().withMessage('Field must contain only characters')
        .isLength({ max: 30 }).bail().withMessage('Field must be maximum 30 chars long'),
    body('last_name')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isAlpha('en-US', { ignore: /[\s-']+/ }).bail().withMessage('Field must contain only characters')
        .isLength({ max: 50 }).bail().withMessage('Field must be maximum 30 chars long'),
    body('email')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isEmail().bail().withMessage('Field is not a valid email address'),
    // .normalizeEmail({ gmail_remove_dots: false }), -- uncomment for production
    body('phone')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isMobilePhone('any').bail().withMessage('Field must be a valid phone number'),
    body('password')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isStrongPassword().bail().withMessage('Password is not strong enough'),
    (req: Request, _res: Response, next: NextFunction) => {
        req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
        next();
    }
];

export const useLoginSchema = [
    body('email')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isEmail().bail().withMessage('Field is not a valid email address'),
    // .normalizeEmail({ gmail_remove_dots: false }) -- uncomment for production,
    body('password')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
    (req: Request, _res: Response, next: NextFunction) => {
        req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
        next();
    }
];
