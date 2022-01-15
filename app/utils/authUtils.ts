const bcrypt = require('bcryptjs')

export const hashPassword = (passPlain: string): string => {
    return bcrypt.hashSync(passPlain, 10)
}

export const comparePasswords = (passPlain: string, passHash: string): boolean => {
    return bcrypt.compareSync(passPlain, passHash)
} 