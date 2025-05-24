"use client";
import Details from "@/components/sections/property/Details";
import ContactForm from "@/components/sections/property/ContactForm";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";

function page() {
  return (
    <>
      <Header />
      <Details />
      <ContactForm />
      <Footer />
    </>
  );
}

export default page;
