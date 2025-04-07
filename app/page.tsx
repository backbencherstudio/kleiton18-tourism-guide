import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import HotelListing from "@/components/Home/HotelListing";
import Navbar from "@/components/Home/Navbar";
import Advice from "@/components/Home/Advice";
import RestaurantListing from "@/components/Home/RestaurantListing";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <HotelListing />
      <Advice />
      <RestaurantListing />
    </div>
  );
}
