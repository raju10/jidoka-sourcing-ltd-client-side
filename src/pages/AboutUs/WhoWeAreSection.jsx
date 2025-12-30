import { motion } from "framer-motion";
import CountUp from "react-countup";
const WhoWeAreSection = () => {
  return (
    <div className=" w-100% max-w-5xl mx-auto grid md:grid-cols-12 gap-5 px-6 pt-20 pb-16">
      {/* Left Image */}
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        whileInView={{ opacity: 2, y: 0 }}
        transition={{ duration: 2 }}
        className="col-span-5"
      >
        <img
          src="https://i.ibb.co/cfPWHy7/img-1.png"
          alt="Who we are"
          className="max-h-[550px] object-contain w-full"
        />
      </motion.div>

      {/* Right Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center col-span-7"
      >
        <span className="text-[#d1a280] uppercase tracking-wide font-medium mb-2">
          Who we are
        </span>
        <h3 className="text-3xl font-bold mb-4 leading-snug">
          Great quality, great prices, great service!
        </h3>
        <p className="text-gray-600 mb-4">
          Jidoka Sourcing Limited has been officially operating since 2023 as a
          specialized sourcing and sales house for shipment cancellation
          stocklot goods. Based in Chattogram, Bangladesh, we are committed to
          delivering quality, integrity, and reliability in every deal.
          Alongside stocklot trading, we also work with CM (Cutting & Making)
          and CMT (Cutting, Making & Trimming) based orders, offering tailored
          and flexible production solutions to meet buyers' specific needs. Our
          expertise also extends to manufacturing support for apparel, footwear,
          bags, leather goods, and a wide range of other products. We facilitate
          export-import operations with custom clearance assistance, ensuring a
          smooth and professional supply chain experience.
        </p>
        {/* <p className="text-gray-600">
          Ligula dolor vestibulum ultrices sodales potenti amet class aenean
          curae etiam.
        </p> */}

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {/* Happy Customer */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white shadow-md p-4 text-center rounded-xl"
          >
            <h4 className="text-2xl font-bold text-[#d1a280]">
              <CountUp end={8} duration={5} suffix="K+" />
            </h4>
            <p className="text-gray-600 text-sm">Happy customer</p>
          </motion.div> */}

          {/* Sold Product */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="bg-white shadow-md p-4 text-center rounded-xl"
          >
            <h4 className="text-2xl font-bold text-[#d1a280]">
              <CountUp end={17} duration={5} suffix="K+" />
            </h4>
            <p className="text-gray-600 text-sm">Sold Product</p>
          </motion.div> */}

          {/* Customer Rating */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-white shadow-md p-4 text-center rounded-xl"
          >
            <h4 className="text-2xl font-bold text-[#d1a280]">
              <CountUp end={4.8} decimals={1} duration={5} />
            </h4>
            <p className="text-gray-600 text-sm">Customer Satisfaction</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WhoWeAreSection;
