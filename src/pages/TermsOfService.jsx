import { Import } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
 

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">Effective Date: 18 May 2025</p>

      <p className="mb-4">
        By accessing or using the Unscripted India website (the "Service"), you agree to these Terms of Service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Use of the Website</h2>
      <p className="mb-4">
        You agree to use the website in a lawful and respectful manner. You must not engage in unauthorized access, disrupt services, or misuse content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
      <p className="mb-4">
        All content on this site, including text, images, and media, is the property of Unscripted India unless stated otherwise. Unauthorized use is prohibited.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Contributions</h2>
      <p className="mb-4">
        If you submit content (e.g., comments, messages), you grant us the right to use, display, and distribute that content on our platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        Unscripted India is not liable for any indirect or incidental damages resulting from the use of the website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Modifications to the Service</h2>
      <p className="mb-4">
        We reserve the right to change or discontinue any part of the website without prior notice.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by and construed under the laws of India.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>If you have questions, contact us at: <a href="mailto:info@unscriptedindia.in" className="text-blue-600">info@unscriptedindia.com</a></p>
    </div>
  );
};

export default TermsOfService;
