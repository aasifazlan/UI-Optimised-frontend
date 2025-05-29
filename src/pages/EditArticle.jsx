import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      navigate('/admin-login');
    }

    axios.get(`http://localhost:5000/api/articles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const article = res.data;
        setTitle(article.title);
        setCategory(article.category);
        setContent(article.content);
        setPreview(article.imageUrl); // Assuming imageUrl is the path to the article's image
      })
      .catch((err) => console.error('Error fetching article details:', err));
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !content || !category) {
      alert('Please fill all fields');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('admin-token');
    try {
      const res = await axios.put(`http://localhost:5000/api/articles/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Article updated successfully');
      navigate('/admin-dashboard');
    } catch (err) {
      console.error('Error updating article:', err);
      alert('Error updating article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold text-center">Edit Article</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="history">History of the Day</option>
          <option value="fact">Fact Check</option>
          <option value="festival">Festival Origins</option>
          <option value="diversity">Diversity</option>
          <option value="changes">Recent Changes</option>
        </select>

        <textarea
          rows="5"
          placeholder="Content"
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={handleImageChange}
        />

        {preview && (
          <img src={preview} alt="Preview" className="w-full max-h-64 object-cover rounded" />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Article'}
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
