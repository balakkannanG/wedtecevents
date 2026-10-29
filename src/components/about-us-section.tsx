"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutUsSection() {
  return (
    <section
      aria-labelledby="about-us-heading"
      className="bg-[#ffecd1] px-[7%] py-16 sm:py-20 lg:py-28"
      id="about"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
        <motion.div
          className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[540px]"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1400&q=85"
            alt="Wedding table details thoughtfully arranged by WEDTEC EVENTS"
            fill
            sizes="(max-width: 767px) 86vw, 50vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          className="max-w-[540px] md:py-8"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        >
          <span className="text-[9px] font-medium tracking-[0.2em] text-[#3c000c]">
            A LITTLE ABOUT WEDTEC
          </span>
          <h2
            className="mb-5 mt-4 font-serif text-[clamp(38px,5vw,62px)] font-normal leading-[1.08] tracking-[-0.045em] text-[#3c000c]"
            id="about-us-heading"
          >
            People first. <em className="text-[#3c000c]">Always.</em>
          </h2>
          <p className="mb-5 text-[13px] leading-[1.9] text-[#77736c]">
            WEDTEC EVENTS is here to make wedding planning feel more personal, clear and joyful.
            We bring creative thinking, thoughtful coordination and care to every detail, so your
            celebration reflects the people and traditions that make your story yours.
          </p>
          <p className="mb-7 text-[13px] leading-[1.9] text-[#77736c]">
            From finding the right setting to bringing all the moving parts together, our team is
            alongside you through the journey—making space for you to be present and enjoy the
            moments that matter.
          </p>
          <a
            className="inline-flex items-center gap-4 border-b border-[#c9c4b8] pb-[9px] text-[10px] tracking-[0.025em] text-[#3c000c] transition-colors hover:border-[#3c000c] hover:text-[#3c000c]"
            href="#contact"
          >
            Get to know our team
            <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M4.5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
