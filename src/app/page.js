import Header from './components/header/Header'
import HeroSection from './components/landing/HeroSection'
import Features from './components/landing/Features'
import CTA from './components/landing/CTA'

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSection/>
      <Features/>
      <CTA/>
    </div>
  );
}
