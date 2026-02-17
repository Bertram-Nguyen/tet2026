import React, { useState, useEffect, useRef, useMemo } from 'react';
import { UserData, EnvelopeData, LeaderboardItem } from './types';
import { TOTAL_ENVELOPES, SOUNDS, TREE_IMAGE_URL } from './constants';
import { generateEnvelopes, getRandomWish } from './utils';
import EntryModal from './components/EntryModal';
import ResultModal from './components/ResultModal';
import FlowerRain from './components/FlowerRain';
import Fireworks from './components/Fireworks';
import LeaderboardModal from './components/LeaderboardModal';

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [envelopes, setEnvelopes] = useState<EnvelopeData[]>([]);
  const [openedCount, setOpenedCount] = useState(0);

  // 🔥 FIX: totalAmount phải được dùng → hiển thị UI
  const [totalAmount, setTotalAmount] = useState(0);

  const [activeEnvelope, setActiveEnvelope] = useState<EnvelopeData | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const coinSoundRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('loc_tet_user_2026');
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedProgress = localStorage.getItem('loc_tet_progress_2026');
    const generated = generateEnvelopes();

    if (savedProgress) {
      const { openedIds, total } = JSON.parse(savedProgress);
      const openedSet = new Set(openedIds);

      const merged = generated.map(env => ({
        ...env,
        isOpen: openedSet.has(env.id),
        wish: openedSet.has(env.id) ? "Đã nhận lộc" : "",
        emoji: openedSet.has(env.id) ? "✓" : env.emoji
      }));

      setEnvelopes(merged);
      setOpenedCount(openedIds.length);
      setTotalAmount(total);
    } else {
      setEnvelopes(generated);
    }

    const savedLb = localStorage.getItem('loc_tet_leaderboard_2026');
    if (savedLb) {
      setLeaderboard(JSON.parse(savedLb));
    } else {
      const fakes = [
        { name: "Phạm Minh Tuấn", time: "10:30 01/01", amount: 8386 },
        { name: "Lê Thị Hồng", time: "11:15 01/01", amount: 8386 },
      ];
      setLeaderboard(fakes);
      localStorage.setItem('loc_tet_leaderboard_2026', JSON.stringify(fakes));
    }

    bgMusicRef.current = new Audio(SOUNDS.bgMusic);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.3;

    coinSoundRef.current = new Audio(SOUNDS.coin);
  }, []);

  const handleUserComplete = (data: UserData) => {
    setUser(data);
    localStorage.setItem('loc_tet_user_2026', JSON.stringify(data));

    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(() => {});
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!bgMusicRef.current) return;
    if (isMusicPlaying) bgMusicRef.current.pause();
    else bgMusicRef.current.play();
    setIsMusicPlaying(!isMusicPlaying);
  };

const handleZoom = React.useCallback((delta: number) => {
  const container = scrollContainerRef.current;
  if (!container) return;

  const newZoom = Math.min(Math.max(zoom + delta, 0.4), 1.6);
  if (newZoom === zoom) return;

  const centerX =
    (container.scrollLeft + container.clientWidth / 2) / zoom;
  const centerY =
    (container.scrollTop + container.clientHeight / 2) / zoom;

  setZoom(newZoom);

  setTimeout(() => {
    if (container) {
      container.scrollLeft =
        centerX * newZoom - container.clientWidth / 2;
      container.scrollTop =
        centerY * newZoom - container.clientHeight / 2;
    }
  }, 0);
}, [zoom]);
void handleZoom;


  const openEnvelope = (id: number) => {
    const envelope = envelopes.find(e => e.id === id);
    if (!envelope || envelope.isOpen) return;

    coinSoundRef.current?.play().catch(() => {});

    const wish = getRandomWish();

    const updated = envelopes.map(e =>
      e.id === id ? { ...e, isOpen: true, wish, emoji: "✓" } : e
    );

    setEnvelopes(updated);
    setOpenedCount(prev => prev + 1);

    setTotalAmount(prev => {
      const newTotal = prev + envelope.amount;
      const openedIds = updated.filter(e => e.isOpen).map(e => e.id);

      localStorage.setItem(
        'loc_tet_progress_2026',
        JSON.stringify({ openedIds, total: newTotal })
      );

      return newTotal;
    });

    const newEntry: LeaderboardItem = {
      name: user?.senderName || "Bạn",
      time: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
      }),
      amount: envelope.amount
    };

    const newLb = [newEntry, ...leaderboard].slice(0, 50);
    setLeaderboard(newLb);
    localStorage.setItem('loc_tet_leaderboard_2026', JSON.stringify(newLb));

    setActiveEnvelope({ ...envelope, wish });
  };

  const containerSize = 2500;

  const envelopeElements = useMemo(() => {
    return envelopes.map(env => (
      <div
        key={env.id}
        className={`absolute w-12 h-16 sm:w-16 sm:h-20 rounded-lg flex flex-col items-center justify-center shadow-md cursor-pointer transition-all duration-300
        ${env.isOpen
            ? 'bg-gray-100 opacity-60'
            : 'bg-gradient-to-br from-red-500 to-yellow-500 hover:scale-110 hover:z-10 envelope-wiggle'
          }`}
        style={{
          top: env.top,
          left: env.left,
          transform: `translate(-50%, -50%) rotate(${env.rotation}deg) scale(${env.isOpen ? 0.8 : 1})`,
        }}
        onClick={() => openEnvelope(env.id)}
      >
        <span className="text-xl sm:text-2xl">
          {env.isOpen ? '✓' : '🧧'}
        </span>
      </div>
    ));
  }, [envelopes]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-red-50 to-yellow-50">

      {!user && <EntryModal onComplete={handleUserComplete} />}
      <FlowerRain />

      {user && (
        <Fireworks active={!!activeEnvelope || showLeaderboard} className="fixed inset-0 pointer-events-none z-50" />
      )}

      {/* HEADER */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-sm">
        <div>
          <h1 className="font-extrabold text-red-600 text-lg">Lộc Tết 2026</h1>
          <button onClick={toggleMusic} className="text-xs mt-1">
            {isMusicPlaying ? '🔊 Nhạc nền' : '🔈 Nhạc nền'}
          </button>
        </div>

        {/* 🔥 totalAmount được dùng tại đây */}
        <div className="text-right">
          <div className="font-bold text-red-600">
            🧧 {openedCount}/{TOTAL_ENVELOPES}
          </div>
          <div className="text-yellow-600 font-bold text-sm">
            Tổng lộc: {totalAmount.toLocaleString()}đ
          </div>
        </div>
      </div>

      {/* GAME AREA */}
      <div
        ref={scrollContainerRef}
        className="w-full h-full overflow-auto"
      >
        <div
          style={{
            width: containerSize * zoom,
            height: containerSize * zoom,
          }}
        >
          <div
            style={{
              width: containerSize,
              height: containerSize,
              transform: `scale(${zoom})`,
              transformOrigin: 'top left'
            }}
          >
            <img
              src={TREE_IMAGE_URL}
              className="absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2"
            />
            {envelopeElements}
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => setShowLeaderboard(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full"
      >
        🏆 Top
      </button>

      {activeEnvelope && (
        <ResultModal envelope={activeEnvelope} onClose={() => setActiveEnvelope(null)} />
      )}

      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        items={leaderboard}
        user={user}
      />
    </div>
  );
};

export default App;
