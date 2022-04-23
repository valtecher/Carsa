import { promisify } from 'util';
import { signJWT } from '../../utils/authUtils';
import { sessionStore } from '../../middleware/session';

sessionStore.get = promisify(sessionStore.get);
sessionStore.set = promisify(sessionStore.set);

export const isSessionValid = async (sessionId: string): Promise<boolean> => {
    try {
        const session = await sessionStore.get(sessionId);
        return session.valid;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const invalidateSession = async (sessionId: string) => {
    try {
        const session = await sessionStore.get(sessionId);
        await sessionStore.set(sessionId, { ...session, valid: false });
    } catch (err) {
        console.error(err);
    }
}

export const generateAccessToken = (sessionId: string, userData: object): string => {
    return signJWT(
        { sessionId, user: { ...userData } },
        process.env.JWT_EXPIRES_IN || '1h'
    );
}

export const generateRefreshToken = (sessionId: string): string => {
    return signJWT(
        { sessionId },
        process.env.JWT_REFRESH_EXPIRES_IN || '30d'
    );
}
