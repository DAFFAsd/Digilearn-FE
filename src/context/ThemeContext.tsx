import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Initialize with system preference to avoid flash
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      console.log('Initial theme from localStorage:', savedTheme);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
      
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      console.log('System theme:', systemTheme);
      return systemTheme;
    }
    return 'light';
  });
  const [mounted, setMounted] = useState(false);

  // Initialize theme after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  // Update theme colors and DOM
  useEffect(() => {
    if (!mounted) return;

    console.log('Theme effect triggered with theme:', theme);

    const lightThemeColor = '#f8fafc';
    const darkThemeColor = '#121212';
    const themeColor = theme === 'dark' ? darkThemeColor : lightThemeColor;
    
    // Update localStorage
    localStorage.setItem('theme', theme);

    // Update document class for Tailwind
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Update color-scheme CSS property
    root.style.colorScheme = theme;

    // Simple and reliable meta tag update for mobile browsers
    const updateMetaThemeColor = () => {
      // Remove existing theme-color meta tags
      const existingMetas = document.querySelectorAll('meta[name="theme-color"]');
      existingMetas.forEach(meta => meta.remove());

      // Add new theme-color meta tag
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = themeColor;
      document.head.appendChild(meta);

      // Update Apple mobile web app status bar style
      let appleMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (!appleMeta) {
        appleMeta = document.createElement('meta');
        appleMeta.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
        document.head.appendChild(appleMeta);
      }
      appleMeta.setAttribute('content', theme === 'dark' ? 'black-translucent' : 'default');

      // Update Microsoft Edge/IE mobile theme
      let msMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');
      if (!msMeta) {
        msMeta = document.createElement('meta');
        msMeta.setAttribute('name', 'msapplication-navbutton-color');
        document.head.appendChild(msMeta);
      }
      msMeta.setAttribute('content', themeColor);

      console.log(`Theme updated to ${theme}, color: ${themeColor}`);
    };

    // Update immediately and once more after a short delay
    updateMetaThemeColor();
    setTimeout(updateMetaThemeColor, 50);

    // Add event listeners to re-apply theme on certain events that might reset it
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setTimeout(updateMetaThemeColor, 100);
      }
    };

    const handleFocus = () => {
      setTimeout(updateMetaThemeColor, 50);
    };

    const handlePageShow = () => {
      setTimeout(updateMetaThemeColor, 50);
    };

    const handleTouchStart = () => {
      // Some mobile browsers reset theme on touch, so reapply
      setTimeout(updateMetaThemeColor, 10);
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('touchstart', handleTouchStart);
    };

  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    console.log('setTheme called with:', newTheme, 'current theme:', theme);
    console.trace('setTheme call stack'); // This will show us where setTheme is being called from
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    console.log('toggleTheme called, switching from', theme, 'to', newTheme);
    setTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme: () => {}, setTheme: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme };
