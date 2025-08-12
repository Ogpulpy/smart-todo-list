import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onUpdateTaskText,
  onUpdateTaskDueDate,
  onAddSubtask,
  onToggleSubtask,
  onDeleteSubtask
}) => {
  const [editingId, setEditingId] = useState(null);

  const startEditing = (taskId) => {
    setEditingId(taskId);
  };

  const stopEditing = () => {
    setEditingId(null);
  };

  const handleUpdateTask = (taskId, newText) => {
    onUpdateTaskText(taskId, newText);
    stopEditing();
  };

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks yet</h3>
        <p>Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
          onStartEdit={startEditing}
          onStopEdit={stopEditing}
          onUpdate={handleUpdateTask}
          onUpdateDueDate={onUpdateTaskDueDate}
          onAddSubtask={onAddSubtask}
          onToggleSubtask={onToggleSubtask}
          onDeleteSubtask={onDeleteSubtask}
        />
      ))}
    </div>
  );
};

export default TodoList;
