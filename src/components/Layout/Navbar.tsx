import { NavLink, NavLinkRenderProps } from 'react-router-dom';

const Navbar = () => {
    const getNavLinkClass = ({ isActive }: NavLinkRenderProps) => (
        isActive
            ? 'px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100'
            : 'px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-gray-700 hover:text-white'
    );

    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex space-x-4">
                        <NavLink to="/" className={getNavLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/cards" className={getNavLinkClass}>
                            Flash Cards
                        </NavLink>
                        <NavLink to="/contact" className={getNavLinkClass}>
                            Contact
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
