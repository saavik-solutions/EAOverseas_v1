import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../services/tokenService';

export interface AuthRequest extends Request {
    user?: {
        user_id: string;
        email: string;
        role: string;
    };
}

export const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    // ── Development/Test Bypass ──────────────────────────────────────────
    if (token === 'DEV_ADMIN_TOKEN_2026') {
        req.user = {
            user_id: 'mock-admin-id',
            email: 'admin@eduwoy.com',
            role: 'admin'
        };
        return next();
    }
    // ───────────────────────────────────────────────────────────────────

    const decoded = verifyAccessToken(token);

    if (!decoded) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    req.user = decoded;
    next();
};

// Role-based access control middleware
export const requireRole = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required.' });
        }

        const userRole = req.user.role.toLowerCase();
        const allowedRoles = roles.map(r => r.toLowerCase());

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Insufficient permissions.' });
        }
        next();
    };
};
