
import React, { useEffect, useState } from 'react';
import { Info, BookText, TrendingUp, Globe, AlertTriangle, Lightbulb, Star, Target, Users, ChevronDown, ChevronUp, Zap, MessageSquare, CheckCircle, BookOpen } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

const getStorageImageUrl = (segmentName: string, bucket: string) => {
  if (!segmentName) return null;

  const formattedName = segmentName
    .replace(/\s*&\s*/g, "_&_")
    .replace(/\s*-\s*/g, "_-_")
    .replace(/\s+/g, "_");

  const filePath = `${formattedName}.png`;
  const fullUrl = `https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/${bucket}/${filePath}`;

  console.log(`Original Segment Name for ${bucket}:`, segmentName);
  console.log(`Formatted Filename for ${bucket}:`, filePath);
  console.log(`Final Image URL for ${bucket}:`, fullUrl);

  return fullUrl;
};

type Segment = {
  id: number;
  name: string;
  industry_id: number;
  abstract: string | null;
  definition: string | null;
  trends: string | null;
  regions: string | null;
  challenges: string | null;
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
  use_cases?: string | null;
  scores?: {
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
  segment: Segment;
  industry?: any;
  onBack?: () => void;
};

const formatContent = (content: string | null, isAbstract: boolean = false) => {
  if (!content) return <p className="font-inter-light text-gray-700 italic">No information available</p>;

  const paragraphs = content.split('\n');
  
  return <div className="font-inter-light text-gray-700 space-y-2">
    {paragraphs.map((line, index) => {
      if (isAbstract && index === paragraphs.length - 1) {
        return (
          <div key={index} className="mt-8 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#9B87F5] to-[#E6007A] px-4 py-2">
              <h4 className="text-white font-semibold flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                Our Recommendations for BD Agents
              </h4>
            </div>
            <div className="p-6 bg-gradient-to-r from-[#9B87F5]/10 via-[#E6007A]/5 to-[#9B87F5]/10 border-x border-b border-[#9B87F5]/20 shadow-md">
              <p className="text-gray-800 font-medium leading-relaxed">
                {line.trim()}
              </p>
            </div>
          </div>
        );
      }

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

// Section component - styled like Enterprise Pitch page
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
      <hr className="border-t-2 border-gray-300 mb-6" />
      <div>{children}</div>
    </div>
  );
};

// Subsection component - styled like Enterprise Pitch page
const Subsection = ({ 
  title, 
  icon: Icon,
  content
}: { 
  title: string; 
  icon: React.ElementType;
  content?: string | null;
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-polkadot-pink mb-2 flex items-center">
        <Icon className="mr-2 h-5 w-5" />
        {title}
      </h3>
      <hr className="border-t border-gray-200 mb-4" />
      {content !== undefined ? (
        <div dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-700 italic">No information available</p>' }} />
      ) : (
        <p className="text-gray-400 italic">Loading...</p>
      )}
    </div>
  );
};

const SegmentProfile = ({
  segment,
  industry,
  onBack
}: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [worldMapUrl, setWorldMapUrl] = useState<string | null>(null);
  const [positioningImageUrl, setPositioningImageUrl] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({
    'generalInfo': true,
    'thePitch': true,
    'other': true
  });
  
  useEffect(() => {
    if (segment && segment.name) {
      console.log("Segment Found:", segment.name);
      const url = getStorageImageUrl(segment.name, "polkadot");
      console.log("Generated World Map URL:", url);
      setWorldMapUrl(url);
      
      const posUrl = getStorageImageUrl(segment.name, "positioning");
      console.log("Generated Positioning Image URL:", posUrl);
      setPositioningImageUrl(posUrl);
    }
  }, [segment]);

  useEffect(() => {
    const fetchScores = async () => {
      if (segment) {
        try {
          const { data, error } = await supabase
            .from('segments')
            .select('interoperability, roi, scalability, customization, awareness, tech, tam, compliance, complexity, reliability, pmf')
            .eq('id', segment.id)
            .maybeSingle();
            
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

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return <div className="flex flex-col min-h-screen px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-unbounded font-bold text-gray-900 mb-8">{segment.name}</h2>
      </div>

      <div className="space-y-4 max-w-4xl">
        {/* 1. Abstract Section */}
        <Section title="1. Abstract">
          <div dangerouslySetInnerHTML={{ __html: formatContent(segment.abstract, true) as string }} />
        </Section>
        
        {/* 2. General Segment Information */}
        <Section title="2. General Segment Information">
          <Subsection 
            title="2.1. Definition" 
            icon={BookText}
            content={formatContent(segment.definition) as string} 
          />
          
          <Subsection 
            title="2.2. Market Trends" 
            icon={TrendingUp} 
            content={formatContent(segment.trends) as string}
          />
          
          <Subsection 
            title="2.3. Geographical Hotspots" 
            icon={Globe}
            content={formatContent(segment.regions) as string} 
          />
          
          {worldMapUrl && (
            <div className="flex justify-center my-6">
              <img
                src={worldMapUrl}
                alt={`World map for ${segment.name}`}
                className="w-full h-auto object-contain"
                onError={(e) => {
                  console.error("Error loading world map image:", worldMapUrl);
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
          
          <Subsection 
            title="2.4. Challenges" 
            icon={AlertTriangle}
            content={formatContent(segment.challenges) as string} 
          />
          
          <Subsection 
            title="2.5. Use Cases" 
            icon={Lightbulb}
            content={(
              <div className="space-y-4 text-gray-700">
                <h4 className="font-medium mt-2">General Use Cases</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.usecases_general) as string }} />
                
                <h4 className="font-medium mt-4">Web3 Use Cases</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.usecases_web3) as string }} />
              </div>
            ) as string}
          />
        </Section>
        
        {/* 3. The Pitch */}
        <Section title="3. The Pitch">
          <Subsection 
            title="3.1. Target Audiences" 
            icon={Users}
            content={(
              <div className="space-y-6">
                {[segment.personas_1, segment.personas_2, segment.personas_3].map((persona, personaIndex) => {
                  if (!persona) return null;

                  const lines = persona.split('\n');
                  const personaTitle = lines[0] || `Persona Group ${personaIndex + 1}`;
                  const whatTheyNeedIndex = lines.findIndex(line => line.includes('What They Need:'));
                  const beforeWhatTheyNeed = lines.slice(1, whatTheyNeedIndex).map((line, index) => (
                    <p key={index} className="my-2">{line.trim()}</p>
                  ));
                  const needsList = lines.slice(whatTheyNeedIndex + 1).map((point, idx) => (
                    <li key={idx}>{point.replace(/^\d+\.\s*/, '').trim()}</li>
                  ));

                  return (
                    <div key={personaIndex} className="mb-6">
                      <h4 className="text-gray-800 font-medium text-lg">{personaTitle}</h4>
                      <div className="text-gray-700 space-y-4 font-inter-light">
                        {beforeWhatTheyNeed}
                        {whatTheyNeedIndex !== -1 && (
                          <div className="mt-4 rounded-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-[#9B87F5] to-[#E6007A] px-4 py-2">
                              <h4 className="text-white font-semibold flex items-center">
                                <Lightbulb className="mr-2 h-5 w-5" />
                                What They Need
                              </h4>
                            </div>
                            <div className="p-6 bg-gradient-to-r from-[#9B87F5]/10 via-[#E6007A]/5 to-[#9B87F5]/10 border-x border-b border-[#9B87F5]/20 shadow-md">
                              <ol className="list-decimal pl-5 text-gray-800 space-y-1">
                                {needsList}
                              </ol>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) as string}
          />
          
          <Subsection 
            title="3.2. Capability Assessment" 
            icon={Star}
            content={(
              <div className="space-y-4">              
                <h4 className="text-gray-700 font-medium mt-4">Interoperability</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.ca_interoperability) as string }} />
                
                <h4 className="text-gray-700 font-medium mt-4">Resilience</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.ca_resiliance) as string }} />
                
                <h4 className="text-gray-700 font-medium mt-4">Scalability</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.ca_scalability) as string }} />
                
                <h4 className="text-gray-700 font-medium mt-4">Flexibility</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.ca_customization) as string }} />
                
                <h4 className="text-gray-700 font-medium mt-4">Reliability</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.ca_reliability) as string }} />
                
                <h4 className="text-gray-700 font-medium mt-4">Other Capabilities</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.ca_other) as string }} />
              </div>
            ) as string}
          />
          
          <Subsection 
            title="3.3. Value Proposition" 
            icon={Zap}
            content="<p class='text-gray-700 italic'>The value proposition is derived from the capability assessment and target audience needs.</p>"
          />
          
          <Subsection 
            title="3.4. Positioning" 
            icon={Target}
            content={(
              <div className="space-y-4">
                <h4 className="text-gray-700 font-medium mt-4">Positioning Statement</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.positioning_statement) as string }} />
              </div>
            ) as string}
          />
          
          <Subsection 
            title="3.5. Messaging Strategy" 
            icon={MessageSquare}
            content={(
              <div className="space-y-4">
                <h4 className="text-gray-700 font-medium mt-4">Headline</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.positioning_headline) as string }} />
                
                <h4 className="text-gray-700 font-medium mt-4">Subline</h4>
                <div dangerouslySetInnerHTML={{ __html: formatContent(segment.positioning_subheadline) as string }} />
                
                {positioningImageUrl && (
                  <div className="flex justify-center my-8">
                    <img
                      src={positioningImageUrl}
                      alt={`Positioning image for ${segment.name}`}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        console.error("Error loading positioning image:", positioningImageUrl);
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            ) as string}
          />
          
          <Subsection 
            title="3.6. Proof Points" 
            icon={CheckCircle}
            content="<p class='text-gray-700 italic'>Specific proof points for this segment are derived from the capability assessment and industry use cases.</p>"
          />
        </Section>
        
        {/* 4. Other Information */}
        <Section title="4. Other">
          <Subsection 
            title="4.1. PMF-Score" 
            icon={Star}
            content={(
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
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
            ) as string}
          />
          
          <Subsection 
            title="4.2. Recommended Reading Material" 
            icon={BookOpen}
            content={`
              <p class="text-gray-700">For more detailed information about this segment, consider exploring these resources:</p>
              <ul class="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                <li>Check the <a href="/resources" class="text-polkadot-pink hover:underline">Resources</a> page for case studies and proof points</li>
                <li>Review industry reports and whitepapers</li>
                <li>Explore success stories from similar segments</li>
              </ul>
            `}
          />
        </Section>
        
        {/* Back Button */}
        {onBack && (
          <div className="flex justify-center mt-12">
            <button
              onClick={onBack}
              className="px-6 py-3 bg-gradient-to-r from-[#E6007A] to-[#9B87F5] text-white font-unbounded rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              ← Back to Selection
            </button>
          </div>
        )}
      </div>
    </div>;
};

export default SegmentProfile;
