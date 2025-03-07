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

const PMFScores = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  useEffect(() => {
    const fetchSegments = async () => {
      const { data, error } = await supabase
        .from("segments")
        .select("id, name, interoperability, roi, scalability, customization, awareness, tech, tam, compliance, complexity, reliability, pmf")
        .order("name");

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
    const isHovered = hoveredCell === ${id}-${metric};
    const baseClasses = "py-3 px-2 text-center transition-all duration-200";
    
    // Score-based coloring (subtle)
    let scoreClass = "";
    if (score >= 8) {
      scoreClass = "text-emerald-700";
    } else if (score <= 4) {
      scoreClass = "text-rose-700";
    }
    
    return ${baseClasses} ${scoreClass} ${isHovered ? "bg-gray-100 scale-105 font-bold" : ""};
  };

  return (
    <div className="w-full bg-white min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-6 pt-32">
        <h1 className="text-4xl font-unbounded font-bold text-polkadot-pink mb-8 flex items-center">
          <Star className="w-8 h-8 mr-2 text-polkadot-pink" />
          PMF Scores Overview
        </h1>
        
        <div className="overflow-auto rounded-xl shadow-xl">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-polkadot-pink to-[#9B87F5] text-white">
                <th className="py-4 px-4 text-left font-medium whitespace-nowrap">Segment</th>
                <th className="py-4 px-4 text-center font-bold whitespace-nowrap">PMF Score</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Interop.</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">ROI</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Scalability</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Custom.</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Awareness</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Tech</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">TAM</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Compliance</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Complexity</th>
                <th className="py-4 px-2 text-center whitespace-nowrap">Reliability</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((segment) => (
                <tr key={segment.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-gray-800 whitespace-nowrap">{segment.name}</td>
                  <td 
                    className={py-3 px-4 text-center font-bold whitespace-nowrap ${
                      segment.pmf >= 8 ? "text-emerald-600" : 
                      segment.pmf <= 4 ? "text-rose-600" : "text-blue-600"
                    }}
                    onMouseEnter={() => setHoveredCell(${segment.id}-pmf)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span className={${hoveredCell === ${segment.id}-pmf ? "scale-110" : ""} transition-transform}>
                        {segment.pmf.toFixed(1)}
                      </span>
                      {segment.pmf >= 8 && <span className="text-xs">★</span>}
                    </div>
                  </td>
                  <td 
                    className={getCellStyle(segment.interoperability, segment.id, "interop")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-interop)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.interoperability.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.roi, segment.id, "roi")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-roi)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.roi.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.scalability, segment.id, "scalability")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-scalability)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.scalability.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.customization, segment.id, "customization")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-customization)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.customization.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.awareness, segment.id, "awareness")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-awareness)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.awareness.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.tech, segment.id, "tech")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-tech)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.tech.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.tam, segment.id, "tam")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-tam)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.tam.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.compliance, segment.id, "compliance")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-compliance)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.compliance.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.complexity, segment.id, "complexity")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-complexity)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.complexity.toFixed(1)}
                  </td>
                  <td 
                    className={getCellStyle(segment.reliability, segment.id, "reliability")}
                    onMouseEnter={() => setHoveredCell(${segment.id}-reliability)}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {segment.reliability.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 flex justify-center">
          <a 
            href="/" 
            className="bg-gradient-to-r from-polkadot-pink to-[#9B87F5] text-white px-6 py-3 rounded-full font-unbounded shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PMFScores;
