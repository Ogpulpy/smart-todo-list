# Smart To-Do List 🧠

A modern, AI-powered to-do list application built with React that helps you organize tasks intelligently with priority suggestions and subtask management.

## ✨ Features

- **📝 Task Management**: Add, edit, delete, and mark tasks as complete
- **🧠 AI Priority Suggestions**: Smart task reordering and priority recommendations
- **📋 Subtask Support**: Break down complex tasks into manageable subtasks
- **💾 Local Storage**: Tasks persist across browser sessions
- **📱 Mobile-Friendly**: Responsive design that works on all devices
- **🎨 Modern UI**: Clean, minimalist design with smooth animations
- **⚡ Smart Subtasks**: AI-generated subtask suggestions based on task content

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. The app will automatically reload when you make changes

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🎯 How to Use

### Adding Tasks
1. Type your task in the input field
2. Press Enter or click "Add Task"
3. Your task will appear in the list below

### Managing Tasks
- **Complete**: Check the checkbox to mark a task as done
- **Edit**: Click on the task text to edit it inline
- **Delete**: Click the trash icon to remove a task
- **Subtasks**: Click the clipboard icon to view/add subtasks

### AI Priority Suggestions
1. Add several tasks to your list
2. Click the "🧠 Suggest Priorities" button
3. The app will:
   - Reorder tasks by priority (incomplete tasks first)
   - Suggest relevant subtasks based on task content
   - Apply smart categorization

### Subtasks
- **Add Subtasks**: Use the subtask input field below each task
- **Complete Subtasks**: Check off individual subtasks
- **Delete Subtasks**: Remove subtasks with the × button
- **AI Suggestions**: Get smart subtask recommendations from the AI

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TodoInput.js          # Task input component
│   ├── TodoList.js           # Main task list container
│   ├── TodoItem.js           # Individual task item
│   ├── PrioritySuggestions.js # AI suggestions display
│   └── *.css                 # Component stylesheets
├── App.js                    # Main application component
├── App.css                   # Main app styles
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful color schemes throughout
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Modern Typography**: Clean, readable fonts
- **Interactive Elements**: Hover states and visual feedback

## 🔧 Customization

### Styling
- Modify CSS files in the `src/components/` directory
- Update color schemes in `src/index.css`
- Adjust mobile breakpoints in component CSS files

### AI Suggestions
- Edit the `generateMockSubtasks` function in `App.js`
- Add new task categories and subtask templates
- Integrate with real AI APIs by replacing the mock function

### Local Storage
- Change the storage key from `'smartTodoTasks'` in `App.js`
- Add data validation and migration logic
- Implement cloud sync functionality

## 📱 Mobile Experience

The app is fully responsive and includes:
- Touch-friendly button sizes
- Optimized layouts for small screens
- Mobile-first design principles
- Proper viewport meta tags

## 🚀 Future Enhancements

- **Real AI Integration**: Connect to OpenAI, Claude, or other AI services
- **Cloud Sync**: Save tasks across devices
- **Categories & Tags**: Organize tasks by project or type
- **Due Dates**: Add time-based task management
- **Collaboration**: Share task lists with others
- **Dark Mode**: Toggle between light and dark themes
- **Export/Import**: Backup and restore task data

## 🐛 Troubleshooting

### Common Issues

1. **App won't start**: Ensure Node.js is installed and dependencies are installed
2. **Tasks not saving**: Check browser localStorage support and permissions
3. **Styling issues**: Clear browser cache and restart the dev server
4. **Mobile display problems**: Verify viewport meta tags are present

### Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Built with ❤️ using React**
