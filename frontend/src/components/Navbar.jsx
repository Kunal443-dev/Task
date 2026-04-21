import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                T
              </div>
              <span className="font-bold tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                TaskPro
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors">
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-slate-700"></div>
                <div className="flex items-center gap-2 text-primary-200">
                  <User size={18} className="text-primary" />
                  <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center gap-2 text-slate-300 hover:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white transition-colors font-medium">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary py-2 px-5 text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
