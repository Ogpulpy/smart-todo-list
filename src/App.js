import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import PrioritySuggestions from './components/PrioritySuggestions';

function App() {
  const [tasks, setTasks] = useState([]);
  const [suggestions, setSuggestions] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('smartTodoTasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('smartTodoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText.trim(),
        completed: false,
        priority: 'medium',
        subtasks: [],
        createdAt: new Date().toISOString()
      };
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  };

  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const updateTaskText = (taskId, newText) => {
    if (newText.trim()) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, text: newText.trim() } : task
        )
      );
    }
  };

  const addSubtask = (taskId, subtaskText) => {
    if (subtaskText.trim()) {
      const newSubtask = {
        id: Date.now(),
        text: subtaskText.trim(),
        completed: false
      };
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, subtasks: [...task.subtasks, newSubtask] }
            : task
        )
      );
    }
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map(subtask =>
                subtask.id === subtaskId
                  ? { ...subtask, completed: !subtask.completed }
                  : subtask
              )
            }
          : task
      )
    );
  };

  const deleteSubtask = (taskId, subtaskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId)
            }
          : task
      )
    );
  };

  const getPrioritySuggestions = () => {
    // Mock AI API call - in a real app, this would call an actual AI service
    const mockSuggestions = {
      reorderedTasks: [...tasks].sort((a, b) => {
        // Simple priority logic: incomplete tasks first, then by creation date
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return new Date(a.createdAt) - new Date(b.createdAt);
      }),
      suggestions: tasks.map(task => ({
        taskId: task.id,
        priority: task.completed ? 'low' : 'high',
        suggestedSubtasks: generateMockSubtasks(task.text)
      }))
    };

    // Apply suggestions
    setTasks(mockSuggestions.reorderedTasks);
    setSuggestions(mockSuggestions.suggestions);
  };

  const generateMockSubtasks = (taskText) => {
    const subtaskTemplates = {
      'work': ['Research', 'Plan', 'Execute', 'Review', 'Document'],
      'study': ['Read materials', 'Take notes', 'Practice exercises', 'Review', 'Test knowledge'],
      'exercise': ['Warm up', 'Main workout', 'Cool down', 'Stretch', 'Hydrate'],
      'clean': ['Declutter', 'Dust', 'Vacuum', 'Organize', 'Maintain'],
      'cook': ['Plan menu', 'Buy ingredients', 'Prep ingredients', 'Cook', 'Clean up']
    };

    const lowerText = taskText.toLowerCase();
    for (const [category, subtasks] of Object.entries(subtaskTemplates)) {
      if (lowerText.includes(category)) {
        return subtasks.map(text => ({
          id: Date.now() + Math.random(),
          text,
          completed: false
        }));
      }
    }

    // Default subtasks
    return ['Break down task', 'Set milestones', 'Track progress', 'Complete', 'Review'].map(text => ({
      id: Date.now() + Math.random(),
      text,
      completed: false
    }));
  };

  const clearSuggestions = () => {
    setSuggestions(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart To-Do List</h1>
      </header>
      
      <main className="App-main">
        <TodoInput onAddTask={addTask} />
        
        <div className="actions-container">
          <button 
            className="suggest-btn"
            onClick={getPrioritySuggestions}
            disabled={tasks.length === 0}
          >
            🧠 Suggest Priorities
          </button>
          
          {suggestions && (
            <button className="clear-suggestions-btn" onClick={clearSuggestions}>
              Clear Suggestions
            </button>
          )}
        </div>

        {suggestions && (
          <PrioritySuggestions suggestions={suggestions} />
        )}

        <TodoList
          tasks={tasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
          onUpdateTaskText={updateTaskText}
          onAddSubtask={addSubtask}
          onToggleSubtask={toggleSubtask}
          onDeleteSubtask={deleteSubtask}
        />
      </main>
    </div>
  );
}

export default App;
