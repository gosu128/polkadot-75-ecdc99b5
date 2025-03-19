import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-12 mb-4">
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

const formatContent = (text: string | undefined, insertImage: boolean = false) => {
  if (!text) return <p className="italic text-gray-500">Content not available.</p>;

  const paragraphs = text.split("\n\n");
  const formattedContent: JSX.Element[] = [];

  paragraphs.forEach((paragraph, index) => {
    // Insert image after the first paragraph of "why" section
    if (insertImage && index === 1) {
      formattedContent.push(
        <div key="why-image" className="flex justify-center mt-6">
          <img
            src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs//audiences.png"
            alt="Polkadot Audience Expansion"
            className="max-w-full h-auto"
          />
        </div>
      );
    }

    const formattedText = paragraph.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
    formattedContent.push(<p key={`text-${index}`} dangerouslySetInnerHTML={{ __html: formattedText }} />);
  });

  return formattedContent;
};

const HomePage = () => {
  const [content, setContent] = useState<{ how?: string; why?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("home").select("how, why").single();

      if (error) {
        console.error("Error fetching content:", error);
      } else if (data) {
        setContent({ how: data.how, why: data.why });
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4 flex-grow">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold leading-tight text-center">
          Welcome to the
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">
            Polkadot Sales Hub
          </span>
        </h1>
      </div>

      {/* Content Sections with Increased Width */}
      <div className="flex flex-col text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-full mx-auto">
        <div className="space-y-10">
          <SectionHeader icon={Info} title="How to Navigate this Website" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content.how)}</div>

          <SectionHeader icon={AlertTriangle} title="Why Polkadot Must Expand Beyond Web3 to Secure Its Future Growth" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content.why, true)}</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
