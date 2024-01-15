'use client';

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/app/components/Footer';

const subNavigation = [
  {
    name: 'プロフィール',
    icon: UserCircleIcon,
    href: '/settings/profile',
  },
  {
    name: 'メールアドレス',
    icon: EnvelopeIcon,
    href: '/settings/email',
  },
  {
    name: 'パスワード',
    icon: KeyIcon,
    href: '/settings/password'
  },
  {
    name: 'ログアウト',
    icon: ArrowLeftOnRectangleIcon,
    href: '/settings/logout'
  }
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <>
      <div className='my-12 flex min-h-[100vh] justify-center md:mx-[10vw] md:mt-20'>
        <div className='mt-8 flex flex-col space-y-1 text-sm font-bold text-white md:mt-12 md:text-lg'>
          {subNavigation.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className={`${item.href === pathname && 'bg-gray-500 text-gray-300'} flex rounded-full px-3 py-2 hover:bg-gray-600 md:w-[25vw] lg:w-[15vw]`}>
                <item.icon className='inline-block h-8 w-8' />
                <div className="ml-2 hidden md:block">{ item.name }</div>
              </div>
            </Link>
          ))}
        </div>
        <div className='w-full justify-center'>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default SettingsLayout;
