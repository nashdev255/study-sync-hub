'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Loading from '@/app/components/Loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
type Schema = z.infer<typeof schema>;

const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。'}).max(16, { message: '16文字以下にする必要があります。' }),
  email: z.string().email({ message: 'メールアドレスを正しく入力してください。' }),
  password: z.string().min(6, { message: '6文字以上入力する必要があります。' }),
});

const Signup = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: '', email: '', password: '' },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        /* 確認メールのリダイレクト先の指定 */
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if(errorSignup) {
        setMessage('エラーが発生しました。' + errorSignup.message);
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ name: data.name })
        .eq('email', data.email);

      if(updateError) {
        setMessage('エラーが発生しました。' + updateError.message);
        return;
      }

      /* 入力フォームのクリア */
      reset();
      setMessage('本登録用のURLを記載したメッセージを送信しました。メールをご確認の上、メール本文中のURLをクリックして本登録へお進みください。');
      
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
        <h3 className='text-center text-xl font-bold'>StudySyncHubアカウントの取得</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {/* ユーザーネーム入力 */}
          <div>
            <input
              type="text"
              className='w-full rounded-md border p-3 focus:border-sky-500 focus:outline-none'
              placeholder='ユーザーネーム'
              id='name'
              {...register('name', { required: true })}
            />
            <div className='my-3 text-center text-sm text-red-500'>{errors.name?.message}</div>
          </div>

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

          {/* サインアップボタン */}
          <div>
            {loading ? (
              <Loading />
            ) : (
              <button
                type='submit'
                className='w-full rounded-full bg-sky-500 p-3 text-sm font-bold text-white hover:brightness-95'
              >
                サインアップ
              </button>
            )}
          </div>
        </form>

        {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}

        <div className='mb-5 text-center text-sm'>
          <Link href={'/auth/login'} className='font-bold text-gray-500'>
            ログインはこちら
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
