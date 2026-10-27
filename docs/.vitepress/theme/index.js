import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import DomainOverview from './components/DomainOverview.vue'
import ThemePicker from './components/ThemePicker.vue'
import './themes.css'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-screen-content-after': () => h(ThemePicker, { screen: true })
    })
  },
  enhanceApp({ app }) {
    app.component('DomainOverview', DomainOverview)
  }
}
