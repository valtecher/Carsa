import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import modelHelpers from '../services/helpers/modelHelpers';

const getModelById = async (req: Request, res: Response) => {
    const modelId = req.params.modelId;

    const result = await modelHelpers.getModelById(modelId);

    return result.success
        ? res.json(result.model)
        : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const getModelGenerations = async (req: Request, res: Response) => {
    const modelId = req.params.modelId;

    const result = await modelHelpers.getModelGenerations(modelId);

    return result.success
        ? res.json(result.generations)
        : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

export default {
    getModelById,
    getModelGenerations
};
