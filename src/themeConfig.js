const themes = {
  violet_evergarden: {
    name: "violet_evergarden",
    background_image:
      "https://images3.alphacoders.com/905/thumb-1920-905838.jpg",
    audio_tracks: [
      "https://res.cloudinary.com/darylb/video/upload/v1737473003/memory_lane/Freaky_Friday_-_Take_Me_Away_k2mtam.mp3",
      "https://res.cloudinary.com/darylb/video/upload/v1737473001/memory_lane/Muse_-_Supermassive_Black_Hole_Official_Music_Video_ui5lko.mp3",
    ],
  },
  hello_kitty: {
    name: "hello_kitty",
    background_image:
      "https://imgs.search.brave.com/Il1TcxBIFOQqrHIHZdCKUy7nRUP34YRqwAqOMcXbwoQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzb2suY29t/L2ltYWdlcy9oaWdo/L2hlbGxvLWtpdHR5/LWFuZC1yaHl0aG0t/aGVsbG8ta2l0dHkt/ZGVza3RvcC1lZDFu/YzF4dTl5NHB3bjlq/LmpwZw",
    audio_tracks: [],
  },
};

export const getTheme = (themeName) =>
  themes[themeName] || themes.violet_evergarden;

export default themes;
