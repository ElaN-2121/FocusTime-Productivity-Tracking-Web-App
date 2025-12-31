import React from 'react';
import '../../styles/pages.css';
import '../../styles/forms.css';
import '../../styles/buttons.css';
import { useAppContext } from '../mentora/context/AppContext';

const Profile = () => {
  const { streak, setStreak } = useAppContext();
  
  const handleSaveChanges = (e) => {
    e.preventDefault();
    // Logic to update streak (e.g., adding 1 when profile is saved)
    setStreak(prev => prev + 1);
    alert("Profile Updated! Your streak has increased.");
  };

  return (
    <div className="dashboard-layout">
      <div className="bottom-sections-grid" style={{ marginTop: '20px' }}>
        {/* Left Column: Avatar & Summary */}
        <div className="side-card">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              backgroundColor: '#e5e7eb', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '2rem',
              marginBottom: '10px'
            }}>
              👤
            </div>
            <h3 style={{ margin: 0 }}>User Name</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>@user_handle</p>
          </div>
          
          <div className="side-list">
             <button className="btn btn-primary" style={{ width: '100%' }}>Edit Avatar</button>
             <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Daily Streak:</span>
                <span style={{ fontWeight: 'bold', color: '#a08c7d' }}>🔥 {streak} Days</span>
             </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="side-card" style={{ flex: 2 }}>
          <h3 style={{ marginBottom: '20px' }}>Personal Information</h3>
          
          <form onSubmit={handleSaveChanges}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>First Name</label>
                <input type="text" className="form-input" placeholder="First Name" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Last Name</label>
                <input type="text" className="form-input" placeholder="Last Name" />
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Email Address</label>
              <input type="email" className="form-input" placeholder="user@example.com" />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Phone Number</label>
              <input type="tel" className="form-input" placeholder="+1 234 567 890" />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Best Study Time</label>
              <select className="form-select" style={{ width: '100%', padding: '8px' }}>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" className="btn" style={{ border: '1px solid var(--border)' }}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
