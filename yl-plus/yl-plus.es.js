import { defineComponent as o, ref as t, openBlock as c, createElementBlock as s, toDisplayString as a } from "vue";
const l = /* @__PURE__ */ o({
  name: "cusTable",
  __name: "index",
  setup(n) {
    const e = t("hello vue3 component 3");
    return (p, i) => (c(), s("div", null, a(e.value), 1));
  }
}), r = [l], m = (n) => {
  r.forEach((e) => {
    n.component(e.name, e);
  });
}, _ = { install: m };
export {
  _ as default
};
