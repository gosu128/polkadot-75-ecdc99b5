
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Section component for each main section
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
      >
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {isOpen ? <ChevronUp className="text-polkadot-pink" /> : <ChevronDown className="text-polkadot-pink" />}
      </button>
      <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
};

// Subsection component for each sub-section
const Subsection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="mb-4 border border-gray-100 rounded"
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="p-4 text-gray-600">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const EnterprisePitch = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-polkadot-pink">Enterprise Pitch Guide</h1>
        
        <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
          This comprehensive guide will help you structure and deliver effective enterprise pitches for Polkadot.
        </p>
        
        {/* Section 1: Introduction */}
        <Section title="1. Introduction">
          <Subsection title="1.1. General Advise">
            <p>Placeholder text for general advice about enterprise pitches. This section will include basic guidance on how to approach enterprise clients and what to expect during the pitch process.</p>
            <ul className="list-disc ml-5 mt-3">
              <li>Placeholder for key advice point 1</li>
              <li>Placeholder for key advice point 2</li>
              <li>Placeholder for key advice point 3</li>
            </ul>
          </Subsection>
          
          <Subsection title="1.2. Do's & Don'ts">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-700 mb-2">Do's</h4>
                <ul className="list-disc ml-5 text-green-800">
                  <li>Placeholder for do's item 1</li>
                  <li>Placeholder for do's item 2</li>
                  <li>Placeholder for do's item 3</li>
                </ul>
              </div>
              <div className="bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-700 mb-2">Don'ts</h4>
                <ul className="list-disc ml-5 text-red-800">
                  <li>Placeholder for don'ts item 1</li>
                  <li>Placeholder for don'ts item 2</li>
                  <li>Placeholder for don'ts item 3</li>
                </ul>
              </div>
            </div>
          </Subsection>
        </Section>
        
        {/* Section 2: The Pitch */}
        <Section title="2. The Pitch">
          <Subsection title="2.1. Target Audiences">
            <p>Placeholder for target audiences content. This section will detail the primary enterprise segments that would benefit from Polkadot technology.</p>
            <div className="mt-3 space-y-2">
              <div className="p-3 bg-gray-50 rounded">
                <h5 className="font-semibold">Audience Segment 1</h5>
                <p>Description placeholder for audience segment 1</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h5 className="font-semibold">Audience Segment 2</h5>
                <p>Description placeholder for audience segment 2</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h5 className="font-semibold">Audience Segment 3</h5>
                <p>Description placeholder for audience segment 3</p>
              </div>
            </div>
          </Subsection>
          
          <Subsection title="2.2. Capability Assessment">
            <p>Placeholder for capability assessment content. This section will outline Polkadot's technical capabilities relevant to enterprise needs.</p>
            <table className="w-full mt-3 border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Capability</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Maturity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Capability 1</td>
                  <td className="border p-2">Description placeholder</td>
                  <td className="border p-2">High</td>
                </tr>
                <tr>
                  <td className="border p-2">Capability 2</td>
                  <td className="border p-2">Description placeholder</td>
                  <td className="border p-2">Medium</td>
                </tr>
                <tr>
                  <td className="border p-2">Capability 3</td>
                  <td className="border p-2">Description placeholder</td>
                  <td className="border p-2">Low</td>
                </tr>
              </tbody>
            </table>
          </Subsection>
          
          <Subsection title="2.3. Value Proposition">
            <p>Placeholder for value proposition content. This section will articulate the unique value that Polkadot brings to enterprise customers.</p>
            <div className="mt-3 p-4 bg-gray-50 rounded border-l-4 border-polkadot-pink">
              <h4 className="font-bold mb-2">Core Value Proposition</h4>
              <p>Placeholder for Polkadot's primary value statement to enterprises</p>
            </div>
            <div className="mt-4 space-y-3">
              <div className="p-3 border rounded">
                <h5 className="font-semibold">Benefit 1</h5>
                <p>Description placeholder for benefit 1</p>
              </div>
              <div className="p-3 border rounded">
                <h5 className="font-semibold">Benefit 2</h5>
                <p>Description placeholder for benefit 2</p>
              </div>
              <div className="p-3 border rounded">
                <h5 className="font-semibold">Benefit 3</h5>
                <p>Description placeholder for benefit 3</p>
              </div>
            </div>
          </Subsection>
          
          <Subsection title="2.4. Positioning">
            <p>Placeholder for positioning content. This section will explain how Polkadot is positioned relative to competitors and alternative solutions.</p>
            <div className="mt-3 bg-gray-50 p-4 rounded">
              <h4 className="font-bold mb-2">Market Position</h4>
              <p>Placeholder for Polkadot's market positioning statement</p>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Competitive Differentiation</h5>
              <ul className="list-disc ml-5">
                <li>Differentiator 1 placeholder</li>
                <li>Differentiator 2 placeholder</li>
                <li>Differentiator 3 placeholder</li>
              </ul>
            </div>
          </Subsection>
          
          <Subsection title="2.5. Messaging Strategy">
            <p>Placeholder for messaging strategy content. This section will provide guidance on how to effectively communicate Polkadot's value to enterprises.</p>
            <div className="mt-3 space-y-4">
              <div className="p-3 border rounded">
                <h5 className="font-semibold">Key Message 1</h5>
                <p>Description placeholder for key message 1</p>
                <p className="mt-2 italic text-sm">When to use: Placeholder guidance</p>
              </div>
              <div className="p-3 border rounded">
                <h5 className="font-semibold">Key Message 2</h5>
                <p>Description placeholder for key message 2</p>
                <p className="mt-2 italic text-sm">When to use: Placeholder guidance</p>
              </div>
              <div className="p-3 border rounded">
                <h5 className="font-semibold">Key Message 3</h5>
                <p>Description placeholder for key message 3</p>
                <p className="mt-2 italic text-sm">When to use: Placeholder guidance</p>
              </div>
            </div>
          </Subsection>
          
          <Subsection title="2.6. Proof Points">
            <p>Placeholder for proof points content. This section will provide evidence and examples that validate Polkadot's claims and capabilities.</p>
            <div className="mt-3 space-y-4">
              <div className="p-3 bg-gray-50 rounded">
                <h5 className="font-semibold">Case Study 1</h5>
                <p>Brief placeholder for case study 1</p>
                <p className="mt-2 text-sm text-gray-500">Industry: Finance</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h5 className="font-semibold">Case Study 2</h5>
                <p>Brief placeholder for case study 2</p>
                <p className="mt-2 text-sm text-gray-500">Industry: Supply Chain</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <h5 className="font-semibold">Case Study 3</h5>
                <p>Brief placeholder for case study 3</p>
                <p className="mt-2 text-sm text-gray-500">Industry: Healthcare</p>
              </div>
            </div>
          </Subsection>
        </Section>
      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePitch;
