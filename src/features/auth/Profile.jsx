import React, { useState, useEffect, useContext } from "react";
import { usePersonalInfo } from "../../hooks/usePersonalInfo";
import { useProgressAnalytics } from "../../hooks/useProgressAnalytics";
import { AuthContext } from "../../context/AuthContext";
import { createNotification } from "../../services/notificationService";
import "../../styles/profile.css";
import "../../styles/buttons.css";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { personalInfo, loading: infoLoading, updateInfo } = usePersonalInfo();
  const { data, loading: analyticsLoading } = useProgressAnalytics();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bestStudyTime: "Morning",
  });

  useEffect(() => {
    if (personalInfo) {
      setFormData({
        firstName: personalInfo.firstName || "",
        lastName: personalInfo.lastName || "",
        phone: personalInfo.phone || "",
        bestStudyTime: personalInfo.bestStudyTime || "Morning",
      });
    }
  }, [personalInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      await updateInfo(formData);
      setIsEditing(false);

      await createNotification(
        user.uid,
        "Profile updated successfully! Your changes are now live. ✨"
      );

    } catch (error) {
      await createNotification(
        user.uid,
        "Failed to save profile changes");

    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      if (personalInfo) {
        setFormData({
          firstName: personalInfo.firstName || "",
          lastName: personalInfo.lastName || "",
          phone: personalInfo.phone || "",
          bestStudyTime: personalInfo.bestStudyTime || "Morning",
        });
      }
    }
    setIsEditing(!isEditing);
  };

  if (infoLoading || analyticsLoading) {
    return <div className="dashboard-layout">Loading Profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-grid">
        <aside className="profile-card">
          <div className="avatar-section">
            <div className="avatar-circle">👤</div>
            <h3 style={{ margin: "10px 0 5px" }}>
              {personalInfo?.firstName} {personalInfo?.lastName || "User"}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {personalInfo?.email}
            </p>
          </div>

          <div className="side-list">
            <button
              className={`btn ${isEditing ? "btn-secondary" : "btn-primary"}`}
              style={{ width: "100%" }}
              onClick={toggleEdit}
            >
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
            <div className="streak-badge">
              <span>Daily Streak</span>
              <span className="streak-count">🔥 {data?.streak || 0} Days</span>
            </div>
          </div>
        </aside>

        <main className="profile-card">
          <h3 style={{ marginBottom: "25px" }}>Personal Information</h3>

          <form onSubmit={handleSaveChanges}>
            <div className="profile-input-grid profile-form-group">
              <div>
                <label className="profile-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="profile-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="First Name"
                />
              </div>
              <div>
                <label className="profile-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="profile-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="profile-form-group">
              <label className="profile-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="profile-input"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Not set"
              />
            </div>

            <div className="profile-form-group">
              <label className="profile-label">Best Study Time</label>
              <select
                name="bestStudyTime"
                className="profile-select"
                value={formData.bestStudyTime}
                onChange={handleInputChange}
                disabled={!isEditing}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            {isEditing && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "flex-end",
                  marginTop: "30px",
                }}
              >
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default Profile;