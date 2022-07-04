import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import configurationHelpers from '../services/helpers/configurationHelpers';

const getAllConfigurations = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || undefined;
  const offset = Number(req.query.offset) || undefined;

  const configurations = await configurationHelpers.getAllConfigurations({ limit, offset });

  return res.json(configurations);
};

const getConfigurationById = async (req: Request, res: Response) => {
  const configurationId = req.params.configurationId;

  const result = await configurationHelpers.getConfigurationById(configurationId);

  return result.success
    ? res.json(result.configuration)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const createConfiguration = async (req: Request, res: Response) => {
  const configurationBody = req.body;

  const result = await configurationHelpers.createConfiguration(configurationBody);

  return result.success
    ? res.json(result.configuration)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const updateConfigurationById = async (req: Request, res: Response) => {
  const configurationId = req.params.configurationId;
  const configurationBody = req.body;

  const result = await configurationHelpers.updateConfigurationById(configurationId, configurationBody);

  return result.success
    ? res.json(result.configuration)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

const deleteConfigurationById = async (req: Request, res: Response) => {
  const configurationId = req.params.configurationId;

  const result = await configurationHelpers.deleteConfigurationById(configurationId);

  return result.success
    ? res.sendStatus(StatusCodes.OK)
    : res.status(StatusCodes.BAD_REQUEST).json({ message: result.message });
};

export default {
  getAllConfigurations,
  getConfigurationById,
  createConfiguration,
  updateConfigurationById,
  deleteConfigurationById
};
