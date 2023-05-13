import { NextRequest, NextResponse } from 'next/server';
import { generateURLShortenHash } from '@modules/url-shortener/lib/url-shortener.lib';
import { storeShortenedURL } from '@modules/url-shortener/lib/url-shortener-db';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const link = body.link;

  const hash = generateURLShortenHash(link);
  const storedURL = await storeShortenedURL({ hash, originalURL: link });

  return NextResponse.json({ hash: storedURL.hash });
};