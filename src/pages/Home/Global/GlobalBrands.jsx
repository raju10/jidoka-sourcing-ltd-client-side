import img1 from "../../../assets/global-brands/1.svg";
import img2 from "../../../assets/global-brands/2.svg";
import img3 from "../../../assets/global-brands/3.svg";
import img4 from "../../../assets/global-brands/4.svg";
import img5 from "../../../assets/global-brands/5.svg";
import img6 from "../../../assets/global-brands/6.svg";
import img7 from "../../../assets/global-brands/7.svg";
import img8 from "../../../assets/global-brands/8.svg";
import img9 from "../../../assets/global-brands/9.svg";
import img10 from "../../../assets/global-brands/10.svg";
import img11 from "../../../assets/global-brands/11.svg";
import img12 from "../../../assets/global-brands/12.svg";
import img13 from "../../../assets/global-brands/13.svg";
import img14 from "../../../assets/global-brands/14.svg";

const GlobalBrands = () => {
  return (
    <div className="w-full max-w-[1600px] m-auto px-3 py-10 ">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <p className="col-span-4">
          ClientsWe Serve The trusted choice of global brands
        </p>
        <h2 className="col-span-8 text-black font-semibold lg:text-[35px] text-[23px]">
          We deliver quality-driven, innovative apparel solutions that meet the
          evolving needs of our worldwide clients. By combining expert
          craftsmanship with dependable service, we create fashion-forward
          garments that stand out.
        </h2>{" "}
      </div>
      <div className="grid sm:grid-cols-5 lg:grid-cols-7 grid-cols-3 gap-3 mt-30">
        <img
          src={img1}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img2}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img3}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img4}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img5}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img6}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img7}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img8}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img9}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img10}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img11}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img12}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img13}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
        <img
          src={img14}
          alt=""
          className="w-full h-full bg-[#f6f6f6] px-4 rounded"
        />
      </div>
    </div>
  );
};

export default GlobalBrands;
