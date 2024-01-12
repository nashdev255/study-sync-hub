import Link from 'next/link';
import Image from 'next/image';

const HeadLine = () => {
  return (
    <>
      <div className="inline bg-[url('/images/header.png')] bg-cover sm:flex justify-center sm:space-x-12">
        <div className='flex justify-center'>
          <div className='h-auto w-auto py-4 items-center'>
            <Image src={'/images/ssh_fa.png'} alt='StudySyncHub' height={'200'} width={'200'} />
          </div>
        </div>
        <div className='my-auto h-full items-center space-y-4'>
          <div className='items-center text-center text-4xl font-bold text-gray-800'>
            <h1>勉強で</h1>
            <h1>未来を掴もう</h1>
          </div>
          <div className='text-center'>
            <Link href={'/auth/signup'}>
              <div className='inline-block rounded-lg bg-gray-800 px-8 py-2 hover:bg-cyan-700'>
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
