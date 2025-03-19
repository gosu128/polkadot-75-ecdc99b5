
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="mt-12 mb-2">
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

  let inNumberedList = false;
  let inBulletList = false;
  let listItems: JSX.Element[] = [];
  let listCounter = 1;

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim().startsWith("###")) {
      if (inNumberedList || inBulletList) {
        if (inNumberedList) {
          formattedContent.push(<ol key={`list-${index}`} className="list-decimal pl-6 space-y-3 my-4">{listItems}</ol>);
        } else {
          formattedContent.push(<ul key={`list-${index}`} className="list-disc pl-6 space-y-3 my-4">{listItems}</ul>);
        }
        inNumberedList = false;
        inBulletList = false;
        listItems = [];
        listCounter = 1;
      }
      
      formattedContent.push(
        <h4 key={`heading-${index}`} className="text-xl font-bold text-polkadot-pink mt-6 mb-6">
          {paragraph.replace(/^###/, "").trim()}
        </h4>
      );
      return;
    }

    const lines = paragraph.split("\n");
    
    const isBulletList = lines.every(line => line.trim().startsWith("-"));
    const isNumberedList = lines.every(line => /^\d+\./.test(line.trim()));

    if (isBulletList) {
      if (inNumberedList) {
        formattedContent.push(<ol key={`num-list-${index}`} className="list-decimal pl-6 space-y-3 my-4">{listItems}</ol>);
        listItems = [];
        inNumberedList = false;
      }

      inBulletList = true;
      
      lines.forEach((line, lineIdx) => {
        const cleanedPoint = line.replace(/^-/, "").trim();
        const formattedPoint = cleanedPoint.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
        
        listItems.push(
          <li key={`bullet-${index}-${lineIdx}`} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: formattedPoint }} />
        );
      });
      
      return;
    }
    
    if (isNumberedList) {
      if (inBulletList) {
        formattedContent.push(<ul key={`bullet-list-${index}`} className="list-disc pl-6 space-y-3 my-4">{listItems}</ul>);
        listItems = [];
        inBulletList = false;
      }

      inNumberedList = true;
      
      lines.forEach((line, lineIdx) => {
        const cleanedPoint = line.replace(/^\d+\./, "").trim();
        const formattedPoint = cleanedPoint.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
        
        listItems.push(
          <li key={`num-${index}-${lineIdx}`} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: formattedPoint }} />
        );
      });
      
      return;
    }

    if (inBulletList) {
      formattedContent.push(<ul key={`bullet-list-end-${index}`} className="list-disc pl-6 space-y-3 my-4">{listItems}</ul>);
      inBulletList = false;
      listItems = [];
    }
    
    if (inNumberedList) {
      formattedContent.push(<ol key={`num-list-end-${index}`} className="list-decimal pl-6 space-y-3 my-4">{listItems}</ol>);
      inNumberedList = false;
      listItems = [];
      listCounter = 1;
    }

    const formattedText = paragraph.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
    formattedContent.push(<p key={`text-${index}`} dangerouslySetInnerHTML={{ __html: formattedText }} />);

    if (insertImage && index === 0) {
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
  });

  if (inBulletList && listItems.length > 0) {
    formattedContent.push(<ul key="final-bullet-list" className="list-disc pl-6 space-y-3 my-4">{listItems}</ul>);
  }
  
  if (inNumberedList && listItems.length > 0) {
    formattedContent.push(<ol key="final-num-list" className="list-decimal pl-6 space-y-3 my-4">{listItems}</ol>);
  }

  return formattedContent.length > 0 ? formattedContent : <p className="italic text-gray-500">Content coming soon...</p>;
};

const PitchAdvise = () => {
  const [content, setContent] = useState<{ how?: string; why?: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from("pitch_advise").select("content, section").eq("section", "why").single();

      if (error) {
        console.error("Error fetching content:", error);
      } else if (data) {
        setContent({ why: data.content });
        
        // Fetch "how" content
        const howResult = await supabase.from("pitch_advise").select("content").eq("section", "how").single();
        if (!howResult.error && howResult.data) {
          setContent(prev => ({ ...prev, how: howResult.data.content }));
        }
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
      
      <div className="flex items-center justify-center min-h-screen px-4 flex-grow">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold leading-tight text-center">
          Welcome to the
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">
            Polkadot Sales Hub
          </span>
        </h1>
      </div>
      
      <div className="flex flex-col text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="space-y-10 max-w-4xl">
          <SectionHeader icon={Info} title="How to Navigate this Website" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content.how)}</div>

          <SectionHeader icon={AlertTriangle} title="Why Polkadot Must Expand Beyond Web3" />
          <div className="text-gray-700 leading-relaxed space-y-4">{formatContent(content.why, true)}</div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PitchAdvise;
