
import React, { useEffect, useRef } from 'react';

interface DotPatternProps {
  className?: string;
}

const DotPattern: React.FC<DotPatternProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        drawDots();
      }
    };

    const drawDots = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dotSize = 2;
      const gridSpacing = 30;
      const color = '#E6007A';

      for (let x = 0; x < canvas.width; x += gridSpacing) {
        for (let y = 0; y < canvas.height; y += gridSpacing) {
          // Add some randomness to dot positions
          const offsetX = Math.random() * 10 - 5;
          const offsetY = Math.random() * 10 - 5;
          
          // Random opacity for visual interest
          const opacity = Math.random() * 0.3 + 0.05;
          
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 0, 122, ${opacity})`;
          ctx.fill();
        }
      }
    };

    // Initial setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 -z-10 pointer-events-none ${className || ''}`}
    />
  );
};

export default DotPattern;
