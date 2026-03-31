import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthButton from "../../components/logoutButton/LogoutButton";
import { jwtDecode } from "jwt-decode";
import PostRecord from "../../components/postRecord/PostRecord";
import Logo from "../../components/Logo";
import "./Posts.css"

interface Post {
  id: number;
  title: string;
  subPosts?: {
    id: number;
    title: string;
  }[];
}

interface IdField {
  id: number | string
}

const getUserId = () => {
  let decodedToken;
  const token = localStorage.getItem('Bearer');
  if (typeof token === 'string') {
    decodedToken = jwtDecode(token);
  }
  const {id} = decodedToken as IdField
  return id
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const fetchPosts = async () => {
    try {
      const userId = getUserId();
      const response = await axios.get(`http://localhost:5000/api/post/userposts/${userId}`);
      console.log('API response:', response.data);
      setPosts(response.data);
      console.log('Posts response:', posts);
    } catch (error) {
      console.error('Fetch error:', error);
      setPosts([]);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

   const selectedPost = posts.find(post => post.id === selectedPostId) || null;

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authorId = getUserId();
    const newPost = {title, authorId};
    await axios.post('http://localhost:5000/api/post/posts', newPost);
    setTitle('');
    fetchPosts();
  }

  const delPost = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/post/posts/${id}`);
    fetchPosts();
  }

  const updPost = async (id: number, data: string) => {
    const newData = window.prompt(data, data);
    if (newData !== null) {
      await axios.put(`http://localhost:5000/api/post/posts/${id}`, {title: newData});
      fetchPosts();
    }
  }

  return (
    <div className='Posts'>
      <div className="Header">
        <Logo />
        <AuthButton />
      </div>
      <form onSubmit={addPost}>
        <div className="AddTask">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Добавить задачу</button>
        </div>
      </form>
        <h1>Список задач</h1>
        <div className="MainBoard">
          <ul>
            {posts.map((post) => (
              <li>
                <PostRecord
                  title={post.title}
                  id={post.id}
                  updPost={updPost}
                  delPost={delPost}
                  subPosts={post.subPosts}
                  isSelected={post.id === selectedPostId}
                  onSelect={() => setSelectedPostId(post.id)}
                />
              </li>
            ))}
          </ul>
        <div className="ItemBoard">
          Задача <br/>
          {selectedPost ? selectedPost.title : null}
        </div>
        </div>
    </div>
  )
}

export default Posts
