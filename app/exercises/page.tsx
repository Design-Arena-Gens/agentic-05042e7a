'use client';

import { MultipleChoiceExercise } from '../../components/MultipleChoiceExercise';
import { TypingExercise } from '../../components/TypingExercise';

export default function ExercisesPage() {
  const questions = [
    { id: 'q1', prompt: 'Translate: "Hello"', choices: ['Bonjour', 'Hola', 'Ciao'], answerIndex: 1 },
    { id: 'q2', prompt: 'Translate: "Thank you"', choices: ['Gracias', 'Bitte', 'Danke'], answerIndex: 0 },
    { id: 'q3', prompt: 'Translate: "Good morning"', choices: ['Buenas noches', 'Buenas tardes', 'Buenos d?as'], answerIndex: 2 },
  ];

  return (
    <div className="grid">
      <MultipleChoiceExercise title="Quick Quiz" questions={questions} />
      <TypingExercise prompt='Translate: "Good night"' answer="Buenas noches" />
    </div>
  );
}
