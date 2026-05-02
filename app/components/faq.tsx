"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is it really free?",
    answer: "Yes! GitMe is currently free to use. We want to help as many developers as possible save time on documentation."
  },
  {
    question: "Does it support private repositories?",
    answer: "Currently, we only support public repositories. Private repo support is on our roadmap for the pro version."
  },
  {
    question: "What languages/frameworks do you support?",
    answer: "Our AI is trained on almost all major technologies, including JavaScript, TypeScript, Python, Rust, Go, React, Next.js, and many more. It understands your whole file structure, not just the code."
  },
  {
    question: "How long does it take to generate?",
    answer: "Most READMEs are generated in under 15 seconds. It depends on the size and complexity of your repository's structure."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 md:px-24 bg-[#030303]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-primary text-sm uppercase tracking-widest"
          >
            Questions
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-primary font-bold text-[#FAFAFA] mt-4"
          >
            Common Queries
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 bg-zinc-900/50 border border-white/5 rounded-2xl flex items-center justify-between hover:bg-zinc-900 transition-colors duration-300"
              >
                <span className="text-lg font-primary font-medium text-[#FAFAFA]">{faq.question}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openIndex === index ? "bg-primary rotate-180" : "bg-white/5"}`}>
                  {openIndex === index ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white/40" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 text-neutral-400 font-sec leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
