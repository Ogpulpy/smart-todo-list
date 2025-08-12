import React, { useState } from 'react';
import './TodoInput.css';

const TodoInput = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText, dueDate || null);
      setTaskText('');
      setDueDate('');
      setShowDatePicker(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const clearDueDate = () => {
    setDueDate('');
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
        
        <div className="date-controls">
          <button
            type="button"
            className={`date-toggle ${dueDate ? 'has-date' : ''}`}
            onClick={toggleDatePicker}
            title={dueDate ? `Due: ${new Date(dueDate).toLocaleDateString()}` : 'Add due date'}
          >
            📅
          </button>
          
          {dueDate && (
            <button
              type="button"
              className="clear-date"
              onClick={clearDueDate}
              title="Clear due date"
            >
              ✕
            </button>
          )}
        </div>
        
        <button type="submit" className="add-btn" disabled={!taskText.trim()}>
          Add Task
        </button>
      </div>
      
      {showDatePicker && (
        <div className="date-picker-container">
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="date-picker"
            min={new Date().toISOString().slice(0, 16)}
          />
          <div className="quick-dates">
            <button
              type="button"
              onClick={() => setDueDate(new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16))}
              className="quick-date-btn"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => setDueDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16))}
              className="quick-date-btn"
            >
              Next Week
            </button>
            <button
              type="button"
              onClick={() => setDueDate('')}
              className="quick-date-btn"
            >
              No Due Date
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default TodoInput;
