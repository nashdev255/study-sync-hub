'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/app/components/Loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: 'メールアドレスが正しくありません。' }),
});

const Email = ({ email }: { email: string }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const { error: updateUserError } = await supabase.auth.updateUser(
        { email: data.email },
        { emailRedirectTo: `${location.origin}/auth/login` },
      );
      if ( updateUserError ) {
        setMessage('エラーが発生しました。' + updateUserError.message);
        return;
      }

      setMessage('確認用のURLを記載したメールを送信しました。');

      // signOutしないとcookieの情報と新しいメールアドレスとの整合性が取れなくなる
      const { error: signOutError } = await supabase.auth.signOut();
      if(signOutError) {
        setMessage('エラーが発生しました。' + signOutError.message);
        return;
      }

      router.push('/auth/login');

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
      <div className='mb-10 text-center text-xl font-bold text-white'>メールアドレス変更</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          <div className='mb-1 text-sm font-bold text-white'>現在のメールアドレス</div>
          <div className='text-white'>{email}</div>
        </div>

        <div className='mb-5'>
          <div className='mb-1 text-sm font-bold text-white'>新しいメールアドレス</div>
          <input
            type='email'
            className='w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none'
            placeholder='新しいメールアドレス'
            id='email'
            {...register('email', { required: true })}
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.email?.message}</div>
        </div>

        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='w-full rounded-full bg-sky-500 p-2 text-sm font-bold text-white hover:brightness-95'
            >
              変更
            </button>
          )}

          {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default Email;
