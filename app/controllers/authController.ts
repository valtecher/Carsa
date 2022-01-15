import {Request, Response, NextFunction} from 'express'
import {StatusCodes} from 'http-status-codes'
import jwt from 'jsonwebtoken'
import {comparePasswords} from '../utils/authUtils'
import {ClientType} from '../../types/client'

const clientRepository = require('../repositories/clientRepository')

const login = async (req: Request, res: Response, next: NextFunction) => {
    const {email, password}: {email:string, password: string} = req.body
    let failed = false; 
    const clientWithEmail: ClientType = await clientRepository.getClientByEmail(email)
    if (!clientWithEmail){
        console.log('wrong email')
            failed = true;
    }
    const validPass = comparePasswords(password, clientWithEmail.password)
    if (!validPass){
        console.log('wrong password')
        failed = true;
    }
        

    const token = await jwt.sign(
        {
            email: clientWithEmail.email,
            id: clientWithEmail.person_id,
            phone: clientWithEmail.phone
        },
        process.env.JWT_SECRET as string,
        {
            algorithm: 'HS256', // TODO: Change to RS256
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
    if(!failed){
        console.log('authenticated');
        res.header('Access-Token', token).send(token)
    }else {
        console.log('here');
        res.status(401).json({success: false, status: '401'})
    }
    

    
}


const register = async (req: Request, res: Response, next: NextFunction) => {
    const clientBody = req.body
    const createdClient = await clientRepository.addClient(clientBody)

    if (createdClient) {
        const token = jwt.sign({email: createdClient.email, id: createdClient.person_id, phone: createdClient.phone}, process.env.JWT_SECRET as string, {
            algorithm: 'HS256', // TODO: Change to RS256
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        res.header('Access-Token', token).status(StatusCodes.CREATED).json({accessToken: token, data: createdClient})
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Client already exists'})
    }
}


export default {
    login,
    register
}