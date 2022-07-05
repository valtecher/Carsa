import { Request, Response, NextFunction } from 'express';
import { body, check, matchedData, param } from 'express-validator';
import db from '../../database/models';


export const validateCarId = [
  param('carId')
    .trim()
    .isUUID(4).bail().withMessage('Car id should be a valid UUID v4')
];

export const validateCreateCar = [
  body('color')
    .exists().bail().withMessage('The field is required')
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ min: 2 }).bail().withMessage('Field must be minimum 2 chars long'),
  body('vin')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ min: 17, max: 17 }).bail().withMessage('Field must be 17 chars long'),
  body('registrationNumber')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('description')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('mileage')
    .exists().bail().withMessage('The field is required')
    .isInt({ min: 0, max: 2_000_000 }).bail().withMessage('Field should be an integer from 0 to 2,000,000'),
  body('year')
    .exists().bail().withMessage('The field is required')
    .isInt().bail().withMessage('Field should be an integer')
    .custom(value => {
      const currentYear = new Date().getFullYear();

      if (value < currentYear - 100 || value > currentYear) {
        throw new Error(`Field should be an integer from ${currentYear - 100} to ${currentYear}`);
      }

      return true;
    }).bail(),
  body('drive')
    .exists().bail().withMessage('The field is required')
    .custom(value => ['FWD', 'RWD', 'AWD', '4WD'].includes(value))
    .bail().withMessage('Field should be one of the following: ' + ['FWD', 'RWD', 'AWD', '4WD'].join(', ')),
  body('transmission')
    .exists().bail().withMessage('The field is required')
    .custom(value => ['Manual', 'Automatic', 'CVT', 'DCT'].includes(value))
    .bail().withMessage('Field should be one of the following: ' + ['Manual', 'Automatic', 'CVT', 'DCT'].join(', ')),
  body('market_name')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('marketplace_link')
    .optional()
    .isURL({ protocols: ['http', 'https', 'ftp'], require_protocol: true }).bail().withMessage('Parameter should be a valid url address'),
  body('price')
    .exists().bail().withMessage('The field is required')
    .isFloat({ min: 1 }).bail().withMessage('Field should be a non negative float'),
  body('type')
    .exists().bail().withMessage('The field is required')
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('brand_id')
    .exists().bail().withMessage('The field is required')
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const brand = await db.CarBrand.count({ where: { id: value } });

      return brand ? Promise.resolve() : Promise.reject("Brand with provided id doesn't exist");
    }).bail(),
  body('model_id')
    .exists().bail().withMessage('The field is required')
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const model = await db.CarModel.findByPk(value, { raw: true });

      if (!model) {
        return Promise.reject("Model with provided id doesn't exist");
      } else if (!req.body.brand_id || model.brand_id !== req.body.brand_id) {
        return Promise.reject("Brand id wasn't provided or model doesn't belong to that brand");
      }

      return Promise.resolve();
    }).bail(),
  body('generation_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const generation = await db.CarGeneration.findByPk(value, { raw: true });

      if (!generation) {
        return Promise.reject("Generation with provided id doesn't exist");
      } else if (!req.body.model_id || generation.model_id !== req.body.model_id) {
        return Promise.reject("Model id wasn't provided or generation doesn't belong to that model");
      }

      return Promise.resolve();
    }).bail(),
  body('engine_id')
    .exists().bail().withMessage('The field is required')
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const engine = await db.Engine.count({ where: { id: value } });

      if (!engine) {
        return Promise.reject("Engine with provided id doesn't exist");
      }

      const engineWithModel = await db.CarModel_Engine.count({
        where: {
          car_model_id: req.body.model_id,
          engine_id: value
        }
      });

      if (!engineWithModel) {
        return Promise.reject("Provided engine doesn't belong to that model");
      }

      return Promise.resolve();
    }).bail(),
  body('location_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const location = await db.Location.count({ where: { id: value } });

      return location ? Promise.resolve() : Promise.reject("Location with provided id doesn't exist");
    }).bail(),
  body('mainImage')
    .optional()
    .isURL({ protocols: ['http', 'https', 'ftp'], require_protocol: true }).bail().withMessage('Parameter should be a valid url address'),
  body('images')
    .optional()
    .isArray().bail().withMessage('Parameter should be an array type'),
  check('images.*')
    .isURL({ protocols: ['http', 'https', 'ftp'], require_protocol: true }).bail().withMessage('Each image should be a valid url address'),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
    next();
  }
];


