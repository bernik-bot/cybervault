<template>
  <div class="cv-grid">
    <SectionCard
      icon="👾"
      title="Offensive Security"
      description="Exploitation, post-exploitation, social engineering and pentesting."
      href="/offensive-security/"
    />

    <SectionCard
      icon="🛡️"
      title="OPSEC"
      description="Operational security principles and privacy practices."
      href="/opsec/"
    />

    <SectionCard
      icon="🔎"
      title="OSINT"
      description="Open-source intelligence frameworks and investigations."
      href="/osint/"
    />

    <SectionCard
      icon="🧠"
      title="Threat Intelligence"
      description="Threat actors, TTPs, and intelligence resources."
      href="/threat-intelligence/"
    />

    <SectionCard
      icon="🕵️"
      title="Digital Forensics"
      description="Forensic tools, binary analysis and steganography."
      href="/digital-forensics/"
    />

    <SectionCard
      icon="🔧"
      title="Hardware & Embedded"
      description="Firmware dumping, reverse engineering and IoT security."
      href="/hardware-and-embedded/"
    />

    <SectionCard
      icon="📚"
      title="Resources"
      description="Learning, community, knowledge base and digital library."
      href="/resources/"
    />
  </div>
</template>

<script setup>
import SectionCard from "./SectionCard.vue";
</script>

<style scoped>
.cv-grid {
  display: grid;
  gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  margin-top: 50px;
}
</style>
