import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import React from "react";

// FAQ structure
const FAQ_SECTIONS = [
  {
    title: "🧾 General FAQ",
    items: [
      {
        question: "What exactly does your service do?",
        answer: (
          <>
            We help you convert your corporate well-being amount into a <b>freedom voucher</b> that lets you buy <b>anything from anywhere</b> — Amazon, Flipkart, Nykaa, and more. You're no longer stuck with a fixed list of products.
          </>
        ),
      },
      {
        question: "What is a freedom voucher?",
        answer: (
          <>
            It's a digital voucher you get from us equal to your well-being allowance, which you can use to <b>purchase any product or service you want</b> — from any platform.
          </>
        ),
      },
      {
        question: "How is this better than my company's well-being portal?",
        answer: (
          <>
            Your company's portal usually restricts your options to a few products or vendors. With our voucher, <b>you get full freedom of choice</b> — no limitations, no forced purchases.
          </>
        ),
      },
      {
        question: "Is this legal and tax-compliant?",
        answer: (
          <>
            Yes. We are a <b>GST-registered vendor</b>, and we provide a <b>GST invoice</b> for every voucher purchased, making it fully compliant with Indian tax laws.
          </>
        ),
      },
      {
        question: "Do I need to tell my company about this?",
        answer: (
          <>
            No. You're using your <b>own well-being amount</b> to buy a service from us. You'll get an invoice which you can submit to your employer for reimbursement.
          </>
        ),
      },
      {
        question: "Are you overcharging us? Is this even legal?",
        answer: (
          <>
            Not at all. We never charge above MRP. Prices may vary like on any platform — just like buying something for ₹10,000 today and seeing it drop to ₹9,000 tomorrow. It's completely legal and based on service value, not overpricing.
          </>
        ),
      },
    ],
  },
  {
    title: "🛍️ Purchasing FAQ",
    items: [
      {
        question: "How do I make a purchase?",
        answer: (
          <ol className="list-decimal list-inside">
            <li>Choose the product you want from any online store (Amazon, Flipkart, etc).</li>
            <li>Tell us what you’re buying.</li>
            <li>We’ll purchase it on your behalf using your freedom voucher.</li>
            <li>It gets delivered directly to your address.</li>
            <li>You get an invoice from us to submit to your employer.</li>
          </ol>
        ),
      },
      {
        question: "Will the product be shipped to my home?",
        answer: (
          <>
            Yes. The product will be delivered <b>directly to your address</b> from the original seller (like Amazon or Flipkart).
          </>
        ),
      },
      {
        question: "Do you offer COD (Cash on Delivery)?",
        answer: (
          <>
            No. Since we make the purchase on your behalf, the payment is made in full online at the time of the order.
          </>
        ),
      },
      {
        question: "Can I order multiple products?",
        answer: (
          <>
            Absolutely. As long as the <b>total value stays within your well-being budget</b>, you can buy multiple products.
          </>
        ),
      },
      {
        question: "What if the product I want costs more than my voucher?",
        answer: (
          <>
            You can pay the difference separately. We’ll share a payment link for the extra amount.
          </>
        ),
      },
    ],
  },
  {
    title: "💸 Payment & Invoice FAQ",
    items: [
      {
        question: "Will I get a GST invoice for the voucher?",
        answer: (
          <>
            Yes. We will issue a <b>GST invoice under your name</b> and address for the amount you paid us — this is the invoice you submit to your company.
          </>
        ),
      },
      {
        question: "What name and address will be on the invoice?",
        answer: (
          <>
            Your name and address — the same details you provide when placing the order. This ensures the invoice matches your reimbursement requirements.
          </>
        ),
      },
      {
        question: "What if my company rejects the invoice?",
        answer: (
          <>
            We follow all standard <b>invoice format and compliance rules</b> under GST. If your company has specific format requirements, share them with us in advance.
          </>
        ),
      },
    ],
  },
  {
    title: "🚚 Shipping & Returns FAQ",
    items: [
      {
        question: "Can I track my order?",
        answer: (
          <>
            Yes. Once we place your order, we’ll share the tracking ID and updates from the seller (Amazon, Flipkart, etc).
          </>
        ),
      },
      {
        question: "What if the product is defective or I want to return it?",
        answer: (
          <>
            Returns will follow the policy of the original seller (Amazon/Flipkart). We’ll assist you with initiating returns or replacements.
          </>
        ),
      },
      {
        question: "Who handles warranty claims?",
        answer: (
          <>
            The product warranty stays valid as per the original brand/seller. You can claim warranty using the invoice from the seller.
          </>
        ),
      },
    ],
  },
  {
    title: "🔁 Other Common Questions",
    items: [
      {
        question: "Can I use this service more than once?",
        answer: (
          <>
            Yes. Every time you receive a well-being allowance, you can use our service to redeem it with complete freedom.
          </>
        ),
      },
      {
        question: "Is there a service charge?",
        answer: (
          <>
            Yes, we charge a small commission/service fee to manage purchase, invoicing, and GST compliance. This will be clearly mentioned in your quote.
          </>
        ),
      },
      {
        question: "What types of products can I buy?",
        answer: (
          <>
            Literally <b>anything</b> – electronics, books, fashion, fitness gear, groceries, personal care – you name it.
          </>
        ),
      },
      {
        question: "What if I don’t use up my entire well-being allowance?",
        answer: (
          <>
            You can either:
            <ul className="list-disc list-inside ml-4">
              <li>Buy additional small items, or</li>
              <li>Let us refund the balance amount (depending on your employer&apos;s policy).</li>
            </ul>
          </>
        ),
      },
    ],
  },
];

type Props = {
  className?: string;
};

const FaqAccordion: React.FC<Props> = ({ className = "" }) => (
  <div className={`w-full space-y-8 ${className}`}>
    {FAQ_SECTIONS.map((section, i) => (
      <div key={section.title}>
        <h3 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
          {section.title}
        </h3>
        <Accordion type="single" collapsible className="space-y-3">
          {section.items.map((item, idx) => (
            <AccordionItem value={`faq-${i}-${idx}`} key={item.question}>
              <Card className="bg-white/95 rounded-xl shadow p-0 border-0">
                <AccordionTrigger className="px-5 py-4 text-lg font-bold hover:text-neon-pink">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-4 pt-0 text-base text-gray-700">{item.answer}</AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    ))}
  </div>
);

export default FaqAccordion;
