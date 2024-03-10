'use client';

import { useState } from 'react';
import { IoIosClose, IoIosPaper } from 'react-icons/io';

const Progress = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className='mb-8 flex justify-center'>
        <div className='w-[80vw]'>
          <h1 className='m-12 text-4xl font-bold'>進捗の管理</h1>
          <div className='flex justify-center'>
            <div className='flex flex-col items-center space-y-2'>
              <p className='text-xl font-bold text-slate-300'>まだ進捗を生んでいませんか？</p>
              <IoIosPaper size={250} color={'white'} />
              <div className='rounded-full bg-[#0d9ddd] px-6 py-2 hover:cursor-pointer hover:bg-[#0987bc]'>
                <button onClick={() => { setIsModalOpen(true); }}>
                  <p className='text-lg font-bold text-white'>新しく生やす</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <div className='absolute left-1/2 top-1/2 h-[80vh] w-[60vw] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow-lg'>
          <div className='flex justify-end p-2'>
            <button
              className='rounded-md hover:bg-slate-500 hover:bg-opacity-[0.30]'
              onClick={() => { setIsModalOpen(false); }}
            >
              <IoIosClose size={'32'} />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Progress;
