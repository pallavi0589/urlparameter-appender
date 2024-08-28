import React, { useState } from 'react';
import { appendParameters } from '../services/api';
import LinkList  from './LinkList'
import './LinkForm.scss'

// LinkForm component is a user interaction form to enter url and parameters
// And get the newURL, OriginalURL and parameters as response.
const LinkForm: React.FC = () => {
  //state variables
  const [url, setUrl] = useState('');
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [showLinkList, setShowLinkList] = useState(false);
  const [warning, setWarning] = useState<string | null>(null); 
  const [loading, setLoading] = useState(false);
  const [refreshLinks, setRefreshLinks] = useState(false);

  // validation for accepting the URL in form of http/https/www in text box 
  const validateUrl = (url: string): boolean => {
    const protocolRegex = /^(https?:\/\/)(www\.)?/;

    if (!protocolRegex.test(url)) {
      return false;
    }

    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };


  // validation for accepting the parameter's value in text box 
  // Regex to match a username with 2-30 characters containing only letters, numbers, hyphens, and underscores
  const validateParameters = (params: string): boolean => {
    const regex = /^[A-Za-z0-9_\-]{2,30}$/;
    return regex.test(params);
  };

  // Submit method for appending the parameters in URL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      setError('Invalid URL format. Please enter a valid URL (e.g., https://example.com).');
      return;
    }

   if (!validateParameters(parameters)) {
      setError('Invalid parameters format. Please enter valid parameters that is 2-30 characters long and contains only letters, numbers, hyphens, or underscores.');
      return;
    }
    setLoading(true);
    try {
        const response = await appendParameters(url, parameters);
        if (response.warning) {
          setError(response.warning); 
        }
        setResult(response.link);
        setWarning(response.warning || null);
        setError(''); 
        setUrl('');
        setParameters('');
      } catch (err) {
        setError('Error in appending parameters.');
        setResult(null);
      }finally {
        setLoading(false);  // Hide loader
      }
  };

  // Function to set variables for showing the list of URLs.
  const handleGetAllUrlsClick = () => {
    setShowLinkList(true);
    setRefreshLinks(true);
  };
  return (
    <div className="link-form">
    <h2>Append Parameters to URL</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label>URL:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="Enter URL"
          className="input-url"
        />
        <label>Parameters:</label>
        <input
          type="text"
          value={parameters}
          onChange={(e) => setParameters(e.target.value)}
          required
          placeholder="Enter parameters"
          className="input-parameters"
        />
      </div>
      <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
    </form>
    {loading && <div className="loader">Loading...</div>}
    {error && (
      <div className="error">
        <p>{error}</p>
      </div>
    )}

    {result && (
      <div className="result">
        <h3>Result:</h3>
        <p><strong>Original URL:</strong> {result.originalUrl}</p>
        <p><strong>Parameters:</strong> {result.parameters}</p>
        <p><strong>New URL:</strong> {result.newUrl}</p>
      </div>
    )}
 {warning && (
        <div className="warning">
          <p>{warning}</p>
        </div>
      )}
{/* Button to trigger loading the LinkList component */}
 <button onClick={handleGetAllUrlsClick} className="get-urls-button">Get All URLs</button>
 {showLinkList && <LinkList refresh={refreshLinks} onRefreshComplete={() => setRefreshLinks(false)} />}
  </div>
  );
};

export default LinkForm;
