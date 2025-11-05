'use client';

import { useState } from 'react';
import { useProgress } from './ProgressProvider';

type Question = { id: string; prompt: string; choices: string[]; answerIndex: number };

export function MultipleChoiceExercise({ questions, title }: { questions: Question[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { recordExercise } = useProgress();

  const q = questions[current];

  function submit() {
    if (selected === null) return;
    const correct = selected === q.answerIndex;
    setFeedback(correct ? 'Correct! +10 points' : 'Not quite. Keep going!');
    recordExercise({ id: q.id, type: 'mcq', correct });
    setTimeout(() => {
      setFeedback(null);
      setSelected(null);
      setCurrent((idx) => (idx + 1) % questions.length);
    }, 900);
  }

  return (
    <section className="card">
      <div className="card-header"><h3>{title}</h3></div>
      <div className="card-body">
        <p className="prompt">{q.prompt}</p>
        <div className="choices">
          {q.choices.map((c, i) => (
            <button key={i} className={`choice ${selected === i ? 'selected' : ''}`} onClick={() => setSelected(i)}>
              {c}
            </button>
          ))}
        </div>
        <div className="row">
          <button className="btn primary" disabled={selected === null} onClick={submit}>Check</button>
        </div>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </section>
  );
}
