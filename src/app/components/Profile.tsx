'use client';

import { useCallback, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Loading from '@/app/components/Loading';
import * as z from 'zod';
import type { Database } from '@/lib/database.types';
import useStore from '@/store';
type Schema = z.infer<typeof schema>

import { ImFilePicture } from 'react-icons/im';

const schema = z.object({
  name: z.string().min(2, { message: '2文字以上入力する必要があります。' }).max(16, { message: '16文字以下で入力する必要があります。' }),
  bio: z.string().min(0).max(1000, { message: '最大文字数を超過しています。' }),
  age: z.number().optional().nullable(),
  grade: z.number().optional().nullable(),
  school_name: z.string()
});

const Profile = () => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [fileMessage, setFileMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('/default.png');
  const { user } = useStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name ? user.name: '',
      bio: user.bio ? user.bio : '',
      age: user.age ? user.age : null,
      grade: user.grade ? user.grade : null,
      school_name: user.school_name ? user.school_name : '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if(user && user.avatar_url) {
      setAvatarUrl(user.avatar_url);
    }
  }, [user]);

  const onUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileMessage('');

    if ( !files || files?.length === 0 ) {
      setFileMessage('画像をアップロードしてください。');
      return;
    }

    const fileSize = files[0]?.size / 1024 / 1024;
    const fileType = files[0]?.type;

    // 2MB
    if ( fileSize > 2 ) {
      setFileMessage('画像サイズを2MB以下にする必要があります。');
      return;
    }

    if ( fileType !== 'image/jpeg' && fileType !== 'image/png' ) {
      setFileMessage('画像はjpgまたはpng形式である必要があります。');
      return;
    }

    setAvatar(files[0]);
  }, []);

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      let avatar_url = user.avatar_url;

      if(avatar) {
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('user')
          .upload(`${user.id}/${uuidv4()}`, avatar);

        if ( storageError ) {
          setMessage('エラーが発生しました。' + storageError.message);
          return;
        }

        if ( avatar_url ) {
          const fileName = avatar_url.split('/').slice(-1)[0];
          await supabase.storage.from('user').remove([`${user.id}/${fileName}`]);
        }

        const { data: urlData } = await supabase
          .storage
          .from('user')
          .getPublicUrl(storageData.path);
          
        avatar_url = urlData.publicUrl;

        const { error: updateError } = await supabase
          .from('users')
          .update({
            name: data.name,
            bio: data.bio,
            avatar_url: avatar_url,
            age: data.age,
            grade: data.grade,
            school_name: data.school_name
          })
          .eq('id', user.id);
          
        if ( updateError ) {
          setMessage('エラーが発生しました。' + updateError.message);
          return;
        }

        setMessage('プロフィールを更新しました。');
      }

    } catch ( error ) {
      setMessage('エラーが発生しました。' + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className='mx-8 justify-center md:mx-16'>
      <div className='mb-10 text-center text-xl font-bold text-white'>プロフィール</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* アイコンの表示と選択 */}
        <div className='mb-5'>
          <div className='mb-5 flex flex-col items-center justify-center text-sm'>
            <label htmlFor='avatar' className='relative mb-5'>
              <div className='duration-150 hover:brightness-[0.75]'>
                <div className='h-36 w-36 lg:h-40 lg:w-40'>
                  <Image src={avatarUrl} className='rounded-full object-cover hover:cursor-pointer' alt='avatar' fill/>
                </div>
                <ImFilePicture className='absolute bottom-0 right-0 z-10 hover:cursor-pointer' size={'25'} color={'white'} />
              </div>
            </label>
            <input type="file" id='avatar' onChange={onUploadImage} className='hidden' />
            {fileMessage && <div className='my-5 text-center text-red-500'>{fileMessage}</div>}
          </div>
        </div>

        {/* 名前の表示と入力 */}
        <div className='mb-5'>
          <div className='mb-1 text-sm font-bold text-white'>名前</div>
          <input
            type="text"
            className='w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none'
            placeholder='名前'
            id='name'
            {...register('name', { required: true })}
            required
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.name?.message}</div>
        </div>

        {/* 自己紹介の表示と入力 */}
        <div className='mb-5'>
          <div className='mb-1 text-sm font-bold text-white'>自己紹介</div>
          <textarea
            className='w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none'
            placeholder='自己紹介'
            id='bio'
            {...register('bio', { required: false })}
            rows={5}
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.bio?.message}</div>
        </div>

        {/* 年齢の表示と入力 */}
        <div className='mb-5'>
          <div className='mb-1 text-sm font-bold text-white'>年齢</div>
          <input
            type="text"
            className='w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none'
            placeholder='年齢'
            id='age'
            {...register('age', { valueAsNumber: true, required: false })}
            required
          />
          <div className='my-3 text-center text-sm text-red-500'>{errors.age?.message}</div>
        </div>

        <div className='flex space-x-6'>
          {/* 学校の表示と入力 */}
          <div className='mb-5'>
            <div className='mb-1 text-sm font-bold text-white'>学校名</div>
            <input
              type="text"
              className='w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none'
              placeholder='学校名'
              id='school_name'
              {...register('school_name', { required: false })}
              required
            />
            <div className='my-3 text-center text-sm text-red-500'>{errors.school_name?.message}</div>
          </div>

          {/* 学年の表示と入力 */}
          <div className='mb-5'>
            <div className='mb-1 text-sm font-bold text-white'>学年</div>
            <input
              type="text"
              className='w-full rounded-md border px-3 py-2 focus:border-sky-500 focus:outline-none'
              placeholder='学年'
              id='grade'
              {...register('grade', { valueAsNumber: true, required: false })}
              required
            />
            <div className='my-3 text-center text-sm text-red-500'>{errors.grade?.message}</div>
          </div>
        </div>

        {/* 変更ボタン */}
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
          {message && <div className='my-5 text-center text-red-500'>{message}</div>}
        </div>
      </form>
    </div>
  );
};

export default Profile;
