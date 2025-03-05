
import Header from '@/components/Header';
import SalesDropdown from '@/components/SalesDropdown';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center">
        <section className="py-16 md:py-20 w-full">
          <div className="container-tight">
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4 font-unbounded">
                Who do you want to pitch <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">Polkadot</span> to?
              </h2>
            </div>
            <SalesDropdown />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
