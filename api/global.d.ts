/// <reference types="express" />

import { UserDocument } from "./src/features/users/User";

declare global {
    namespace Express {
        export interface User extends UserDocument{ }
        export interface Request {
            flash(event: string, message: any): any
        }
    }
}

/**
 * This type definition augments existing definition
 * from @types/express-flash
 */

interface Flash {
    flash(type: string, message: any): void
}

declare module 'express-flash'
export{}