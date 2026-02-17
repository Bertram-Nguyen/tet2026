import React from 'react';
import { LeaderboardItem, UserData } from '../types';
import { formatMoney } from '../utils';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LeaderboardItem[];
  user: UserData | null;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose, items, user }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-end sm:items-center justify-center pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/40 pointer-events-auto" 
        onClick={onClose}
      />
      <div className="bg-white w-full sm:w-96 max-h-[80vh] rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pointer-events-auto overflow-hidden flex flex-col animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
            🏆 Những Người Mở Lì Xì
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
           {items.length === 0 ? (
             <p className="text-center text-gray-500 italic py-8">Chưa có ai mở lì xì. Hãy là người đầu tiên!</p>
           ) : (
             items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-xs font-bold text-red-700">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <div className="font-bold text-red-600 text-sm">
                    {formatMoney(item.amount)} đ
                  </div>
                </div>
             ))
           )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;