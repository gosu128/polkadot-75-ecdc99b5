import React, { useEffect, useState } from 'react';
import { Info, BookText, TrendingUp, Globe, AlertTriangle, Lightbulb, Star, Target, Users } from 'lucide-react';
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
  usecases_general: string | null;
  usecases_web3: string | null;
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
  scores: {
    key: string;
    value: number;
  }[] | null;
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
  return <div className="font-inter-light text-gray-700 space-y-2 text-left">
      {content.split('\n').map((line, index) => {
      if (line.includes(':')) {
        const parts = line.split(':');
        return <p key={index}>
              <span className="font-inter-bold font-light">{parts[0].trim()}:</span> {parts.slice(1).join(':').trim()}
            </p>;
      }
      return <p key={index}>{line.trim()}</p>;
    })}
    </div>;
};

// Section header component
const SectionHeader = ({
  icon: Icon,
  title
}: {
  icon: React.ElementType;
  title: string;
}) => <div className="mt-6 mb-2">
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>;

// Subsection header component
const SubsectionHeader = ({
  icon: Icon,
  title
}: {
  icon: React.ElementType;
  title: string;
}) => <h3 className="text-black font-semibold flex items-center mb-1 mt-3 text-lg">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>;

// World map component with highlighted countries
const WorldMap = () => <div className="mt-4 mb-6">
    <svg viewBox="0 0 1000 500" className="w-full h-auto max-w-2xl mx-auto">
      {/* Main world outlines */}
      <path d="M161.1,307.3c0.8-0.7,1.7-0.6,2.6-0.6c1.3,0,2.7-0.2,4-0.4c3.3-0.4,6.6-0.4,9.9-0.1c2.3,0.2,4.5,0.5,6.7,0.9
        c4.7,0.8,9.5,0.3,14.2-0.3c2.7-0.4,5.4-1.1,8.1-1.6c1-0.2,2-0.3,3.1-0.4c3.1-0.4,6.1-0.8,9-2c2.1-0.9,3.9-2.2,5.7-3.5
        c1.6-1.1,3.1-2.3,4.6-3.4c0.2-0.2,0.4-0.4,0.4-0.7c0-0.2-0.2-0.3-0.4-0.4c-1.7-0.6-3.4-1.3-5.1-1.9c-1.9-0.7-3.9-1-5.9-1.1
        c-1.2-0.1-2.4-0.3-3.6-0.5c-2.8-0.5-5.7-0.8-8.5-1.4c-1.9-0.4-3.8-0.9-5.5-1.8c-1.8-0.9-3.4-2-5.2-2.8c-2-0.9-4.1-1.5-6.2-1.9
        c-3-0.6-6-1.1-9-1.9c-1.6-0.4-3.2-0.8-4.8-1.3c-0.5-0.2-1.1-0.3-1.5-0.7c-0.5-0.5-1.1-0.7-1.8-0.7c-0.8,0-1.5,0.1-2.3,0.2" fill="none" stroke="#BBB" strokeWidth="1" />
      
      {/* North America */}
      <path d="M210,120 C180,110 150,110 120,105 C90,100 70,80 50,60 C30,40 20,20 10,0 
           C0,-20 -10,-40 -10,-60 C-10,-80 0,-100 20,-110 C40,-120 60,-120 80,-110 
           C100,-100 120,-90 140,-80 C160,-70 180,-60 200,-60 C220,-60 240,-70 260,-70 
           C280,-70 300,-60 320,-50 C340,-40 360,-30 380,-30 C400,-30 420,-40 440,-40 
           C460,-40 480,-30 500,-20 C520,-10 540,0 560,0 C580,0 600,-10 620,-10 
           C640,-10 660,0 680,10 C700,20 720,30 740,30" fill="none" stroke="#BBB" strokeWidth="1" />
      
      {/* Europe */}
      <path d="M500,120 C480,110 460,110 440,100 C420,90 400,80 380,70 
           C360,60 340,50 320,50 C300,50 280,60 260,60 C240,60 220,50 200,50 
           C180,50 160,60 140,70 C120,80 100,90 80,90 
           C60,90 40,80 20,70 C0,60 -20,50 -20,30 
           C-20,10 0,0 20,-10 C40,-20 60,-30 80,-30 
           C100,-30 120,-20 140,-20 C160,-20 180,-30 200,-30 
           C220,-30 240,-20 260,-10 C280,0 300,10 320,10 
           C340,10 360,0 380,-10 C400,-20 420,-30 440,-30 
           C460,-30 480,-20 500,-10 C520,0 540,10 560,10" fill="none" stroke="#BBB" strokeWidth="1" />
      
      {/* Africa */}
      <path d="M500,200 C480,190 460,190 440,180 C420,170 400,160 380,150 
           C360,140 340,130 320,130 C300,130 280,140 260,140 
           C240,140 220,130 200,130 C180,130 160,140 140,150 
           C120,160 100,170 80,170 C60,170 40,160 20,150 
           C0,140 -20,130 -20,110 C-20,90 0,80 20,70 
           C40,60 60,50 80,50 C100,50 120,60 140,60 
           C160,60 180,50 200,50 C220,50 240,60 260,70 
           C280,80 300,90 320,90 C340,90 360,80 380,70 
           C400,60 420,50 440,50 C460,50 480,60 500,70" fill="none" stroke="#BBB" strokeWidth="1" />
      
      {/* South America */}
      <path d="M280,320 C260,310 240,310 220,300 C200,290 180,280 160,270 
           C140,260 120,250 100,250 C80,250 60,260 40,260 
           C20,260 0,250 0,230 C0,210 20,200 40,190 
           C60,180 80,170 100,170 C120,170 140,180 160,180 
           C180,180 200,170 220,170 C240,170 260,180 280,190 
           C300,200 320,210 340,210 C360,210 380,200 400,190" fill="none" stroke="#BBB" strokeWidth="1" />
      
      {/* Asia */}
      <path d="M600,150 C580,140 560,140 540,130 C520,120 500,110 480,100 
           C460,90 440,80 420,80 C400,80 380,90 360,90 
           C340,90 320,80 300,80 C280,80 260,90 240,100 
           C220,110 200,120 180,120 C160,120 140,110 120,100 
           C100,90 80,80 60,80 C40,80 20,90 0,100 
           C-20,110 -40,120 -40,140 C-40,160 -20,170 0,180 
           C20,190 40,200 60,200 C80,200 100,190 120,190 
           C140,190 160,200 180,210 C200,220 220,230 240,230 
           C260,230 280,220 300,210 C320,200 340,190 360,190 
           C380,190 400,200 420,210 C440,220 460,230 480,230 
           C500,230 520,220 540,210 C560,200 580,190 600,190" fill="none" stroke="#BBB" strokeWidth="1" />
      
      {/* Australia */}
      <path d="M750,300 C730,290 710,290 690,280 C670,270 650,260 630,250 
           C610,240 590,230 570,230 C550,230 530,240 510,240 
           C490,240 470,230 450,230 C430,230 410,240 390,250 
           C370,260 350,270 330,270 C310,270 290,260 270,250" fill="none" stroke="#BBB" strokeWidth="1" />

      {/* Highlighted regions/countries */}
      <path d="M280,120 C260,110 240,110 220,100 C200,90 180,80 160,70" fill="none" stroke="#7E69AB" strokeWidth="2" />
      <path d="M500,100 C480,90 460,90 440,80 C420,70 400,60 380,50" fill="none" stroke="#7E69AB" strokeWidth="2" />
      <path d="M650,170 C630,160 610,160 590,150 C570,140 550,130 530,120" fill="none" stroke="#7E69AB" strokeWidth="2" />
      <path d="M350,250 C330,240 310,240 290,230 C270,220 250,210 230,200" fill="none" stroke="#7E69AB" strokeWidth="2" />
      <path d="M500,270 C480,260 460,260 440,250 C420,240 400,230 380,220" fill="none" stroke="#7E69AB" strokeWidth="2" />
      
      {/* Dots for major cities/regions */}
      <circle cx="220" cy="120" r="4" fill="#7E69AB" />
      <circle cx="450" cy="90" r="4" fill="#7E69AB" />
      <circle cx="600" cy="150" r="4" fill="#7E69AB" />
      <circle cx="300" cy="240" r="4" fill="#7E69AB" />
      <circle cx="700" cy="270" r="4" fill="#7E69AB" />
      <circle cx="500" cy="180" r="4" fill="#7E69AB" />
    </svg>
  </div>;
