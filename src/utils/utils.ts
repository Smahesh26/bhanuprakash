export const animationCreate = async () => {
  if (typeof window !== 'undefined') {
    try {
      const WOW = (await import('wowjs')).default;
      new WOW().init();
    } catch (error) {
      console.error('Error loading WOW.js:', error);
    }
  }
};
