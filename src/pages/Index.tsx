
import Header from '@/components/Header';
import SalesDropdown from '@/components/SalesDropdown';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col">
        <section className="flex-grow flex items-center justify-center relative py-16">
  <div className="absolute top-16 left-0 right-0 flex justify-center">
    <div className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
      POWERED BY SO SO SCALED!
    </div>
  </div>
  
  <div className="max-w-4xl mx-auto w-full px-4 text-center">
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold mb-10 leading-tight">
      Who do you want to <br />
      pitch <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">Polkadot</span> to?
    </h1>
    <SalesDropdown />  // <-- REPLACE THIS LINE
  </div>
</section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
