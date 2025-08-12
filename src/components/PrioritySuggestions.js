import React from 'react';
import './PrioritySuggestions.css';

const PrioritySuggestions = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="priority-suggestions">
      <div className="suggestions-header">
        <h3>🧠 AI Suggestions Applied</h3>
        <p>Your tasks have been reordered and enhanced with smart subtasks!</p>
      </div>
      
      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div key={suggestion.taskId} className="suggestion-item">
            <div className="suggestion-header">
              <span className={`priority-badge ${suggestion.priority}`}>
                {suggestion.priority === 'high' ? '🔥 High Priority' : '⚡ Low Priority'}
              </span>
            </div>
            
            {suggestion.suggestedSubtasks && suggestion.suggestedSubtasks.length > 0 && (
              <div className="suggested-subtasks">
                <h4>Suggested Subtasks:</h4>
                <ul>
                  {suggestion.suggestedSubtasks.map((subtask, index) => (
                    <li key={index} className="suggested-subtask">
                      {subtask.text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="suggestions-footer">
        <p>💡 <strong>Tip:</strong> Click on any task to edit it, or add the suggested subtasks to break it down further.</p>
      </div>
    </div>
  );
};

export default PrioritySuggestions;
