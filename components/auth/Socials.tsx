'use client';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '../ui/button';

export default function Socials() {
  return (
    <div>
      <Button
        className='flex w-full gap-2 font-semibold'
        variant='outline'
        onClick={() => signIn('google', { redirect: false, callbackUrl: '/' })}
      >
        <FcGoogle size={22} />
        <span>Sign in with Google</span>
      </Button>
    </div>
  );
}
