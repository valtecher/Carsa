import e, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import clientHelper from '../services/helpers/clientHelpers';
import { verifyJWT, comparePasswords } from '../services/utils/authUtils';
import { invalidateSession, generateAccessToken, generateRefreshToken } from '../services/helpers/authHelpers';
import { ClientRegistrationBody } from '../DTOs/clientRegistrationBody';
import { CreatedClient } from '../DTOs/createdClient';
import employeeHelper from '../services/helpers/employeeHelper';

const register = async (req: Request, res: Response) => {
    const clientBody: ClientRegistrationBody = req.body;
    const isClientExist = await clientHelper.isClientExist(clientBody);

    if (isClientExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Client with such email phone is already exist' });
    }

    const createdClient: CreatedClient = await clientHelper.createClient(clientBody);

    req.session!.person_id = createdClient.client_id;
    req.session!.email = createdClient.email;
    req.session!.valid = true;

    const sessionId = req.session!.id;
    const accessToken = generateAccessToken(sessionId, { email: createdClient.email, first_name: createdClient.first_name });
    const refreshToken = generateRefreshToken(sessionId);

    res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    return res.status(StatusCodes.CREATED).json(createdClient);
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const clientWithEmail = await clientHelper.getClientByEmail(email);
    const employeeWithEmail = await employeeHelper.getEmployeeByEmail(email);

   

    if ((!clientWithEmail || !comparePasswords(password, clientWithEmail.password!)) && (!employeeWithEmail || !comparePasswords(password, employeeWithEmail.password!)  )) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Incorrect email or password' });
    }


    delete clientWithEmail?.password;
    delete employeeWithEmail?.password;

    const user:any = clientWithEmail ?? employeeWithEmail;

    req.session!.person_id = user.client_id ?? user.person_id;
    req.session!.email = email;
    req.session!.valid = true;

    const sessionId = req.session!.id;
    const accessToken = generateAccessToken(sessionId, { ...clientWithEmail });
    const refreshToken = generateRefreshToken(sessionId);

    res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });
    user.role = user.role || 'Client';
    return res.json(user);
};

const logout = async (req: Request, res: Response) => {
    const { accessToken } = req.cookies;

    const { payload: accessTokenPayload } = verifyJWT(accessToken);

    if (accessTokenPayload || req.session?.id) {
        await invalidateSession(accessTokenPayload?.sessionId || req.session!.id);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    return res.sendStatus(StatusCodes.OK);
}

const getProtected = async (req: Request, res: Response) => {
    res.json({ sensetiveData: 'User private data' });
}

export default {
    register,
    login,
    logout,
    getProtected
}
