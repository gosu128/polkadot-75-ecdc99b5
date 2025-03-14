
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info, Lightbulb, Star, Target, Users, Globe } from "lucide-react";
import Header from "@/components/Header";

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-12 mb-2">
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

const formatContent = (text: string | undefined) => {
  if (!text) return <p className="italic text-gray-500">Content not available.</p>;

  const paragraphs = text.split("\n\n");
  const formattedContent: JSX.Element[] = [];

  paragraphs.forEach((paragraph, index) => {
    // Highlight Persona Names (###) Without Boxes
    if (paragraph.trim().startsWith("###")) {
      formattedContent.push(
        <h4 key={`persona-title-${index}`} className="text-xl font-bold text-gray-900 mt-6">
          {paragraph.replace(/^###/, "").trim()}
        </h4>
      );
      return;
    }

    // Convert bullet points ("- item") into proper lists & REMOVE extra "-"
    if (paragraph.trim().startsWith("-")) {
      const bulletPoints = paragraph.split("\n").map((point, idx) => {
        const cleanedPoint = point.replace(/^-/, "").trim(); // Remove the extra "-"
        const formattedPoint = cleanedPoint.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"); // Bold text inside *asterisks*

        return <li key={`bullet-${index}-${idx}`} className="text-gray-700" dangerouslySetInnerHTML={{ __html: formattedPoint }} />;
      });

      formattedContent.push(<ul key={`list-${index}`} className="list-disc pl-5 space-y-2">{bulletPoints}</ul>);
      return;
    }

    // Apply bold formatting ONLY to words/phrases between *asterisks*
    const formattedText = paragraph.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

    formattedContent.push(<p key={`text-${index}`} dangerouslySetInnerHTML={{ __html: formattedText }} />);
  });

  return formattedContent.length > 0 ? formattedContent : <p className="italic text-gray-500">Content coming soon...</p>;
};


const PitchAdvise = () => {
  const [content, setContent] = useState<{ [key: string]: string | undefined }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("pitch_advise").select("section, content");

      if (error) {
        console.error("Error fetching content:", error);
      } else if (data) {
        const contentMap: { [key: string]: string | undefined } = {};
        data.forEach((row) => {
          if (row.section && row.content) {
            contentMap[row.section] = row.content;
          }
        });
        setContent(contentMap);
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      
      {/* Hero section with centered title and lots of vertical space */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold leading-tight text-center">
          Welcome to the
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">
            Polkadot Sales Hub
          </span>
        </h1>
      </div>
      
      {/* Content sections - only visible on scroll */}
      <div className="flex flex-col text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="space-y-10 max-w-4xl">
          <SectionHeader icon={Info} title="Introduction" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["introduction"])}</div>

          <SectionHeader icon={AlertTriangle} title="Things to Keep in Mind during B2B Pitches" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["b2b_pitches"])}</div>

          <SectionHeader icon={Lightbulb} title="Important B2B Use Cases" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["use_cases"])}</div>

          <SectionHeader icon={Globe} title="Geographical Hotspots" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["geographies"])}</div>

          {/* World Map Image */}
          <div className="flex justify-center mt-6">
            <img
              src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/polkadot//Pitch_Advise_-_World_Map.png"
              alt="Geographical Hotspots Map"
              className="max-w-full h-auto"
            />
          </div>

          <SectionHeader icon={Users} title="Important B2B Personas" />
          <div className="text-gray-700 leading-relaxed space-y-6">{formatContent(content["personas"])}</div>

          <SectionHeader icon={Target} title="Polkadot's Messaging Strategy" />
          <div className="text-gray-700 leading-relaxed space-y-4">
            {formatContent(content["messaging_strategy"])}

            {/* Positioning Image */}
            <div className="flex justify-center mt-6">
              <img
                src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/positioning//Pitch_Advise_-_Positioning.png"
                alt="Polkadot's Messaging Strategy Positioning"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          <SectionHeader icon={Star} title="Polkadot's Value Proposition" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["value_proposition"])}</div>

          <SectionHeader icon={Star} title="Polkadot's Capability Assessment" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["capability_assessment"])}</div>
        </div>
      </div>
    </div>
  );
};

export default PitchAdvise;
