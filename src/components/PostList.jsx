import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const PostImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
`;

const ContentPreview = styled.p`
  font-size: 14px;
  color: #555;
`;

const DateText = styled.small`
  color: #999;
`;

const ErrorText = styled.p`
  color: red;
`;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <Container>
      <Header>
        <button onClick={() => navigate('/write')}>✍️ 게시글 작성하기</button>
      </Header>

      <Title>📋 전체 게시글</Title>
      {error && <ErrorText>{error}</ErrorText>}

      {posts.length === 0 ? (
        <p>등록된 게시글이 없습니다.</p>
      ) : (
        <Grid>
          {posts.map(post => (
            <Card key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
              <h3>{post.title}</h3>
              <p><strong>작성자:</strong> {post.memberEmail}</p>
              {post.imageUrl && (
                <PostImage src={`http://localhost:8080${post.imageUrl}`} alt="post" />
              )}
              <ContentPreview>
                {post.content.length > 60 ? post.content.slice(0, 60) + '...' : post.content}
              </ContentPreview>
              <DateText>{new Date(post.createdAt).toLocaleString()}</DateText>
            </Card>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default PostList;
