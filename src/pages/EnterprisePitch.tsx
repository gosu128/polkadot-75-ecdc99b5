import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

// Supabase connection (DO NOT CHANGE THE API KEY)
const supabaseUrl = "https://qhxgyizmewdtvwebpmie.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoeGd5aXptZXdkdHZ3ZWJwbWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNjk0NjAsImV4cCI6MjA1Njc0NTQ2MH0.MxQbO5TTL1vbfohLB2dHtKOotwp0sUGDQfcpBgT1EL8";

// Function to format text based on the four rules
const formatText = (text: string) => {
  if (!text) return "";

  // Split text into paragraphs
  const paragraphs = text.split('\n\n');
  const formattedBlocks: string[] = [];
  let inNumberedList = false;
  let inBulletList = false;
  let currentList = '';
  paragraphs.forEach(paragraph => {
    // Process text within a paragraph
    const processedText = paragraph.replace(/\*(.*?)\*/g, "<strong>$1</strong>");

    // Check if this is a heading
    if (processedText.trim().startsWith("###")) {
      // Close any open lists
      if (inNumberedList) {
        formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
        inNumberedList = false;
        currentList = '';
      } else if (inBulletList) {
        formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
        inBulletList = false;
        currentList = '';
      }

      // Add the heading
      formattedBlocks.push(`<p class='text-polkadot-pink font-bold text-xl my-4'>${processedText.replace(/^###/, '').trim()}</p>`);
      return;
    }

    // Check if paragraph contains multiple lines
    const lines = processedText.split('\n');

    // Check if all lines in paragraph are bullet points
    const isBulletList = lines.every(line => line.trim().startsWith('-'));

    // Check if all lines in paragraph are numbered
    const isNumberedList = lines.every(line => /^\d+\./.test(line.trim()));

    // Handle bullet lists
    if (isBulletList) {
      if (inNumberedList) {
        // Close previous numbered list if switching to bullet list
        formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
        inNumberedList = false;
        currentList = '';
      }
      inBulletList = true;
      lines.forEach(line => {
        const cleanedPoint = line.replace(/^-/, '').trim();
        currentList += `<li class='text-gray-700 mb-2'>${cleanedPoint}</li>`;
      });
      return;
    }

    // Handle numbered lists
    if (isNumberedList) {
      if (inBulletList) {
        // Close previous bullet list if switching to numbered list
        formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
        inBulletList = false;
        currentList = '';
      }
      inNumberedList = true;
      lines.forEach(line => {
        const cleanedPoint = line.replace(/^\d+\./, '').trim();
        currentList += `<li class='text-gray-700 mb-2'>${cleanedPoint}</li>`;
      });
      return;
    }

    // If reaching here, it's a regular paragraph, so close any open lists
    if (inNumberedList) {
      formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
      inNumberedList = false;
      currentList = '';
    } else if (inBulletList) {
      formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
      inBulletList = false;
      currentList = '';
    }

    // Regular paragraph
    formattedBlocks.push(`<p class="text-gray-700 leading-relaxed mt-5">${processedText}</p>`);
  });

  // Close any remaining open lists at the end
  if (inNumberedList) {
    formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
  } else if (inBulletList) {
    formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
  }
  return formattedBlocks.join("");
};

// Section component
const Section = ({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      <div>{children}</div>
    </div>;
};

// Subsection component
const Subsection = ({
  title,
  content
}: {
  title: string;
  content?: string;
}) => {
  return <div className="mb-6">
      <h3 className="text-xl text-polkadot-pink mb-2 font-bold">{title}</h3>
      <hr className="border-t border-gray-200 mb-4" />
      {content !== null ? <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{
      __html: formatText(content || "")
    }} /> : <p className="text-gray-400 italic">Loading...</p>}
    </div>;
};

const EnterprisePitch = () => {
  const [content, setContent] = useState<{
    [key: number]: string | null;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from("pitch_advise") // Fetching from the correct table
        .select("id, content");
        if (error) throw error;
        if (data) {
          const mappedContent: {
            [key: number]: string | null;
          } = {};
          data.forEach((row: {
            id: number;
            content: string;
          }) => {
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
  return <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        
        {/* Display error message if data fetch fails */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Section 1: Introduction */}
        <Section title="1. Introduction">
          <Subsection title="1.1. General Advise" content={loading ? null : content[1]} />
          <Subsection title="1.2. Do's & Don'ts" content={loading ? null : content[2]} />
        </Section>

        {/* Section 2: The Pitch */}
        <Section title="2. The Pitch">
          <Subsection title="2.1. Geographies" content={loading ? null : content[8]} />
        <div className="flex justify-center mt-6">
  <img src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/polkadot//Pitch_Advise_-_World_Map.png" alt="Geographical Hotspots Map" className="w-full max-w-full h-auto" />
        </div>
          <Subsection title="2.2. Use Cases" content={loading ? null : content[3]} />
          <Subsection title="2.3. Target Audiences" content={loading ? null : content[4]} />
          <Subsection title="2.4. Value Proposition" content={loading ? null : content[7]} />
          <Subsection title="2.5. Positioning" content={loading ? null : content[9]} />
          <div className="flex justify-center mt-6">
            <img src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/polkadot//Pitch_Advise_-_Positioning.png" alt="Polkadot's Messaging Strategy Positioning" className="w-full max-w-full h-auto" />
          </div>
          <Subsection title="2.6. Messaging Strategy" content={loading ? null : content[5]} />
          <Subsection title="2.7. Proof Points" />
        </Section>

        {/* Add spacing at the bottom */}
        <div className="py-20"></div>
      </div>
      <Footer />
    </div>;
};
export default EnterprisePitch;
