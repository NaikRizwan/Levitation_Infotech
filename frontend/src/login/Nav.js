const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateColoredLetters = () => {
  const text = "Levitation Infotech!";
  const coloredLetters = text.split("").map((letter, index) => {
    const color = generateRandomColor();
    return (
      <span key={index} style={{ color }}>
        {letter}
      </span>
    );
  });
  return coloredLetters;
};
