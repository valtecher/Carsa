import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { signJWT, verifyJWT } from "../services/utils/authUtils";
import { isSessionValid } from '../services/helpers/authHelpers';

export const requireAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const { payload: accessTokenPayload, expired: isAccessTokenExpired } = verifyJWT(accessToken);

    // For a valid Access Token
    if (accessTokenPayload && !isAccessTokenExpired) {
        if (!await isSessionValid(accessTokenPayload.sessionId)) {
            return res.sendStatus(StatusCodes.UNAUTHORIZED);
        }

        return next();
    }

    // Access Token expired but Refresh Token is valid
    const { payload: refreshTokenPayload } = isAccessTokenExpired && refreshToken
        ? verifyJWT(refreshToken)
        : { payload: null };

    if (!refreshTokenPayload) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const sessionId = refreshTokenPayload.sessionId;

    if (!await isSessionValid(refreshTokenPayload.sessionId)) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    const newAccessToken = signJWT(sessionId, process.env.JWT_EXPIRES_IN || '1h');
    const newRefreshToken = signJWT({ sessionId: sessionId }, process.env.JWT_REFRESH_EXPIRES_IN || '30d');

    res.cookie("accessToken", newAccessToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
    });

    res.cookie("refreshToken", newRefreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
    });

    return next();
}
