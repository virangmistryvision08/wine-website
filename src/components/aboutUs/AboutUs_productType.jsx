import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CommonFirstSection from "../CommonFirstSection";
import aboutUs_bergdolt_bg from "/aboutUs/bergdolt/bergdolt-bg.png";
import aboutUs_lammJung_bg from "/aboutUs/lammJung/vineyard4.png";
import aboutUs_kvd_bg from "/aboutUs/kvd/kvd-bg.png";
import aboutUs_chateau_bg from "/aboutUs/chateau/chateau-bg.png";
import aboutUs_weingut_bg from "/aboutUs/weingut/weingut-bg.png";
import aboutUs_bergdolt_bottle from "/aboutUs/bergdolt/bergdolt-bottle.svg";
import main_black from "/aboutUs/main/main-black.jpg";
import goldMedal from "/Gold_Medal.webp";
import gold_bottle from "/aboutUs/bergdolt/gold_bottle.svg";
import aboutUs_bergdolt_bottle2 from "/aboutUs/bergdolt/bergdolt-bottle2.svg";
import vineyard1 from "/aboutUs/bergdolt/vineyard1.png";
import vineyard2 from "/aboutUs/bergdolt/vineyard2.png";
import vineyard3 from "/aboutUs/bergdolt/vineyard3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import aboutUs_lammJung_bottle from "/aboutUs/lammJung/aboutUs_lammJung_bottle.svg";
import vineyard4 from "/aboutUs/lammJung/vineyard4.png";
import vineyard5 from "/aboutUs/lammJung/vineyard5.png";
import vineyard6 from "/aboutUs/lammJung/vineyard6.png";
import aboutUs_kvd_bottle1 from "/aboutUs/kvd/kvd-bottle1.svg";
import aboutUs_kvd_bottle2 from "/aboutUs/kvd/kvd-bottle2.svg";
import vineyard7 from "/aboutUs/kvd/vineyards7.png";
import vineyard8 from "/aboutUs/kvd/vineyards8.png";
import vineyard9 from "/aboutUs/kvd/vineyards9.png";
import aboutUs_chateau_bottle1 from "/aboutUs/chateau/chateau-bottle1.svg";
import aboutUs_chateau_bottle2 from "/aboutUs/chateau/chateau-bottle2.svg";
import vineyard10 from "/aboutUs/chateau/vineyards10.png";
import vineyard11 from "/aboutUs/chateau/vineyards11.png";

import aboutUs_weingut_bottle from "/aboutUs/weingut/weingut-bottle.svg";
import vineyard13 from "/aboutUs/weingut/vineyards13.png";
import vineyard14 from "/aboutUs/weingut/vineyards14.png";
// import aboutUs from "./aboutUs.module.css"

