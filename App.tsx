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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalAmount, setTotalAmount] = useState(0);
  const [activeEnvelope, setActiveEnvelope] = useState<EnvelopeData | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  // Audio Refs
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const coinSoundRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Leaderboard data
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  // Initialize
  useEffect(() => {
    // Load User
    const savedUser = localStorage.getItem('loc_tet_user_2026');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load Game State
    const savedProgress = localStorage.getItem('loc_tet_progress_2026');
    const generated = generateEnvelopes();

    if (savedProgress) {
      const { openedIds, total } = JSON.parse(savedProgress);
      const openedSet = new Set(openedIds);
      const mergedEnvelopes = generated.map(env => ({
        ...env,
        isOpen: openedSet.has(env.id),
        wish: openedSet.has(env.id) ? "Đã nhận lộc" : "", 
        emoji: openedSet.has(env.id) ? "✓" : env.emoji
      }));
      setEnvelopes(mergedEnvelopes);
      setOpenedCount(openedIds.length);
      setTotalAmount(total);
    } else {
      setEnvelopes(generated);
    }

    // Load Leaderboard
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

    // Setup Audio
    bgMusicRef.current = new Audio(SOUNDS.bgMusic);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.3;

    coinSoundRef.current = new Audio(SOUNDS.coin);

  }, []);

  const handleUserComplete = (data: UserData) => {
    setUser(data);
    localStorage.setItem('loc_tet_user_2026', JSON.stringify(data));
    
    // Auto start music on interaction
    if (bgMusicRef.current) {
        bgMusicRef.current.play().catch(() => {
            console.log("Autoplay blocked, user must enable manually");
        });
        setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (bgMusicRef.current) {
      if (isMusicPlaying) {
        bgMusicRef.current.pause();
      } else {
        bgMusicRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleZoom = (delta: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const newZoom = Math.min(Math.max(zoom + delta, 0.4), 1.6);
    if (newZoom === zoom) return;

    // Calculate current center based on scroll position
    const centerX = (container.scrollLeft + container.clientWidth / 2) / zoom;
    const centerY = (container.scrollTop + container.clientHeight / 2) / zoom;

    setZoom(newZoom);

    // Adjust scroll to keep center after render
    setTimeout(() => {
      if (container) {
        container.scrollLeft = centerX * newZoom - container.clientWidth / 2;
        container.scrollTop = centerY * newZoom - container.clientHeight / 2;
      }
    }, 0);
  };

  const openEnvelope = (id: number) => {
    const envelope = envelopes.find(e => e.id === id);
    if (!envelope || envelope.isOpen) return;

    // Play sound
    if (coinSoundRef.current) {
        coinSoundRef.current.currentTime = 0;
        coinSoundRef.current.play().catch(() => {});
    }

    // Generate result
    const wish = getRandomWish();
    
    // Update State
    const updatedEnvelopes = envelopes.map(e => {
      if (e.id === id) {
        return { ...e, isOpen: true, wish, emoji: "✓" };
      }
      return e;
    });
    
    setEnvelopes(updatedEnvelopes);
    setOpenedCount(prev => prev + 1);
    setTotalAmount(prev => {
        const newTotal = prev + envelope.amount;
        const openedIds = updatedEnvelopes.filter(e => e.isOpen).map(e => e.id);
        localStorage.setItem('loc_tet_progress_2026', JSON.stringify({
            openedIds,
            total: newTotal
        }));
        return newTotal;
    });

    // Update Leaderboard
    const newEntry: LeaderboardItem = {
        name: user?.senderName || 'Bạn',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }),
        amount: envelope.amount
    };
    const newLb = [newEntry, ...leaderboard].slice(0, 50);
    setLeaderboard(newLb);
    localStorage.setItem('loc_tet_leaderboard_2026', JSON.stringify(newLb));

    // Show Result
    setActiveEnvelope({ ...envelope, wish });
  };

  const containerSize = 2500; 

  const envelopeElements = useMemo(() => {
    return envelopes.map((env) => (
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
        <span className="text-xl sm:text-2xl filter drop-shadow-sm">
            {env.isOpen ? '✓' : '🧧'}
        </span>
        {!env.isOpen && env.id % 9 === 0 && (
             <span className="absolute bottom-1 text-[8px] sm:text-[10px] text-yellow-100 font-bold uppercase tracking-tighter">Lộc</span>
        )}
         {!env.isOpen && env.id % 9 !== 0 && (
             <span className="absolute bottom-1 text-[8px] sm:text-[10px] text-yellow-100 font-bold uppercase tracking-tighter">Tết</span>
        )}
      </div>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [envelopes]); 

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-pink-100 via-red-50 to-yellow-50 text-gray-800">
      
      {!user && <EntryModal onComplete={handleUserComplete} />}

      {/* Effects */}
      <FlowerRain />
      
      {/* Global Fireworks for main game */}
      {user && (
          <Fireworks active={!!activeEnvelope || showLeaderboard} className="fixed inset-0 pointer-events-none z-50" />
      )}

      {/* Header (Sticky) */}
      <div className="absolute top-0 left-0 right-0 z-30 px-4 py-3 flex justify-between items-center bg-white/70 backdrop-blur-md shadow-sm">
        <div className="flex flex-col">
            <h1 className="font-extrabold text-red-600 text-lg leading-tight">Lộc Tết 2026</h1>
            <button 
                onClick={toggleMusic}
                className="text-xs font-semibold text-gray-500 bg-gray-200/50 px-2 py-1 rounded-full w-max mt-1 hover:bg-gray-300/50 transition-colors"
            >
                {isMusicPlaying ? '🔊 Nhạc nền' : '🔈 Nhạc nền'}
            </button>
        </div>
        <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full">
                <span>🧧</span>
                <span>{openedCount} / {TOTAL_ENVELOPES}</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">Đã mở</span>
        </div>
      </div>

      {/* Main Game Area (Scrollable with Zoom) */}
      <div 
        ref={(el) => {
            // @ts-ignore
            scrollContainerRef.current = el;
            // Initial center scroll only once
            if (el && !user && el.scrollLeft === 0) {
                el.scrollTop = (containerSize - window.innerHeight) / 2;
                el.scrollLeft = (containerSize - window.innerWidth) / 2;
            }
        }}
        className="w-full h-full overflow-auto relative custom-scrollbar touch-pan-x touch-pan-y"
      >
        {/* Scaling Wrapper */}
        <div 
            style={{ 
                width: `${containerSize * zoom}px`, 
                height: `${containerSize * zoom}px`,
                transition: 'width 0.2s ease-out, height 0.2s ease-out' 
            }}
            className="relative"
        >
            <div 
                className="relative origin-top-left transition-transform duration-200 ease-out" 
                style={{ 
                    width: `${containerSize}px`, 
                    height: `${containerSize}px`,
                    transform: `scale(${zoom})`
                }}
            >
                {/* The Tree Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                     <img 
                        src={TREE_IMAGE_URL} 
                        alt="Cây đào" 
                        className="w-[300px] h-auto sm:w-[400px] opacity-90 drop-shadow-2xl rounded-full"
                     />
                </div>
                
                {/* The Envelopes Layer */}
                {envelopeElements}
            </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
          <button 
            onClick={() => handleZoom(0.2)}
            className="w-12 h-12 bg-white text-red-600 rounded-full shadow-lg font-bold text-2xl flex items-center justify-center hover:bg-red-50 active:scale-95 transition-all border border-red-100"
            aria-label="Zoom In"
          >
            +
          </button>
          <button 
            onClick={() => handleZoom(-0.2)}
            className="w-12 h-12 bg-white text-red-600 rounded-full shadow-lg font-bold text-2xl flex items-center justify-center hover:bg-red-50 active:scale-95 transition-all border border-red-100"
            aria-label="Zoom Out"
          >
            −
          </button>
      </div>

      {/* Floating Leaderboard Button */}
      <button 
        onClick={() => setShowLeaderboard(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-2 font-bold animate-bounce"
      >
        <span>🏆</span>
        <span className="hidden sm:inline">Top mở lì xì</span>
      </button>

      {/* Modals */}
      {activeEnvelope && (
        <ResultModal 
            envelope={activeEnvelope} 
            onClose={() => setActiveEnvelope(null)} 
        />
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