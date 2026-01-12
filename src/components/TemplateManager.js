import React, { useState } from 'react';
import './TemplateManager.css';

function TemplateManager({ exercises }) {
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('');
  const [generatedMenu, setGeneratedMenu] = useState(null);

  const menuDatabase = {
    '筋肥大-30': {
      title: '筋肥大 - 30分プログラム',
      description: '短時間で効果的に筋肉を刺激するメニュー',
      exercises: [
        { name: 'ベンチプレス', sets: [{ reps: '10', weight: '60' }, { reps: '10', weight: '60' }, { reps: '8', weight: '65' }] },
        { name: 'ダンベルカール', sets: [{ reps: '12', weight: '15' }, { reps: '12', weight: '15' }, { reps: '10', weight: '17.5' }] },
        { name: 'トライセプスエクステンション', sets: [{ reps: '12', weight: '20' }, { reps: '12', weight: '20' }] },
      ]
    },
    '筋肥大-45': {
      title: '筋肥大 - 45分プログラム',
      description: 'バランスよく全身を鍛えるメニュー',
      exercises: [
        { name: 'ベンチプレス', sets: [{ reps: '10', weight: '60' }, { reps: '10', weight: '60' }, { reps: '8', weight: '65' }, { reps: '6', weight: '70' }] },
        { name: 'スクワット', sets: [{ reps: '12', weight: '80' }, { reps: '12', weight: '80' }, { reps: '10', weight: '90' }] },
        { name: 'ラットプルダウン', sets: [{ reps: '12', weight: '50' }, { reps: '12', weight: '50' }, { reps: '10', weight: '55' }] },
        { name: 'ダンベルカール', sets: [{ reps: '12', weight: '15' }, { reps: '10', weight: '17.5' }] },
      ]
    },
    '筋肥大-60': {
      title: '筋肥大 - 60分プログラム',
      description: '本格的な筋肥大を目指すメニュー',
      exercises: [
        { name: 'ベンチプレス', sets: [{ reps: '10', weight: '60' }, { reps: '10', weight: '60' }, { reps: '8', weight: '65' }, { reps: '6', weight: '70' }] },
        { name: 'インクラインベンチプレス', sets: [{ reps: '10', weight: '50' }, { reps: '10', weight: '50' }, { reps: '8', weight: '55' }] },
        { name: 'スクワット', sets: [{ reps: '12', weight: '80' }, { reps: '12', weight: '80' }, { reps: '10', weight: '90' }, { reps: '8', weight: '95' }] },
        { name: 'ラットプルダウン', sets: [{ reps: '12', weight: '50' }, { reps: '12', weight: '50' }, { reps: '10', weight: '55' }] },
        { name: 'ダンベルカール', sets: [{ reps: '12', weight: '15' }, { reps: '12', weight: '15' }, { reps: '10', weight: '17.5' }] },
        { name: 'トライセプスエクステンション', sets: [{ reps: '12', weight: '20' }, { reps: '12', weight: '20' }, { reps: '10', weight: '22.5' }] },
      ]
    },
    'ダイエット-30': {
      title: 'ダイエット - 30分プログラム',
      description: 'カロリー消費を重視した高回数トレーニング',
      exercises: [
        { name: 'スクワット', sets: [{ reps: '20', weight: '50' }, { reps: '20', weight: '50' }, { reps: '15', weight: '60' }] },
        { name: 'レッグプレス', sets: [{ reps: '20', weight: '80' }, { reps: '20', weight: '80' }] },
        { name: 'ベンチプレス', sets: [{ reps: '15', weight: '50' }, { reps: '15', weight: '50' }] },
      ]
    },
    'ダイエット-45': {
      title: 'ダイエット - 45分プログラム',
      description: '全身をバランスよく動かして脂肪燃焼',
      exercises: [
        { name: 'スクワット', sets: [{ reps: '20', weight: '50' }, { reps: '20', weight: '50' }, { reps: '15', weight: '60' }] },
        { name: 'レッグプレス', sets: [{ reps: '20', weight: '80' }, { reps: '20', weight: '80' }, { reps: '15', weight: '90' }] },
        { name: 'ベンチプレス', sets: [{ reps: '15', weight: '50' }, { reps: '15', weight: '50' }, { reps: '12', weight: '55' }] },
        { name: 'ラットプルダウン', sets: [{ reps: '15', weight: '40' }, { reps: '15', weight: '40' }] },
        { name: 'ダンベルカール', sets: [{ reps: '15', weight: '12.5' }, { reps: '15', weight: '12.5' }] },
      ]
    },
    'ダイエット-60': {
      title: 'ダイエット - 60分プログラム',
      description: 'しっかり動いて最大限のカロリー消費',
      exercises: [
        { name: 'スクワット', sets: [{ reps: '20', weight: '50' }, { reps: '20', weight: '50' }, { reps: '15', weight: '60' }, { reps: '15', weight: '60' }] },
        { name: 'レッグプレス', sets: [{ reps: '20', weight: '80' }, { reps: '20', weight: '80' }, { reps: '15', weight: '90' }] },
        { name: 'レッグカール', sets: [{ reps: '15', weight: '30' }, { reps: '15', weight: '30' }, { reps: '12', weight: '35' }] },
        { name: 'ベンチプレス', sets: [{ reps: '15', weight: '50' }, { reps: '15', weight: '50' }, { reps: '12', weight: '55' }] },
        { name: 'ラットプルダウン', sets: [{ reps: '15', weight: '40' }, { reps: '15', weight: '40' }, { reps: '12', weight: '45' }] },
        { name: 'ダンベルカール', sets: [{ reps: '15', weight: '12.5' }, { reps: '15', weight: '12.5' }] },
        { name: 'トライセプスエクステンション', sets: [{ reps: '15', weight: '15' }, { reps: '15', weight: '15' }] },
      ]
    },
    '筋力向上-45': {
      title: '筋力向上 - 45分プログラム',
      description: '高重量・低回数で筋力を向上',
      exercises: [
        { name: 'ベンチプレス', sets: [{ reps: '5', weight: '80' }, { reps: '5', weight: '80' }, { reps: '3', weight: '85' }] },
        { name: 'スクワット', sets: [{ reps: '5', weight: '100' }, { reps: '5', weight: '100' }, { reps: '3', weight: '110' }] },
        { name: 'デッドリフト', sets: [{ reps: '5', weight: '120' }, { reps: '5', weight: '120' }, { reps: '3', weight: '130' }] },
      ]
    },
    '筋力向上-60': {
      title: '筋力向上 - 60分プログラム',
      description: 'BIG3を中心とした本格的な筋力強化',
      exercises: [
        { name: 'ベンチプレス', sets: [{ reps: '5', weight: '80' }, { reps: '5', weight: '80' }, { reps: '3', weight: '85' }, { reps: '3', weight: '90' }] },
        { name: 'スクワット', sets: [{ reps: '5', weight: '100' }, { reps: '5', weight: '100' }, { reps: '3', weight: '110' }, { reps: '3', weight: '115' }] },
        { name: 'デッドリフト', sets: [{ reps: '5', weight: '120' }, { reps: '5', weight: '120' }, { reps: '3', weight: '130' }] },
        { name: 'ショルダープレス', sets: [{ reps: '6', weight: '40' }, { reps: '6', weight: '40' }, { reps: '4', weight: '45' }] },
      ]
    },
    '初心者-30': {
      title: '初心者 - 30分プログラム',
      description: '基本動作を習得するための入門メニュー',
      exercises: [
        { name: 'ベンチプレス', sets: [{ reps: '12', weight: '40' }, { reps: '12', weight: '40' }] },
        { name: 'スクワット', sets: [{ reps: '15', weight: '40' }, { reps: '15', weight: '40' }] },
        { name: 'ラットプルダウン', sets: [{ reps: '12', weight: '30' }, { reps: '12', weight: '30' }] },
      ]
    },
    '初心者-45': {
      title: '初心者 - 45分プログラム',
      description: '全身をバランスよく鍛える基礎メニュー',
      exercises: [
        { name: 'ベンチプレス', sets: [{ reps: '12', weight: '40' }, { reps: '12', weight: '40' }, { reps: '10', weight: '45' }] },
        { name: 'スクワット', sets: [{ reps: '15', weight: '40' }, { reps: '15', weight: '40' }, { reps: '12', weight: '50' }] },
        { name: 'ラットプルダウン', sets: [{ reps: '12', weight: '30' }, { reps: '12', weight: '30' }, { reps: '10', weight: '35' }] },
        { name: 'ダンベルカール', sets: [{ reps: '12', weight: '10' }, { reps: '12', weight: '10' }] },
        { name: 'レッグプレス', sets: [{ reps: '15', weight: '60' }, { reps: '15', weight: '60' }] },
      ]
    },
  };

  const handleGenerateMenu = () => {
    if (!goal || !duration) {
      alert('目的と時間を選択してください');
      return;
    }

    const key = `${goal}-${duration}`;
    const menu = menuDatabase[key];

    if (menu) {
      setGeneratedMenu(menu);
    } else {
      alert('選択した条件のメニューが見つかりません');
    }
  };

  return (
    <div className="template-manager">
      <h2>おすすめメニュー作成</h2>
      <p className="description">目的と時間を選択すると、あなたに合ったトレーニングメニューを提案します</p>

      <div className="menu-generator-form">
        <div className="form-group">
          <label>トレーニングの目的:</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)} className="select-input">
            <option value="">選択してください</option>
            <option value="筋肥大">筋肥大（筋肉を大きくする）</option>
            <option value="ダイエット">ダイエット（体脂肪を減らす）</option>
            <option value="筋力向上">筋力向上（最大筋力を上げる）</option>
            <option value="初心者">初心者（基礎から始める）</option>
          </select>
        </div>

        <div className="form-group">
          <label>トレーニング時間:</label>
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="select-input">
            <option value="">選択してください</option>
            <option value="30">30分</option>
            <option value="45">45分</option>
            <option value="60">60分</option>
          </select>
        </div>

        <button onClick={handleGenerateMenu} className="btn-generate">
          メニューを作成
        </button>
      </div>

      {generatedMenu && (
        <div className="generated-menu">
          <h3>{generatedMenu.title}</h3>
          <p className="menu-description">{generatedMenu.description}</p>

          <div className="menu-exercises">
            {generatedMenu.exercises.map((exercise, index) => (
              <div key={index} className="menu-exercise-item">
                <h4>{exercise.name}</h4>
                <div className="menu-sets">
                  {exercise.sets.map((set, setIndex) => (
                    <span key={setIndex} className="menu-set">
                      {set.reps}回 × {set.weight}kg
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="menu-notes">
            <h4>メモ:</h4>
            <ul>
              <li>表示されている重量は目安です。自分の体力に合わせて調整してください</li>
              <li>各セット間は1〜2分の休憩を取りましょう</li>
              <li>正しいフォームを意識してトレーニングしましょう</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateManager;
