
import React, { useEffect, useRef } from 'react';

type WorldMapProps = {
  regions: string;
};

// Simple component that renders a visual representation of regions
const WorldMap = ({ regions }: WorldMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Parse regions from text
  const getHighlightedRegions = (regionsText: string): string[] => {
    // Simple parsing - split by commas, clean up whitespace
    const regionList = regionsText.split(',').map(r => r.trim().toLowerCase());
    return regionList;
  };
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a simple world map representation
    ctx.fillStyle = '#e6e6e6';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Parse regions
    const highlightedRegions = getHighlightedRegions(regions);
    
    // Simple map regions (very simplified for demonstration)
    const mapRegions = [
      { name: 'north america', x: 0.2, y: 0.3, width: 0.15, height: 0.15 },
      { name: 'south america', x: 0.25, y: 0.5, width: 0.1, height: 0.2 },
      { name: 'europe', x: 0.45, y: 0.25, width: 0.08, height: 0.1 },
      { name: 'africa', x: 0.45, y: 0.4, width: 0.1, height: 0.2 },
      { name: 'asia', x: 0.6, y: 0.3, width: 0.15, height: 0.15 },
      { name: 'australia', x: 0.7, y: 0.55, width: 0.08, height: 0.08 },
      { name: 'united states', x: 0.18, y: 0.3, width: 0.12, height: 0.1 },
      { name: 'china', x: 0.65, y: 0.33, width: 0.1, height: 0.1 },
      { name: 'india', x: 0.62, y: 0.38, width: 0.08, height: 0.08 },
      { name: 'japan', x: 0.75, y: 0.33, width: 0.05, height: 0.05 },
      { name: 'uk', x: 0.43, y: 0.25, width: 0.02, height: 0.02 },
      { name: 'germany', x: 0.46, y: 0.27, width: 0.02, height: 0.02 },
      { name: 'france', x: 0.44, y: 0.28, width: 0.02, height: 0.02 },
    ];
    
    // Draw each region
    mapRegions.forEach(region => {
      const isHighlighted = highlightedRegions.some(r => 
        region.name.includes(r) || r.includes(region.name)
      );
      
      ctx.fillStyle = isHighlighted ? '#E6007A' : '#a0a0a0';
      ctx.beginPath();
      ctx.fillRect(
        region.x * canvas.width, 
        region.y * canvas.height, 
        region.width * canvas.width, 
        region.height * canvas.height
      );
      
      // Add glow effect to highlighted regions
      if (isHighlighted) {
        ctx.shadowColor = '#E6007A';
        ctx.shadowBlur = 10;
        ctx.fillRect(
          region.x * canvas.width, 
          region.y * canvas.height, 
          region.width * canvas.width, 
          region.height * canvas.height
        );
        ctx.shadowBlur = 0;
      }
    });
    
    // Add some ocean texture
    ctx.fillStyle = '#e6e6e6';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw title
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('Key Markets', 10, 20);
    
  }, [regions]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full rounded"
      style={{ maxHeight: '250px' }}
    ></canvas>
  );
};

export default WorldMap;
