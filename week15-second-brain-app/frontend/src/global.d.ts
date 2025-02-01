declare global {
  interface Window {
    twttr: {
      widgets: {
        load: () => void;
      };
    };
  }
}