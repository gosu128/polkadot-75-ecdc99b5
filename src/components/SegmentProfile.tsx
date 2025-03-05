
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
import { ResponsiveBar } from '@nivo/bar';
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

// Format content with bullet points and bold leading text
const formatContent = (content: string | null) => {
  if (!content) return <p className="text-gray-700 italic">No information available.</p>;
  
  return (
    <ul className="list-disc pl-5 text-gray-700 space-y-2">
      {content.split('\n').map((line, index) => {
        // Bold text before the colon
        const parts = line.split(':');
        return (
          <li key={index}>
            <span className="font-semibold">{parts[0]}:</span> {parts.slice(1).join(':')}
          </li>
        );
      })}
    </ul>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-3">
    <Icon className="mr-2 text-indigo-600 w-6 h-6" />
    {title}
  </h3>
);

const SegmentProfile = ({ segment, industry, onBack }: SegmentProfileProps) => {
  // Parse score data for better visualization
  const scoreData = React.useMemo(() => {
    if (!segment.score) return null;
    try {
      return JSON.parse(segment.score).map((item: any) => ({
        category: item.key,
        score: item.value,
      }));
    } catch (e) {
      return null;
    }
  }, [segment.score]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header Section */}
      <div className="mb-8">
        <div className="text-indigo-600 font-medium uppercase tracking-wide text-sm">{industry?.name}</div>
        <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
        <button 
          onClick={onBack} 
          className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>

      {/* SINGLE COLUMN LAYOUT */}
      <div className="space-y-8">
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

        {/* Key Regions (Now below Market Trends) */}
        {segment.regions && (
          <div>
            <SectionHeader icon={Globe} title="Key Regions" />
            <p className="text-gray-700">{segment.regions}</p>
            <div className="h-64 w-full mt-4">
              <WorldMap regions={segment.regions} />
            </div>
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

        {/* SCORE SECTION - Horizontal Bar Chart */}
        {scoreData && (
          <div>
            <SectionHeader icon={Star} title="Segment Score" />
            <div className="h-64 w-full">
              <ResponsiveBar
                data={scoreData}
                keys={["score"]}
                indexBy="category"
                margin={{ top: 20, right: 30, bottom: 50, left: 100 }}
                padding={0.3}
                layout="horizontal"
                colors={["#6366F1"]}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisBottom={{ legend: "Score (out of 10)", legendPosition: "middle", legendOffset: 40 }}
                axisLeft={{ tickSize: 0, tickPadding: 5 }}
                enableLabel={true}
                labelTextColor={{ from: 'color', modifiers: [['darker', 3]] }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SegmentProfile;
