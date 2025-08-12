import React, { useState } from 'react';
import './TodoInput.css';

const TodoInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText);
      setTaskText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="task-input"
        />
        <button type="submit" className="add-btn" disabled={!taskText.trim()}>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoInput;
