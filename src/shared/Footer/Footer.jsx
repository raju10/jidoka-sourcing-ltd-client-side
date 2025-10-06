// import {
//   FaYoutube,
//   FaInstagram,
//   FaWhatsapp,
//   FaFacebookF,
//   FaTwitter,
// } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { FiPhone, FiMail } from "react-icons/fi";
// import logo from "../../assets/logo/logo-removebg-preview.png";
// const Footer = () => {
//   return (
//     <footer className="bg-gray-50 text-gray-700 footer">
//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {/* Logo + About */}
//         <div>
//           <div className="flex items-center gap-2 mb-4">
//             <img src={logo} alt="" className="w-30 h-24 " />
//           </div>
//           <p className="text-sm leading-6">
//             E-store is your trusted destination for quality and convenience.
//             From fashion to essentials, we bring everything you need right to
//             your doorstep. Shop smart, live better — only at E-store.
//           </p>
//         </div>

//         {/* Categories */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">CATEGORIES</h3>
//           <ul className="space-y-2 text-sm">
//             <li>T-shirt</li>
//             <li>Hoodies</li>
//             <li>Oversized</li>
//             <li>Full Sleeves</li>
//             <li>Polo</li>
//           </ul>
//         </div>

//         {/* Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">USERFULL LINKS</h3>
//           <ul className="space-y-2 text-sm">
//             <li>Home</li>
//             <li>Shop</li>
//             <li>About</li>
//             <li>Register</li>
//             <li>Login</li>
//           </ul>
//         </div>

//         {/* Help Center */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">HELP CENTER</h3>
//           <ul className="space-y-2 text-sm">
//             <li>Register</li>
//             <li>Login</li>
//             <li>My Account</li>
//             <li>Privacy Policy</li>
//             <li>Terms & Conditions</li>
//           </ul>
//         </div>
//       </div>

//       {/* Contact + Social */}
//       <div className="max-w-7xl mx-auto px-6 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
//         {/* Contact Info */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
//           <ul className="space-y-3 text-sm">
//             <li className="flex items-center gap-2">
//               <FaLocationDot className="text-purple-600" />
//               E-store market Lucknow, India 256320
//             </li>
//             <li className="flex items-center gap-2">
//               <FiPhone className="text-purple-600" />
//               +91-8569874589
//             </li>
//             <li className="flex items-center gap-2">
//               <FiMail className="text-purple-600" />
//               support@estore.com
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div className="flex items-center gap-4 lg:justify-end">
//           <FaYoutube className="text-purple-600 text-xl hover:text-purple-800 cursor-pointer" />
//           <FaInstagram className="text-purple-600 text-xl hover:text-purple-800 cursor-pointer" />
//           <FaWhatsapp className="text-purple-600 text-xl hover:text-purple-800 cursor-pointer" />
//           <FaFacebookF className="text-purple-600 text-xl hover:text-purple-800 cursor-pointer" />
//           <FaTwitter className="text-purple-600 text-xl hover:text-purple-800 cursor-pointer" />
//         </div>
//       </div>

//       {/* Bottom Copyright */}
//       <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
//         © 2024 Estore. All Rights Reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
//
//
//
//
//
//
//
//
//
//
//
//

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import footerCardImg from "../../assets/footer/card-footer/1.png";
const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-12 lg:px-20 py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 py-30">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-sm font-bold uppercase mb-4 leading-relaxed">
            Sign up to get 10% off your first order and stay up to date on the
            latest product releases, special offers and news
          </h3>
          <form className="flex flex-col justify-center gap-2">
            <input
              type="email"
              placeholder="Your Email *"
              className="flex-1 px-4 py-2 bg-transparent border border-gray-600 focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 uppercase text-sm font-semibold max-w-50"
            >
              Subscribe
            </button>
          </form>
          <div className="flex items-center gap-3 mt-6">
            <img src={footerCardImg} alt="Amex" className="h-6" />
          </div>
        </motion.div>

        {/* Quick Links Section */}
        <motion.ul
          className="space-y-3 text-sm uppercase"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <li className="hover:text-gray-300 cursor-pointer">Shop</li>
          <li className="hover:text-gray-300 cursor-pointer">FAQ</li>
          <li className="hover:text-gray-300 cursor-pointer">Shipping</li>
          <li className="hover:text-gray-300 cursor-pointer">Returns</li>
          <li className="hover:text-gray-300 cursor-pointer">Careers</li>
          <li className="hover:text-gray-300 cursor-pointer">
            Terms & Conditions
          </li>
          <li className="hover:text-gray-300 cursor-pointer">Privacy Policy</li>
        </motion.ul>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-sm text-gray-400 mb-3">
            If you have any questions regarding your order, products or our
            service, please contact our customer service.
          </p>
          <p className="text-sm font-semibold uppercase">
            Monday – Friday: 10:00-6:00 PM
          </p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Phone:</span> +1 712-339-9294
          </p>
          <p className="text-sm mt-1">
            <span className="font-semibold">Email:</span> info@moderno-theme.com
          </p>
          <p className="text-sm mt-1">
            <span className="font-semibold">Address:</span> 283 N. Glenwood
            Street, Levittown, NY
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              className="border border-gray-600 p-3 hover:bg-gray-700"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="border border-gray-600 p-3 hover:bg-gray-700"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="border border-gray-600 p-3 hover:bg-gray-700"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="border border-gray-600 p-3 hover:bg-gray-700"
            >
              <FaYoutube />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        © 2025 Moderno Theme. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
