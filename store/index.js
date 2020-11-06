import collect from 'collect.js';

export const state = () => ({
  projectMixer: null,
  isMuted: true,
  sectionsByLocale: null,
  seoData: {},
  footerByLocale: [],
});

export const mutations = {
  setProjectMixer (state, projectMixer) {
    state.projectMixer = projectMixer;
  },
  setSections (state, sections) {
    state.sectionsByLocale = sections;
  },
  setFooterData (state, footerByLocale) {
    state.footerByLocale = footerByLocale;
  },
  setSeoData (state, seoData) {
    state.seoData = seoData;
  },
  setMuteState (state, isMuted) {
    state.isMuted = isMuted;
  },
};

export const getters = {
  getMainSections (state) {
    return state.sectionsByLocale && state.sectionsByLocale[state.i18n.locale]
      ? state.sectionsByLocale[state.i18n.locale].entries
      : [];
  },
  getAsideSections (state) {
    return state.sectionsByLocale && state.sectionsByLocale[state.i18n.locale]
      ? state.sectionsByLocale[state.i18n.locale].asideEntries
      : [];
  },
};

export const actions = {
  async nuxtServerInit ({ commit }) {
    const sections = collect(await this.$craft('header'))
      .map((section) => {
        section.entries = collect(section.entries).map((entry) => {
          entry.path = entry.slug ? { name: 'slug', params: { slug: entry.slug } } : entry.path;
          return entry;
        }).all();
        section.asideEntries = collect(section.asideEntries).map((entry) => {
          entry.path = entry.slug ? { name: 'slug', params: { slug: entry.slug } } : entry.path;
          return entry;
        }).all();
        return section;
      })
      .keyBy('locale')
      .all();
    commit('setSections', sections);

    const footerByLocale = collect(await this.$craft('footer')).keyBy('locale').all();
    commit('setFooterData', footerByLocale);

    const seoData = collect(await this.$craft('seo'))
      .groupBy('locale')
      .map(page => page.first())
      .all();
    commit('setSeoData', seoData);
  },
};
