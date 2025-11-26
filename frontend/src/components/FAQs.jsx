import React, { useState } from "react";
import faqs_wine from "/faqs/faqs-wine.jpg";
import faqs_bg from "/faqs/faqs-bg.jpg";
import CommonFirstSection from "./CommonFirstSection";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const FAQs = () => {
  const [expanded, setExpanded] = useState([
    "panel1",
    "panel3",
    "panel10",
    "panel14",
    "panel15",
  ]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) => {
      if (isExpanded) {
        // Add panel to array
        return [...prev, panel];
      } else {
        // Remove panel from array
        return prev.filter((item) => item !== panel);
      }
    });
  };

  return (
    <>
      <CommonFirstSection productImage={faqs_bg} productType="FAQs" />
      <section className="w-[96%] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-10 py-10 xl:py-20">
        <div className="w-[80%] md:w-[35%] md:sticky md:top-24">
          <img
            className="h-[350px] md:h-[450px] lg:h-[600px] w-full object-cover"
            src={faqs_wine}
            alt="Wine Glass"
          />
        </div>

        <div className="w-full md:w-[65%]">
          <h1 className="uppercase text-3xl font-[Cormorant-Upright-normal] mb-8">
            FREQUENTLY ASKED QUESTIONS
          </h1>

          <h1 className="uppercase text-xl font-[Cormorant-Upright-normal] mb-8">
            PRODUCT RELATED
          </h1>

          {/* Accordian */}
          <div className="flex flex-col gap-3 lg:gap-6">
            {/* PANEL 1 */}
            <Accordion
              expanded={expanded.includes("panel1")}
              onChange={handleChange("panel1")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel1") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  What Does “&lt;0.5% ABV” Mean?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel1")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Our Wines Are Non-Alcoholic Under US Federal Definitions.
                    They Contain Less Than 0.5% Alcohol By Volume.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 2 */}
            <Accordion
              expanded={expanded.includes("panel2")}
              onChange={handleChange("panel2")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel2") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  Storage & Serving
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel2")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Store in a cool, dry place. Refrigerate after opening and
                    enjoy within 3 days for best quality. Serve well-chilled.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>

          <h1 className="uppercase text-xl font-[Cormorant-Upright-normal] my-8">
            SHIPMENTS
          </h1>

          <div className="flex flex-col gap-3 lg:gap-6">
            {/* PANEL 3 */}
            <Accordion
              expanded={expanded.includes("panel3")}
              onChange={handleChange("panel3")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel3") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  How Long is the Delivery Time?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel3")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Orders usually leave our warehouse in 1–2 business days.
                    Transit time is typically 2–5 business days depending on
                    destination. You’ll receive tracking as soon as it ships.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 4 */}
            <Accordion
              expanded={expanded.includes("panel4")}
              onChange={handleChange("panel4")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel4") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  Which Countries Do You Ship To?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel4")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    We ship inside the US to NY, MA, TX, IL, MN, CA
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 5 */}
            <Accordion
              expanded={expanded.includes("panel5")}
              onChange={handleChange("panel5")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel5") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  Which Shipping Provider Do You Use?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel5")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    We ship primarily with UPS for reliability with glass
                    bottles.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 6 */}
            <Accordion
              expanded={expanded.includes("panel6")}
              onChange={handleChange("panel6")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel6") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  How Can I Track My Delivery?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel6")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Once your order ships, you’ll receive a confirmation email
                    with a UPS tracking number. You can also track anytime here:
                    https://www.ups.com/track?tracknum=[YOUR_TRACKING_NUMBER].
                    Tip: Your Order Status page shows the same live updates
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 7 */}
            <Accordion
              expanded={expanded.includes("panel7")}
              onChange={handleChange("panel7")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel7") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  Do you ship to PO boxes?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel7")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    UPS can’t deliver to PO boxes. Please use a street address.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 8 */}
            <Accordion
              expanded={expanded.includes("panel8")}
              onChange={handleChange("panel8")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel8") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  How Are The Wines Packaged?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel8")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Our Wines Are Non-Alcoholic Under US Federal Definitions.
                    They Contain Less Than 0.5% Alcohol By Volume.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 9 */}
            <Accordion
              expanded={expanded.includes("panel9")}
              onChange={handleChange("panel9")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel9") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  Do you ship to PO boxes?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel9")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Our Wines Are Non-Alcoholic Under US Federal Definitions.
                    They Contain Less Than 0.5% Alcohol By Volume.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>

          <h1 className="uppercase text-xl font-[Cormorant-Upright-normal] my-8">
            ORDERS & RETURNS
          </h1>

          <div className="flex flex-col gap-3 lg:gap-6">
            {/* PANEL 10 */}
            <Accordion
              expanded={expanded.includes("panel10")}
              onChange={handleChange("panel10")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel10") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  Is There a Minimum Order Value ?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel10")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    No, there is no minimum order value.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 11 */}
            <Accordion
              expanded={expanded.includes("panel11")}
              onChange={handleChange("panel11")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel11") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  How Can I Cancel An Order?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel11")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Because our products are food items, unopened returns are
                    not accepted. If there’s any issue with your order, contact
                    [your support email] and we’ll make it right.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 12 */}
            <Accordion
              expanded={expanded.includes("panel12")}
              onChange={handleChange("panel12")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel12") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  My Order Arrrived Damaged - What Can I Do?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel12")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Email sebastian.huelck@elitewineselections.com within 48
                    hours with your order number and photos of the damage. We’ll
                    arrange a replacement or refund afterwards.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 13 */}
            <Accordion
              expanded={expanded.includes("panel13")}
              onChange={handleChange("panel13")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel13") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  Bulk, corporate, or hospitality orders
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel13")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    We’d love to help. Email
                    sebastian.huelck@elitewineselections.com for volume pricing,
                    tastings, and custom assortments.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>

          <h1 className="uppercase text-xl font-[Cormorant-Upright-normal] my-8">
            Contact
          </h1>

          <div className="flex flex-col gap-3 lg:gap-6">
            {/* PANEL 14 */}
            <Accordion
              expanded={expanded.includes("panel14")}
              onChange={handleChange("panel14")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel14") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  How Can I Contact You
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel14")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    Reach Out Via Email to
                    sebastian.huelck@elitewineselections.com
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>

          <h1 className="uppercase text-xl font-[Cormorant-Upright-normal] my-8">
            payment
          </h1>

          <div className="flex flex-col gap-3 lg:gap-6">
            {/* PANEL 15 */}
            <Accordion
              expanded={expanded.includes("panel15")}
              onChange={handleChange("panel15")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel15") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  What Are The Payment Options?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel15")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    At Elite you have the option of paying by credit card,
                    PayPal, invoice, direct debit or instant bank transfer. You
                    can find more information about payment and delivery
                    conditions here.
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>

            {/* PANEL 16 */}
            <Accordion
              expanded={expanded.includes("panel16")}
              onChange={handleChange("panel16")}
              elevation={0}
              sx={{
                borderRadius: "20px !important",
                border: "1px solid #e5e5e5",
                padding: "10px 20px",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="h-7 w-7 flex items-center justify-center rounded-full border border-black text-black">
                    {expanded.includes("panel16") ? (
                      <i className="fa-solid fa-minus text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-plus text-lg"></i>
                    )}
                  </div>
                }
              >
                <Typography className="!font-semibold text-lg !font-[Urbanist]">
                  When Will The Amount of My Cancelled Order Be Refunded After A
                  Return Shipment?
                </Typography>
              </AccordionSummary>

              {/* Line appears ONLY when expanded */}
              <div
                className={`!overflow-hidden !transition-all !duration-700 !ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  expanded.includes("panel16")
                    ? "!max-h-[800px] !opacity-100 border-t border-gray-300 mt-3 pt-3"
                    : "!max-h-0 !opacity-0"
                }`}
              >
                <AccordionDetails>
                  <Typography className="text-gray-600 leading-relaxed !font-[Urbanist]">
                    We process refunds within 2–3 business days after receiving
                    and inspecting your return, and your bank/payment provider
                    typically posts the credit within 3–10 business days
                  </Typography>
                </AccordionDetails>
              </div>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQs;
