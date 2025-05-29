import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '/logo.png';  
// import HistoryBanner from './HistoryBanner';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);

  let dropdownTimeout;

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    setIsAdmin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setIsAdmin(false);
    navigate('/admin-login');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setShowHistoryDropdown(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout = setTimeout(() => {
      setShowHistoryDropdown(false);
    }, 170);
  };

  return (
    <div>
      <nav className="fixed w-full top-0 bg-white shadow px-6 py-4 flex justify-between items-center z-50">
      {/* Logo and Brand */}
      <Link to="/" className="flex items-center space-x-2 text-2xl font-extrabold text-black tracking-tight">
        <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        <span>Unscripted India</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/vision" className="text-gray-700 hover:text-blue-600">Vision</Link>

        {/* History Dropdown (Desktop) */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            History <ChevronDown className="ml-1 w-4 h-4" />
          </button>

          {showHistoryDropdown && (
            <div className="absolute left-0 top-full mt-2 bg-white shadow-md rounded-md min-w-[180px] z-50">
              <Link to="/history/ancient" className="block px-4 py-2 hover:bg-blue-100 text-sm">Ancient</Link>
              <Link to="/history/medieval" className="block px-4 py-2 hover:bg-blue-100 text-sm">Medieval</Link>
              <Link to="/history/modern" className="block px-4 py-2 hover:bg-blue-100 text-sm">Modern</Link>
            </div>
          )}
        </div>

        <Link to="/diversity" className="text-gray-700 hover:text-blue-600">Diversity</Link>
        <Link to="/documentary" className="text-gray-700 hover:text-blue-600">Documentary</Link>

        {isAdmin ? (
          <>
            <Link to="/admin/dashboard" className="text-blue-600 font-medium hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
          </>
        ) : (
          <Link to="/admin-login" className="text-gray-700 hover:text-blue-600">Admin</Link>
        )}
      </div>

      {/* Hamburger Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg px-6 py-4 space-y-4 flex flex-col z-40 md:hidden">
          <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/vision" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Vision</Link>

          {/* Mobile History Toggle */}
          <div className="flex flex-col">
            <button
              className="flex justify-between items-center text-gray-700 hover:text-blue-600"
              onClick={() => setMobileHistoryOpen(prev => !prev)}
            >
              History
              <ChevronDown className={`ml-1 transition-transform ${mobileHistoryOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileHistoryOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link to="/history/ancient" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Ancient</Link>
                <Link to="/history/medieval" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Medieval</Link>
                <Link to="/history/modern" className="block text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Modern</Link>
              </div>
            )}
          </div>

          <Link to="/diversity" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Diversity</Link>
          <Link to="/documentary" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Documentary</Link>

          {isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="text-blue-600 font-medium hover:underline" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <Link to="/admin-login" className="text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>Admin</Link>
          )}
        </div>
      )}
    </nav>
    {/* <HistoryBanner/> */}
    </div>
  );
};

export default Navbar;
