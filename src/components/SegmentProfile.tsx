
import React from 'react';
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
import { ResponsiveRadar } from '@nivo/radar';
import WorldMap from './WorldMap';

type Industry = {
  id: number;
  name: string;
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
  use_cases: string | null;
  score: string | null;
  positioning_statement: string | null;
  personas: string | null;
};

type SegmentProfileProps = {
  segment: Segment;
  industry: Industry | null;
  onBack: () => void;
};

// Helper component for section content
const SectionContent = ({ content }: { content: string | null }) => {
  if (!content) return <p className="text-foreground/60 italic">No information available.</p>;
  return <p className="text-foreground/80 whitespace-pre-line">{content}</p>;
};

// Helper component for section headers
const SectionHeader = ({ 
  icon: Icon, 
  title 
}: { 
  icon: React.ElementType; 
  title: string;
}) => (
  <h3 className="text-lg font-medium flex items-center mb-3">
    <Icon className="mr-2 text-polkadot-pink w-5 h-5" />
    {title}
  </h3>
);

const SegmentProfile = ({ segment, industry, onBack }: SegmentProfileProps) => {
  // Parse score data if available
  const scoreData = React.useMemo(() => {
    if (!segment.score) return null;
    
    try {
      // Try to parse as JSON first
      return JSON.parse(segment.score);
    } catch (e) {
      // If not JSON, try to parse as comma-separated values
      const parts = segment.score.split(',').map(part => {
        const [key, value] = part.split(':').map(s => s.trim());
        return { key, value: parseFloat(value) || 5 };
      });
      
      if (parts.length > 0) {
        return parts;
      }
      
      // Fallback: create a simple visualization with the score as text
      return [
        { key: "Overall Score", value: 7 },
        { key: "Market Potential", value: 8 },
        { key: "Competitive Position", value: 6 },
        { key: "Technical Feasibility", value: 7 },
        { key: "Strategic Fit", value: 9 }
      ];
    }
  }, [segment.score]);

  // Convert score data to format needed for radar chart
  const radarData = React.useMemo(() => {
    if (!scoreData) return [];
    
    // Format for radar chart
    return [
      scoreData.reduce((obj: any, item: any) => {
        obj[item.key] = item.value;
        return obj;
      }, { segment: segment.name })
    ];
  }, [scoreData, segment.name]);

  // Get keys for radar chart
  const radarKeys = React.useMemo(() => {
    if (!scoreData) return [];
    return scoreData.map((item: any) => item.key);
  }, [scoreData]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-xl animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="pill-tag mb-2">{industry?.name}</div>
          <h2 className="text-2xl md:text-3xl font-unbounded font-semibold mb-1">{segment.name}</h2>
        </div>
        <button 
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-polkadot-gray transition-colors"
        >
          ← Back to Selection
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview Section */}
          <div className="bg-polkadot-gray rounded-lg p-6">
            <SectionHeader icon={Info} title="Overview" />
            <SectionContent content={segment.abstract} />
          </div>
          
          {/* Definition Section */}
          {segment.definition && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={BookText} title="Definition" />
              <SectionContent content={segment.definition} />
            </div>
          )}
          
          {/* Trends Section */}
          {segment.trends && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={TrendingUp} title="Market Trends" />
              <SectionContent content={segment.trends} />
            </div>
          )}
          
          {/* Regions Section with Map */}
          {segment.regions && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={Globe} title="Key Regions" />
              <div className="mb-4">
                <SectionContent content={segment.regions} />
              </div>
              <div className="h-64 w-full bg-white rounded-lg p-2">
                <WorldMap regions={segment.regions} />
              </div>
            </div>
          )}
          
          {/* Challenges Section */}
          {segment.challenges && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={AlertTriangle} title="Challenges" />
              <SectionContent content={segment.challenges} />
            </div>
          )}
          
          {/* Use Cases Section */}
          {segment.use_cases && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={Lightbulb} title="Use Cases" />
              <SectionContent content={segment.use_cases} />
            </div>
          )}
          
          {/* Positioning Statement */}
          {segment.positioning_statement && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={Target} title="Positioning Statement" />
              <SectionContent content={segment.positioning_statement} />
            </div>
          )}
          
          {/* Personas Section */}
          {segment.personas && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={Users} title="Target Personas" />
              <SectionContent content={segment.personas} />
            </div>
          )}
        </div>
        
        <div className="space-y-6">
          {/* Score Radar Chart */}
          {scoreData && (
            <div className="bg-polkadot-gray rounded-lg p-6">
              <SectionHeader icon={Star} title="Segment Score" />
              <div className="bg-white rounded-lg p-4 h-64">
                <ResponsiveRadar
                  data={radarData}
                  keys={radarKeys}
                  indexBy="segment"
                  maxValue={10}
                  margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                  borderWidth={2}
                  borderColor={{ from: 'color' }}
                  gridLabelOffset={36}
                  dotSize={8}
                  dotColor={{ theme: 'background' }}
                  dotBorderWidth={2}
                  colors={{ scheme: 'pink_purple' }}
                  blendMode="multiply"
                  motionConfig="gentle"
                  gridShape="circular"
                />
              </div>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="bg-polkadot-gray rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center">
                Download Segment Report
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                Schedule Consultation
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;
