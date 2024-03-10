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
        <ul className='flex space-x-4 text-lg font-bold text-white md:text-xl'>
          {options.map((item, index) => (
            <Link key={index} href={item.href} className={`${pathname === item.href && 'border-b-2 border-white'} py-2 hover:border-b-2 hover:bg-slate-500 hover:bg-opacity-[0.30] md:px-8`}>
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
