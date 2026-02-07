import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import VisionMissionSection from '@/components/public/VisionMissionSection';
import ProgramSection from '@/components/public/ProgramSection';
import WhyChooseUsSection from '@/components/public/WhyChooseUsSection';
import MentorProfileSection from '@/components/public/MentorProfileSection';
import ContactSection from '@/components/public/ContactSection';
import GallerySection from '@/components/public/GallerySection';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <HeroSection />
      <div className="relative flex items-center py-5">
        <div className="grow border-t border-gray-400"></div> 
        <span className="mx-4 shrink text-gray-600 text-sm uppercase tracking-wider font-medium">
          <span className="text-black">LPK & LKP</span><span className="text-red-500"> DUA</span><span className="text-green-500"> BERKAH</span>
        </span>
        <div className="grow border-t border-gray-400"></div>
      </div>
      <AboutSection />
      <VisionMissionSection />
      <ProgramSection />
      <WhyChooseUsSection />
      <MentorProfileSection />
      <ContactSection />
      <GallerySection />
    </div>
  );
}