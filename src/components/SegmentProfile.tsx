import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PMFScores from './PMFScores';
import { supabase } from '@/integrations/supabase/client';

// Define the function to format text with consistent bullet point styling
const formatText = (text: string | undefined | null): React.ReactNode => {
  if (!text) return <p className="italic text-gray-500">Content not available.</p>;

  const paragraphs = text.split('\n\n');
  const formattedContent: JSX.Element[] = [];

  paragraphs.forEach((paragraph, index) => {
    // Highlight headings (###) in bold & pink
    if (paragraph.trim().startsWith('###')) {
      formattedContent.push(
        <h4 key={`heading-${index}`} className="text-xl font-bold text-polkadot-pink mt-6">
          {paragraph.replace(/^###/, '').trim()}
        </h4>
      );
      return;
    }

    // Convert bullet points ("- item") into proper lists
    if (paragraph.trim().startsWith('-')) {
      const bulletPoints = paragraph.split('\n').map((point, idx) => {
        const cleanedPoint = point.replace(/^-/, '').trim(); // Remove the leading dash
        const formattedPoint = cleanedPoint.replace(/\*([^*]+)\*/g, '<strong>$1</strong>'); // Bold text inside *asterisks*

        return <li key={`bullet-${index}-${idx}`} className="text-gray-700" dangerouslySetInnerHTML={{ __html: formattedPoint }} />;
      });

      formattedContent.push(<ul key={`list-${index}`} className="list-disc pl-6 space-y-3">{bulletPoints}</ul>);
      return;
    }

    // Apply bold formatting to words/phrases between *asterisks*
    const formattedText = paragraph.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

    formattedContent.push(
      <p key={`text-${index}`} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
  });

  return formattedContent.length > 0 ? formattedContent : <p className="italic text-gray-500">Content coming soon...</p>;
};

// Section and Subsection components for consistent styling
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      <div>{children}</div>
    </div>
  );
};

const Subsection = ({ title, content }: { title: string; content?: string | null }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-polkadot-pink mb-2">{title}</h3>
      <hr className="border-t border-gray-200 mb-4" />
      <div className="text-gray-700 leading-relaxed">
        {formatText(content)}
      </div>
    </div>
  );
};

// SegmentProfile component
const SegmentProfile = ({ 
  segment, 
  industry, 
  onBack 
}: { 
  segment: any; 
  industry: any; 
  onBack: () => void;
}) => {
  const [readingMaterial, setReadingMaterial] = useState<string | null>(null);
  
  // Fetch reading material from Supabase if available
  React.useEffect(() => {
    const fetchReadingMaterial = async () => {
      try {
        const { data, error } = await supabase
          .from('segment_reading_material')
          .select('content')
          .eq('segment', segment.name)
          .single();
        
        if (error) {
          console.error('Error fetching reading material:', error);
          return;
        }
        
        if (data) {
          setReadingMaterial(data.content);
        }
      } catch (err) {
        console.error('Error in reading material fetch:', err);
      }
    };
    
    fetchReadingMaterial();
  }, [segment.name]);

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto py-8 px-4">
      {/* Back button and title area */}
      <div className="mb-8 flex items-center">
        <button
          onClick={onBack}
          className="bg-polkadot-pink text-white rounded-full p-2 hover:bg-polkadot-pink-light transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="ml-4 text-3xl font-bold font-unbounded">
          {segment.name} {industry && `- ${industry.name}`}
        </h1>
      </div>

      {/* Main content area */}
      <div className="space-y-10">
        {/* Section 1: Abstract */}
        <Section title="1. Abstract">
          <div className="prose prose-lg max-w-none">
            {formatText(segment.abstract)}
          </div>
        </Section>

        {/* Section 2: General Segment Information */}
        <Section title="2. General Segment Information">
          <Subsection title="2.1. Definition" content={segment.definition} />
          <Subsection title="2.2. Market Trends" content={segment.market_trends} />
          <Subsection title="2.3. Geographical Hotspots" content={segment.geographical_hotspots} />
          <Subsection title="2.4. Challenges" content={segment.challenges} />
          <Subsection title="2.5. Use Cases" content={segment.use_cases} />
        </Section>

        {/* Section 3: The Pitch */}
        <Section title="3. The Pitch">
          <Subsection title="3.1. Target Audiences" content={segment.target_audiences} />
          <Subsection title="3.2. Capability Assessment" content={segment.capability_assessment} />
          <Subsection title="3.3. Value Proposition" content={segment.value_proposition} />
          <Subsection title="3.4. Positioning" content={segment.positioning} />
          <Subsection title="3.5. Messaging Strategy" content={segment.messaging_strategy} />
          <Subsection title="3.6. Proof Points" content={segment.proof_points} />
        </Section>

        {/* Section 4: Other */}
        <Section title="4. Other">
          <Subsection title="4.1. PMF-Score" content={null} />
          <div className="mb-10">
            <PMFScores segment={segment} />
          </div>
          <Subsection title="4.2. Recommended Reading Material" content={readingMaterial} />
        </Section>
      </div>
    </div>
  );
};

export default SegmentProfile;
