
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// --- Format Function ---
const formatText = (text: string | undefined | null): React.ReactNode => {
  if (!text) return <p className="italic text-gray-500">The information is currently unavailable.</p>;

  const paragraphs = text.split('\n\n');
  const formattedContent: JSX.Element[] = [];

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim().startsWith('###')) {
      formattedContent.push(<h4 key={`heading-${index}`} className="text-xl text-polkadot-pink mt-6 mb-6 font-semibold">
        {paragraph.replace(/^###/, '').trim()}
      </h4>);
      return;
    }

    if (paragraph.trim().startsWith('-')) {
      const bulletPoints = paragraph.split('\n').map((point, idx) => {
        const cleanedPoint = point.replace(/^-/, '').trim();
        const formattedPoint = cleanedPoint.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
        return <li key={`bullet-${index}-${idx}`} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: formattedPoint }} />;
      });
      formattedContent.push(<ul key={`list-${index}`} className="list-disc pl-6 space-y-3">{bulletPoints}</ul>);
      return;
    }

    const formattedText = paragraph.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
    formattedContent.push(<p key={`text-${index}`} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formattedText }} />);
  });

  return formattedContent.length > 0 ? formattedContent : <p className="italic text-gray-500">Content coming soon...</p>;
};

// --- Nav Groups ---
const navGroups = [
  {
    id: '1',
    label: '1. Abstract',
    children: []
  },
  {
    id: '2',
    label: '2. General Segment Information',
    children: [
      { id: '2-1', label: '2.1. Definition' },
      { id: '2-2', label: '2.2. Market Trends' },
      { id: '2-3', label: '2.3. Geographical Hotspots' },
      { id: '2-4', label: '2.4. Challenges' },
      { id: '2-5', label: '2.5. Use Cases' }
    ]
  },
  {
    id: '3',
    label: '3. The Pitch',
    children: [
      { id: '3-1', label: '3.1. Target Audiences' },
      { id: '3-2', label: '3.2. Capability Assessment' },
      { id: '3-3', label: '3.3. Value Proposition' },
      { id: '3-4', label: '3.4. Positioning' },
      { id: '3-5', label: '3.5. Messaging Strategy' },
      { id: '3-6', label: '3.6. Proof Points' }
    ]
  }
];

// --- Sticky Top Navigation ---
const TopNav = ({ activeId }: { activeId: string }) => {
  const [visibleGroup, setVisibleGroup] = useState<string | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap justify-center items-center text-sm gap-x-6">
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
            {group.children.length > 0 && (
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white border border-gray-200 shadow-md rounded-md px-4 py-2 space-y-1 transition-all duration-200 ${
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Section Components ---
const Section = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
  <div id={id} className="mb-12 scroll-mt-32">
    <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    {children}
  </div>
);

const Subsection = ({ title, id, content }: { title: string; id: string; content?: string | null }) => (
  <div id={id} className="mb-6 scroll-mt-28">
    <h3 className="text-xl text-polkadot-pink mb-2 font-bold">{title}</h3>
    <hr className="border-t border-gray-200 mb-4" />
    <div className="text-gray-700 leading-relaxed">{formatText(content)}</div>
  </div>
);

// --- Main Component ---
const SegmentProfile = ({
  segment,
  industry,
  onBack
}: {
  segment: any;
  industry: any;
  onBack: () => void;
}) => {
  const [segmentData, setSegmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const fetchSegmentData = async () => {
      if (!segment?.id) {
        setError("Invalid segment data");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("segments")
        .select("*")
        .eq("id", segment.id)
        .single();

      if (fetchError) {
        setError("Failed to load segment data.");
      } else {
        setSegmentData(data);
      }
      setLoading(false);
    };
    fetchSegmentData();
  }, [segment]);

  // Improved intersection observer for better section detection
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

  if (loading) return <p className="text-gray-500 italic text-center py-10">Loading segment data...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!segmentData) return <p className="text-red-500 text-center py-10">No data found for this segment.</p>;

  const geoImageUrl = `https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs/map_${segmentData?.id}.png`;
  const messagingImageUrl = `https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs/matrix_${segmentData?.id}.png`;

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8 flex items-center">
        <button onClick={onBack} className="bg-polkadot-pink text-white rounded-full p-2 hover:bg-polkadot-pink-light transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="ml-4 text-3xl font-bold font-unbounded">{segmentData?.name}</h1>
      </div>

      <TopNav activeId={activeId} />

      {/* Sections */}
      <div className="space-y-10">
        <Section title="1. Abstract" id="1">
          <div className="prose prose-lg max-w-none">{formatText(segmentData?.abstract)}</div>
        </Section>

        <Section title="2. General Segment Information" id="2">
          <Subsection title="2.1. Definition" id="2-1" content={segmentData?.definition} />
          <Subsection title="2.2. Market Trends" id="2-2" content={segmentData?.trends} />
          <Subsection title="2.3. Geographical Hotspots" id="2-3" content={segmentData?.regions} />
          <div className="flex justify-center mt-6">
            <img src={geoImageUrl} alt="Geographical Hotspots" className="w-full h-auto object-fill" onError={e => (e.currentTarget.style.display = "none")} />
          </div>
          <Subsection title="2.4. Challenges" id="2-4" content={segmentData?.challenges} />
          <Subsection title="2.5. Use Cases" id="2-5" content={segmentData?.usecases_general} />
        </Section>

        <Section title="3. The Pitch" id="3">
          <Subsection title="3.1. Target Audiences" id="3-1" content={segmentData?.personas_1} />
          <Subsection title="3.2. Capability Assessment" id="3-2" content={segmentData?.capability} />
          <Subsection title="3.3. Value Proposition" id="3-3" content={segmentData?.value_prop} />
          <Subsection title="3.4. Positioning" id="3-4" content={segmentData?.positioning_statement} />
          <div className="flex justify-center mt-6 mb-6">
            <img src={messagingImageUrl} alt="Messaging Strategy" className="w-full h-auto object-fill" onError={e => (e.currentTarget.style.display = "none")} />
          </div>
          <Subsection title="3.5. Messaging Strategy" id="3-5" content={segmentData?.messaging} />
          <Subsection title="3.6. Proof Points" id="3-6" content={segmentData?.proof_points} />
          
          {/* Added horizontal line at the end of the segment profile */}
          <hr className="border-t border-gray-300 mt-10" />
        </Section>
      </div>
    </div>
  );
};

export default SegmentProfile;
