import { promisify } from 'util';
import { signJWT } from '../../utils/authUtils';
import { sessionStore } from '../../middleware/session';

const store = {
    set: promisify(sessionStore.set),
    get: promisify(sessionStore.get)
}

export const isSessionValid = async (sessionId: string): Promise<boolean> => {
    try {
        const session = await store.get(sessionId);
        return session?.valid ?? false;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const invalidateSession = async (sessionId: string) => {
    try {
        const session = await store.get(sessionId);
        if (session) {
            await store.set(sessionId, { ...session, valid: false });
        }
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
