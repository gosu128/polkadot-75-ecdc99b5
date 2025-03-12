
import React from 'react';
import { AlertTriangle, BookText, Globe, Info, Lightbulb, Star, Target, Users } from 'lucide-react';
import Header from '@/components/Header';

const SectionHeader = ({
  icon: Icon,
  title
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="mt-6 mb-2">
    <h2 className="text-polkadot-pink font-unbounded flex items-center text-xl font-semibold">
      <Icon className="mr-2 text-polkadot-pink w-6 h-6" />
      {title}
    </h2>
    <hr className="border-polkadot-pink my-2" />
  </div>
);

const SubsectionHeader = ({
  icon: Icon,
  title
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <h3 className="text-black font-semibold flex items-center mb-1 mt-3 text-lg my-[25px] mx-0">
    <Icon className="mr-2 text-gray-700 w-5 h-5" />
    {title}
  </h3>
);

const PlaceholderContent = () => (
  <div className="p-6 bg-gradient-to-r from-[#9B87F5]/10 via-[#E6007A]/5 to-[#9B87F5]/10 border border-[#9B87F5]/20 rounded-xl shadow-md">
    <p className="text-gray-700 italic">This section will be filled with content soon.</p>
  </div>
);

const PitchAdvise = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="flex flex-col min-h-screen text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 my-[60px]">Pitch Advise for BD Agents</h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          <SectionHeader icon={Info} title="Introduction" />
          <PlaceholderContent />

          <SectionHeader icon={AlertTriangle} title="Things to Keep in Mind during B2B Pitches" />
          <PlaceholderContent />

          <SectionHeader icon={Lightbulb} title="Important B2B Use Cases" />
          <PlaceholderContent />

          <SectionHeader icon={Users} title="Important B2B Personas" />
          <PlaceholderContent />

          <SectionHeader icon={Target} title="Polkadot's Messaging Strategy" />
          <PlaceholderContent />

          <SectionHeader icon={Star} title="Polkadot's Capability Assessment" />
          <PlaceholderContent />

          <SectionHeader icon={Star} title="Polkadot's Value Proposition" />
          <PlaceholderContent />
        </div>
      </div>
    </div>
  );
};

export default PitchAdvise;
