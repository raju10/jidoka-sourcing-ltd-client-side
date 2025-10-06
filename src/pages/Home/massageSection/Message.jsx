import { Link } from "react-router";
import bgImage from "../../../assets/massage/m-bg-img.jpg";

const Message = () => {
  return (
    <div
      className="bg-cover  bg-no-repeat w-full h-full object-cover bg-fixed text-white px-20 py-35 space-y-10 flex justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "end",
        // background:
        //   "linear-gradient(to right top, #00000085, #000000a3, #00000080, #0000008f, #00000075",
      }}
    >
      <div className="">
        <p className="text-lg">
          Connect with Vero style ltd. for tailored solutions, unmatched <br />{" "}
          quality, and seamless collaboration in fashion production.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {" "}
          <button className="btn btn-outline border-3 rounded-full p-[50%] col-span-2 max-w-[100%] max-h-[100%] text-xl">
            <Link to="/contactUs"> Message</Link>
          </button>
          <h1
            className="col-span-10 uppercase text-[70px] lg:text-[100px] xl:text-[200px] font-light px-20 tracking-[30px]"
            style={{ fontFamily: "Ivy Mode" }}
          >
            Inquire
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Message;
