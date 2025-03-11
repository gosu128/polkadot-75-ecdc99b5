import React, { useEffect, useState } from 'react';
import { Info, BookText, TrendingUp, Globe, AlertTriangle, Lightbulb, Star, Target, Users } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import Footer from '@/components/Footer';

// Function to fetch the World Map URL from Supabase
const getWorldMapUrl = async (segmentName: string) => {
  if (!segmentName) return null;
  
  const formattedName = segmentName.toLowerCase().replace(/\s+/g, "-");
  const filePath = `worldmap-${formattedName}.png`;

  const { data } = supabase.storage.from("polkadot").getPublicUrl(filePath);

  if (!data || !data.publicUrl) {
    console.error(`Image not found for segment: ${segmentName}`);
    return null;
  }

  console.log("Generated Image URL:", data.publicUrl);
  return data.publicUrl;
};

const SegmentProfile = ({ segment, industry, onBack }) => {
  const [scoreData, setScoreData] = useState(null);
  const [worldMapUrl, setWorldMapUrl] = useState(null);

  // Fetch the world map URL
  useEffect(() => {
    if (segment) {
      console.log("Segment Found:", segment.name);

      const fetchMapUrl = async () => {
        const url = await getWorldMapUrl(segment.name);
        if (url) setWorldMapUrl(url);
      };

      fetchMapUrl();
    }
  }, [segment]);

  // Fetch scores
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
          } else {
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600">Error: Segment data not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-unbounded font-bold text-gray-900 my-[60px]">{segment.name}</h2>
      </div>

      <div className="space-y-4 max-w-4xl">
        <SectionHeader icon={Info} title="Overview" />
        <SubsectionHeader icon={BookText} title="Abstract" />
        <p>{segment.abstract || "No abstract available."}</p>

        <SubsectionHeader icon={BookText} title="Definition" />
        <p>{segment.definition || "No definition available."}</p>

        <SubsectionHeader icon={TrendingUp} title="Market Trends" />
        <p>{segment.trends || "No market trends available."}</p>

        <SectionHeader icon={Globe} title="Geographical Hotspots" />
        <p>{segment.regions || "No regional data available."}</p>

        {worldMapUrl ? (
          <div className="flex justify-center my-6">
            <img
              src={worldMapUrl}
              alt={`World map for ${segment.name}`}
              className="w-full max-w-2xl rounded-lg shadow-md"
              onError={(e) => {
                console.error("Error loading image:", worldMapUrl);
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        ) : (
          <p className="text-gray-500 italic">No geographical data available for this segment.</p>
        )}

        <SectionHeader icon={Lightbulb} title="Use Cases" />
        <SubsectionHeader icon={Lightbulb} title="General Use Cases" />
        <p>{segment.usecases_general || "No general use cases available."}</p>

        <SubsectionHeader icon={Lightbulb} title="Web3 Use Cases" />
        <p>{segment.usecases_web3 || "No Web3 use cases available."}</p>

        <SectionHeader icon={Star} title="Polkadot-Market-Fit Score" />
        <p className="text-lg font-bold">{scoreData?.pmf || "No score available."}</p>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gradient-to-r from-[#E6007A] to-[#9B87F5] text-white font-unbounded rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          ← Back to Selection
        </button>
      </div>
    </div>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title }) => (
  <div className="mt-6 mb-2">
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

// Subsection header component
const SubsectionHeader = ({ icon: Icon, title }) => (
  <h3 className="text-black font-semibold flex items-center mb-1 mt-3 text-lg my-[25px] mx-0">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>
);

export default SegmentProfile;
