import React from "react";
import { useParams } from "react-router-dom";
import CommonFirstSection from "../CommonFirstSection";
import aboutUs_bergdolt_bg from "/aboutUs/bergdolt/bergdolt-bg.png";
import aboutUs_bergdolt_bottle from "/aboutUs/bergdolt/bergdolt-bottle.svg";

const AboutUs_Bergdolt = () => {
  const { slug } = useParams();
  console.log(slug, "slug");

  return (
    <>
      <CommonFirstSection
        productImage={aboutUs_bergdolt_bg}
        productType={slug}
      />

      <div className="w-full bg-white text-gray-900 flex flex-col items-center px-4 md:px-10 lg:px-20 py-16">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-wide text-center mb-16">
          WEINGUT BERGDOLT-REIF & NETT (PALATINATE, GERMANY)
        </h1>

        {/* Top Section */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Bottle Image */}
          <div className="flex justify-center">
            <img
              src={aboutUs_bergdolt_bottle}
              alt="Wine Bottle"
              className="w-full object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-10">
            {/* History */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif mb-4">HISTORY</h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Based in Duttweiler between Speyer and Neustadt an der
                Weinstraße, the estate traces its roots back to 1838, when the
                sandstone cellars were built. After a family split around 1900
                and a later reconfiguration that united the current name, the
                winery is now run by the fifth generation of the Nett family. In
                2011 they revived horse-powered cultivation in select top
                parcels to aerate soils and sharpen site expression.
              </p>
            </div>

            {/* Terroir */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif mb-4">TERROIR</h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Vines grow at 120–140 m in an almost Mediterranean pocket of the
                Pfalz where kiwis, figs and almonds also ripen. Deep loess- and
                loam-rich soils laced with fine limestone veins are the
                signature here—excellent for Pinot Blanc/Gris and aromatic
                grapes; warmer sites also ripen Merlot, Shiraz, Cabernet
                Sauvignon and Lagrein. Regionally, the Palatinate area is one of
                Germany’s warmest, sunniest winegrowing areas, which underpins
                the ripe, generous fruit profile.
              </p>
            </div>

            {/* Philosophy */}
            <div>
              <h2 className="text-xl md:text-2xl font-serif mb-4">
                PHILOSOPHY
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                Dem Wein "Zeit und Raum geben"—give the wine time and space.
                Work rhythms follow the vineyard; the cellar approach is gentle
                pressing, restrained fermentations and extended fine-lees aging
                to preserve clarity and texture. Variety–parcel matching is
                central to style.
              </p>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-serif tracking-wide text-center mt-24 mb-12">
          AWARDS & RECOGNITION (HIGHLIGHTS)
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center">
          {/* Left Award */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/award1.png"
              alt="Falstaff Award"
              className="w-60 md:w-72 lg:w-80 object-contain"
            />
            <p className="text-xs md:text-sm text-gray-700 mt-4 max-w-xs">
              Falstaff (Alcohol-Free Trophy): Reverse Riesling 90 pts; Breakaway
              Pinot Blanc 90 pts; Breakaway Gewürztraminer 91 pts; Reverse
              Sauvignon Blanc 90.5 pts.
            </p>
          </div>

          {/* Right Award */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/award2.png"
              alt="International Non Alcoholic Competition Medal"
              className="w-60 md:w-72 lg:w-80 object-contain"
            />
            <p className="text-xs md:text-sm text-gray-700 mt-4 max-w-xs">
              Gold Medal For Best Merlot 2025; Best of Show Pinot Blanc for
              Breakaway Pinot Blanc (Bergdolt-Reif & Nett); Gold for Reverse
              Pinot Bianco.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs_Bergdolt;
