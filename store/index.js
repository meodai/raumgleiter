import collect from 'collect.js';

export const state = () => ({
  projectMixer: null,
  isMuted: true,
  mainSectionsByLocale: null,
  asideSections: [
    {
      path: 'projects',
      title: 'projects',
    },
    {
      path: 'team',
      title: 'team',
    },
    {
      path: { name: 'slug', params: { slug: 'about' } },
      title: 'about',
    },
  ],
});

export const mutations = {
  setProjectMixer (state, projectMixer) {
    state.projectMixer = projectMixer;
  },
  setMainSections (state, sections) {
    state.mainSectionsByLocale = sections;
  },
  setMuteState (state, isMuted) {
    state.isMuted = isMuted;
  },
};

export const getters = {
  getMainSections (state) {
    return state.mainSectionsByLocale[state.i18n.locale] ? state.mainSectionsByLocale[state.i18n.locale].entries : [];
  },
};

export const actions = {
  async nuxtServerInit ({ commit }) {
    const sections = collect(await this.$craft('header'))
      .map((section) => {
        section.entries = collect(section.entries).map((entry) => {
          // Build i18n path object
          entry.path = entry.slug ? { name: 'slug', params: { slug: entry.slug } } : entry.path;
          return entry;
        }).all();
        return section;
      })
      .keyBy('locale')
      .all();
    commit('setMainSections', sections);
  },
};
