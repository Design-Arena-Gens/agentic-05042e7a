import { LessonCard } from '../../components/LessonCard';

export const dynamic = 'force-static';

export default function LessonsPage() {
  const lessons = [
    { id: 'greetings', title: 'Greetings', objective: 'Say hello and introduce yourself', content: 'Learn ?Hello?, ?Good morning?, and ?My name is...?. Practice short dialogues.' },
    { id: 'numbers', title: 'Numbers 1-10', objective: 'Count to ten', content: 'Learn numbers one to ten. Practice counting objects and asking ?How many...??' },
    { id: 'food', title: 'Food Basics', objective: 'Order simple food', content: 'Learn common food words and phrases to order in a cafe.' }
  ];
  return (
    <div className="stack">
      {lessons.map(l => (<LessonCard key={l.id} {...l} />))}
    </div>
  );
}
