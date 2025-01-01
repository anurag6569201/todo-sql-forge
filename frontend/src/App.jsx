import React from 'react';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <AddTask />
        </div>
      </div>
      <div className="mt-4">
        <TaskList />
      </div>
    </div>
  );
}

export default App;
