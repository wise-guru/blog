import { useEffect } from "react";

const DarkModeToggle = (props) => {
  const { isDarkMode, setIsDarkMode } = props;

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains("dark-mode"));
  }, [setIsDarkMode]);

  const toggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
    window.localStorage.setItem("prefersDarkMode", String(!isDarkMode));
  };

  return (
    <div className="dark-mode-toggle">
      <input
        type="checkbox"
        checked={isDarkMode}
        onChange={toggle}
        id="toggle"
      />
      <label htmlFor="toggle"></label>
    </div>
  );
};

export default DarkModeToggle;
