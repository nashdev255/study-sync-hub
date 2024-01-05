import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-slate-300'>
      <div className='flex justify-between mx-12 py-6'>
        <span className=''>{ new Date().getFullYear() } &copy; All Rights Reserved</span>
        <div>
            Build with <Link href={'https://github.com/nashdev255/'}>nashdev255</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
