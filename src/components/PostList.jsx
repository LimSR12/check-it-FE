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
        <div>
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
            <button onClick={() => navigate('/write')}>✍️ 게시글 작성하기</button>
        </div>

        <h2>📋 전체 게시글</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {posts.length === 0 ? (
            <p>등록된 게시글이 없습니다.</p>
        ) : (
            posts.map(post => (
            <div key={post.id} style={{
                border: '1px solid #ccc',
                padding: '10px',
                marginBottom: '15px',
                borderRadius: '8px',
                maxWidth: '500px'
            }}>
                <h3>{post.title}</h3>
                <p><strong>작성자:</strong> {post.memberEmail}</p>
                <p>{post.content}</p>
                {post.imageUrl && (
                <img
                    src={`http://localhost:8080${post.imageUrl}`}
                    alt="post"
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
                )}
                <small>{new Date(post.createdAt).toLocaleString()}</small>
            </div>
            ))
        )}
        </div>
    );
}

export default PostList;
