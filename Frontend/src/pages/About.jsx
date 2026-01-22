import React from "react";
import "./About.css";

const teamMembers = [
  {
    name: "Dhaval Patil",
    role: "Software Developer",
    image: "/images/1.jpg",
    bio: "Dhaval manages APIs, databases, and authentication for a secure and efficient backend system.",
  },
  {
    name: "Akanksha Dhanawade",
    role: "Software Developer",
    image: "/images/2.jpg",
    bio: "Akanksha crafts user-friendly interfaces using React and CSS, making the shopping experience seamless.",
  },
  {
    name: "Varsha Matsagar",
    role: "Software Developer",
    image: "/images/3.png",
    bio: "Varsha oversees the entire grocery store project, ensuring smooth coordination and quality development.",
  },
];

const About = () => (
  <div className="about-container">
    <h1>About Our FastNFresh</h1>
    <p className="about-intro">
      Welcome to <strong>FastNFresh</strong> — your one-stop online FastNFresh!
      We’re passionate about bringing fresh, high-quality groceries right to
      your doorstep. Our mission is to simplify shopping and make healthy living
      more convenient.
    </p>

    <h2>Meet Our Team</h2>
    <div className="team-grid">
      {teamMembers.map((member, index) => (
        <div className="team-card" key={index}>
          <img
            src={member.image}
            alt={member.name}
            style={{ height: "50vh" }}
          />
          <h3>{member.name}</h3>
          <p className="role">{member.role}</p>
          <p className="bio">{member.bio}</p>
        </div>
      ))}
    </div>
  </div>
);

export default About;
