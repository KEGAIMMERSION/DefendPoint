import { Request, Response, NextFunction } from "express"

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error('Error:', err.stack)
    res.status(500).json({
        message: 'Internal server error',
        timestamp: new Date().toISOString()
    })
}
