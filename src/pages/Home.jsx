import { Trending } from "../components/";
import { TrendingProvider } from "../contexts/TrendingContext";

const Home = () => {
    return (
        <>
            <TrendingProvider>
                <Trending />
            </TrendingProvider>
        </>
    );
};

export default Home;
