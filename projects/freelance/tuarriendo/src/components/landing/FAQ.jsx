import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ({ questions }) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4">
      {questions.map((question, index) => (
        <AccordionItem value={`item-${index}`} key={index} className="border-b-[2px] border-b-third-400 px-8 lg:px-0">
          <AccordionTrigger className="w-full text-left py-3 pb-4 bg-third-200 font-semibold text-xl lg:text-2xl">
            {question.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 pt-3 pb-6 text-lg lg:text-xl">{question.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQ;
