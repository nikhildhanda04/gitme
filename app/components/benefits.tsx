"use client";

import { motion } from "framer-motion";
import { Users, Briefcase, Rocket, Terminal } from "lucide-react";

const useCases = [
  {
    id: 1,
    title: "For Developers",
    description: "Save countless hours on documentation, focus on coding. Let AI handle the structure and context while you ship features.",
    icon: Terminal,
    className: "md:col-span-2 md:row-span-1 bg-zinc-900/40",
    stats: "Save ~2hrs/repo"
  },
  {
    id: 2,
    title: "For Job Seekers",
    description: "Make your portfolio projects shine. Stand out to recruiters with professional, polished documentation in one click.",
    icon: Briefcase,
    className: "md:col-span-1 md:row-span-2 bg-primary/10 border-primary/20",
    stats: "Stand Out"
  },
  {
    id: 3,
    title: "For Open Source",
    description: "Attract contributors with crystal-clear project overviews. Set up your repo for success from day one.",
    icon: Rocket,
    className: "md:col-span-1 md:row-span-1 bg-zinc-900/40",
    stats: "Boost Growth"
  },
  {
    id: 4,
    title: "For Teams",
    description: "Ensure consistent, high-quality documentation across all projects. Standardize your team's output effortlessly.",
    icon: Users,
    className: "md:col-span-1 md:row-span-1 bg-zinc-900/40",
    stats: "Stay Synced"
  }
];

export const Benefits = () => {
  return (
    <section className="py-32 px-6 md:px-24 bg-[#030303] relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-primary text-sm uppercase tracking-[0.2em]"
          >
            Use Cases
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-primary font-bold text-[#FAFAFA] mt-4 mb-6"
          >
            Built for every <span className="text-neutral-500 italic">workflow.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[240px]">
          {useCases.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl border border-white/5 backdrop-blur-sm flex flex-col justify-between group transition-all duration-500 ${item.className}`}
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#121212] flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-primary font-bold text-[#FAFAFA] mb-3">{item.title}</h3>
                <p className="text-neutral-400 font-sec text-sm leading-relaxed max-w-xs">{item.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] font-primary uppercase tracking-[0.2em] text-primary/60">{item.stats}</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Rocket className="w-4 h-4 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
