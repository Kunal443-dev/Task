import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Plus, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
 
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const res = await api.post('/api/tasks', taskData);
      setTasks([res.data, ...tasks]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const res = await api.put(`/api/tasks/${id}`, updatedData);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(editingTask._id, taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg overflow-hidden relative">
            <LayoutDashboard size={32} className="relative z-10" />
            <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform cursor-pointer"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              {user?.name}'s Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Manage your goals and stay productive</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <div className="glass-card px-5 py-3 hidden sm:flex flex-col justify-center border-primary/20">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Progress</span>
            <div className="text-xl font-bold text-primary">
              {completedCount} <span className="text-sm font-normal text-slate-500">/ {tasks.length}</span>
            </div>
          </div>
          <button 
            onClick={openCreateModal}
            className="btn-primary flex items-center gap-2 group h-full whitespace-nowrap"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform" />
            <span>New Task</span>
          </button>
        </motion.div>
      </div>

      {error ? (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-center mb-6">
          {error}
        </div>
      ) : loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-slate-700 border-t-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TaskList 
            tasks={tasks} 
            onUpdate={handleUpdateTask} 
            onDelete={handleDeleteTask}
            onEdit={openEditModal}
          />
        </motion.div>
      )}

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmit={handleFormSubmit}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Dashboard;
