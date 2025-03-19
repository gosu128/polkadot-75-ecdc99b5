
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Section component to match Enterprise Pitch page style
const Section = ({
  number,
  title,
  children
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{number}. {title}</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      <div>{children}</div>
    </div>
  );
};

const Resources = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        {/* Overview of BD Stakeholders - Section 1 */}
        <Section number="1" title="Overview of BD Stakeholders">
          <div className="relative w-full max-w-full mx-auto">
            <div className="relative w-full" style={{ paddingTop: "59.9%" }}>  
              <iframe
                src="https://docs.google.com/presentation/d/1z13q5HFfK39eZVtA6sdHk8jC-EmTQdnBnIjsW0Acyfk/embed?start=false&loop=false&delayms=3000"
                className="absolute top-0 left-0 w-full h-full border-0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </Section>

        {/* Proof Points - Section 2 */}
        <Section number="2" title="Proof Points">
          <div className="relative w-full max-w-full mx-auto">
            <div className="relative w-full" style={{ paddingTop: "59.9%" }}>  
              <iframe 
                src="https://docs.google.com/spreadsheets/d/1rzMvSxH5IBAzb8EzezO-1dYneX6nIkDUIs-7MhFirgw/preview?gid=842874053"
                className="absolute top-0 left-0 w-full h-full border-0" 
                frameBorder="0" 
                allowFullScreen 
              />
            </div>
          </div>
        </Section>

        {/* Case Studies - Section 3 */}
        <Section number="3" title="Case Studies">
          <div className="relative w-full max-w-full mx-auto">
            <div className="relative w-full" style={{ paddingTop: "59.9%" }}>  
              <iframe 
                src="https://docs.google.com/presentation/d/1miW8bJb2ZHLrMjMlQC6IC5r-qDHtXxdoR1mwxsZ7uEg/embed?start=false&loop=false&delayms=3000"
                className="absolute top-0 left-0 w-full h-full border-0" 
                frameBorder="0" 
                allowFullScreen 
              />
            </div>
          </div>
        </Section>

        {/* Methodology - Section 4 */}
        <Section number="4" title="Methodology">
          <div className="relative w-full max-w-full mx-auto">
            <div className="relative w-full" style={{ paddingTop: "59.9%" }}>  
              <iframe
                src="https://docs.google.com/presentation/d/1_ZD9gZb7flXCKxO_3t4R0HIm1TdjCHltD1hvtU_2z0M/embed?start=false&loop=false&delayms=3000" 
                className="absolute top-0 left-0 w-full h-full border-0" 
                frameBorder="0" 
                allowFullScreen 
              />
            </div>
          </div>
        </Section>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
