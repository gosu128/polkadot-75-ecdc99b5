import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Section component for each main section (expanded by default)
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-polkadot-pink mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

// Subsection component (expanded by default)
const Subsection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-polkadot-pink mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

const EnterprisePitch = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="container mx-auto p-4 pt-32 max-w-5xl">
        
        {/* Section 1: Introduction */}
        <Section title="1. Introduction">
          <Subsection title="1.1. General Advice">
            <p>Placeholder text for general advice about enterprise pitches. This section will include basic guidance on how to approach enterprise clients and what to expect during the pitch process.</p>
            <ul className="list-disc ml-5 mt-3">
              <li>Placeholder for key advice point 1</li>
              <li>Placeholder for key advice point 2</li>
              <li>Placeholder for key advice point 3</li>
            </ul>
          </Subsection>
          
          <Subsection title="1.2. Do's & Don'ts">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border-l-4 border-green-500">
                <h4 className="font-bold text-green-700 mb-2">Do's</h4>
                <ul className="list-disc ml-5 text-green-800">
                  <li>Placeholder for do's item 1</li>
                  <li>Placeholder for do's item 2</li>
                  <li>Placeholder for do's item 3</li>
                </ul>
              </div>
              <div className="p-4 border-l-4 border-red-500">
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
            <div className="mt-4 space-y-4">
              <div>
                <h5 className="font-semibold text-polkadot-pink">Audience Segment 1</h5>
                <p>Description placeholder for audience segment 1</p>
              </div>
              <div>
                <h5 className="font-semibold text-polkadot-pink">Audience Segment 2</h5>
                <p>Description placeholder for audience segment 2</p>
              </div>
              <div>
                <h5 className="font-semibold text-polkadot-pink">Audience Segment 3</h5>
                <p>Description placeholder for audience segment 3</p>
              </div>
            </div>
          </Subsection>

          <Subsection title="2.2. Capability Assessment">
            <p>Placeholder for capability assessment content. This section will outline Polkadot's technical capabilities relevant to enterprise needs.</p>
            <table className="w-full mt-4 border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Capability</th>
                  <th className="p-2 text-left">Description</th>
                  <th className="p-2 text-left">Maturity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">Capability 1</td>
                  <td className="p-2">Description placeholder</td>
                  <td className="p-2">High</td>
                </tr>
                <tr>
                  <td className="p-2">Capability 2</td>
                  <td className="p-2">Description placeholder</td>
                  <td className="p-2">Medium</td>
                </tr>
                <tr>
                  <td className="p-2">Capability 3</td>
                  <td className="p-2">Description placeholder</td>
                  <td className="p-2">Low</td>
                </tr>
              </tbody>
            </table>
          </Subsection>

          <Subsection title="2.3. Value Proposition">
            <p>Placeholder for value proposition content. This section will articulate the unique value that Polkadot brings to enterprise customers.</p>
            <div className="mt-4 border-l-4 border-polkadot-pink p-4">
              <h4 className="font-bold text-polkadot-pink mb-2">Core Value Proposition</h4>
              <p>Placeholder for Polkadot's primary value statement to enterprises</p>
            </div>
          </Subsection>

          <Subsection title="2.4. Messaging Strategy">
            <p>Placeholder for messaging strategy content. This section will provide guidance on how to effectively communicate Polkadot's value to enterprises.</p>
            <div className="mt-4 space-y-4">
              <div>
                <h5 className="font-semibold text-polkadot-pink">Key Message 1</h5>
                <p>Description placeholder for key message 1</p>
              </div>
              <div>
                <h5 className="font-semibold text-polkadot-pink">Key Message 2</h5>
                <p>Description placeholder for key message 2</p>
              </div>
              <div>
                <h5 className="font-semibold text-polkadot-pink">Key Message 3</h5>
                <p>Description placeholder for key message 3</p>
              </div>
            </div>
          </Subsection>

          <Subsection title="2.5. Proof Points">
            <p>Placeholder for proof points content. This section will provide evidence and examples that validate Polkadot's claims and capabilities.</p>
            <div className="mt-4 space-y-4">
              <div>
                <h5 className="font-semibold text-polkadot-pink">Case Study 1</h5>
                <p>Brief placeholder for case study 1</p>
              </div>
              <div>
                <h5 className="font-semibold text-polkadot-pink">Case Study 2</h5>
                <p>Brief placeholder for case study 2</p>
              </div>
              <div>
                <h5 className="font-semibold text-polkadot-pink">Case Study 3</h5>
                <p>Brief placeholder for case study 3</p>
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
