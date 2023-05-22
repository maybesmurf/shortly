import { Link } from '@prisma/client';
import { nanoid } from 'nanoid';
import { NextRequest, userAgent } from 'next/server';
import qrcode from 'qrcode';

export const CUSTOM_ALIAS_MAX_LENGTH = 14;

export const generateRandomURLAlias = (url: string): string => {
  return nanoid(CUSTOM_ALIAS_MAX_LENGTH);
};

export const getCompleteShortenedURL = (alias: string): string => {
  const BASE_PATH = process.env.NEXT_PUBLIC_URL;
  return `${BASE_PATH}/to/${alias}`;
};

export const getShortenedURLIsExpired = (link: Link): boolean => {
  if (!link.expiresAt) return false;

  return Date.now() >= link.expiresAt.getTime();
};

export const URL_QR_DEFAULT_OPTIONS: qrcode.QRCodeToDataURLOptions = { margin: 1.5, scale: 60, type: 'image/webp' };
