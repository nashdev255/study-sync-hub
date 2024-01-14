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

const ResetPassword = () => {
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
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${location.origin}/auth/reset-password/confirm`,
      });

      if(error) {
        setMessage('エラーが発生しました。' + error.message);
        return;
      }

      setMessage('パスワードリセットに必要なメールを送信しました。');
      
    } catch(error) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className='mx-auto max-w-[400px]'>
      <div className='mb-10 text-center text-xl font-bold'>パスワードを忘れた場合</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-5'>
          <div className='mb-1 text-sm font-bold'>メールアドレス</div>
          <input
            type="email"
            className='w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none'
            placeholder='メールアドレス'
            id='email'
            {...register('email', { required: true })}
          />
        </div>

        <div className='mb-5'>
          {loading ? (
            <Loading />
          ) : (
            <button
              type='submit'
              className='w-full rounded-full bg-sky-500 p-2 text-sm font-bold text-white hover:brightness-95'
            >
              送信
            </button>
          )}
        </div>
      </form>
      {message && <div className='my-5 text-center text-sm text-red-500'>{message}</div>}
    </div>
  );
};

export default ResetPassword;
