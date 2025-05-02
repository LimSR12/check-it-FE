import React, { useState } from 'react';
import axios from 'axios';

function PostForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [memberId, setMemberId] = useState(''); // 사용자 ID

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMemberId(1);

        // formData 구성
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('images', image);
        formData.append('memberId', memberId);

        try {
            const response = await axios.post('http://localhost:8080/api/posts', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message || '업로드 성공!');
        } catch (error) {
            setMessage('업로드 실패: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div style={{ padding: '20px' }}>
        <h2>게시글 업로드</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
            <label>제목:</label><br />
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '300px' }}
            />
            </div>
            <br />
            <div>
            <label>사진:</label><br />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            </div>
            <br />
            <div>
            <label>내용:</label><br />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
                cols="40"
                required
            />
            </div>
            <br />
            <button type="submit">업로드</button>
        </form>

        {message && (
            <div style={{ marginTop: '20px', color: message.includes('성공') ? 'green' : 'red' }}>
            {message}
            </div>
        )}
        </div>
    );
}

export default PostForm;
