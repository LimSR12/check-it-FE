import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Check-It 📝</h1>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/write" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
