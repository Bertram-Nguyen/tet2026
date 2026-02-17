import React, { useEffect, useRef } from 'react';

interface FireworksProps {
  active: boolean;
  className?: string; // Allow custom positioning/z-index
}

const Fireworks: React.FC<FireworksProps> = ({ active, className = "fixed inset-0 pointer-events-none z-50" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // --- Configuration ---
    const colors = [
      '#FF0000', '#FFD700', '#FF1493', '#00FF00', '#00FFFF', '#FF4500', '#FFFFFF'
    ];
    const gravity = 0.08;
    const friction = 0.97;

    // --- Classes ---

    // 1. Particle (Hạt nổ ra)
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1; // Explosion force
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.size = Math.random() * 2 + 1;
        this.decay = Math.random() * 0.015 + 0.01;
      }

      update() {
        this.vx *= friction;
        this.vy *= friction;
        this.vy += gravity; // Gravity pulls particles down
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // 2. Rocket (Pháo bắn lên)
    class Rocket {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      exploded: boolean;
      trail: {x: number, y: number}[];

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.vx = (Math.random() - 0.5) * 4; // Slight drift left/right
        this.vy = -(Math.random() * 8 + 12); // Shoot up speed (faster initial speed)
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.exploded = false;
        this.trail = [];
      }

      update() {
        this.trail.push({x: this.x, y: this.y});
        if (this.trail.length > 8) this.trail.shift(); // Longer trail

        this.x += this.vx;
        this.y += this.vy;
        this.vy += gravity; // Gravity slows it down as it goes up

        // Explode when it slows down (reaches peak) or hits top 15%
        if (this.vy >= -1 || this.y < height * 0.15) {
          this.exploded = true;
          this.explode();
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.beginPath();
        // Draw trail
        if (this.trail.length > 0) {
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for(let p of this.trail) ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 3; // Thicker trail
            ctx.stroke();
        }
        
        // Draw head
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); // Bigger head
        ctx.fill();
        ctx.restore();
      }

      explode() {
        // Create particles
        for (let i = 0; i < 80; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
        // Add some white sparkles
        for (let i = 0; i < 30; i++) {
           particles.push(new Particle(this.x, this.y, '#FFFFFF'));
        }
      }
    }

    // --- Animation Loop ---
    let particles: Particle[] = [];
    let rockets: Rocket[] = [];
    let animationId: number;

    const animate = () => {
      if (!ctx) return;
      
      // Clear with trail effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Randomly launch rockets - INCREASED FREQUENCY
      if (Math.random() < 0.08) { 
        rockets.push(new Rocket());
      }

      // Update Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].update();
        rockets[i].draw(ctx);
        if (rockets[i].exploded) {
          rockets.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  );
};

export default Fireworks;