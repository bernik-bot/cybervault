import { onMounted, ref } from "vue";

export const STORAGE_KEY = "cv-theme";

// Swatches are [background, brand, accent] in dark mode, for the picker preview
export const themes = [
  { id: "vault", label: "Vault", swatches: ["#0e1016", "#818cf8", "#38bdf8"] },
  { id: "nord", label: "Nord", swatches: ["#2e3440", "#88c0d0", "#bf616a"] },
  { id: "dracula", label: "Dracula", swatches: ["#282a36", "#bd93f9", "#ff79c6"] },
  { id: "catppuccin", label: "Catppuccin", swatches: ["#1e1e2e", "#cba6f7", "#f38ba8"] },
  { id: "gruvbox", label: "Gruvbox", swatches: ["#282828", "#fabd2f", "#fb4934"] },
  { id: "terminal", label: "Terminal", swatches: ["#050a06", "#3ef07c", "#1c4426"] },
];

// Runs inline in <head> before first paint so a saved theme never flashes the default one
export const restoreScript = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t&&t!=="vault")document.documentElement.dataset.theme=t}catch(e){}`;

const current = ref("vault");

export function useColorTheme() {
  onMounted(() => {
    current.value = document.documentElement.dataset.theme || "vault";
  });

  function setTheme(id) {
    current.value = id;
    const root = document.documentElement;
    if (id === "vault") delete root.dataset.theme;
    else root.dataset.theme = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  }

  return { current, setTheme };
}
