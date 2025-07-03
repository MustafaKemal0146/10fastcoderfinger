import React from 'react';

const Contact: React.FC = () => (
  <div className="max-w-2xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-white mb-4">Contact</h1>
    <p className="text-gray-300 mb-4">
      This site was fully designed and developed (front-end & back-end) by Mustafa Kemal Çıngıl. For feedback, collaboration, or professional inquiries, feel free to reach out via the links below.
    </p>
    <div className="flex flex-col space-y-2">
      <a href="https://www.linkedin.com/in/mustafakemalcingil/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn: linkedin.com/in/mustafakemalcingil</a>
      <a href="https://github.com/MustafaKemal0146/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub: github.com/MustafaKemal0146</a>
    </div>
  </div>
);

export default Contact; 