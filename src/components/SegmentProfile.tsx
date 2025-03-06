
import React, { useEffect, useState } from 'react';
import { 
  Info, 
  BookText, 
  TrendingUp, 
  Globe, 
  AlertTriangle, 
  Lightbulb, 
  Star, 
  Target, 
  Users 
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import Footer from '@/components/Footer';

type Segment = {
  id: number;
  name: string;
  industry_id: number;
  abstract: string | null;
  definition: string | null;
  trends: string | null;
  regions: string | null;
  use_cases: string | null;
  personas_1: string | null;
  personas_2: string | null;
  personas_3: string | null;
  positioning_statement: string | null;
  positioning_headline: string | null;
  positioning_subheadline: string | null;
  ca_interoperability: string | null;
  ca_resiliance: string | null;
  ca_scalability: string | null;
  ca_customization: string | null;
  ca_reliability: string | null;
  ca_other: string | null;
  pmf: number | null;
  scores: { key: string; value: number }[] | null;
};

type ScoreData = {
  interoperability: number | null;
  roi: number | null;
  scalability: number | null;
  customization: number | null;
  awareness: number | null;
  tech: number | null;
  tam: number | null;
  compliance: number | null;
  complexity: number | null;
  reliability: number | null;
  pmf: number | null;
};

type SegmentProfileProps = {
  segment: Segment | null;
  industry?: any;
  onBack: () => void;
};

// Function to format text while ensuring ":" is bold
const formatContent = (content: string | null) => {
  if (!content) return <p className="font-inter-light text-gray-700 italic">No information available</p>;

  return (
    <div className="font-inter-light text-gray-700 space-y-2 text-left">
      {content.split('\n').map((line, index) => {
        if (line.includes(':')) {
          const parts = line.split(':');
          return (
            <p key={index}>
              <span className="font-inter-bold">{parts[0].trim()}:</span> {parts.slice(1).join(':').trim()}
            </p>
          );
        }
        return <p key={index}>{line.trim()}</p>;
      })}
    </div>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-8 mb-2">
    <h2 className="text-2xl text-polkadot-pink font-unbounded flex items-center">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

// Subsection header component
const SubsectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-lg text-black font-semibold flex items-center mb-1 mt-4">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>
);

// Simple world map component
const WorldMap = () => (
  <div className="mt-6 mb-8">
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-auto text-gray-300 max-w-2xl mx-auto"
    >
      <path
        d="M473,190.5c3-1.9,1.8-5.3,1.4-8.1c-0.4-3,0.8-6.5-1.7-8.9c-1.5-1.4-3.5-2.9-3.7-5c-0.2-2.8,2.9-3.1,4.7-4.2
        c2.8-1.7,2.7-4.2,2.7-6.9c0-2.9-0.6-5.9-0.6-8.9c0-6.4,0.5-12.9-2.2-18.8c-1.1-2.3-2.5-4.3-2.3-7c0.3-4,3.6-7.7,3.1-11.9
        c-0.3-2.9-2.2-5.2-4.3-7c-2.6-2.2-5.8-3.7-9-4.2c-3.7-0.6-7.4,0.2-10.8,1.6c-4.4,1.8-9,1.6-11.9-2.5c-1.5-2.2-1.4-4.9-1.7-7.5
        c-0.4-4.4-1.1-8.8-2-13.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M250,260 C220,250 190,250 150,245 C120,240 100,220 80,200 C60,180 50,160 40,140 C30,120 20,100 20,80 C20,60 30,40 50,30 C70,20 90,20 110,30 C130,40 150,50 170,60 C190,70 210,80 230,80 C250,80 270,70 290,70 C310,70 330,80 350,90 C370,100 390,110 410,110 C430,110 450,100 470,100 C490,100 510,110 530,120 C550,130 570,140 590,140 C610,140 630,130 650,130 C670,130 690,140 710,150 C730,160 750,170 770,170 C790,170 810,160 830,160 C850,160 870,170 890,180 C910,190 930,200 950,200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M310,320 C290,310 270,310 250,300 C230,290 210,280 190,270 C170,260 150,250 130,250 C110,250 90,260 70,260 C50,260 30,250 30,230 C30,210 50,200 70,190 C90,180 110,170 130,170 C150,170 170,180 190,180 C210,180 230,170 250,170 C270,170 290,180 310,190 C330,200 350,210 370,210 C390,210 410,200 430,190 C450,180 470,170 490,170 C510,170 530,180 550,190 C570,200 590,210 610,210 C630,210 650,200 670,200 C690,200 710,210 730,220 C750,230 770,240 790,240 C810,240 830,230 850,230 C870,230 890,240 910,250 C930,260 950,270 970,270"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M240,350 C220,340 200,340 180,330 C160,320 140,310 120,300 C100,290 80,280 60,280 C40,280 20,290 20,310 C20,330 40,340 60,350 C80,360 100,370 120,370 C140,370 160,360 180,360 C200,360 220,370 240,370 C260,370 280,360 300,360 C320,360 340,370 360,380 C380,390 400,400 420,400 C440,400 460,390 480,380 C500,370 520,360 540,360 C560,360 580,370 600,380 C620,390 640,400 660,400 C680,400 700,390 720,390 C740,390 760,400 780,410 C800,420 820,430 840,430 C860,430 880,420 900,410 C920,400 940,390 960,390"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="200" cy="150" r="5" fill="#7E69AB" />
      <circle cx="350" cy="180" r="5" fill="#7E69AB" />
      <circle cx="500" cy="200" r="5" fill="#7E69AB" />
      <circle cx="650" cy="220" r="5" fill="#7E69AB" />
      <circle cx="310" cy="300" r="5" fill="#7E69AB" />
      <circle cx="460" cy="320" r="5" fill="#7E69AB" />
      <circle cx="600" cy="350" r="5" fill="#7E69AB" />
    </svg>
  </div>
);

const SegmentProfile = ({ segment, industry, onBack }: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);

  useEffect(() => {
    const fetchScores = async () => {
      if (segment) {
        try {
          const { data, error } = await supabase
            .from('segments')
            .select('interoperability, roi, scalability, customization, awareness, tech, tam, compliance, complexity, reliability, pmf')
            .eq('id', segment.id)
            .single();
            
          if (error) {
            console.error('Error fetching scores:', error);
          } else if (data) {
            setScoreData(data);
          }
        } catch (error) {
          console.error('Error in score fetch operation:', error);
        }
      }
    };
    
    fetchScores();
  }, [segment]);

  if (!segment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: Segment data not found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
          ← Back to Selection
        </button>
      </div>
    );
  }

  // Format scores for display
  const formattedScores = scoreData ? [
    { name: 'Interoperability', value: scoreData.interoperability || 0 },
    { name: 'ROI', value: scoreData.roi || 0 },
    { name: 'Scalability', value: scoreData.scalability || 0 },
    { name: 'Customization', value: scoreData.customization || 0 },
    { name: 'Awareness', value: scoreData.awareness || 0 },
    { name: 'Tech Stack', value: scoreData.tech || 0 },
    { name: 'TAM', value: scoreData.tam || 0 },
    { name: 'Compliance', value: scoreData.compliance || 0 },
    { name: 'Complexity', value: scoreData.complexity || 0 },
    { name: 'Reliability', value: scoreData.reliability || 0 }
  ] : [];

  return (
    <div className="flex flex-col min-h-screen text-left px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-4xl font-unbounded font-bold text-gray-900">{segment.name}</h2>
        {industry && <p className="text-gray-500 mt-1">Industry: {industry.name}</p>}
        <button onClick={onBack} className="mt-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>

      {/* Main Sections */}
      <div className="space-y-6">

        {/* Section 1: Overview */}
        <SectionHeader icon={Info} title="Overview" />
        <SubsectionHeader icon={BookText} title="Abstract" />
        {formatContent(segment.abstract)}
        <SubsectionHeader icon={BookText} title="Definition" />
        {formatContent(segment.definition)}
        <SubsectionHeader icon={TrendingUp} title="Market Trends" />
        {formatContent(segment.trends)}
        <SubsectionHeader icon={Globe} title="Geographical Hotspots" />
        {formatContent(segment.regions)}
        <WorldMap />

        {/* Section 2: Use Cases */}
        <SectionHeader icon={Lightbulb} title="Use Cases" />
        <SubsectionHeader icon={Lightbulb} title="General Use Cases" />
        <p className="text-gray-500 italic">[Placeholder]</p>
        <SubsectionHeader icon={Lightbulb} title="Web3 Use Cases" />
        {formatContent(segment.use_cases)}

        {/* Section 3: Personas */}
        <SectionHeader icon={Users} title="Personas" />
        <SubsectionHeader icon={Users} title={segment.personas_1?.split('\n')[0] || "Persona Group 1"} />
        {formatContent(segment.personas_1)}
        <SubsectionHeader icon={Users} title={segment.personas_2?.split('\n')[0] || "Persona Group 2"} />
        {formatContent(segment.personas_2)}
        <SubsectionHeader icon={Users} title={segment.personas_3?.split('\n')[0] || "Persona Group 3"} />
        {formatContent(segment.personas_3)}

        {/* Section 4: Messaging Strategy */}
        <SectionHeader icon={Target} title="Messaging Strategy" />
        <SubsectionHeader icon={Target} title="Positioning Statement" />
        {formatContent(segment.positioning_statement)}
        <SubsectionHeader icon={Target} title="Headline" />
        {formatContent(segment.positioning_headline)}
        <SubsectionHeader icon={Target} title="Subline" />
        {formatContent(segment.positioning_subheadline)}

        {/* Section 5: Capability Assessment */}
        <SectionHeader icon={Star} title="Capability Assessment" />
        <SubsectionHeader icon={Star} title="Interoperability" />
        {formatContent(segment.ca_interoperability)}
        <SubsectionHeader icon={Star} title="Resilience" />
        {formatContent(segment.ca_resiliance)}
        <SubsectionHeader icon={Star} title="Scalability" />
        {formatContent(segment.ca_scalability)}
        <SubsectionHeader icon={Star} title="Flexibility" />
        {formatContent(segment.ca_customization)}
        <SubsectionHeader icon={Star} title="Reliability" />
        {formatContent(segment.ca_reliability)}
        <SubsectionHeader icon={Star} title="Other" />
        {formatContent(segment.ca_other)}

        {/* Section 6: Polkadot-Market-Fit Score */}
        <SectionHeader icon={Star} title="Polkadot-Market-Fit Score" />
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-polkadot-pink/10 to-white rounded-xl shadow-sm">
            <h3 className="text-sm uppercase tracking-wider text-polkadot-pink/70 font-semibold mb-2">PMF Score</h3>
            <p className="text-5xl font-bold text-polkadot-pink">{scoreData?.pmf || segment.pmf || "N/A"}</p>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">Score Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full rounded-lg overflow-hidden border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-polkadot-pink to-[#9B87F5] text-white">
                    <th className="py-2 px-4 text-left font-medium">Criteria</th>
                    <th className="py-2 px-4 text-center font-medium">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {formattedScores.map((score, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-t border-gray-200">{score.name}</td>
                      <td className="py-2 px-4 text-center border-t border-gray-200">
                        <span className="inline-block min-w-12 py-1 px-2 bg-gray-100 rounded-full text-sm font-medium">
                          {score.value.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;
