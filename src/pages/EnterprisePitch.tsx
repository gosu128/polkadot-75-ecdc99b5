
import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

// --- Format Function ---
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

// --- Section & Subsection Components ---
const Section = ({ title, id, children, className = "" }: { title: string; id: string; children: React.ReactNode; className?: string }) => (
  <div id={id} className={`mb-12 scroll-mt-32 ${className}`}>
    <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    {children}
  </div>
);

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

// --- Grouped Nav Items ---
const navGroups = [
  {
    id: "1",
    label: "1. Introduction",
    children: [
      { id: "1-1", label: "1.1. General Advise" },
      { id: "1-2", label: "1.2. Do's & Don'ts" },
    ],
  },
  {
    id: "2",
    label: "2. The Pitch",
    children: [
      { id: "2-1", label: "2.1. Geographies" },
      { id: "2-2", label: "2.2. Use Cases" },
      { id: "2-3", label: "2.3. Target Audiences" },
      { id: "2-4", label: "2.4. Value Proposition" },
      { id: "2-5", label: "2.5. Positioning" },
      { id: "2-6", label: "2.6. Messaging Strategy" },
      { id: "2-7", label: "2.7. Proof Points" },
    ],
  },
];

// --- Top Navigation ---
const TopNav = ({ activeId }: { activeId: string }) => {
  const [visibleGroup, setVisibleGroup] = useState<string | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Show children when active section is inside group
  useEffect(() => {
    const currentGroup = navGroups.find(group =>
      [group.id, ...group.children.map(c => c.id)].includes(activeId)
    );
    if (currentGroup) {
      setVisibleGroup(currentGroup.id);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setVisibleGroup(null);
      }, 3000);
    }
  }, [activeId]);

  return (
    <div className="sticky top-[64px] z-40 bg-white border-b border-gray-200 mb-6">
      <div className="max-w-5xl mx-auto px-4 py-2 flex flex-wrap justify-center items-center text-sm gap-x-6">
        {navGroups.map(group => (
          <div
            key={group.id}
            className="relative group"
            onMouseEnter={() => setVisibleGroup(group.id)}
            onMouseLeave={() => setVisibleGroup(null)}
          >
            <a
              href={`#${group.id}`}
              className={`transition-colors duration-200 ${
                activeId === group.id ? 'text-polkadot-pink font-semibold' : 'text-gray-600 hover:text-polkadot-pink'
              }`}
            >
              {group.label}
            </a>

            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 shadow-md rounded-md px-4 py-2 space-y-1 transition-all duration-200 ${
                visibleGroup === group.id ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              {group.children.map(child => (
                <a
                  key={child.id}
                  href={`#${child.id}`}
                  className={`block whitespace-nowrap text-sm ${
                    activeId === child.id
                      ? 'text-polkadot-pink font-semibold'
                      : 'text-gray-500 hover:text-polkadot-pink'
                  }`}
                >
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---
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

  // Improved intersection observer for better detection of sections
  useEffect(() => {
    // Get all section and subsection IDs from navGroups
    const allIds = navGroups.flatMap(group => [group.id, ...group.children.map(c => c.id)]);
    
    // Create a map to hold all elements
    const elements: {[key: string]: HTMLElement | null} = {};
    allIds.forEach(id => {
      elements[id] = document.getElementById(id);
    });
    
    // Options for better detection
    const observerOptions = {
      rootMargin: "-20% 0px -75% 0px", // Adjusted to improve triggering
      threshold: [0, 0.25, 0.5, 0.75, 1] // Multiple thresholds for smoother transitions
    };
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Filter only visible entries and sort by their visibility ratio
      const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      
      // If we have visible entries, set the most visible one as active
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe all elements
    Object.values(elements).forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [loading]); // Only re-run when loading changes (content is available)

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
