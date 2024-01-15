import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import Articles from '@/app/components/Articles';
import { Database } from '@/lib/database.types';

const ArticlesPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if ( !session ) redirect('/auth/login');

  return <Articles />;
};

export default ArticlesPage;
