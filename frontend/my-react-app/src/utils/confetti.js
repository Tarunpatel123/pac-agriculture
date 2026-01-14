import confetti from 'canvas-confetti';
import Swal from 'sweetalert2';

export const showCelebration = (title, text) => {
  // 1. Fire Confetti
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    // Confetti from both sides
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);

  // 2. Show SweetAlert2 Popup with "Gift" animation style
  Swal.fire({
    title: title || 'Success!',
    text: text || 'Action completed successfully.',
    icon: 'success',
    iconHtml: '🎁', // Gift Icon
    showConfirmButton: true,
    confirmButtonText: 'Great! ✨',
    confirmButtonColor: '#16a34a',
    timer: 5000,
    timerProgressBar: true,
    showClass: {
      popup: 'animate__animated animate__zoomIn' // Zoom in like a gift opening
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    customClass: {
        popup: 'rounded-3xl border-4 border-green-500 shadow-2xl',
        title: 'text-2xl font-black text-green-800',
        htmlContainer: 'text-lg font-medium text-gray-600',
        confirmButton: 'px-8 py-3 rounded-xl font-bold text-lg hover:scale-105 transition-transform'
    },
    backdrop: `
      rgba(0,123,255,0.1)
      left top
      no-repeat
    `
  });
};
