import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  resize: vertical;
  margin-bottom: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #4caf50;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const Message = styled.div`
  margin-top: 20px;
  color: ${({ success }) => (success ? 'green' : 'red')};
`;

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [memberId, setMemberId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMemberId(1); // 테스트용 ID

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('images', image);
    formData.append('memberId', memberId);

    try {
      const response = await axios.post('http://localhost:8080/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('업로드 성공!');
      navigate('/'); // 업로드 후 목록으로 이동
    } catch (error) {
      setMessage('업로드 실패: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <FormContainer>
      <h2>게시글 업로드</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <Label>제목:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>사진:</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <Label>내용:</Label>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
          />
        </div>
        <Button type="submit">업로드</Button>
      </form>

      {message && (
        <Message success={message.includes('성공')}>
          {message}
        </Message>
      )}
    </FormContainer>
  );
}

export default PostForm;
