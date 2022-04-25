import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve(process.cwd(), 'private.pem'));
const publicKey = fs.readFileSync(path.resolve(process.cwd(), 'public.pem'));

export function signJWT(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, privateKey, { algorithm: "RS512", expiresIn });
}

export function verifyJWT(token: string): { payload: object | null, expired: boolean } {
    try {
        const decoded = jwt.verify(token, publicKey);
        return { payload: decoded, expired: false };
    } catch (error: any) {
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}

export const hashPassword = (passPlain: string): string => {
    return bcrypt.hashSync(passPlain, 10);
}

export const comparePasswords = (passPlain: string, passHash: string): boolean => {
    return bcrypt.compareSync(passPlain, passHash);
}
