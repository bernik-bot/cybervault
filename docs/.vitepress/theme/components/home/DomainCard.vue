<script setup>
import { computed } from "vue";
import { withBase } from "vitepress";

const props = defineProps({
  domain: { type: Object, required: true },
  stats: { type: Object, default: () => ({ links: 0, pages: [] }) },
});

const shortcuts = computed(() => props.stats.pages.slice(0, props.domain.span > 1 ? 5 : 3));

function track(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
}
</script>

<template>
  <article
    class="card"
    :class="{ wide: domain.span > 1 }"
    @pointermove="track"
  >
    <div class="card-head">
      <span class="card-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          v-html="domain.icon"
        />
      </span>
      <span class="card-count">{{ stats.links }} links</span>
    </div>

    <h3 class="card-title">
      <a :href="withBase(`/${domain.key}/`)" class="card-link">{{ domain.title }}</a>
      <span class="card-arrow" aria-hidden="true">→</span>
    </h3>
    <p class="card-desc">{{ domain.description }}</p>

    <ul v-if="shortcuts.length" class="card-pages">
      <li v-for="page in shortcuts" :key="page.url">
        <a :href="withBase(page.url)">{{ page.title }}</a>
      </li>
    </ul>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: border-color 0.25s, transform 0.25s;
}

.card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    360px circle at var(--x, 50%) var(--y, 0%),
    color-mix(in srgb, var(--vp-c-brand-1) 16%, transparent),
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 55%, var(--vp-c-divider));
  transform: translateY(-3px);
}

.card:hover::before {
  opacity: 1;
}

.card.wide {
  grid-column: span 2;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 14%, transparent);
  color: var(--vp-c-brand-1);
}

.card-icon svg {
  width: 22px;
  height: 22px;
}

.card-count {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.card-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.card-link::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
}

.card-link:focus-visible {
  outline: none;
}

.card:has(.card-link:focus-visible) {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.card-arrow {
  color: var(--vp-c-brand-1);
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s, transform 0.25s;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: none;
}

.card-desc {
  flex: 1;
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.card-pages {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.card-pages a {
  display: block;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg);
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s, border-color 0.2s;
}

.card-pages a:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

@media (max-width: 960px) {
  .card.wide {
    grid-column: auto;
  }
}
</style>
