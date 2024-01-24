import React from 'react';
import { Button, Typography } from '@mui/material';

export interface Post {
  objectID: string;
  title: string;
  author: string;
  url: string;
  created_at: string;
  _tags: string[];
}

interface PostDetailsProps {
  post: Post | null;
}

const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  if (!post) {
    return <div>No post selected.</div>;
  }


  const handleBack = () => {
    window.location.href = ('/')
  };

  return (
    <div>
      <Button color='primary' variant= 'contained' onClick={handleBack}>Go Back</Button>
      <Typography variant="h2">Title: {post.title}</Typography>
      <Typography>Author: {post.author}</Typography>
      <Typography>URL: {post.url}</Typography>
      <Typography>Created At: {post.created_at}</Typography>
      <Typography>Tags: {post._tags.join(', ')}</Typography>
    </div>
  );
};

export default PostDetails