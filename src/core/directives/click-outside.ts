import { Directive } from "vue";

const clickOutside: Directive = {
  beforeMount: (el, binding) => {
    el.callback = (event: Event) => {
      // here I check that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value();
      }
    };
    document.addEventListener("click", el.callback, true);
  },
  unmounted: el => {
    document.removeEventListener("click", el.callback, true);
  }
};

export default clickOutside;