import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Menu from "@/components/Menu";
import Specialties from "@/components/Specialties";
import Gallery from "@/components/Gallery";
import Quote from "@/components/Quote";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import MobileActions from "@/components/MobileActions";

export default function Home() {
  return (
    <>
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Menu />
        <Specialties />
        <Gallery />
        <Quote />
        <Reservation />
      </main>
      <Footer />
      <MobileActions />
    </>
  );
}
