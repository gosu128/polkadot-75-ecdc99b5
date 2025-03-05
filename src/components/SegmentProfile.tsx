
import { 
  Info, 
  Book, 
  TrendingUp, 
  MapPin, 
  Shield, 
  Lightbulb, 
  Star, 
  Target, 
  User 
} from 'lucide-react';

// Define types for our data
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

interface SegmentProfileProps {
  segment: Segment;
  industry: Industry | null;
  onBack: () => void;
}

const SegmentProfile = ({ 
  segment, 
  industry, 
  onBack 
}: SegmentProfileProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-xl animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full inline-block mb-2">{industry?.name}</div>
          <h2 className="text-2xl md:text-3xl font-unbounded font-semibold mb-1">{segment.name}</h2>
        </div>
        <button 
          onClick={onBack}
          className="px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          ← Back to Selection
        </button>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Left column - Main information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Abstract section */}
          {segment.abstract && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Info className="mr-2 text-polkadot-pink w-5 h-5" />
                Overview
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.abstract}</p>
              </div>
            </div>
          )}
          
          {/* Definition section */}
          {segment.definition && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Book className="mr-2 text-polkadot-pink w-5 h-5" />
                Definition
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.definition}</p>
              </div>
            </div>
          )}

          {/* Trends section */}
          {segment.trends && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <TrendingUp className="mr-2 text-polkadot-pink w-5 h-5" />
                Market Trends
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.trends}</p>
              </div>
            </div>
          )}
          
          {/* Regions section */}
          {segment.regions && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <MapPin className="mr-2 text-polkadot-pink w-5 h-5" />
                Key Regions
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.regions}</p>
              </div>
            </div>
          )}
          
          {/* Challenges section */}
          {segment.challenges && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Shield className="mr-2 text-polkadot-pink w-5 h-5" />
                Challenges
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.challenges}</p>
              </div>
            </div>
          )}
          
          {/* Use Cases section */}
          {segment.use_cases && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Lightbulb className="mr-2 text-polkadot-pink w-5 h-5" />
                Use Cases
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.use_cases}</p>
              </div>
            </div>
          )}
          
          {/* Positioning Statement section */}
          {segment.positioning_statement && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Target className="mr-2 text-polkadot-pink w-5 h-5" />
                Positioning Statement
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.positioning_statement}</p>
              </div>
            </div>
          )}
          
          {/* Personas section */}
          {segment.personas && (
            <div className="mb-6">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <User className="mr-2 text-polkadot-pink w-5 h-5" />
                Key Personas
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-line">{segment.personas}</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Right column - Score and actions */}
        <div className="space-y-6">
          {/* Score section */}
          {segment.score && (
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="text-lg font-medium flex items-center mb-3">
                <Star className="mr-2 text-polkadot-pink w-5 h-5" />
                Market Opportunity Score
              </h3>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <span className="text-4xl font-bold text-polkadot-pink">{segment.score}</span>
                  <p className="text-sm text-gray-500 mt-1">out of 10</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick actions section */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-polkadot-pink hover:bg-pink-600 text-white py-2 px-4 rounded-md transition-colors">
                Download Segment Report
              </button>
              <button className="w-full border border-polkadot-pink text-polkadot-pink hover:bg-pink-50 py-2 px-4 rounded-md transition-colors">
                Schedule Consultation
              </button>
              <button className="w-full border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md transition-colors">
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
