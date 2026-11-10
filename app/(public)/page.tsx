"use server"

import { HeroSection } from "./_components/heroSection";
// import { PropertiesSection } from "./_components/propertiesSection";


const HomePage = async() => {
  return (
    <div>
      <HeroSection />
      {/* <PropertiesSection /> */}
    </div>
  );
}

export default HomePage;