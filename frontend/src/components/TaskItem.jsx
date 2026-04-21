import React, { useState } from 'react';
import { Trash2, Edit2, CheckCircle, Circle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

const TaskItem = ({ task, onUpdate, onDelete, onEdit }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleComplete = async () => {
    setIsUpdating(true);
    await onUpdate(task._id, { ...task, isCompleted: !task.isCompleted });
    setIsUpdating(false);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`glass-card p-5 group transition-all duration-300 ${
        task.isCompleted ? 'bg-slate-800/30 border-slate-700/50' : 'hover:border-primary/50'
      }`}
    >
      <div className="flex items-start gap-4">
        <button 
          onClick={toggleComplete}
          disabled={isUpdating}
          className={`flex-shrink-0 mt-1 transition-colors ${
            task.isCompleted ? 'text-primary' : 'text-slate-500 hover:text-primary'
          }`}
        >
          {task.isCompleted ? <CheckCircle size={24} className="fill-primary/20" /> : <Circle size={24} />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold truncate transition-colors ${
            task.isCompleted ? 'text-slate-500 line-through' : 'text-slate-100'
          }`}>
            {task.title}
          </h3>
          <p className={`mt-1 text-sm line-clamp-2 transition-colors ${
            task.isCompleted ? 'text-slate-600 line-through' : 'text-slate-400'
          }`}>
            {task.description}
          </p>
          
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-2 text-slate-400 hover:text-secondary bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
            title="Edit Task"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 rounded-lg hover:bg-red-500/20 hover:border-red-500/30 border border-transparent transition-all"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
