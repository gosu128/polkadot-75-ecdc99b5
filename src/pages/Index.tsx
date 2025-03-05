import Header from '@/components/Header';
import SalesDropdown from '@/components/SalesDropdown';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Fullscreen layout with proper spacing */}
      <main className="flex-grow flex flex-col items-center justify-center relative">
        {/* "Powered by So So Scaled" - Moved lower for better spacing */}
        <div className="absolute top-24 left-0 right-0 flex justify-center">
          <div className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full">
            POWERED BY SO SO SCALED!
          </div>
        </div>

        {/* Main Content */}
        <section className="w-full flex flex-col items-center justify-center text-center px-6 py-32">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold mb-16 leading-tight">
            Who do you want to <br />
            pitch <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">Polkadot</span> to?
          </h1>
          <SalesDropdown />
        </section>
      </main>

      {/* Footer - Only visible when scrolling */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
