'use client'

import { useEffect, useState } from 'react';
import { useAuth } from './../store/useAuth';
import { useRouter } from 'next/navigation';

export const Authentication = () => {
  const {user, signIn, signOut} = useAuth();
  const router = useRouter();
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) return;
    signIn(loggedInUser);
  }, []);

  return (
    <>
      {user && (
        <button
          className='top-2 right-2 text-white'
          onClick={() => {
            signOut();
            // localStorage.removeItem('user');
            router.push('/');
          }}
        >
          LogOut
        </button>
      )}
      
    </>
  )
}