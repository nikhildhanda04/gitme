"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, FileBadge2, MoveRight, Sparkles } from "lucide-react";

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
    <div className="flex justify-between px-24 mt-8 py-12">
         
         <div className="flex flex-col gap-4 w-1/2">
            <div className="font-sec text-sm w-fit tracking-tight text-[#FAFAFA] border border-[#292929] rounded-full px-4 py-2">
                Turn your github repos into perfect READMEs
            </div>
            <div className="font-primary text-6xl font-bold text-[#FAFAFA]">
              <span className="text-primary">Spend less time</span>   writing READMEs and more time building projects.
            </div>
            <div className="font-sec tracking-tight text-lg text-neutral-400 mt-4">
                GitMe instantly turns your GitHub repositories into professional, engaging READMEs that highlight your best work and help you stand out.
            </div>
            <div className="flex gap-6 ">
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

    </div>
  )
}

