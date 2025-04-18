import FAQ from "@/components/Home/FAQ";
import Footer from "@/components/Home/Footer";
import NavbarLight from "@/components/Listings/NavbarLight";
import HotelListings from "@/components/Listings/HotelListings";
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
