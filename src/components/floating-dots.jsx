"use client";

import React, { useEffect, useRef } from "react";

export const FloatingDots = ({
  className = "",
  maxRadius = 0.5,
  maxSpeed = 0.8,
  minSpeed = 0.1,
  dotColor = "rgba(255, 255, 255, 0.3)",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Resize handler to keep canvas full screen
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * maxRadius + 0.1;
        this.speedX = (Math.random() - 0.5) * maxSpeed;
        this.speedY = (Math.random() - 0.5) * maxSpeed;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screens instead of bouncing for a "space" feel
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 8000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [maxRadius, maxSpeed, dotColor]);

  return (
    // Change z-0 to z-10 or higher
<canvas
  ref={canvasRef}
  className={`fixed top-0 left-0 pointer-events-none z-10 ${className}`}
  style={{ background: "transparent" }}
/>
  );
};