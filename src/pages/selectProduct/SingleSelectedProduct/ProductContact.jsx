import { BiLogoGmail } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { FaMars } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

const ProductContact = ({
  spData,
  user,
  message,
  setMessage,
  isSent,
  handleContactSeller,
  handleWhatsAppContact,
}) => {
  return (
    <motion.div
      className="col-span-6"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="p-4 bg-white shadow rounded-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">
          Directly Contact the Seller
        </h2>
        <p className="mb-4 text-gray-600">
          You can get in touch with the seller regarding this product via email
          or WhatsApp.
        </p>

        <div>
          <p className="flex items-center gap-1">
            <BiLogoGmail /> alloo@gmail.com
          </p>
          <p className="flex items-center gap-1">
            <FaWhatsapp /> +88 01814265958
          </p>
        </div>
        <div className="divider"></div>

        <input
          className="w-full p-3 border border-gray-300 rounded mb-4 text-gray-400"
          type="email"
          disabled
          defaultValue={user?.email}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          rows={5}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          disabled={isSent}
        />

        <div className="divider text-gray-400 font-semibold">
          Direct Contact Seller
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {/* Email btn */}
          <button
            onClick={() => handleContactSeller(spData)}
            className={`cursor-pointer w-full px-3 py-1 text-white font-semibold rounded ${
              isSent
                ? "bg-orange-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-black"
            }`}
            disabled={isSent}
          >
            {isSent ? (
              <div className="flex justify-center items-center">
                {" "}
                <IoMdCheckmarkCircle className="text-xl" />
                Already Mail send
              </div>
            ) : (
              <div className="flex justify-center items-center gap-1">
                <BiLogoGmail /> Mail
              </div>
            )}
          </button>

          {/* WhatsApp btn */}
          <button
            onClick={() => handleWhatsAppContact(spData, user, message)}
            className="flex justify-center items-center gap-1 w-full p-3 text-white font-semibold rounded bg-green-500 hover:bg-green-700"
          >
            <FaWhatsapp /> WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductContact;
