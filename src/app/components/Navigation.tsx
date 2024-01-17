'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const options = [
  {
    name: 'TimeLine',
    href: '/dashboard/timeline'
  },
  {
    name: 'Progress',
    href: '/dashboard/progress'
  },
  {
    name: 'Articles',
    href: '/dashboard/articles'
  },
  {
    name: 'Books',
    href: '/dashboard/books'
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className='flex w-full justify-center'>
        <ul className='flex space-x-4 text-xl font-bold text-white'>
          {options.map((item, index) => (
            <li key={index} className={`${pathname === item.href && 'border-b-2 border-white'} px-8 py-2`}>
              <Link href={item.href}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
