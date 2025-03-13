import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info, Lightbulb, Star, Target, Users } from "lucide-react";
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

const formatContent = (text: string) => {
  if (!text) return "Content not available.";

  return text
    .split("\n\n") // Splits text into paragraphs
    .map((paragraph, index) => {
      // Separate persona groups (identified by "###")
      if (paragraph.trim().startsWith("###")) {
        return (
          <div key={index} className="p-5 bg-gray-100 border border-gray-300 rounded-md shadow-sm space-y-2">
            <h4 className="text-lg font-semibold text-gray-900">{paragraph.replace(/^###/, "").trim()}</h4>
          </div>
        );
      }

      // Convert lines starting with "-" into bullet points
      if (paragraph.trim().startsWith("-")) {
        return (
          <ul key={index} className="list-disc pl-5 space-y-2">
            {paragraph
              .split("\n") // Split into individual bullet points
              .map((point, idx) => (
                <li key={idx} className="text-gray-700">{point.replace(/^-/, "").trim()}</li>
              ))}
          </ul>
        );
      }

      // Highlight section headers like "Who They Are:"
      const formattedText = paragraph.replace(
  /(Who They Are:|Example Companies:|Example Institutions:|Key Decision Makers:|What They Need:|Scalability:|Security:|Interoperability:|Cost Efficiency:|Adoption:|Developer Experience:|Governance:|Enterprise Readiness:)/g,
  "<strong class='text-polkadot-pink'>$1</strong>"
);

      return <p key={index} dangerouslySetInnerHTML={{ __html: formattedText }} />;
    });
};


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
        <div className="space-y-10 max-w-4xl">
          <SectionHeader icon={Info} title="Introduction" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["introduction"])}</div>

          <SectionHeader icon={AlertTriangle} title="Things to Keep in Mind during B2B Pitches" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["b2b_pitches"])}</div>

          <SectionHeader icon={Lightbulb} title="Important B2B Use Cases" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["use_cases"])}</div>

          <SectionHeader icon={Users} title="Important B2B Personas" />
          <div className="text-gray-700 leading-relaxed space-y-6">{formatContent(content["personas"])}</div>

          <SectionHeader icon={Target} title="Polkadot's Messaging Strategy" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["messaging_strategy"])}</div>

          <SectionHeader icon={Star} title="Polkadot's Capability Assessment" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["capability_assessment"])}</div>

          <SectionHeader icon={Star} title="Polkadot's Value Proposition" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content["value_proposition"])}</div>
        </div>
      </div>
    </div>
  );
};

export default PitchAdvise;

