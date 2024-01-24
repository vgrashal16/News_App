import React, { Component } from 'react';
import { Post } from './PostDetails';
import { Link } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
} from '@mui/material';

interface PostListProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
  fetchMorePosts: () => Promise<void>;
  filteredlength: number;
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
    if (this.props.filteredlength > 0) {
      return;
    }
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
      <div
        onScroll={this.handleScroll}
        style={{ overflowY: 'scroll', height: '800px', width: '1000px'}}
      >
        <List>
          {posts.map((post) => (
            <Link
              style={{ textDecoration: 'none' }}
              to="/post"
              onClick={() => onSelectPost(post)}
            >
              <Paper
                style={{
                  listStyle: 'none',
                  border: '1px solid white',
                  margin: '20px',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                <ListItem key={post.objectID}>
                  <ListItemText>
                    <Typography style={{ color: 'maroon' }}>
                      Title: {post.title}
                    </Typography>
                    <Typography style={{ color: 'maroon' }}>
                      Author: {post.author}
                    </Typography>
                    <Typography
                      style={{
                        width: '500px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      URL: {post.url}
                    </Typography>
                    <Typography>Created At: {post.created_at}</Typography>
                    <Typography>Tags: {post._tags.join(', ')}</Typography>
                  </ListItemText>
                </ListItem>
              </Paper>
            </Link>
          ))}
        </List>
      </div>
    );
  }
}

export default PostList;