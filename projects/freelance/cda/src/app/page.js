import HeroSection from '@/components/sections/landing/HeroSection'
import Services from '@/components/sections/landing/Services'

export default function Home() {
  return (
    <div className='bg-gray-100'>
      <HeroSection/>
      <Services/>
    </div>
  );
}
