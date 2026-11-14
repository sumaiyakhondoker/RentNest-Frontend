"use server"

import HeroSection from "./_components/home/HeroSection";
import PropertiesSection from "./_components/home/PropertiesSection";
import CategoriesSection from "./_components/home/CategoriesSection";


const HomePage = async() => {
  return (
    <div>
      <HeroSection/>
      <PropertiesSection />
      <CategoriesSection />
    </div>
  );
}

export default HomePage;
