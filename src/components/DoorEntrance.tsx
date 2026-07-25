import React, { useEffect, useRef } from 'react';

const DoorEntrance: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // 1. Set the total frame count to 300
  const frameCount = 300;

  // 2. Exact match for your EZgif file names
  const currentFrame = (index: number) => {
    // Turns 1 into "001", 50 into "050", 278 into "278"
    const paddedNumber = index.toString().padStart(3, '0');
    
    // Maps to: /door-sequence/ezgif-frame-001.jpg
    return `/door-sequence/ezgif-frame-${paddedNumber}.jpg`; 
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set initial canvas dimensions to match the viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // 1. Preload all images into memory
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // 2. Draw function with 'object-fit: cover' equivalent logic for Canvas
    const drawImage = (img: HTMLImageElement) => {
      if (!canvas || !context) return;
      
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    // Draw the very first frame as soon as it loads
    images[0].onload = () => drawImage(images[0]);

    // 3. Scroll Logic
    const handleScroll = () => {
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      
      // Calculate how far down the 200vh container we have scrolled (0.0 to 1.0)
      let scrollFraction = -rect.top / maxScroll;
      
      // Clamp the fraction between 0 and 1 so it doesn't break at the top or bottom
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));
      
      // Map the fraction to our 30 frames
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );
      
      // Use requestAnimationFrame for buttery smooth rendering
      requestAnimationFrame(() => drawImage(images[frameIndex]));
    };

    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      resizeCanvas();
      handleScroll(); // Force a redraw on resize
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <canvas 
          ref={canvasRef} 
          style={{ display: 'block', width: '100%', height: '100%' }} 
        />
      </div>
    </div>
  );
};

export default DoorEntrance;
