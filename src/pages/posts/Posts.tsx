import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthButton from "../../components/logoutButton/LogoutButton";
import { jwtDecode } from "jwt-decode";
import PostRecord from "../../components/postRecord/PostRecord";
import Logo from "../../components/Logo";
import "./Posts.css"
import PostItem from "../../components/postItem/PostItem";
import Modal from "../../components/modal/Modal";
import GroupRecord from "../../components/groupItem/GroupRecord";

interface Records {
  ungrouped?: Post[];
  groups?: Group[];
}
interface Post {
  id: number;
  title: string;
  createDate: string;
  subPosts?: {
    id: number;
    title: string;
  }[];
}

interface Group {
  id: number;
  title: string;
  posts: Post[];
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
  const [groups, setGroups] = useState<Group[]>([]);
  const [title, setTitle] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalGrouppOpen, setIsModalGrouppOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true)
  };

    const openModalGroupp = () => {
    setIsModalGrouppOpen(true)
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

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const userId = getUserId();
      const response = await axios.get(`http://localhost:5000/api/post/usergroups/${userId}`);
      console.log('API response:', response.data);
      setGroups(response.data);
    } catch (error) {
      console.error('Fetch error:', error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchGroups();
  }, []);

  // useEffect(() => {
  //   if (getUserId()) fetchPosts();
  // }, []);

  const selectedPost = posts.find(post => post.id === selectedPostId) || null;

  const addPost = async (data: {title: string | number}) => {
    // setLoading(true);
    const authorId = getUserId();
    const newPost = {title: data.title, authorId};
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

  const addGroupp = async (data: {title: string | number}) => {
    const authorId = getUserId();
    const newGroupp = {title: data.title, authorId};
    await axios.post('http://localhost:5000/api/post/groups', newGroupp);
    setTitle('');
    fetchPosts();
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
          {/* <form onSubmit={addPost}>
            <div className="AddTask">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <button type="submit">Добавить задачу</button>
            </div>
          </form> */}
          <ul>
            <button onClick={openModalGroupp} className="AddPost">Создать группу</button><br />
            <button onClick={openModal} className="AddPost">Добавить задачу</button>
            {groups.map((group) => (
              <li key={group.id}>
                <GroupRecord
                ungrouped={}
                groups={}
                />
                {/* <PostRecord
                  title={post.title}
                  id={post.id}
                  updPost={updPost}
                  delPost={delPost}
                  subPosts={post.subPosts}
                  isSelected={post.id === selectedPostId}
                  onSelect={() => setSelectedPostId(post.id)}
                /> */}
              </li>
            ))}
          </ul>
        </div>
        <div className="ItemBoard">
          Задача <br/>
          {/* {selectedPost ?
          <PostItem
            title={selectedPost.title}
            subPosts={selectedPost.subPosts}
            addSub={addSubPost}
            id={selectedPost.id}
            createDate={selectedPost.createDate}
          /> : null} */}
          <button onClick={openModal}>Открыть форму</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={addPost} fields={[{name: 'title', type: 'text'}]} title="Новая запись" />
      <Modal isOpen={isModalGrouppOpen} onClose={closeModal} onSubmit={addGroupp} fields={[{name: 'title', type: 'text'}]} title="Новая запись" />
    </div>
  )
}

export default Posts
