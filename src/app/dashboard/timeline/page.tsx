import Timeline from '@/app/components/Timeline';
import { Database } from '@/lib/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const TimelinePage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if ( !session ) redirect('/auth/login');

  return <Timeline />;
};

export default TimelinePage;
