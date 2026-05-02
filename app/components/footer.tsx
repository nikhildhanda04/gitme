"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

export const Footer = () => {
  return (
    <footer className="py-20 px-6 md:px-24 bg-[#030303] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <span className="text-primary font-bold">G</span>
                </div>
                <span className="text-[#FAFAFA] font-primary font-bold text-2xl tracking-tighter">GitMe</span>
            </Link>
            <p className="text-neutral-500 font-sec text-sm max-w-xs leading-relaxed">
              Elevating developer productivity through intelligent README generation. Ship faster, document better.
            </p>
          </div>

          <div>
            <h4 className="text-[#FAFAFA] font-primary font-bold text-sm uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#how-it-works" className="text-neutral-500 hover:text-primary transition-colors text-sm font-sec">How It Works</Link></li>
              <li><Link href="#features" className="text-neutral-500 hover:text-primary transition-colors text-sm font-sec">Features</Link></li>
              <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors text-sm font-sec">Pricing (Coming Soon)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#FAFAFA] font-primary font-bold text-sm uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors text-sm font-sec">Privacy Policy</Link></li>
              <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors text-sm font-sec">Terms of Service</Link></li>
              <li><Link href="#" className="text-neutral-500 hover:text-primary transition-colors text-sm font-sec">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
          <p className="text-neutral-600 text-[10px] font-primary uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} GitMe AI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="text-neutral-600 hover:text-[#FAFAFA] transition-colors"><GithubIcon className="w-5 h-5" /></Link>
            <Link href="#" className="text-neutral-600 hover:text-[#FAFAFA] transition-colors"><TwitterIcon className="w-5 h-5" /></Link>
            <Link href="#" className="text-neutral-600 hover:text-primary transition-colors"><Mail className="w-5 h-5" /></Link>
            <Link href="#" className="text-neutral-600 hover:text-[#0077B5] transition-colors"><LinkedinIcon className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
