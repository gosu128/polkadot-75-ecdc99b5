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
  const isListSection = number === "5";

  const formatSectionFiveContent = (raw: string) => {
    const lines = raw.split('\n').filter(line => line.trim() !== '');
    const bullets = lines.filter(line => line.trim().startsWith('-'));
    const paragraphs = lines.filter(line => !line.trim().startsWith('-'));

    const bulletItems = bullets.map(line =>
      `<li>${line.replace(/^-+/, '').trim()}</li>`
    ).join('');

    const paragraphItems = paragraphs.map(line =>
      `<p class="mb-2">${line.trim()}</p>`
    ).join('');

    return `
      ${paragraphItems}
      ${bulletItems ? `<ul class="list-disc pl-6 space-y-1 mt-4">${bulletItems}</ul>` : ''}
    `;
  };

  const formattedContent = isListSection && content
    ? formatSectionFiveContent(content)
    : content;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{number}. {title}</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      {formattedContent && (
        <div className="text-gray-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: formattedContent }} />
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
        const { data, error } = await supabase
          .from('resources')
          .select();

        if (error) throw error;

        if (data) {
          const mappedContent: {
            [key: number]: string | null;
          } = {};
          data.forEach((row: any) => {
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
        {error && <p className="text-red-500">{error}</p>}

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

        <Section 
          number="2" 
          title="Evidence & Proof Point Library for BD Messaging" 
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

        <Section 
  number="5" 
  title="Additional Reading Material" 
  content={loading ? null : content[5]}
>
</Section>

        <div className="py-20"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
