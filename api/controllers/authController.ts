import express from 'express';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import clientHelper from '../services/helpers/clientHelpers';
import { verifyJWT, comparePasswords } from '../utils/authUtils';
import { invalidateSession, generateAccessToken, generateRefreshToken } from '../services/helpers/authHelpers';

const register = async (req: Request, res: Response) => {
    const { first_name, last_name, phone, email, password } = req.body;

    const isClientExist = await clientHelper.isClientExist(req.body);

    if (isClientExist) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Client with such email phone is already exist' });
    }

    const createdClient: any = await clientHelper.createClient(req.body);

    // @ts-ignore
    req.session.person_id = createdClient.client_id;
    // @ts-ignore
    req.session.email = email;
    // @ts-ignore
    req.session.valid = true;

    const sessionId = req.session.id;
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

    if (!clientWithEmail || !comparePasswords(password, clientWithEmail.password)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Incorrect email or password' });
    }

    delete clientWithEmail.password;

    // @ts-ignore
    req.session.person_id = clientWithEmail.client_id;
    // @ts-ignore
    req.session.email = email;
    // @ts-ignore
    req.session.valid = true;

    const sessionId = req.session.id;
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

    return res.json(clientWithEmail);
};

const logout = async (req: Request, res: Response) => {
    const { accessToken } = req.cookies;

    const { payload: accessTokenPayload } = verifyJWT(accessToken);

    if (accessTokenPayload || req.session?.id) {
        // @ts-ignore
        await invalidateSession(accessTokenPayload.sessionId || req.session.id);
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
