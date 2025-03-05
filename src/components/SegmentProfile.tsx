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

// Function to format content properly
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
const SectionHeader = ({ icon: Icon, title, id }: { icon: React.ElementType; title: string; id: string }) => (
  <h3 id={id} className="text-2xl font-unbounded text-gray-900 flex items-center mb-4 scroll-mt-24">
    <Icon className="mr-2 text-indigo-600 w-6 h-6" />
    {title}
  </h3>
);

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

  // Smooth scrolling function
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Define available sections
  const sections = [
    { id: "overview", title: "Overview", icon: Info, content: segment.abstract },
    { id: "definition", title: "Definition", icon: BookText, content: segment.definition },
    { id: "trends", title: "Market Trends", icon: TrendingUp, content: segment.trends },
    { id: "regions", title: "Key Regions", icon: Globe, content: segment.regions },
    { id: "challenges", title: "Challenges", icon: AlertTriangle, content: segment.challenges },
    { id: "use_cases", title: "Use Cases", icon: Lightbulb, content: segment.use_cases },
    { id: "positioning", title: "Positioning Statement", icon: Target, content: segment.positioning_statement },
    { id: "personas", title: "Target Personas", icon: Users, content: segment.personas },
    { id: "score", title: "Segment Score", icon: Star, content: segment.score }
  ].filter(section => section.content); // Only include sections with content

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content container with extra padding at the top */}
      <div className="w-full max-w-6xl mx-auto px-8 py-24 flex-grow"> 
        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>
          
          {/* Navigation Menu */}
          <div className="flex space-x-4 mt-4 overflow-x-auto pb-2 border-b border-gray-300">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-gray-600 text-sm hover:text-indigo-600 transition font-inter-light px-3 py-1 rounded-md"
              >
                {section.title}
              </button>
            ))}
          </div>

          <button 
            onClick={onBack} 
            className="mt-6 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition font-inter-light">
            ← Back
          </button>
        </div>

        {/* SINGLE COLUMN LAYOUT WITH PROPER SPACING */}
        <div className="space-y-12">
          {sections.map(({ id, title, icon, content }) => (
            <div key={id}>
              <SectionHeader id={id} icon={icon} title={title} />
              {formatContent(content)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SegmentProfile;
