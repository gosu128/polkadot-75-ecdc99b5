
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SalesDropdown from '@/components/SalesDropdown';
import Footer from '@/components/Footer';
import SegmentProfile from '@/components/SegmentProfile';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, Info } from 'lucide-react';

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

  // Process URLs to make them bold and pink
  const processText = (input: string): string => {
    // URL regex pattern
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Replace URLs with marked version for later HTML replacement
    return input.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="font-bold text-polkadot-pink">$1</a>');
  };

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
        // Process both bold text and URLs
        const formattedPoint = processText(cleanedPoint.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"));
        
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
        // Process both bold text and URLs
        const formattedPoint = processText(cleanedPoint.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"));
        
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

    // Process both bold text and URLs
    const formattedText = processText(paragraph.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"));
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

const Index = () => {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [content, setContent] = useState<{ how?: string; why?: string }>({});
  const [loading, setLoading] = useState(true);

  const handleSelectSegment = (segment, industry) => {
    setSelectedSegment(segment);
    setSelectedIndustry(industry);
  };

  const handleResetSelection = () => {
    setSelectedSegment(null);
    setSelectedIndustry(null);
  };

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        // Fetch "why" content
        const { data: whyData, error: whyError } = await supabase
          .from("pitch_advise")
          .select("content")
          .eq("section", "why")
          .single();

        if (whyError) {
          console.error("Error fetching why content:", whyError);
        } else if (whyData) {
          setContent(prev => ({ ...prev, why: whyData.content }));
        }
        
        // Fetch "how" content
        const { data: howData, error: howError } = await supabase
          .from("pitch_advise")
          .select("content")
          .eq("section", "how")
          .single();

        if (howError) {
          console.error("Error fetching how content:", howError);
        } else if (howData) {
          setContent(prev => ({ ...prev, how: howData.content }));
        }
      } catch (error) {
        console.error("Error in content fetching:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="flex flex-col justify-center items-center text-center px-6 flex-grow">
        
        {/* If no segment is selected, show hero section */}
        {!selectedSegment && (
          <>
            {/* Main Hero Content */}
            <section className="w-full max-w-4xl flex flex-col items-center justify-center py-32">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold mb-12 leading-tight">
                Who do you want to <br />
                pitch <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">Polkadot</span> to?
              </h1>
              <SalesDropdown onSelectSegment={handleSelectSegment} />
            </section>

            {/* Content Sections */}
            {!loading && (
              <div className="w-full max-w-7xl mx-auto px-4">
                <div className="space-y-10 w-full">
                  <SectionHeader icon={Info} title="How to Navigate this Website" />
                  <div className="text-gray-700 leading-relaxed space-y-4 text-left">
                    {formatContent(content.how)}
                  </div>

                  <SectionHeader icon={AlertTriangle} title="Why Polkadot Must Expand Beyond Web3" />
                  <div className="text-gray-700 leading-relaxed space-y-4 text-left">
                    {formatContent(content.why, true)}
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="w-full py-20 text-center">
                <p className="text-gray-500">Loading content...</p>
              </div>
            )}
          </>
        )}

        {/* Show segment profile when a segment is selected */}
        {selectedSegment && (
          <div className="w-full py-32">
            <SegmentProfile 
              segment={selectedSegment} 
              industry={selectedIndustry} 
              onBack={handleResetSelection} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
