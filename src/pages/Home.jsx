import { Link } from "react-router-dom";
import {
  FiGithub,
  FiYoutube,
  FiMail,
  FiArrowRight,
  FiCalendar,
  FiClock,
} from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import {
  SiLeetcode,
  SiPython,
  SiSpring,
  SiMysql,
  SiPostgresql,
  SiJenkins,
} from "react-icons/si";
import { posts } from "../data/posts";
import { projects } from "../data/projects";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import Footer from "../components/Footer";
import heroImg from "../assets/hero.jpg";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "Java", icon: null },
      { name: "Python", icon: <SiPython /> },
      { name: "SQL", icon: null },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "Spring Boot", icon: <SiSpring /> },
      { name: "Spring MVC", icon: null },
      { name: "Spring Core", icon: null },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "Oracle", icon: null },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
  },
  {
    category: "Cloud & CI/CD",
    items: [
      { name: "AWS", icon: null },
      { name: "Jenkins", icon: <SiJenkins /> },
      { name: "GitHub", icon: <FiGithub /> },
    ],
  },
  {
    category: "Core",
    items: [
      { name: "Microservices", icon: null },
      { name: "REST APIs", icon: null },
      { name: "DSA", icon: null },
      { name: "OOP", icon: null },
      { name: "DBMS", icon: null },
    ],
  },
];

function BlogCard({ post }) {
  const ref = useScrollAnimation();
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card fade-up" ref={ref}>
      <div className="blog-card-tags">
        {post.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="tag tag-accent">
            {tag}
          </span>
        ))}
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="blog-card-meta">
        <span>
          <FiCalendar size={12} />
          {formatDate(post.date)}
        </span>
        <span>
          <FiClock size={12} />
          {post.readTime}
        </span>
      </div>
    </Link>
  );
}

function ProjectCard({ project }) {
  const ref = useScrollAnimation();
  return (
    <div className="project-card fade-up" ref={ref}>
      <div className="project-card-header">
        <h3>{project.name}</h3>
        <span
          className={`status-badge ${
            project.status === "Active" ? "status-active" : "status-progress"
          }`}
        >
          {project.status}
        </span>
      </div>
      <p>{project.description}</p>
      <ul className="project-highlights">
        {project.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <div className="project-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const recentPosts = posts.slice(0, 3);
  const writingRef = useScrollAnimation();
  const projectsRef = useScrollAnimation();
  const skillsRef = useScrollAnimation();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="hero-greeting">Hi, I&apos;m</p>
            <h1 className="hero-name">Christopher M.</h1>
            <p className="hero-title">Backend Engineer</p>
            <p className="hero-bio">
              Building scalable microservices and reliable backend platforms.
              3+ years in fintech, specializing in Java, Spring Boot, and
              distributed systems on AWS.
            </p>
            <div className="hero-actions">
              <a
                href="https://www.linkedin.com/in/chriscodelab/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://github.com/ChrisCodeLab"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <FiGithub /> GitHub
              </a>
              <Link to="/contact" className="btn btn-ghost">
                Get in touch <FiArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-socials">
              <a
                href="https://leetcode.com/u/ChrisCodeLab/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="LeetCode"
              >
                <SiLeetcode />
              </a>
              <a
                href="https://www.youtube.com/@ChrisCodeLab"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="YouTube"
              >
                <FiYoutube />
              </a>
              <Link to="/contact" className="social-icon" title="Contact">
                <FiMail />
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img src={heroImg} alt="Christopher M — Backend Engineer" />
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ABOUT */}
      <section className="section">
        <div className="container">
          <h2>About</h2>
          <p style={{ maxWidth: "620px", fontSize: "1rem", lineHeight: "1.88" }}>
            I&apos;m Christopher, a Backend Software Engineer with 3.7 years of
            experience building and deploying microservices for large-scale
            financial platforms. I have strong expertise in Java, Spring Boot,
            and Oracle with hands-on experience in AWS-hosted production systems
            and CI/CD-driven deployments.
          </p>
        </div>
      </section>

      <hr className="divider" />

      {/* RECENT WRITING */}
      <section className="section">
        <div className="container">
          <div className="section-header fade-up" ref={writingRef}>
            <h2>Recent Writing</h2>
            <Link to="/blog" className="view-all">
              View all posts <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="posts-grid stagger">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* PROJECTS */}
      <section className="section skills-section">
        <div className="container">
          <div className="section-header fade-up" ref={projectsRef}>
            <h2>Projects</h2>
          </div>
          <div className="projects-grid stagger">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* TECH STACK */}
      <section className="section">
        <div className="container">
          <div className="section-header fade-up" ref={skillsRef}>
            <h2>Tech Stack</h2>
          </div>
          <div className="skills-grid">
            {SKILLS.map((cat) => (
              <div key={cat.category} className="skill-category">
                <h4>{cat.category}</h4>
                <div className="skill-pills">
                  {cat.items.map((skill) => (
                    <span key={skill.name} className="skill-pill">
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
