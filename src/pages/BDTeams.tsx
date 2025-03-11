
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BDTeams = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex-grow">
        <h1 className="text-4xl font-unbounded font-bold text-polkadot-pink mb-8 text-center">
          Business Development Teams
        </h1>
        
        {/* Centered iframe with consistent aspect ratio and no borders */}
        <div className="w-full max-w-5xl mx-auto overflow-hidden">
          <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
            <iframe 
              src="https://docs.google.com/presentation/d/e/2PACX-1vSM-4G2XYB4SQwZ7tIe_wVHBUvGz4nHsMCBcZfsfhHBCdCeN74fKrjCKb-8tpXsH5FVEMZKnFlNXOcO/embed?start=false&loop=false&delayms=60000"
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen={true}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BDTeams;
