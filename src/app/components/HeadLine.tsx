import Link from 'next/link';
import Image from 'next/image';

const HeadLine = () => {
  return (
    <>
      {/* モバイル端末向け */}
      <div className="md:hidden">
        <div className='flex justify-center'>
          <div className='relative my-10 h-48 w-48 items-center'>
            <Image src={'/images/ssh_fa.png'} alt='StudySyncHub' fill/>
          </div>
        </div>
        <div className='h-full items-center space-y-4 px-[2vw]'>
          <div className='items-center space-y-2 text-center text-3xl font-bold text-gray-200'>
            <h1><span className="bg-gray-700 px-3">みんなで創ろう。</span></h1>
            <h1><span className="bg-gray-700 px-3">学びに「同期」と</span></h1>
            <h1><span className="bg-gray-700 px-3">よりよい学習体験を。</span></h1>
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

      {/* タブレット・PC端末向け */}
      <div className="hidden bg-[url('/images/header.png')] bg-cover p-10 md:flex lg:px-32 lg:py-48">
        <div className='h-full items-center space-y-4 px-[2vw] xl:px-[10vw]'>
          <div className='items-center space-y-2 text-center text-3xl lg:text-5xl font-bold text-gray-200 md:text-4xl'>
            <h1><span className="bg-gray-700 px-3">みんなで創ろう。</span></h1>
            <h1><span className="bg-gray-700 px-3">学びに「同期」と</span></h1>
            <h1><span className="bg-gray-700 px-3">よりよい学習体験を。</span></h1>
          </div>
          <div className='text-center'>
            <Link href={'/auth/signup'}>
              <div className='inline-block rounded-lg bg-gray-800 px-8 py-2 hover:bg-gray-500 lg:rounded-xl lg:px-10'>
                <h4 className=' text-center font-bold text-white lg:text-xl'>
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