const AboutUs_Bergdolt = () => {
  const { pathname } = useLocation();
  const lastPath = pathname.substring(pathname.lastIndexOf("/") + 1);
  const productType = lastPath.replaceAll("-", " ");
  const [showPagination, setShowPagination] = useState(true);

  const totalSlides = productType === "about us chateau closbde bouard" ? 2 : 3;

  const updatePagination = (swiper) => {
    let slidesPerView = swiper.params.slidesPerView;

    // For breakpoints, Swiper stores the real SPV in swiper.currentBreakpoint params
    if (swiper.currentBreakpoint && swiper.params.breakpoints) {
      slidesPerView =
        swiper.params.breakpoints[swiper.currentBreakpoint]?.slidesPerView ||
        slidesPerView;
    }

    // If all slides fit in screen → hide pagination
    // If not → show pagination
    setShowPagination(slidesPerView < totalSlides);
  };
  console.log(productType, "type");

  return (
    <>
      <CommonFirstSection
        productImage={
          productType === "about us bergdolt, reif & nett"
            ? aboutUs_bergdolt_bg
            : productType === "about us lamm jung"
            ? aboutUs_lammJung_bg
            : productType === "about us kvd strauch sektmanufaktur"
            ? aboutUs_kvd_bg
            : productType === "about us chateau closbde bouard"
            ? aboutUs_chateau_bg
            : productType === "about us weingut matthias anton" &&
              aboutUs_weingut_bg
        }
        productType={productType}
      />

      {/* about us Bergdolt, Reif & Nett */}
      {productType === "about us bergdolt, reif & nett" && (
        <>
          <section className="w-full bg-gradient-to-b from-[#fff] via-[#fff] to-[#FFF1D2]">
            <div className="w-[90%] xl:w-[80%] mx-auto text-gray-900 flex flex-col items-center py-10 xl:py-20 font-[Urbanist]">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide text-center mb-16 font-[Cormorant-Upright-bold]">
                WEINGUT BERGDOLT-REIF & NETT (PALATINATE, GERMANY)
              </h1>

              {/* Top Section */}
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5 items-center">
                {/* Bottle Image */}
                <div className="flex justify-center">
                  <img
                    src={aboutUs_bergdolt_bottle}
                    alt="Wine Bottle"
                    className="w-full object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-5">
                  {/* History */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      HISTORY
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Based in Duttweiler between Speyer and Neustadt an der
                      Weinstraße, the estate traces its roots back to 1838, when
                      the sandstone cellars were built. After a family split
                      around 1900 and a later reconfiguration that united the
                      current name, the winery is now run by the fifth
                      generation of the Nett family. In 2011 they revived
                      horse-powered cultivation in select top parcels to aerate
                      soils and sharpen site expression.
                    </p>
                  </div>

                  {/* Terroir */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      TERROIR
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Vines grow at 120–140 m in an almost Mediterranean pocket
                      of the Pfalz where kiwis, figs and almonds also ripen.
                      Deep loess- and loam-rich soils laced with fine limestone
                      veins are the signature here—excellent for Pinot
                      Blanc/Gris and aromatic grapes; warmer sites also ripen
                      Merlot, Shiraz, Cabernet Sauvignon and Lagrein.
                      Regionally, the Palatinate area is one of Germany’s
                      warmest, sunniest winegrowing areas, which underpins the
                      ripe, generous fruit profile.
                    </p>
                  </div>

                  {/* Philosophy */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      PHILOSOPHY
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Dem Wein "Zeit und Raum geben"—give the wine time and
                      space. Work rhythms follow the vineyard; the cellar
                      approach is gentle pressing, restrained fermentations and
                      extended fine-lees aging to preserve clarity and texture.
                      Variety–parcel matching is central to style.
                    </p>
                  </div>
                </div>
              </div>

              {/* Awards Section */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-wide text-center mt-16 mb-8 xl:mt-24 xl:mb-14 font-[Cormorant-Upright-bold]">
                AWARDS & RECOGNITION (HIGHLIGHTS)
              </h2>

              <div className="w-[90%] xl:w-[80%] grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center">
                {/* Left Award */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={main_black}
                    alt="Falstaff Award"
                    className="h-auto md:h-[500px] object-contain"
                  />
                  <p className="text-sm md:text-base text-gray-700 mt-4 max-w-xs">
                    Falstaff (Alcohol-Free Trophy): Reverse Riesling 90 pts;
                    Breakaway Pinot Blanc 90 pts; Breakaway Gewürztraminer 91
                    pts; Reverse Sauvignon Blanc 90.5 pts.
                  </p>
                </div>

                {/* Right Award */}
                <div className="flex flex-col items-center text-center">
                  <img
                    src={goldMedal}
                    alt="International Non Alcoholic Competition Medal"
                    className="h-auto md:h-[500px] object-contain"
                  />
                  <p className="text-sm md:text-base text-gray-700 mt-1 max-w-xs">
                    <span className="font-semibold">
                      Gold Medal For Best Merlot 2025;
                    </span>{" "}
                    Best of Show Pinot Blanc for Breakaway Pinot Blanc
                    (Bergdolt-Reif & Nett); Gold for Reverse Pinot Bianco.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="w-[90%] xl:w-[80%] mx-auto py-10 md:pt-16 space-y-10 font-[Urbanist]">
              {/* ----------- TOP SECTION ----------- */}
              <div className="flex flex-col-reverse xl:flex-row gap-5 items-center">
                {/* LEFT TEXT */}
                <div className=" w-full xl:w-1/2">
                  <h2 className="text-2xl md:text-3xl 2xl:text-4xl tracking-wide font-[Cormorant-Upright-bold]">
                    THE DEALCOHOLIZED SPECTRUM <br /> (FOCUS)
                  </h2>

                  <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
                    Bergdolt-Reif & Nett is a category leader in premium
                    non-alcoholic wine, using the patented SOLOS process to
                    remove alcohol while preserving terroir, varietal character,
                    and the winemaker’s touch—an approach the estate positions
                    as unique for an artisanal producer. Typical finished
                    alcohol sits around 0.2% ABV.
                  </p>
                </div>

                {/* RIGHT IMAGE AREA */}
                <div className="flex justify-center w-full xl:w-1/2">
                  <img
                    src={gold_bottle}
                    alt="gold bottle"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* ----------- MIDDLE TITLE ----------- */}
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl 2xl:text-4xl tracking-wide font-[Cormorant-Upright-bold] mt-10 md:mt-14 lg:mt-20">
                  TWO LINES, TWO INTENTIONS
                </h2>
              </div>

              {/* ----------- TWO COLUMNS ----------- */}
              <div className="grid xl:grid-cols-2 gap-5 items-center">
                {/* LEFT BOTTLE IMAGE */}
                <div className="flex justify-center">
                  <img
                    src={aboutUs_bergdolt_bottle2}
                    alt="white wine bottle"
                    className="object-contain"
                  />
                </div>

                {/* RIGHT TEXT CONTENT */}
                <div className="space-y-5 font-[Urbanist]">
                  {/* REVERSE */}
                  <div>
                    <h3 className="text-xl md:text-2xl 2xl:text-3xl tracking-wide font-[Cormorant-Upright-bold]">
                      REVERSE
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                      The “easy-drinking” gateway fresh, fruit-led styles
                      designed for versatility and purity. Current bottlings
                      include Riesling (story citrus, 0.11% ABV, 90 Falstaff),
                      Sauvignon Blanc, Pinot Blanc (90 Falstaff), Rosé
                      (Dornfelder/Spätburgunder, 88.5 Falstaff) and a
                      dry-profile Red (Dornfelder/Cabernet).
                    </p>
                  </div>

                  {/* BREAKAWAY */}
                  <div>
                    <h3 className="text-xl md:text-2xl 2xl:text-3xl tracking-wide font-[Cormorant-Upright-bold]">
                      BREAKAWAY
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                      The connoisseur tier: some wines see wood, bringing extra
                      depth and texture. Bottlings include Pinot Blanc
                      (oak-aged, 90 Falstaff, Best of Show at Mundus Vini
                      Non-Alcoholic), Pinot Noir (oak-influenced, Gold-awarded)
                      and Gewürztraminer (91 Falstaff).
                    </p>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                      Beyond still wines, the range also features Frizzante
                      (alcohol-free sparkling), an Orange Wine “Evil Twin”, and
                      a “Grand Gold Chardonnay” special (wood & granite
                      maturation). These styles highlight the estate’s creative
                      approach in the NA category.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="w-[90%] mx-auto pb-10 md:pb-16 xl:py-20 space-y-10 font-[Urbanist]">
              <h2 className="text-xl md:text-2xl 2xl:text-3xl text-center tracking-wide font-[Cormorant-Upright-bold]">
                VINEYARDS
              </h2>

              <Swiper
                slidesPerView={1.5}
                spaceBetween={20}
                centeredSlides={false}
                loop={true}
                pagination={showPagination ? { clickable: true } : false}
                style={{ paddingBlockEnd: showPagination && "50px" }}
                breakpoints={{
                  480: { slidesPerView: 1.5 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                modules={[Pagination]}
                onInit={updatePagination}
                onResize={updatePagination}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img
                    className="w-full h-auto object-cover"
                    src={vineyard1}
                    alt="vineyard1"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full h-auto object-cover"
                    src={vineyard2}
                    alt="vineyard2"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full h-auto object-cover"
                    src={vineyard3}
                    alt="vineyard3"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        </>
      )}

      {/* about us Lamm Jung */}
      {productType === "about us lamm jung" && (
        <>
          <section className="w-full bg-gradient-to-b from-[#fff] via-[#fff] to-[#FFF1D2]">
            <div className="w-[90%] xl:w-[80%] mx-auto text-gray-900 flex flex-col items-center py-10 xl:py-20 font-[Urbanist]">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide text-center mb-16 font-[Cormorant-Upright-bold] uppercase">
                About Weingut Lamm-Jung (Rheingau, Germany)
              </h1>

              {/* Top Section */}
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-5 items-center">
                {/* Bottle Image */}
                <div className="flex justify-center">
                  <img
                    src={aboutUs_lammJung_bottle}
                    alt="Wine Bottle"
                    className="w-full object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-5">
                  {/* History */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      HISTORY
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      The Lamm-Jung name dates to 1947, formed from the marriage
                      of the Lamm and Jung families in Erbach (Eltville). The
                      estate was revitalized in 2016 under Günther Weisel with
                      cellar master Paul Will and now farms ~15 ha across
                      central and western Rheingau sites.
                    </p>
                  </div>

                  {/* Terroir */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      TERROIR
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Parcels span from Eltville/Erbach westward through
                      Rüdesheim and the steep slopes of Lorch, giving a
                      cross-section of Rheingau exposures and mesoclimates
                      (river-influenced, from gentler central hillsides to
                      slatey/steep western banks). The breadth of sites is the
                      backbone for their crisp, precise house style.
                    </p>
                  </div>

                  {/* Philosophy */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      PHILOSOPHY
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Hand-Werk-Wein”: careful, sustainable, resource-conserving
                      work in the vineyard and cellar; wines that are clear,
                      precise, and to the point.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="w-[90%] mx-auto md:pb-16 py-10 xl:py-20 space-y-10 font-[Urbanist]">
              <h2 className="text-xl md:text-2xl 2xl:text-3xl text-center tracking-wide font-[Cormorant-Upright-bold]">
                VINEYARDS
              </h2>

              <Swiper
                slidesPerView={1.5}
                spaceBetween={20}
                centeredSlides={false}
                loop={true}
                pagination={showPagination ? { clickable: true } : false}
                style={{ paddingBlockEnd: showPagination && "50px" }}
                breakpoints={{
                  480: { slidesPerView: 1.5 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                modules={[Pagination]}
                onInit={updatePagination}
                onResize={updatePagination}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard4}
                    alt="vineyard4"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard5}
                    alt="vineyard5"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard6}
                    alt="vineyard6"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        </>
      )}

      {/* about us KVD */}
      {productType === "about us kvd strauch sektmanufaktur" && (
        <>
          <section className="w-full">
            <div className="w-[90%] xl:w-[80%] mx-auto text-gray-900 flex flex-col items-center py-10 xl:py-20 font-[Urbanist]">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide text-center mb-16 font-[Cormorant-Upright-bold] uppercase">
                KvD Strauch Sektmanufaktur
              </h1>

              {/* Top Section */}
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
                {/* Bottle Image */}
                <div className="flex justify-center">
                  <img
                    src={aboutUs_kvd_bottle1}
                    alt="Wine Bottle"
                    className="w-full object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-5">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    KvD Strauch Sektmanufaktur is a family-run sparkling wine
                    house based in Osthofen (Wonnegau), Rheinhessen. The Strauch
                    family has been crafting sekt in Osthofen for decades (early
                    house bottlings date back to 1979 at the Dalbergerhof), and
                    in 2011 Tim & Isabel Strauch merged their parents’
                    operations to found today’s Sektmanufaktur. Their focus is
                    artisanal, traditional-method sparkling wines rooted in the
                    limestone-rich hills of southern Rheinhessen
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The estate emphasizes certified organic work and a precise,
                    low-intervention cellar style. Classic Champagne varieties
                    sit alongside regional grapes like Riesling and
                    Weißburgunder, with long lees aging and a dry, gastronomic
                    profile. Recent German wine guides (Falstaff, Vinum, Gault &
                    Millau, Eichelmann) have recognized the house’s quality
                    trajectory.
                  </p>

                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Alongside its traditional sekt, Strauch makes a
                    dealcoholized line designed to keep varietal character and
                    food-friendly structure. The flagship Blanc Pur alkoholfrei
                    is Riesling-based, produced from organically grown fruit
                    that’s hand-harvested, whole-cluster pressed, vinified in
                    stainless steel, gently dealcoholized, and then given fine
                    bubbles; it has earned 91 points from Falstaff. The range
                    also includes Rouge Pur alkoholfrei (an organic, vegan red
                    cuvée featuring Pinot varieties).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="w-[90%] xl:w-[80%] mx-auto text-gray-900 flex flex-col items-center pb-10 xl:pb-20 font-[Urbanist]">
              {/* Top Section */}
              <div className="w-full flex flex-col-reverse xl:flex-row gap-10 items-center">
                {/* Text Content */}
                <div className="w-full xl:w-1/2 space-y-5">
                  {/* History */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      HISTORY
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Strauch Sektmanufaktur is a family-run sparkling wine
                      estate in Rheinhessen. The business, led today by Isabel
                      Strauch-Weißbach and her husband Tim Weißbach, was formed
                      in 2011 when they combined the long-standing Strauch
                      family winery with the Dalbergerhof estate. Although young
                      as a joint venture, the house quickly gained recognition
                      and in 2014 was named “Discovery of the Year” by Gault &
                      Millau.
                    </p>
                  </div>

                  {/* Terroir */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      TERROIR
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      The vineyards of Strauch Sektmanufaktur lie in some of
                      Rheinhessen’s most characterful sites, including
                      Michelsberg, Osthofener Goldberg and Osthofener
                      Liebenberg. About twenty-five hectares are under vine, all
                      certified organic. Old parcels of Riesling and
                      Gewürztraminer grow on terraced slopes framed by historic
                      stone walls, while Chardonnay, Pinot Noir, Pinot Blanc,
                      Silvaner and other varieties complete the broad palette.
                      Hand-harvesting, careful selection and the use of only the
                      finest first pressings are central to their sparkling wine
                      production. Depending on the cuvée, the wines rest on the
                      lees for between ten and forty months, developing depth
                      and finesse.
                    </p>
                  </div>

                  {/* Philosophy */}
                  <div>
                    <h2 className="text-xl md:text-2xl mb-2 font-[Cormorant-Upright-bold]">
                      PHILOSOPHY
                    </h2>
                    <p className="text-sm md:text-base leading-relaxed text-gray-700">
                      Strauch’s philosophy is built on organic and ecological
                      principles. The estate works in harmony with nature,
                      striving for biodiversity in the vineyards and energy
                      self-sufficiency in the cellar. Every wine is intended to
                      be an authentic expression of both the region and the
                      family’s vision: distinctive, elegant, and true to its
                      origin. Quality is always given priority over speed, with
                      patient maturation and precise winemaking ensuring
                      complexity and balance. The result is a collection of
                      sparkling wines that combine regional character with
                      cosmopolitan sophistication.
                    </p>
                  </div>
                </div>

                {/* Bottle Image */}
                <div className="w-full xl:w-1/2">
                  <img
                    src={aboutUs_kvd_bottle2}
                    alt="Wine Bottle"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="w-[90%] mx-auto md:pb-16 pb-10 xl:pb-20 space-y-10 font-[Urbanist]">
              <h2 className="text-xl md:text-2xl 2xl:text-3xl text-center tracking-wide font-[Cormorant-Upright-bold]">
                VINEYARDS
              </h2>

              <Swiper
                slidesPerView={1.5}
                spaceBetween={20}
                centeredSlides={false}
                loop={true}
                pagination={showPagination ? { clickable: true } : false}
                style={{ paddingBlockEnd: showPagination && "50px" }}
                breakpoints={{
                  480: { slidesPerView: 1.5 },
                  768: { slidesPerView: 1.5 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                modules={[Pagination]}
                onInit={updatePagination}
                onResize={updatePagination}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard7}
                    alt="vineyard7"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard8}
                    alt="vineyard8"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard9}
                    alt="vineyard9"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        </>
      )}

      {/* about us Chateau */}
      {productType === "about us chateau closbde bouard" && (
        <>
          <section className="w-full">
            <div className="w-[90%] xl:w-[80%] mx-auto text-gray-900 flex flex-col items-center py-10 xl:py-20 font-[Urbanist]">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide text-center mb-16 font-[Cormorant-Upright-bold] uppercase">
                Château Clos de Boüard
              </h1>

              {/* Top Section */}
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
                {/* Bottle Image */}
                <div className="flex justify-center">
                  <img
                    src={aboutUs_chateau_bottle1}
                    alt="Wine Bottle"
                    className="w-full object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-5">
                  <p className="text-sm md:text-base xl:text-lg leading-relaxed text-gray-700">
                    Alongside its traditional sekt, Strauch makes a
                    dealcoholized line designed to keep varietal character and
                    food-friendly structure. The flagship Blanc Pur alkoholfrei
                    is Riesling-based, produced from organically grown fruit
                    that’s hand-harvested, whole-cluster pressed, vinified in
                    stainless steel, gently dealcoholized, and then given fine
                    bubbles; it has earned 91 points from Falstaff. The range
                    also includes Rouge Pur alkoholfrei (an organic, vegan red
                    cuvée featuring Pinot varieties).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="w-[90%] xl:w-[80%] mx-auto text-gray-900 flex flex-col items-center pb-10 xl:pb-20 font-[Urbanist]">
              {/* Top Section */}
              <div className="w-full flex flex-col-reverse xl:flex-row gap-10 items-center">
                {/* Text Content */}
                <div className="w-full xl:w-1/2 space-y-5">
                  <div className="space-y-4">
                    <h2 className="text-xl md:text-2xl mb-4 font-[Cormorant-Upright-bold]">
                      Non-Alcoholic (Dealcoholized) Project — Prince Oscar
                    </h2>
                    <p className="text-sm md:text-base xl:text-lg leading-relaxed text-gray-700">
                      Clos de Boüard also crafts Prince Oscar, a dealcoholized
                      cuvée sourced from the estate’s Saint-Émilion-area parcels
                      (about 80% Merlot, 20% Cabernet Franc, average vine age
                      ~40 years) on classic clay-limestone soils. The goal is to
                      preserve Bordeaux identity—dark-berry fruit, fine spice,
                      and a supple, dry finish—while offering a zero-proof
                      option for mindful drinking and hospitality programs.
                    </p>
                    <p className="text-sm md:text-base xl:text-lg leading-relaxed text-gray-700">
                      Style snapshot: ripe red-fruit core, gentle tannic grip,
                      and a clean, food-friendly finish; versatile with roast
                      poultry, mushroom dishes, charcuterie boards, and hard
                      cheeses. (Multiple retailers now list Prince Oscar as a
                      premium non-alcoholic Bordeaux red.)
                    </p>
                  </div>
                </div>

                {/* Bottle Image */}
                <div className="w-full xl:w-1/2">
                  <img
                    src={aboutUs_chateau_bottle2}
                    alt="Wine Bottle"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <div className="w-[90%] mx-auto md:pb-16 pb-10 xl:pb-20 space-y-10 font-[Urbanist]">
              <h2 className="text-xl md:text-2xl 2xl:text-3xl text-center tracking-wide font-[Cormorant-Upright-bold]">
                VINEYARDS
              </h2>

              <Swiper
                slidesPerView={1.5}
                spaceBetween={20}
                centeredSlides={false}
                loop={true}
                pagination={showPagination ? { clickable: true } : false}
                style={{ paddingBlockEnd: showPagination && "50px" }}
                breakpoints={{
                  480: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3, spaceBetween: 30 },
                }}
                modules={[Pagination]}
                onInit={updatePagination}
                onResize={updatePagination}
                className="mySwiper swiper-wrapper"
              >
                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard10}
                    alt="vineyard10"
                  />
                </SwiperSlide>

                <SwiperSlide>
                  <img
                    className="w-full h-52 xl:h-96 object-cover"
                    src={vineyard11}
                    alt="vineyard11"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </section>
        </>
      )}

      {/* about us Weingut */}
      {productType === "about us weingut matthias anton" && (
        <>
          <section className="w-full">
            <div className="w-[90%] xl:w-[80%] mx-auto text-gray-900 flex flex-col items-center py-10 xl:py-20 font-[Urbanist]">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide text-center mb-16 font-[Cormorant-Upright-bold] uppercase">
                Château Clos de Boüard
              </h1>

              {/* Top Section */}
              <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
                {/* Bottle Image */}
                <div className="flex justify-center">
                  <img
                    src={aboutUs_chateau_bottle1}
                    alt="Wine Bottle"
                    className="w-full object-contain"
                  />
                </div>

                {/* Text Content */}
                <div className="space-y-5">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Weingut Matthias Anton is a fourth-generation family estate in Herxheim bei Landau in the Southern Palatinate—one of Germany’s sunniest wine regions—farming roughly 20 hectares with a close-to-nature, sustainable approach that blends tradition and innovation.
                  </p>
                   <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Alongside its classic Palatinate wines, the estate crafts a growing range of dealcoholized (&lt;0.5% ABV) wines under the Anton free label, including Sauvignon Blanc, Pinot Grigio, Rosé, and a Blanc de Blancs sparkling. Using aroma-recovery technology and gentle, low-temperature dealcoholization, the team captures and reintegrates varietal aromas to retain authentic character, texture, and freshness—delivering a true wine experience without the alcohol.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AboutUs_Bergdolt;
