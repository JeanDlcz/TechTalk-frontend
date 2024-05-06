import React from 'react';

const EmailVerificationPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <span className="text-5xl" role="img" aria-label="Emoji feliz">
        📧
        </span>
        <h1 className="text-2xl font-semibold mb-2">¡Verify your email!</h1>
        <p className="text-lg text-gray-700 mb-4">We have sent you a verification link.</p>
        <p className="text-gray-600">Please check your inbox and click the link to continue.</p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
