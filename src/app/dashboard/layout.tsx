import Image from 'next/image';
import Link from 'next/link';
import SupabaseListener from '@/app/components/SupabaseListener';
import Navigation from '@/app/components/Navigation';
import Footer from '@/app/components/Footer';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SupabaseListener />
      <main className="min-h-[100vh]">
        <Navigation />
        <div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardLayout;