export const validateUpdateCar = [
  body('color')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ min: 2 }).bail().withMessage('Field must be minimum 2 chars long'),
  body('vin')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isLength({ min: 17, max: 17 }).bail().withMessage('Field must be 17 chars long'),
  body('registrationNumber')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('description')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('mileage')
    .optional()
    .isInt({ min: 0, max: 2_000_000 }).bail().withMessage('Field should be an integer from 0 to 2,000,000'),
  body('year')
    .optional()
    .isInt().bail().withMessage('Field should be an integer')
    .custom(value => {
      const currentYear = new Date().getFullYear();

      if (value < currentYear - 100 || value > currentYear) {
        throw new Error(`Field should be an integer from ${currentYear - 100} to ${currentYear}`);
      }

      return true;
    }).bail(),
  body('drive')
    .optional()
    .custom(value => ['FWD', 'RWD', 'AWD', '4WD'].includes(value))
    .bail().withMessage('Field should be one of the following: ' + ['FWD', 'RWD', 'AWD', '4WD'].join(', ')),
  body('transmission')
    .optional()
    .custom(value => ['Manual', 'Automatic', 'CVT', 'DCT'].includes(value))
    .bail().withMessage('Field should be one of the following: ' + ['Manual', 'Automatic', 'CVT', 'DCT'].join(', ')),
  body('market_name')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('marketplace_link')
    .optional()
    .isURL({ protocols: ['http', 'https', 'ftp'], require_protocol: true }).bail().withMessage('Parameter should be a valid url address'),
  body('price')
    .optional()
    .isFloat({ min: 1 }).bail().withMessage('Field should be a non negative float'),
  body('type')
    .optional()
    .trim().isString().notEmpty().bail().withMessage('Field must contain a valid non empty string'),
  body('brand_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const brand = await db.CarBrand.count({ where: { id: value } });

      return brand ? Promise.resolve() : Promise.reject("Brand with provided id doesn't exist");
    }).bail(),
  body('model_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const model = await db.CarModel.findByPk(value, { raw: true });

      if (!model) {
        return Promise.reject("Model with provided id doesn't exist");
      } else if (!req.body.brand_id || model.brand_id !== req.body.brand_id) {
        return Promise.reject("Brand id wasn't provided or model doesn't belong to that brand");
      }

      return Promise.resolve();
    }).bail(),
  body('generation_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const generation = await db.CarGeneration.findByPk(value, { raw: true });

      if (!generation) {
        return Promise.reject("Generation with provided id doesn't exist");
      } else if (!req.body.model_id || generation.model_id !== req.body.model_id) {
        return Promise.reject("Model id wasn't provided or generation doesn't belong to that model");
      }

      return Promise.resolve();
    }).bail(),
  body('engine_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const engine = await db.Engine.count({ where: { id: value } });

      if (!engine) {
        return Promise.reject("Engine with provided id doesn't exist");
      }

      const engineWithModel = await db.CarModel_Engine.count({
        where: {
          car_model_id: req.body.model_id,
          engine_id: value
        }
      });

      if (!engineWithModel) {
        return Promise.reject("Provided engine doesn't belong to that model");
      }

      return Promise.resolve();
    }).bail(),
  body('location_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Parameter should be a valid UUID v4')
    .custom(async (value) => {
      const location = await db.Location.count({ where: { id: value } });

      return location ? Promise.resolve() : Promise.reject("Location with provided id doesn't exist");
    }).bail(),
  body('mainImage')
    .optional()
    .isURL({ protocols: ['http', 'https', 'ftp'], require_protocol: true }).bail().withMessage('Parameter should be a valid url address'),
  body('images')
    .optional()
    .isArray().bail().withMessage('Parameter should be an array type'),
  check('images.*')
    .isURL({ protocols: ['http', 'https', 'ftp'], require_protocol: true }).bail().withMessage('Each image should be a valid url address'),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
    next();
  }
];
