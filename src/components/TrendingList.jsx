import { Link } from "react-router-dom";
import { motion} from "framer-motion";

const TrendingList = ({ seriesList }) => {
    return (
        <div className="grid gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {seriesList.map((serie, i) => (
                <motion.div
                    key={serie.title}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="overflow-hidden bg-white rounded-lg shadow-md"
                >
                    <Link to={serie.url.split('.net')[1]}>
                        <img
                            className="object-cover w-full h-96"
                            src={serie.images.webp.large_image_url}
                            alt={serie.title}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {serie.title}
                            </h3>
                            <p className="text-gray-700 line-clamp-3">
                                {serie.synopsis}
                            </p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
};

export default TrendingList;
