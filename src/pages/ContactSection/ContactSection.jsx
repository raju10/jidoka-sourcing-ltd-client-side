import { useForm } from "react-hook-form";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaMessage } from "react-icons/fa6";
import Swal from "sweetalert2";
import { BiLogoGmail } from "react-icons/bi";

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    const templateParams = {
      to_email: "trolltube272@gmail.com", // Admin email from SingleSelectedProduct
      userName: data.name,
      userEmail: data.email,
      userPhone: data.phone || "N/A",
      userMessage: data.message,
      productTitle: "General Inquiry / Direct Contact",
    };

    try {
      const response = await emailjs.send(
        "service_wfcf35f", // from EmailJS dashboard
        "template_1bvnn9r", // from EmailJS template
        templateParams,
        "3uPCx4qUSql2TD_vK" // from EmailJS account
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "The admin has received your message.",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to send message. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    const data = register("message").value || ""; // This is not quite right with react-hook-form
    // Better way to get current values
    const formValues = {
      name: document.querySelector('input[name="name"]')?.value || "Guest",
      email: document.querySelector('input[name="email"]')?.value || "N/A",
      phone: document.querySelector('input[name="phone"]')?.value || "N/A",
      message: document.querySelector('textarea[name="message"]')?.value || "",
    };

    if (!formValues.message.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Message",
        text: "Please write a message before contacting us via WhatsApp.",
      });
      return;
    }

    const adminPhone = "8801814265958"; // Admin WhatsApp number from SingleSelectedProduct
    const text = encodeURIComponent(
      `📩 New General Inquiry\n
👤 User: ${formValues.name}
📧 Email: ${formValues.email}
📞 Phone: ${formValues.phone}
💬 Message: ${formValues.message}`
    );

    const url = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=" flex items-center justify-center bg-gray-100 px-6 py-30 "
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl w-full grid md:grid-cols-2 rounded shadow-xl overflow-hidden "
      >
        {/* Left Section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-10 flex flex-col justify-between text-white"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://i.ibb.co/ycq3bNBm/flat-lay-of-men-casual-fashion-outfits-on-wooden-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div>
            <h4 className="text-orange-300 font-semibold mb-4">
              Headquarter (Bangladesh)
            </h4>
            <p className="text-lg mb-1 font-medium">
              Jidoka Sourcing Limited.
              <br /> Road: 01. Line: 01. H Block. Chattogram. Bangladesh.
            </p>
            <p className=" font-medium">info@jidokasourcing.com</p>
            <p className="mb-6 font-medium">fahim@jidokasourcing.com</p>
            <h4 className="text-orange-300 font-semibold mb-4">
              Branch Office (Canada)
            </h4>
            <p className="text-lg mb-1 font-medium">
              Jidoka Sourcing Limited.
              <br /> 3000 danforth avenue Unit 11. Canada
            </p>

            <p className=" font-medium">info@jidokasourcing.com</p>
            <p className="mb-6 font-medium">shawon@jidokasourcing.com</p>

            {/* <h4 className="text-orange-300 font-semibold mb-2">Email Us</h4> */}
            {/* <p className=" font-medium">info@jidokasourcing.com</p> */}

            <h4 className="text-orange-300 font-semibold mb-2">Call Us</h4>
            <p className="mb-1 font-medium">+880 1619-755755</p>
            <a
              href="https://www.jidokasourcing.com/"
              className="mb-6 font-medium text-blue-500"
            >
              www.jidokasourcing.com
            </a>

            <h4 className="text-orange-300 font-semibold mb-2">
              Follow our social media
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/jidoka-sourcing-limited/"
                className="bg-white/20 p-2 rounded-md hover:bg-white/40"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="bg-white/20 p-2 rounded-md hover:bg-white/40"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="bg-white/20 p-2 rounded-md hover:bg-white/40"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-white/20 p-2 rounded-md hover:bg-white/40"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-10"
        >
          <h4 className="text-orange-400 font-semibold mb-2">Send a message</h4>
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Whenever you need us, <br /> we’re here for you.
          </h2>
          <p className="text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                {...register("name", { required: "Name is required" })}
                className="border-b border-gray-300 outline-none py-2"
                placeholder="Name"
              />
              <motion.input
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                {...register("phone")}
                className="border-b border-gray-300 outline-none py-2"
                placeholder="Phone"
              />
            </div>
            {errors.name && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {errors.name.message}
              </motion.span>
            )}

            <motion.input
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              {...register("email", { required: "Email is required" })}
              className="border-b border-gray-300 outline-none py-2 w-full"
              placeholder="Email"
            />
            {errors.email && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {errors.email.message}
              </motion.span>
            )}

            <motion.textarea
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              {...register("message", { required: "Message is required" })}
              className="border-b border-gray-300 outline-none py-2 w-full"
              placeholder="Message"
            ></motion.textarea>
            {errors.message && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm"
              >
                {errors.message.message}
              </motion.span>
            )}

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-blue-500 text-white flex items-center justify-center gap-2 py-2 px-4 rounded-md hover:bg-black transition cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <BiLogoGmail className="text-xl" />
                    Mail
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleWhatsAppContact}
                className="bg-green-500 text-white flex items-center justify-center gap-2 py-2 px-4 rounded-md hover:bg-green-700 transition cursor-pointer"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
