import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@shared/schema";

interface FaqSectionProps {
  faqs: Faq[];
  title?: string;
}

export function FaqSection({ faqs, title = "Frequently Asked Questions" }: FaqSectionProps) {
  if (faqs.length === 0) return null;

  return (
    <section className="py-8" data-testid="section-faq">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={faq.id} 
            value={faq.id}
            className="bg-card border border-border/50 rounded-lg px-4 data-[state=open]:border-primary/20"
          >
            <AccordionTrigger className="text-left py-4 hover:no-underline" data-testid={`button-faq-${index}`}>
              <span className="font-medium pr-4">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
