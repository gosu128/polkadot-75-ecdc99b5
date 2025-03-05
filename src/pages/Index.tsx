
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import NetworkSection from '@/components/NetworkSection';
import Footer from '@/components/Footer';
import SalesDropdown from '@/components/SalesDropdown';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        {/* Make the SalesDropdown more prominent with its own section */}
        <section className="py-16 md:py-20 bg-polkadot-light">
          <div className="container-tight">
            <div className="text-center mb-10">
              <h2 className="heading-lg mb-4 font-unbounded">Explore Industry Solutions</h2>
              <p className="body-md max-w-3xl mx-auto">
                Discover tailored blockchain solutions for your industry with our comprehensive segment analysis and market insights.
              </p>
            </div>
            <SalesDropdown />
          </div>
        </section>
        <Features />
        <NetworkSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
