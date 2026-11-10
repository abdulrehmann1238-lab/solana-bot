import React, { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label?: string;
  isToken?: boolean;
}

interface Particle {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export const HeroNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 640);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create wallet & token nodes
    const nodeCount = 28;
    const nodes: Node[] = [];
    const tokens = ['SOL', 'BONK', 'WIF', 'JUP', 'POPCAT'];

    for (let i = 0; i < nodeCount; i++) {
      const isToken = i < tokens.length;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: isToken ? 4.5 : Math.random() * 2.5 + 2,
        label: isToken ? tokens[i] : undefined,
        isToken,
      });
    }

    // Moving transaction packets
    const particles: Particle[] = [];
    for (let i = 0; i < 16; i++) {
      particles.push({
        fromNode: Math.floor(Math.random() * nodeCount),
        toNode: Math.floor(Math.random() * nodeCount),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: Math.random() > 0.4 ? '#315E4B' : '#71869A',
      });
    }

    const maxDistance = 160;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint background grid lines
      ctx.strokeStyle = 'rgba(231, 235, 230, 0.45)';
      ctx.lineWidth = 1;
      const gridSize = 48;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Update and draw node positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 20 || n.x > width - 20) n.vx *= -1;
        if (n.y < 20 || n.y > height - 20) n.vy *= -1;
      }

      // Draw connecting edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.22;
            ctx.strokeStyle = `rgba(118, 149, 132, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw moving transaction particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.fromNode = Math.floor(Math.random() * nodeCount);
          p.toNode = Math.floor(Math.random() * nodeCount);
        }

        const n1 = nodes[p.fromNode];
        const n2 = nodes[p.toNode];
        const px = n1.x + (n2.x - n1.x) * p.progress;
        const py = n1.y + (n2.y - n1.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.isToken ? '#315E4B' : 'rgba(113, 134, 154, 0.6)';
        ctx.fill();

        if (n.isToken && n.label) {
          ctx.fillStyle = '#202923';
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    />
  );
};

