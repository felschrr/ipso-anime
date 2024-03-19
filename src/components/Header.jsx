import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
    const { logout, user } = useAuth();

    return (
        <header className="py-4 mb-8 text-white bg-gray-800">
            <div className="container flex items-center justify-between mx-auto">
                <Link to="/" className="text-xl font-bold">
                    Ipso Anime
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <NavLink to="/" exact="true" activeclassname="font-bold">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/search" activeclassname="font-bold">
                                Search
                            </NavLink>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/profile"
                                        activeclassname="font-bold"
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={logout}
                                        activeclassname="font-bold"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink
                                    to="/login"
                                    activeclassname="font-bold"
                                >
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
