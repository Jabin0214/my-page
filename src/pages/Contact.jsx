import React from 'react';

const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r text-neutral-900 bg-clip-text ">
          Contact Me
        </h2>

        {/* Contact Card */}
        <div className="bg-gray-100 shadow-md rounded-2xl p-8">
          <p className="text-gray-700 mb-8 text-lg">
            If you're interested in me, feel free to reach out!
          </p>

          {/* Contact Links */}
          <div className="flex justify-center space-x-8">
            {/* Email */}
            <a 
              href="mailto:jabinchen0214@outlook.com"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email</span>
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/Jabin0214"
              className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;