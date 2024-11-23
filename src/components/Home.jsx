import React from "react";

const Home = () => {
  return (
    <div className="hero min-h-screen flex items-start justify-center">
      <div className="hero-content text-center">
        <div className="max-w-max bg-base-300 rounded-lg p-8">
          <h1 className="text-3xl font-bold">
            <i className="bi bi-house-door text-3xl mr-2"></i>Welcome to the Product Management System
          </h1>
          <p className="py-4">
            This is a simple product management system. You can manage your
            products, stocks, and logs here. Click on the links in the sidebar
            to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
