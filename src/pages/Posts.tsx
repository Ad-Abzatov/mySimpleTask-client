import axios from "axios";
import { useEffect, useState } from "react";
import AuthButton from "../components/LogoutButton";
import { jwtDecode } from "jwt-decode";
import PostRecord from "../components/PostRecord";

interface Post {
  id: number
  title: string
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

  const fetchPosts = async () => {
    const userId = getUserId();
    const response = await axios.get(`http://localhost:5000/api/post/userposts/${userId}`);
    setPosts(response.data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (e: any) => {
    e.preventDefault();
    const authorId = getUserId();
    const newPost = {title, authorId};
    await axios.post('http://localhost:5000/api/post/posts', newPost);
    setTitle('');
    fetchPosts();
  }

  const delPost = async (id: any) => {
    await axios.delete(`http://localhost:5000/api/post/posts/${id}`);
    fetchPosts();
  }

  const updPost = async (id: any, data: string) => {
    const newData = window.prompt(data, data);
    if (newData !== null) {
      await axios.put(`http://localhost:5000/api/post/posts/${id}`, {title: newData});
      fetchPosts();
    }
  }

  return (
    <div className='Posts'>
      <AuthButton />
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
        {posts.map((post) => (
          <PostRecord title={post.title} id={post.id} updPost={updPost} delPost={delPost} />
        ))}
    </div>
  )
}

export default Posts
