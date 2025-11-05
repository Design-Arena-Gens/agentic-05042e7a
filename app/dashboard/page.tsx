'use client';
import { useProgress } from '../../components/ProgressProvider';

export default function DashboardPage() {
  const { totalPoints, lessonsCompleted, dailyStreak, exerciseHistory, completedLessonIds } = useProgress();

  return (
    <div className="grid">
      <section className="card">
        <div className="card-header"><h3>Your Progress</h3></div>
        <div className="card-body">
          <div className="stats">
            <div className="stat"><div className="stat-value">{totalPoints}</div><div className="stat-label">Total Points</div></div>
            <div className="stat"><div className="stat-value">{lessonsCompleted}</div><div className="stat-label">Lessons Completed</div></div>
            <div className="stat"><div className="stat-value">{dailyStreak}</div><div className="stat-label">Day Streak</div></div>
          </div>
          <h4>Completed Lessons</h4>
          <ul className="chips">
            {completedLessonIds.length === 0 ? <li className="muted">No lessons completed yet.</li> :
              completedLessonIds.map(id => <li key={id} className="chip">?? {id}</li>)}
          </ul>
        </div>
      </section>

      <section className="card">
        <div className="card-header"><h3>Recent Activity</h3></div>
        <div className="card-body">
          <ul className="activity">
            {exerciseHistory.slice(0, 10).map((r, idx) => (
              <li key={idx}>
                <span>{new Date(r.timestamp).toLocaleString()}</span>
                <span className={`pill ${r.correct ? 'ok' : 'warn'}`}>{r.type}</span>
                <span>{r.correct ? 'Correct' : 'Incorrect'}</span>
              </li>
            ))}
            {exerciseHistory.length === 0 && <li className="muted">No activity yet. Try some exercises.</li>}
          </ul>
        </div>
      </section>
    </div>
  );
}
