<script setup>
import { themes, useColorTheme } from "../themes.js";

defineProps({
  screen: { type: Boolean, default: false },
});

const { current, setTheme } = useColorTheme();
</script>

<template>
  <div class="theme-picker" :class="{ screen }">
    <p class="label">Color theme</p>
    <div class="options" role="radiogroup" aria-label="Color theme">
      <button
        v-for="theme in themes"
        :key="theme.id"
        type="button"
        role="radio"
        class="option"
        :class="{ active: current === theme.id }"
        :aria-checked="current === theme.id"
        @click="setTheme(theme.id)"
      >
        <span class="swatch" :style="{ background: theme.swatches[0] }" aria-hidden="true">
          <span :style="{ background: theme.swatches[1] }" />
          <span :style="{ background: theme.swatches[2] }" />
        </span>
        <span class="name">{{ theme.label }}</span>
        <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.label {
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.options {
  display: grid;
  gap: 2px;
}

.option {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  text-align: left;
  color: var(--vp-c-text-2);
  transition: background-color 0.2s, color 0.2s;
}

.option:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.option.active {
  color: var(--vp-c-brand-1);
}

.swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 30px;
  height: 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  flex-shrink: 0;
}

.swatch span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.name {
  flex: 1;
}

.check {
  width: 14px;
  height: 14px;
  opacity: 0;
}

.option.active .check {
  opacity: 1;
}

.screen {
  margin-top: 24px;
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.screen .label {
  padding: 0;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.screen .options {
  grid-template-columns: repeat(2, 1fr);
}

.screen .option {
  padding: 8px;
}
</style>
