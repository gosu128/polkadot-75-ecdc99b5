import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY');

const SegmentProfile = ({ segment, onBack }) => {
  const [scores, setScores] = useState(null);

  useEffect(() => {
    if (segment) {
      fetchSegmentScores(segment.id);
    }
  }, [segment]);

  const fetchSegmentScores = async (segmentId) => {
    const { data, error } = await supabase
      .from('segments_score')
      .select('*')
      .eq('segment_id', segmentId)
      .single();

    if (error) {
      console.error('Error fetching segment scores:', error);
    } else {
      setScores(data);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-8 py-24 flex-grow"> 
        <h2 className="text-4xl font-unbounded font-bold text-gray-900 mt-1">{segment.name}</h2>

        {/* NEW SCORE SECTION */}
        {scores && (
          <div className="mt-12">
            <h3 className="text-2xl font-unbounded text-gray-900 flex items-center mb-4">
              Segment Scores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
              <div><strong>Polkadot-Market-Fit:</strong> {scores["Polkadot-Market-Fit Score"]}</div>
              <div><strong>ROI:</strong> {scores["ROI Score"]}</div>
              <div><strong>Scalability:</strong> {scores["Scalability Score"]}</div>
              <div><strong>Customization:</strong> {scores["Customization Score"]}</div>
              <div><strong>Awareness:</strong> {scores["Awareness Score"]}</div>
              <div><strong>Tech:</strong> {scores["Tech Score"]}</div>
              <div><strong>TAM:</strong> {scores["TAM Score"]}</div>
              <div><strong>Compliance:</strong> {scores["Compliance Score"]}</div>
              <div><strong>Interoperability:</strong> {scores["Interoperability Score"]}</div>
              <div><strong>Reliability:</strong> {scores["Reliability Score"]}</div>
              <div><strong>Complexity:</strong> {scores["Complexity Score"]}</div>
            </div>
          </div>
        )}

        <button 
          onClick={onBack} 
          className="mt-6 px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition">
          ← Back
        </button>
      </div>
    </div>
  );
};

export default SegmentProfile;

