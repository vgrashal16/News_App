import React from 'react';

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

  return (
    <div>
      <h2>Title: {post.title}</h2>
      <p>Author: {post.author}</p>
      <p>URL: {post.url}</p>
      <p>Created At: {post.created_at}</p>
      <p>Tags: {post._tags.join(', ')}</p>
    </div>
  );
};

export default PostDetails;

