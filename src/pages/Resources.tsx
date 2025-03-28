import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';

const ResourcesPage = () => {
  const [content, setContent] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatContent = (text: string) => {
    if (!text) return <p>Content not available.</p>;
    
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Check if this is a heading (starts with ###)
      if (paragraph.trim().startsWith('###')) {
        return (
          <h3 key={index} className="text-xl font-bold text-polkadot-pink my-4">
            {paragraph.replace(/^###/, '').trim()}
          </h3>
        );
      }
      
      // Check if this is a link
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const hasLinks = linkRegex.test(paragraph);
      
      if (hasLinks) {
        const formattedText = paragraph.replace(linkRegex, '<a href="$2" class="text-polkadot-pink hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
        return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: formattedText }} />;
      }
      
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch from pitch_advise table
        const { data, error } = await supabase
          .from('pitch_advise')
          .select('section, content');
        
        if (error) throw error;
        
        if (data) {
          const mappedContent: {[key: string]: string} = {};
          data.forEach(item => {
            mappedContent[item.section] = item.content;
          });
          setContent(mappedContent);
        }
      } catch (err) {
        setError("Failed to load content. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-white">
        <div className="container mx-auto p-4 pt-16 max-w-5xl">
          <h1 className="text-3xl font-unbounded text-polkadot-pink mb-8">Resources</h1>

          {loading ? (
            <>
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
            </>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-6">
              {Object.entries(content).map(([section, text]) => (
                <div key={section}>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">{section.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}</h2>
                  <div className="text-gray-700 leading-relaxed">
                    {formatContent(text)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResourcesPage;
