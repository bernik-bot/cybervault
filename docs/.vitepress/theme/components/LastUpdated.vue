<script setup>
// Replaces VitePress's VPDocFooterLastUpdated (aliased in config.mts): shows the page's
// last git commit date as dd/mm/yy, whatever the visitor's locale.
import { useData } from "vitepress";
import { computed, onMounted, shallowRef } from "vue";

const { theme, page } = useData();

const date = computed(() => new Date(page.value.lastUpdated));
const formatted = shallowRef("");

const pad = (n) => String(n).padStart(2, "0");

// Formatted on mount, in the visitor's timezone, to avoid a hydration mismatch with the build
onMounted(() => {
  const d = date.value;
  formatted.value = `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${pad(d.getFullYear() % 100)}`;
});
</script>

<template>
  <p class="VPLastUpdated">
    {{ theme.lastUpdated?.text || "Last updated" }}:
    <time :datetime="date.toISOString()">{{ formatted }}</time>
  </p>
</template>

<style scoped>
.VPLastUpdated {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

@media (min-width: 640px) {
  .VPLastUpdated {
    line-height: 32px;
  }
}
</style>
