import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import brandsHelper from '../services/helpers/brandHelpers';

const getAllBrands = async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || undefined;
    const offset = Number(req.query.offset) || undefined;

    const brands = await brandsHelper.getAllBrands({ limit, offset });

    return res.json(brands);
};

const getBrandById = async (req: Request, res: Response) => {
    const brandId = req.params.brandId;

    const result = await brandsHelper.getBrandById(brandId);

    return result.success
        ? res.json(result.brand)
        : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const getBrandModels = async (req: Request, res: Response) => {
    const brandId = req.params.brandId;

    const result = await brandsHelper.getBrandModels(brandId);

    return result.success
        ? res.json(result.models)
        : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

export default {
    getAllBrands,
    getBrandById,
    getBrandModels,
};
