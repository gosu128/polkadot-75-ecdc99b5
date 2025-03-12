import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info, Lightbulb, Star, Target, Users } from "lucide-react";
import Header from "@/components/Header";

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-12 mb-2">  {/* Increased top margin for more white space before headers */}
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

const PitchAdvise = () => {
  const [content, setContent] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("pitch_advise").select("section, content");
      if (error) {
        console.error("Error fetching content:", error);
      } else {
        const contentMap: { [key: string]: string } = {};
        data.forEach((row) => {
          contentMap[row.section] = row.content;
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
      <div className="flex flex-col min-h-screen text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 my-[60px]">Pitch Advice for BD Agents</h2>
        </div>

       <div className="max-w-4xl">
  <SectionHeader icon={Info} title="Introduction" />
  <p className="text-gray-700 leading-relaxed">{content["introduction"] || "Content not available."}</p>

  <SectionHeader icon={AlertTriangle} title="Things to Keep in Mind during B2B Pitches" />
  <p className="text-gray-700 leading-relaxed">{content["b2b_pitches"] || "Content not available."}</p>

  <SectionHeader icon={Lightbulb} title="Important B2B Use Cases" />
  <p className="text-gray-700 leading-relaxed">{content["use_cases"] || "Content not available."}</p>

  <SectionHeader icon={Users} title="Important B2B Personas" />
<div className="text-gray-700 leading-relaxed space-y-6">
  {content["personas"]
    ? content["personas"].split("###").map((persona, index) => {
        if (!persona.trim()) return null;
        const lines = persona.trim().split("\n");
        const title = lines[0].replace(/\*\*/g, "").trim(); // Remove ** but keep it bold using <strong>
        const keyConcernsIndex = lines.findIndex((line) => line.startsWith("Key Concerns:"));
        const messagingStrategyIndex = lines.findIndex((line) => line.startsWith("Messaging Strategy:"));
        
        // Extract sections
        const description = lines.slice(1, keyConcernsIndex).join(" ").trim();
        const keyConcerns = keyConcernsIndex !== -1 ? lines[keyConcernsIndex].replace("Key Concerns:", "").trim() : "";
        const messagingStrategy = messagingStrategyIndex !== -1 ? lines[messagingStrategyIndex].replace("Messaging Strategy:", "").trim() : "";

        return (
          <div key={index} className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            <p className="mt-2">{description}</p>
            {keyConcerns && (
              <p className="mt-3"><strong>Key Concerns:</strong> {keyConcerns}</p>
            )}
            {messagingStrategy && (
              <p className="mt-3"><strong>Messaging Strategy:</strong> {messagingStrategy}</p>
            )}
          </div>
        );
      })
    : "Content not available."}
</div>

  <SectionHeader icon={Target} title="Polkadot's Messaging Strategy" />
  <p className="text-gray-700 leading-relaxed">{content["messaging_strategy"] || "Content not available."}</p>

  <SectionHeader icon={Star} title="Polkadot's Capability Assessment" />
  <p className="text-gray-700 leading-relaxed">{content["capability_assessment"] || "Content not available."}</p>

  <SectionHeader icon={Star} title="Polkadot's Value Proposition" />
  <p className="text-gray-700 leading-relaxed">{content["value_proposition"] || "Content not available."}</p>
</div>

      </div>
    </div>
  );
};

export default PitchAdvise;

