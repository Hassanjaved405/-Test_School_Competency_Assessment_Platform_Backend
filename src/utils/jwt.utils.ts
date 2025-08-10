import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types';

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is required in environment variables');
  }
  const expiresIn = process.env.JWT_ACCESS_EXPIRE || '15m';
  
  return jwt.sign(payload as any, secret, { expiresIn: expiresIn as any });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is required in environment variables');
  }
  const expiresIn = process.env.JWT_REFRESH_EXPIRE || '7d';
  
  return jwt.sign(payload as any, secret, { expiresIn: expiresIn as any });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is required in environment variables');
  }
  return jwt.verify(token, secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET is required in environment variables');
  }
  return jwt.verify(token, secret) as TokenPayload;
};

export const generateTokenPair = (payload: TokenPayload): { accessToken: string; refreshToken: string } => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload)
  };
};