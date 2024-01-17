import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import SupabaseListener from '@/app/components/SupabaseListener';
import Sidebar from '@/app/components/Sidebar';
import Footer from '@/app/components/Footer';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SupabaseListener />
      <div className='my-12 flex min-h-[100vh] justify-center md:mx-[10vw] md:mt-20'>
        <Sidebar />
        <div className='w-full justify-center'>{children}</div>
      </div>
      <Footer />
    </>
  );
};

export default SettingsLayout;
