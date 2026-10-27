<script setup>
// Replaces VitePress's VPNavBarExtra (aliased in config.mts): shown at every desktop
// width, holding the appearance switch and the color theme picker.
import { useData } from "vitepress";
import VPFlyout from "vitepress/dist/client/theme-default/components/VPFlyout.vue";
import VPSwitchAppearance from "vitepress/dist/client/theme-default/components/VPSwitchAppearance.vue";
import ThemePicker from "./ThemePicker.vue";

const { site, theme } = useData();
</script>

<template>
  <VPFlyout class="VPNavBarExtra" label="extra navigation">
    <div v-if="site.appearance && site.appearance !== 'force-dark' && site.appearance !== 'force-auto'" class="group">
      <div class="item appearance">
        <p class="label">{{ theme.darkModeSwitchLabel || "Appearance" }}</p>
        <VPSwitchAppearance />
      </div>
    </div>

    <div class="group">
      <ThemePicker variant="circles" />
    </div>
  </VPFlyout>
</template>

<style scoped>
.VPNavBarExtra {
  display: none;
  margin-right: -12px;
}

@media (min-width: 768px) {
  .VPNavBarExtra {
    display: block;
  }
}

.item.appearance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  padding: 0 12px;
}

.label {
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}
</style>
