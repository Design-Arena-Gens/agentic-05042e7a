'use client';

import { useState } from 'react';
import { useProgress } from './ProgressProvider';

export function TypingExercise({ prompt, answer }: { prompt: string; answer: string }) {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const { recordExercise } = useProgress();

  function normalize(s: string) {
    return s.trim().toLowerCase();
  }

  function submit() {
    const correct = normalize(input) === normalize(answer);
    setFeedback(correct ? 'Perfect! +10 points' : `Correct answer: "${answer}"`);
    recordExercise({ id: `typing:${prompt}`, type: 'typing', correct });
    if (correct) setInput('');
  }

  return (
    <section className="card">
      <div className="card-header"><h3>Type the translation</h3></div>
      <div className="card-body">
        <p className="prompt">{prompt}</p>
        <input className="input" placeholder="Type here..." value={input} onChange={e => setInput(e.target.value)} />
        <div className="row">
          <button className="btn primary" onClick={submit}>Submit</button>
        </div>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </section>
  );
}
