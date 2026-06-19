import { useState } from "react";
import { FiGithub, FiYoutube, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { sendContact } from "../services/contactService";
import Footer from "../components/Footer";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await sendContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <div className="container contact-page">
          <div className="contact-layout">
            <div className="contact-info">
              <h2>Let&apos;s Connect</h2>
              <p>
                Whether you have a project in mind, want to discuss backend
                architecture, or just want to say hello — I&apos;d love to hear
                from you.
              </p>

              <div className="contact-links">
                <a
                  href="https://www.linkedin.com/in/chriscodelab/"
                  className="contact-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin /> LinkedIn
                </a>
                <a
                  href="https://github.com/ChrisCodeLab"
                  className="contact-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub /> GitHub
                </a>
                <a
                  href="https://www.youtube.com/@ChrisCodeLab"
                  className="contact-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiYoutube /> YouTube
                </a>
                <a
                  href="https://leetcode.com/u/ChrisCodeLab/"
                  className="contact-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiLeetcode /> LeetCode
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  placeholder="What&apos;s on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: "100%", justifyContent: "center", padding: "13px" }}
              >
                {loading ? (
                  "Sending…"
                ) : (
                  <>
                    <FiSend size={15} /> Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="form-status success">
                  <FiCheckCircle /> Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="form-status error">
                  <FiAlertCircle /> Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
