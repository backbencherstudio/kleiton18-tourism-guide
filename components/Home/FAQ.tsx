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
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-[#111111] text-[16px] lg:text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pb-8">
                  Is albania safe for tourists?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  Crime rates are low, especially towards foreigners, and locals
                  are known for their hospitality. Petty theft can happen,
                  mainly in crowded areas, so normal precautions apply. Roads in
                  rural areas may be challenging, but major cities and tourist
                  spots are secure.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-[#111111] text-[16px] lg:text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pt-12 pb-8">
                  What are the key traditions and cultural customs I should
                  know?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  Albania values hospitality, with guests often offered food,
                  drink, and gifts. Elders are respected, and religious
                  diversity is prominent. Traditional customs, like the “Kanun”
                  code in rural areas, influence social behavior. Celebrations,
                  especially weddings, feature lively dances and music,
                  showcasing Albania’s deep-rooted community and cultural
                  spirit.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-[#111111] text-[16px] lg:text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pt-12 pb-8">
                  What is the best time of year to visit?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  The best time to visit Albania is during spring (April to
                  June) and early autumn (September to October). These months
                  offer pleasant weather, fewer tourists, and vibrant
                  landscapes. Summer (July and August) is ideal for beach
                  lovers, though it can be crowded along the coast.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-[#111111] text-[16px] lg:text-[20px] font-medium leading-[150%] no-underline hover:no-underline cursor-pointer pt-12">
                  What are some must-visit places in Albania?
                </AccordionTrigger>
                <AccordionContent className="text-[#4A4C56] text-[16px] font-normal leading-[160%] tracking-[0.5px]">
                  Must-visit places in Albania include the UNESCO-listed cities
                  of Berat and Gjirokastër, the stunning beaches of Ksamil, the
                  ancient ruins of Butrint, the picturesque Albanian Riviera,
                  Theth and the Accursed Mountains for hiking, and Shkodër with
                  its historical Rozafa Castle and Lake Shkodër for nature
                  lovers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-2/3 lg:w-1/2 mx-auto">
            <img src="/images/faq.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
