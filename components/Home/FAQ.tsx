import React from "react";
import HeadingTwo from "../reusable/HeadingTwo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
      <div className="flex flex-col gap-11">
        <div className="flex items-center justify-center">
          <HeadingTwo HeadingText={"Frequently Asked Question : FAQ"} />
        </div>
        <div className="flex gap-10">
          <div className="w-full lg:w-1/2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-[#111111] text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pb-8">
                  What are some must-visit places in Albania?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  Albania is home to incredible destinations, including [Popular
                  Place 1], [Popular Place 2], and [Popular Place 3]. Whether
                  you love historical sites, nature, or vibrant city life,
                  there’s something for everyone to explore.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-[#111111] text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pt-12 pb-8">
                  What are the key traditions and cultural customs I should
                  know?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  Albania is home to incredible destinations, including [Popular
                  Place 1], [Popular Place 2], and [Popular Place 3]. Whether
                  you love historical sites, nature, or vibrant city life,
                  there’s something for everyone to explore.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-[#111111] text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pt-12 pb-8">
                  Is Albania safe for tourists?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  Albania is home to incredible destinations, including [Popular
                  Place 1], [Popular Place 2], and [Popular Place 3]. Whether
                  you love historical sites, nature, or vibrant city life,
                  there’s something for everyone to explore.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-[#111111] text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pt-12">
                  What is the best time of year to visit?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  Albania is home to incredible destinations, including [Popular
                  Place 1], [Popular Place 2], and [Popular Place 3]. Whether
                  you love historical sites, nature, or vibrant city life,
                  there’s something for everyone to explore.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full lg:w-1/2">
            <img src="/images/faq.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
