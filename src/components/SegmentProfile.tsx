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

  // Ensure the URL is formatted correctly
  if (!data || !data.publicUrl) {
    console.error(`Image not found for segment: ${segmentName}`);
    return null;
  }

  console.log("Generated Image URL:", data.publicUrl);
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

const SegmentProfile = ({ segment, industry, onBack }: SegmentProfileProps) => {
  const [scoreData, setScoreData] = useState<ScoreData | null>(null);
  const [worldMapUrl, setWorldMapUrl] = useState<string | null>(null);

  useEffect(() => {
    if (segment) {
      console.log("Segment Found:", segment.name);

      // Fetch world map URL asynchronously
      const fetchMapUrl = async () => {
        const url = await getWorldMapUrl(segment.name);
        setWorldMapUrl(url);
        console.log("Setting Image URL:", url);
      };

      fetchMapUrl();
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
        <SubsectionHeader icon={BookText} title="Definition" />
        <SubsectionHeader icon={TrendingUp} title="Market Trends" />

        <SectionHeader icon={Globe} title="Geographical Hotspots" />
        <SubsectionHeader icon={Globe} title="Regions" />

        {worldMapUrl ? (
          <div className="flex justify-center my-6">
            <img
              src={worldMapUrl}
              alt={`World map for ${segment.name}`}
              className="w-full max-w-2xl rounded-lg shadow-md"
              onError={(e) => {
                console.error("Error loading image:", worldMapUrl);
                e.currentTarget.src = "/fallback-image.png"; // Fallback in case image fails
              }}
            />
          </div>
        ) : (
          <p className="text-gray-500 italic">No geographical data available for this segment.</p>
        )}
      </div>
    </div>
  );
};

// Section header component
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-6 mb-2">
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

// Subsection header component
const SubsectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <h3 className="text-black font-semibold flex items-center mb-1 mt-3 text-lg my-[25px] mx-0">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>
);

export default SegmentProfile;
