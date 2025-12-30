import { motion } from "framer-motion";
import ceoImg from "../../../assets/our-team/ceo.png";
import cooImg from "../../../assets/our-team/ceo.png";
import hodImg from "../../../assets/our-team/ceo.png";

const teamMembers = [
    {
        name: "Tycho Luijten",
        role: "CEO",
        image: ceoImg,
    },
    {
        name: "Yvo Wander",
        role: "COO",
        image: cooImg,
    },
    {
        name: "Baptiste Genty",
        role: "Head of Demand",
        image: hodImg,
    },
];

const OurTeam = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mb-12">
                <span className="text-sm text-orange-500 uppercase tracking-widest font-semibold mb-2 block">
                    Our Team
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Crafted with passion, <br />
                    managed by experts.
                </h2>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="group cursor-pointer"
                    >
                        {/* Image Container with Custom Corner */}
                        <div className="relative aspect-[4/5] overflow-hidden rounded-br-[80px] bg-gray-100 transition-transform duration-500 group-hover:shadow-2xl">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Subtle Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Content */}
                        <div className="mt-6">
                            <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-500">
                                {member.name}
                            </h3>
                            <p className="text-gray-500 font-medium uppercase tracking-wider text-sm mt-1">
                                {member.role}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default OurTeam;