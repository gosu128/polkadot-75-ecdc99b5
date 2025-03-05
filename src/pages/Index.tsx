
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import NetworkSection from '@/components/NetworkSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <NetworkSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
