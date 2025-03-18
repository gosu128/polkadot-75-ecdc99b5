import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Resources = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 flex flex-col items-center space-y-36 py-[200px]">
        
        {/* Overview of BD Stakeholders (First) */}
        <section id="bd-teams" className="w-full">
          <h2 className="text-2xl font-bold text-polkadot-pink mb-8 text-center">Overview of BD Stakeholders</h2>
          <hr className="border-t-2 border-gray-300 mb-10" />
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
              <iframe
                src="https://docs.google.com/presentation/d/1z13q5HFfK39eZVtA6sdHk8jC-EmTQdnBnIjsW0Acyfk/embed?start=false&loop=false&delayms=3000"
                className="absolute top-0 left-0 w-full h-full border-0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Proof Points (Second) */}
        <section id="proof-points" className="w-full">
          <h2 className="text-2xl font-bold text-polkadot-pink mb-8 text-center">Proof Points</h2>
          <hr className="border-t-2 border-gray-300 mb-10" />
          
          {/* Google Sheets Embedded Document */}
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
              <iframe 
                src="https://docs.google.com/spreadsheets/d/1rzMvSxH5IBAzb8EzezO-1dYneX6nIkDUIs-7MhFirgw/edit?gid=842874053#gid=842874053&range=A1"
                className="absolute top-0 left-0 w-full h-full border-0" 
                frameBorder="0" 
                allowFullScreen 
              />
            </div>
          </div>
        </section>

        {/* Case Studies (Third - New Position) */}
        <section id="case-studies" className="w-full">
          <h2 className="text-2xl font-bold text-polkadot-pink mb-8 text-center">Case Studies</h2>
          <hr className="border-t-2 border-gray-300 mb-10" />
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
              <iframe 
                src="https://docs.google.com/presentation/d/1JhftKc5G9VVjvD59tOk06SzMxB5FQclGu4P1i-tQ_gg/embed?start=false&loop=false&delayms=3000"
                className="absolute top-0 left-0 w-full h-full border-0" 
                frameBorder="0" 
                allowFullScreen 
              />
            </div>
          </div>
        </section>

        {/* Methodology Content (Fourth) */}
        <section id="methodology" className="w-full">
          <h2 className="text-2xl font-bold text-polkadot-pink mb-8 text-center">Methodology</h2>
          <hr className="border-t-2 border-gray-300 mb-10" />
          <div className="relative w-full max-w-[900px] mx-auto">
            <div className="relative w-full" style={{ paddingTop: "60.3%" }}>  
              <iframe
                src="https://docs.google.com/presentation/d/1_ZD9gZb7flXCKxO_3t4R0HIm1TdjCHltD1hvtU_2z0M/embed?start=false&loop=false&delayms=3000" 
                className="absolute top-0 left-0 w-full h-full border-0" 
                frameBorder="0" 
                allowFullScreen 
              />
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
};

export default Resources;
