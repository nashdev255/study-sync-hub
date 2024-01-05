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

  let profile = null;
  if(session) {
    const { data: currentProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    profile = currentProfile;

    /* メールアドレスを変更した場合にプロフィールを更新する */
    if(currentProfile && currentProfile.email !== session.user.email) {
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select('*')
        .single();
      
      profile = updatedProfile;
    }
  }

  return <Navigation session={session} profile={profile} />;
};

export default SupabaseListener;
