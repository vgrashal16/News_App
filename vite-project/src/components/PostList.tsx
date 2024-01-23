// src/components/PostList.tsx
import React, { Component } from 'react';
import { Post } from './PostDetails';
import { Link } from 'react-router-dom';

interface PostListProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  fetchMorePosts: () => Promise<void>;
}

interface PostListState {
  loading: boolean;
}

class PostList extends Component<PostListProps, PostListState> {
  constructor(props: PostListProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const { loading } = this.state;

    if (scrollHeight - scrollTop === clientHeight && !loading) {
      try {
        this.setState({ loading: true });
        await this.props.fetchMorePosts();
        this.setState({ loading: false });
      } catch (error) {
        console.error('Error fetching more posts:', error);
        this.setState({ loading: false });
      }
    }
  };

  render() {
    const { posts, onSelectPost } = this.props;

    return (
      <div onScroll={this.handleScroll} style={{ overflowY: 'scroll', height: '700px' }}>
        <ul >
          {posts.map((post) => (
          <Link to="/post" onClick={() => onSelectPost(post) }>
            <div style={{textDecoration: 'none', listStyle: 'none', border: '1px solid black', margin:'20px', padding: '10px'}}>
            <li key={post.objectID} style={{textDecoration: 'none', listStyle: 'none'}} >
              <p>Title: {post.title}</p>
              <p>Author: {post.author}</p>
              <p>URL: {post.url}</p>
              <p>Created At: {post.created_at}</p>
              <p>Tags: {post._tags.join(', ')}</p>
            </li>
            </div>
          </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostList;
