'use client';

import Link from 'next/link';
import useStore from '@/store';
// import Image from 'next/image';
import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GoTriangleDown, GoPerson } from 'react-icons/go';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
type ProfileType = Database['public']['Tables']['profiles']['Row'];

const Navigation = ({ session, profile }: { session: Session | null, profile: ProfileType | null }) => {
  const { setUser } = useStore();

  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email as string: '',
      name: session && profile ? profile.name: '',
      introduce: session && profile ? profile.introduce: '',
      avatar_url: session && profile ? profile.avatar_url: '',
    });
  }, [session, setUser, profile]);
  return (
    <header className='w-full'>
      <nav className='flex items-center justify-between p-6 md:px-12 lg:px-24'>
        <h3 className='text-xl font-bold'><Link href={'/'}>HackZenith</Link></h3>

        {session ? (
          <>
            <ul className='flex items-center space-x-2 md:space-x-4'>
              <a className='flex space-x-1' href=''>
                <p>言語</p>
                <IconContext.Provider value={{ size: '1.5em' }}>
                  <div>
                    <GoTriangleDown />
                  </div>
                </IconContext.Provider>
              </a>
            </ul>
          </>
        ) : (
          <>
            <ul className='flex items-center space-x-2 md:space-x-4'>
              <a className='flex space-x-1' href=''>
                <p>言語</p>
                <IconContext.Provider value={{ size: '1.5em' }}>
                  <div>
                    <GoTriangleDown />
                  </div>
                </IconContext.Provider>
              </a>
              <Link href={'/auth/login'}>
                <div className='flex space-x-2'>
                  <IconContext.Provider value={{ size: '1.5em' }}>
                    <div>
                      <GoPerson />
                    </div>
                  </IconContext.Provider>
                  <p>ログイン</p>
                </div>
              </Link>
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
