import useCategory from "../../../hooks/useCategory";
import { Link } from "react-router";
import "./CategorySection.css";

const CategorySection = () => {
    const [allCategories] = useCategory();

    return (
        <div className="category-section-container">
            <div className="category-grid">
                {allCategories.map((category) => (
                    <Link
                        to={`/product/${category._id}`}
                        key={category._id}
                        className="category-card"
                    >
                        <div className="category-image-wrapper">
                            <img
                                src={category.categoryImage}
                                alt={category.categoryName}
                                className="category-image"
                            />
                            <div className="category-overlay">
                                <h3 className="category-name">{category.categoryName}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
