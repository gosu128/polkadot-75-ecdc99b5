import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@supabase/supabase-js';

// Supabase connection
const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

// Section component
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
const Subsection = ({ title, content }: { title: string; content?: string }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-polkadot-pink mb-2">{title}</h3>
      <hr className="border-t border-gray-200 mb-4" />
      {content ? <p className="text-gray-700">{content}</p> : <p className="text-gray-400 italic">Content coming soon...</p>}
    </div>
  );
};

const EnterprisePitch = () => {
  const [content, setContent] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("pitch_advise").select("id, content");
      
      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      // Map content to the relevant sections
      const mappedContent: { [key: string]: string | null } = {};
      data.forEach((row: { id: number; content: string }) => {
        mappedContent[row.id] = row.content;
      });

      setContent(mappedContent);
    };

    fetchContent();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        
        {/* Section 1: Introduction */}
        <Section title="1. Introduction">
          <Subsection title="1.1. General Advice" content={content[1]} />
          <Subsection title="1.2. Do's & Don'ts" content={content[2]} />
        </Section>

        {/* Section 2: The Pitch */}
        <Section title="2. The Pitch">
          <Subsection title="2.1. Geographies" content={content[8]} />
          <Subsection title="2.2. Use Cases" content={content[3]} />
          <Subsection title="2.3. Target Audiences" content={content[4]} />
          <Subsection title="2.4. Capability Assessment" content={content[6]} />
          <Subsection title="2.5. Value Proposition" content={content[7]} />
          <Subsection title="2.6. Messaging Strategy" content={content[5]} />
          <Subsection title="2.7. Proof Points" />
        </Section>

      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePitch;
