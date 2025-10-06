// import Banner from "../Banner/Banner";

// import Categories from "../Categories/Categories";
// import OurPremiumFabrics from "../OurPremiumFabrics/OurPremiumFabrics";
// import "./Home.scss";
// const Home = () => {
//   return (
//     <div className="home">
//       <section>
//         <Banner></Banner>
//       </section>
//       <section>
//         <Categories></Categories>
//       </section>

//       <section>
//         <OurPremiumFabrics></OurPremiumFabrics>
//       </section>
//     </div>
//   );
// };

// export default Home;
/////////////////////////

import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import GlobalBrands from "../Global/GlobalBrands";
import Message from "../massageSection/Message";
import OurPremiumFabrics from "../OurPremiumFabrics/OurPremiumFabrics";
import "./Home.scss";
import adsBanner from "../../../assets/advertising-banner.png";
import { Helmet } from "react-helmet-async";
import ContactSection from "../../ContactSection/ContactSection";
const Home = () => {
  return (
    <div className="">
      <Helmet>
        <title>Jidoka-Ltd| Home</title>
      </Helmet>
      <div className="home snap-y snap-mandatory  ">
        {/* Hero: exactly full screen */}
        <section className="section-full">
          <Banner />
        </section>

        {/* Categories: grows if content is bigger */}
        <section className="section-auto">
          <Categories />
        </section>

        {/* Fabrics: exactly full screen */}
        <section className="section-full">
          <OurPremiumFabrics />
        </section>
        <section className="">
          <img
            src={adsBanner}
            alt=""
            className="w-full h-[400px] object-cover"
          />
        </section>
        {/* GlobalBrands: exactly full screen */}
        <section className=" bg-[#fafafa] pt-20 pb-40">
          <GlobalBrands></GlobalBrands>
        </section>

        {/* <section className=" -my-20 ">
          <Message></Message>
        </section> */}
        <section>
          <ContactSection></ContactSection>
        </section>
      </div>
    </div>
  );
};

export default Home;
