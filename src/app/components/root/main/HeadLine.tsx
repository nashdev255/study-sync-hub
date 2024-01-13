import Link from 'next/link';
import Image from 'next/image';

const HeadLine = () => {
  return (
    <>
      <div className="md:bg-[url('/images/header.png')] bg-cover sm:flex sm:space-x-12 md:py-12 xl:py-48">
        <div className='md:hidden flex justify-center'>
          <div className='h-auto w-auto py-10 items-center'>
            <Image src={'/images/ssh_fa.png'} alt='StudySyncHub' height={'200'} width={'200'} />
          </div>
        </div>
        <div className='my-auto h-full items-center space-y-4 px-[2vw] xl:px-[10vw]'>
          <div className='items-center text-center text-3xl md:text-4xl font-bold text-gray-200 space-y-2'>
            <h1><span className="px-3 bg-gray-700">みんなで創ろう。</span></h1>
            <h1><span className="px-3 bg-gray-700">学びに「同期」と</span></h1>
            <h1><span className="px-3 bg-gray-700">よりよい学習体験を。</span></h1>
          </div>
          <div className='text-center'>
            <Link href={'/auth/signup'}>
              <div className='inline-block rounded-lg bg-gray-800 px-8 py-2 hover:bg-gray-500'>
                <h4 className=' text-center font-bold text-white'>
                  今すぐはじめる
                </h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadLine;
