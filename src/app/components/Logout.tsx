'use client';
import { FormEvent, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import type { Database } from '@/lib/database.types';

const Logout = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if ( error ) {
        setMessage('エラーが発生しました。' + error.message);
        return;
      }

      router.push('/');

    } catch ( error ) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div>
      <div className='mb-5 text-white text-center'>ログアウトしますか？</div>
      <form onSubmit={onSubmit}>
        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='w-full rounded-full bg-red-500 p-2 text-sm font-bold text-white hover:brightness-95'
            >
              ログアウト
            </button>
          )}
        </div>
      </form>
      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
    </div>
  );
};

export default Logout;
