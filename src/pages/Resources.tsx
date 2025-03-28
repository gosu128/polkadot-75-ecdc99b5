import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

// Section component to match Enterprise Pitch page style
const Section = ({
  number,
  title,
  content,
  children
}: {
  number: string;
  title: string;
  content: string | null;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{number}. {title}</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      {content && (
        <div className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: content }} />
      )}
      <div>{children}</div>
    </div>
  );
};

const Resources = () => {
  const [content, setContent] = useState<{
    [key: number]: string | null;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch directly from the resources table
        const { data, error } = await supabase
          .from('resources')
          .select('id, content');
        
        if (error) throw error;
        
        if (data) {
          const mappedContent: {
            [key: number]: string | null;
          } = {};
          data.forEach((row) => {
            mappedContent[row.id] = row.content;
          });
          setContent(mappedContent);
        }
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        {/* Display error message if data fetch fails */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Overview of BD Stakeholders - Section 1 */}
        <Section 
          number="1" 
          title="Overview of BD Stakeholders" 
          content={loading ? null : content[1]}
        >
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
        <Section 
          number="2" 
          title="Proof Points" 
          content={loading ? null : content[2]}
        >
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
        <Section 
          number="3" 
          title="Case Studies" 
          content={loading ? null : content[3]}
        >
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
        <Section 
          number="4" 
          title="Methodology" 
          content={loading ? null : content[4]}
        >
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
        
        {/* Add spacing at the bottom */}
        <div className="py-20"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
