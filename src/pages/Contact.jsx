import React, { useState } from 'react';
import api from '../lib/axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
  e.preventDefault();
  setError('');
  setSubmitted(false);

  try {
    const res = await api.post('/contact', formData); // Send form data via POST

    // Axios responses already contain the parsed data
    if (res.status === 200) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      throw new Error(res.data?.message || 'Something went wrong.');
    }
  } catch (err) {
    setError(err.response?.data?.message || err.message);
  }
};


  return (
    <div className="max-w-2xl mt-20 mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

      {submitted && (
        <div className="text-green-600 text-lg font-medium mb-6">
          Thank you for reaching out! We'll get back to you soon.
        </div>
      )}

      {error && (
        <div className="text-red-600 text-lg font-medium mb-6">
          {error}
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
              value={formData.message}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
