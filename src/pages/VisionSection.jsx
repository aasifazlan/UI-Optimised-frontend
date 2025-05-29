import React from 'react';

const VisionSection = () => {
  return (
    <div className="max-w-screen-xl mt-24 mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-center text-black mb-6">Our Vision</h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg">
        At <strong>Unscripted India</strong>, we envision a nation whose diverse identities, untold histories, and grassroots narratives are given the global platform they deserve. Our mission is to become the definitive voice in capturing, preserving, and celebrating India’s untamed truth — one that often lies hidden beneath mainstream discourse. We believe that every story has the power to inspire, educate, and transform perspectives, and we are committed to delivering such stories with authenticity, depth, and dignity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-black mb-2">Documentary Excellence</h2>
          <p className="text-gray-700">
            We are committed to producing world-class documentary content that transcends entertainment and enters the realm of social impact. Each film we create is rooted in journalistic integrity, cultural sensitivity, and aesthetic brilliance. Through immersive storytelling, we aim to amplify underrepresented voices, shed light on complex socio-political realities, and foster informed discourse both nationally and internationally.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-black mb-2">Reviving Historical Truths</h2>
          <p className="text-gray-700">
            India’s history is an intricate tapestry woven with myths, memories, and multiple perspectives — many of which remain overlooked. At Unscripted India, we undertake rigorous research into archival documents, folk traditions, and academic narratives to reconstruct historical truths with nuance and clarity. Our goal is to challenge historical amnesia and bring forth narratives that inform, heal, and empower future generations.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-black mb-2">Celebrating Cultural Diversity</h2>
          <p className="text-gray-700">
            With over 1.4 billion people and hundreds of ethnicities, languages, and traditions, India is not a monolith — it is a mosaic. We dedicate ourselves to capturing the vibrant spectrum of India’s cultural heritage by spotlighting regional identities, local customs, festivals, culinary practices, art forms, and lived experiences. Our vision is to foster a sense of pride, empathy, and unity in diversity, both within the nation and in the eyes of the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisionSection;
