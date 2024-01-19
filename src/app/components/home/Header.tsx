'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='bg-gray-900'>
      <div className='mx-8 flex justify-end py-4 md:justify-between'>
        <div className='relative mx-4 hidden h-16 w-16 md:flex'>
          <Link href={'/'}>
            <Image src={'/images/ssh_fa.png'} alt={'icon'} fill/>
          </Link>
        </div>
        <nav className='flex items-center'>
          <ul className='flex'>
            {/* <li className='px-4'>
              <Link href={'https://github.com/nashdev255/ssh-mock'} target='blank'>
                <IconContext.Provider value={{ size: '40px'}}>
                  <FaGithub />
                </IconContext.Provider>
              </Link>
            </li>
            <li className='px-4'>
              <Link href={'https://github.com/nashdev255/ssh-mock'} target='blank'>
                <IconContext.Provider value={{ size: '40px'}}>
                  <FaGithub />
                </IconContext.Provider>
              </Link>
            </li> */}
            <li className='p-4 md:py-0'>
              <Link href={'https://github.com/nashdev255/ssh-mock'} target='blank'>
                <IconContext.Provider value={{ size: '40px', color:'white'}}>
                  <FaGithub />
                </IconContext.Provider>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
