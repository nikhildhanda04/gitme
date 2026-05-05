"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { ArrowRight, Loader2, FileCode2, Copy, Check } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export default function GeneratePage() {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [readme, setReadme] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;
        setLoading(true);
        setError("");
        setReadme(null);
        setCopied(false);

        try {
            const res = await fetch("/api/generate-readme", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ githubUrl: url }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to generate README");
            }

            setReadme(data.readmeMarkdown);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!readme) return;
        navigator.clipboard.writeText(readme);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col bg-[#030303] min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
                {/* Atmospheric Glows */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[140px]" />
                </div>

                <div className="w-full max-w-4xl flex flex-col items-center z-10 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center w-full"
                    >
                        <h1 className="text-4xl md:text-6xl font-primary font-bold text-[#FAFAFA] text-center mb-4">
                            Generate Your README
                        </h1>
                        <p className="text-neutral-400 font-sec text-center mb-12 max-w-xl text-lg">
                            Enter a public GitHub repository URL below. We'll analyze its code and structure to build a professional README.
                        </p>

                        {!readme ? (
                            <form onSubmit={handleGenerate} className="w-full max-w-2xl relative">
                                <div className="flex flex-col md:flex-row gap-4 items-center bg-zinc-900/40 p-2 border border-white/5 rounded-3xl backdrop-blur-xl shadow-2xl">
                                    <div className="flex items-center flex-1 px-4 py-2 gap-4 w-full">
                                        <GithubIcon className="text-zinc-500 w-6 h-6 shrink-0" />
                                        <input 
                                            type="url"
                                            placeholder="https://github.com/username/repo"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            required
                                            className="bg-transparent border-none outline-none text-[#FAFAFA] font-sec text-lg w-full placeholder:text-zinc-600 focus:ring-0"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-primary text-[#FAFAFA] font-primary flex items-center px-8 py-4 rounded-2xl hover:bg-primary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto justify-center shadow-[0_0_20px_rgba(35,134,54,0.3)] hover:shadow-[0_0_30px_rgba(35,134,54,0.5)]"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                                Analyzing...
                                            </>
                                        ) : (
                                            <>
                                                Generate
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </>
                                        )}
                                    </button>
                                </div>
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-12 left-0 w-full text-red-400 font-sec text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </form>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full mt-4"
                            >
                                <div className="w-full bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
                                    <div className="bg-[#161616]/80 flex items-center justify-between px-6 py-4 border-b border-white/5">
                                        <div className="flex gap-2 items-center">
                                            <FileCode2 className="text-primary w-5 h-5" />
                                            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">README.md</span>
                                        </div>
                                        <button 
                                            onClick={handleCopy}
                                            className="flex items-center gap-2 text-sm font-sec text-zinc-400 hover:text-[#FAFAFA] transition-colors border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                                            {copied ? 'Copied!' : 'Copy markdown'}
                                        </button>
                                    </div>
                                    <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
                                        <div className="prose prose-invert max-w-none prose-headings:font-primary prose-headings:text-[#FAFAFA] prose-p:font-sec prose-p:text-zinc-300 prose-li:font-sec prose-li:text-zinc-300 prose-strong:text-[#FAFAFA] prose-a:text-primary hover:prose-a:text-primary/80 prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-pre:bg-[#111] prose-pre:border prose-pre:border-white/10 prose-pre:text-zinc-300 prose-hr:border-white/10">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {readme}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => {
                                        setReadme(null);
                                        setUrl("");
                                        setError("");
                                    }}
                                    className="mt-8 mx-auto flex items-center gap-2 text-neutral-400 font-sec hover:text-[#FAFAFA] transition-colors border border-transparent hover:border-white/10 px-6 py-2 rounded-full"
                                >
                                    <ArrowRight className="w-4 h-4 rotate-180" />
                                    Generate another README
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
