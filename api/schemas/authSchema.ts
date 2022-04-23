import { body } from 'express-validator';

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
        .isStrongPassword().bail().withMessage('Password is not strong enough')
];

export const useLoginSchema = [
    body('email')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
        .isEmail().bail().withMessage('Field is not a valid email address')
        .normalizeEmail({ gmail_remove_dots: false }),
    body('password')
        .exists().bail().withMessage('The field is required')
        .trim()
        .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
];
