import { useTheme } from "../ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="mb-4 px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition"
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
