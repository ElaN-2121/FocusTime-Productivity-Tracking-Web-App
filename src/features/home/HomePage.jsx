import "./HomePage.css";

import {
  FaHome,
  FaClock,
  FaTasks,
  FaStickyNote,
  FaYoutube,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaRegImage,
} from "react-icons/fa";

export default function Home() {
  return (
    <div className="external-home container">
      <main className="main">
        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <h1>FocusTime</h1>
            <p>Your Time. Your Focus. Your Growth.</p>

            <div className="actions">
              <button className="primary">Start Focus</button>
              <button>View Progress</button>
            </div>
          </div>

          <div className="image-box">
            <FaRegImage />
          </div>
        </section>

        {/* CARDS */}
        <section className="cards">
          <div className="card">
            <h3>Notifications</h3>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          <div className="card">
            <h3>About</h3>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line short"></div>
          </div>
        </section>
      </main>
    </div>
  );
}


