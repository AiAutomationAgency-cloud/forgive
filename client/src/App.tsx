import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Download, Volume2, VolumeX } from 'lucide-react';

const apologyMessages = [
  "I'm sorry for being a monkey who forgot how much you hate going outside! 🐒",
  "Please forgive this silly banana brain for suggesting outdoor activities! 🍌",
  "I promise to only suggest Netflix and snacks from now on! 📺🍿",
  "My bad for forgetting you're all indoor princesses! 👑",
  "Sorry for being a monkey with no common sense! 🙈",
  "I'll stick to suggesting cozy indoor hangouts only! 🏠❤️"
];

const MonkeyMascot: React.FC<{ onClick: () => void; isClicked: boolean }> = ({ onClick, isClicked }) => (
  <motion.div
    className="text-8xl cursor-pointer select-none"
    onClick={onClick}
    animate={isClicked ? { 
      scale: [1, 1.2, 1],
      rotate: [0, -10, 10, 0] 
    } : { 
      y: [0, -10, 0] 
    }}
    transition={isClicked ? { 
      duration: 0.6 
    } : { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    whileHover={{ scale: 1.1 }}
  >
    🐒
  </motion.div>
);

const ApologyMeter: React.FC<{ level: number }> = ({ level }) => (
  <motion.div 
    className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
      Apology-o-meter 📊
    </h3>
    <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
      <motion.div
        className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-full flex items-center justify-end pr-2"
        initial={{ width: "0%" }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <span className="text-white font-bold text-sm">
          {level}% Forgiven
        </span>
      </motion.div>
    </div>
  </motion.div>
);

const BananaRain: React.FC = () => {
  const [bananas, setBananas] = React.useState<Array<{ id: number; left: number; delay: number }>>([]);

  const startBananaRain = () => {
    const newBananas = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setBananas(newBananas);
    setTimeout(() => setBananas([]), 3000);
  };

  React.useEffect(() => {
    startBananaRain();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {bananas.map((banana) => (
        <motion.div
          key={banana.id}
          className="absolute text-4xl"
          style={{ left: `${banana.left}%` }}
          initial={{ y: -100, rotate: 0 }}
          animate={{ y: window.innerHeight + 100, rotate: 360 }}
          transition={{ 
            duration: 3, 
            delay: banana.delay,
            ease: "linear" 
          }}
        >
          🍌
        </motion.div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [forgivenessLevel, setForgivenessLevel] = useState(15);
  const [isMonkeyClicked, setIsMonkeyClicked] = useState(false);
  const [currentSection, setCurrentSection] = useState('main');
  const [showBananaRain, setShowBananaRain] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Rotate apology messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % apologyMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Play monkey sound
  const playMonkeySound = () => {
    if (!soundEnabled) return;
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const handleMonkeyClick = () => {
    setIsMonkeyClicked(true);
    playMonkeySound();
    setTimeout(() => setIsMonkeyClicked(false), 600);
    
    if (forgivenessLevel < 90) {
      setForgivenessLevel(prev => Math.min(prev + 10, 90));
    }
  };

  const handleForgiveClick = () => {
    setForgivenessLevel(100);
    setShowBananaRain(true);
    setTimeout(() => setShowBananaRain(false), 3000);
    
    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
    });
    
    // Play celebration sound
    if (soundEnabled) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.2);
        oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.4);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
      } catch (error) {
        console.log('Audio not supported');
      }
    }
  };

  const downloadContract = () => {
    const contractText = `
MONKEY CONTRACT OF FORGIVENESS
================================

I, the undersigned monkey 🐒, hereby solemnly swear:

✓ I will NEVER suggest outdoor activities unless there's a special event
✓ I will always remember you prefer Netflix over nature
✓ I will suggest cozy indoor hangouts only
✓ I will provide unlimited virtual bananas as compensation 🍌
✓ I acknowledge my monkey brain sometimes malfunctions

Signed with monkey paws and banana ink,
Your Apologetic Monkey Friend

Date: ${new Date().toLocaleDateString()}
Forgiveness Level: ${forgivenessLevel}%
    `;
    
    const blob = new Blob([contractText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Monkey_Forgiveness_Contract.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const MainSection = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Sorry Aprajita, Roshni & Sakshi 🙏
          </h1>
          <p className="text-xl md:text-2xl text-white/90">
            A heartfelt apology from your monkey friend
          </p>
        </motion.header>

        {/* Sound Toggle */}
        <motion.button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="fixed top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors z-40"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column - Monkey and Messages */}
          <div className="space-y-8">
            {/* Monkey Mascot */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MonkeyMascot onClick={handleMonkeyClick} isClicked={isMonkeyClicked} />
              <p className="text-gray-600 mt-4 text-lg">
                Click me for monkey sounds! 🎵
              </p>
            </motion.div>

            {/* Rotating Messages */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMessageIndex}
                  className="text-xl md:text-2xl text-gray-800 text-center font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {apologyMessages[currentMessageIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* The Oath */}
            <motion.div 
              className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl p-6 shadow-lg border-4 border-yellow-400"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                My Solemn Oath 🤝
              </h3>
              <p className="text-lg text-gray-700 text-center italic">
                "I promise I will never ask you all to go outside unless there is a special event."
              </p>
            </motion.div>
          </div>

          {/* Right Column - Interactive Elements */}
          <div className="space-y-8">
            {/* Apology Meter */}
            <ApologyMeter level={forgivenessLevel} />

            {/* Forgive Button */}
            <motion.div 
              className="text-center"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={handleForgiveClick}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={forgivenessLevel === 100}
              >
                {forgivenessLevel === 100 ? 'Thank You! 🥺❤️' : 'Forgive Me? 🥺👉👈'}
              </motion.button>
              {forgivenessLevel === 100 && (
                <motion.p 
                  className="text-white text-lg mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  You're the best friends ever! 🌟
                </motion.p>
              )}
            </motion.div>

            {/* Contract Download */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Official Forgiveness Contract 📋
              </h3>
              <motion.button
                onClick={downloadContract}
                className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={20} />
                Download Contract
              </motion.button>
            </motion.div>

            {/* Navigation */}
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Explore More Apologies
              </h3>
              <motion.button
                onClick={() => setCurrentSection('ideas')}
                className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Apology Ideas 💡
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Cute Cat for Forgiveness */}
        <motion.section 
          className="mt-16 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-4xl mx-auto text-center"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Please forgive me? 🥺
          </h2>
          <motion.div
            className="mb-6 cursor-pointer select-none inline-block"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img 
              src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=400" 
              alt="Adorable cat with big eyes making direct eye contact for forgiveness"
              className="w-48 h-48 object-cover rounded-full shadow-lg mx-auto"
            />
          </motion.div>
          <p className="text-xl text-gray-600 mb-4">
            Even this cute cat thinks I should be forgiven! 
          </p>
          <p className="text-lg text-gray-500 italic">
            "Meow meow, forgive the silly monkey!" - Cat, probably
          </p>
        </motion.section>
      </div>
      
      {showBananaRain && <BananaRain />}
    </motion.div>
  );

  const ApologyIdeasSection = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.header 
          className="text-center mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Creative Apology Ideas 💡
          </h1>
          <motion.button
            onClick={() => setCurrentSection('main')}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            ← Back to Main Apology
          </motion.button>
        </motion.header>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <img 
              src="/attached_assets/generated_images/Cute_puppy_big_eyes_fc38512a.png" 
              alt="Adorable puppy with big eyes"
              className="w-64 h-64 mx-auto rounded-xl object-cover mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800">🐶 Puppy Apology Eyes</h3>
          </motion.div>
          
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <img 
              src="/attached_assets/generated_images/Cute_kitten_big_eyes_5202df7e.png" 
              alt="Adorable kitten with big eyes"
              className="w-64 h-64 mx-auto rounded-xl object-cover mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800">🐱 Kitten Forgive-Me Face</h3>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentSection === 'main' ? (
          <MainSection key="main" />
        ) : (
          <ApologyIdeasSection key="ideas" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;