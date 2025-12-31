import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/forms.css';
import '../../styles/buttons.css';

const Register = ({ onNavigate }) => { // Added onNavigate prop
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Registering:", formData);
    // After logic, navigate to profile
    navigate('/home');
  };

  return (
    <div style={authStyles.container}>
      {/* Left Panel */}
      <div style={{...authStyles.imagePanel, display: isMobile ? 'none' : 'flex'}}>
        <div style={authStyles.placeholderContent}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join Us</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
            Start your productivity journey today.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={authStyles.formPanel}>
        <div style={authStyles.formWrapper}>
          <h2 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Register</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Create an account to continue
          </p>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={authStyles.label}>Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={authStyles.label}>Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={authStyles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Repeat password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
              SIGN UP
            </button>
          </form>

          <div style={authStyles.divider}>Or Sign up with</div>

          <div style={authStyles.socialButtons}>
            <button className="btn" style={authStyles.socialBtn}>Google</button>
            <button className="btn" style={authStyles.socialBtn}>Apple ID</button>
            <button className="btn" style={authStyles.socialBtn}>Facebook</button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Already have an account?{" "}
            <span 
              onClick={() => navigate('/login')} 
              style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: '600' }}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const authStyles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: 'white',
  },
  imagePanel: {
    flex: 1,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderTopRightRadius: '40px',
    borderBottomRightRadius: '40px',
  },
  placeholderContent: {
    textAlign: 'center',
  },
  formPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  formWrapper: {
    width: '100%',
    maxWidth: '400px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#333',
  },
  divider: {
    textAlign: 'center',
    margin: '20px 0',
    color: '#666',
    fontSize: '0.85rem',
  },
  socialButtons: {
    display: 'flex',
    gap: '10px',
  },
  socialBtn: {
    flex: 1,
    border: '1px solid #ddd',
    background: 'white',
  },
};

export default Register;
