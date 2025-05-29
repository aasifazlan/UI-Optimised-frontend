const Newsletter = () => {
  return (
    <div className="bg-gray-100 p-8 text-center">
      <h2 className="text-2xl font-bold mb-2">Stay Connected</h2>
      <p className="mb-4">
        Subscribe to our newsletter for historical facts, cultural insights, and updates.
      </p>
      <input
        type="email"
        placeholder="Your email"
        className="p-2 rounded border border-gray-300 w-64 mb-4"
      />
      <br />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Subscribe
      </button>
    </div>
  );
};

export default Newsletter;
