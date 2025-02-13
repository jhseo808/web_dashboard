'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: input.trim(), completed: false }
      ]);
      setInput('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-md"
    >
      <motion.form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-6"
      >
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요"
          className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-xl
                   text-white placeholder-gray-500 focus:outline-none focus:border-gray-700
                   transition-colors"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 flex items-center justify-center bg-blue-500 rounded-xl
                   text-white shadow-lg hover:bg-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </motion.form>

      <motion.div
        className="space-y-2"
        layout
      >
        <AnimatePresence mode="popLayout">
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              layout
              className="group flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-xl"
            >
              <motion.button
                onClick={() => toggleTodo(todo.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          transition-colors duration-200 ${
                            todo.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-600'
                          }`}
              >
                {todo.completed && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </motion.button>

              <span
                className={`flex-1 text-sm ${
                  todo.completed ? 'text-gray-500 line-through' : 'text-white'
                }`}
              >
                {todo.text}
              </span>

              <motion.button
                onClick={() => deleteTodo(todo.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500
                         transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
} 