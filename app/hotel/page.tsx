import Navbar from "@/components/Home/Navbar";
import FAQ from "@/components/Home/FAQ";
import Footer from "@/components/Home/Footer";
import NavbarLight from "@/components/Hotel/NavbarLight";
import HotelListings from "@/components/Hotel/HotelListings";
export default function Hotel() {
  return (
    <div className="">
      <NavbarLight />
      <HotelListings />
      <FAQ />
      <Footer />
    </div>
  );
}
