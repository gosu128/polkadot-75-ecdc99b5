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

// Helper component for structured sections
const Section = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string | null }) => (
  <div className="bg-gray-100 rounded-lg p-6 shadow-md">
    <h3 className="text-lg font-semibold flex items-center mb-3 text-gray-800">
      <Icon className="mr-2 text-indigo-500 w-5 h-5" />
      {title}
    </h3>
    {content ? (
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    ) : (
      <p className="text-gray-500 italic">No information available.</p>
    )}
  </div>
);

const SegmentProfile = ({ segment, industry, onBack }: SegmentProfileProps) => {
  // Parse score data
  const scoreData = React.useMemo(() => {
    if (!segment.score) return null;
    try {
      return JSON.parse(segment.score);
    } catch (e) {
      const parts = segment.score.split(',').map(part => {
        const [key, value] = part.split(':').map(s => s.trim());
        return { key, value: parseFloat(value) || 5 };
      });
      return parts.length > 0 ? parts : null;
    }
  }, [segment.score]);

  // Format score data for radar chart
  const radarData = React.useMemo(() => {
    if (!scoreData) return [];
    return [scoreData.reduce((obj: any, item: any) => ({ ...obj, [item.key]: item.value }), { segment: segment.name })];
  }, [scoreData, segment.name]);

  // Extract radar chart keys
  const radarKeys = React.useMemo(() => scoreData?.map((item: any) => item.key) || [], [scoreData]);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mb-2">
            {industry?.name}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{segment.name}</h2>
        </div>
        <button 
          onClick={onBack} 
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>

      {/* Grid Layout for Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side (Text Information) */}
        <div className="lg:col-span-2 space-y-6">
          <Section icon={Info} title="Overview" content={segment.abstract} />
          {segment.definition && <Section icon={BookText} title="Definition" content={segment.definition} />}
          {segment.trends && <Section icon={TrendingUp} title="Market Trends" content={segment.trends} />}
          {segment.challenges && <Section icon={AlertTriangle} title="Challenges" content={segment.challenges} />}
          {segment.use_cases && <Section icon={Lightbulb} title="Use Cases" content={segment.use_cases} />}
          {segment.positioning_statement && <Section icon={Target} title="Positioning Statement" content={segment.positioning_statement} />}
          {segment.personas && <Section icon={Users} title="Target Personas" content={segment.personas} />}
        </div>

        {/* Right Side (Charts & Actions) */}
        <div className="space-y-6">
          {/* Score Radar Chart */}
          {scoreData && (
            <div className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800">
                <Star className="mr-2 text-indigo-500 w-5 h-5" />
                Segment Score
              </h3>
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
                  colors={{ scheme: 'blues' }}
                  blendMode="multiply"
                  motionConfig="gentle"
                  gridShape="circular"
                />
              </div>
            </div>
          )}

          {/* Regions Section with Map */}
          {segment.regions && (
            <div className="bg-gray-100 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold flex items-center mb-4 text-gray-800">
                <Globe className="mr-2 text-indigo-500 w-5 h-5" />
                Key Regions
              </h3>
              <p className="text-gray-700 mb-4">{segment.regions}</p>
              <div className="h-64 w-full bg-white rounded-lg p-2">
                <WorldMap regions={segment.regions} />
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Download Segment Report
              </button>
              <button className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                Schedule Consultation
              </button>
              <button className="w-full bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
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
