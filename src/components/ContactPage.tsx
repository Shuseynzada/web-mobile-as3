import React, { useState } from 'react';
import axios from 'axios';
import './ContactPage.css'; // Make sure to create this CSS file

const ContactPage: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios.post('http://localhost:3000/messages', { subject, email, message, date: new Date() })
      .then(response => {
        console.log('Message sent:', response.data);
        setSubmitStatus('Message sent successfully!');
        // Reset form fields
        setSubject('');
        setEmail('');
        setMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
        setSubmitStatus('Failed to send message.');
      });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button className='submitContact' type="submit">Send Message</button>
        <div className="submit-status">{submitStatus}</div>
      </form>
    </div>
  );
};

export default ContactPage;
