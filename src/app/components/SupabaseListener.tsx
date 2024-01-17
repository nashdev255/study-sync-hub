'use server';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Header from '@/app/components/Header';
import HeadLine from '@/app/components/HeadLine';

import type { Database } from '@/lib/database.types';

const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let user = null;
  if ( session ) {
    const { data: currentUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();

    user = currentUser;

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

  return <Header session={session} user={user} />;
};

export default SupabaseListener;
