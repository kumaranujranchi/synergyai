import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const particlesRef = useRef<Particle[]>([]);
  const lastFrameTime = useRef(0);
  const isInitialized = useRef(false);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2); // Limit DPR for performance
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    return { ctx, width: rect.width, height: rect.height };
  }, []);

  const createParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(50, Math.floor((width * height) / 15000)); // Reduced particle count
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const baseOpacity = Math.random() * 0.4 + 0.1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: baseOpacity,
        baseOpacity
      });
    }
    
    return particles;
  }, []);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Throttle animation to ~60fps max
    if (currentTime - lastFrameTime.current < 16) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTime.current = currentTime;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    particles.forEach((particle, i) => {
      // Mouse interaction (optimized)
      if (mouse.isActive) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;
        
        if (distanceSquared < 10000) { // 100px radius squared
          const distance = Math.sqrt(distanceSquared);
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
          particle.opacity = Math.min(particle.baseOpacity + force * 0.3, 1);
        } else {
          particle.opacity = particle.baseOpacity;
        }
      } else {
        particle.opacity = particle.baseOpacity;
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Boundary wrapping instead of collision
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Draw connections (optimized - only check next few particles)
      const maxConnections = 3;
      let connections = 0;
      
      for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
        const otherParticle = particles[j];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distanceSquared = dx * dx + dy * dy;

        if (distanceSquared < 8100) { // 90px radius squared
          const distance = Math.sqrt(distanceSquared);
          const opacity = (90 - distance) / 90 * 0.15;
          
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
          connections++;
        }
      }

      // Draw particle (simplified)
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Mouse glow effect (simplified)
    if (mouse.isActive && mouse.x >= 0 && mouse.y >= 0) {
      ctx.globalAlpha = 0.1;
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 80
      );
      gradient.addColorStop(0, '#3B82F6');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isInitialized.current) return;

    const result = initializeCanvas();
    if (!result) return;

    const { width, height } = result;
    particlesRef.current = createParticles(width, height);
    isInitialized.current = true;

    // Optimized mouse handler with throttling
    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true
      };

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouseRef.current.isActive = false;
      }, 100);
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    // Use passive listeners for better performance
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mouseTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      isInitialized.current = false;
    };
  }, [animate, createParticles, initializeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: 'transparent',
        pointerEvents: 'none',
        willChange: 'transform' // Hint for browser optimization
      }}
    />
  );
}