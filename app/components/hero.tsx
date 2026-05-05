"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, FileBadge2, MoveRight, Sparkles, FileCode2, Copy } from "lucide-react";

export const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const solutions = [
    {
      title: "Lightning-Fast, AI-Powered Generation",
      description:
        "Quickly produces professional READMEs, saving significant time.",
      icon: Sparkles,
    },
    {
      title: "Professional, Comprehensive Output",
      description:
        "Delivers high-quality documentation without generic AI fluff or unnecessary elements like emojis.",
      icon: FileBadge2,
    },
    {
      title: "Intelligent Project Analysis",
      description:
        "Understands your project's structure, frameworks, and dependencies to generate accurate, relevant READMEs.",
      icon: BrainCircuit,
    },
  ];

  return (
    <div className="flex justify-between pl-12 md:pl-40 mt-24 py-12 relative overflow-hidden">
         
         <div className="flex flex-col gap-4 w-1/2 pr-32">
            <div className="font-sec text-sm w-fit tracking-tight text-[#FAFAFA] border border-[#292929] rounded-full px-4 py-2">
                Turn your github repos into perfect READMEs
            </div>
            <div className="font-primary text-6xl font-bold text-[#FAFAFA]">
              <span className="text-primary">Spend less time</span>   writing READMEs and more time building projects.
            </div>
            {/* <div className="font-sec tracking-tight text-lg text-neutral-400 mt-4">
                GitMe instantly turns your GitHub repositories into professional, engaging READMEs that highlight your best work and help you stand out.
            </div> */}
            <div className="flex gap-6 ">
                <Link href="/generate">
                    <motion.div 
                        layout
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        transition={{
                            layout: { type: "spring", stiffness: 400, damping: 30 }
                        }}
                        className="bg-primary text-xl mt-4 font-primary flex items-center w-fit px-6 py-2 rounded-lg cursor-pointer hover:bg-primary/80 transition-shadow duration-200 ease-in overflow-hidden"
                    >
                        <motion.span layout>Get Started</motion.span>
                        <AnimatePresence>
                            {isHovered && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10, width: 0 }}
                                    animate={{ opacity: 1, x: 0, width: "auto" }}
                                    exit={{ opacity: 0, x: -10, width: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="flex items-center"
                                >
                                    <MoveRight className="ml-3 shrink-0" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </Link>
            </div>

            <div className="flex flex-col gap-6 mt-20">
              {solutions.map((solution) => {
                const Icon = solution.icon;

                return (
                  <div
                    key={solution.title}
                    className="flex items-center gap-5"
                  >
                    <div className="w-11 h-11 rounded-md bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-[#FAFAFA] font-primary text-xl font-semibold">
                        {solution.title}
                      </h3>
                      <p className="text-neutral-400 tracking-tight font-sec text-sm mt-1 leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

         </div>

         {/* Right Side Window (Cropped) */}
         <div className="hidden md:flex absolute right-10 top-0 bottom-0 w-[46vw] translate-x-[15%] border border-white/5 rounded-tl-3xl rounded-bl-3xl bg-[#0a0a0a] shadow-[1px_2px_80px_10px_rgba(200,200,200,0.18)] flex-col overflow-hidden z-0 pointer-events-none opacity-90">
             {/* Header */}
             <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#111]/80 backdrop-blur-md rounded-tl-3xl">
                <div className="flex items-center gap-3">
                    <FileCode2 className="w-5 h-5 text-primary" />
                    <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-[0.2em]">README.md</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-sec text-zinc-400 border border-white/10 px-3 py-1.5 rounded-lg bg-white/5">
                    <Copy className="w-3.5 h-3.5" />
                    Copy markdown
                </div>
             </div>
             
             {/* Body */}
             <div className="p-10 flex-1 overflow-hidden relative">
                 {/* Fading bottom edge */}
                 <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                 
                 <div className="prose prose-invert max-w-none prose-headings:font-primary prose-headings:text-[#FAFAFA] prose-p:font-sec prose-p:text-zinc-400 prose-li:font-sec prose-li:text-zinc-400 prose-strong:text-[#FAFAFA] prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm">
                    <h1 className="text-5xl font-primary mb-6">portfolio-v3</h1>
                    <p className="text-[15px] leading-relaxed">
                        This project is a personal portfolio website built with Next.js. It serves as a showcase of skills, projects, and experience. The portfolio provides an interactive and visually appealing way to present information to potential employers or clients. It leverages modern web development practices and aims for optimal performance and user experience.
                    </p>
                    <h2 className="text-2xl font-primary font-bold mt-8 mb-4">Features</h2>
                    <ul className="list-disc pl-5 space-y-3 text-[15px]">
                        <li><strong>Project Showcase:</strong> Dedicated sections to highlight various projects with descriptions and details.</li>
                        <li><strong>Dynamic Routing:</strong> Utilizes Next.js dynamic routes for individual project pages.</li>
                        <li><strong>Responsive Design:</strong> Built with Tailwind CSS to ensure responsiveness across different devices.</li>
                        <li><strong>Optimized Fonts:</strong> Employs <code>next/font</code> to optimize and load custom fonts for improved performance and aesthetics.</li>
                    </ul>
                 </div>
             </div>
         </div>

    </div>
  )
}

