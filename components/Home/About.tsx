"use client";

import React, { useEffect, useRef } from "react";
import HeadingTwo from "../reusable/HeadingTwo";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    countersRef.current.forEach((el) => {
      if (!el) return;
      const endValue = parseInt(el.dataset.value || "0");

      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 2,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=10%", // bottom 10% above
            toggleActions: "play none none none",
          },
          snap: { innerText: 1 },
          onUpdate: function () {
            el.innerText = `${Math.floor(+el.innerText)}+`;
          },
        }
      );
    });
  }, []);

  return (
    <div className="max-w-[1352px] px-4 py-10 md:py-20 mx-auto">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
        <div className="w-full lg:w-[66%] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="w-full lg:w-[52%]">
              <img
                className="w-full h-full object-cover"
                src="/images/hs.png"
                alt="Hill place"
              />
            </div>
            <div className="w-full lg:w-[48%] flex flex-col items-center justify-start">
              <HeadingTwo HeadingText={"We are always ready to discover our Albania"} />
              <p className="text-[16px] leading-[160%] tracking-[0.5px] font-normal text-[#4A4A4A]">
                Nestled along the breathtaking Albanian Riviera, Elysian Pearl Resort is a sanctuary
                of elegance and tranquility. Overlooking crystal-clear turquoise waters and
                surrounded by lush Mediterranean landscapes,
              </p>
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#FEE9E9]"></div>
          <div className="flex flex-wrap items-center justify-between gap-6 pr-16">
            {[
              { count: 2000, label: "Tourist have visited" },
              { count: 576, label: "Tourist have visited" },
              { count: 654, label: "Tourist have visited" },
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-start gap-2">
                  <div
                    ref={(el) => {
                      countersRef.current[index] = el;
                    }}
                    data-value={item.count}
                    className="countNumber text-[48px] font-bold leading-[120%] text-[#121212]"
                  >
                    0+
                  </div>
                  <p className="text-[16px] font-normal leading-[160%] text-[#4A4A4A] tracking-[0.5px]">
                    {item.label}
                  </p>
                </div>
                {index !== 2 && (
                  <div className="hidden sm:block w-[1px] h-[80px] bg-[#FEE9E9]"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="w-2/3 lg:w-[32%] mx-auto">
          <img
            className="w-full h-full object-cover"
            src="/images/hill.png"
            alt="Hill place"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
