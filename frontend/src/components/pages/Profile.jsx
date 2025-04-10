import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaMobile, FaGraduationCap, FaCode } from 'react-icons/fa';
import '../../styles/Profile.css';

const Profile = () => {
  const { user, updateProfile, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    bio: '',
    institution: '',
    degree: '',
    fieldOfStudy: '',
    graduationYear: '',
    skills: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        bio: user.bio || '',
        institution: user.education?.institution || '',
        degree: user.education?.degree || '',
        fieldOfStudy: user.education?.fieldOfStudy || '',
        graduationYear: user.education?.graduationYear || '',
        skills: user.skills ? user.skills.join(', ') : ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any messages when user starts typing
    if (message.text) setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format the data for the API
      const profileData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile || undefined,
        bio: formData.bio,
        education: {
          institution: formData.institution,
          degree: formData.degree,
          fieldOfStudy: formData.fieldOfStudy,
          graduationYear: formData.graduationYear ? parseInt(formData.graduationYear) : undefined
        },
        skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : []
      };

      // Update profile
      await updateProfile(profileData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    }
  };

  if (!user) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
        <button 
          className={`edit-button ${isEditing ? 'cancel' : ''}`}
          onClick={() => {
            if (isEditing) {
              // Reset form data to original user data
              setFormData({
                name: user.name || '',
                email: user.email || '',
                mobile: user.mobile || '',
                bio: user.bio || '',
                institution: user.education?.institution || '',
                degree: user.education?.degree || '',
                fieldOfStudy: user.education?.fieldOfStudy || '',
                graduationYear: user.education?.graduationYear || '',
                skills: user.skills ? user.skills.join(', ') : ''
              });
              setMessage({ type: '', text: '' });
            }
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {message.text && (
        <div className={`profile-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-content">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">
                  <FaMobile /> Mobile Number
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
            </div>

            <div className="form-section">
              <h3>Education</h3>
              <div className="form-group">
                <label htmlFor="institution">
                  <FaGraduationCap /> Institution
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="University or College"
                />
              </div>

              <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  placeholder="e.g., Bachelor's, Master's"
                />
              </div>

              <div className="form-group">
                <label htmlFor="fieldOfStudy">Field of Study</label>
                <input
                  type="text"
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="form-group">
                <label htmlFor="graduationYear">Graduation Year</label>
                <input
                  type="number"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  placeholder="e.g., 2023"
                  min="1900"
                  max="2100"
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Skills</h3>
              <div className="form-group">
                <label htmlFor="skills">
                  <FaCode /> Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., JavaScript, React, Node.js (comma separated)"
                />
              </div>
            </div>

            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div className="detail-item">
                <span className="detail-label"><FaUser /> Name:</span>
                <span className="detail-value">{user.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label"><FaEnvelope /> Email:</span>
                <span className="detail-value">{user.email}</span>
              </div>
              {user.mobile && (
                <div className="detail-item">
                  <span className="detail-label"><FaMobile /> Mobile:</span>
                  <span className="detail-value">{user.mobile}</span>
                </div>
              )}
              {user.bio && (
                <div className="detail-item">
                  <span className="detail-label">Bio:</span>
                  <p className="detail-value bio">{user.bio}</p>
                </div>
              )}
            </div>

            {(user.education?.institution || user.education?.degree || 
              user.education?.fieldOfStudy || user.education?.graduationYear) && (
              <div className="profile-section">
                <h3>Education</h3>
                {user.education?.institution && (
                  <div className="detail-item">
                    <span className="detail-label