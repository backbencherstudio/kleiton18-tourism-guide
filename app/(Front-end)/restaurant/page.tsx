import Navbar from "@/components/Home/Navbar";
import FAQ from "@/components/Home/FAQ";
import Footer from "@/components/Home/Footer";
import NavbarLight from "@/components/Listings/NavbarLight";
import HotelListings from "@/components/Listings/HotelListings";
import RestaurantListings from "@/components/Listings/RestaurantListings";
export default function Restaurant() {
  return (
    <div className="">
      <NavbarLight />
      <RestaurantListings />
      <FAQ />
      <Footer />
    </div>
  );
}
