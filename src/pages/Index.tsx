import Header from '@/components/Header';
import SalesDropdown from '@/components/SalesDropdown';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Fullscreen Hero Section */}
      <main className="flex flex-col justify-center items-center text-center px-6 min-h-screen">
        
        {/* "Powered by So So Scaled!" - Positioned properly with extra spacing */}
        <div className="absolute top-8 left-0 right-0 flex justify-center">
          <div className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
            POWERED BY SO SO SCALED!
          </div>
        </div>

        {/* Main Hero Content */}
        <section className="w-full max-w-4xl flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold mb-12 leading-tight">
  Who do you want to <br />
  pitch <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">Polkadot</span> to?
</h1>
          <SalesDropdown />
        </section>
      </main>

      {/* Footer - Now only visible when scrolling */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;

