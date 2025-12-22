import React from "react";
import { LogoCloudCarousel } from "./logo-cloud-carousel";

const LogoCloudCarouselDemo = () => {
  return (
    <div className="w-full bg-[#050505]">
      {/* Increased padding and used standard border colors */}
      <section className="border-t border-b border-white/5 py-10">
        <LogoCloudCarousel logos={logos} />
      </section>
    </div>
  );
};

export default LogoCloudCarouselDemo;

const logos = [
  {
    name: "NVIDIA",
    url: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg", // Using direct SVG for better rendering
  },
  {
    name: "GitHub",
    url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  },
  {
    name: "Nike",
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
  },
  {
    name: "OpenAI",
    url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
  },
  {
    name: "Tailwind CSS",
    url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "Vercel",
    url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Vercel_logo_black.svg",
  },
];