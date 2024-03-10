'use client';

import { useState } from 'react';
import { IoIosClose, IoIosPaper } from 'react-icons/io';

const Progress = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
                <p className='text-lg font-bold text-white'>新しく生やす</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
