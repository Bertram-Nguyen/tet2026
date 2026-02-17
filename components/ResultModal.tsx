import React, { useEffect } from 'react';
import { EnvelopeData } from '../types';
import { formatMoney } from '../utils';

interface ResultModalProps {
  envelope: EnvelopeData;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ envelope, onClose }) => {
  useEffect(() => {
    // Confetti effect inside modal could be handled here or by parent
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-sm bg-gradient-to-br from-red-50 to-yellow-50 rounded-[32px] p-1 shadow-2xl animate-pop transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white/80 backdrop-blur rounded-[28px] p-6 text-center border border-red-100 h-full flex flex-col items-center">
          <div className="text-6xl mb-4 animate-bounce filter drop-shadow-md">
            {envelope.emoji}
          </div>
          
          <h2 className="text-2xl font-bold text-red-600 mb-2">Lì xì may mắn</h2>
          
          <div className="my-4 py-4 px-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl shadow-inner transform scale-110">
            <span className="text-3xl font-black text-white tracking-wider">
              {formatMoney(envelope.amount)} đ
            </span>
          </div>

          <div className="w-full bg-yellow-50 rounded-xl p-4 my-4 border border-yellow-200">
            <p className="text-yellow-800 font-semibold italic font-serif text-lg leading-relaxed">
              "{envelope.wish}"
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-2 w-full bg-white border-2 border-red-200 text-red-500 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;