import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how";
import { Benefits } from "./components/benefits";
import { FAQ } from "./components/faq";
import { Footer } from "./components/footer";

export default function Home() {
  return (      
    <div className="flex flex-col bg-[#030303] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
