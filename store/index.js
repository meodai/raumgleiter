import collect from 'collect.js';

export const state = () => ({
  projectMixer: null,
  mainSectionsByLocale: null,
  asideSections: [
    {
      path: 'projects',
      title: 'projects',
    }, {
      path: 'team',
      title: 'team',
    }, {
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
};

export const actions = {
  async nuxtServerInit ({ commit }) {
    commit('setMainSections', collect(await this.$craft('header')).keyBy('locale').all());
  },
};
