'use client';

import Image from 'next/image';
import Link from 'next/link';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className='bg-gray-900'>
        <div className='mx-8 flex justify-between py-4'>
          <div className='px-0 sm:px-8'>
            <Link href={'/'}>
              <Image src={'/images/ssh_fa.png'} alt={'icon'} height={'65'} width={'65'} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardLayout;
