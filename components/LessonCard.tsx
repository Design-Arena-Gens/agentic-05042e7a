'use client';

import { useState } from 'react';
import { useProgress } from './ProgressProvider';

type Props = { id: string; title: string; objective: string; content: string };

export function LessonCard({ id, title, objective, content }: Props) {
  const [open, setOpen] = useState(false);
  const { completedLessonIds, completeLesson } = useProgress();
  const completed = completedLessonIds.includes(id);

  return (
    <article className={`card ${completed ? 'card-complete' : ''}`}>
      <div className="card-header">
        <div>
          <h3>{title}</h3>
          <p className="muted">Objective: {objective}</p>
        </div>
        <div className="row">
          <button className="btn" onClick={() => setOpen(o => !o)}>{open ? 'Hide' : 'Start'}</button>
          <button className="btn primary" disabled={completed} onClick={() => completeLesson(id)}>
            {completed ? 'Completed' : 'Mark Complete (+50)'}
          </button>
        </div>
      </div>
      {open && (
        <div className="card-body">
          <p>{content}</p>
          <ul className="lesson-list">
            <li>Listen and repeat phrases aloud.</li>
            <li>Practice with a partner or mirror.</li>
            <li>Use the exercises to reinforce learning.</li>
          </ul>
        </div>
      )}
    </article>
  );
}
