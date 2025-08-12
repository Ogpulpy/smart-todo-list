import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({
  task,
  isEditing,
  onToggle,
  onDelete,
  onStartEdit,
  onStopEdit,
  onUpdate,
  onUpdateDueDate,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask
}) => {
  const [editText, setEditText] = useState(task.text);
  const [subtaskText, setSubtaskText] = useState('');
  const [showSubtasks, setShowSubtasks] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, editText);
    } else {
      setEditText(task.text);
      onStopEdit();
    }
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (subtaskText.trim()) {
      onAddSubtask(task.id, subtaskText);
      setSubtaskText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit(e);
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      onStopEdit();
    }
  };

  const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
  const totalSubtasks = task.subtasks.length;

  // Calculate due date status
  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
    
    if (dueDate < now) return 'overdue';
    if (daysUntilDue <= 1) return 'urgent';
    if (daysUntilDue <= 3) return 'soon';
    return 'normal';
  };

  const dueDateStatus = getDueDateStatus();

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''} overdue`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else if (diffDays <= 7) {
      return `Due in ${diffDays} days`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''} ${dueDateStatus ? `due-${dueDateStatus}` : ''}`}>
      <div className="task-main">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="checkbox"
          />
        </div>

        <div className="task-content">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="edit-form">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="edit-input"
                autoFocus
              />
              <div className="edit-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" className="cancel-btn" onClick={() => {
                  setEditText(task.text);
                  onStopEdit();
                }}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="task-text" onClick={() => onStartEdit(task.id)}>
              {task.text}
            </div>
          )}
          
          {/* Due Date Display */}
          {task.dueDate && (
            <div className="due-date-display">
              <span className={`due-date-badge ${dueDateStatus}`}>
                📅 {formatDueDate(task.dueDate)}
              </span>
              <button
                className="edit-due-date-btn"
                onClick={() => setShowDueDatePicker(!showDueDatePicker)}
                title="Edit due date"
              >
                ✏️
              </button>
            </div>
          )}
          
          {/* Due Date Picker */}
          {showDueDatePicker && (
            <div className="due-date-picker">
              <input
                type="datetime-local"
                value={task.dueDate || ''}
                onChange={(e) => {
                  onUpdateDueDate(task.id, e.target.value);
                  setShowDueDatePicker(false);
                }}
                className="due-date-input"
                min={new Date().toISOString().slice(0, 16)}
              />
              <button
                className="remove-due-date-btn"
                onClick={() => {
                  onUpdateDueDate(task.id, null);
                  setShowDueDatePicker(false);
                }}
              >
                Remove Due Date
              </button>
            </div>
          )}
        </div>

        <div className="task-actions">
          {task.subtasks.length > 0 && (
            <button
              className="subtasks-toggle"
              onClick={() => setShowSubtasks(!showSubtasks)}
              title="Toggle subtasks"
            >
              📋 {completedSubtasks}/{totalSubtasks}
            </button>
          )}
          {!task.dueDate && (
            <button
              className="add-due-date-btn"
              onClick={() => setShowDueDatePicker(!showDueDatePicker)}
              title="Add due date"
            >
              📅
            </button>
          )}
          <button
            className="edit-btn"
            onClick={() => onStartEdit(task.id)}
            title="Edit task"
          >
            ✏️
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Subtasks Section */}
      {task.subtasks.length > 0 && (
        <div className={`subtasks-section ${showSubtasks ? 'expanded' : ''}`}>
          <div className="subtasks-header">
            <h4>Subtasks ({completedSubtasks}/{totalSubtasks})</h4>
            <button
              className="toggle-subtasks-btn"
              onClick={() => setShowSubtasks(!showSubtasks)}
            >
              {showSubtasks ? '▼' : '▶'}
            </button>
          </div>
          
          {showSubtasks && (
            <>
              <div className="subtasks-list">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="subtask-item">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => onToggleSubtask(task.id, subtask.id)}
                      className="subtask-checkbox"
                    />
                    <span className={`subtask-text ${subtask.completed ? 'completed' : ''}`}>
                      {subtask.text}
                    </span>
                    <button
                      className="delete-subtask-btn"
                      onClick={() => onDeleteSubtask(task.id, subtask.id)}
                      title="Delete subtask"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleAddSubtask} className="add-subtask-form">
                <input
                  type="text"
                  value={subtaskText}
                  onChange={(e) => setSubtaskText(e.target.value)}
                  placeholder="Add a subtask..."
                  className="subtask-input"
                />
                <button type="submit" className="add-subtask-btn" disabled={!subtaskText.trim()}>
                  Add
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Add Subtask Button for tasks without subtasks */}
      {task.subtasks.length === 0 && (
        <div className="add-subtask-section">
          <form onSubmit={handleAddSubtask} className="add-subtask-form">
            <input
              type="text"
              value={subtaskText}
              onChange={(e) => setSubtaskText(e.target.value)}
              placeholder="Add a subtask..."
              className="subtask-input"
            />
            <button type="submit" className="add-subtask-btn" disabled={!subtaskText.trim()}>
              Add Subtask
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
