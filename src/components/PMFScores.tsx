import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

const PMFScores = () => {
  const [segments, setSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSegments = async () => {
      const { data, error } = await supabase
        .from("segments")
        .select("id, name, interoperability, roi, scalability, customization, awareness, tech, tam, compliance, complexity, reliability, pmf")
        .order("pmf", { ascending: false });

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

  // Find highest & lowest values for highlighting
  const allScores = segments.flatMap((s) => [
    s.interoperability, s.roi, s.scalability, s.customization, 
    s.awareness, s.tech, s.tam, s.compliance, s.complexity, s.reliability, s.pmf
  ]).filter(Number.isFinite);

  const maxScore = Math.max(...allScores);
  const minScore = Math.min(...allScores);

  const getCellStyle = (score: number) => {
    if (score === maxScore) return "bg-green-200 font-bold text-green-800";
    if (score === minScore) return "bg-red-200 font-bold text-red-800";
    return "bg-gray-50";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-unbounded font-bold text-polkadot-pink mb-6 flex items-center">
        <Star className="w-8 h-8 mr-2 text-polkadot-pink" />
        PMF Scores Overview
      </h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-polkadot-pink to-[#9B87F5] text-white">
              <th className="py-3 px-4 text-left font-medium">Segment</th>
              <th className="py-3 px-4 text-center">Interoperability</th>
              <th className="py-3 px-4 text-center">ROI</th>
              <th className="py-3 px-4 text-center">Scalability</th>
              <th className="py-3 px-4 text-center">Customization</th>
              <th className="py-3 px-4 text-center">Awareness</th>
              <th className="py-3 px-4 text-center">Tech</th>
              <th className="py-3 px-4 text-center">TAM</th>
              <th className="py-3 px-4 text-center">Compliance</th>
              <th className="py-3 px-4 text-center">Complexity</th>
              <th className="py-3 px-4 text-center">Reliability</th>
              <th className="py-3 px-4 text-center font-semibold">PMF Score</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment.id} className="border-t border-gray-300 hover:bg-gray-100 transition">
                <td className="py-3 px-4 font-semibold text-gray-800">{segment.name}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.interoperability)}`}>{segment.interoperability.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.roi)}`}>{segment.roi.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.scalability)}`}>{segment.scalability.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.customization)}`}>{segment.customization.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.awareness)}`}>{segment.awareness.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.tech)}`}>{segment.tech.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.tam)}`}>{segment.tam.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.compliance)}`}>{segment.compliance.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.complexity)}`}>{segment.complexity.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center ${getCellStyle(segment.reliability)}`}>{segment.reliability.toFixed(1)}</td>
                <td className={`py-3 px-4 text-center font-bold ${getCellStyle(segment.pmf)}`}>{segment.pmf.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="text-center mt-8">
        <a href="/" className="bg-polkadot-pink text-white px-6 py-3 rounded-full font-unbounded text-lg shadow-md hover:bg-[#9B87F5] transition">
          ← Back to Home
        </a>
      </div>
    </div>
  );
};

export default PMFScores;
