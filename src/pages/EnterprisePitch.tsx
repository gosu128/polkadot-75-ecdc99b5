
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createClient } from '@supabase/supabase-js';

// Supabase connection (DO NOT CHANGE THE API KEY)
const supabaseUrl = "https://qhxgyizmewdtvwebpmie.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeGd5aXptZXdkdHZ3ZWJwbWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjk0NjAsImV4cCI6MjA1Njc0NTQ2MH0.MxQbO5TTL1vbfohLB2dHtKOotwp0sUGDQfcpBgT1EL8";
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to format text based on the four rules
const formatText = (text: string) => {
  if (!text) return "";

  // Convert "*bold text*" into <strong>bold text</strong>
  let formattedText = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

  // Convert "- Bullet point" into <li> items
  formattedText = formattedText.replace(/^- (.*?)(\n|$)/gm, "<li class='ml-6 pl-2 text-gray-700'>$1</li>");

  // Wrap bullet points inside a <ul> with proper spacing and alignment
  if (formattedText.includes("<li>")) {
    formattedText = formattedText.replace(
      /(<li.*?>.*?<\/li>)/gs,
      "<ul class='list-disc pl-6 space-y-2'>$1</ul>"
    );
  }

  // Convert lines starting with "###" into bold pink text
  formattedText = formattedText.replace(/^###(.*?)(\n|$)/gm, "<p class='text-polkadot-pink font-bold'>$1</p>");

  // Convert blank lines into paragraph breaks with **extra spacing**
  formattedText = formattedText
    .split(/\n\s*\n/) // Split text at blank lines
    .map((paragraph) => `<p class="text-gray-700 leading-relaxed mt-6">${paragraph.trim()}</p>`) // Extra spacing (mt-6)
    .join("");

  return formattedText;
};

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
      {content !== null ? (
        <div 
          className="text-gray-700 leading-relaxed text-left" 
          dangerouslySetInnerHTML={{ __html: formatText(content) }} 
        />
      ) : (
        <p className="text-gray-400 italic text-left">Loading...</p>
      )}
    </div>
  );
};

const EnterprisePitch = () => {
  const [content, setContent] = useState<{ [key: number]: string | null }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("pitch_advise") // Fetching from the correct table
          .select("id, content");

        if (error) throw error;

        if (data) {
          const mappedContent: { [key: number]: string | null } = {};
          data.forEach((row: { id: number; content: string }) => {
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
        {error && <p className="text-red-500 text-left">{error}</p>}

        {/* Section 1: Introduction */}
        <Section title="1. Introduction">
          <Subsection title="1.1. General Advice" content={loading ? null : content[1]} />
          <Subsection title="1.2. Do's & Don'ts" content={loading ? null : content[2]} />
        </Section>

        {/* Section 2: The Pitch */}
        <Section title="2. The Pitch">
          <Subsection title="2.1. Geographies" content={loading ? null : content[8]} />
<div className="flex justify-center mt-6">
  <img 
    src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/polkadot//Pitch_Advise_-_World_Map.png"
    alt="Geographical Hotspots Map"
    className="w-full max-w-full h-auto"
  />
</div>
          <Subsection title="2.2. Use Cases" content={loading ? null : content[3]} />
          <Subsection title="2.3. Target Audiences" content={loading ? null : content[4]} />
          <Subsection title="2.4. Capability Assessment" content={loading ? null : content[6]} />
          <Subsection title="2.5. Value Proposition" content={loading ? null : content[7]} />
          <Subsection title="2.6. Messaging Strategy" content={loading ? null : content[5]} />
<div className="flex justify-center mt-6">
  <img 
    src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/positioning//Pitch_Advise_-_Positioning.png"
    alt="Polkadot's Messaging Strategy Positioning"
    className="w-full max-w-full h-auto"
  />
</div>
          <Subsection title="2.7. Proof Points" />
        </Section>

      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePitch;
