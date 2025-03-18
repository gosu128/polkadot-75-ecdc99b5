import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import PMFScores from './PMFScores';
import { supabase } from '@/integrations/supabase/client';

// Function to format text properly
const formatText = (text: string | undefined | null): React.ReactNode => {
  if (!text) return <p className="italic text-gray-500">Content not available.</p>;

  const paragraphs = text.split('\n\n');
  const formattedContent: JSX.Element[] = [];

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim().startsWith('###')) {
      formattedContent.push(
        <h4 key={`heading-${index}`} className="text-xl font-bold text-polkadot-pink mt-6">
          {paragraph.replace(/^###/, '').trim()}
        </h4>
      );
      return;
    }

    if (paragraph.trim().startsWith('-')) {
      const bulletPoints = paragraph.split('\n').map((point, idx) => {
        const cleanedPoint = point.replace(/^-/, '').trim();
        const formattedPoint = cleanedPoint.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

        return <li key={`bullet-${index}-${idx}`} className="text-gray-700" dangerouslySetInnerHTML={{ __html: formattedPoint }} />;
      });

      formattedContent.push(<ul key={`list-${index}`} className="list-disc pl-6 space-y-3">{bulletPoints}</ul>);
      return;
    }

    const formattedText = paragraph.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');

    formattedContent.push(
      <p key={`text-${index}`} className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
  });

  return formattedContent.length > 0 ? formattedContent : <p className="italic text-gray-500">Content coming soon...</p>;
};

// Section & Subsection Components
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    <div>{children}</div>
  </div>
);

const Subsection = ({ title, content }: { title: string; content?: string | null }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-polkadot-pink mb-2">{title}</h3>
    <hr className="border-t border-gray-200 mb-4" />
    <div className="text-gray-700 leading-relaxed">{formatText(content)}</div>
  </div>
);

// SegmentProfile Component
const SegmentProfile = ({ segment, industry, onBack }: { segment: any; industry: any; onBack: () => void }) => {
  const [segmentData, setSegmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSegmentData = async () => {
      try {
        const { data, error } = await supabase
          .from('segments')
          .select('id, abstract, definition, trends, regions, challenges, usecases_general, usecases_web3, personas_1, personas_2, personas_3, value_prop, positioning_statement, messaging') // Removed missing columns
          .eq('id', segment.id)
          .single();

        if (error) throw error;
        setSegmentData(data);
      } catch (err) {
        setError('Failed to load segment data.');
        console.error('Error fetching segment data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSegmentData();
  }, [segment.id]);

  if (loading) return <p className="text-gray-500 italic text-center py-10">Loading segment data...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

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
          <div className="prose prose-lg max-w-none">{formatText(segmentData?.abstract)}</div>
        </Section>

        {/* Section 2: General Segment Information */}
        <Section title="2. General Segment Information">
          <Subsection title="2.1. Definition" content={segmentData?.definition} />
          <Subsection title="2.2. Market Trends" content={segmentData?.trends} />
          <Subsection title="2.3. Geographical Hotspots" content={segmentData?.regions} />
          <Subsection title="2.4. Challenges" content={segmentData?.challenges} />
          <Subsection
            title="2.5. Use Cases"
            content={`${segmentData?.usecases_general || ''}\n\n${segmentData?.usecases_web3 || ''}`}
          />
        </Section>

        {/* Section 3: The Pitch */}
        <Section title="3. The Pitch">
          <Subsection
            title="3.1. Target Audiences"
            content={`${segmentData?.personas_1 || ''}\n\n${segmentData?.personas_2 || ''}\n\n${segmentData?.personas_3 || ''}`}
          />
          <Subsection title="3.2. Value Proposition" content={segmentData?.value_prop} />
          <Subsection title="3.3. Positioning" content={segmentData?.positioning_statement} />
          <Subsection title="3.4. Messaging Strategy" content={segmentData?.messaging} />
          <Subsection title="3.5. Proof Points" content="Coming soon..." />
        </Section>

        {/* Section 4: Other */}
        <Section title="4. Other">
          <Subsection title="4.1. PMF-Score" content={null} />
          <div className="mb-10">
            <PMFScores segment={segment} />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default SegmentProfile;
