'use client';

import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
    <div className='grid grid-cols-3 gap-3'>
      <div className='col-span-1 flex flex-col space-y-1 text-sm font-bold text-white'>
        {subNavigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <div className={`${item.href === pathname && 'bg-gray-500 text-gray-300'} rounded-full px-3 py-2 hover:bg-gray-600`}>
              <item.icon className='mr-2 inline-block h-5 w-5' />
              { item.name }
            </div>
          </Link>
        ))}
      </div>
      <div className='col-span-2'>{children}</div>
    </div>
  );
};

export default SettingsLayout;
