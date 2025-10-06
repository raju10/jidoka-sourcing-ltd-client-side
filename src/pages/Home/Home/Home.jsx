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
import WhoWeAreSection from "../../AboutUs/WhoWeAreSection";
import OurHistory from "../../AboutUs/OurHistory";
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

        {/* Who we are section*/}
        <section className="">
          <WhoWeAreSection></WhoWeAreSection>
        </section>
        {/* Categories: grows if content is bigger */}
        <section className="section-auto">
          <Categories />
        </section>

        {/* Fabrics: exactly full screen */}
        {/* <section className="section-full">
          <OurPremiumFabrics />
        </section> */}
        {/* our history section */}
        <section className="">
          <OurHistory></OurHistory>
        </section>
        <section className="py-20">
          <img
            src={adsBanner}
            alt=""
            className="w-full h-[400px] object-cover "
          />
        </section>
        {/* GlobalBrands: exactly full screen */}
        <section className="  md:py-20 pb-30">
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
