import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './WorkoutStats.css';

function WorkoutStats({ workouts }) {
  const [selectedExercise, setSelectedExercise] = useState('');

  const exercises = useMemo(() => {
    const uniqueExercises = [...new Set(workouts.map(w => w.exerciseName))];
    return uniqueExercises;
  }, [workouts]);

  const stats = useMemo(() => {
    if (!selectedExercise) return null;

    const exerciseWorkouts = workouts
      .filter(w => w.exerciseName === selectedExercise)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = exerciseWorkouts.map(workout => {
      const maxWeight = Math.max(...workout.sets.map(s => parseFloat(s.weight)));
      const totalVolume = workout.sets.reduce((sum, set) =>
        sum + (parseFloat(set.weight) * parseFloat(set.reps)), 0
      );
      const totalReps = workout.sets.reduce((sum, set) => sum + parseFloat(set.reps), 0);

      return {
        date: workout.date,
        maxWeight: maxWeight,
        totalVolume: totalVolume,
        totalReps: totalReps,
        sets: workout.sets.length,
      };
    });

    const latestWorkout = exerciseWorkouts[exerciseWorkouts.length - 1];
    const firstWorkout = exerciseWorkouts[0];

    return {
      chartData,
      totalSessions: exerciseWorkouts.length,
      latestMaxWeight: latestWorkout ? Math.max(...latestWorkout.sets.map(s => parseFloat(s.weight))) : 0,
      firstMaxWeight: firstWorkout ? Math.max(...firstWorkout.sets.map(s => parseFloat(s.weight))) : 0,
      totalVolume: exerciseWorkouts.reduce((sum, w) =>
        sum + w.sets.reduce((s, set) => s + (parseFloat(set.weight) * parseFloat(set.reps)), 0), 0
      ),
    };
  }, [workouts, selectedExercise]);

  const overallStats = useMemo(() => {
    const totalWorkouts = workouts.length;
    const totalVolume = workouts.reduce((sum, w) =>
      sum + w.sets.reduce((s, set) => s + (parseFloat(set.weight) * parseFloat(set.reps)), 0), 0
    );
    const uniqueDays = new Set(workouts.map(w => w.date)).size;

    const exerciseCount = workouts.reduce((acc, w) => {
      acc[w.exerciseName] = (acc[w.exerciseName] || 0) + 1;
      return acc;
    }, {});

    const topExercises = Object.entries(exerciseCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return {
      totalWorkouts,
      totalVolume,
      uniqueDays,
      topExercises,
    };
  }, [workouts]);

  return (
    <div className="workout-stats">
      <h2>統計・グラフ</h2>

      <div className="overall-stats">
        <h3>全体の統計</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{overallStats.totalWorkouts}</div>
            <div className="stat-label">総トレーニング数</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{overallStats.uniqueDays}</div>
            <div className="stat-label">トレーニング日数</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{overallStats.totalVolume.toFixed(0)}</div>
            <div className="stat-label">総重量 (kg)</div>
          </div>
        </div>

        {overallStats.topExercises.length > 0 && (
          <div className="top-exercises">
            <h4>よく行う種目</h4>
            <div className="exercise-bars">
              {overallStats.topExercises.map((exercise, index) => (
                <div key={index} className="exercise-bar-item">
                  <span className="exercise-name">{exercise.name}</span>
                  <div className="exercise-bar-container">
                    <div
                      className="exercise-bar-fill"
                      style={{ width: `${(exercise.count / overallStats.topExercises[0].count) * 100}%` }}
                    >
                      {exercise.count}回
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="exercise-stats">
        <h3>種目別の分析</h3>
        <select
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="exercise-select"
        >
          <option value="">種目を選択...</option>
          {exercises.map((exercise, index) => (
            <option key={index} value={exercise}>{exercise}</option>
          ))}
        </select>

        {stats && (
          <div className="exercise-details">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats.totalSessions}</div>
                <div className="stat-label">実施回数</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.latestMaxWeight}kg</div>
                <div className="stat-label">最新の最大重量</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">
                  {stats.latestMaxWeight > stats.firstMaxWeight
                    ? `+${(stats.latestMaxWeight - stats.firstMaxWeight).toFixed(1)}`
                    : (stats.latestMaxWeight - stats.firstMaxWeight).toFixed(1)
                  }kg
                </div>
                <div className="stat-label">重量の変化</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats.totalVolume.toFixed(0)}kg</div>
                <div className="stat-label">総ボリューム</div>
              </div>
            </div>

            <div className="charts">
              <div className="chart-container">
                <h4>最大重量の推移</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="maxWeight" stroke="#8884d8" name="最大重量 (kg)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h4>総ボリュームの推移</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalVolume" fill="#82ca9d" name="総ボリューム (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkoutStats;
