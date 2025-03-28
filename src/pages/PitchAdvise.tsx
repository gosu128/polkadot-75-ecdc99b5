
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SectionHeader = ({
  icon: Icon,
  title
}: {
  icon: React.ElementType;
  title: string;
}) => <div className="mt-12 mb-4">
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>;

const formatContent = (text: string | undefined, insertImage: boolean = false) => {
  if (!text) return <p className="italic text-gray-500">Content not available.</p>;
  const paragraphs = text.split("\n\n");
  const formattedContent: JSX.Element[] = [];
  paragraphs.forEach((paragraph, index) => {
    if (insertImage && index === 1) {
      formattedContent.push(<div key="why-image" className="flex justify-center mt-6">
          <img src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs//audiences.png" alt="Polkadot Audience Expansion" className="w-full max-w-full h-auto object-fill" />
        </div>);
    }

    if (paragraph.trim().startsWith("###")) {
      formattedContent.push(<div key={`spacer-${index}`} className="mt-6"></div>);
      formattedContent.push(<p key={`heading-${index}`} className="text-xl font-bold text-polkadot-pink mt-2 mb-2 py-0 my-[20px]">
          {paragraph.replace(/^###/, "").trim()}
        </p>);
      return;
    }
    const formattedText = paragraph.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
    formattedContent.push(<p key={`text-${index}`} dangerouslySetInnerHTML={{
      __html: formattedText
    }} className="my-[15px]" />);
  });
  return formattedContent;
};

const HomePage = () => {
  const [content, setContent] = useState<{
    welcome?: string;
    how?: string;
    why?: string;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("home")
          .select("section, content");
          
        if (error) {
          console.error("Error fetching content:", error);
        } else if (data) {
          const mappedContent: {
            welcome?: string;
            how?: string;
            why?: string;
          } = {};
          
          data.forEach(item => {
            if (item.section === 'welcome') mappedContent.welcome = item.content;
            if (item.section === 'how') mappedContent.how = item.content;
            if (item.section === 'why') mappedContent.why = item.content;
          });
          
          setContent(mappedContent);
        }
      } catch (err) {
        console.error("Error in content fetching:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return <div className="w-full min-h-screen bg-white flex flex-col">
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

      {/* Content Sections with SAME WIDTH as Enterprise Pitch Page */}
      <div className="container mx-auto p-4 pt-16 max-w-5xl">
        <div className="space-y-10">
          <SectionHeader icon={BookOpen} title="Welcome to the Sales Hub" />
          <div className="text-gray-700 leading-relaxed space-y-4">
            {formatContent(content.welcome)}
          </div>

          <SectionHeader icon={Info} title="How to Navigate the Polkadot Sales Hub" />
          <div className="text-gray-700 leading-relaxed space-y-4">
            {formatContent(content.how)}
          </div>

          <SectionHeader icon={AlertTriangle} title="Why Polkadot Must Expand Beyond Web3" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content.why, true)}</div>
        </div>
        
        <div className="py-20"></div>
      </div>

      <Footer />
    </div>;
};

export default HomePage;
