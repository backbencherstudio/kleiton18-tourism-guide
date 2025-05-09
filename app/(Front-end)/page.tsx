import About from "@/components/Home/About";
import Hero from "@/components/Home/Hero";
import HotelListing from "@/components/Home/HotelListing";
import Navbar from "@/components/Home/Navbar";
import Advice from "@/components/Home/Advice";
import RestaurantListing from "@/components/Home/RestaurantListing";
import TraditionalDish from "@/components/Home/TraditionalDish";
import VisitArea from "@/components/Home/VisitArea";
import FAQ from "@/components/Home/FAQ";
import Footer from "@/components/Home/Footer";
export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <HotelListing />
      <Advice />
      <RestaurantListing />
      <TraditionalDish />
      <VisitArea />
      <FAQ />
      <Footer />
    </div>
  );
}
