'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GoPerson, GoTriangleDown } from 'react-icons/go';
import { IconContext } from 'react-icons';
import type { Session } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/database.types';
type ProfileType = Database['public']['Tables']['users']['Row'];
import useStore from '@/store';

const Header = ({
  session,
  user
}: {
  session: Session | null,
  user: ProfileType | null
}) => {
  const { setUser } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    setUser({
      id: session ? session.user.id : '',
      email: session ? session.user.email! : '',
      name: session && user ? user.name : '',
      bio: session && user ? user.bio : '',
      age: session && user ? user.age : null,
      grade: session && user ? user.grade : null,
      school_name: session && user ? user.school_name : '',
      avatar_url: session && user ? user.avatar_url : '',
    });
  }, [session, setUser, user]);

  const getBasePath = (path: string) => {
    const segments = pathname.split('/');
    if ( segments.length > 1 && segments[1] === 'settings' ) {
      return '/settings';
    }
    return path;
  };

  return (
    <header className='bg-gray-900'>
      <div className='flex justify-center py-4 space-x-[55vw]'>
        <div className='relative h-14 w-14 rounded-full object-cover md:h-16 md:w-16'>
          <Link href={'/'}>
            <Image src={'/images/ssh_fa.png'} alt={'icon'} fill/>
          </Link>
        </div>
        <nav className='flex items-center justify-between'>
          {session ? (
            <div className={`${getBasePath(pathname) === '/settings' && 'hidden'}`}>
              <Link href={'/settings/profile'}>
                <div className='relative h-14 w-14 md:h-16 md:w-16'>
                  <Image src={ user?.avatar_url || '/default.png' } className='rounded-full object-cover' alt='profile' fill/>
                </div>
              </Link>
            </div>
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
      </div>
    </header>
  );
};

export default Header;
