<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { data } from "../../vault.data.js";
import { domains } from "./domains.js";

const queries = ["shodan", "offensive security", "opsec", "osint", "google dorks", "learning"];
const query = ref(queries[0]);
const isMac = ref(false);

const stats = computed(() => [
  { value: data.links, label: "curated links" },
  { value: data.pages, label: "pages" },
  { value: domains.length, label: "domains" },
]);
const shown = ref(stats.value.map((s) => s.value));

let timer;
let frame;

function countUp() {
  let start;
  const step = (now) => {
    start ??= now;
    const t = Math.min((now - start) / 1200, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    shown.value = stats.value.map((s) => Math.round(s.value * ease));
    if (t < 1) frame = requestAnimationFrame(step);
  };
  frame = requestAnimationFrame(step);
}

function openSearch() {
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true }));
}

onMounted(() => {
  isMac.value = /Mac|iPhone|iPad/.test(navigator.platform);
  let i = 0;
  timer = setInterval(() => {
    i = (i + 1) % queries.length;
    query.value = queries[i];
  }, 2600);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) countUp();
});

onBeforeUnmount(() => {
  clearInterval(timer);
  cancelAnimationFrame(frame);
});
</script>

<template>
  <section class="hero">
    <div class="hero-grid" aria-hidden="true" />
    <div class="hero-glow" aria-hidden="true" />

    <div class="hero-inner">
      <p class="eyebrow">
        <span class="pulse" aria-hidden="true" />
        Open infosec knowledge base
      </p>

      <h1 class="title">Cyber<span class="title-accent">Vault</span></h1>

      <p class="tagline">
        A curated index of tools, cheatsheets and references for offensive security, OSINT,
        OPSEC and beyond, sorted by discipline.
      </p>

      <button type="button" class="prompt" @click="openSearch">
        <span class="prompt-sign" aria-hidden="true">&gt;</span>
        <span class="prompt-text">
          search
          <Transition name="swap" mode="out-in">
            <span :key="query" class="prompt-query">{{ query }}</span>
          </Transition>
          <span class="caret" aria-hidden="true" />
        </span>
        <span class="prompt-keys" aria-hidden="true">
          <kbd>{{ isMac ? "⌘" : "Ctrl" }}</kbd><kbd>K</kbd>
        </span>
      </button>

      <dl class="stats">
        <div v-for="(stat, i) in stats" :key="stat.label" class="stat">
          <dt>{{ stat.label }}</dt>
          <dd>{{ shown[i] }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  margin-top: calc(-1 * var(--vp-nav-height));
  padding: calc(96px + var(--vp-nav-height)) 24px 72px;
  text-align: center;
  isolation: isolate;
}

.hero-grid {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image:
    linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 100%);
  opacity: 0.6;
}

.hero-glow {
  position: absolute;
  top: -180px;
  left: 50%;
  z-index: -1;
  width: 720px;
  height: 420px;
  transform: translateX(-50%);
  background: radial-gradient(
    closest-side,
    color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent),
    color-mix(in srgb, var(--cv-blue) 12%, transparent),
    transparent
  );
  filter: blur(40px);
}

.hero-inner {
  max-width: 760px;
  margin: 0 auto;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 6px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--cv-green);
  box-shadow: 0 0 0 0 color-mix(in srgb, var(--cv-green) 60%, transparent);
  animation: pulse 2.4s infinite;
}

@keyframes pulse {
  70% { box-shadow: 0 0 0 8px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}

.title {
  margin: 28px 0 0;
  font-size: clamp(48px, 9vw, 88px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--vp-c-text-1);
}

.title-accent {
  background: linear-gradient(
    120deg,
    var(--vp-c-brand-1) 10%,
    var(--cv-blue) 60%,
    var(--cv-teal) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.tagline {
  max-width: 560px;
  margin: 24px auto 0;
  font-size: 18px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.prompt {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 520px;
  margin: 40px auto 0;
  padding: 14px 16px 14px 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  font-family: var(--vp-font-family-mono);
  font-size: 15px;
  text-align: left;
  color: var(--vp-c-text-2);
  cursor: text;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.prompt:hover,
.prompt:focus-visible {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 4px var(--vp-c-brand-soft);
  outline: none;
}

.prompt-sign {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.prompt-text {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
}

.prompt-query {
  display: inline-block;
  color: var(--vp-c-text-1);
}

.caret {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--vp-c-brand-1);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.prompt-keys {
  display: flex;
  gap: 4px;
}

.prompt-keys kbd {
  padding: 2px 7px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-family: inherit;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin: 48px 0 0;
}

.stat {
  display: flex;
  flex-direction: column-reverse;
}

.stat dd {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
}

.stat dt {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .hero {
    padding: calc(48px + var(--vp-nav-height)) 16px 48px;
  }

  .prompt-keys {
    display: none;
  }

  .stats {
    gap: 28px;
  }

  .stat dd {
    font-size: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse,
  .caret {
    animation: none;
  }
}
</style>
