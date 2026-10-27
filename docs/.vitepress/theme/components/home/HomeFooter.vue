<template>
  <footer class="footer">
    <p>
      <span class="brand">CyberVault</span>
      <span class="sep" aria-hidden="true">/</span>
      For educational and authorized security work only.
    </p>
    <a href="https://github.com/n3pt0x/cybervault" target="_blank" rel="noopener">GitHub ↗</a>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 1152px;
  margin: 0 auto;
  padding: 24px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.footer p {
  margin: 0;
}

.brand {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.sep {
  margin: 0 8px;
}

.footer a {
  font-weight: 500;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.footer a:hover {
  color: var(--vp-c-brand-1);
}
</style>
