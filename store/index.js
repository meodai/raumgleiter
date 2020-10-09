export const state = () => ({
  projectMixer: null,
});

export const mutations = {
  setProjectMixer (state, projectMixer) {
    state.projectMixer = projectMixer;
  },
};
