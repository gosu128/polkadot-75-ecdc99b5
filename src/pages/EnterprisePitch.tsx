import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Section component for each main section
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      <div>{children}</div>
    </div>
  );
};

// Subsection component
const Subsection = ({ title }: { title: string }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-polkadot-pink mb-2">{title}</h3>
      <hr className="border-t border-gray-200 mb-4" />
    </div>
  );
};

const EnterprisePitch = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        
        {/* Section 1: Introduction */}
        <Section title="1. Introduction">
          <Subsection title="1.1. General Advice" />
          <Subsection title="1.2. Do's & Don'ts" />
        </Section>

        {/* Section 2: The Pitch */}
        <Section title="2. The Pitch">
          <Subsection title="2.1. Target Audiences" />
          <Subsection title="2.2. Capability Assessment" />
          <Subsection title="2.3. Value Proposition" />
          <Subsection title="2.4. Messaging Strategy" />
          <Subsection title="2.5. Proof Points" />
        </Section>

      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePitch;

