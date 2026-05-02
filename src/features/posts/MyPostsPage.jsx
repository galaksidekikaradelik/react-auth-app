import { Link, useParams }   from 'react-router-dom'
import { useMyPosts, useMyPostDetail } from './hooks/useMyPosts'
import { readingTime, postNumber }     from '../../utils/postUtils'

// ── Skeletons ────────────────────────────────────────────────
function FeedSkeleton() {
  return (
    <div className="blog-feed" aria-busy="true" aria-label="Loading posts">
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="blog-skeleton-row">
          <div className="skeleton-line blog-skeleton-icon" />
          <div className="blog-skeleton-content">
            <div style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
              <div className="skeleton-line" style={{ width: 60, height: 10 }} />
              <div className="skeleton-line" style={{ width: 60, height: 10 }} />
            </div>
            <div className="skeleton-line" style={{ width: '70%', height: 16 }} />
            <div className="skeleton-line" style={{ width: '100%', height: 12 }} />
            <div className="skeleton-line" style={{ width: '85%',  height: 12 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="blog-detail-wrapper fade-in" aria-busy="true" aria-label="Loading post">
      <div className="skeleton-line" style={{ width: 80,   height: 14, borderRadius: 6, marginBottom: 36 }} />
      <div className="skeleton-line" style={{ width: 100,  height: 24, borderRadius: 99, marginBottom: 20 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <div className="skeleton-line" style={{ width: '80%', height: 28 }} />
        <div className="skeleton-line" style={{ width: '60%', height: 28 }} />
      </div>
      <div className="skeleton-line" style={{ width: '100%', height: 48, borderRadius: 8, marginBottom: 36 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[100, 95, 88, 92, 80, 85].map((w, i) => (
          <div key={i} className="skeleton-line" style={{ width: `${w}%`, height: 14 }} />
        ))}
      </div>
    </div>
  )
}

// ── My Posts List ────────────────────────────────────────────
export function MyPostsPage() {
  const { posts, isLoading, isError, error } = useMyPosts()

  return (
    <div className="fade-in">
      <div className="blog-header">
        {!isLoading && !isError && (
          <div className="blog-count-badge">
            <span className="badge-dot" aria-hidden="true" />
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </div>
        )}
        <h1 className="page-title" style={{ marginBottom: 6 }}>My Blog</h1>
        <p className="page-subtitle">Everything I've written, in one place.</p>
      </div>

      {isError && (
        <div className="alert alert-error" role="alert">
          Failed to load posts: {error?.response?.data?.message || 'Something went wrong'}
        </div>
      )}

      {isLoading && <FeedSkeleton />}

      {!isLoading && !isError && posts.length === 0 && (
        <div className="blog-empty">
          <div className="blog-empty-icon" aria-hidden="true">✍️</div>
          <div className="blog-empty-title">No posts yet</div>
          <p className="blog-empty-desc">Your blog is empty for now.</p>
        </div>
      )}

      {!isLoading && posts.length > 0 && (
        <div className="blog-feed">
          {posts.map((post, i) => (
            <Link
              key={post.id}
              to={`/myposts/${post.id}`}
              className="blog-post-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="blog-post-number" aria-hidden="true">{postNumber(post.id)}</div>
              <div className="blog-post-content">
                <div className="blog-post-meta">
                  <span className="blog-post-meta-item">📖 {readingTime(post.body)}</span>
                  <span className="blog-post-meta-dot" aria-hidden="true" />
                  <span className="blog-post-meta-item">Post #{post.id}</span>
                </div>
                <div className="blog-post-title">{post.title}</div>
                <p className="blog-post-excerpt">{post.body}</p>
                <div className="blog-post-footer">
                  <span className="blog-read-more">Read more →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Post Detail ──────────────────────────────────────────────
const BackIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
)

export function MyPostDetailPage() {
  const { id } = useParams()
  const { post, paragraphs, prevPost, nextPost, isLoading, isError, error } =
    useMyPostDetail(id)

  if (isLoading) return <DetailSkeleton />

  if (isError) {
    return (
      <div className="blog-detail-wrapper fade-in">
        <Link to="/myposts" className="blog-detail-back"><BackIcon /> Back to Blog</Link>
        <div className="alert alert-error" role="alert">
          {error?.response?.status === 404
            ? 'Post not found'
            : error?.response?.data?.message || 'Failed to load post'}
        </div>
      </div>
    )
  }

  return (
    <article className="blog-detail-wrapper fade-in">
      <Link to="/myposts" className="blog-detail-back"><BackIcon /> Back to Blog</Link>

      <div className="blog-detail-label">
        <span className="badge-dot" aria-hidden="true" />
        Post #{id}
      </div>

      <h1 className="blog-detail-title">{post?.title}</h1>

      <div className="blog-detail-meta" aria-label="Post metadata">
        <div className="blog-detail-meta-item">
          <span aria-hidden="true">📖</span>
          <span>{readingTime(post?.body)}</span>
        </div>
        <div className="blog-detail-meta-divider" aria-hidden="true" />
        <div className="blog-detail-meta-item">
          <span aria-hidden="true">✍️</span>
          <span>My Blog</span>
        </div>
        <div className="blog-detail-meta-divider" aria-hidden="true" />
        <div className="blog-detail-meta-item">
          <span aria-hidden="true">🔢</span>
          <span>{String(post?.body || '').trim().split(/\s+/).length} words</span>
        </div>
      </div>

      <div className="blog-detail-divider" />

      <div className="blog-detail-body">
        {paragraphs.length > 1
          ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
          : <p>{post?.body}</p>}
      </div>

      {(prevPost || nextPost) && (
        <nav className="blog-detail-nav" aria-label="Post navigation">
          {prevPost ? (
            <Link to={`/myposts/${prevPost.id}`} className="blog-nav-link blog-nav-link--prev">
              <div className="blog-nav-dir">← Previous</div>
              <div className="blog-nav-title">{prevPost.title}</div>
            </Link>
          ) : <div />}
          {nextPost ? (
            <Link to={`/myposts/${nextPost.id}`} className="blog-nav-link blog-nav-link--next">
              <div className="blog-nav-dir">Next →</div>
              <div className="blog-nav-title">{nextPost.title}</div>
            </Link>
          ) : <div />}
        </nav>
      )}
    </article>
  )
}