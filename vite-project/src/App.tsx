import  { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import SearchBar from './components/SearchBar';
import PostDetails, { Post } from './components/PostDetails';

interface AppState {
  posts: Post[];
  filteredPosts: Post[];
  selectedPost: Post | null;
  page: number;
  loading: boolean;
}

class App extends Component<{}, AppState> {
  interval: number | undefined;
  constructor(props: {}) {
    super(props);

    this.state = {
      posts: [],
      filteredPosts: [],
      selectedPost: null,
      page: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
    this.interval = setInterval(this.fetchPosts, 10000);
   }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchPosts = async () => {
    const { page, posts } = this.state;
    try {
      this.setState({ loading: true });
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      );
      this.setState({
        posts: [...posts, ...response.data.hits],
        page: page + 1,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (searchTerm: string) => {
    const { posts } = this.state;
    if (searchTerm.trim() === "") {
      this.setState({ filteredPosts: [] });
      return;
    }
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ filteredPosts: filtered });
    console.log(filtered);
  };
  

  handleSelectPost = (post: Post) => {
    this.setState({ selectedPost: post });
  };


  render() {
    const { filteredPosts, selectedPost } = this.state;

    return (
      <Router>
        <div>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <SearchBar onSearch={this.handleSearch} />
                  <PostList
                    posts={filteredPosts.length > 0 ? filteredPosts : this.state.posts}
                    onSelectPost={this.handleSelectPost}
                    fetchMorePosts={this.fetchPosts}
                  />
                </div>
              }
            />
            <Route path="/post" element={<PostDetails post={selectedPost} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
