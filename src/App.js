import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Dockerize the app', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        completed: false
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📝 Task Manager</h1>
        <p className="subtitle">Built with React & Docker</p>

        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            Add Task
          </button>
        </div>

        <div className="tasks-list">
          {tasks.length === 0 ? (
            <p className="empty-message">No tasks yet. Add one above!</p>
          ) : (
            tasks.map(task => (
              <div key={task.id} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className={task.completed ? 'task-text completed' : 'task-text'}>
                  {task.text}
                </span>
                <button onClick={() => deleteTask(task.id)} className="delete-button">
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completed:</span>
            <span className="stat-value">{tasks.filter(t => t.completed).length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Pending:</span>
            <span className="stat-value">{tasks.filter(t => !t.completed).length}</span>
          </div>
        </div>

        <div className="docker-info">
          <p>🐳 Running in Docker Container</p>
          <p className="tech-stack">React 18 | Node 18 | Nginx</p>
        </div>
      </div>
    </div>
  );
}

export default App;