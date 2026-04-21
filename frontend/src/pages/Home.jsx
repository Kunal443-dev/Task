import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-10 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-8"
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            Manage tasks with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              effortless precision
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            TaskPro is your ultimate production-ready task management solution. 
            Built with a modern stack, prioritizing security and elegant design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                  Get Started for Free
                </Link>
                <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl w-full mt-24 text-left"
        >
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-slate-400">Built with Vite and React for instant hot module replacement and lightning-fast load times.</p>
          </div>
          
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary mb-6">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure by Default</h3>
            <p className="text-slate-400">Industrial grade JWT authentication using HTTP-only cookies to completely mitigate XSS attacks.</p>
          </div>
          
          <div className="glass-card p-8">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent mb-6">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Beautifully Crafted</h3>
            <p className="text-slate-400">Tailwind CSS powered styles and fluid framer-motion animations provide a premium feel.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
