import React, { useState } from 'react';
import { BANK_LIST } from '../constants';
import { UserData } from '../types';
import Fireworks from './Fireworks';

interface EntryModalProps {
  onComplete: (data: UserData) => void;
}

const EntryModal: React.FC<EntryModalProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [bank, setBank] = useState(BANK_LIST[0]);
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !account.trim()) {
      setError('Vui lòng điền đủ thông tin để nhận lộc nha!');
      return;
    }
    onComplete({ senderName: name, bankName: bank, accountNumber: account });
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Layer - Dark Atmosphere for Fireworks */}
      <div className="absolute inset-0 bg-[#1a0b0b]">
         
         {/* Ambient Glows */}
         <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-red-600 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-[#FFD700] rounded-full blur-[120px] opacity-15 animate-pulse delay-1000"></div>
         
         {/* Semi-transparent overlay for depth */}
         <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-0"></div>

         {/* Render Fireworks ON TOP of the overlay to be bright and visible */}
         <Fireworks active={true} className="absolute inset-0 z-1" />
      </div>
      
      {/* Main Card */}
      <div className="relative z-10 w-full max-w-sm bg-[#FFFDF8] rounded-[3rem] shadow-2xl overflow-hidden animate-pop border-4 border-[#FFE4E1]">
        
        {/* Decorative Top Shape */}
        <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-[#FF6B6B] to-[#FF8E8E] rounded-b-[3rem]"></div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-12 pb-8">
            
            {/* Avatar Circle */}
            <div className="w-24 h-24 bg-white rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.1)] flex items-center justify-center mb-3 border-4 border-white transform hover:scale-105 transition-transform duration-300">
                <span className="text-5xl filter drop-shadow-sm">🐎</span>
            </div>

            <h1 className="text-3xl font-black text-white mb-2 tracking-tight drop-shadow-md">LỘC TẾT 2026</h1>
            <p className="text-[#FF4757] font-bold text-sm mb-6 bg-white/90 px-4 py-1.5 rounded-full shadow-sm">
                ✨ Nhận lì xì - Vạn sự như ý ✨
            </p>

            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="group">
                    <label className="ml-3 text-xs font-bold text-[#FF6B6B] uppercase mb-1 block group-focus-within:text-[#FF4757]">
                        Tên của bạn
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên..."
                        className="w-full bg-[#FFF0F0] border-2 border-transparent focus:border-[#FF6B6B] focus:bg-white rounded-2xl px-5 py-3.5 text-gray-700 font-bold outline-none transition-all placeholder-[#FFB8B8]"
                    />
                </div>

                <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-2 group">
                        <label className="ml-3 text-xs font-bold text-[#FF6B6B] uppercase mb-1 block">
                           Ngân hàng
                        </label>
                        <div className="relative">
                            <select
                                value={bank}
                                onChange={(e) => setBank(e.target.value)}
                                className="w-full bg-[#FFF0F0] border-2 border-transparent focus:border-[#FF6B6B] focus:bg-white rounded-2xl px-3 py-3.5 text-gray-700 font-bold outline-none appearance-none transition-all text-sm"
                            >
                                {BANK_LIST.map((b) => (
                                <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                             <div className="absolute right-3 top-1/2 pt-1 -translate-y-1/2 pointer-events-none text-[#FF6B6B] text-[10px]">
                                ▼
                             </div>
                        </div>
                    </div>
                    <div className="col-span-3 group">
                        <label className="ml-3 text-xs font-bold text-[#FF6B6B] uppercase mb-1 block">
                            Số tài khoản
                        </label>
                        <input
                            type="text"
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}
                            placeholder="Số TK..."
                            className="w-full bg-[#FFF0F0] border-2 border-transparent focus:border-[#FF6B6B] focus:bg-white rounded-2xl px-5 py-3.5 text-gray-700 font-bold outline-none transition-all placeholder-[#FFB8B8]"
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-[#FF4757] text-xs font-bold py-2 px-4 rounded-xl text-center border border-red-100 animate-pulse">
                        ⚠️ {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-[#FF4757] to-[#FF6B6B] text-white font-black text-lg py-4 rounded-2xl shadow-[0_6px_0_#D63031] active:shadow-none active:translate-y-[6px] transition-all hover:brightness-110 flex items-center justify-center gap-2"
                >
                    <span>VÀO NHẬN LÌ XÌ</span>
                    <span className="text-xl">🧧</span>
                </button>
            </form>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="mt-8 text-center animate-bounce z-10">
         <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-white font-bold text-sm shadow-lg flex flex-col items-center">
            <span>👇 Kéo xuống để mở bao</span>
         </div>
      </div>
    </div>
  );
};

export default EntryModal;