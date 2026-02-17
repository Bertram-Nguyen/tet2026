
export const TOTAL_ENVELOPES = 2026;
export const FIXED_AMOUNT = 8386;

export const WISHES = [
  "Năm mới phát tài, vạn sự như ý!",
  "Tiền vào như nước, tiền ra nhỏ giọt.",
  "Sức khỏe dồi dào, an khang thịnh vượng.",
  "Cung chúc tân xuân, vạn sự bình an.",
  "Hay ăn chóng lớn, tiền đầy túi.",
  "Sự nghiệp thăng tiến, mã đáo thành công.",
  "Tình duyên phơi phới, hạnh phúc đong đầy.",
  "Gia đình hạnh phúc, con cháu sum vầy.",
  "Tấn tài tấn lộc, tấn bình an.",
  "Chúc mừng năm mới, đại thắng lợi!",
  "Luôn vui vẻ, trẻ khỏe, yêu đời.",
  "Học hành tấn tới, thi đâu đậu đó.",
  "Công việc thuận lợi, sếp yêu đồng nghiệp mến.",
  "Năm mới bình an, sung túc đủ đầy."
];

export const EMOJIS = ["🧧", "✨", "🍑", "🐉", "💰", "🎊", "🎉", "💖", "🌸", "🌼"];

export const SOUNDS = {
  // Reliable MP3 sources for Github Pages compatibility
  bgMusic: "https://upload.wikimedia.org/wikipedia/commons/transcoded/6/61/Twelve_Days_of_Christmas_-_instrumental_%28simulated%29.ogg/Twelve_Days_of_Christmas_-_instrumental_%28simulated%29.ogg.mp3", 
  coin: "https://www.soundjay.com/misc/sounds/magic-chime-01.mp3",
  firework: "https://www.soundjay.com/misc/sounds/fireworks-1.mp3" 
};

export const BANK_LIST = [
  "Vietcombank", "MBBank", "Techcombank", "ACB", "VPBank", 
  "BIDV", "VietinBank", "TPBank", "Sacombank", "Agribank", "Momo", "ZaloPay"
];

// Note: For production on Github, ensure this URL is stable or replace with a local asset.
// This is a placeholder for a Peach Blossom tree.
export const TREE_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Prunus_persica_tree.jpg/800px-Prunus_persica_tree.jpg";

// --- GOOGLE SHEETS INTEGRATION ---
export const GOOGLE_FORM_CONFIG = {
  // Link dạng: https://docs.google.com/forms/u/0/d/e/[FORM_ID]/formResponse
  actionURL: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdYvFscITy_QAZJGYpjRzMyq3ZEmFl6EssVeVRfUBpxCA3M7Q/formResponse", 
  
  // Các mã số entry ID tương ứng với từng trường trong Google Form
  entryIDs: {
    name: "entry.952747159",     // Tên người gửi
    bank: "entry.2126110762",    // Ngân hàng
    account: "entry.1146902678"  // Số tài khoản
  }
};
