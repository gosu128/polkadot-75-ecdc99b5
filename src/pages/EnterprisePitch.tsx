
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from "@/lib/utils";

// Define the navigation view state and sections
const EnterprisePitch = () => {
  const [navView, setNavView] = useState<'horizontal' | 'vertical'>('horizontal');
  const [activeSection, setActiveSection] = useState<string>('');
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});
  const [content, setContent] = useState<{ [key: number]: string | null }>({});
  const [loading, setLoading] = useState(true);

  // Define navigation items structure
  const navItems = [
    {
      id: 'section-1',
      title: '1. Introduction',
      subsections: [
        { id: 'section-1-1', title: '1.1. Target Audience' },
        { id: 'section-1-2', title: '1.2. Key Value Props' },
      ]
    },
    {
      id: 'section-2',
      title: '2. General Pitch',
      subsections: [
        { id: 'section-2-1', title: '2.1. Problem' },
        { id: 'section-2-2', title: '2.2. Solution' },
        { id: 'section-2-3', title: '2.3. Technology' },
        { id: 'section-2-4', title: '2.4. Ecosystem' },
        { id: 'section-2-5', title: '2.5. Network vs Cloud' },
        { id: 'section-2-6', title: '2.6. Competitive Landscape' },
        { id: 'section-2-7', title: '2.7. Proof Points' },
      ]
    },
    {
      id: 'section-3',
      title: '3. Enterprise Ready',
      subsections: [
        { id: 'section-3-1', title: '3.1. Security' },
        { id: 'section-3-2', title: '3.2. Compliance' },
        { id: 'section-3-3', title: '3.3. SLAs' },
      ]
    },
  ];

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 180;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Set up intersection observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-180px 0px -40% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Fetch content from Supabase
  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch from enterprise_pitch table
        const { data, error } = await supabase
          .from('pitch_advise')
          .select('id, content');
        
        if (error) throw error;
        
        if (data) {
          const mappedContent: {
            [key: number]: string | null;
          } = {};
          
          data.forEach((row) => {
            mappedContent[row.id] = row.content;
          });
          
          setContent(mappedContent);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  // Horizontal navigation (tabs at the top)
  const renderHorizontalNav = () => (
    <div className="w-full mb-8 border-b border-gray-200 sticky top-20 pt-4 pb-1 bg-white/90 backdrop-blur-sm z-10">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Page Navigation</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setNavView('vertical')} 
            className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Sidebar View
          </button>
        </div>
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 min-w-max">
          {navItems.map((section) => (
            <div key={section.id} className="flex items-center gap-2">
              <button 
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "whitespace-nowrap text-sm font-medium hover:text-polkadot-pink transition-colors",
                  activeSection === section.id ? "text-polkadot-pink" : "text-gray-700"
                )}
              >
                {section.title}
              </button>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <div className="flex gap-3">
                {section.subsections.map((subsection, idx) => (
                  <React.Fragment key={subsection.id}>
                    <button
                      onClick={() => scrollToSection(subsection.id)}
                      className={cn(
                        "text-xs whitespace-nowrap hover:text-polkadot-pink transition-colors",
                        activeSection === subsection.id ? "text-polkadot-pink font-medium" : "text-gray-600"
                      )}
                    >
                      {subsection.title}
                    </button>
                    {idx < section.subsections.length - 1 && (
                      <span className="text-gray-300">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Vertical navigation (sidebar)
  const renderVerticalNav = () => (
    <div className="sticky top-20 mb-8 p-4 max-h-[80vh] overflow-auto border rounded-lg bg-white/90 backdrop-blur-sm z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Page Navigation</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setNavView('horizontal')} 
            className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Top View
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {navItems.map((section) => (
          <div key={section.id} className="flex flex-col">
            <button 
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "text-left text-sm font-medium hover:text-polkadot-pink transition-colors mb-2",
                activeSection === section.id ? "text-polkadot-pink" : "text-gray-700"
              )}
            >
              {section.title}
            </button>
            <div className="flex flex-col pl-4 border-l border-gray-200 gap-2">
              {section.subsections.map((subsection) => (
                <button
                  key={subsection.id}
                  onClick={() => scrollToSection(subsection.id)}
                  className={cn(
                    "text-left text-xs hover:text-polkadot-pink transition-colors",
                    activeSection === subsection.id ? "text-polkadot-pink font-medium" : "text-gray-600"
                  )}
                >
                  {subsection.title}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        {navView === 'horizontal' ? renderHorizontalNav() : renderVerticalNav()}
        
        <div className="enterprise-pitch">
          {/* Introduction Section */}
          <section 
            ref={el => sectionRefs.current['section-1'] = el} 
            id="section-1" 
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-polkadot-pink mb-4">1. Introduction</h2>
            <hr className="border-t-2 border-gray-300 mb-6" />
            
            {/* Target Audience Subsection */}
            <div 
              ref={el => sectionRefs.current['section-1-1'] = el} 
              id="section-1-1" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">1.1. Target Audience</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[1]}</p>
              </div>
            </div>
            
            {/* Key Value Props Subsection */}
            <div 
              ref={el => sectionRefs.current['section-1-2'] = el} 
              id="section-1-2" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">1.2. Key Value Props</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[2]}</p>
              </div>
            </div>
          </section>
          
          {/* General Pitch Section */}
          <section 
            ref={el => sectionRefs.current['section-2'] = el} 
            id="section-2" 
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-polkadot-pink mb-4">2. General Pitch</h2>
            <hr className="border-t-2 border-gray-300 mb-6" />
            
            {/* Problem Subsection */}
            <div 
              ref={el => sectionRefs.current['section-2-1'] = el} 
              id="section-2-1" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">2.1. Problem</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[3]}</p>
              </div>
            </div>
            
            {/* Solution Subsection */}
            <div 
              ref={el => sectionRefs.current['section-2-2'] = el} 
              id="section-2-2" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">2.2. Solution</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[4]}</p>
              </div>
            </div>
            
            {/* Technology Subsection */}
            <div 
              ref={el => sectionRefs.current['section-2-3'] = el} 
              id="section-2-3" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">2.3. Technology</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[5]}</p>
              </div>
            </div>
            
            {/* Ecosystem Subsection */}
            <div 
              ref={el => sectionRefs.current['section-2-4'] = el} 
              id="section-2-4" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">2.4. Ecosystem</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[6]}</p>
              </div>
            </div>
            
            {/* Network vs Cloud Subsection */}
            <div 
              ref={el => sectionRefs.current['section-2-5'] = el} 
              id="section-2-5" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">2.5. Network vs Cloud</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[7]}</p>
              </div>
            </div>
            
            {/* Competitive Landscape Subsection */}
            <div 
              ref={el => sectionRefs.current['section-2-6'] = el} 
              id="section-2-6" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">2.6. Competitive Landscape</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[8]}</p>
              </div>
            </div>
            
            {/* Proof Points Subsection */}
            <div 
              ref={el => sectionRefs.current['section-2-7'] = el} 
              id="section-2-7" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">2.7. Proof Points</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[10]}</p>
              </div>
            </div>
          </section>
          
          {/* Enterprise Ready Section */}
          <section 
            ref={el => sectionRefs.current['section-3'] = el} 
            id="section-3" 
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-polkadot-pink mb-4">3. Enterprise Ready</h2>
            <hr className="border-t-2 border-gray-300 mb-6" />
            
            {/* Security Subsection */}
            <div 
              ref={el => sectionRefs.current['section-3-1'] = el} 
              id="section-3-1" 
              className="mb-8"
            >
              <h3 className="text-xl font-semibold mb-4">3.1. Security</h3>
              <div className="prose max-w-none">
                <p className="mb-4">{loading ? "Loading..." : content[9]}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePitch;
