const PitchAdvise = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Header />
      <div className="flex flex-col min-h-screen text-left px-4 sm:px-6 lg:px-8 py-16 lg:py-20 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-unbounded font-bold text-gray-900 my-[60px]">Pitch Advice for BD Agents</h2>
        </div>

        <div className="space-y-4 max-w-4xl">
          <SectionHeader icon={Info} title="Introduction" />
          <p className="text-gray-700 leading-relaxed">
            Business Development (BD) Agents play a crucial role in expanding Polkadot’s ecosystem. 
            This guide provides strategic insights, key messaging points, and best practices for B2B pitches.
          </p>

          <SectionHeader icon={AlertTriangle} title="Things to Keep in Mind during B2B Pitches" />
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>Understand the prospect’s pain points before pitching solutions.</li>
            <li>Emphasize Polkadot’s interoperability and real-world applications.</li>
            <li>Avoid overly technical jargon unless addressing a technical audience.</li>
            <li>Showcase Polkadot’s success stories and partnerships for credibility.</li>
          </ul>

          <SectionHeader icon={Lightbulb} title="Important B2B Use Cases" />
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Businesses looking to integrate blockchain solutions are often concerned with scalability, compliance, 
              and security. Polkadot’s parachain structure enables enterprises to build customized, secure, 
              and interoperable solutions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Example Use Cases:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Supply Chain Transparency through blockchain interoperability.</li>
                <li>DeFi Infrastructure for institutional-grade finance applications.</li>
                <li>Secure Identity Management using Polkadot’s parachains.</li>
              </ul>
            </p>
          </div>

          <SectionHeader icon={Users} title="Important B2B Personas" />
          <p className="text-gray-700 leading-relaxed">
            When pitching, tailor messaging to key decision-makers. Common B2B personas include:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li><strong>CTOs & Tech Leads:</strong> Concerned with scalability and security.</li>
            <li><strong>CEOs & Business Strategists:</strong> Focus on market potential and ROI.</li>
            <li><strong>Compliance Officers:</strong> Need clarity on regulations and legal implications.</li>
          </ul>

          <SectionHeader icon={Target} title="Polkadot's Messaging Strategy" />
          <p className="text-gray-700 leading-relaxed">
            The core message revolves around Polkadot’s ability to provide **interoperability, scalability, 
            and security** while maintaining **low costs** and **high efficiency**. Emphasizing these aspects 
            makes the technology appealing to enterprises and institutions.
          </p>

          <SectionHeader icon={Star} title="Polkadot's Capability Assessment" />
          <p className="text-gray-700 leading-relaxed">
            Polkadot’s modular framework allows businesses to customize their blockchain solutions 
            while benefiting from shared security and seamless interoperability. Key advantages include:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
            <li>Efficient scalability through parachains.</li>
            <li>Robust security and decentralized governance.</li>
            <li>Flexibility to meet business-specific needs.</li>
          </ul>

          <SectionHeader icon={Star} title="Polkadot's Value Proposition" />
          <p className="text-gray-700 leading-relaxed">
            The Polkadot ecosystem offers a **unique advantage** by providing **true cross-chain interoperability** 
            without sacrificing decentralization or security. This makes it a **highly attractive option** for 
            enterprises looking for blockchain solutions that are **scalable, secure, and future-proof**.
          </p>
        </div>
      </div>
    </div>
  );
};
