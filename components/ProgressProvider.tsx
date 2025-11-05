'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ExerciseRecord = { id: string; type: string; correct: boolean; timestamp: string };

type Progress = {
  totalPoints: number;
  lessonsCompleted: number;
  completedLessonIds: string[];
  dailyStreak: number;
  lastActiveDate: string | null;
  exerciseHistory: ExerciseRecord[];
};

const defaultProgress: Progress = {
  totalPoints: 0,
  lessonsCompleted: 0,
  completedLessonIds: [],
  dailyStreak: 0,
  lastActiveDate: null,
  exerciseHistory: []
};

type ProgressContextType = Progress & {
  addPoints: (points: number) => void;
  completeLesson: (lessonId: string) => void;
  recordExercise: (record: Omit<ExerciseRecord, 'timestamp'>) => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);
const STORAGE_KEY = 'll_progress_v1';

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Progress;
        setProgress(prev => ({ ...prev, ...parsed }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    setProgress(prev => {
      const today = getToday();
      if (!prev.lastActiveDate) {
        return { ...prev, lastActiveDate: today, dailyStreak: prev.dailyStreak || 1 };
      }
      if (prev.lastActiveDate === today) return prev;
      const d1 = new Date(prev.lastActiveDate);
      const d2 = new Date(today);
      const diffDays = Math.round((d2.getTime() - d1.getTime()) / 86400000);
      const newStreak = diffDays === 1 ? prev.dailyStreak + 1 : 1;
      return { ...prev, lastActiveDate: today, dailyStreak: newStreak };
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress]);

  const addPoints = useCallback((points: number) => {
    setProgress(prev => ({ ...prev, totalPoints: prev.totalPoints + points, lastActiveDate: getToday() }));
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (prev.completedLessonIds.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
        lessonsCompleted: prev.lessonsCompleted + 1,
        totalPoints: prev.totalPoints + 50,
        lastActiveDate: getToday()
      };
    });
  }, []);

  const recordExercise = useCallback((record: Omit<ExerciseRecord, 'timestamp'>) => {
    const timestamp = new Date().toISOString();
    setProgress(prev => ({
      ...prev,
      exerciseHistory: [{ ...record, timestamp }, ...prev.exerciseHistory].slice(0, 100),
      totalPoints: prev.totalPoints + (record.correct ? 10 : 0),
      lastActiveDate: getToday()
    }));
  }, []);

  const value = useMemo<ProgressContextType>(() => ({ ...progress, addPoints, completeLesson, recordExercise }), [progress, addPoints, completeLesson, recordExercise]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return ctx;
}
