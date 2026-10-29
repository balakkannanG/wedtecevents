import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | WEDTEC EVENTS",
  description: "Read the website terms and conditions for WEDTEC EVENTS.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      introduction="These terms apply to your use of the WEDTEC EVENTS website. By using the website, you agree to use it lawfully and in a way that does not interfere with other visitors or the operation of the site."
      sections={[
        {
          heading: "Website information",
          paragraphs: [
            "The website provides general information about WEDTEC EVENTS and its wedding and event planning services. Content is provided for information and inspiration; it is not a confirmed offer, quotation, or guarantee that a particular service, supplier, venue, or date is available.",
            "Images, videos, testimonials, ratings, and other examples identified as samples or placeholders are illustrative only and should not be treated as verified WEDTEC client work or reviews.",
          ],
        },
        {
          heading: "Inquiries and bookings",
          paragraphs: [
            "Submitting an inquiry does not reserve a date, confirm a service, or create a client relationship. The inquiry form prepares an email for you to review and send. Any event booking, scope of work, fee, payment schedule, cancellation arrangement, and other service terms must be agreed separately in writing with WEDTEC EVENTS.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You may browse the website for personal, non-commercial purposes. You must not misuse the website, attempt to disrupt its operation, access it through unauthorized means, or copy and republish its content without permission.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "Unless otherwise indicated, website text, branding, layout, and original design elements are provided by or for WEDTEC EVENTS. Third-party images, videos, and marks remain subject to their respective owners’ rights and licenses. No ownership rights are transferred by viewing or using this website.",
          ],
        },
        {
          heading: "External websites",
          paragraphs: [
            "The website may link to third-party websites or embed content hosted by third parties. WEDTEC EVENTS does not control those websites or their content, availability, or policies. Following external links is your choice and subject to the relevant third party’s terms.",
          ],
        },
        {
          heading: "Availability and liability",
          paragraphs: [
            "We aim to keep the website useful and available, but do not guarantee that it will always be uninterrupted, current, or error-free. To the extent permitted by applicable law, WEDTEC EVENTS is not responsible for losses arising solely from reliance on general website information or temporary unavailability of the site.",
          ],
        },
        {
          heading: "Updates and contact",
          paragraphs: [
            "These terms may be updated when needed; the date shown above indicates the latest update. If you have questions about these terms or are considering a booking, please contact hello@wedtecevents.com. The terms of any confirmed event service will be set out separately in writing.",
          ],
        },
      ]}
    />
  );
}
