import React, { useEffect, useState } from 'react';

const FlowerRain: React.FC = () => {
  const [petals, setPetals] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setPetals((prev) => [
        ...prev,
        {
          id,
          left: Math.random() * 100,
          duration: 3 + Math.random() * 5,
          delay: 0,
        },
      ]);

      // Cleanup old petals
      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== id));
      }, 8000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal absolute text-xl opacity-70"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.duration}s`,
            fontSize: `${Math.random() * 1 + 0.5}rem`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

export default FlowerRain;