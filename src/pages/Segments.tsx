
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SegmentProfile from "@/components/SegmentProfile";

interface Segment {
  id: number;
  name: string;
  pmf: number;
  tam: number;
  adoption: number;
  category: string;
  subcategory: string;
  value_proposition: string;
  use_cases?: string | null;  // Make these optional with nullable types
  scores?: any | null;        // Make these optional with nullable types
}

const Segments = () => {
  const [segments, setSegments] = useState<Segment[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const { data, error } = await supabase
          .from("segments")
          .select("*")
          .order("name");

        if (error) {
          throw error;
        }

        if (data) {
          setSegments(data as Segment[]);

          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(data.map((segment: Segment) => segment.category))
          ).sort();
          setCategories(uniqueCategories);

          if (uniqueCategories.length > 0) {
            setSelectedCategory(uniqueCategories[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching segments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSegments();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      // Extract subcategories for the selected category
      const categorySegments = segments.filter(
        (segment) => segment.category === selectedCategory
      );
      const uniqueSubcategories = Array.from(
        new Set(categorySegments.map((segment) => segment.subcategory))
      ).sort();
      setSubcategories(uniqueSubcategories);

      if (uniqueSubcategories.length > 0) {
        setSelectedSubcategory(uniqueSubcategories[0]);
      } else {
        setSelectedSubcategory("");
      }
    }
  }, [selectedCategory, segments]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSegment(null);
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
    setSelectedSegment(null);
  };

  const handleSegmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const segmentId = parseInt(e.target.value);
    const segment = segments.find((s) => s.id === segmentId) || null;
    setSelectedSegment(segment);
  };

  // Filter segments for the dropdown
  const filteredSegments = segments.filter(
    (segment) =>
      segment.category === selectedCategory &&
      segment.subcategory === selectedSubcategory
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <h1 className="text-3xl font-bold mb-12 text-center">Segments</h1>

        {/* Segment Profiles Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Who do you want to pitch Polkadot to?
          </h2>

          {loading ? (
            <div className="text-center">Loading segments...</div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {subcategories.length > 0 && (
                  <div>
                    <label
                      htmlFor="subcategory"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subcategory
                    </label>
                    <select
                      id="subcategory"
                      value={selectedSubcategory}
                      onChange={handleSubcategoryChange}
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                      {subcategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {filteredSegments.length > 0 && (
                  <div>
                    <label
                      htmlFor="segment"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Segment
                    </label>
                    <select
                      id="segment"
                      value={selectedSegment?.id || ""}
                      onChange={handleSegmentChange}
                      className="block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select a segment</option>
                      {filteredSegments.map((segment) => (
                        <option key={segment.id} value={segment.id}>
                          {segment.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {selectedSegment && <SegmentProfile segment={selectedSegment} />}
            </div>
          )}
        </div>

        {/* Segment Ratings Table */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Segment Ratings
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border text-left">Category</th>
                  <th className="py-2 px-4 border text-left">Subcategory</th>
                  <th className="py-2 px-4 border text-left">Segment</th>
                  <th className="py-2 px-4 border text-center text-polkadot-pink">PMF</th>
                  <th className="py-2 px-4 border text-center">TAM</th>
                  <th className="py-2 px-4 border text-center">Adoption</th>
                </tr>
              </thead>
              <tbody>
                {segments.map((segment) => (
                  <tr key={segment.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{segment.category}</td>
                    <td className="py-2 px-4 border">{segment.subcategory}</td>
                    <td className="py-2 px-4 border">{segment.name}</td>
                    <td className="py-2 px-4 border text-center text-polkadot-pink font-medium">
                      {segment.pmf}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {segment.tam}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {segment.adoption}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Segments;
