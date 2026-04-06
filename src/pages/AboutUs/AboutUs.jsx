import { motion } from "framer-motion";

import OurHistory from "./OurHistory";
import GlobalBrands from "../Home/Global/GlobalBrands";
import WhoWeAreSection from "./WhoWeAreSection";
import { Helmet } from "react-helmet-async";
import sectionImg from "../../assets/who we are/sec_img.jpg";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>Jidoka Sourcing | About Us</title>
      </Helmet>
      <section className="bg-white">
        {/* About Us Top Section with BG Image */}
        <div
          className="relative h-80 bg-cover bg-center bg-no-repeat flex items-end justify-start"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${sectionImg})`,
          }}
        >
          <div className="">
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 1 }}
              className=" bg-white shadow-lg p-6 sm:p-10 border-double  border-6 border-[#d1a280] ml-7 lg:ml-20 xl:ml-80  mb-[-40px] relative z-1 "
            >
              <h2 className="text-3xl font-bold mb-2">About Us</h2>
              <p className="text-gray-600 text-lg">
                Let fashion style shine through you.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Who We Are Section */}
        <>
          <WhoWeAreSection></WhoWeAreSection>
        </>
        <div className="">
          <OurHistory></OurHistory>
        </div>
        <div className="pb-20">
          <GlobalBrands></GlobalBrands>
        </div>
      </section>
    </>
  );
}
