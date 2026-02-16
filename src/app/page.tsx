import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import HeroNavbar from '@/components/layout/HeroNavbar';

export default function Home() {
  return (
    <>
      <HeroNavbar />
      <main className="min-h-screen flex flex-col">
        <Hero />
        <Features />
      </main>
    </>
  );
}
