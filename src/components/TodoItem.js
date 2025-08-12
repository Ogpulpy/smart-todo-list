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
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask
}) => {
  const [editText, setEditText] = useState(task.text);
  const [subtaskText, setSubtaskText] = useState('');
  const [showSubtasks, setShowSubtasks] = useState(false);

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

  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
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
