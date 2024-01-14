'use server';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Navigation from './Navigation';

import type { Database } from '@/lib/database.types';

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let user = null;
  if(session) {
    const { data: currentUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    user = currentUser;

    /* メールアドレスを変更した場合にプロフィールを更新する */
    if ( currentUser && currentUser.email !== session.user.email ) {
      const { data: updatedUser } = await supabase
        .from('users')
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single();
      
      user = updatedUser;
    }
  }

  return <Navigation session={session} user={user} />;
};

export default SupabaseListener;
