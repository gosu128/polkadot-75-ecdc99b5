import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info } from "lucide-react";
import Header from "@/components/Header";

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

  const paragraphs = text.split("\n\n");
  const formattedContent: JSX.Element[] = [];

  paragraphs.forEach((paragraph, index) => {
    if (paragraph.trim().startsWith("###")) {
      formattedContent.push(
        <h4 key={`heading-${index}`} className="text-xl font-bold text-polkadot-pink mt-6 mb-6">
          {paragraph.replace(/^###/, "").trim()}
        </h4>
      );
      return;
    }

    if (paragraph.trim().startsWith("-")) {
      const bulletPoints = paragraph.split("\n").map((point, idx) => {
        const cleanedPoint = point.replace(/^-/, "").trim();
        const formattedPoint = cleanedPoint.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");

        return <li key={`bullet-${index}-${idx}`} className="text-gray-700" dangerouslySetInnerHTML={{ __html: formattedPoint }} />;
      });

      formattedContent.push(<ul key={`list-${index}`} className="list-disc pl-5 space-y-2">{bulletPoints}</ul>);
      return;
    }

    const formattedText = paragraph.replace(/\*([^*]+)\*/g, "<strong>$1</strong>");
    formattedContent.push(<p key={`text-${index}`} dangerouslySetInnerHTML={{ __html: formattedText }} />);

    // Insert image after the first paragraph of the "why" section
    if (insertImage && index === 0) {
      formattedContent.push(
        <div key="why-image" className="flex justify-center mt-6">
          <img
            src="https://qhxgyizmewdtvwebpmie.supabase.co/storage/v1/object/public/docs//audiences.png"
            alt="Pol


