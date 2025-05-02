import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm'; // 작성 컴포넌트

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Check-It 📝</h1>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/write" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
