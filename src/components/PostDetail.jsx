import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  padding: 6px 12px;
  font-size: 14px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-weight: bold;
`;

const Content = styled.p`
  margin-top: 10px;
  line-height: 1.6;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 4px;
  margin: 20px 0;
`;

const DateText = styled.small`
  color: #888;
`;

const ErrorText = styled.p`
  color: red;
`;

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => {
        setPost(res.data.data);
      })
      .catch(err => {
        console.error(err);
        setError('게시글을 불러오지 못했습니다.');
      });
  }, [id]);

  if (error) return <ErrorText>{error}</ErrorText>;
  if (!post) return <p>게시글 로딩 중...</p>;

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← 뒤로가기</BackButton>
      <Title>{post.title}</Title>
      <Author>작성자: {post.memberEmail}</Author>
      <Content>{post.content}</Content>
      {post.imageUrl && (
        <Image
          src={`http://localhost:8080${post.imageUrl}`}
          alt="post"
        />
      )}
      <DateText>{new Date(post.createdAt).toLocaleString()}</DateText>
    </Container>
  );
}

export default PostDetail;
