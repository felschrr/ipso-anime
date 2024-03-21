import {
    Navigate,
    useLocation,
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import { Layout } from "./components";
import { Search, Serie, Home, Profile, User, Login, Register } from "./pages";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { StorageProvider } from "./contexts/StorageContext";
import { UserProvider } from "./contexts/UserContext";
import { SearchProvider } from "./contexts/SearchContext";

const RequireAuth = ({ children }) => {
    const { user } = useAuth();
    let location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <StorageProvider>
                        <Router>
                    <SearchProvider>
                            <Layout>
                                <Routes>
                                    <Route index path="/" element={<Home />} />
                                    <Route
                                        path="/search"
                                        element={<Search />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={
                                            <RequireAuth>
                                                <Profile />
                                            </RequireAuth>
                                        }
                                    />
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/register"
                                        element={<Register />}
                                    />
                                    <Route
                                        path="/:type/:id/:name"
                                        element={<Serie />}
                                    />
                                    <Route
                                        path="/user/:uid"
                                        element={<User />}
                                    />
                                </Routes>
                            </Layout>
                    </SearchProvider>
                        </Router>
                </StorageProvider>
            </UserProvider>
        </AuthProvider>
    );
};

export default App;
