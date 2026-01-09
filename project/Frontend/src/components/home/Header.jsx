import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/User/user-action.js";
import { User, LogOut, Home, Calendar, Building2 } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/assets/logo.png" 
              alt="HomelyHub Logo" 
              className="h-12 w-12 object-contain rounded"
            />
            <span className="text-2xl font-bold text-gray-800">HomelyHub</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-700 hover-text-primary transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/accommodation"
                  className="flex items-center space-x-1 text-gray-700 hover-text-primary transition-colors"
                >
                  <Building2 className="h-5 w-5" />
                  <span>Accommodation</span>
                </Link>
                <Link
                  to="/my-bookings"
                  className="flex items-center space-x-1 text-gray-700 hover-text-primary transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  <span>My Bookings</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-gray-700 hover-text-primary transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover-text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover-text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                  style={{ textDecoration: 'none' }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

