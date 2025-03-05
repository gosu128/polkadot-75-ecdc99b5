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
  Users,
  FileText
} from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';
import { Link as ScrollLink, Element } from 'react-scroll';
import Footer from '@/components/Footer';

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
  segment: Segment | null;
  onBack: () => void;
};

// Function to format content while keeping ":" and bolding key phrases
const formatContent = (content: string | null) => {
  if (!content) return <p className="font-inter-light text-gray-700 italic">No information available</p>;

  return (
    <div className="font-inter-light text-gray-700 space-y-4 text-left">
      {content.split('\n').map((line, index) => {
        if (line.includes(':')) {
          const parts = line.split(':');
          const boldText = parts[0]?.trim();
          const remainingText = parts.slice(1).join(':').trim();

          return (
            <p key={index}>
              <span className="font-inter-bold">{boldText}:</span> {remainingText}
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
  <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-6 border-b border-gray-300 pb-2">
    <Icon className="mr-3 text-indigo-600 w-6 h-6" />
    {title}
  </h3>
);

// Placeholder score data for segmentation criteria (scale: 1-10)
const placeholderScores = [
  { category: "Market Size", score: 8 },
  { category: "Growth Potential", score: 7 },
  { category: "Competitive Landscape", score: 6 },
  { category: "Revenue Opportunities", score: 9 },
  { category: "Technical Feasibility", score: 7 },
  { category: "Regulatory Environment", score: 5 },
  { category: "Adoption Rate", score: 6 },
  { category: "Integration Complexity", score: 8 },
  { category: "Customer Demand", score: 7 },
  { category: "Strategic Fit", score: 9 }
];

const SegmentProfile = ({ segment, onBack }: SegmentProfileProps) => {
  if (!segment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: Segment data not found</h2>
        <button 
          onClick={onBack} 
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md">
          ← Back to Selection
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content container */}
      <div className="w-full max-w-6xl mx-auto px-8 py-24 flex-grow"> 
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900">{segment.name}</h2>
          <button 
            onClick={onBack} 
            className="mt-4 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition font-inter-light">
            ← Back
          </button>
        </div>

        {/* Navigation Links for Sections */}
        <div className="mb-10 border-b border-gray-300 pb-3 flex space-x-6 text-indigo-600 font-inter-bold text-sm">
          {["Overview", "Scores", "Use Cases", "Value Proposition", "Buyer Personas", "Case Studies"].map((section) => (
            <ScrollLink key={section} to={section} smooth={true} duration={500} className="cursor-pointer hover:underline">
              {section}
            </ScrollLink>
          ))}
        </div>

        {/* Sections Below */}
        <div className="space-y-12">
          
          {/* OVERVIEW SECTION */}
          <Element name="Overview">
            <SectionHeader icon={Info} title="Overview" />
            {formatContent(segment.abstract)}
            {formatContent(segment.definition)}
            {formatContent(segment.trends)}
            {formatContent(segment.regions)}
          </Element>

          {/* SCORES SECTION */}
          <Element name="Scores">
            <SectionHeader icon={Star} title="Scores" />
            <div className="h-64 w-full">
              <ResponsiveBar
                data={placeholderScores}
                keys={["score"]}
                indexBy="category"
                margin={{ top: 20, right: 30, bottom: 50, left: 120 }}
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
          </Element>

          {/* USE CASES SECTION */}
          <Element name="Use Cases">
            <SectionHeader icon={Lightbulb} title="Use Cases" />
            {formatContent(segment.use_cases)}
          </Element>

          {/* VALUE PROPOSITION SECTION */}
          <Element name="Value Proposition">
            <SectionHeader icon={Target} title="Value Proposition" />
            {formatContent(segment.positioning_statement)}
          </Element>

          {/* BUYER PERSONAS SECTION */}
          <Element name="Buyer Personas">
            <SectionHeader icon={Users} title="Buyer Personas" />
            {formatContent(segment.personas)}
          </Element>

          {/* CASE STUDIES SECTION */}
          <Element name="Case Studies">
            <SectionHeader icon={FileText} title="Case Studies" />
            <p className="font-inter-light text-gray-700">
              Discover real-world implementations of this segment and its impact. Download related case studies below:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li><a href="#" className="text-indigo-600 hover:underline">Case Study 1 (PDF)</a></li>
              <li><a href="#" className="text-indigo-600 hover:underline">Case Study 2 (PDF)</a></li>
            </ul>
          </Element>

        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;
