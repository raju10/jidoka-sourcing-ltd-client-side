import { Helmet } from "react-helmet-async";
import CategorySection from "../Home/Categories/CategorySection";
import "./AllCategories.css";

const AllCategories = () => {
    return (
        <div className="all-categories-page">
            <Helmet>
                <title>Jidoka Sourcing | All Categories</title>
            </Helmet>

            <div className="all-categories-banner">
                <div className="banner-content">
                    <h1 className="banner-title">Our Collections</h1>
                    <p className="banner-subtitle">
                        Discover our comprehensive range of high-quality apparel across all categories.
                    </p>
                </div>
            </div>

            <section className="categories-grid-section">
                <CategorySection />
            </section>
        </div>
    );
};

export default AllCategories;
