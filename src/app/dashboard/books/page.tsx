import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import Books from '@/app/components/Books';
import { Database } from '@/lib/database.types';

const BooksPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if ( !session ) redirect('/auth/login');
  
  return <Books />;
};

export default BooksPage;
