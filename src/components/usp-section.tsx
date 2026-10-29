"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

const uspStats = [
  { value: 20, label: "Years Legacy" },
  { value: 1200, label: "Experiences Created" },
  { value: 100, label: "Happy Clients" },
  { value: 300, label: "Destinations Covered" },
];

function AnimatedStat({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.6 });
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-IN"),
  );

  useEffect(() => {
    if (!isInView) return;

    count.set(0);
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: 0.55 }}
    >
      <div className="font-sans text-[clamp(38px,5vw,68px)] font-bold leading-none tracking-[-0.055em] text-black">
        <motion.span aria-label={`${value}+`}>{roundedCount}</motion.span>+
      </div>
      <p className="mb-0 mt-4 text-[clamp(12px,1.3vw,18px)] leading-tight text-[#77736c]">
        {label}
      </p>
    </motion.div>
  );
}

export function UspSection() {
  return (
    <section
      aria-labelledby="usp-heading"
      className="bg-[#ffecd1] px-[7%] py-14 sm:py-16 lg:py-[76px]"
      id="wedtec-at-a-glance"
    >
      <div className="mx-auto max-w-[1370px]">
        <motion.div
          className="mx-auto mb-10 max-w-[650px] text-center sm:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[9px] font-medium tracking-[0.2em] text-[#3c000c]">
            WEDTEC EVENTS, AT A GLANCE
          </span>
          <h2
            className="mb-4 mt-3 font-serif text-[clamp(30px,4vw,48px)] font-normal leading-tight tracking-[-0.04em] text-[#3c000c]"
            id="usp-heading"
          >
            Thoughtful celebrations,{" "}
            <em className="text-[#3c000c]">lasting memories.</em>
          </h2>
          <p className="mx-auto mb-0 max-w-[540px] text-[13px] leading-[1.8] text-[#77736c]">
            Every number represents a moment, a gathering and a story shared. We bring care,
            creativity and considered planning to every celebration we create.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-4 sm:gap-6">
          {uspStats.map((stat) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
