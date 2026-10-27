<script setup>
import { data } from "../../vault.data.js";
import { domains } from "./domains.js";
import DomainCard from "./DomainCard.vue";
</script>

<template>
  <section id="domains" class="domains">
    <header class="domains-head">
      <p class="kicker">// browse by domain</p>
      <h2>Seven disciplines, one vault</h2>
    </header>

    <div class="grid">
      <DomainCard
        v-for="domain in domains"
        :key="domain.key"
        :domain="domain"
        :stats="data.sections[domain.key]"
      />
    </div>
  </section>
</template>

<style scoped>
.domains {
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px 24px 96px;
}

.domains-head {
  margin-bottom: 32px;
}

.kicker {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  color: var(--vp-c-brand-1);
}

.domains-head h2 {
  margin: 8px 0 0;
  padding: 0;
  border: none;
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .domains {
    padding: 16px 16px 64px;
  }

  .grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
