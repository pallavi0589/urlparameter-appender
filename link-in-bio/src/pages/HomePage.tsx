import React from 'react';
import LinkForm from '../components/LinkForm';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <h1>Link in Bio - Parameter Appender</h1>
      <LinkForm />
    </div>
  );
};

export default HomePage;
