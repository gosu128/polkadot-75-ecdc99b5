import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

// Format function (same as before)
const formatText = (text: string) => {
  if (!text) return "";
  const paragraphs = text.split('\n\n');
  const formattedBlocks: string[] = [];
  let inNumberedList = false;
  let inBulletList = false;
  let currentList = '';
  paragraphs.forEach(paragraph => {
    const processedText = paragraph.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
    if (processedText.trim().startsWith("###")) {
      if (inNumberedList) {
        formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
        inNumberedList = false;
        currentList = '';
      } else if (inBulletList) {
        formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
        inBulletList = false;
        currentList = '';
      }
      formattedBlocks.push(`<p class='text-polkadot-pink font-bold text-xl my-4'>${processedText.replace(/^###/, '').trim()}</p>`);
      return;
    }
    const lines = processedText.split('\n');
    const isBulletList = lines.every(line => line.trim().startsWith('-'));
    const isNumberedList = lines.every(line => /^\d+\./.test(line.trim()));
    if (isBulletList) {
      if (inNumberedList) {
        formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
        inNumberedList = false;
        currentList = '';
      }
      inBulletList = true;
      lines.forEach(line => {
        const cleaned = line.replace(/^-/, '').trim();
        currentList += `<li class='text-gray-700 mb-2'>${cleaned}</li>`;
      });
      return;
    }
    if (isNumberedList) {
      if (inBulletList) {
        formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
        inBulletList = false;
        currentList = '';
      }
      inNumberedList = true;
      lines.forEach(line => {
        const cleaned = line.replace(/^\d+\./, '').trim();
        currentList += `<li class='text-gray-700 mb-2'>${cleaned}</li>`;
      });
      return;
    }
    if (inNumberedList) {
      formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
      inNumberedList = false;
      currentList = '';
    } else if (inBulletList) {
      formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
      inBulletList = false;
      currentList = '';
    }
    formattedBlocks.push(`<p class="text-gray-700 leading-relaxed mt-5">${processedText}</p>`);
  });
  if (inNumberedList) {
    formattedBlocks.push(`<ol class='list-decimal pl-6 space-y-3 my-4'>${currentList}</ol>`);
  } else if (inBulletList) {
    formattedBlocks.push(`<ul class='list-disc pl-6 space-y-3 my-4'>${currentList}</ul>`);
  }
  return formattedBlocks.join("");
};

// Section component
const Section = ({ title, id, children, className = "" }: { title: string; id: string; children: React.ReactNode; className?: string }) => (
  <div id={id} className={`mb-12 scroll-mt-32 ${className}`}>
    <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    {children}
  </div>
);

// Subsection
const Subsection = ({ title, id, content }: { title: string; id: string; content?: string }) => (
  <div id={id} className="mb-6 scroll-mt-28">
    <h3 className="text-xl text-polkadot-pink mb-2 font-bold">{title}</h3>
    <hr className="border-t border-gray-200 mb-4" />
    {content !== null ? (
      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(content || "") }} />
    ) : (
      <p className="text-gray-400 italic">Loading...</p>
    )}
  </div>
);

// Navigation config
const navItems = [
  { id: "1", label: "Introduction" },
  { id: "1-1", label: "General Advise" },
  { id: "1-2", label: "Do's & Don'ts" },
  { id: "2", label: "The Pitch" },
  { id: "2-1", label: "Geographies" },
  { id: "2-2", label: "Use Cases" },
  { id: "2-3", label: "Target Audiences" },
  { id: "2-4", label: "Value Proposition" },
  { id: "2-5", label: "Positioning" },
  { id: "2-6", label: "Messaging Strategy" },
  { id: "2-7", label: "Proof Points" },
];

const TopNav = ({ activeId }: { activeId: string }) => (
  <div className="sticky top-[64px] z-40 bg-white border-b border-gray-200 mb-6">
    <div className="max-w-5xl mx-auto px-4 py-2 flex flex-wrap justify-center items-center text-sm">
      {navItems.map((item, index) => (
        <span key={item.id} className="flex items-center">
          <a
            href={`#${item.id}`}
            className={`transition-colors duration-200 ${
              activeId === item.id
                ? 'text-polkadot-pink font-semibold'
                : 'text-gray-500 hover:text-polkadot-pink'
            }`}
          >
            {item.label}
          </a>
          {index < navItems.length - 1 && (
            <span className="mx-2 text-gray-300">|</span>
          )}
        </span>
      ))}
    </div>
  </div>
);

// Main component
const EnterprisePitch = () => {
  const [content, setContent] = useState<{ [key: number]: string | null }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase.from("pitch_advise").select("id, content");
        if (error) throw error;
        const mapped: { [key: number]: string | null } = {};
        data.forEach(({ id, content }) => {
          mapped[id] = content;
        });
        setContent(mapped);
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 }
    );

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <TopNav activeId={activeId} />
      <div className="container mx-auto px-4 pt-8 max-w-5xl">
        {error && <p className="text-red-500">{error}</p>}

        <Section title="1. Introduction" id="1" className="mt-8">
          <Subsection title="1.1. General Advise" id="1-1" content={loading ? null : content[1]} />
          <Subsection title="1.2. Do's & Don'ts" id="1-2" content={loading ? null : content[2]} />
        </Section>

        <Section title="2. The Pitch" id="2">
          <Subsection title="2.1. Geographies" id="2-1" content={loading ? null : content[8]} />
          <div className="flex justify-center mt-6">
            <img
              src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/polkadot//Pitch_Advise_-_World_Map.png"
              alt="Geographical Hotspots Map"
              className="w-full max-w-full h-auto"
            />
          </div>
          <Subsection title="2.2. Use Cases" id="2-2" content={loading ? null : content[3]} />
          <Subsection title="2.3. Target Audiences" id="2-3" content={loading ? null : content[4]} />
          <Subsection title="2.4. Value Proposition" id="2-4" content={loading ? null : content[7]} />
          <Subsection title="2.5. Positioning" id="2-5" content={loading ? null : content[9]} />
          <div className="flex justify-center mt-6">
            <img
              src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/polkadot//Pitch_Advise_-_Positioning.png"
              alt="Polkadot's Messaging Strategy Positioning"
              className="w-full max-w-full h-auto"
            />
          </div>
          <Subsection title="2.6. Messaging Strategy" id="2-6" content={loading ? null : content[5]} />
          <Subsection title="2.7. Proof Points" id="2-7" content={loading ? null : content[10]} />
        </Section>

        <div className="py-20" />
      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePitch;
