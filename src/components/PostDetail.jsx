import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
    const { id } = useParams(); // URL의 :id 파라미터 추출
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
        .then(res => {
            setPost(res.data.data); // APIResponse 기준
        })
        .catch(err => {
            console.error(err);
            setError('게시글을 불러오지 못했습니다.');
        });
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!post) return <p>게시글 로딩 중...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← 뒤로가기</button>
        <h2>{post.title}</h2>
        <p><strong>작성자:</strong> {post.memberEmail}</p>
        <p>{post.content}</p>
        {post.imageUrl && (
            <img
            src={`http://localhost:8080${post.imageUrl}`}
            alt="post"
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
            />
        )}
        <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
    );
}

export default PostDetail;
