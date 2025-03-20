import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SalesDropdown from '@/components/SalesDropdown';
import SegmentProfile from '@/components/SegmentProfile';
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Industry {
  id: number;
  name: string;
}

interface Segment {
  id: number;
  name: string;
  industry_id: number;
  abstract: string | null;
  definition: string | null;
  trends: string | null;
  regions: string | null;
  challenges: string | null;
  usecases_general: string | null;
  usecases_web3: string | null;
  personas_1: string | null;
  personas_2: string | null;
  personas_3: string | null;
  positioning_statement: string | null;
  ca_interoperability: string | null;
  ca_resiliance: string | null;
  ca_scalability: string | null;
  ca_customization: string | null;
  messaging: string | null;
  value_prop: string | null;
  proof_points: string | null;
  pmf: number | null;
  interoperability: number;
  roi: number;
  scalability: number;
  customization: number;
  awareness: number;
  tech: number;
  tam: number;
  compliance: number;
  complexity: number;
  reliability: number;
}

const columnTooltips = {
  pmf: "Polkadot-Market-Fit Score",
  interoperability: "Interoperability Score",
  roi: "Return-On-Investment Score",
  scalability: "Scalability Score",
  customization: "Customisation Score",
  awareness: "Web3 Awareness Score",
  tech: "Technological Readiness Score",
  tam: "Total Addressable Market Size Score",
  compliance: "Compliance & Regulatory Score",
  complexity: "Operational Complexity Score",
  reliability: "Reliability Score"
};

type SortField = keyof Segment;

