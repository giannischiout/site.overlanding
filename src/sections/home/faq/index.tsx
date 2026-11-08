import { Mail, MessageCircle, Phone, Plus } from "lucide-react";
import { FAQ } from "@/data/faq";

export function FaqSection() {
  // Lets search engines show the answers as rich results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="grid scroll-mt-[var(--nav-height)] gap-10 py-16 md:py-24 lg:grid-cols-[360px_1fr] lg:gap-16"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="flex flex-col gap-6 lg:sticky lg:top-[calc(var(--nav-height)+32px)] lg:self-start">
        {/* A quieter heading than the sections above: here the questions are the content */}
        <div className="flex flex-col gap-2">
          <h2 id="faq-title" className="text-3xl font-bold tracking-[-0.02em] text-balance">
            Good to know before you land
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The questions we hear most from people driving Iceland for the first time.
          </p>
        </div>

        <div className="flex flex-col gap-4 rounded-panel bg-white p-6 ring-1 ring-black/[0.05]">
          <p className="flex items-center gap-2 font-bold">
            <MessageCircle size={18} className="text-link" />
            Still have a question?
          </p>
          <p className="text-muted-foreground text-[15px] leading-relaxed">
            Our team in Keflavík answers within the hour, every day of the year.
          </p>
          <div className="flex flex-col gap-2 text-[15px] font-semibold">
            <a href="tel:+3545550199" className="hover:text-link flex items-center gap-2">
              <Phone size={16} className="text-muted-foreground" /> +354 555 0199
            </a>
            <a href="mailto:hello@auroracampers.is" className="hover:text-link flex items-center gap-2">
              <Mail size={16} className="text-muted-foreground" /> hello@auroracampers.is
            </a>
          </div>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {FAQ.map((item, index) => (
          <li key={item.question}>
            <details
              name="faq"
              open={index === 0}
              className="group rounded-panel bg-white ring-1 ring-black/[0.05] transition-shadow duration-300 open:shadow-[0_18px_40px_-28px_rgb(6_20_16/0.5)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="bg-sky group-open:bg-basalt group-open:text-aurora flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300">
                  <Plus
                    size={18}
                    strokeWidth={2.25}
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-open:rotate-45"
                  />
                </span>
              </summary>
              <p className="text-muted-foreground max-w-[68ch] px-6 pb-6 text-[16px] leading-relaxed">
                {item.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
