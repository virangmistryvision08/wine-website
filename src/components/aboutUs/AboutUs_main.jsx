import React from "react";
import CommonFirstSection from "../CommonFirstSection";
import aboutUs_main_bg from "/aboutUs/main/about-us-main-bg.jpg";
import main_glasses from "/aboutUs/main/main-glasses.jpg";
import main_black from "/aboutUs/main/main-black.jpg";
import main_goldMedal from "/aboutUs/main/main-goldMedal.svg";
import main_couple from "/aboutUs/main/main-couple.jpg";
import main_group from "/aboutUs/main/main-group.jpg";

export default function AboutUs_main() {
  return (
    <>
      <CommonFirstSection
        productImage={aboutUs_main_bg}
        productType="About Us"
      />

      <div className="w-full flex flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#FFF1D2] text-gray-900 font-[Urbanist]">
        <div className="w-[90%] xl:w-[80%] mx-auto">
          {/* ---------------- TOP SECTION ---------------- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-14 lg:py-20 2xl:py-28 animate-fadeIn">
            {/* Image */}
            <div className="w-full h-full">
              <img
                src={main_glasses}
                alt="Wine toast"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold uppercase tracking-wide font-[Cormorant-Upright-bold] leading-tight">
                Elite Wine Selections – <br /> Pure Terroir. Zero Compromise.
              </h2>

              <p className="leading-relaxed text-sm md:text-[16px] opacity-80">
                Elite Wine Selections Inc. is a New York–based importer and
                wholesaler of premium, award-winning European dealcoholized
                wines (&lt;0.5% ABV) from Germany, France, Italy, and Spain.
                Many selections are organic and vegan, crafted to closely
                preserve the authentic aroma, mouthfeel, and character of
                traditional wines. We serve the fast-growing sober-curious and
                health-conscious communities seeking sophistication and
                creative, mindful drinking experiences without alcohol.
              </p>

              <p className="leading-relaxed text-sm md:text-[16px] opacity-80">
                Our partner vineyards combine centuries of heritage and terroir
                with cutting-edge dealcoholization methods such as advanced
                aroma recovery. This ensures that every bottle retains its
                original complexity, varietal character, and mouthfeel. Some
                selections are even barrel-aged, underscoring that these are
                authentic wines— not simply grape juice in disguise.
              </p>
            </div>
          </section>

          {/* ---------------- AWARDS SECTION ---------------- */}
          <section className="py-0 flex flex-col-reverse md:flex-row md:justify-between gap-5 animate-fadeIn delay-200">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-semibold mb-4 uppercase font-[Cormorant-Upright-bold] tracking-wider">
                Awards & Recognition
              </h3>

              <p className="leading-relaxed  text-sm md:text-[16px] opacity-80 mb-4">
                We proudly showcase wines from e.g. Bergdolt-Reif & Nett (Pfalz,
                Germany), a pioneer in artisanal dealcoholized winemaking, whose
                achievements include:
              </p>

              <p className="leading-relaxed  text-sm md:text-[16px] opacity-80 mb-4">
                Falstaff Alcohol-Free Trophy: Reverse Riesling (90 pts),
                Breakaway Pinot Blanc (90 pts), Breakaway Gewürztraminer (91
                pts), Reverse Sauvignon Blanc (90.5 pts)
              </p>

              <p className="leading-relaxed  text-sm md:text-[16px] opacity-80 mt-4">
                These accolades underline our commitment to offering
                award-winning wines that set the benchmark for the non-alcoholic
                category.
              </p>
            </div>

            {/* Award Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={main_black}
                alt="Falstaff award"
                className="w-full lg:w-80 rounded-xl"
              />
            </div>
          </section>

          {/* ---------------- GOLD MEDAL SECTION ---------------- */}
          <section className="py-14 lg:py-20 2xl:py-28 grid md:grid-cols-2 gap-8 items-center animate-fadeIn delay-300">
            <div className="flex justify-center">
              <img
                src={main_goldMedal}
                alt="Gold Medal Award"
                className="w-96"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold uppercase tracking-wide font-[Cormorant-Upright-bold] leading-tight">
                Elite Wine Selections – <br /> Pure Terroir. Zero Compromise.
              </h2>

              <div className="space-y-1">
                <p className="leading-relaxed  text-sm md:text-[16px] opacity-80">
                  Elite Wine Selections is a New York-based importer and
                  wholesaler specializing in premium, award-winning European
                  dealcoholized wines (&lt;1.0% ABV) primarily from Germany,
                  France, Italy, and Spain.
                </p>

                <p className="leading-relaxed  text-sm md:text-[16px] opacity-80">
                  We serve the fast-growing sober-curious and health-conscious
                  communities who seek sophistication without alcohol.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="w-full flex flex-col items-center bg-gradient-to-b from-[#FFFFFF] via-[#fff] to-[#FFF1D2] text-gray-900 font-[Urbanist]">
        {/* ---------------- TOP SECTION ---------------- */}
        <div className="w-[90%] xl:w-[80%] mx-auto py-10 lg:py-20 space-y-7 lg:space-y-20">
          <section className="grid xl:grid-cols-2 gap-5">
            {/* Image */}
            <div className="flex justify-center">
              <img
                src={main_couple}
                alt="Wine tasting"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Text Section */}
            <div className="flex xl:justify-center items-center">
              <div className="flex flex-col justify-center space-y-3">
                <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold uppercase tracking-wide font-[Cormorant-Upright-bold] leading-tight">
                  What Sets Us Apart
                </h2>

                <div className="space-y-2 ps-10 text-sm md:text-[18px] opacity-90 leading-relaxed">
                  <li>
                    Advanced aroma recovery that preserves varietal expression
                  </li>
                  <li>
                    Barrel-aging for depth and structure (rare in NA wine)
                  </li>
                  <li> Terroir-driven authenticity with European pedigree</li>
                  <li> Vegan selections</li>
                  <li> No added sugar for purity and wellness</li>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- CUSTOMERS SECTION ---------------- */}
          <section className="w-full text-center space-y-3">
            <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold uppercase tracking-wide font-[Cormorant-Upright-bold] leading-tight">
              Customers
            </h2>

            <p className="max-w-4xl mx-auto text-sm md:text-[16px] opacity-80 leading-relaxed">
              We supply specialty non-alcoholic retailers, fine-dining
              restaurants, boutique hotels, beverage caterers, social clubs,
              yacht and golf clubs, and online platforms. For partners seeking
              exclusivity, Elite also offers turnkey private-label solutions
              with boutique branding and premium packaging.
            </p>
          </section>
        </div>
      </div>

      {/* Vision Section */}
      <div className="w-full flex flex-col items-center bg-white text-gray-900 font-[Urbanist] py-10 lg:py-20">
        <section className="w-[90%] xl:w-[80%] flex flex-col-reverse xl:flex-row gap-5 items-center">
          {/* Left Text Block */}
          <div className="w-full xl:w-1/3 space-y-3 mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold uppercase tracking-wide font-[Cormorant-Upright-bold] leading-tight">
              Vision
            </h2>

            <p className="text-sm md:text-[16px] leading-relaxed opacity-90">
              With the U.S. non-alcoholic wine market projected to grow at
              double-digit rates, Elite Wine Selections positions itself as a
              pioneer in the premium European segment—bringing terroir-driven,
              award-winning wines to consumers who refuse to compromise on
              quality.
            </p>

            <p className="text-sm md:text-[16px] leading-relaxed opacity-90">
              We believe that enjoying wine is about ritual, elegance, and
              connection—not necessarily alcohol anymore.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full xl:w-1/2 flex justify-center">
            <img
              src={main_group}
              alt="Group enjoying wine together"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>
      </div>
    </>
  );
}
