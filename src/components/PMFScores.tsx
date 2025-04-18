
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Segment {
  id: number;
  name: string;
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
  pmf: number;
}

type SortField = keyof Segment;

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

const PMFScores = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("pmf");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchSegments = async () => {
      const {
        data,
        error
      } = await supabase.from("segments").select("id, name, interoperability, roi, scalability, customization, awareness, tech, tam, compliance, complexity, reliability, pmf").order("name");
      if (error) {
        console.error("Error fetching PMF scores:", error);
      } else {
        setSegments(data || []);
      }
      setLoading(false);
    };
    fetchSegments();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  const getCellStyle = (score: number, id: number, metric: string) => {
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
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
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

  return <div className="w-full bg-white min-h-screen flex flex-col">
      <Header />
      <div className="max-w-6xl mx-auto p-4 pt-32 flex-grow py-[200px]">
        <h2 className="text-2xl font-bold mb-6 text-center">The Polkadot-Market-Fit Score™</h2>
        
        <div className="max-w-4xl mx-auto mb-12 text-gray-700 leading-relaxed">
          <p className="mb-4">
            The Polkadot-Market-Fit Score™ is a proprietary scoring system developed by So So Scaled! to evaluate the strategic attractiveness of different industry segments for the Polkadot ecosystem. It is based on a rigorous, data-informed framework that analyzes each sub-vertical across ten weighted criteria—including technological readiness, interoperability needs, market size, and potential return on investment. These criteria are a mix of general industry dynamics and Polkadot-specific strengths, ensuring that the score reflects both market opportunity and blockchain-platform fit.
          </p>
          <p>
            Each of the 83 segments was rated on a scale from 1 to 10 per criterion using a combination of market research, expert insights and advanced language models. 
            The final score is a weighted average of these ratings, normalized to reflect realistic market dynamics and Web3 relevance. This allows Polkadot stakeholders to prioritize where to focus business development, partnerships, and ecosystem investments for maximum impact.
          </p>
        </div>

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
                {sortedSegments.map(segment => <tr key={segment.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors font-unbounded">
                    <td className="py-3 px-4 text-gray-800 whitespace-nowrap text-xs md:text-sm">{segment.name}</td>
                    <td className={`py-2 px-2 text-center text-xs md:text-sm transition-all duration-200 font-unbounded font-bold ${hoveredCell === `${segment.id}-pmf` ? "scale-125 shadow-sm rounded-md bg-white z-10 relative text-polkadot-pink" : ""}`} onMouseEnter={() => setHoveredCell(`${segment.id}-pmf`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.pmf.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.interoperability, segment.id, "interop")} onMouseEnter={() => setHoveredCell(`${segment.id}-interop`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.interoperability.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.roi, segment.id, "roi")} onMouseEnter={() => setHoveredCell(`${segment.id}-roi`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.roi.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.scalability, segment.id, "scalability")} onMouseEnter={() => setHoveredCell(`${segment.id}-scalability`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.scalability.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.customization, segment.id, "customization")} onMouseEnter={() => setHoveredCell(`${segment.id}-customization`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.customization.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.awareness, segment.id, "awareness")} onMouseEnter={() => setHoveredCell(`${segment.id}-awareness`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.awareness.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.tech, segment.id, "tech")} onMouseEnter={() => setHoveredCell(`${segment.id}-tech`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.tech.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.tam, segment.id, "tam")} onMouseEnter={() => setHoveredCell(`${segment.id}-tam`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.tam.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.compliance, segment.id, "compliance")} onMouseEnter={() => setHoveredCell(`${segment.id}-compliance`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.compliance.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.complexity, segment.id, "complexity")} onMouseEnter={() => setHoveredCell(`${segment.id}-complexity`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.complexity.toFixed(1)}
                    </td>
                    <td className={getCellStyle(segment.reliability, segment.id, "reliability")} onMouseEnter={() => setHoveredCell(`${segment.id}-reliability`)} onMouseLeave={() => setHoveredCell(null)}>
                      {segment.reliability.toFixed(1)}
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </TooltipProvider>
        </div>
      </div>
      <Footer />
    </div>;
};

export default PMFScores;
