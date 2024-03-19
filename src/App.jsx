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
            <Router>
                <Layout>
                    <Routes>
                        <Route index path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route
                            path="/profile"
                            element={
                                <RequireAuth>
                                    <Profile />
                                </RequireAuth>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/:source/:id" element={<Serie />} />
                        <Route path="/:user/:uid" element={<User />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;
