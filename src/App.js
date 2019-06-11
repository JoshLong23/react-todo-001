import React from 'react';
import './App.css';
import Todo from './Todo';

function App() {
  return (
    <div className='App'>
      <details
        style={{
          margin: '2rem',
          padding: '1rem',
          cursor: 'auto',
          textAlign: 'left',
          background: 'rgba(100,100,100,0.1)',
          borderRadius: '0.5rem'
        }}
      >
        <br />
        <summary style={{ color: 'blue', cursor: 'pointer' }}>Example Todo App</summary>
        This is an example todo app I built using React and Styled Components. Any items you add to
        this list are stored in React state and will not persist if you leave the page or reload
      </details>
      <Todo />
    </div>
  );
}

export default App;
