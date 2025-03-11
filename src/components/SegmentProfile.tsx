import React, { useEffect, useState } from 'react';
import { Info, BookText, TrendingUp, Globe, AlertTriangle, Lightbulb, Star, Target, Users } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import Footer from '@/components/Footer';

// Function to fetch the World Map URL from Supabase
const getWorldMapUrl = async (segmentName: string) => {
  const formattedName = segmentName.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to hyphens
  const filePath = `worldmap-${formattedName}.png`; // Adjust file format if necessary

  const { data } = supabase.storage
    .from("polkadot") // Your bucket name
    .getPublicUrl(filePath);

  return data.publicUrl;
};

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
        return <p key={index} className="py-[5px]">
              <span className="font-inter-bold font-semibold">{parts[0].trim()}:</span> {parts.slice(1).join(':').trim()}
            </p>;
      }
      return <p key={index} className="my-[10px]">{line.trim()}</p>;
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
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
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
}) => <h3 className="text-black font-semibold flex items-center mb-1 mt-3 text-lg my-[25px] mx-0">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>;

// World map component with highlighted countries
const WorldMap = () => <div className="mt-4 mb-6">
    
  </div>;
const SegmentProfile = ({
  segment,
  industry,
  onBack
}: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
    const [worldMapUrl, setWorldMapUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorldMap = async () => {
      if (segment) {
        const url = await getWorldMapUrl(segment.name);
        setWorldMapUrl(url);
      }
    };

    fetchWorldMap();
  }, [segment]);

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
        <h2 className="text-4xl font-unbounded font-bold text-gray-900 my-[60px]">{segment.name}</h2>
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
        <SectionHeader icon={Globe} title="Geographical Hotspots" />
{formatContent(segment.regions)}

{worldMapUrl ? (
  <div className="flex justify-center my-6">
    <img
      src={worldMapUrl}
      alt={`World map for ${segment.name}`}
      className="w-full max-w-2xl rounded-lg shadow-md"
    />
  </div>
) : (
  <p className="text-gray-500 italic">No geographical data available for this segment.</p>
)}

        <WorldMap />

        {/* Section 2: Use Cases - with updated data fetching */}
        <SectionHeader icon={Lightbulb} title="Use Cases" />
        <SubsectionHeader icon={Lightbulb} title="General Use Cases" />
        {formatContent(segment.usecases_general)}
        <SubsectionHeader icon={Lightbulb} title="Web3 Use Cases" />
        {formatContent(segment.usecases_web3)}
        
      {/* Section 3: Personas */}
      <SectionHeader icon={Users} title="Personas" />

      {/* Persona 1 */}
      {segment.personas_1 && <div className="mb-6">
    <SubsectionHeader icon={Users} title={segment.personas_1.split('\n')[0] || "Persona Group 1"} />
    <div className="text-gray-700 space-y-4 text-left font-inter-light">
      {segment.personas_1.split('\n').slice(1).map((line, index) => {
            if (line.includes('What They Need:')) {
              return <div key={index} className="p-4 bg-[#9B87F5]/10 border border-[#9B87F5] rounded-md shadow-sm">
              <p className="font-inter-bold text-[#9B87F5] mb-2 font-bold">What They Need:</p>
              <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                {segment.personas_1.split('\n').slice(index + 2).map((point, idx) => <li key={idx}>{point.replace(/^\d+\.\s*/, '').trim()}</li>)}
              </ol>
            </div>;
            }
            return index < segment.personas_1.split('\n').indexOf('What They Need:') ? <p key={index} className="my-2">{line.trim()}</p> : null;
          })}
    </div>
  </div>}

      {/* Persona 2 */}
      {segment.personas_2 && <div className="mb-6">
    <SubsectionHeader icon={Users} title={segment.personas_2.split('\n')[0] || "Persona Group 2"} />
    <div className="text-gray-700 space-y-4 text-left font-inter-light">
      {segment.personas_2.split('\n').slice(1).map((line, index) => {
            if (line.includes('What They Need:')) {
              return <div key={index} className="p-4 bg-[#9B87F5]/10 border border-[#9B87F5] rounded-md shadow-sm">
              <p className="font-inter-bold text-[#9B87F5] mb-2 font-bold">What They Need:</p>
              <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                {segment.personas_2.split('\n').slice(index + 2).map((point, idx) => <li key={idx}>{point.replace(/^\d+\.\s*/, '').trim()}</li>)}
              </ol>
            </div>;
            }
            return index < segment.personas_2.split('\n').indexOf('What They Need:') ? <p key={index} className="my-2">{line.trim()}</p> : null;
          })}
    </div>
  </div>}

      {/* Persona 3 */}
      {segment.personas_3 && <div className="mb-6">
    <SubsectionHeader icon={Users} title={segment.personas_3.split('\n')[0] || "Persona Group 3"} />
    <div className="text-gray-700 space-y-4 text-left font-inter-light">
      {segment.personas_3.split('\n').slice(1).map((line, index) => {
            if (line.includes('What They Need:')) {
              return <div key={index} className="p-4 bg-[#9B87F5]/10 border border-[#9B87F5] rounded-md shadow-sm">
              <p className="font-inter-bold text-[#9B87F5] mb-2 font-bold">What They Need:</p>
              <ol className="list-decimal pl-5 text-gray-700 space-y-1">
                {segment.personas_3.split('\n').slice(index + 2).map((point, idx) => <li key={idx}>{point.replace(/^\d+\.\s*/, '').trim()}</li>)}
              </ol>
            </div>;
            }
            return index < segment.personas_3.split('\n').indexOf('What They Need:') ? <p key={index} className="my-2">{line.trim()}</p> : null;
          })}
    </div>
  </div>}

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
      {/* Back Button - Moved to the Bottom */}
<div className="flex justify-center mt-12">
  <button
    onClick={onBack}
    className="px-6 py-3 bg-gradient-to-r from-[#E6007A] to-[#9B87F5] text-white font-unbounded rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
  >
    ← Back to Selection
  </button>
</div>

</div>
</div>;
};
export default SegmentProfile;
