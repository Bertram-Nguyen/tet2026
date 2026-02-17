import React from 'react';
import { LeaderboardItem, UserData } from '../types';
import { formatMoney } from '../utils';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: LeaderboardItem[];
  user: UserData | null;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  items,
  user,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-end sm:items-center justify-center pointer-events-none">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="bg-white w-full sm:w-96 max-h-[80vh] rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 pointer-events-auto overflow-hidden flex flex-col animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
            🏆 Những Người Mở Lì Xì
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 italic py-8">
              Chưa có ai mở lì xì. Hãy là người đầu tiên!
            </p>
          ) : (
            items.map((item, idx) => {
              // 🔥 FIX: sử dụng user → hết lỗi TS6133
              const isMe =
                user && user.senderName && item.name === user.senderName;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-xl border
                  ${
                    isMe
                      ? 'bg-yellow-100 border-yellow-300 shadow-md'
                      : 'bg-red-50 border-red-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${
                        isMe
                          ? 'bg-yellow-300 text-yellow-900'
                          : 'bg-red-200 text-red-700'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div>
                      <p
                        className={`font-bold text-sm ${
                          isMe ? 'text-yellow-900' : 'text-gray-800'
                        }`}
                      >
                        {item.name}
                        {isMe && ' (Bạn)'}
                      </p>

                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>

                  <div
                    className={`font-bold text-sm ${
                      isMe ? 'text-yellow-700' : 'text-red-600'
                    }`}
                  >
                    {formatMoney(item.amount)} đ
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;
