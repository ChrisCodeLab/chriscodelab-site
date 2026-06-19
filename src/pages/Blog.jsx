import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import { posts } from "../data/posts";
import Footer from "../components/Footer";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ALL = "All";
const allTags = [ALL, ...new Set(posts.flatMap((p) => p.tags))];

function Blog() {
  const [activeTag, setActiveTag] = useState(ALL);

  const filtered =
    activeTag === ALL ? posts : posts.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <main>
        <div className="container">
          <div className="blog-page-header">
            <h1>Writing</h1>
            <p>
              Thoughts on backend engineering, distributed systems, and the
              craft of building reliable software.
            </p>
          </div>

          <div className="tag-filter-row">
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag tag-filter${activeTag === tag ? " active" : ""}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="posts-list">
            {filtered.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
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
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "var(--accent)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                    }}
                  >
                    Read <FiArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="empty-state">
                <p>No posts found for this tag.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Blog;
