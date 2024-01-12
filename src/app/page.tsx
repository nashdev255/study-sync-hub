import Header from '@/app/components/root/header/Header';
import Main from '@/app/components/root/main/Main';
import Footer from '@/app/components/root/footer/Footer';

const Home = async () => {
  return (
    <>
      <div className='space-y-8'>
        <Header />
        <Main />
      </div>
      <Footer />
    </>
  );
};

export default Home;
