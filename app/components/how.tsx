"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Cpu, Zap, Brain, Code, Search } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedContent, setDisplayedContent] = useState("");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Header: Always visible after scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Step 1: Input (Scroll 5% -> 35%)
  const step1Opacity = useTransform(scrollYProgress, [0.05, 0.1, 0.3, 0.35], [0, 1, 1, 0]);
  const step1Y = useTransform(scrollYProgress, [0.05, 0.1, 0.3, 0.35], [50, 0, 0, -50]);
  const step1Scale = useTransform(scrollYProgress, [0.05, 0.1, 0.3, 0.35], [0.95, 1, 1, 0.95]);

  // Step 2: AI Analysis (Scroll 35% -> 65%)
  const step2Opacity = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const step2Y = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [50, 0, 0, -50]);
  const step2Scale = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0.95, 1, 1, 0.95]);
  const analysisProgressVal = useTransform(scrollYProgress, [0.42, 0.58], [0, 100]);

  // Step 3: README (Scroll 65% -> 95%)
  const step3Opacity = useTransform(scrollYProgress, [0.65, 0.72, 1], [0, 1, 1]);
  const step3Y = useTransform(scrollYProgress, [0.65, 0.72, 1], [50, 0, 0]);
  const step3Scale = useTransform(scrollYProgress, [0.65, 0.72, 1], [0.95, 1, 1]);

  const readmeContent = "# GitMe AI\nProfessional README creator...\n\n## Tech Stack\n- Next.js v14\n- Tailwind CSS\n- Framer Motion\n\n## Installation\nnpm install gitme-ai";
  const typedChars = useTransform(scrollYProgress, [0.72, 0.95], [0, readmeContent.length]);

  useMotionValueEvent(typedChars, "change", (latest) => {
    setDisplayedContent(readmeContent.substring(0, Math.round(latest)));
  });

  // Re-designed Progress Line (Vertical Timeline style)
  const lineProgress = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#030303]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Timeline Line (Moved to the left of the content area for better hierarchy) */}
        <div className="absolute left-[8%] md:left-[20%] top-[25%] bottom-[25%] w-px bg-zinc-800/20 hidden md:block z-0">
            <motion.div 
                style={{ height: lineProgress }}
                className="w-full bg-primary shadow-[0_0_15px_rgba(35,134,54,0.5)] origin-top"
            />
            {/* Active Indicator Node */}
            <motion.div 
                style={{ top: lineProgress }}
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(35,134,54,1)] active-indicator"
            />
        </div>

        <div className="max-w-4xl w-full h-full px-6 relative flex flex-col items-center z-10">
          
          {/* Section Header */}
          <motion.div 
            style={{ opacity: headerOpacity }}
            className="absolute flex flex-col items-center gap-4 text-center top-12 z-20"
          >
            <h2 className="text-4xl md:text-6xl font-primary font-bold text-[#FAFAFA]">How It Works</h2>
            <p className="text-neutral-400 font-sec text-base md:text-lg max-w-lg mt-2">Zero setup. One link. Professional documentation.</p>
          </motion.div>

          {/* Steps Container (Centered Vertically) */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Step 1: Input Stage */}
            <motion.div 
                style={{ opacity: step1Opacity, y: step1Y, scale: step1Scale }}
                className="absolute flex flex-col items-center w-full"
            >
                <div className="mb-8 flex flex-col items-center gap-3">
                    <span className="text-primary font-primary text-xs uppercase tracking-[0.3em] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">Stage 01</span>
                    <h3 className="text-3xl md:text-5xl font-primary font-bold text-[#FAFAFA] text-center">Connect Repository</h3>
                </div>
                
                <div className="w-full max-w-xl bg-zinc-900/40 border border-white/5 rounded-4xl p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-4 text-zinc-500 mb-4 px-2">
                        <GithubIcon className="w-5 h-5" />
                        <span className="text-sm font-sec italic">github.com/username/repo</span>
                    </div>
                    <div className="h-16 flex items-center border-b border-white/5 font-sec text-zinc-100 text-xl px-2">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            https://github.com/nikhildhanda04/gitme
                        </motion.span>
                        <motion.div 
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-0.5 h-8 bg-primary ml-1 shadow-[0_0_10px_rgba(35,134,54,1)]"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Step 2: AI Analysis Stage */}
            <motion.div 
                style={{ opacity: step2Opacity, y: step2Y, scale: step2Scale }}
                className="absolute flex flex-col items-center w-full"
            >
                <div className="mb-8 flex flex-col items-center gap-3">
                    <span className="text-primary font-primary text-xs uppercase tracking-[0.3em] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">Stage 02</span>
                    <h3 className="text-3xl md:text-5xl font-primary font-bold text-[#FAFAFA] text-center">Semantic Analysis</h3>
                </div>

                <div className="relative w-64 h-64 flex items-center justify-center">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-primary/20 rounded-full"
                    />
                    <div className="relative z-10 w-28 h-28 bg-primary/10 border border-primary/30 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(35,134,54,0.1)]">
                        <Brain className="w-14 h-14 text-primary" />
                    </div>
                    
                    {[Code, Search, Cpu, Zap].map((Icon, i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                rotate: [0, -360],
                                translateX: [110, 110],
                                scale: [1, 0.8, 1]
                            }}
                            transition={{ 
                                duration: 8, 
                                repeat: Infinity, 
                                ease: "linear",
                                delay: i * 2
                            }}
                            className="absolute text-primary/40"
                            style={{ originX: "-55px" }}
                        >
                            <Icon className="w-6 h-6" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 w-full max-w-sm bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                    <div className="flex justify-between text-[10px] font-primary text-neutral-500 mb-3 uppercase tracking-[0.2em]">
                        <span>Analyzing Core Logic...</span>
                        <motion.span>{Math.round(analysisProgressVal.get())}%</motion.span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            style={{ width: useTransform(analysisProgressVal, (v) => `${v}%`) }} 
                            className="h-full bg-primary shadow-[0_0_15px_rgba(35,134,54,0.5)]"
                        />
                    </div>
                </div>
            </motion.div>

            {/* Step 3: README Stage */}
            <motion.div 
                style={{ opacity: step3Opacity, y: step3Y, scale: step3Scale }}
                className="absolute flex flex-col items-center w-full"
            >
                <div className="mb-8 flex flex-col items-center gap-3">
                    <span className="text-primary font-primary text-xs uppercase tracking-[0.3em] bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">Stage 03</span>
                    <h3 className="text-3xl md:text-5xl font-primary font-bold text-[#FAFAFA] text-center">Doc Generation</h3>
                </div>

                <div className="w-full max-w-2xl bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                    <div className="bg-[#161616]/80 flex items-center justify-between px-6 py-4 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#333]" />
                            <div className="w-3 h-3 rounded-full bg-[#333]" />
                            <div className="w-3 h-3 rounded-full bg-[#333]" />
                        </div>
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">README.md</span>
                        <div className="w-10" />
                    </div>
                    <div className="p-8 font-mono text-sm leading-relaxed text-zinc-300 min-h-75">
                        <motion.pre className="whitespace-pre-wrap">
                            {displayedContent}
                            <motion.span 
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="inline-block w-2.5 h-4.5 bg-primary ml-1 align-middle shadow-[0_0_8px_rgba(35,134,54,1)]"
                            />
                        </motion.pre>
                    </div>
                </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Atmospheric Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-150 h-150 bg-primary/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-150 h-150 bg-zinc-800/10 rounded-full blur-[140px]" />
      </div>
    </section>
  );
};
