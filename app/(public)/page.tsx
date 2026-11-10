"use server"

import HeroSection from "./_components/home/HeroSection";
import PropertiesSection from "./_components/home/PropertiesSection";


const HomePage = async() => {
  return (
    <div>
      <HeroSection/>
      <PropertiesSection />
    </div>
  );
}

export default HomePage;