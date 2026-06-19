import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import { posts } from "../data/posts";
import Footer from "../components/Footer";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function PostContent({ content }) {
  return (
    <div className="post-content">
      {content.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return (
              <h2 key={i} id={`heading-${i}`}>
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{block.text}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function TableOfContents({ content }) {
  const headings = content
    .map((b, i) => ({ ...b, index: i }))
    .filter((b) => b.type === "h2");

  if (headings.length === 0) return null;

  return (
    <aside className="toc">
      <p className="toc-heading">On this page</p>
      <ul className="toc-list">
        {headings.map((h) => (
          <li key={h.index}>
            <a href={`#heading-${h.index}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];
  const prevPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  useEffect(() => {
    if (post) document.title = `${post.title} — ChrisCodeLab`;
    return () => {
      document.title = "Christopher M — Backend Engineer";
    };
  }, [post]);

  if (!post) {
    return (
      <>
        <div className="container">
          <div className="empty-state" style={{ paddingTop: "80px" }}>
            <h2>Post not found</h2>
            <Link
              to="/blog"
              className="btn btn-primary"
              style={{ marginTop: "24px" }}
            >
              Back to blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        <div className="container">
          <Link to="/blog" className="post-back">
            <FiArrowLeft size={15} /> All posts
          </Link>

          <div className="post-hero">
            <div className="post-hero-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag tag-accent">
                  {tag}
                </span>
              ))}
            </div>
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span>
                <FiCalendar size={13} />
                {formatDate(post.date)}
              </span>
              <span>
                <FiClock size={13} />
                {post.readTime}
              </span>
            </div>
          </div>

          <div className="post-layout">
            <PostContent content={post.content} />
            <TableOfContents content={post.content} />
          </div>

          {(prevPost || nextPost) && (
            <div className="post-nav">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="post-nav-card"
                >
                  <div className="post-nav-label">← Previous</div>
                  <div className="post-nav-title">{prevPost.title}</div>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="post-nav-card post-nav-next"
                >
                  <div className="post-nav-label">Next →</div>
                  <div className="post-nav-title">{nextPost.title}</div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default BlogPost;