const SegmentProfile = ({
  segment,
  industry,
  onBack
}: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  useEffect(() => {
    const fetchScores = async () => {
      if (segment) {
        try {
          const {
            data,
            error
          } = await supabase.from('segments').select('interoperability, roi, scalability, customization, awareness, tech, tam, compliance, complexity, reliability, pmf').eq('id', segment.id).maybeSingle();
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
    return <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: Segment data not found</h2>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
          ← Back to Selection
        </button>
      </div>;
  }

  // Format scores for display
  const formattedScores = scoreData ? [{
    name: 'Interoperability',
    value: scoreData.interoperability || 0
  }, {
    name: 'ROI',
    value: scoreData.roi || 0
  }, {
    name: 'Scalability',
    value: scoreData.scalability || 0
  }, {
    name: 'Customization',
    value: scoreData.customization || 0
  }, {
    name: 'Awareness',
    value: scoreData.awareness || 0
  }, {
    name: 'Tech Stack',
    value: scoreData.tech || 0
  }, {
    name: 'TAM',
    value: scoreData.tam || 0
  }, {
    name: 'Compliance',
    value: scoreData.compliance || 0
  }, {
    name: 'Complexity',
    value: scoreData.complexity || 0
  }, {
    name: 'Reliability',
    value: scoreData.reliability || 0
  }] : [];
  return <div className="flex flex-col min-h-screen text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
      {/* Header with more space at the top */}
      <div className="mb-8">
        <h2 className="text-4xl font-unbounded font-bold text-gray-900">{segment.name}</h2>
        <button onClick={onBack} className="mt-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>

      {/* Main Sections with less space and narrower design */}
      <div className="space-y-4 max-w-4xl">

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

        {/* Section 2: Use Cases - with updated data fetching */}
        <SectionHeader icon={Lightbulb} title="Use Cases" />
        <SubsectionHeader icon={Lightbulb} title="General Use Cases" />
        {formatContent(segment.usecases_general)}
        <SubsectionHeader icon={Lightbulb} title="Web3 Use Cases" />
        {formatContent(segment.usecases_web3)}

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
            <h3 className="text-sm uppercase tracking-wider text-polkadot-pink/70 font-semibold mb-2">PMF-SCORE</h3>
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
                  {formattedScores.map((score, index) => <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 border-t border-gray-200">{score.name}</td>
                      <td className="py-2 px-4 text-center border-t border-gray-200">
                        <span className="inline-block min-w-12 py-1 px-2 bg-gray-100 rounded-full text-sm font-medium">
                          {score.value.toFixed(1)}
                        </span>
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default SegmentProfile;