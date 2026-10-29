import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | WEDTEC EVENTS",
  description: "Learn how WEDTEC EVENTS handles information when you visit our website or contact our team.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      introduction="This policy explains what information may be involved when you visit the WEDTEC EVENTS website and how to contact us with privacy questions. Please read it together with the terms and cookie information linked below."
      sections={[
        {
          heading: "Information you choose to provide",
          paragraphs: [
            "The booking inquiry form on this website prepares an email in your device’s default email application. It does not submit the form to a WEDTEC EVENTS server. If you choose to send that email, the information in it is delivered through your email provider and may be received by WEDTEC EVENTS at hello@wedtecevents.com.",
            "The details you may choose to include can include your name, email address, phone number, event type, date, location, guest count, service interests, and any message you add. Please only include information you are comfortable sharing.",
          ],
        },
        {
          heading: "How inquiry information is used",
          paragraphs: [
            "Information you send to us may be used to respond to your inquiry, discuss event planning services, and communicate with you about your request. The website itself does not create a booking or contract when you select the inquiry button.",
            "Email providers and other services you use to send or receive a message process information under their own privacy policies. Contact us if you would like to ask about a message you have sent to WEDTEC EVENTS.",
          ],
        },
        {
          heading: "Website content and third-party services",
          paragraphs: [
            "The website may display images or videos hosted by third-party providers and link to social media platforms. When your browser requests content from an external provider or you follow an external link, that provider may receive technical information such as your IP address and browser details. Their own policies govern that processing.",
          ],
        },
        {
          heading: "Retention and your choices",
          paragraphs: [
            "Messages sent to WEDTEC EVENTS may remain in the relevant email accounts for as long as needed to respond and maintain the conversation. You can contact us to request access to, correction of, or deletion of information you have sent, subject to any applicable legal obligations.",
          ],
        },
        {
          heading: "Children’s privacy",
          paragraphs: [
            "This website is intended for people planning or supporting events and is not directed to children. Please do not send children’s personal information through the inquiry form.",
          ],
        },
        {
          heading: "Changes to this policy",
          paragraphs: [
            "We may update this page as the website or our practices change. The date at the top indicates when this page was last updated. Please check this page periodically for the current version.",
          ],
        },
      ]}
    />
  );
}
