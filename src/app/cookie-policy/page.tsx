import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie Policy | WEDTEC EVENTS",
  description: "Find out about cookies and third-party content on the WEDTEC EVENTS website.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      introduction="This page explains cookies and similar browser technologies in connection with this website. The website does not currently provide account sign-in or a custom cookie preference tool."
      sections={[
        {
          heading: "What cookies are",
          paragraphs: [
            "Cookies are small text files that websites may store in your browser. Similar technologies can store or access information on your device. They may support basic site functions, remember preferences, or measure usage, depending on how a site is configured.",
          ],
        },
        {
          heading: "Cookies and this website",
          paragraphs: [
            "WEDTEC EVENTS does not currently intentionally use its own advertising or analytics cookies on this website. Website infrastructure or embedded third-party content may use technical storage or make requests that are governed by those providers’ own practices.",
            "This site includes externally hosted images and video, and links to social platforms. Loading external content or following those links may allow the relevant provider to use cookies or similar technologies under its own policy.",
          ],
        },
        {
          heading: "Managing cookies",
          paragraphs: [
            "You can use your browser settings to review, block, or delete cookies. Blocking some technologies may affect how third-party content or other websites work. For details, consult the help information for your browser.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "If the website’s use of cookies or similar technologies changes, this policy will be updated. Please review it occasionally for the latest information.",
          ],
        },
      ]}
    />
  );
}
