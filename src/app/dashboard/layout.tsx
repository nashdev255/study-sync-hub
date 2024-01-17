import Image from 'next/image';
import Link from 'next/link';
import SupabaseListener from '@/app/components/SupabaseListener';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SupabaseListener />
      <main>
        {children}
      </main>
    </>
  );
};

export default DashboardLayout;
