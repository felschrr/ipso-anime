import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Search, Serie, Home, Profile, User } from "./pages";

const App = () => {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route path="/search" element={<Search />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/:source/:id" element={<Serie />} />
					<Route path="/:user/:uid" element={<User />} />
				</Routes>
			</Layout>
		</Router>
	);
};

export default App;
