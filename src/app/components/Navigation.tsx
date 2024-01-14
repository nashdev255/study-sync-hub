'use client';

import Link from 'next/link';
import Image from 'next/image';
import useStore from '@/store';
// import Image from 'next/image';
import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { GoTriangleDown, GoPerson } from 'react-icons/go';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
type userType = Database['public']['Tables']['users']['Row'];

const Navigation = ({ session, user }: { session: Session | null, user: userType | null }) => {
  const { setUser } = useStore();

  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email as string: '',
      name: session && user ? user.name: '',
      bio: session && user ? user.bio: '',
      avatar_url: session && user ? user.avatar_url: '',
      age: session && user ? user.age: null,
      grade: session && user ? user.grade: null,
      school_name: session && user ? user.school_name: ''
    });
  }, [session, setUser, user]);
  return (
    <header className='w-full'>
      <nav className='flex items-center justify-between p-6 md:px-12 lg:px-24'>
        <Link href={'/'}>
          <Image src={'/images/ssh_fa.png'} alt={'icon'} fill/>
        </Link>

        {session ? (
          <>
            <Link href={`${location.origin}/settings/profile`}>
              <div className='relative mb-5 md:h-32 md:w-32'>
                <Image src={user?.avatar_url || 'default.png'} className='rounded-full object-cover' alt='profile' />
              </div>
            </Link>
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
