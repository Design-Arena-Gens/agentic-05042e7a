export default function HomePage() {
  return (
    <div className="grid">
      <section className="hero card">
        <div className="card-body">
          <h1>Learn a language with LingoSpark</h1>
          <p className="muted">Interactive lessons, gamified practice, and a clear progress dashboard.</p>
          <div className="row">
            <a className="btn primary" href="/lessons">Start Lessons</a>
            <a className="btn" href="/exercises">Practice</a>
            <a className="btn" href="/dashboard">View Progress</a>
          </div>
        </div>
      </section>
    </div>
  );
}
