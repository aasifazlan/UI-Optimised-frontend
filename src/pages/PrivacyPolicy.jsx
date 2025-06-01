import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Effective Date: 18 May 2025 </p>

      <p className="mb-4">
        Unscripted India is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Personal Information:</strong> We may collect your name and email if you contact us.</li>
        <li><strong>Usage Data:</strong> We collect data such as pages visited, browser type, and time spent on our site.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To improve website performance and content.</li>
        <li>To respond to inquiries or feedback.</li>
        <li>To monitor analytics and user engagement.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services like Google Analytics or Cloudinary. These services may collect data in accordance with their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We take reasonable measures to protect your information but cannot guarantee complete security.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You may request to access, correct, or delete your personal data by contacting us at [your email].
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies</h2>
      <p className="mb-4">
        We use cookies to enhance your experience. Cookies collect usage data such as browsing history and preferences. You can disable cookies in your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy occasionally. Changes will be posted on this page.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
      <p>If you have questions, contact us at: <a href="mailto:info@unscriptedindia.in" className="text-blue-600">info@unscriptedindia.in</a></p>
    </div>
  );
};

export default PrivacyPolicy;
