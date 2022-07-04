import { Request, Response, NextFunction } from 'express';
import { body, param, matchedData } from 'express-validator';
import db from '../../database/models';

export const validateConfigurationId = [
  param('configurationId').trim().isUUID(4).bail().withMessage('Configuration id should be a valid UUID v4')
];

export const validateCreateConfiguration = [
  body('order_id')
    .trim().isUUID(4).bail().withMessage('Order id should be a valid UUID v4')
    .custom(async (value) => {
      const order = await db.Order.count({ where: { id: value } });

      return order ? Promise.resolve() : Promise.reject("Order with provided id doesn't exist");
    }).bail(),
  body('brand_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Brand id should be a valid UUID v4')
    .custom(async (value) => {
      const brand = await db.CarBrand.count({ where: { id: value } });

      return brand ? Promise.resolve() : Promise.reject("Brand with provided id doesn't exist");
    }).bail(),
  body('model_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Model id should be a valid UUID v4')
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
    .trim().isUUID(4).bail().withMessage('Generation id should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const generation = await db.CarGeneration.findByPk(value, { raw: true });

      if (!generation) {
        return Promise.reject("Generation with provided id doesn't exist");
      } else if (!req.body.model_id || generation.model_id !== req.body.model_id) {
        return Promise.reject("Model id wasn't provided or generation doesn't belong to that model");
      }

      return Promise.resolve();
    }).bail(),
  body('year_from')
    .optional()
    .custom(async (value, { req }) => {
      const currentYear = new Date().getFullYear();

      if (!Number.isInteger(value) || value < currentYear - 100 || value > currentYear) {
        return Promise.reject(`Field should be an integer from ${currentYear - 100} to ${currentYear}`);
      }

      if (req.body.generation_id) {
        const generation = await db.CarGeneration.findByPk(req.body.generation_id, { raw: true });

        if (value < (generation.start_year ?? Number.MIN_SAFE_INTEGER) || value > (generation.end_year ?? currentYear)) {
          return Promise.reject(`Provided generation was produced from ${generation.start_year} to ${generation.end_year ?? 'nowadays'}`);
        }
      }

      return Promise.resolve();
    }).bail(),
  body('year_until')
    .optional()
    .custom(async (value, { req }) => {
      const currentYear = new Date().getFullYear();
      const yearFrom = req.body.year_from || Number.MIN_SAFE_INTEGER;

      if (!Number.isInteger(value) || value < yearFrom || value > currentYear) {
        return Promise.reject(`Field should be an integer from year_from to ${currentYear}`);
      }

      if (req.body.generation_id) {
        const generation = await db.CarGeneration.findByPk(req.body.generation_id, { raw: true });

        if (value > (generation.end_year ?? currentYear)) {
          return Promise.reject(`Provided generation was produced from ${generation.start_year} to ${generation.end_year ?? 'nowadays'}`);
        }
      }

      return Promise.resolve();
    }).bail(),
  body('price_from')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer'),
  body('price_until')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer')
    .custom((value, { req }) => {
      const priceFrom = req.body.price_from;

      if (value < priceFrom) {
        throw new Error("price_until couldn't be smaller than price_from");
      }

      return true;
    }).bail(),
  body('type')
    .optional()
    .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isAlphanumeric('en-US', { ignore: /[\s'-]+/g }).bail().withMessage('Field must contain only characters')
    .isLength({ max: 30 }).bail().withMessage('Field must be maximum 30 chars long'),
  body('transmission')
    .optional()
    .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isAlphanumeric('en-US', { ignore: /[\s'-]+/g }).bail().withMessage('Field must contain only characters')
    .isLength({ max: 30 }).bail().withMessage('Field must be maximum 30 chars long'),
  body('mileage_from')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer'),
  body('mileage_until')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer')
    .custom((value, { req }) => {
      const mileageFrom = req.body.mileage_from;

      if (value < mileageFrom) {
        throw new Error("mileage_until couldn't be smaller than mileage_from");
      }

      return true;
    }).bail(),
  body('location_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Location id should be a valid UUID v4')
    .custom(async (value) => {
      const location = await db.Location.count({ where: { id: value } });

      return location ? Promise.resolve() : Promise.reject("Location with provided id doesn't exist");
    }).bail(),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
    next();
  }
];


export const validateUpdateConfiguration = [
  body('order_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Order id should be a valid UUID v4')
    .custom(async (value) => {
      const order = await db.Order.count({ where: { id: value } });

      return order ? Promise.resolve() : Promise.reject("Order with provided id doesn't exist");
    }).bail(),
  body('brand_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Brand id should be a valid UUID v4')
    .custom(async (value) => {
      const brand = await db.CarBrand.count({ where: { id: value } });

      return brand ? Promise.resolve() : Promise.reject("Brand with provided id doesn't exist");
    }).bail(),
  body('model_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Model id should be a valid UUID v4')
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
    .trim().isUUID(4).bail().withMessage('Generation id should be a valid UUID v4')
    .custom(async (value, { req }) => {
      const generation = await db.CarGeneration.findByPk(value, { raw: true });

      if (!generation) {
        return Promise.reject("Generation with provided id doesn't exist");
      } else if (!req.body.model_id || generation.model_id !== req.body.model_id) {
        return Promise.reject("Model id wasn't provided or generation doesn't belong to that model");
      }

      return Promise.resolve();
    }).bail(),
  body('year_from')
    .optional()
    .custom(async (value, { req }) => {
      const currentYear = new Date().getFullYear();

      if (!Number.isInteger(value) || value < currentYear - 100 || value > currentYear) {
        return Promise.reject(`Field should be an integer from ${currentYear - 100} to ${currentYear}`);
      }

      if (req.body.generation_id) {
        const generation = await db.CarGeneration.findByPk(req.body.generation_id, { raw: true });

        if (value < (generation.start_year ?? Number.MIN_SAFE_INTEGER) || value > (generation.end_year ?? currentYear)) {
          return Promise.reject(`Provided generation was produced from ${generation.start_year} to ${generation.end_year ?? 'nowadays'}`);
        }
      }

      return Promise.resolve();
    }).bail(),
  body('year_until')
    .optional()
    .custom(async (value, { req }) => {
      const currentYear = new Date().getFullYear();
      const yearFrom = req.body.year_from || Number.MIN_SAFE_INTEGER;

      if (!Number.isInteger(value) || value < yearFrom || value > currentYear) {
        return Promise.reject(`Field should be an integer from year_from to ${currentYear}`);
      }

      if (req.body.generation_id) {
        const generation = await db.CarGeneration.findByPk(req.body.generation_id, { raw: true });

        if (value > (generation.end_year ?? currentYear)) {
          return Promise.reject(`Provided generation was produced from ${generation.start_year} to ${generation.end_year ?? 'nowadays'}`);
        }
      }

      return Promise.resolve();
    }).bail(),
  body('price_from')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer'),
  body('price_until')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer')
    .custom((value, { req }) => {
      const priceFrom = req.body.price_from;

      if (value < priceFrom) {
        throw new Error("price_until couldn't be smaller than price_from");
      }

      return true;
    }).bail(),
  body('type')
    .optional()
    .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isAlphanumeric('en-US', { ignore: /[\s'-]+/g }).bail().withMessage('Field must contain only characters')
    .isLength({ max: 30 }).bail().withMessage('Field must be maximum 30 chars long'),
  body('transmission')
    .optional()
    .isString().notEmpty().bail().withMessage('Field must contain a valid non empty string')
    .isAlphanumeric('en-US', { ignore: /[\s'-]+/g }).bail().withMessage('Field must contain only characters')
    .isLength({ max: 30 }).bail().withMessage('Field must be maximum 30 chars long'),
  body('mileage_from')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer'),
  body('mileage_until')
    .optional()
    .isInt({ min: 0 }).bail().withMessage('Field should be a positive integer')
    .custom((value, { req }) => {
      const mileageFrom = req.body.mileage_from;

      if (value < mileageFrom) {
        throw new Error("mileage_until couldn't be smaller than mileage_from");
      }

      return true;
    }).bail(),
  body('location_id')
    .optional()
    .trim().isUUID(4).bail().withMessage('Location id should be a valid UUID v4')
    .custom(async (value) => {
      const location = await db.Location.count({ where: { id: value } });

      return location ? Promise.resolve() : Promise.reject("Location with provided id doesn't exist");
    }).bail(),
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
    next();
  }
];
