import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 추가

function PostList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // 추가

    useEffect(() => {
        axios.get('/api/posts')
        .then(res => {
            setPosts(res.data.data);
        })
        .catch(err => {
            console.error(err);
            setError('게시글을 불러오지 못했습니다.');
        });
    }, []);

    return (
    <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <button onClick={() => navigate('/write')}>✍️ 게시글 작성하기</button>
        </div>
    
        <h2>📋 전체 게시글</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    
        {posts.length === 0 ? (
        <p>등록된 게시글이 없습니다.</p>
        ) : (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
        }}>
            {posts.map(post => (
            <div
                key={post.id}
                onClick={() => navigate(`/posts/${post.id}`)}
                style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1.0)'}
            >
                <h3>{post.title}</h3>
                <p><strong>작성자:</strong> {post.memberEmail}</p>
                {post.imageUrl && (
                <img
                    src={`http://localhost:8080${post.imageUrl}`}
                    alt="post"
                    style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }}
                />
                )}
                <p style={{ fontSize: '14px', color: '#555' }}>
                {post.content.length > 60 ? post.content.slice(0, 60) + '...' : post.content}
                </p>
                <small style={{ color: '#999' }}>
                {new Date(post.createdAt).toLocaleString()}
                </small>
            </div>
            ))}
        </div>
        )}
    </div>
    );
      
}

export default PostList;
