
// Horizontal navigation (tabs at the top)
const renderHorizontalNav = () => (
  <div className="w-full mb-8 border-b border-gray-200 sticky top-20 pt-4 pb-1 bg-white/90 backdrop-blur-sm z-10">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-medium">Page Navigation</h2>
      <div className="flex gap-2">
        <button 
          onClick={() => setNavView('vertical')} 
          className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Sidebar View
        </button>
      </div>
    </div>
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-4 min-w-max">
        {navItems.map((section) => (
          <div key={section.id} className="flex items-center gap-2">
            <button 
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "whitespace-nowrap text-sm font-medium hover:text-polkadot-pink transition-colors",
                activeSection === section.id ? "text-polkadot-pink" : "text-gray-700"
              )}
            >
              {section.title}
            </button>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <div className="flex gap-3">
              {section.subsections.map((subsection, idx) => (
                <React.Fragment key={subsection.id}>
                  <button
                    onClick={() => scrollToSection(subsection.id)}
                    className={cn(
                      "text-xs whitespace-nowrap hover:text-polkadot-pink transition-colors",
                      activeSection === subsection.id ? "text-polkadot-pink font-medium" : "text-gray-600"
                    )}
                  >
                    {subsection.title}
                  </button>
                  {idx < section.subsections.length - 1 && (
                    <span className="text-gray-300">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