const Segments = () => {
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("pmf");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchSegments = async () => {
      const { data, error } = await supabase
        .from("segments")
        .select(`
          id, name, industry_id, abstract, definition, trends, regions, challenges, 
          usecases_general, usecases_web3, personas_1, personas_2, personas_3, 
          positioning_statement, ca_interoperability, ca_resiliance, ca_scalability, 
          ca_customization, messaging, value_prop, proof_points,
          interoperability, roi, scalability, customization, awareness, tech, tam, 
          compliance, complexity, reliability, pmf
        `)
        .order("name");
      
      if (error) {
        console.error("Error fetching segments:", error);
      } else {
        setSegments(data || []);
      }
      setLoading(false);
    };
    fetchSegments();
  }, []);

  const handleSegmentSelect = (segment: Segment, industry: Industry) => {
    setSelectedSegment(segment);
    setSelectedIndustry(industry);
  };

  const getCellStyle = (score: number | null | undefined, id: number, metric: string) => {
    if (score === null || score === undefined) return "py-2 px-2 text-center text-xs md:text-sm transition-all duration-200 font-unbounded";
    
    const isHovered = hoveredCell === `${id}-${metric}`;
    const baseClasses = "py-2 px-2 text-center text-xs md:text-sm transition-all duration-200 font-unbounded";
    let scoreClass = "";
    
    if (score >= 8) {
      scoreClass = "text-emerald-600";
    } else if (score <= 4) {
      scoreClass = "text-rose-600";
    }

    return `${baseClasses} ${scoreClass} ${isHovered ? "scale-125 font-bold shadow-sm rounded-md bg-white z-10 relative text-polkadot-pink" : ""}`;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedSegments = [...segments].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      const aValue = a[sortField] || 0;
      const bValue = b[sortField] || 0;
      return sortDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    }
  });

  const renderSortableHeader = (field: SortField, label: string) => {
    const isCurrentSortField = sortField === field;
    const sortIcon = isCurrentSortField ? sortDirection === "asc" ? "↑" : "↓" : "";
    return <th className="py-3 px-2 text-center text-xs md:text-sm whitespace-nowrap cursor-pointer hover:bg-white/20 transition-colors" onClick={() => handleSort(field)}>
        <div className="flex items-center justify-center font-bold font-unbounded">
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{label}</span>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black/80 text-white px-3 py-2 text-xs rounded-md">
              {columnTooltips[field] || label}
            </TooltipContent>
          </Tooltip>
          {isCurrentSortField && <span className="ml-1">{sortIcon}</span>}
        </div>
      </th>;
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-unbounded font-bold mb-12 leading-tight text-center">
          Who do you want to <br />
          pitch <span className="bg-clip-text text-transparent bg-gradient-to-r from-polkadot-pink via-[#9B87F5] to-[#7E69AB]">Polkadot</span> to?
        </h1>
        
        <div className="mx-auto max-w-5xl">
          <SalesDropdown onSelectSegment={handleSegmentSelect} />

          {selectedSegment && selectedIndustry && (
            <div className="mt-8">
              <SegmentProfile 
                segment={selectedSegment} 
                industry={selectedIndustry} 
                onBack={() => setSelectedSegment(null)} 
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto p-4 py-8">
          <h2 className="text-2xl font-bold mb-12 text-center">Polkadot-Market-Fit Score</h2>

          <div className="overflow-auto rounded-xl shadow-xl">
            <TooltipProvider>
              <table className="w-full border-collapse rounded-xl overflow-hidden text-xs md:text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-polkadot-pink to-[#9B87F5] text-white">
                    <th className="py-3 px-4 text-left text-xs md:text-sm font-bold font-unbounded whitespace-nowrap cursor-pointer hover:bg-white/20 transition-colors" onClick={() => handleSort("name")}>
                      <div className="flex items-center">
                        <span>Segment</span>
                        {sortField === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                      </div>
                    </th>
                    {renderSortableHeader("pmf", "PMF")}
                    {renderSortableHeader("interoperability", "INT")}
                    {renderSortableHeader("roi", "ROI")}
                    {renderSortableHeader("scalability", "SCA")}
                    {renderSortableHeader("customization", "CUS")}
                    {renderSortableHeader("awareness", "AWA")}
                    {renderSortableHeader("tech", "TEC")}
                    {renderSortableHeader("tam", "TAM")}
                    {renderSortableHeader("compliance", "CPL")}
                    {renderSortableHeader("complexity", "CPX")}
                    {renderSortableHeader("reliability", "REL")}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={12} className="py-4 text-center">Loading...</td>
                    </tr>
                  ) : (
                    sortedSegments.map(segment => (
                      <tr key={segment.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors font-unbounded">
                        <td className="py-3 px-4 text-gray-800 whitespace-nowrap text-xs md:text-sm">{segment.name}</td>
                        <td className={`py-2 px-2 text-center text-xs md:text-sm transition-all duration-200 font-unbounded text-polkadot-pink ${hoveredCell === `${segment.id}-pmf` ? "scale-125 font-bold shadow-sm rounded-md bg-white z-10 relative" : ""}`} onMouseEnter={() => setHoveredCell(`${segment.id}-pmf`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.pmf?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.interoperability, segment.id, "interop")} onMouseEnter={() => setHoveredCell(`${segment.id}-interop`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.interoperability?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.roi, segment.id, "roi")} onMouseEnter={() => setHoveredCell(`${segment.id}-roi`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.roi?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.scalability, segment.id, "scalability")} onMouseEnter={() => setHoveredCell(`${segment.id}-scalability`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.scalability?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.customization, segment.id, "customization")} onMouseEnter={() => setHoveredCell(`${segment.id}-customization`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.customization?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.awareness, segment.id, "awareness")} onMouseEnter={() => setHoveredCell(`${segment.id}-awareness`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.awareness?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.tech, segment.id, "tech")} onMouseEnter={() => setHoveredCell(`${segment.id}-tech`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.tech?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.tam, segment.id, "tam")} onMouseEnter={() => setHoveredCell(`${segment.id}-tam`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.tam?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.compliance, segment.id, "compliance")} onMouseEnter={() => setHoveredCell(`${segment.id}-compliance`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.compliance?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.complexity, segment.id, "complexity")} onMouseEnter={() => setHoveredCell(`${segment.id}-complexity`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.complexity?.toFixed(1) || "N/A"}
                        </td>
                        <td className={getCellStyle(segment.reliability, segment.id, "reliability")} onMouseEnter={() => setHoveredCell(`${segment.id}-reliability`)} onMouseLeave={() => setHoveredCell(null)}>
                          {segment.reliability?.toFixed(1) || "N/A"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="py-20"></div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Segments;
