
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";
import Header from "./Header";

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

const PMFScores = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

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
    // Only color the text based on score, no background color
    let scoreClass = "";
    if (score >= 8) {
      scoreClass = "text-emerald-600";
    } else if (score <= 4) {
      scoreClass = "text-rose-600";
    }
    
    return `${baseClasses} ${scoreClass} ${isHovered ? "scale-105 font-bold shadow-sm rounded-md" : ""}`;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending
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

  // Column headers with sorting
  const renderSortableHeader = (field: SortField, label: string) => {
    const isCurrentSortField = sortField === field;
    const sortIcon = isCurrentSortField ? sortDirection === "asc" ? "↑" : "↓" : "";
    return <th className="py-4 px-2 text-center whitespace-nowrap cursor-pointer hover:bg-white/20 transition-colors" onClick={() => handleSort(field)}>
        <div className="flex items-center justify-center text-xs md:text-sm font-bold font-unbounded">
          <span className="writing-vertical md:writing-normal">{label}</span>
          {isCurrentSortField && <span className="ml-1">{sortIcon}</span>}
        </div>
      </th>;
  };

  return <div className="w-full bg-white min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-4 pt-32">
        <h1 className="text-4xl font-unbounded font-bold text-polkadot-pink mb-8 flex items-center my-[40px]">
          <Star className="w-8 h-8 mr-2 text-polkadot-pink" />
          Polkadot-Market-Fit™ Scoring Results
        </h1>
        
        <div className="overflow-auto rounded-xl shadow-xl">
          <table className="w-full border-collapse rounded-xl overflow-hidden text-xs md:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-polkadot-pink to-[#9B87F5] text-white">
                <th className="py-4 px-4 text-left font-bold font-unbounded whitespace-nowrap cursor-pointer hover:bg-white/20 transition-colors" onClick={() => handleSort("name")}>
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
                  <td className="py-4 px-4 text-gray-800 whitespace-nowrap font-unbounded">{segment.name}</td>
                  <td className={`py-3 px-2 text-center font-unbounded whitespace-nowrap transition-all duration-200 ${segment.pmf >= 8 ? "text-emerald-600" : segment.pmf <= 4 ? "text-rose-600" : "text-blue-600"} ${hoveredCell === `${segment.id}-pmf` ? "scale-105 shadow-sm rounded-md" : ""}`} onMouseEnter={() => setHoveredCell(`${segment.id}-pmf`)} onMouseLeave={() => setHoveredCell(null)}>
                    <div className="flex items-center justify-center gap-1">
                      <span className={`${hoveredCell === `${segment.id}-pmf` ? "scale-110" : ""} transition-transform`}>
                        {segment.pmf.toFixed(1)}
                      </span>
                      {segment.pmf >= 8 && <span className="text-xs">★</span>}
                    </div>
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
        </div>
        
        <div className="mt-8 flex justify-center">
          <a href="/" className="bg-gradient-to-r from-polkadot-pink to-[#9B87F5] text-white px-6 py-3 rounded-full font-unbounded shadow-md hover:shadow-lg transition-shadow duration-300">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>;
};

export default PMFScores;
