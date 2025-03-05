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

// Function to format content with bullet points and bold sub-headings
const formatContent = (content: string | null) => {
  if (!content) return <p className="text-gray-600 italic">No information available.</p>;
  
  return (
    <ul className="list-disc pl-5 text-gray-700 space-y-2">
      {content.split('\n').map((line, index) => {
        // Bold sub-titles detection (assumes sub-titles end with ':')
        if (line.trim().endsWith(':')) {
          return <li key={index} className="font-semibold">{line}</li>;
        }
        return <li key={index}>{line}</li>;
      })}
    </ul>
  );
};

// Helper component for section headers
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-xl font-unbounded text-gray-900 flex items-center mb-3">
    <Icon className="mr-2 text-indigo-600 w-5 h-5" />
    {title}
  </h3>
);

const SegmentProfile = ({ segment, industry, onBack }: SegmentProfileProps) => {
  // Parse score data for the radar chart
  const scoreData = React.useMemo(() => {
    if (!segment.score) return null;
    try {
      return JSON.parse(segment.score);
    } catch (e) {
      return null;
    }
  }, [segment.score]);

  // Prepare radar chart data
  const radarData = React.useMemo(() => {
    if (!scoreData) return [];
    return [
      scoreData.reduce((obj: any, item: any) => ({ ...obj, [item.key]: item.value }), { segment: segment.name })
    ];
  }, [scoreData, segment.name]);

  const radarKeys = React.useMemo(() => scoreData?.map((item: any) => item.key) || [], [scoreData]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-indigo-600 font-medium uppercase tracking-wide text-sm">{industry?.name}</div>
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
        </div>
        <button 
          onClick={onBack} 
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Side (Text Information) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <div>
            <SectionHeader icon={Info} title="Overview" />
            {formatContent(segment.abstract)}
          </div>

          {/* Definition */}
          {segment.definition && (
            <div>
              <SectionHeader icon={BookText} title="Definition" />
              {formatContent(segment.definition)}
            </div>
          )}

          {/* Market Trends */}
          {segment.trends && (
            <div>
              <SectionHeader icon={TrendingUp} title="Market Trends" />
              {formatContent(segment.trends)}
            </div>
          )}

          {/* Challenges */}
          {segment.challenges && (
            <div>
              <SectionHeader icon={AlertTriangle} title="Challenges" />
              {formatContent(segment.challenges)}
            </div>
          )}

          {/* Use Cases */}
          {segment.use_cases && (
            <div>
              <SectionHeader icon={Lightbulb} title="Use Cases" />
              {formatContent(segment.use_cases)}
            </div>
          )}

          {/* Positioning Statement */}
          {segment.positioning_statement && (
            <div>
              <SectionHeader icon={Target} title="Positioning Statement" />
              {formatContent(segment.positioning_statement)}
            </div>
          )}

          {/* Personas */}
          {segment.personas && (
            <div>
              <SectionHeader icon={Users} title="Target Personas" />
              {formatContent(segment.personas)}
            </div>
          )}
        </div>

        {/* Right Side (Charts & Regions) */}
        <div className="space-y-10">
          {/* Radar Chart */}
          {scoreData && (
            <div>
              <SectionHeader icon={Star} title="Segment Score" />
              <div className="bg-white rounded-lg p-4 h-72 shadow-md">
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
                  colors={{ scheme: 'blues' }}
                  blendMode="multiply"
                  motionConfig="gentle"
                  gridShape="circular"
                />
              </div>
            </div>
          )}

          {/* Regions with Map */}
          {segment.regions && (
            <div>
              <SectionHeader icon={Globe} title="Key Regions" />
              <p className="text-gray-700">{segment.regions}</p>
              <div className="h-64 w-full mt-4">
                <WorldMap regions={segment.regions} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;

