'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FaGithub } from 'react-icons/fa';

const Header = () => {
  return (
    <header className=' bg-'>
      <div className='flex justify-between mx-8 py-4'>
        <div className='px-8'>
          <Link href={'/images/ssh_gray_fa.png'}>
            <Image src={'/images/ssh_fa.png'} alt={'icon'} height={'75'} width={'75'} />
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
            <li className='px-4'>
              <Link href={'https://github.com/nashdev255/ssh-mock'} target='blank'>
                <IconContext.Provider value={{ size: '40px'}}>
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
