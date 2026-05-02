"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative rounded-[40px] bg-linear-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-white/5 p-12 md:p-24 overflow-hidden text-center"
        >
          {/* Animated Glow Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.3, 0.5, 0.3]
               }}
               transition={{ duration: 8, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-[100px]"
            />
          </div>

          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/20 px-4 py-1.5 rounded-full border border-primary/20 mb-8"
            >
              <Zap className="w-4 h-4 text-primary fill-primary" />
              <span className="text-primary font-primary text-xs uppercase tracking-widest font-bold">Try it out</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-primary font-bold text-[#FAFAFA] mb-8 max-w-4xl mx-auto leading-tight">
              Ready to ship your <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">Perfect README?</span>
            </h2>
            
            <p className="text-neutral-400 font-sec text-lg md:text-xl max-w-2xl mx-auto mb-12">
              Join hundreds of developers who are saving hours on documentation every single week.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-primary text-white font-primary font-bold px-10 py-5 rounded-2xl flex items-center gap-3 mx-auto shadow-[0_20px_50px_rgba(35,134,54,0.3)] hover:shadow-[0_20px_50px_rgba(35,134,54,0.5)] transition-all"
            >
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute -bottom-40 -left-40 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-125 h-125 bg-zinc-800/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};
