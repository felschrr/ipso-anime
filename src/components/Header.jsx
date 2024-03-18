import { Link, NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="py-4 text-white bg-gray-800">
			<div className="container flex items-center justify-between mx-auto">
				<Link to="/" className="text-xl font-bold">
					Ipso Anime
				</Link>
				<nav>
					<ul className="flex space-x-4">
						<li>
							<NavLink to="/" exact activeClassName="font-bold">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/search" activeClassName="font-bold">
								Search
							</NavLink>
						</li>
						<li>
							<NavLink to="/profile" activeClassName="font-bold">
								Profile
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;