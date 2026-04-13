import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthButton from "../../components/logoutButton/LogoutButton";
import { jwtDecode } from "jwt-decode";
import PostRecord from "../../components/postRecord/PostRecord";
import Logo from "../../components/Logo";
import "./Posts.css"
import PostItem from "../../components/postItem/PostItem";
import Modal from "../../components/modal/Modal";

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
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false)
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const userId = getUserId();
      const response = await axios.get(`http://localhost:5000/api/post/userposts/${userId}`);
      console.log('API response:', response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   if (getUserId()) fetchPosts();
  // }, []);

  const selectedPost = posts.find(post => post.id === selectedPostId) || null;

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
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

  const addSubPost = async (postId: number, subTitle: string) => {
    try {
      await axios.post(`http://localhost:5000/api/post/subposts`, {postId, title: subTitle.trim()});
      await fetchPosts();
    } catch (error) {
      console.log('Add subpost error:', error);
      throw error;
    }
  }

  return (
    <div className="Posts">
      <div className="Header">
        <Logo />
        <AuthButton />
      </div>
      <div className="MainBoard">
        {/* <h1>Список задач</h1> */}
        <div className="ListBoard">
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
        </div>
        <div className="ItemBoard">
          Задача <br/>
          {selectedPost ? <PostItem title={selectedPost.title} subPosts={selectedPost.subPosts} addSub={addSubPost} id={selectedPost.id} /> : null}
          <button onClick={openModal}>Открыть форму</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Posts
