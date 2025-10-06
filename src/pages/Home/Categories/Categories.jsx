import { useEffect, useState } from "react";
import "./Categories.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css";
import "swiper/css/pagination";
import causialImg from "../../../assets/carosel-our-product/casual.jpeg";
import formalImg from "../../../assets/carosel-our-product/formal.jpeg";
import outerImg from "../../../assets/carosel-our-product/outer.jpeg";
import activeImg from "../../../assets/carosel-our-product/active.jpeg";
import homeImg from "../../../assets/carosel-our-product/home.jpeg";
import ceremonialImg from "../../../assets/carosel-our-product/cr2.jpg";
import kidsImg from "../../../assets/carosel-our-product/kids.jpeg";
import { Link } from "react-router";
import useMenu from "../../../hooks/useMenu";
import useCategory from "../../../hooks/useCategory";

const slides = [
  {
    title: "Casual wear",
    image: causialImg,
  },
  {
    title: "Formal wear",
    image: formalImg,
  },
  {
    title: "Outer wear",
    image: outerImg,
  },
  {
    title: "Active wear",
    image: activeImg,
  },
  {
    title: "Home wear",
    image: homeImg,
  },
  {
    title: "Ceremonial wear",
    image: ceremonialImg,
  },
  {
    title: "Kid's wear",
    image: kidsImg,
  },
];
const Categories = () => {
  const [allCategorys] = useCategory();
  console.log(allCategorys);
  const [allCategory] = useMenu();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null); // track clicked thumb
  // console.log(allProducts);
  // const handleclicked = (e) => {
  //   console.log(e);
  // };

  return (
    <div className=" products w-full min-h-screen ">
      <div className="ourAllProdects">
        <div className="prodectSectionTittle">
          <h1 className="lg:text-[80px] md:text-[60px] text-[30px] lg:leading-[100px] md:leading-[60px] md:font-[500] font-[600]">
            Discover our <br /> Category’s
          </h1>
          <p className="py-10 md:w-[50%]">
            Explore our diverse range of high-quality apparel, crafted with
            precision, innovation, and a commitment to excellence. Designed to
            reflect global fashion trends, our products seamlessly blend style,
            comfort, and sustainability.
          </p>
        </div>
        {/*  */}
        <div className=" w-full max-w-[1300px] mx-auto">
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            //centeredSlides={true}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="mainSwiper"
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // when window width is >= 1280px
              1280: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {allCategorys.map((slide) => (
              <SwiperSlide className="another cursor-pointer" key={slide._id}>
                <Link to={`/product/${slide._id}`}>
                  <img
                    src={slide.categoryImage}
                    alt=""
                    className=" w-[400px] h-[400px] rounded-sm object-cover"
                    // style={{
                    //   background:
                    //     "linear-gradient(rgba(206, 57, 57, 0.02) 55.87%, rgb(18, 16, 13) 100%)",
                    // }}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#28282847] to-[#12100d55]"></div>
                  <h3 className="absolute bottom-4 w-full text-center text-white uppercase text-3xl  font-bold z-10">
                    {slide.categoryName}
                  </h3>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {/*  */}
          {/* Thumbnail Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="thumbSwiper mt-4"
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 5 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
          >
            {allCategorys.map((slide, index) => (
              <SwiperSlide key={slide._id} className="cursor-pointer">
                <img
                  src={slide.categoryImage}
                  alt={slide.categoryName}
                  onClick={() => setClickedIndex(index)} // set clicked index
                  className={`w-full h-[80px] object-cover rounded-sm cursor-pointer transition-all duration-300
                ${
                  clickedIndex === index
                    ? "border-5 border-[#e78036]"
                    : "border border-transparent"
                }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Categories;
