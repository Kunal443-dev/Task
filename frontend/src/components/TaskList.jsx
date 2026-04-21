import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskList = ({ tasks, onUpdate, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-700/50 rounded-2xl bg-slate-800/20">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-4">
          <ClipboardList size={32} />
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-2">No tasks yet</h3>
        <p className="text-slate-500 max-w-sm">
          You don't have any tasks right now. Create one to get started on your goals.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
