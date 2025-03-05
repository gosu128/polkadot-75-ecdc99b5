import Header from '@/components/Header';
import SalesDropdown from '@/components/SalesDropdown';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      {/* Full-height container ensuring proper spacing and layout */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-6">
        
        {/* "Powered by So So Scaled!" - Positioned properly with extra spacing */}
        <div className="mb-6">
          <div className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
            POWERED BY SO SO SCALED!
          </div>
        </div>

        {/* Main Content - Stretches to full height */}
        <section className="w-full max-w-4xl flex flex-col items-center justify-center">
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
