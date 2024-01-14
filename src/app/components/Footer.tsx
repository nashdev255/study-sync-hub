import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className='mx-12 flex justify-between py-6 text-sm text-slate-400'>
        <span className=''>{ new Date().getFullYear() } &copy; All Rights Reserved</span>
        <div>
            Build with <Link href={'https://github.com/nashdev255/'} target='blank'>nashdev255</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
