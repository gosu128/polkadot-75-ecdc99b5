
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const EnterprisePitch = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex flex-col items-center py-[200px]">
        <h1 className="text-3xl font-bold mb-8 text-center">Enterprise Pitch</h1>
        <div className="max-w-3xl w-full bg-gray-50 p-8 rounded-lg shadow-sm">
          <p className="text-lg mb-6">
            This page will contain enterprise-specific pitch content for Polkadot.
          </p>
          <div className="flex flex-col space-y-4">
            <div className="p-4 border border-gray-200 rounded-md hover:border-polkadot-pink transition-colors">
              <h3 className="font-bold mb-2">Enterprise Benefits</h3>
              <p>Enterprise-ready blockchain infrastructure with customizable solutions.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:border-polkadot-pink transition-colors">
              <h3 className="font-bold mb-2">Security & Compliance</h3>
              <p>Industry-leading security with regulatory compliance features.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-md hover:border-polkadot-pink transition-colors">
              <h3 className="font-bold mb-2">Integration Options</h3>
              <p>Seamless integration with existing enterprise systems and applications.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePitch;
