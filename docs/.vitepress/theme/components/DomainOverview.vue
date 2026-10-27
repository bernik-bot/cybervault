<script setup>
import { computed } from "vue";
import { useRoute, withBase } from "vitepress";
import { data } from "../vault.data.js";
import { domains } from "./home/domains.js";

const route = useRoute();

// "/osint/" or "/resources/learning/", whatever base the site is served from
const folder = computed(() => {
  const path = route.path.replace(/(index)?(\.html)?$/, "");
  const base = withBase("/");
  return "/" + path.slice(base.length).replace(/\/?$/, "/");
});

const domain = computed(() => {
  const key = folder.value.split("/")[1];
  return folder.value === `/${key}/` ? domains.find((d) => d.key === key) : null;
});

// Direct children of this folder; a subfolder card sums the links of everything inside it
const children = computed(() => {
  const inside = data.entries.filter((e) => e.url.startsWith(folder.value) && e.url !== folder.value);
  const cards = new Map();
  for (const entry of inside) {
    const [first, ...rest] = entry.url.slice(folder.value.length).split("/");
    const url = rest.length ? `${folder.value}${first}/` : entry.url;
    const fallback = first.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
    const card = cards.get(url) ?? { url, title: fallback, links: 0, headings: [], pages: 0 };
    if (entry.url === url) Object.assign(card, { title: entry.title, headings: entry.headings });
    card.links += entry.links;
    card.pages += rest.length ? 1 : 0;
    cards.set(url, card);
  }
  return [...cards.values()].sort((a, b) => b.links - a.links);
});

const total = computed(() => data.entries.filter((e) => e.url.startsWith(folder.value)));
const totalLinks = computed(() => total.value.reduce((sum, e) => sum + e.links, 0));
</script>

<template>
  <div v-if="children.length" class="overview vp-raw">
    <p v-if="domain" class="lead">{{ domain.description }}</p>

    <p class="meta">
      <span>{{ totalLinks }} links</span>
      <span aria-hidden="true">·</span>
      <span>{{ total.length }} pages</span>
    </p>

    <div class="grid">
      <a v-for="card in children" :key="card.url" :href="withBase(card.url)" class="card">
        <span class="card-head">
          <span class="card-title">{{ card.title }}</span>
          <span class="card-arrow" aria-hidden="true">→</span>
        </span>
        <span v-if="card.headings.length" class="card-topics">
          {{ card.headings.slice(0, 4).join(" · ") }}
        </span>
        <span class="card-count">
          {{ card.links }} links<template v-if="card.pages"> · {{ card.pages }} pages</template>
        </span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.overview {
  margin: 24px 0 8px;
}

.lead {
  margin: 0;
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.meta {
  display: flex;
  gap: 8px;
  margin: 12px 0 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.overview .card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s, background-color 0.2s;
}

.overview .card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 55%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-brand-1) 6%, var(--vp-c-bg-soft));
  transform: translateY(-2px);
}

.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-arrow {
  color: var(--vp-c-brand-1);
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.2s;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: none;
}

.card-topics {
  flex: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.card-count {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  color: var(--vp-c-brand-1);
}
</style>
