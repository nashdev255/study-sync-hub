'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Loading from '@/app/Loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
type Schema = z.infer<typeof schema>;

const schema = z.object({
  email: z.string().email({ message: 'メールアドレスが正しくありません。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
});

const Login = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(false);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if(error) {
        setMessage('エラーが発生しました。' + error.message);
        return;
      }

      router.push('/');
      
    } catch(error) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className='my-6 flex justify-center'>
      <div className='mx-6 w-full max-w-[500px] space-y-6'>
        <h3 className='text-center text-xl font-bold'>HackZenithにログインする</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* メールアドレス入力 */}
          <div>
            <input
              type="email"
              className='w-full rounded-md border p-3 focus:border-sky-500 focus:outline-none'
              placeholder='メールアドレス'
              id='email'
              {...register('email', { required: true })}
            />
            <div className='my-3 text-center text-sm text-red-500'>{errors.email?.message}</div>
          </div>

          {/* パスワード入力 */}
          <div>
            <input
              type="password"
              className='w-full rounded-md border p-3 focus:border-sky-500 focus:outline-none'
              placeholder='パスワード'
              id='password'
              {...register('password', { required: true })}
            />
            <div className='my-3 text-center text-sm text-red-500'>{errors.password?.message}</div>
          </div>

          {/* ログインボタン */}
          <div>
            {loading ? (
              <Loading />
            ) : (
              <button
                type='submit'
                className='w-full rounded-full bg-sky-500 p-3 text-sm font-bold text-white hover:brightness-95'
              >
                ログイン
              </button>
            )}
          </div>
        </form>

        {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}

        <div className='mb-4 text-center text-sm'>
          <Link href={'/auth/reset-password'} className='font-bold text-gray-500'>
            パスワードを忘れた方はこちら
          </Link>
        </div>

        <div className='mb-5 text-center text-sm'>
          <Link href={'/auth/signup'} className='text-gray font-bold'>
            新しいアカウントを作成する
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
