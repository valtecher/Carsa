import { Request, Response, NextFunction } from 'express';
import { param, body, matchedData } from 'express-validator';
import db from '../../database/models';

export const validateOrderId = [
  param('orderId')
    .trim()
    .isUUID(4).bail().withMessage('Order id should be a valid UUID v4')
];

export const validateCreateOrder = [
  body('type')
    .exists().bail().withMessage('The field is required')
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ max: 40 }).bail().withMessage('Field must be maximum 40 characters long'),
  body('status')
    .exists().bail().withMessage('The field is required')
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ max: 30 }).bail().withMessage('Field must be maximum 30 characters long'),
  body('client_id')
    .exists().bail().withMessage('The field is required')
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const client = await db.Client.count({ where: { person_id: value } });

      return client ? Promise.resolve() : Promise.reject("Client with provided id doesn't exist");
    }).bail(),
  body('selector_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const selector = await db.CarSelector.count({ where: { person_id: value } });

      return selector ? Promise.resolve() : Promise.reject("Car selector with provided id doesn't exist");
    }).bail(),
  body('date')
    .optional()
    .isISO8601().toDate().bail().withMessage('Date should be in the following format: YYYY-MM-DD hh:mm:ss'),
  body('sum')
    .exists().bail().withMessage('The field is required')
    .isFloat().bail().withMessage('Sum should be a valid double value')
    .customSanitizer(value => Number(value).toFixed(2)),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
    next();
  }
];

export const validateUpdateOrder = [
  body('type')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ max: 40 }).bail().withMessage('Field must be maximum 40 characters long'),
  body('status')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ max: 30 }).bail().withMessage('Field must be maximum 30 characters long'),
  body('client_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const client = await db.Client.count({ where: { person_id: value } });

      return client ? Promise.resolve() : Promise.reject("Client with provided id doesn't exist");
    }).bail(),
  body('selector_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const selector = await db.CarSelector.count({ where: { person_id: value } });

      return selector ? Promise.resolve() : Promise.reject("Car selector with provided id doesn't exist");
    }).bail(),
  body('date')
    .optional()
    .isISO8601().toDate().bail().withMessage('Date should be in the following format: YYYY-MM-DD hh:mm:ss'),
  body('sum')
    .optional()
    .isFloat().bail().withMessage('Sum should be a valid double value')
    .customSanitizer(value => Number(value).toFixed(2)),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
    next();
  }
];
