import {
  ContactSection,
  FaqSection,
  HeroSection,
  OurGallerySection,
  OurWorkSection,
  ClientTestimonialsSection,
  QuoteSection,
  ServicesSection,
  SiteFooter,
  SiteHeader,
  OurResultsSection,
  PlanStrategySection,
} from "@/components/site-sections";
import { AboutUsSection } from "@/components/about-us-section";
import { UspSection } from "@/components/usp-section";
import { ViewportReveal } from "@/components/viewport-reveal";
import Image from "next/image";
export default function Home() {
  return (
    <main>
      <SiteHeader />
      <ViewportReveal><HeroSection /></ViewportReveal>
      <ViewportReveal><UspSection /></ViewportReveal>
      <ViewportReveal><AboutUsSection /></ViewportReveal>
    
      <ViewportReveal><OurWorkSection /></ViewportReveal>
      <ViewportReveal><PlanStrategySection /></ViewportReveal>
      <ViewportReveal><ClientTestimonialsSection /></ViewportReveal>
      <ViewportReveal><ServicesSection /></ViewportReveal>
      <ViewportReveal><OurResultsSection /></ViewportReveal>
      <ViewportReveal><QuoteSection /></ViewportReveal>
      <ViewportReveal><OurGallerySection /></ViewportReveal>
      <ViewportReveal><FaqSection /></ViewportReveal>
      <ViewportReveal><ContactSection /></ViewportReveal>
      <ViewportReveal><SiteFooter /></ViewportReveal>
    </main>
  );
}
