import React, { useEffect, useState } from 'react';
import { getLinks } from '../services/api';

interface LinkListProps {
    refresh: boolean;
    onRefreshComplete: () => void;
  }
// LinkList component displays a list of URLs with pagination.
const LinkList: React.FC<LinkListProps> = ({ refresh, onRefreshComplete }) => {
  const [links, setLinks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;

  useEffect(() => {

  // Function to get the list of URLs from backend.
  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await getLinks(page, limit);
      if (response.data.length === 0) {
        setError('No URLs found in the database.');
      } else {
        setLinks(response.data);
        setTotal(response.total);
        setError(null);  // Clear any previous error
      }
    } catch (err) {
      setError('Failed to fetch links. Please try again later.');
    } finally {
      setLoading(false);
      onRefreshComplete(); // Notify parent that refresh is complete
    }
  };
        fetchLinks();
    },  [page, limit, refresh, onRefreshComplete]);

  // Function to set the values on Next button clicks.
  const handleNextPage = () => {
    if (page * limit < total) {
        setPage(prevPage => prevPage + 1); 
    }
  };

  // Function to set the values on Previous button clicks.
  const handlePreviousPage = () => {
    if (page > 1) {
        setPage(prevPage => prevPage - 1); 
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="link-list">
      <h2>Persisted Links</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <p><strong>Original URL:</strong> {link.originalUrl}</p>
            <p><strong>New URL:</strong> {link.newUrl}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={page * limit >= total}>
          Next
        </button>
      </div>
    </div>
  );
};

export default LinkList;
