import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  introduction: string;
  sections: LegalSection[];
};

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-and-conditions", label: "Terms & conditions" },
  { href: "/cookie-policy", label: "Cookie policy" },
];

export function LegalPage({ title, introduction, sections }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#ffecd1]">
      <header className="border-b border-[#e3ba6f]/25 bg-[#090908]">
        <div className="mx-auto flex w-[min(1120px,88%)] items-center justify-between gap-5 py-5">
          <Link aria-label="WEDTEC EVENTS home" className="flex flex-col gap-1" href="/">
            <BrandLogo className="h-auto w-[240px] max-sm:w-[158px]" />
          </Link>
          <Link className="text-[10px] tracking-[0.06em] text-[#e3ba6f] transition-colors hover:text-white" href="/">
            Back to home
          </Link>
        </div>
      </header>

      <article className="mx-auto w-[min(820px,88%)] py-14 sm:py-20">
        <span className="text-[9px] tracking-[0.2em] text-[#3c000c]">WEDTEC EVENTS · WEBSITE POLICIES</span>
        <h1 className="mt-4 font-serif text-[clamp(38px,6vw,60px)] font-normal leading-[1.08] tracking-[-0.045em] text-[#3c000c]">
          {title}
        </h1>
        <p className="mt-5 border-l-2 border-[#e3ba6f] pl-5 text-[13px] leading-[1.9] text-[#68645e]">
          {introduction}
        </p>
        <p className="mt-4 text-[10px] text-[#888178]">Last updated: 29 October 2026</p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-[23px] font-normal text-[#3c000c]">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p className="mt-3 text-[12px] leading-[1.9] text-[#68645e]" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[12px] leading-[1.8] text-[#68645e]">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-md border border-[#e9e3da] bg-white p-5 sm:p-7">
          <h2 className="font-serif text-[21px] font-normal text-[#3c000c]">Questions about these policies?</h2>
          <p className="mt-2 text-[12px] leading-[1.8] text-[#68645e]">
            Contact WEDTEC EVENTS at{" "}
            <a className="text-[#3c000c] underline underline-offset-4" href="mailto:hello@wedtecevents.com">
              hello@wedtecevents.com
            </a>
            .
          </p>
        </section>

        <nav aria-label="Website policies" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#e2dcd2] pt-5">
          {policyLinks.map((link) => (
            <Link className="text-[10px] text-[#77736c] underline decoration-[#c9c4b8] underline-offset-4 transition-colors hover:text-[#3c000c]" href={link.href} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </article>
    </main>
  );
}
