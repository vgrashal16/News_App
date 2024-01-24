import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';
import  PostDetails, { Post } from './components/PostDetails'
import { Container, CircularProgress } from '@mui/material';

interface AppState {
  posts: Post[];
  filteredPosts: Post[];
  selectedPost: Post | null;
  page: number;
  loading: boolean;
  nbPages: number;
}

class App extends Component<{}, AppState> {
  interval: number | any;

  constructor(props: {}) {
    super(props);

    this.state = {
      posts: [],
      filteredPosts: [],
      selectedPost: null,
      page: 0,
      loading: false,
      nbPages: 0,
    };
  }

  componentDidMount() {
    this.fetchPosts();
    this.interval = setInterval(this.fetchPosts, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.handleSearch('');
  }

  fetchPosts = async () => {
    const { page, posts } = this.state;
    try {
      this.setState({ loading: true });
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      );
      const data = await res.json()
      this.setState({nbPages : data.nbPages});

      this.setState({
        posts: [...posts, ...data.hits],
        page: page + 1,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      this.setState({ loading: false });
    }
  };
  
  fetchMorePosts = async() => {
    if (this.state.page > this.state.nbPages){
      clearInterval(this.interval);
      return
    }
    await this.fetchPosts();
    clearInterval(this.interval);
    this.interval = setInterval(this.fetchPosts, 10000);
  }

  handleSearch = (searchTerm: string) => {
    const { posts } = this.state;
    if (searchTerm.trim() === '') {
      this.setState({ filteredPosts: [] });
      return;
    }
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ filteredPosts: filtered });

  };

  handleSelectPost = (post: Post) => {
    this.setState({ selectedPost: post });
  };

  render() {
    const { filteredPosts, selectedPost, loading } = this.state;

    return (
      <Router>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <SearchBar onSearch={this.handleSearch} />
                  
                    <PostList
                      posts={
                        filteredPosts.length > 0
                        ? filteredPosts
                        : this.state.posts
                      }
                      onSelectPost={this.handleSelectPost}
                      fetchMorePosts={this.fetchMorePosts}
                      filteredlength={filteredPosts.length}
                    />
                    {loading &&
                    <CircularProgress />}
                </div>
              }
            />
            <Route path="/post" element={<PostDetails post={selectedPost} />} />
          </Routes>
        </Container>
      </Router>
    );
  }
}

export default App;