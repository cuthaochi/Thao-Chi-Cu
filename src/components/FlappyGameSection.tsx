import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Trophy, RotateCcw, Copy, Check, Volume2, VolumeX, 
  Sparkles, Award, Gift, ArrowLeft, Play, ShieldAlert
} from 'lucide-react';

// Declare callback window augmentations
declare global {
  interface Window {
    onFlappyVoucherWin?: (data: {
      score: number;
      voucherCode: string;
      reward: string;
      timestamp: string;
    }) => void;
    onFlappyVoucherLose?: (data: {
      score: number;
      timestamp: string;
    }) => void;
  }
}

// Config variables strictly matching PDF specifications
const WIN_SCORE = 20;
const GRAVITY = 0.32;
const JUMP_FORCE = -6.2;
const PIPE_SPEED = 2.1;
const PIPE_GAP = 160;
const PIPE_WIDTH = 56;
const PIPE_SPAWN_INTERVAL = 110; // frames
const VOUCHER_TEXT = 'Voucher 2 lít xăng';
const BRAND_NAME = 'VietinBank';
const GAME_TITLE = 'Chờ vui – Chơi hay – Nhận quà liền tay';

interface FlappyGameSectionProps {
  onReturnHome: () => void;
}

export const FlappyGameSection: React.FC<FlappyGameSectionProps> = ({ onReturnHome }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game states: 'start' | 'playing' | 'lost' | 'won'
  const [gameState, setGameState] = useState<'start' | 'playing' | 'lost' | 'won'>('start');
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('vb_flappy_high_score') || '0', 10);
  });
  const [latestVoucher, setLatestVoucher] = useState<string | null>(() => {
    return localStorage.getItem('vb_flappy_latest_voucher');
  });
  const [currentVoucher, setCurrentVoucher] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  // Web Audio Synth for jump and score
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBeep = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Internal physics refs
  const birdRef = useRef({
    x: 60,
    y: 180,
    velocity: 0,
    radius: 18,
    angle: 0,
  });

  const pipesRef = useRef<Array<{
    x: number;
    topHeight: number;
    bottomHeight: number;
    passed: boolean;
  }>>([]);

  const frameCountRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Encouragement text according to current score
  const getCheerText = (score: number) => {
    if (score < 5) return 'Khởi động nhẹ nhàng!';
    if (score < 10) return 'Tốt lắm, tiếp tục nào!';
    if (score < 15) return 'Một nửa chặng đường rồi!';
    if (score < 20) return 'Sắp nhận quà rồi!';
    return 'Xuất sắc!';
  };

  // Generate voucher code format VB-XXXXXX
  const generateVoucherCode = (): string => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
    return `VB-${randomDigits}`;
  };

  const copyVoucherCode = () => {
    const code = currentVoucher || latestVoucher;
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Jump trigger
  const jump = useCallback(() => {
    if (gameState === 'playing') {
      birdRef.current.velocity = JUMP_FORCE;
      playBeep(440, 'triangle', 0.12);
    } else if (gameState === 'start') {
      startGame();
    }
  }, [gameState, soundEnabled]);

  // Handle keyboard & touch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Start game
  const startGame = () => {
    resetGame();
    setGameState('playing');
    playBeep(520, 'sine', 0.15);
  };

  // Reset game state
  const resetGame = () => {
    birdRef.current = {
      x: 60,
      y: 180,
      velocity: 0,
      radius: 18,
      angle: 0,
    };
    pipesRef.current = [];
    frameCountRef.current = 0;
    setCurrentScore(0);
    setShake(false);
  };

  // End game (Lose)
  const endGame = (finalScore: number) => {
    setGameState('lost');
    setShake(true);
    setTimeout(() => setShake(false), 500);
    playBeep(200, 'sawtooth', 0.3);

    // Update high score
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('vb_flappy_high_score', finalScore.toString());
    }

    // Call window callback if defined
    if (typeof window.onFlappyVoucherLose === 'function') {
      window.onFlappyVoucherLose({
        score: finalScore,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Win game
  const winGame = () => {
    setGameState('won');
    const newCode = generateVoucherCode();
    setCurrentVoucher(newCode);
    setLatestVoucher(newCode);
    localStorage.setItem('vb_flappy_latest_voucher', newCode);
    setHighScore(20);
    localStorage.setItem('vb_flappy_high_score', '20');

    playBeep(660, 'sine', 0.2);
    setTimeout(() => playBeep(880, 'sine', 0.35), 200);

    // Call window callback if defined
    if (typeof window.onFlappyVoucherWin === 'function') {
      window.onFlappyVoucherWin({
        score: WIN_SCORE,
        voucherCode: newCode,
        reward: VOUCHER_TEXT,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Main Game Loop on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set fixed render size for consistent physics, CSS scales it
    const W = 360;
    const H = 540;
    canvas.width = W;
    canvas.height = H;

    let scoreValue = 0;

    const render = () => {
      // 1. Draw Background: Sky gradient with VietinBank subtle aesthetics
      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#e0f2fe'); // soft sky blue
      bgGrad.addColorStop(0.7, '#f0f9ff');
      bgGrad.addColorStop(1, '#e2e8f0');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Distant clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(80, 90, 24, 0, Math.PI * 2);
      ctx.arc(110, 85, 30, 0, Math.PI * 2);
      ctx.arc(140, 90, 24, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(260, 140, 20, 0, Math.PI * 2);
      ctx.arc(285, 135, 26, 0, Math.PI * 2);
      ctx.arc(310, 140, 20, 0, Math.PI * 2);
      ctx.fill();

      // Distant bank towers skyline silhouette
      ctx.fillStyle = 'rgba(0, 56, 107, 0.06)';
      ctx.fillRect(40, H - 90, 45, 60);
      ctx.fillRect(90, H - 120, 55, 90);
      ctx.fillRect(150, H - 80, 50, 50);
      ctx.fillRect(205, H - 140, 60, 110);
      ctx.fillRect(270, H - 100, 50, 70);

      // Ground strip
      const groundGrad = ctx.createLinearGradient(0, H - 30, 0, H);
      groundGrad.addColorStop(0, '#00386B');
      groundGrad.addColorStop(1, '#00203f');
      ctx.fillStyle = groundGrad;
      ctx.fillRect(0, H - 30, W, 30);
      // Red top border on ground
      ctx.fillStyle = '#ED1C24';
      ctx.fillRect(0, H - 32, W, 2);

      if (gameState === 'playing') {
        frameCountRef.current++;

        // 2. Spawn pipes
        if (frameCountRef.current % PIPE_SPAWN_INTERVAL === 0) {
          const minPipe = 60;
          const maxPipe = H - 30 - PIPE_GAP - minPipe;
          const topH = Math.floor(minPipe + Math.random() * (maxPipe - minPipe));
          const bottomH = H - 30 - PIPE_GAP - topH;
          pipesRef.current.push({
            x: W,
            topHeight: topH,
            bottomHeight: bottomH,
            passed: false,
          });
        }

        // 3. Update & Draw Pipes
        for (let i = pipesRef.current.length - 1; i >= 0; i--) {
          const p = pipesRef.current[i];
          p.x -= PIPE_SPEED;

          // Draw Top Pipe
          const pipeGrad = ctx.createLinearGradient(p.x, 0, p.x + PIPE_WIDTH, 0);
          pipeGrad.addColorStop(0, '#0284c7');
          pipeGrad.addColorStop(0.5, '#38bdf8');
          pipeGrad.addColorStop(1, '#0369a1');

          ctx.fillStyle = pipeGrad;
          ctx.fillRect(p.x, 0, PIPE_WIDTH, p.topHeight);
          // Pipe cap
          ctx.fillStyle = '#00386B';
          ctx.fillRect(p.x - 3, p.topHeight - 16, PIPE_WIDTH + 6, 16);
          ctx.fillStyle = '#ED1C24';
          ctx.fillRect(p.x - 3, p.topHeight - 2, PIPE_WIDTH + 6, 2);

          // Draw Bottom Pipe
          const bottomY = H - 30 - p.bottomHeight;
          ctx.fillStyle = pipeGrad;
          ctx.fillRect(p.x, bottomY, PIPE_WIDTH, p.bottomHeight);
          // Pipe cap
          ctx.fillStyle = '#00386B';
          ctx.fillRect(p.x - 3, bottomY, PIPE_WIDTH + 6, 16);
          ctx.fillStyle = '#ED1C24';
          ctx.fillRect(p.x - 3, bottomY, PIPE_WIDTH + 6, 2);

          // Scoring Check
          if (!p.passed && p.x + PIPE_WIDTH < birdRef.current.x) {
            p.passed = true;
            scoreValue++;
            setCurrentScore(scoreValue);
            playBeep(600, 'sine', 0.1);

            // Win condition reached
            if (scoreValue >= WIN_SCORE) {
              winGame();
              return;
            }
          }

          // Collision Check
          const bird = birdRef.current;
          const hitTop = bird.x + bird.radius > p.x && 
                         bird.x - bird.radius < p.x + PIPE_WIDTH && 
                         bird.y - bird.radius < p.topHeight;
          const hitBottom = bird.x + bird.radius > p.x && 
                            bird.x - bird.radius < p.x + PIPE_WIDTH && 
                            bird.y + bird.radius > bottomY;

          if (hitTop || hitBottom) {
            endGame(scoreValue);
            return;
          }

          // Remove out of bounds pipe
          if (p.x + PIPE_WIDTH < -10) {
            pipesRef.current.splice(i, 1);
          }
        }

        // 4. Update Bird physics
        const b = birdRef.current;
        b.velocity += GRAVITY;
        b.y += b.velocity;
        b.angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, b.velocity * 0.08));

        // Ground / Ceiling collision
        if (b.y + b.radius >= H - 30) {
          b.y = H - 30 - b.radius;
          endGame(scoreValue);
          return;
        }
        if (b.y - b.radius <= 0) {
          b.y = b.radius;
          b.velocity = 0;
        }
      }

      // 5. Draw Bird (VietinBank Mascot / Golden Card with Wings)
      const b = birdRef.current;
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.angle);

      // Card body (VietinBank blue & red gradient)
      const cardW = 34;
      const cardH = 22;
      const cardR = 4;
      ctx.fillStyle = '#00386B';
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, cardR);
      ctx.fill();

      // Red accent stripe on card
      ctx.fillStyle = '#ED1C24';
      ctx.fillRect(-cardW / 2, 2, cardW, 4);

      // Gold chip
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(-cardW / 2 + 4, -cardH / 2 + 4, 7, 6, 1);
      ctx.fill();

      // Wing (Flapping)
      const wingYOffset = gameState === 'playing' ? Math.sin(frameCountRef.current * 0.3) * 6 : 0;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-2, -cardH / 2 + wingYOffset, 9, 5, Math.PI / 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Friendly eye
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(cardW / 2 - 5, -3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(cardW / 2 - 4, -3, 1.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // 6. Draw in-game top HUD (Score counter & target)
      if (gameState === 'playing') {
        ctx.fillStyle = '#00386B';
        ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`Điểm: ${scoreValue}/${WIN_SCORE}`, W / 2, 40);
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    animationFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [gameState]);

  return (
    <div id="flappy-voucher-game" className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Game Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00386B] text-white flex items-center justify-center font-bold">
            <Gift className="w-5 h-5 text-rose-300" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900">
              {GAME_TITLE}
            </h1>
            <p className="text-xs text-slate-500">
              Chơi giải trí trong lúc chờ giao dịch · Nhận ngay {VOUCHER_TEXT}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1 transition-colors ${
              soundEnabled
                ? 'bg-blue-50 border-blue-200 text-[#00386B]'
                : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Bật' : 'Tắt'}</span>
          </button>

          <button
            onClick={onReturnHome}
            className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Thoát ra</span>
          </button>
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Canvas Game Console Container */}
        <div className="md:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-[360px] bg-slate-900 rounded-3xl p-3 shadow-2xl border-4 border-slate-800">
            {/* Live Cheer Pill */}
            {gameState === 'playing' && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-full shadow-md text-[11px] font-bold text-[#00386B] animate-pulse">
                {getCheerText(currentScore)}
              </div>
            )}

            {/* Screen Shake container on collision */}
            <div className={`overflow-hidden rounded-2xl relative select-none touch-none ${shake ? 'animate-bounce' : ''}`}>
              <canvas
                ref={canvasRef}
                onClick={jump}
                onTouchStart={(e) => {
                  e.preventDefault();
                  jump();
                }}
                className="w-full h-auto block bg-sky-100 cursor-pointer"
                style={{ touchAction: 'manipulation' }}
              />

              {/* OVERLAY: Start Screen */}
              {gameState === 'start' && (
                <div className="absolute inset-0 bg-[#00386B]/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shadow-inner">
                    <Trophy className="w-8 h-8 text-amber-300" />
                  </div>
                  <h2 className="text-xl font-extrabold tracking-tight">
                    {GAME_TITLE}
                  </h2>
                  <div className="bg-white/15 px-3 py-2 rounded-xl text-xs font-medium text-amber-200">
                    Vượt qua 20 thử thách để nhận {VOUCHER_TEXT}
                  </div>
                  <button
                    onClick={startGame}
                    className="w-full py-3 px-6 bg-[#ED1C24] hover:bg-[#c91219] text-white font-bold text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Bắt đầu chơi</span>
                  </button>
                  <p className="text-[11px] text-blue-200">
                    Chạm màn hình hoặc nhấn Space để bay
                  </p>
                </div>
              )}

              {/* OVERLAY: Loss Screen */}
              {gameState === 'lost' && (
                <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold">
                    Rất tiếc, bạn đã vượt qua {currentScore}/20 thử thách
                  </h3>
                  <p className="text-xs text-slate-300">
                    Chỉ còn một chút nữa thôi, hãy thử lại nhé!
                  </p>

                  <div className="w-full pt-2 flex flex-col gap-2">
                    <button
                      onClick={startGame}
                      className="w-full py-2.5 px-4 bg-[#00386B] hover:bg-[#002b52] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Chơi lại</span>
                    </button>
                    <button
                      onClick={onReturnHome}
                      className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-xl"
                    >
                      Về màn hình chính
                    </button>
                  </div>
                </div>
              )}

              {/* OVERLAY: Win Screen */}
              {gameState === 'won' && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-950/95 to-slate-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center animate-bounce">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-amber-300">
                    Chúc mừng!
                  </h3>
                  <p className="text-xs text-blue-100">
                    Bạn đã vượt qua 20 thử thách và đủ điều kiện nhận <strong>{VOUCHER_TEXT}</strong>.
                  </p>

                  {/* Generated Voucher Code Card */}
                  <div className="w-full bg-white text-slate-900 rounded-xl p-3 border-2 border-amber-300 shadow-lg space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">
                      Mã quà tặng của bạn
                    </span>
                    <div className="text-2xl font-black tracking-widest text-[#00386B] font-mono">
                      {currentVoucher}
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-100/90 leading-tight">
                    Vui lòng chụp màn hình hoặc đưa mã này cho nhân viên để nhận quà.
                  </p>

                  <div className="w-full pt-1 flex flex-col gap-2">
                    <button
                      onClick={copyVoucherCode}
                      className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Đã sao chép mã!' : 'Sao chép mã'}</span>
                    </button>
                    <button
                      onClick={startGame}
                      className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl"
                    >
                      Chơi lại
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tap instruction bar at bottom of mobile frame */}
            <div className="mt-2 text-center text-[11px] text-slate-400">
              {gameState === 'playing' ? 'Chạm vào màn hình để bay qua chướng ngại vật' : 'Sử dụng phím Space hoặc chạm cảm ứng'}
            </div>
          </div>
        </div>

        {/* Right Info Column: Progress, Voucher history, Rules */}
        <div className="md:col-span-5 space-y-5">
          {/* Progress Bar & Status */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Tiến độ nhận quà
              </span>
              <span className="text-sm font-bold text-[#00386B]">
                {currentScore} / {WIN_SCORE} điểm
              </span>
            </div>

            {/* Progress track */}
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-[#00386B] to-[#ED1C24] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (currentScore / WIN_SCORE) * 100)}%` }}
              />
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center gap-2 text-xs text-[#00386B]">
              <Award className="w-4 h-4 shrink-0 text-[#ED1C24]" />
              <span>Động viên: <strong className="font-semibold">{getCheerText(currentScore)}</strong></span>
            </div>
          </div>

          {/* Latest Voucher History (Persisted in localStorage) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mã gần nhất
              </span>
              <span className="text-xs text-slate-500">
                Kỷ lục: {highScore}/20
              </span>
            </div>

            {latestVoucher ? (
              <div className="border border-emerald-200 bg-emerald-50/70 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-emerald-800 font-semibold uppercase">
                    Voucher 2 lít xăng
                  </div>
                  <div className="text-lg font-black text-emerald-950 font-mono">
                    {latestVoucher}
                  </div>
                </div>
                <button
                  onClick={copyVoucherCode}
                  className="p-2 text-emerald-800 hover:bg-emerald-100 rounded-lg"
                  title="Sao chép"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl text-center">
                Chưa có mã quà tặng nào. Hãy vượt qua 20 thử thách để nhận voucher!
              </div>
            )}
          </div>

          {/* Game Rules Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 text-sm mb-1">
              Thể lệ & Hướng dẫn nhận quà
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Mỗi khách hàng đạt đủ 20 điểm sẽ được hệ thống cấp ngay 01 mã voucher dạng <strong className="text-slate-800 font-mono">VB-XXXXXX</strong>.</li>
              <li>Đưa màn hình mã quà tặng cho chuyên viên giao dịch VietinBank tại quầy để được nhận quà liền tay.</li>
              <li>Không giới hạn số lượt thử lại trong thời gian chờ giao dịch.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
