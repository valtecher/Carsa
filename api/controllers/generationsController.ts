import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import generationHelpers from '../services/helpers/generationHelpers';

const getGenerationById = async (req: Request, res: Response) => {
    const generationId = req.params.generationId;

    const result = await generationHelpers.getGenerationById(generationId);

    return result.success
        ? res.json(result.generation)
        : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

export default {
    getGenerationById
};
