// mouse.js
import { reactive, toRefs } from "vue";
const state = reactive({ showModal: false });

export function useModal() {

  const change = () => {
    state.showModal = !state.showModal;
  };

  return { ...toRefs(state), change };
}
