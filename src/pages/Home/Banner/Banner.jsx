// import "./Banner.scss";
// import bannerVideo from "../../../assets/banner-video/vecteezy_smiling-young-woman-sorts-through-her-wardrobe-to-find-the_51034732.mov";
// const Banner = () => {
//   return (
//     <div className="banner">
//       <div className="bannerContainer">
//         <div className="bannerTitle">
//           <h4>Effortlessly Blending Design and Delivery</h4>
//           <h1>Excellence in every stitch</h1>
//           <button className="btn btn-outline w-80">Explore products</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import bannerVideo from "../../../assets/banner-video/vecteezy_smiling-young-woman-sorts-through-her-wardrobe-to-find-the_51034732.mov";

const Banner = () => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Full Gradient Overlay with HEX colors */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg, #918f9000, #4c4c4c99)]"></div>
      {/* Optional overlay text */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center ">
        <div className="text-white  font-bold lg:w-[80%] xl:w-[50%]  mx-auto text-center px-5">
          <h4>Effortlessly Blending Design and Delivery</h4>
          <h1 className="md:text-[100px] sm:text-[75px] text-[45px] py-5 ">
            Excellence in every stitch
          </h1>
          <button className="btn btn-outline sm:w-80">Explore products</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
