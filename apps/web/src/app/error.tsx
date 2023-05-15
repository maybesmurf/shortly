'use client'; // Error components must be Client Components

import Button from '@modules/ui/components/button/button';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-4 flex w-full flex-col items-center md:mx-0">
      <div className="my-6 w-full rounded-lg bg-neutral-100 p-4 px-4 shadow-lg dark:bg-neutral-800 sm:px-6 md:my-14 md:max-w-lg md:p-6 lg:my-20">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl md:text-5xl">
            An error occurred!
          </h1>
          <p className="max-w-lg text-center text-neutral-800 dark:text-neutral-100 md:text-lg">
            We apologize for the inconvenience, but it seems that an error has occurred. Our team has been notified and
            is working diligently to resolve the issue.
          </p>

          <p className="max-w-lg text-center font-bold text-red-800 dark:text-red-300 md:text-lg">{error.message}</p>

          <div className="flex w-full flex-col gap-2">
            <Link href="/">
              <Button className="w-full">Go Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}