import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import RunningCampaigns from "@/components/home/RunningCampaigns";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export default function Home() {
  return (
    <>
      <Hero />
      <RunningCampaigns />
      <HowItWorks />
      <WhyChooseUs />
    </>
  );
}