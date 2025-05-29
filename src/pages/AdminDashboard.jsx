import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import TiptapEditor from '../components/TiptapEditor';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('history');
  const [period, setPeriod] = useState(''); // <-- Added period state
  const [images, setImages] = useState([]); // New files to upload
  const [content, setContent] = useState('');
  const [previewImages, setPreviewImages] = useState([]); // URLs of existing images or previews of new uploads
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) navigate('/admin-login');
    fetchArticles();
  }, [navigate]);

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles');
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setCategory('history');
    setPeriod(''); // <-- reset period
    setImages([]);
    setContent('');
    setPreviewImages([]);
    setEditingId(null);
  };

  const handleEdit = (article) => {
    setTitle(article.title);
    setAuthor(article.author || '');
    setCategory(article.category);
    setPeriod(article.period || ''); // <-- set period on edit
    setContent(article.content);
    setEditingId(article._id);

    setPreviewImages(article.images ? article.images.map(img => img.url) : []);
    setImages([]);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('admin-token');
    if (!window.confirm('Are you sure you want to delete this article?')) return;

    try {
      await api.delete(`/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchArticles();
      setMessage('🗑️ Article deleted successfully.');
    } catch (err) {
      console.error(err);
      setError('❌ Failed to delete article.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    navigate('/admin-login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (!title || !author || !content || (!images.length && !previewImages.length) || !category || !period) {
      setError('Please fill all fields including period and upload at least one image.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('category', category);
    formData.append('period', period); // <-- send period
    formData.append('content', content);

    images.forEach((img) => formData.append('images', img));

    const token = localStorage.getItem('admin-token');

    try {
      if (editingId) {
        await api.put(`/articles/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage('✅ Article updated successfully!');
      } else {
        await api.post('/articles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage('✅ Article uploaded successfully!');
      }

      resetForm();
      fetchArticles();
    } catch (err) {
      console.error(err);
      setError('❌ Failed to upload/update article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center w-full">🛠 Admin Article Dashboard</h1>
        <button onClick={handleLogout} className="text-red-500 text-sm">
          Logout
        </button>
      </div>

      {message && <p className="text-green-600 text-center">{message}</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 mt-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Author"
          className="w-full p-2 border rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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

        {/* New Period Input */}
        <input
          type="text"
          placeholder="Period"
          className="w-full p-2 border rounded"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />

        <TiptapEditor content={content} onChange={setContent} />

        <input
          type="file"
          accept="image/*"
          className="w-full"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}
        />

        {images.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {images.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`Upload Preview ${idx}`}
                className="w-32 h-32 object-cover rounded"
              />
            ))}
          </div>
        )}

        {!images.length && previewImages.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {previewImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Preview ${idx}`}
                className="w-32 h-32 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : editingId ? 'Update Article' : 'Upload Article'}
        </button>
      </form>

      <hr className="my-10" />

      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.category}</p>
              <p className="text-xs text-gray-400">By {article.author}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(article)}
                className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 text-sm rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(article._id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
