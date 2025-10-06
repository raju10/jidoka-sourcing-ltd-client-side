import { motion } from "framer-motion";
import { FaRegLightbulb, FaGem, FaTrophy, FaCogs } from "react-icons/fa";

export default function OurHistory() {
  return (
    <section className="bg-white">
      {/* Top Section with BG Image */}
      <div
        className="relative bg-fixed h-100 bg-cover bg-center bg-no-repeat flex items-start justify-center z-0"
        style={{
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://i.ibb.co/1tY1BHp7/two-fashion-black-men.jpg')",
        }}
      >
        <div className="">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white shadow-lg  sm:p-10 mt-60 max-w-2xl  mx-5 p-5"
            style={{ zIndex: 10 }}
            // className=" bg-white shadow-lg p-6 sm:p-10 border-double  border-6 border-[#d1a280]  mt-20 relative z-1  overflow-hidden"
          >
            <span className="text-sm text-[#d1a280] uppercase tracking-wide font-medium mb-2 block">
              Our history
            </span>
            <h2 className="text-2xl font-bold mb-4">
              Crafted with passion, crafted with care.
            </h2>
            <p className="text-gray-600 mb-3 text-sm">
              Neque fames ornare hac id laoreet aliquam nibh ligula porttitor.
              At phasellus sollicitudin arcu maecenas porta praesent lorem
              sagittis. Dapibus nibh lectus commodo praesent quam.
            </p>
            <p className="text-gray-600">
              Neque fames ornare hac id laoreet aliquam nibh ligula porttitor.
              At phasellus sollicitudin arcu maecenas porta praesent lorem
              sagittis. Dapibus nibh lectus commodo praesent quam.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-6xl mx-auto mt-40">
        <div className=" grid md:grid-cols-2 gap-10 px-6 py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <span className="text-[#d1a280] uppercase tracking-wide font-medium mb-2">
              Our value
            </span>
            <h3 className="text-3xl font-bold mb-4 leading-snug">
              Clothing that gives you the freedom to be you!
            </h3>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <button className="border border-black px-5 py-2 rounded-md hover:bg-black hover:text-white transition-all">
              Discover more
            </button>
          </motion.div>

          {/* Right Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Vision */}
            <div className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition">
              <FaRegLightbulb className="mx-auto text-[#d1a280] text-3xl mb-3" />
              <h4 className="text-lg font-semibold mb-1">Vision</h4>
              <p className="text-gray-600 text-sm">
                Maecenas orci convallis felis potenti proin interdum habitasse
                ex lectus arcu cursus
              </p>
            </div>

            {/* Motto */}
            <div className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition">
              <FaCogs className="mx-auto text-[#d1a280] text-3xl mb-3" />
              <h4 className="text-lg font-semibold mb-1">Motto</h4>
              <p className="text-gray-600 text-sm">
                Maecenas orci convallis felis potenti proin interdum habitasse
                ex lectus arcu cursus
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition">
              <FaGem className="mx-auto text-[#d1a280] text-3xl mb-3" />
              <h4 className="text-lg font-semibold mb-1">Mission</h4>
              <p className="text-gray-600 text-sm">
                Maecenas orci convallis felis potenti proin interdum habitasse
                ex lectus arcu cursus
              </p>
            </div>

            {/* Value */}
            <div className="bg-white shadow-md p-6 rounded-xl text-center hover:shadow-lg transition">
              <FaTrophy className="mx-auto text-[#d1a280] text-3xl mb-3" />
              <h4 className="text-lg font-semibold mb-1">Value</h4>
              <p className="text-gray-600 text-sm">
                Maecenas orci convallis felis potenti proin interdum habitasse
                ex lectus arcu cursus
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
