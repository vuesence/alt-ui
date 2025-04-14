import { defineComponent as _, createElementBlock as M, openBlock as v, normalizeStyle as En, createElementVNode as H, renderSlot as E, createBlock as T, createCommentVNode as Z, computed as L, unref as u, ref as J, toValue as ce, onMounted as us, onBeforeUnmount as il, nextTick as vo, shallowRef as er, watch as ct, onUnmounted as al, cloneVNode as ll, Fragment as re, h as tr, provide as cl, inject as ul, getCurrentInstance as pi, mergeProps as V, withCtx as C, normalizeProps as pe, guardReactiveProps as ge, useId as Ce, mergeDefaults as ve, createVNode as F, Teleport as gi, watchEffect as dl, createTextVNode as ee, renderList as xe, toDisplayString as W, normalizeClass as ie, mergeModels as ut, useModel as Qe, withDirectives as Ft, vModelDynamic as pl, vModelSelect as gl, toRefs as fl, Transition as hl, vShow as ml, vModelText as Ko, resolveDynamicComponent as vl, isVNode as yl, reactive as bl, withKeys as Cl } from "vue";
import { useRouter as _l } from "vue-router";
const El = /* @__PURE__ */ _({
  __name: "BaseSpinner",
  props: {
    size: {}
  },
  setup(e) {
    return (t, n) => (v(), M("div", {
      class: "spinner",
      style: En({ width: t.size, height: t.size })
    }, n[0] || (n[0] = [
      H("svg", { viewBox: "0 0 50 50" }, [
        H("circle", {
          class: "path",
          cx: "25",
          cy: "25",
          r: "20",
          fill: "none",
          "stroke-width": "5"
        })
      ], -1)
    ]), 4));
  }
}), Q = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, Tl = /* @__PURE__ */ Q(El, [["__scopeId", "data-v-5120d0b1"]]), Il = ["disabled"], kl = /* @__PURE__ */ _({
  __name: "BaseButton",
  props: {
    to: {
      type: [String, Object],
      default: ""
    },
    loading: {
      type: Boolean,
      default: !1
    },
    disabled: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = _l(), o = e, s = t;
    function r(i) {
      if (o.to) {
        const a = typeof o.to == "object" ? o.to : { name: o.to };
        n.push(a);
      } else
        s("click", i);
    }
    return (i, a) => (v(), M("button", {
      class: "base-button",
      disabled: e.disabled,
      onClick: r
    }, [
      E(i.$slots, "default", {}, void 0, !0),
      e.loading ? (v(), T(Tl, {
        key: 0,
        class: "spinner"
      })) : Z("", !0)
    ], 8, Il));
  }
}), Ol = /* @__PURE__ */ Q(kl, [["__scopeId", "data-v-e1b7bb24"]]), fi = /* @__PURE__ */ new Map(), hi = /* @__PURE__ */ new Map();
function Vy() {
  let e = /* @__PURE__ */ Object.assign({});
  for (const [t, n] of Object.entries(e)) {
    const o = t.slice(t.lastIndexOf("/") + 1, -4);
    fi.set(o, n);
  }
  e = /* @__PURE__ */ Object.assign({});
  for (const [t, n] of Object.entries(e)) {
    const o = t.slice(t.lastIndexOf("/") + 1, -4);
    hi.set(o, n);
  }
}
function nr(e) {
  return fi.get(e);
}
function xl(e) {
  return e.startsWith("http") ? e : hi.get(e);
}
function Dn(e) {
  return e === void 0 ? !1 : typeof e == "number" ? !0 : !Number.isNaN(Number.parseFloat(String(e))) && Number.isFinite(Number(e));
}
const Pl = ["data-name", "innerHTML"], wl = ["src", "alt", "data-name"], Sl = /* @__PURE__ */ _({
  __name: "BaseIcon",
  props: {
    name: { default: "" },
    size: { default: 24 },
    color: { default: "default" },
    width: { default: 24 },
    height: { default: "auto" },
    fill: {},
    type: { default: "svg" }
  },
  setup(e) {
    const t = e, n = L(() => t.size ? Dn(t.size) ? `${Number(t.size)}px` : t.size : Dn(t.width) ? `${Number(t.width)}px` : t.width), o = L(() => t.size ? Dn(t.size) ? `${Number(t.size)}px` : t.size : t.height === "auto" ? t.height : Dn(t.height) ? `${Number(t.height)}px` : t.height), s = L(() => t.color !== "default" ? t.color : "var(--lh-c-brand-1)"), r = L(() => nr(t.name)), i = L(() => t.fill && t.fill !== "currentColor" ? { fill: t.fill } : {});
    return (a, l) => r.value ? (v(), M("div", {
      key: 0,
      class: "base-icon base-icon--svg",
      "data-name": t.name,
      style: En({
        width: n.value,
        height: o.value,
        color: s.value,
        ...i.value
      }),
      innerHTML: u(nr)(t.name)
    }, null, 12, Pl)) : (v(), M("img", {
      key: 1,
      class: "base-icon base-icon--image",
      src: u(xl)(t.name),
      alt: t.name,
      "data-name": t.name,
      style: En({
        width: n.value,
        height: o.value,
        color: s.value
      })
    }, null, 12, wl));
  }
}), Gt = /* @__PURE__ */ Q(Sl, [["__scopeId", "data-v-b0a39f32"]]), Rl = /* @__PURE__ */ _({
  __name: "BaseDialog",
  setup(e, { expose: t }) {
    const n = J(null);
    function o() {
      n.value && n.value.showModal();
    }
    function s() {
      n.value && n.value.close();
    }
    function r(i) {
      if (i.target === n.value && n.value) {
        const a = n.value.getBoundingClientRect(), l = n.value.offsetWidth - n.value.clientWidth;
        if (i.x < a.right && i.x > a.right - l)
          return;
        n.value.close();
      }
    }
    return t({ show: o, close: s }), (i, a) => (v(), M("dialog", {
      ref_key: "dialog",
      ref: n,
      role: "textbox",
      tabindex: "0",
      onMousedown: r,
      onKeydown1: () => {
      }
    }, [
      E(i.$slots, "default", { onClose: s }, void 0, !0)
    ], 544));
  }
}), ds = /* @__PURE__ */ Q(Rl, [["__scopeId", "data-v-87e133bb"]]);
function $l(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
var ps = (e) => e[0], gs = (e) => e[e.length - 1], Vl = (e, t) => e.indexOf(t) !== -1, mi = (e, ...t) => e.concat(t), fs = (e, ...t) => e.filter((n) => !t.includes(n)), Al = (e) => Array.from(new Set(e)), jo = (e, t) => Vl(e, t) ? fs(e, t) : mi(e, t);
function hs(e, t, n = {}) {
  const { step: o = 1, loop: s = !0 } = n, r = t + o, i = e.length, a = i - 1;
  return t === -1 ? o > 0 ? 0 : a : r < 0 ? s ? a : 0 : r >= i ? s ? 0 : t > i ? i : t : r;
}
function Ll(e, t, n = {}) {
  return e[hs(e, t, n)];
}
function vi(e, t, n = {}) {
  const { step: o = 1, loop: s = !0 } = n;
  return hs(e, t, { step: -o, loop: s });
}
function Nl(e, t, n = {}) {
  return e[vi(e, t, n)];
}
var or = (e) => e?.constructor.name === "Array", Dl = (e, t) => {
  if (e.length !== t.length) return !1;
  for (let n = 0; n < e.length; n++)
    if (!Wt(e[n], t[n])) return !1;
  return !0;
}, Wt = (e, t) => {
  if (Object.is(e, t)) return !0;
  if (e == null && t != null || e != null && t == null) return !1;
  if (typeof e?.isEqual == "function" && typeof t?.isEqual == "function")
    return e.isEqual(t);
  if (typeof e == "function" && typeof t == "function")
    return e.toString() === t.toString();
  if (or(e) && or(t))
    return Dl(Array.from(e), Array.from(t));
  if (typeof e != "object" || typeof t != "object") return !1;
  const n = Object.keys(t ?? /* @__PURE__ */ Object.create(null)), o = n.length;
  for (let s = 0; s < o; s++)
    if (!Reflect.has(e, n[s])) return !1;
  for (let s = 0; s < o; s++) {
    const r = n[s];
    if (!Wt(e[r], t[r])) return !1;
  }
  return !0;
}, yi = (e) => Array.isArray(e), Bl = (e) => e === !0 || e === !1, Ml = (e) => e != null && typeof e == "object", qn = (e) => Ml(e) && !yi(e), fn = (e) => typeof e == "string", lt = (e) => typeof e == "function", Fl = (e) => e == null, Lo = (e, t) => Object.prototype.hasOwnProperty.call(e, t), Gl = Function.prototype.toString;
Gl.call(Object);
var un = (e, ...t) => (typeof e == "function" ? e(...t) : e) ?? void 0, Hl = () => {
}, qo = (...e) => (...t) => {
  e.forEach(function(n) {
    n?.(...t);
  });
}, bi = /* @__PURE__ */ (() => {
  let e = 0;
  return () => (e++, e.toString(36));
})();
function hn(e, t, ...n) {
  if (e in t) {
    const s = t[e];
    return lt(s) ? s(...n) : s;
  }
  const o = new Error(`No matching key: ${JSON.stringify(e)} in ${JSON.stringify(Object.keys(t))}`);
  throw Error.captureStackTrace?.(o, hn), o;
}
function Ul(e, t = 0) {
  let n = 0, o = null;
  return (...s) => {
    const r = Date.now(), i = r - n;
    i >= t ? (o && (clearTimeout(o), o = null), e(...s), n = r) : o || (o = setTimeout(() => {
      e(...s), n = Date.now(), o = null;
    }, t - i));
  };
}
var { min: zl, max: Wl } = Math, Kl = (e) => Number.isNaN(e), jl = (e) => Kl(e) ? 0 : e, sr = (e, t, n) => zl(Wl(jl(e), t), n);
function yo(e) {
  if (!ql(e) || e === void 0) return e;
  const t = Reflect.ownKeys(e).filter((o) => typeof o == "string"), n = {};
  for (const o of t) {
    const s = e[o];
    s !== void 0 && (n[o] = yo(s));
  }
  return n;
}
var ql = (e) => e && typeof e == "object" && e.constructor === Object;
function No(e, t) {
  const n = performance.now();
  let o;
  function s(r) {
    o = requestAnimationFrame(s), r - n >= t && e();
  }
  return o = requestAnimationFrame(s), () => cancelAnimationFrame(o);
}
function oo(...e) {
  const t = e.length === 1 ? e[0] : e[1];
  (e.length === 2 ? e[0] : !0) && process.env.NODE_ENV !== "production" && console.warn(t);
}
function Ci(e, t) {
  if (e == null) throw new Error(t());
}
function ms(e, t, n) {
  let o = [];
  for (const s of t)
    e[s] == null && o.push(s);
  if (o.length > 0)
    throw new Error(`[zag-js${n ? ` > ${n}` : ""}] missing required props: ${o.join(", ")}`);
}
function Xl(e) {
  if (!e) return;
  const t = e.selectionStart ?? 0, n = e.selectionEnd ?? 0;
  Math.abs(n - t) === 0 && t === 0 && e.setSelectionRange(e.value.length, e.value.length);
}
var Yl = (e, t) => e.map((n, o) => e[(Math.max(t, 0) + o) % e.length]), Do = (...e) => (t) => e.reduce((n, o) => o(n), t), dn = () => {
}, bo = (e) => typeof e == "object" && e !== null, Zl = 2147483647, B = (e) => e ? "" : void 0, mn = (e) => e ? "true" : void 0, Ql = 1, Jl = 9, ec = 11, ue = (e) => bo(e) && e.nodeType === Ql && typeof e.nodeName == "string", _i = (e) => bo(e) && e.nodeType === Jl, tc = (e) => bo(e) && e === e.window, Ei = (e) => ue(e) ? e.localName || "" : "#document";
function nc(e) {
  return ["html", "body", "#document"].includes(Ei(e));
}
var oc = (e) => bo(e) && e.nodeType !== void 0, Tn = (e) => oc(e) && e.nodeType === ec && "host" in e, sc = (e) => ue(e) && e.localName === "input", vs = (e) => !!e?.matches("a[href]"), rc = (e) => ue(e) ? e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0 : !1, ic = /(textarea|select)/;
function Ti(e) {
  if (e == null || !ue(e)) return !1;
  try {
    return sc(e) && e.selectionStart != null || ic.test(e.localName) || e.isContentEditable || e.getAttribute("contenteditable") === "true" || e.getAttribute("contenteditable") === "";
  } catch {
    return !1;
  }
}
function Je(e, t) {
  if (!e || !t || !ue(e) || !ue(t)) return !1;
  const n = t.getRootNode?.();
  if (e === t || e.contains(t)) return !0;
  if (n && Tn(n)) {
    let o = t;
    for (; o; ) {
      if (e === o) return !0;
      o = o.parentNode || o.host;
    }
  }
  return !1;
}
function Ke(e) {
  return _i(e) ? e : tc(e) ? e.document : e?.ownerDocument ?? document;
}
function ac(e) {
  return Ke(e).documentElement;
}
function fe(e) {
  return Tn(e) ? fe(e.host) : _i(e) ? e.defaultView ?? window : ue(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function lc(e) {
  let t = e.activeElement;
  for (; t?.shadowRoot; ) {
    const n = t.shadowRoot.activeElement;
    if (n === t) break;
    t = n;
  }
  return t;
}
function cc(e) {
  if (Ei(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || Tn(e) && e.host || ac(e);
  return Tn(t) ? t.host : t;
}
var Bo = /* @__PURE__ */ new WeakMap();
function Co(e) {
  return Bo.has(e) || Bo.set(e, fe(e).getComputedStyle(e)), Bo.get(e);
}
var _o = () => typeof document < "u";
function uc() {
  return navigator.userAgentData?.platform ?? navigator.platform;
}
function dc() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map(({ brand: t, version: n }) => `${t}/${n}`).join(" ") : navigator.userAgent;
}
var ys = (e) => _o() && e.test(uc()), Ii = (e) => _o() && e.test(dc()), pc = (e) => _o() && e.test(navigator.vendor), rr = () => _o() && !!navigator.maxTouchPoints, gc = () => ys(/^iPhone/i), fc = () => ys(/^iPad/i) || Eo() && navigator.maxTouchPoints > 1, bs = () => gc() || fc(), ki = () => Eo() || bs(), Eo = () => ys(/^Mac/i), To = () => ki() && pc(/apple/i), hc = () => Ii(/Firefox/i), mc = () => Ii(/Android/i);
function vc(e) {
  return e.composedPath?.() ?? e.nativeEvent?.composedPath?.();
}
function me(e) {
  return vc(e)?.[0] ?? e.target;
}
var Cs = (e) => Je(e.currentTarget, me(e));
function Xo(e) {
  const t = e.currentTarget;
  if (!t) return !1;
  const n = ki();
  if (n && !e.metaKey || !n && !e.ctrlKey) return !1;
  const o = t.localName;
  return o === "a" || o === "button" && t.type === "submit" || o === "input" && t.type === "submit";
}
function Yo(e) {
  const t = e.currentTarget;
  if (!t) return !1;
  const n = t.localName;
  return e.altKey ? n === "a" || n === "button" && t.type === "submit" || n === "input" && t.type === "submit" : !1;
}
function Oi(e) {
  return Ic(e).isComposing || e.keyCode === 229;
}
function yc(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
function bc(e) {
  return e.mozInputSource === 0 && e.isTrusted ? !0 : mc() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
var Cc = (e) => e.button === 0, _s = (e) => e.button === 2 || Eo() && e.ctrlKey && e.button === 0, _c = (e) => e.ctrlKey || e.altKey || e.metaKey, Ec = (e) => "touches" in e && e.touches.length > 0, Tc = {
  Up: "ArrowUp",
  Down: "ArrowDown",
  Esc: "Escape",
  " ": "Space",
  ",": "Comma",
  Left: "ArrowLeft",
  Right: "ArrowRight"
}, ir = {
  ArrowLeft: "ArrowRight",
  ArrowRight: "ArrowLeft"
};
function yt(e, t = {}) {
  const { dir: n = "ltr", orientation: o = "horizontal" } = t;
  let s = e.key;
  return s = Tc[s] ?? s, n === "rtl" && o === "horizontal" && s in ir && (s = ir[s]), s;
}
function Ic(e) {
  return e.nativeEvent ?? e;
}
function Nt(e, t = "client") {
  const n = Ec(e) ? e.touches[0] || e.changedTouches[0] : e;
  return { x: n[`${t}X`], y: n[`${t}Y`] };
}
var oe = (e, t, n, o) => {
  const s = typeof e == "function" ? e() : e;
  return s?.addEventListener(t, n, o), () => {
    s?.removeEventListener(t, n, o);
  };
};
function kc(e, t) {
  const { type: n = "HTMLInputElement", property: o = "value" } = t, s = fe(e)[n].prototype;
  return Object.getOwnPropertyDescriptor(s, o) ?? {};
}
function Es(e, t) {
  if (!e) return;
  kc(e, { type: "HTMLInputElement", property: "checked" }).set?.call(e, t), t ? e.setAttribute("checked", "") : e.removeAttribute("checked");
}
function Ts(e, t) {
  const { checked: n, bubbles: o = !0 } = t;
  if (!e) return;
  const s = fe(e);
  e instanceof s.HTMLInputElement && (Es(e, n), e.dispatchEvent(new s.Event("click", { bubbles: o })));
}
function Oc(e) {
  return xc(e) ? e.form : e.closest("form");
}
function xc(e) {
  return e.matches("textarea, input, select, button");
}
function Pc(e, t) {
  if (!e) return;
  const n = Oc(e), o = (s) => {
    s.defaultPrevented || t();
  };
  return n?.addEventListener("reset", o, { passive: !0 }), () => n?.removeEventListener("reset", o);
}
function wc(e, t) {
  const n = e?.closest("fieldset");
  if (!n) return;
  t(n.disabled);
  const o = fe(n), s = new o.MutationObserver(() => t(n.disabled));
  return s.observe(n, {
    attributes: !0,
    attributeFilter: ["disabled"]
  }), () => s.disconnect();
}
function Is(e, t) {
  if (!e) return;
  const { onFieldsetDisabledChange: n, onFormReset: o } = t, s = [Pc(e, o), wc(e, n)];
  return () => s.forEach((r) => r?.());
}
var xi = (e) => ue(e) && e.tagName === "IFRAME", Sc = (e) => parseInt(e.getAttribute("tabindex") || "0", 10) < 0, ks = "input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type", Pi = (e, t = !1) => {
  if (!e) return [];
  const n = Array.from(e.querySelectorAll(ks));
  (t == !0 || t == "if-empty" && n.length === 0) && ue(e) && Ht(e) && n.unshift(e);
  const s = n.filter(Ht);
  return s.forEach((r, i) => {
    if (xi(r) && r.contentDocument) {
      const a = r.contentDocument.body;
      s.splice(i, 1, ...Pi(a));
    }
  }), s;
};
function Ht(e) {
  return !e || e.closest("[inert]") ? !1 : e.matches(ks) && rc(e);
}
function Io(e, t) {
  if (!e) return [];
  const o = Array.from(e.querySelectorAll(ks)).filter(Rc);
  return o.forEach((s, r) => {
    if (xi(s) && s.contentDocument) {
      const i = s.contentDocument.body, a = Io(i);
      o.splice(r, 1, ...a);
    }
  }), o.length, o;
}
function Rc(e) {
  return e != null && e.tabIndex > 0 ? !0 : Ht(e) && !Sc(e);
}
function $c(e, t) {
  const n = Io(e, t), o = n[0] || null, s = n[n.length - 1] || null;
  return [o, s];
}
function Vc(e) {
  const { root: t, getInitialEl: n, filter: o, enabled: s = !0 } = e;
  if (!s) return;
  let r = null;
  if (r || (r = typeof n == "function" ? n() : n), r || (r = t?.querySelector("[data-autofocus],[autofocus]")), !r) {
    const i = Io(t);
    r = o ? i.filter(o)[0] : i[0];
  }
  return r || t || void 0;
}
function Ac(e) {
  const t = e.currentTarget;
  if (!t) return !1;
  const [n, o] = $c(t), s = t.ownerDocument || document;
  return !(s.activeElement === n && e.shiftKey || s.activeElement === o && !e.shiftKey || !n && !o);
}
function Os(e) {
  const t = /* @__PURE__ */ new Set();
  function n(o) {
    const s = globalThis.requestAnimationFrame(o);
    t.add(() => globalThis.cancelAnimationFrame(s));
  }
  return n(() => n(e)), function() {
    t.forEach((s) => s());
  };
}
function U(e) {
  let t;
  const n = globalThis.requestAnimationFrame(() => {
    t = e();
  });
  return () => {
    globalThis.cancelAnimationFrame(n), t?.();
  };
}
function Lc(e, t, n) {
  const o = U(() => {
    e.removeEventListener(t, s, !0), n();
  }), s = () => {
    o(), n();
  };
  return e.addEventListener(t, s, { once: !0, capture: !0 }), o;
}
function Nc(e, t) {
  if (!e) return;
  const { attributes: n, callback: o } = t, s = e.ownerDocument.defaultView || window, r = new s.MutationObserver((i) => {
    for (const a of i)
      a.type === "attributes" && a.attributeName && n.includes(a.attributeName) && o(a);
  });
  return r.observe(e, { attributes: !0, attributeFilter: n }), () => r.disconnect();
}
function wi(e, t) {
  const { defer: n } = t, o = n ? U : (r) => r(), s = [];
  return s.push(
    o(() => {
      const r = typeof e == "function" ? e() : e;
      s.push(Nc(r, t));
    })
  ), () => {
    s.forEach((r) => r?.());
  };
}
function Dc(e, t) {
  const { callback: n } = t;
  if (!e) return;
  const o = e.ownerDocument.defaultView || window, s = new o.MutationObserver(n);
  return s.observe(e, { childList: !0, subtree: !0 }), () => s.disconnect();
}
function Bc(e, t) {
  const n = U, o = [];
  return o.push(
    n(() => {
      const s = typeof e == "function" ? e() : e;
      o.push(Dc(s, t));
    })
  ), () => {
    o.forEach((s) => s?.());
  };
}
function xs(e) {
  const t = () => e.click();
  hc() ? Lc(e, "keyup", t) : queueMicrotask(t);
}
function Zo(e) {
  const t = cc(e);
  return nc(t) ? Ke(t).body : ue(t) && Si(t) ? t : Zo(t);
}
var Mc = /auto|scroll|overlay|hidden|clip/;
function Si(e) {
  const t = fe(e), { overflow: n, overflowX: o, overflowY: s, display: r } = t.getComputedStyle(e);
  return Mc.test(n + s + o) && !["inline", "contents"].includes(r);
}
function Fc(e) {
  return e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth;
}
function Ri(e, t) {
  const { rootEl: n, ...o } = t || {};
  !e || !n || !Si(n) || !Fc(n) || e.scrollIntoView(o);
}
var Dt = "default", Qo = "", Xn = /* @__PURE__ */ new WeakMap();
function Gc(e = {}) {
  const { target: t, doc: n } = e, o = n ?? document, s = o.documentElement;
  return bs() ? (Dt === "default" && (Qo = s.style.webkitUserSelect, s.style.webkitUserSelect = "none"), Dt = "disabled") : t && (Xn.set(t, t.style.userSelect), t.style.userSelect = "none"), () => Hc({ target: t, doc: o });
}
function Hc(e = {}) {
  const { target: t, doc: n } = e, s = (n ?? document).documentElement;
  if (bs()) {
    if (Dt !== "disabled") return;
    Dt = "restoring", setTimeout(() => {
      Os(() => {
        Dt === "restoring" && (s.style.webkitUserSelect === "none" && (s.style.webkitUserSelect = Qo || ""), Qo = "", Dt = "default");
      });
    }, 300);
  } else if (t && Xn.has(t)) {
    const r = Xn.get(t);
    t.style.userSelect === "none" && (t.style.userSelect = r ?? ""), t.getAttribute("style") === "" && t.removeAttribute("style"), Xn.delete(t);
  }
}
function Uc(e = {}) {
  const { defer: t, target: n, ...o } = e, s = t ? U : (i) => i(), r = [];
  return r.push(
    s(() => {
      const i = typeof n == "function" ? n() : n;
      r.push(Gc({ ...o, target: i }));
    })
  ), () => {
    r.forEach((i) => i?.());
  };
}
function zc(e, t) {
  const { onPointerMove: n, onPointerUp: o } = t, r = [
    oe(e, "pointermove", (i) => {
      const a = Nt(i), l = Math.sqrt(a.x ** 2 + a.y ** 2), c = i.pointerType === "touch" ? 10 : 5;
      if (!(l < c)) {
        if (i.pointerType === "mouse" && i.button === 0) {
          o();
          return;
        }
        n({ point: a, event: i });
      }
    }, !1),
    oe(e, "pointerup", o, !1),
    oe(e, "pointercancel", o, !1),
    oe(e, "contextmenu", o, !1),
    Uc({ doc: e })
  ];
  return () => {
    r.forEach((i) => i());
  };
}
function $i(e) {
  const {
    pointerNode: t,
    keyboardNode: n = t,
    onPress: o,
    onPressStart: s,
    onPressEnd: r,
    isValidKey: i = (x) => x.key === "Enter"
  } = e;
  if (!t) return dn;
  const a = fe(t), l = Ke(t);
  let c = dn, d = dn, f = dn;
  const p = (x) => ({
    point: Nt(x),
    event: x
  });
  function g(x) {
    s?.(p(x));
  }
  function h(x) {
    r?.(p(x));
  }
  const k = oe(t, "pointerdown", (x) => {
    d();
    const y = oe(a, "pointerup", (N) => {
      const S = me(N);
      Je(t, S) ? o?.(p(N)) : r?.(p(N));
    }, { passive: !o, once: !0 }), w = oe(a, "pointercancel", h, {
      passive: !r,
      once: !0
    });
    d = Do(y, w), l.activeElement === n && x.pointerType === "mouse" && x.preventDefault(), g(x);
  }, { passive: !s }), $ = oe(n, "focus", I);
  c = Do(k, $);
  function I() {
    const x = (N) => {
      if (!i(N)) return;
      const S = (O) => {
        if (!i(O)) return;
        const P = new a.PointerEvent("pointerup"), G = p(P);
        o?.(G), r?.(G);
      };
      d(), d = oe(n, "keyup", S);
      const D = new a.PointerEvent("pointerdown");
      g(D);
    }, m = () => {
      const N = new a.PointerEvent("pointercancel");
      h(N);
    }, y = oe(n, "keydown", x), w = oe(n, "blur", m);
    f = Do(y, w);
  }
  return () => {
    c(), d(), f();
  };
}
function Pn(e, t) {
  return Array.from(e?.querySelectorAll(t) ?? []);
}
function Wc(e, t) {
  return e?.querySelector(t) ?? null;
}
var Ps = (e) => e.id;
function Vi(e, t, n = Ps) {
  return e.find((o) => n(o) === t);
}
function ws(e, t, n = Ps) {
  const o = Vi(e, t, n);
  return o ? e.indexOf(o) : -1;
}
function Ai(e, t, n = !0) {
  let o = ws(e, t);
  return o = n ? (o + 1) % e.length : Math.min(o + 1, e.length - 1), e[o];
}
function Li(e, t, n = !0) {
  let o = ws(e, t);
  return o === -1 ? n ? e[e.length - 1] : null : (o = n ? (o - 1 + e.length) % e.length : Math.max(0, o - 1), e[o]);
}
function Ni(e, t) {
  const { onEntry: n, measure: o, box: s = "border-box" } = t, r = (Array.isArray(e) ? e : [e]).filter(ue), i = fe(r[0]), a = (c) => {
    const d = r.map((f) => o(f));
    n({ rects: d, entries: c });
  };
  a([]);
  const l = new i.ResizeObserver(a);
  return r.forEach((c) => l.observe(c, { box: s })), () => l.disconnect();
}
var Kc = (e) => e.split("").map((t) => {
  const n = t.charCodeAt(0);
  return n > 0 && n < 128 ? t : n >= 128 && n <= 255 ? `/x${n.toString(16)}`.replace("/", "\\") : "";
}).join("").trim(), jc = (e) => Kc(e.dataset?.valuetext ?? e.textContent ?? ""), qc = (e, t) => e.trim().toLowerCase().startsWith(t.toLowerCase());
function Xc(e, t, n, o = Ps) {
  const s = n ? ws(e, n, o) : -1;
  let r = n ? Yl(e, s) : e;
  return t.length === 1 && (r = r.filter((a) => o(a) !== n)), r.find((a) => qc(jc(a), t));
}
function Di(e, t) {
  if (!e) return dn;
  const n = Object.keys(t).reduce((o, s) => (o[s] = e.style.getPropertyValue(s), o), {});
  return Object.assign(e.style, t), () => {
    Object.assign(e.style, n), e.style.length === 0 && e.removeAttribute("style");
  };
}
function Yc(e, t) {
  const { state: n, activeId: o, key: s, timeout: r = 350, itemToId: i } = t, a = n.keysSoFar + s, c = a.length > 1 && Array.from(a).every((h) => h === a[0]) ? a[0] : a;
  let d = e.slice();
  const f = Xc(d, c, o, i);
  function p() {
    clearTimeout(n.timer), n.timer = -1;
  }
  function g(h) {
    n.keysSoFar = h, p(), h !== "" && (n.timer = +setTimeout(() => {
      g(""), p();
    }, r));
  }
  return g(a), f;
}
var Bi = /* @__PURE__ */ Object.assign(Yc, {
  defaultOptions: { keysSoFar: "", timer: -1 },
  isValidEvent: Zc
});
function Zc(e) {
  return e.key.length === 1 && !e.ctrlKey && !e.metaKey;
}
var Ss = {
  border: "0",
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}, Qc = 1e3 / 60;
function Jc(e, t) {
  const n = e();
  if (ue(n) && n.isConnected)
    return t(n), () => {
    };
  {
    const o = setInterval(() => {
      const s = e();
      ue(s) && s.isConnected && (t(s), clearInterval(o));
    }, Qc);
    return () => clearInterval(o);
  }
}
function eu(e, t) {
  const n = [];
  return e?.forEach((o) => {
    const s = Jc(o, t);
    n.push(s);
  }), () => {
    n.forEach((o) => o());
  };
}
var tu = (...e) => e.map((t) => t?.trim?.()).filter(Boolean).join(" "), nu = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g, ar = (e) => {
  const t = {};
  let n;
  for (; n = nu.exec(e); )
    t[n[1]] = n[2];
  return t;
}, ou = (e, t) => {
  if (fn(e)) {
    if (fn(t)) return `${e};${t}`;
    e = ar(e);
  } else fn(t) && (t = ar(t));
  return Object.assign({}, e ?? {}, t ?? {});
};
function Kt(...e) {
  let t = {};
  for (let n of e) {
    for (let o in t) {
      if (o.startsWith("on") && typeof t[o] == "function" && typeof n[o] == "function") {
        t[o] = qo(n[o], t[o]);
        continue;
      }
      if (o === "className" || o === "class") {
        t[o] = tu(t[o], n[o]);
        continue;
      }
      if (o === "style") {
        t[o] = ou(t[o], n[o]);
        continue;
      }
      t[o] = n[o] !== void 0 ? n[o] : t[o];
    }
    for (let o in n)
      t[o] === void 0 && (t[o] = n[o]);
  }
  return t;
}
function nt() {
  return {
    and: (...e) => function(n) {
      return e.every((o) => n.guard(o));
    },
    or: (...e) => function(n) {
      return e.some((o) => n.guard(o));
    },
    not: (e) => function(n) {
      return !n.guard(e);
    }
  };
}
var At = /* @__PURE__ */ ((e) => (e.NotStarted = "Not Started", e.Started = "Started", e.Stopped = "Stopped", e))(At || {}), Mo = "__init__";
function su(e) {
  const t = () => e.getRootNode?.() ?? document, n = () => Ke(t()), o = () => n().defaultView ?? window, s = () => lc(t());
  return {
    ...e,
    getRootNode: t,
    getDoc: n,
    getWin: o,
    getActiveElement: s,
    isActiveElement: (a) => a === s(),
    getById: (a) => t().getElementById(a)
  };
}
function ru(e) {
  return new Proxy({}, {
    get(t, n) {
      return n === "style" ? (o) => e({ style: o }).style : e;
    }
  });
}
var ne = () => (e) => Array.from(new Set(e));
function iu(e) {
  return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
}
var lr = {
  htmlFor: "for",
  className: "class",
  onDoubleClick: "onDblclick",
  onChange: "onInput",
  onFocus: "onFocusin",
  onBlur: "onFocusout",
  defaultValue: "value",
  defaultChecked: "checked"
}, au = "viewBox,className,preserveAspectRatio,fillRule,clipPath,clipRule,strokeWidth,strokeLinecap,strokeLinejoin,strokeDasharray,strokeDashoffset,strokeMiterlimit".split(
  ","
);
function lu(e) {
  return e in lr ? lr[e] : e.startsWith("on") ? `on${iu(e.substr(2))}` : au.includes(e) ? e : e.toLowerCase();
}
var Ne = ru((e) => {
  const t = {};
  for (const n in e) {
    const o = e[n];
    n === "children" ? typeof o == "string" ? t.innerHTML = o : process.env.NODE_ENV !== "production" && o != null && console.warn("[Vue Normalize Prop] : avoid passing non-primitive value as `children`") : t[lu(n)] = e[n];
  }
  return t;
});
function so(e) {
  const t = e().defaultValue ?? e().value, n = e().isEqual ?? Object.is, o = er(t), s = L(() => e().value !== void 0), r = er(s.value ? e().value : o.value);
  return {
    initial: t,
    ref: r,
    get() {
      return s.value ? e().value : o.value;
    },
    set(i) {
      const a = s.value ? e().value : o.value, l = lt(i) ? i(a) : i;
      e().debug && console.log(`[bindable > ${e().debug}] setValue`, { next: l, prev: a }), s.value || (o.value = l), n(l, a) || e().onChange?.(l, a);
    },
    invoke(i, a) {
      e().onChange?.(i, a);
    },
    hash(i) {
      return e().hash?.(i) ?? String(i);
    }
  };
}
so.cleanup = (e) => {
  al(() => e());
};
so.ref = (e) => {
  let t = e;
  return {
    get: () => t,
    set: (n) => {
      t = n;
    }
  };
};
function cu(e) {
  const t = J(e);
  return {
    get(n) {
      return t.value[n];
    },
    set(n, o) {
      t.value[n] = o;
    }
  };
}
var uu = (e, t) => {
  ct(
    () => [...e.map((n) => n())],
    (n, o) => {
      let s = !1;
      for (let r = 0; r < n.length; r++)
        if (!Wt(o[r], ce(n[r]))) {
          s = !0;
          break;
        }
      s && t();
    }
  );
};
function Se(e, t = {}) {
  const n = L(() => {
    const { id: S, ids: D, getRootNode: O } = ce(t);
    return su({ id: S, ids: D, getRootNode: O });
  }), o = (...S) => {
    e.debug && console.log(...S);
  }, s = L(
    () => e.props?.({
      props: yo(ce(t)),
      get scope() {
        return n.value;
      }
    }) ?? ce(t)
  ), r = du(s), i = e.context?.({
    prop: r,
    bindable: so,
    get scope() {
      return n.value;
    },
    flush: cr,
    getContext() {
      return a;
    },
    getComputed() {
      return m;
    },
    getRefs() {
      return h;
    }
  }), a = {
    get(S) {
      return i[S]?.get();
    },
    set(S, D) {
      i[S]?.set(D);
    },
    initial(S) {
      return i[S]?.initial;
    },
    hash(S) {
      const D = i[S]?.get();
      return i[S]?.hash(D);
    }
  };
  let l = /* @__PURE__ */ new Map(), c = null, d = { current: null }, f = { current: { type: "" } };
  const p = () => ({
    ...f.current,
    current() {
      return f.current;
    },
    previous() {
      return d.current;
    }
  }), g = () => ({
    ...y,
    matches(...S) {
      const D = y.get();
      return S.includes(D);
    },
    hasTag(S) {
      const D = y.get();
      return !!e.states[D]?.tags?.includes(S);
    }
  }), h = cu(e.refs?.({ prop: r, context: a }) ?? {}), b = () => ({
    state: g(),
    context: a,
    event: p(),
    prop: r,
    send: N,
    action: k,
    guard: $,
    track: uu,
    refs: h,
    computed: m,
    flush: cr,
    get scope() {
      return n.value;
    },
    choose: x
  }), k = (S) => {
    const D = lt(S) ? S(b()) : S;
    if (!D) return;
    const O = D.map((P) => {
      const G = e.implementations?.actions?.[P];
      return G || oo(`[zag-js] No implementation found for action "${JSON.stringify(P)}"`), G;
    });
    for (const P of O)
      P?.(b());
  }, $ = (S) => lt(S) ? S(b()) : e.implementations?.guards?.[S](b()), I = (S) => {
    const D = lt(S) ? S(b()) : S;
    if (!D) return;
    const O = D.map((G) => {
      const K = e.implementations?.effects?.[G];
      return K || oo(`[zag-js] No implementation found for effect "${JSON.stringify(G)}"`), K;
    }), P = [];
    for (const G of O) {
      const K = G?.(b());
      K && P.push(K);
    }
    return () => P.forEach((G) => G?.());
  }, x = (S) => $l(S).find((D) => {
    let O = !D.guard;
    return fn(D.guard) ? O = !!$(D.guard) : lt(D.guard) && (O = D.guard(b())), O;
  }), m = (S) => {
    Ci(e.computed, () => "[zag-js] No computed object found on machine");
    const D = e.computed[S];
    return D({
      context: a,
      event: p(),
      prop: r,
      refs: h,
      get scope() {
        return n.value;
      },
      computed: m
    });
  }, y = so(() => ({
    defaultValue: e.initialState({ prop: r }),
    onChange(S, D) {
      D && (l.get(D)?.(), l.delete(D)), D && k(e.states[D]?.exit), k(c?.actions);
      const O = I(e.states[S]?.effects);
      if (O && l.set(S, O), D === Mo) {
        k(e.entry);
        const P = I(e.effects);
        P && l.set(Mo, P);
      }
      k(e.states[S]?.entry);
    }
  }));
  let w = At.NotStarted;
  us(() => {
    const S = w === At.Started;
    w = At.Started, o(S ? "rehydrating..." : "initializing..."), y.invoke(y.initial, Mo);
  }), il(() => {
    w = At.Stopped, o("unmounting...");
    const S = l.values();
    for (const D of S) D?.();
    l = /* @__PURE__ */ new Map(), k(e.exit);
  });
  const N = (S) => {
    if (w !== At.Started) return;
    d.current = f.current, f.current = S, o("send", S);
    let D = y.get();
    const O = (
      //@ts-expect-error
      e.states[D].on?.[S.type] ?? e.on?.[S.type]
    ), P = x(O);
    if (!P) return;
    c = P;
    const G = P.target ?? D;
    o("transition", P);
    const K = G !== D;
    K ? y.set(G) : P.reenter && !K ? y.invoke(D, D) : k(P.actions);
  };
  return e.watch?.(b()), {
    state: g(),
    send: N,
    context: a,
    prop: r,
    get scope() {
      return n.value;
    },
    refs: h,
    computed: m,
    event: p(),
    getStatus: () => w
  };
}
function du(e) {
  return function(n) {
    return e.value[n];
  };
}
var cr = (e) => {
  vo().then(() => {
    e();
  });
};
const pu = _({
  name: "Dynamic",
  inheritAttrs: !1,
  setup(e, { attrs: t, slots: n }) {
    return () => {
      if (!n.default) return null;
      const o = Mi(n.default()), [s, ...r] = o;
      if (Object.keys(t).length > 0) {
        delete s.props?.ref;
        const i = Kt(t, s.props ?? {}), a = ll(s, i);
        for (const l in i)
          l.startsWith("on") && (a.props ||= {}, a.props[l] = i[l]);
        return o.length === 1 ? a : [a, ...r];
      }
      return o;
    };
  }
});
function Mi(e) {
  return e ? e.flatMap((t) => t.type === re ? Mi(t.children) : [t]) : [];
}
const Fo = (e) => _({
  name: "Polymorphic",
  inheritAttrs: !1,
  props: {
    asChild: {
      type: Boolean,
      default: !1
    }
  },
  setup(t, { attrs: n, slots: o }) {
    return t.asChild ? () => tr(pu, n, { default: o.default }) : () => tr(e, { ...n }, o.default?.());
  }
});
function gu() {
  const e = /* @__PURE__ */ new Map();
  return new Proxy(Fo, {
    apply(n, o, s) {
      return Fo(s[0]);
    },
    get(n, o) {
      const s = o;
      return e.has(s) || e.set(s, Fo(s)), e.get(s);
    }
  });
}
const A = gu(), X = (e) => {
  const t = Symbol(e);
  return [(s) => cl(t, s), (s) => ul(t, s), t];
}, [Fi, jt] = X("HoverCardContext");
function fu(e) {
  const t = ce(e);
  return t?.$el ?? t;
}
const hu = (e) => Object.prototype.hasOwnProperty.call(e, "nodeName") && typeof e.nodeName == "string";
function R() {
  const e = pi(), t = J(), n = L(() => ["#text", "#comment"].includes(t.value?.$el.nodeName) ? (
    // @ts-expect-error ignore ts error
    t.value?.$el.nextElementSibling
  ) : (
    // @ts-expect-error ignore ts error
    fu(t)
  )), o = Object.assign({}, e.exposed), s = {};
  for (const i in e.props)
    Object.defineProperty(s, i, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[i]
    });
  if (Object.keys(o).length > 0)
    for (const i in o)
      Object.defineProperty(s, i, {
        enumerable: !0,
        configurable: !0,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        get: () => o[i]
      });
  Object.defineProperty(s, "$el", {
    enumerable: !0,
    configurable: !0,
    get: () => e.vnode.el
  }), e.exposed = s;
  function r(i) {
    t.value = i, !(hu(i) || !i) && (Object.defineProperty(s, "$el", {
      enumerable: !0,
      configurable: !0,
      get: () => i.$el
    }), e.exposed = s);
  }
  return { forwardRef: r, currentRef: t, currentElement: n };
}
const mu = /* @__PURE__ */ _({
  __name: "hover-card-arrow-tip",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = jt();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getArrowTipProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), vu = /* @__PURE__ */ _({
  __name: "hover-card-arrow",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = jt();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getArrowProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), [ko, Rs] = X("PresenceContext"), yu = /* @__PURE__ */ _({
  __name: "hover-card-content",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = jt(), n = Rs(), o = L(() => Kt(t.value.getContentProps(), n.value.presenceProps));
    return R(), (s, r) => u(n).unmounted ? Z("", !0) : (v(), T(u(A).div, V({ key: 0 }, o.value, { "as-child": s.asChild }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), bu = /* @__PURE__ */ _({
  __name: "hover-card-context",
  setup(e) {
    const t = jt();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), [ft, Oo] = X("RenderStrategyProps");
function Cu(e, t) {
  const { state: n, send: o, context: s } = e, r = n.matches("mounted", "unmountSuspended");
  return {
    skip: !s.get("initial"),
    present: r,
    setNode(i) {
      i && o({ type: "NODE.SET", node: i });
    },
    unmount() {
      o({ type: "UNMOUNT" });
    }
  };
}
var _u = {
  props({ props: e }) {
    return { ...e, present: !!e.present };
  },
  initialState({ prop: e }) {
    return e("present") ? "mounted" : "unmounted";
  },
  refs() {
    return {
      node: null,
      styles: null
    };
  },
  context({ bindable: e }) {
    return {
      unmountAnimationName: e(() => ({ defaultValue: null })),
      prevAnimationName: e(() => ({ defaultValue: null })),
      present: e(() => ({ defaultValue: !1 })),
      initial: e(() => ({
        sync: !0,
        defaultValue: !1
      }))
    };
  },
  exit: ["clearInitial", "cleanupNode"],
  watch({ track: e, action: t, prop: n }) {
    e([() => n("present")], () => {
      t(["setInitial", "syncPresence"]);
    });
  },
  on: {
    "NODE.SET": {
      actions: ["setNode", "setStyles"]
    }
  },
  states: {
    mounted: {
      on: {
        UNMOUNT: {
          target: "unmounted",
          actions: ["clearPrevAnimationName", "invokeOnExitComplete"]
        },
        "UNMOUNT.SUSPEND": {
          target: "unmountSuspended"
        }
      }
    },
    unmountSuspended: {
      effects: ["trackAnimationEvents"],
      on: {
        MOUNT: {
          target: "mounted",
          actions: ["setPrevAnimationName"]
        },
        UNMOUNT: {
          target: "unmounted",
          actions: ["clearPrevAnimationName", "invokeOnExitComplete"]
        }
      }
    },
    unmounted: {
      on: {
        MOUNT: {
          target: "mounted",
          actions: ["setPrevAnimationName"]
        }
      }
    }
  },
  implementations: {
    actions: {
      setInitial: ({ context: e }) => {
        e.get("initial") || queueMicrotask(() => {
          e.set("initial", !0);
        });
      },
      clearInitial: ({ context: e }) => {
        e.set("initial", !1);
      },
      cleanupNode: ({ refs: e }) => {
        e.set("node", null), e.set("styles", null);
      },
      invokeOnExitComplete: ({ prop: e }) => {
        e("onExitComplete")?.();
      },
      setNode: ({ refs: e, event: t }) => {
        e.set("node", t.node);
      },
      setStyles: ({ refs: e, event: t }) => {
        e.set("styles", Co(t.node));
      },
      syncPresence: ({ context: e, refs: t, send: n, prop: o }) => {
        const s = o("present");
        if (s)
          return n({ type: "MOUNT", src: "presence.changed" });
        const r = t.get("node");
        if (!s && r?.ownerDocument.visibilityState === "hidden")
          return n({ type: "UNMOUNT", src: "visibilitychange" });
        U(() => {
          const i = Bn(t.get("styles"));
          e.set("unmountAnimationName", i), i === "none" || i === e.get("prevAnimationName") || t.get("styles")?.display === "none" || t.get("styles")?.animationDuration === "0s" ? n({ type: "UNMOUNT", src: "presence.changed" }) : n({ type: "UNMOUNT.SUSPEND" });
        });
      },
      setPrevAnimationName: ({ context: e, refs: t }) => {
        U(() => {
          e.set("prevAnimationName", Bn(t.get("styles")));
        });
      },
      clearPrevAnimationName: ({ context: e }) => {
        e.set("prevAnimationName", null);
      }
    },
    effects: {
      trackAnimationEvents: ({ context: e, refs: t, send: n }) => {
        const o = t.get("node");
        if (!o) return;
        const s = (a) => {
          (a.composedPath?.()?.[0] ?? a.target) === o && e.set("prevAnimationName", Bn(t.get("styles")));
        }, r = (a) => {
          const l = Bn(t.get("styles"));
          me(a) === o && l === e.get("unmountAnimationName") && n({ type: "UNMOUNT", src: "animationend" });
        };
        o.addEventListener("animationstart", s), o.addEventListener("animationcancel", r), o.addEventListener("animationend", r);
        const i = Di(o, { animationFillMode: "forwards" });
        return () => {
          o.removeEventListener("animationstart", s), o.removeEventListener("animationcancel", r), o.removeEventListener("animationend", r), Os(() => i());
        };
      }
    }
  }
};
function Bn(e) {
  return e?.animationName || "none";
}
ne()(["onExitComplete", "present", "immediate"]);
const xo = (e, t) => {
  const n = J(!1), o = J(null), s = L(() => ({
    present: ce(e).present,
    onExitComplete: () => t?.("exitComplete")
  })), r = Se(_u, s), i = L(() => Cu(r));
  return ct(
    () => i.value.present,
    () => {
      i.value.present && (n.value = !0);
    }
  ), ct(o, () => {
    if (o.value) {
      const a = o.value.$el ? o.value.$el : o.value;
      a && i.value.setNode(a);
    }
  }), L(() => {
    const a = ce(e);
    return {
      present: i.value.present,
      unmounted: !i.value.present && !n.value && a.lazyMount || a?.unmountOnExit && !i.value?.present && n.value,
      presenceProps: {
        ref: o,
        hidden: !i.value.present,
        "data-state": i.value.skip && a.skipAnimationOnMount ? void 0 : a?.present ? "open" : "closed"
      }
    };
  });
}, Eu = /* @__PURE__ */ _({
  __name: "hover-card-positioner",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = jt(), n = Oo(), o = xo(
      L(() => ({
        ...n.value,
        present: t.value.open
      }))
    );
    return ko(o), R(), (s, r) => u(o).unmounted ? Z("", !0) : (v(), T(u(A).div, V({ key: 0 }, u(t).getPositionerProps(), { "as-child": s.asChild }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Tu = /* @__PURE__ */ _({
  __name: "hover-card-root-provider",
  props: {
    value: {},
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return Fi(n), ft(L(() => ({ lazyMount: t.lazyMount, unmountOnExit: t.unmountOnExit }))), R(), (o, s) => E(o.$slots, "default");
  }
});
var Pe = (e, t = []) => ({
  parts: (...n) => {
    if (Iu(t))
      return Pe(e, n);
    throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?");
  },
  extendWith: (...n) => Pe(e, [...t, ...n]),
  rename: (n) => Pe(n, t),
  keys: () => t,
  build: () => [...new Set(t)].reduce(
    (n, o) => Object.assign(n, {
      [o]: {
        selector: [
          `&[data-scope="${Ot(e)}"][data-part="${Ot(o)}"]`,
          `& [data-scope="${Ot(e)}"][data-part="${Ot(o)}"]`
        ].join(", "),
        attrs: { "data-scope": Ot(e), "data-part": Ot(o) }
      }
    }),
    {}
  )
}), Ot = (e) => e.replace(/([A-Z])([A-Z])/g, "$1-$2").replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase(), Iu = (e) => e.length === 0;
const ku = ["top", "right", "bottom", "left"], dt = Math.min, Oe = Math.max, ro = Math.round, Mn = Math.floor, ze = (e) => ({
  x: e,
  y: e
}), Ou = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, xu = {
  start: "end",
  end: "start"
};
function Jo(e, t, n) {
  return Oe(e, dt(t, n));
}
function et(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function tt(e) {
  return e.split("-")[0];
}
function qt(e) {
  return e.split("-")[1];
}
function $s(e) {
  return e === "x" ? "y" : "x";
}
function Vs(e) {
  return e === "y" ? "height" : "width";
}
function pt(e) {
  return ["top", "bottom"].includes(tt(e)) ? "y" : "x";
}
function As(e) {
  return $s(pt(e));
}
function Pu(e, t, n) {
  n === void 0 && (n = !1);
  const o = qt(e), s = As(e), r = Vs(s);
  let i = s === "x" ? o === (n ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[r] > t.floating[r] && (i = io(i)), [i, io(i)];
}
function wu(e) {
  const t = io(e);
  return [es(e), t, es(t)];
}
function es(e) {
  return e.replace(/start|end/g, (t) => xu[t]);
}
function Su(e, t, n) {
  const o = ["left", "right"], s = ["right", "left"], r = ["top", "bottom"], i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? s : o : t ? o : s;
    case "left":
    case "right":
      return t ? r : i;
    default:
      return [];
  }
}
function Ru(e, t, n, o) {
  const s = qt(e);
  let r = Su(tt(e), n === "start", o);
  return s && (r = r.map((i) => i + "-" + s), t && (r = r.concat(r.map(es)))), r;
}
function io(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Ou[t]);
}
function $u(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Gi(e) {
  return typeof e != "number" ? $u(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function ao(e) {
  const {
    x: t,
    y: n,
    width: o,
    height: s
  } = e;
  return {
    width: o,
    height: s,
    top: n,
    left: t,
    right: t + o,
    bottom: n + s,
    x: t,
    y: n
  };
}
function ur(e, t, n) {
  let {
    reference: o,
    floating: s
  } = e;
  const r = pt(t), i = As(t), a = Vs(i), l = tt(t), c = r === "y", d = o.x + o.width / 2 - s.width / 2, f = o.y + o.height / 2 - s.height / 2, p = o[a] / 2 - s[a] / 2;
  let g;
  switch (l) {
    case "top":
      g = {
        x: d,
        y: o.y - s.height
      };
      break;
    case "bottom":
      g = {
        x: d,
        y: o.y + o.height
      };
      break;
    case "right":
      g = {
        x: o.x + o.width,
        y: f
      };
      break;
    case "left":
      g = {
        x: o.x - s.width,
        y: f
      };
      break;
    default:
      g = {
        x: o.x,
        y: o.y
      };
  }
  switch (qt(t)) {
    case "start":
      g[i] -= p * (n && c ? -1 : 1);
      break;
    case "end":
      g[i] += p * (n && c ? -1 : 1);
      break;
  }
  return g;
}
const Vu = async (e, t, n) => {
  const {
    placement: o = "bottom",
    strategy: s = "absolute",
    middleware: r = [],
    platform: i
  } = n, a = r.filter(Boolean), l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let c = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: s
  }), {
    x: d,
    y: f
  } = ur(c, o, l), p = o, g = {}, h = 0;
  for (let b = 0; b < a.length; b++) {
    const {
      name: k,
      fn: $
    } = a[b], {
      x: I,
      y: x,
      data: m,
      reset: y
    } = await $({
      x: d,
      y: f,
      initialPlacement: o,
      placement: p,
      strategy: s,
      middlewareData: g,
      rects: c,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = I ?? d, f = x ?? f, g = {
      ...g,
      [k]: {
        ...g[k],
        ...m
      }
    }, y && h <= 50 && (h++, typeof y == "object" && (y.placement && (p = y.placement), y.rects && (c = y.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: s
    }) : y.rects), {
      x: d,
      y: f
    } = ur(c, p, l)), b = -1);
  }
  return {
    x: d,
    y: f,
    placement: p,
    strategy: s,
    middlewareData: g
  };
};
async function In(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: o,
    y: s,
    platform: r,
    rects: i,
    elements: a,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: g = 0
  } = et(t, e), h = Gi(g), k = a[p ? f === "floating" ? "reference" : "floating" : f], $ = ao(await r.getClippingRect({
    element: (n = await (r.isElement == null ? void 0 : r.isElement(k))) == null || n ? k : k.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: l
  })), I = f === "floating" ? {
    x: o,
    y: s,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, x = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(a.floating)), m = await (r.isElement == null ? void 0 : r.isElement(x)) ? await (r.getScale == null ? void 0 : r.getScale(x)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, y = ao(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: I,
    offsetParent: x,
    strategy: l
  }) : I);
  return {
    top: ($.top - y.top + h.top) / m.y,
    bottom: (y.bottom - $.bottom + h.bottom) / m.y,
    left: ($.left - y.left + h.left) / m.x,
    right: (y.right - $.right + h.right) / m.x
  };
}
const Au = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: o,
      placement: s,
      rects: r,
      platform: i,
      elements: a,
      middlewareData: l
    } = t, {
      element: c,
      padding: d = 0
    } = et(e, t) || {};
    if (c == null)
      return {};
    const f = Gi(d), p = {
      x: n,
      y: o
    }, g = As(s), h = Vs(g), b = await i.getDimensions(c), k = g === "y", $ = k ? "top" : "left", I = k ? "bottom" : "right", x = k ? "clientHeight" : "clientWidth", m = r.reference[h] + r.reference[g] - p[g] - r.floating[h], y = p[g] - r.reference[g], w = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let N = w ? w[x] : 0;
    (!N || !await (i.isElement == null ? void 0 : i.isElement(w))) && (N = a.floating[x] || r.floating[h]);
    const S = m / 2 - y / 2, D = N / 2 - b[h] / 2 - 1, O = dt(f[$], D), P = dt(f[I], D), G = O, K = N - b[h] - P, te = N / 2 - b[h] / 2 + S, Re = Jo(G, te, K), De = !l.arrow && qt(s) != null && te !== Re && r.reference[h] / 2 - (te < G ? O : P) - b[h] / 2 < 0, Be = De ? te < G ? te - G : te - K : 0;
    return {
      [g]: p[g] + Be,
      data: {
        [g]: Re,
        centerOffset: te - Re - Be,
        ...De && {
          alignmentOffset: Be
        }
      },
      reset: De
    };
  }
}), Lu = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: s,
        middlewareData: r,
        rects: i,
        initialPlacement: a,
        platform: l,
        elements: c
      } = t, {
        mainAxis: d = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: b = !0,
        ...k
      } = et(e, t);
      if ((n = r.arrow) != null && n.alignmentOffset)
        return {};
      const $ = tt(s), I = pt(a), x = tt(a) === a, m = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), y = p || (x || !b ? [io(a)] : wu(a)), w = h !== "none";
      !p && w && y.push(...Ru(a, b, h, m));
      const N = [a, ...y], S = await In(t, k), D = [];
      let O = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (d && D.push(S[$]), f) {
        const te = Pu(s, i, m);
        D.push(S[te[0]], S[te[1]]);
      }
      if (O = [...O, {
        placement: s,
        overflows: D
      }], !D.every((te) => te <= 0)) {
        var P, G;
        const te = (((P = r.flip) == null ? void 0 : P.index) || 0) + 1, Re = N[te];
        if (Re)
          return {
            data: {
              index: te,
              overflows: O
            },
            reset: {
              placement: Re
            }
          };
        let De = (G = O.filter((Be) => Be.overflows[0] <= 0).sort((Be, se) => Be.overflows[1] - se.overflows[1])[0]) == null ? void 0 : G.placement;
        if (!De)
          switch (g) {
            case "bestFit": {
              var K;
              const Be = (K = O.filter((se) => {
                if (w) {
                  const de = pt(se.placement);
                  return de === I || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  de === "y";
                }
                return !0;
              }).map((se) => [se.placement, se.overflows.filter((de) => de > 0).reduce((de, rl) => de + rl, 0)]).sort((se, de) => se[1] - de[1])[0]) == null ? void 0 : K[0];
              Be && (De = Be);
              break;
            }
            case "initialPlacement":
              De = a;
              break;
          }
        if (s !== De)
          return {
            reset: {
              placement: De
            }
          };
      }
      return {};
    }
  };
};
function dr(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function pr(e) {
  return ku.some((t) => e[t] >= 0);
}
const Nu = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: o = "referenceHidden",
        ...s
      } = et(e, t);
      switch (o) {
        case "referenceHidden": {
          const r = await In(t, {
            ...s,
            elementContext: "reference"
          }), i = dr(r, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: pr(i)
            }
          };
        }
        case "escaped": {
          const r = await In(t, {
            ...s,
            altBoundary: !0
          }), i = dr(r, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: pr(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Du(e, t) {
  const {
    placement: n,
    platform: o,
    elements: s
  } = e, r = await (o.isRTL == null ? void 0 : o.isRTL(s.floating)), i = tt(n), a = qt(n), l = pt(n) === "y", c = ["left", "top"].includes(i) ? -1 : 1, d = r && l ? -1 : 1, f = et(t, e);
  let {
    mainAxis: p,
    crossAxis: g,
    alignmentAxis: h
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return a && typeof h == "number" && (g = a === "end" ? h * -1 : h), l ? {
    x: g * d,
    y: p * c
  } : {
    x: p * c,
    y: g * d
  };
}
const Bu = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, o;
      const {
        x: s,
        y: r,
        placement: i,
        middlewareData: a
      } = t, l = await Du(t, e);
      return i === ((n = a.offset) == null ? void 0 : n.placement) && (o = a.arrow) != null && o.alignmentOffset ? {} : {
        x: s + l.x,
        y: r + l.y,
        data: {
          ...l,
          placement: i
        }
      };
    }
  };
}, Mu = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: o,
        placement: s
      } = t, {
        mainAxis: r = !0,
        crossAxis: i = !1,
        limiter: a = {
          fn: (k) => {
            let {
              x: $,
              y: I
            } = k;
            return {
              x: $,
              y: I
            };
          }
        },
        ...l
      } = et(e, t), c = {
        x: n,
        y: o
      }, d = await In(t, l), f = pt(tt(s)), p = $s(f);
      let g = c[p], h = c[f];
      if (r) {
        const k = p === "y" ? "top" : "left", $ = p === "y" ? "bottom" : "right", I = g + d[k], x = g - d[$];
        g = Jo(I, g, x);
      }
      if (i) {
        const k = f === "y" ? "top" : "left", $ = f === "y" ? "bottom" : "right", I = h + d[k], x = h - d[$];
        h = Jo(I, h, x);
      }
      const b = a.fn({
        ...t,
        [p]: g,
        [f]: h
      });
      return {
        ...b,
        data: {
          x: b.x - n,
          y: b.y - o,
          enabled: {
            [p]: r,
            [f]: i
          }
        }
      };
    }
  };
}, Fu = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: o,
        placement: s,
        rects: r,
        middlewareData: i
      } = t, {
        offset: a = 0,
        mainAxis: l = !0,
        crossAxis: c = !0
      } = et(e, t), d = {
        x: n,
        y: o
      }, f = pt(s), p = $s(f);
      let g = d[p], h = d[f];
      const b = et(a, t), k = typeof b == "number" ? {
        mainAxis: b,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...b
      };
      if (l) {
        const x = p === "y" ? "height" : "width", m = r.reference[p] - r.floating[x] + k.mainAxis, y = r.reference[p] + r.reference[x] - k.mainAxis;
        g < m ? g = m : g > y && (g = y);
      }
      if (c) {
        var $, I;
        const x = p === "y" ? "width" : "height", m = ["top", "left"].includes(tt(s)), y = r.reference[f] - r.floating[x] + (m && (($ = i.offset) == null ? void 0 : $[f]) || 0) + (m ? 0 : k.crossAxis), w = r.reference[f] + r.reference[x] + (m ? 0 : ((I = i.offset) == null ? void 0 : I[f]) || 0) - (m ? k.crossAxis : 0);
        h < y ? h = y : h > w && (h = w);
      }
      return {
        [p]: g,
        [f]: h
      };
    }
  };
}, Gu = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, o;
      const {
        placement: s,
        rects: r,
        platform: i,
        elements: a
      } = t, {
        apply: l = () => {
        },
        ...c
      } = et(e, t), d = await In(t, c), f = tt(s), p = qt(s), g = pt(s) === "y", {
        width: h,
        height: b
      } = r.floating;
      let k, $;
      f === "top" || f === "bottom" ? (k = f, $ = p === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : ($ = f, k = p === "end" ? "top" : "bottom");
      const I = b - d.top - d.bottom, x = h - d.left - d.right, m = dt(b - d[k], I), y = dt(h - d[$], x), w = !t.middlewareData.shift;
      let N = m, S = y;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (S = x), (o = t.middlewareData.shift) != null && o.enabled.y && (N = I), w && !p) {
        const O = Oe(d.left, 0), P = Oe(d.right, 0), G = Oe(d.top, 0), K = Oe(d.bottom, 0);
        g ? S = h - 2 * (O !== 0 || P !== 0 ? O + P : Oe(d.left, d.right)) : N = b - 2 * (G !== 0 || K !== 0 ? G + K : Oe(d.top, d.bottom));
      }
      await l({
        ...t,
        availableWidth: S,
        availableHeight: N
      });
      const D = await i.getDimensions(a.floating);
      return h !== D.width || b !== D.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Po() {
  return typeof window < "u";
}
function Xt(e) {
  return Hi(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function we(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function je(e) {
  var t;
  return (t = (Hi(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Hi(e) {
  return Po() ? e instanceof Node || e instanceof we(e).Node : !1;
}
function Fe(e) {
  return Po() ? e instanceof Element || e instanceof we(e).Element : !1;
}
function We(e) {
  return Po() ? e instanceof HTMLElement || e instanceof we(e).HTMLElement : !1;
}
function gr(e) {
  return !Po() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof we(e).ShadowRoot;
}
function wn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: o,
    display: s
  } = Ge(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + n) && !["inline", "contents"].includes(s);
}
function Hu(e) {
  return ["table", "td", "th"].includes(Xt(e));
}
function wo(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Ls(e) {
  const t = Ns(), n = Fe(e) ? Ge(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((o) => n[o] ? n[o] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((o) => (n.willChange || "").includes(o)) || ["paint", "layout", "strict", "content"].some((o) => (n.contain || "").includes(o));
}
function Uu(e) {
  let t = gt(e);
  for (; We(t) && !Ut(t); ) {
    if (Ls(t))
      return t;
    if (wo(t))
      return null;
    t = gt(t);
  }
  return null;
}
function Ns() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ut(e) {
  return ["html", "body", "#document"].includes(Xt(e));
}
function Ge(e) {
  return we(e).getComputedStyle(e);
}
function So(e) {
  return Fe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function gt(e) {
  if (Xt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    gr(e) && e.host || // Fallback.
    je(e)
  );
  return gr(t) ? t.host : t;
}
function Ui(e) {
  const t = gt(e);
  return Ut(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : We(t) && wn(t) ? t : Ui(t);
}
function kn(e, t, n) {
  var o;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const s = Ui(e), r = s === ((o = e.ownerDocument) == null ? void 0 : o.body), i = we(s);
  if (r) {
    const a = ts(i);
    return t.concat(i, i.visualViewport || [], wn(s) ? s : [], a && n ? kn(a) : []);
  }
  return t.concat(s, kn(s, [], n));
}
function ts(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function zi(e) {
  const t = Ge(e);
  let n = parseFloat(t.width) || 0, o = parseFloat(t.height) || 0;
  const s = We(e), r = s ? e.offsetWidth : n, i = s ? e.offsetHeight : o, a = ro(n) !== r || ro(o) !== i;
  return a && (n = r, o = i), {
    width: n,
    height: o,
    $: a
  };
}
function Ds(e) {
  return Fe(e) ? e : e.contextElement;
}
function Mt(e) {
  const t = Ds(e);
  if (!We(t))
    return ze(1);
  const n = t.getBoundingClientRect(), {
    width: o,
    height: s,
    $: r
  } = zi(t);
  let i = (r ? ro(n.width) : n.width) / o, a = (r ? ro(n.height) : n.height) / s;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const zu = /* @__PURE__ */ ze(0);
function Wi(e) {
  const t = we(e);
  return !Ns() || !t.visualViewport ? zu : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Wu(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== we(e) ? !1 : t;
}
function bt(e, t, n, o) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const s = e.getBoundingClientRect(), r = Ds(e);
  let i = ze(1);
  t && (o ? Fe(o) && (i = Mt(o)) : i = Mt(e));
  const a = Wu(r, n, o) ? Wi(r) : ze(0);
  let l = (s.left + a.x) / i.x, c = (s.top + a.y) / i.y, d = s.width / i.x, f = s.height / i.y;
  if (r) {
    const p = we(r), g = o && Fe(o) ? we(o) : o;
    let h = p, b = ts(h);
    for (; b && o && g !== h; ) {
      const k = Mt(b), $ = b.getBoundingClientRect(), I = Ge(b), x = $.left + (b.clientLeft + parseFloat(I.paddingLeft)) * k.x, m = $.top + (b.clientTop + parseFloat(I.paddingTop)) * k.y;
      l *= k.x, c *= k.y, d *= k.x, f *= k.y, l += x, c += m, h = we(b), b = ts(h);
    }
  }
  return ao({
    width: d,
    height: f,
    x: l,
    y: c
  });
}
function Bs(e, t) {
  const n = So(e).scrollLeft;
  return t ? t.left + n : bt(je(e)).left + n;
}
function Ki(e, t, n) {
  n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = o.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Bs(e, o)
  )), r = o.top + t.scrollTop;
  return {
    x: s,
    y: r
  };
}
function Ku(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: o,
    strategy: s
  } = e;
  const r = s === "fixed", i = je(o), a = t ? wo(t.floating) : !1;
  if (o === i || a && r)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = ze(1);
  const d = ze(0), f = We(o);
  if ((f || !f && !r) && ((Xt(o) !== "body" || wn(i)) && (l = So(o)), We(o))) {
    const g = bt(o);
    c = Mt(o), d.x = g.x + o.clientLeft, d.y = g.y + o.clientTop;
  }
  const p = i && !f && !r ? Ki(i, l, !0) : ze(0);
  return {
    width: n.width * c.x,
    height: n.height * c.y,
    x: n.x * c.x - l.scrollLeft * c.x + d.x + p.x,
    y: n.y * c.y - l.scrollTop * c.y + d.y + p.y
  };
}
function ju(e) {
  return Array.from(e.getClientRects());
}
function qu(e) {
  const t = je(e), n = So(e), o = e.ownerDocument.body, s = Oe(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), r = Oe(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let i = -n.scrollLeft + Bs(e);
  const a = -n.scrollTop;
  return Ge(o).direction === "rtl" && (i += Oe(t.clientWidth, o.clientWidth) - s), {
    width: s,
    height: r,
    x: i,
    y: a
  };
}
function Xu(e, t) {
  const n = we(e), o = je(e), s = n.visualViewport;
  let r = o.clientWidth, i = o.clientHeight, a = 0, l = 0;
  if (s) {
    r = s.width, i = s.height;
    const c = Ns();
    (!c || c && t === "fixed") && (a = s.offsetLeft, l = s.offsetTop);
  }
  return {
    width: r,
    height: i,
    x: a,
    y: l
  };
}
function Yu(e, t) {
  const n = bt(e, !0, t === "fixed"), o = n.top + e.clientTop, s = n.left + e.clientLeft, r = We(e) ? Mt(e) : ze(1), i = e.clientWidth * r.x, a = e.clientHeight * r.y, l = s * r.x, c = o * r.y;
  return {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function fr(e, t, n) {
  let o;
  if (t === "viewport")
    o = Xu(e, n);
  else if (t === "document")
    o = qu(je(e));
  else if (Fe(t))
    o = Yu(t, n);
  else {
    const s = Wi(e);
    o = {
      x: t.x - s.x,
      y: t.y - s.y,
      width: t.width,
      height: t.height
    };
  }
  return ao(o);
}
function ji(e, t) {
  const n = gt(e);
  return n === t || !Fe(n) || Ut(n) ? !1 : Ge(n).position === "fixed" || ji(n, t);
}
function Zu(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let o = kn(e, [], !1).filter((a) => Fe(a) && Xt(a) !== "body"), s = null;
  const r = Ge(e).position === "fixed";
  let i = r ? gt(e) : e;
  for (; Fe(i) && !Ut(i); ) {
    const a = Ge(i), l = Ls(i);
    !l && a.position === "fixed" && (s = null), (r ? !l && !s : !l && a.position === "static" && !!s && ["absolute", "fixed"].includes(s.position) || wn(i) && !l && ji(e, i)) ? o = o.filter((d) => d !== i) : s = a, i = gt(i);
  }
  return t.set(e, o), o;
}
function Qu(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: o,
    strategy: s
  } = e;
  const i = [...n === "clippingAncestors" ? wo(t) ? [] : Zu(t, this._c) : [].concat(n), o], a = i[0], l = i.reduce((c, d) => {
    const f = fr(t, d, s);
    return c.top = Oe(f.top, c.top), c.right = dt(f.right, c.right), c.bottom = dt(f.bottom, c.bottom), c.left = Oe(f.left, c.left), c;
  }, fr(t, a, s));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Ju(e) {
  const {
    width: t,
    height: n
  } = zi(e);
  return {
    width: t,
    height: n
  };
}
function ed(e, t, n) {
  const o = We(t), s = je(t), r = n === "fixed", i = bt(e, !0, r, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = ze(0);
  if (o || !o && !r)
    if ((Xt(t) !== "body" || wn(s)) && (a = So(t)), o) {
      const p = bt(t, !0, r, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else s && (l.x = Bs(s));
  const c = s && !o && !r ? Ki(s, a) : ze(0), d = i.left + a.scrollLeft - l.x - c.x, f = i.top + a.scrollTop - l.y - c.y;
  return {
    x: d,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Go(e) {
  return Ge(e).position === "static";
}
function hr(e, t) {
  if (!We(e) || Ge(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return je(e) === n && (n = n.ownerDocument.body), n;
}
function qi(e, t) {
  const n = we(e);
  if (wo(e))
    return n;
  if (!We(e)) {
    let s = gt(e);
    for (; s && !Ut(s); ) {
      if (Fe(s) && !Go(s))
        return s;
      s = gt(s);
    }
    return n;
  }
  let o = hr(e, t);
  for (; o && Hu(o) && Go(o); )
    o = hr(o, t);
  return o && Ut(o) && Go(o) && !Ls(o) ? n : o || Uu(e) || n;
}
const td = async function(e) {
  const t = this.getOffsetParent || qi, n = this.getDimensions, o = await n(e.floating);
  return {
    reference: ed(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: o.width,
      height: o.height
    }
  };
};
function nd(e) {
  return Ge(e).direction === "rtl";
}
const od = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ku,
  getDocumentElement: je,
  getClippingRect: Qu,
  getOffsetParent: qi,
  getElementRects: td,
  getClientRects: ju,
  getDimensions: Ju,
  getScale: Mt,
  isElement: Fe,
  isRTL: nd
};
function Xi(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function sd(e, t) {
  let n = null, o;
  const s = je(e);
  function r() {
    var a;
    clearTimeout(o), (a = n) == null || a.disconnect(), n = null;
  }
  function i(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), r();
    const c = e.getBoundingClientRect(), {
      left: d,
      top: f,
      width: p,
      height: g
    } = c;
    if (a || t(), !p || !g)
      return;
    const h = Mn(f), b = Mn(s.clientWidth - (d + p)), k = Mn(s.clientHeight - (f + g)), $ = Mn(d), x = {
      rootMargin: -h + "px " + -b + "px " + -k + "px " + -$ + "px",
      threshold: Oe(0, dt(1, l)) || 1
    };
    let m = !0;
    function y(w) {
      const N = w[0].intersectionRatio;
      if (N !== l) {
        if (!m)
          return i();
        N ? i(!1, N) : o = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      N === 1 && !Xi(c, e.getBoundingClientRect()) && i(), m = !1;
    }
    try {
      n = new IntersectionObserver(y, {
        ...x,
        // Handle <iframe>s
        root: s.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(y, x);
    }
    n.observe(e);
  }
  return i(!0), r;
}
function rd(e, t, n, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: s = !0,
    ancestorResize: r = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = o, c = Ds(e), d = s || r ? [...c ? kn(c) : [], ...kn(t)] : [];
  d.forEach(($) => {
    s && $.addEventListener("scroll", n, {
      passive: !0
    }), r && $.addEventListener("resize", n);
  });
  const f = c && a ? sd(c, n) : null;
  let p = -1, g = null;
  i && (g = new ResizeObserver(($) => {
    let [I] = $;
    I && I.target === c && g && (g.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var x;
      (x = g) == null || x.observe(t);
    })), n();
  }), c && !l && g.observe(c), g.observe(t));
  let h, b = l ? bt(e) : null;
  l && k();
  function k() {
    const $ = bt(e);
    b && !Xi(b, $) && n(), b = $, h = requestAnimationFrame(k);
  }
  return n(), () => {
    var $;
    d.forEach((I) => {
      s && I.removeEventListener("scroll", n), r && I.removeEventListener("resize", n);
    }), f?.(), ($ = g) == null || $.disconnect(), g = null, l && cancelAnimationFrame(h);
  };
}
const id = Bu, ad = Mu, ld = Lu, cd = Gu, ud = Nu, dd = Au, pd = Fu, gd = (e, t, n) => {
  const o = /* @__PURE__ */ new Map(), s = {
    platform: od,
    ...n
  }, r = {
    ...s.platform,
    _c: o
  };
  return Vu(e, t, {
    ...s,
    platform: r
  });
};
function mr(e = 0, t = 0, n = 0, o = 0) {
  if (typeof DOMRect == "function")
    return new DOMRect(e, t, n, o);
  const s = {
    x: e,
    y: t,
    width: n,
    height: o,
    top: t,
    right: e + n,
    bottom: t + o,
    left: e
  };
  return { ...s, toJSON: () => s };
}
function fd(e) {
  if (!e) return mr();
  const { x: t, y: n, width: o, height: s } = e;
  return mr(t, n, o, s);
}
function hd(e, t) {
  return {
    contextElement: ue(e) ? e : void 0,
    getBoundingClientRect: () => {
      const n = e, o = t?.(n);
      return o || !n ? fd(o) : n.getBoundingClientRect();
    }
  };
}
var Qt = (e) => ({ variable: e, reference: `var(${e})` }), Ze = {
  arrowSize: Qt("--arrow-size"),
  arrowSizeHalf: Qt("--arrow-size-half"),
  arrowBg: Qt("--arrow-background"),
  transformOrigin: Qt("--transform-origin"),
  arrowOffset: Qt("--arrow-offset")
}, md = (e) => ({
  top: "bottom center",
  "top-start": e ? `${e.x}px bottom` : "left bottom",
  "top-end": e ? `${e.x}px bottom` : "right bottom",
  bottom: "top center",
  "bottom-start": e ? `${e.x}px top` : "top left",
  "bottom-end": e ? `${e.x}px top` : "top right",
  left: "right center",
  "left-start": e ? `right ${e.y}px` : "right top",
  "left-end": e ? `right ${e.y}px` : "right bottom",
  right: "left center",
  "right-start": e ? `left ${e.y}px` : "left top",
  "right-end": e ? `left ${e.y}px` : "left bottom"
}), vd = {
  name: "transformOrigin",
  fn({ placement: e, elements: t, middlewareData: n }) {
    const { arrow: o } = n, s = md(o)[e], { floating: r } = t;
    return r.style.setProperty(Ze.transformOrigin.variable, s), {
      data: { transformOrigin: s }
    };
  }
}, yd = {
  name: "rects",
  fn({ rects: e }) {
    return {
      data: e
    };
  }
}, bd = (e) => {
  if (e)
    return {
      name: "shiftArrow",
      fn({ placement: t, middlewareData: n }) {
        if (!n.arrow) return {};
        const { x: o, y: s } = n.arrow, r = t.split("-")[0];
        return Object.assign(e.style, {
          left: o != null ? `${o}px` : "",
          top: s != null ? `${s}px` : "",
          [r]: `calc(100% + ${Ze.arrowOffset.reference})`
        }), {};
      }
    };
};
function Cd(e) {
  const [t, n] = e.split("-");
  return { side: t, align: n, hasAlign: n != null };
}
function _d(e) {
  return e.split("-")[0];
}
var Ed = {
  strategy: "absolute",
  placement: "bottom",
  listeners: !0,
  gutter: 8,
  flip: !0,
  slide: !0,
  overlap: !1,
  sameWidth: !1,
  fitViewport: !1,
  overflowPadding: 8,
  arrowPadding: 4
};
function vr(e, t) {
  const n = e.devicePixelRatio || 1;
  return Math.round(t * n) / n;
}
function Yi(e) {
  return un(e.boundary);
}
function Td(e, t) {
  if (e)
    return dd({
      element: e,
      padding: t.arrowPadding
    });
}
function Id(e, t) {
  if (!Fl(t.offset ?? t.gutter))
    return id(({ placement: n }) => {
      const o = (e?.clientHeight || 0) / 2, s = t.offset?.mainAxis ?? t.gutter, r = typeof s == "number" ? s + o : s ?? o, { hasAlign: i } = Cd(n), a = i ? void 0 : t.shift, l = t.offset?.crossAxis ?? a;
      return yo({
        crossAxis: l,
        mainAxis: r,
        alignmentAxis: t.shift
      });
    });
}
function kd(e) {
  if (e.flip)
    return ld({
      boundary: Yi(e),
      padding: e.overflowPadding,
      fallbackPlacements: e.flip === !0 ? void 0 : e.flip
    });
}
function Od(e) {
  if (!(!e.slide && !e.overlap))
    return ad({
      boundary: Yi(e),
      mainAxis: e.slide,
      crossAxis: e.overlap,
      padding: e.overflowPadding,
      limiter: pd()
    });
}
function xd(e) {
  return cd({
    padding: e.overflowPadding,
    apply({ elements: t, rects: n, availableHeight: o, availableWidth: s }) {
      const r = t.floating, i = Math.round(n.reference.width);
      s = Math.floor(s), o = Math.floor(o), r.style.setProperty("--reference-width", `${i}px`), r.style.setProperty("--available-width", `${s}px`), r.style.setProperty("--available-height", `${o}px`);
    }
  });
}
function Pd(e) {
  if (e.hideWhenDetached)
    return ud({ strategy: "referenceHidden", boundary: e.boundary?.() ?? "clippingAncestors" });
}
function wd(e) {
  return e ? e === !0 ? { ancestorResize: !0, ancestorScroll: !0, elementResize: !0, layoutShift: !0 } : e : {};
}
function Sd(e, t, n = {}) {
  const o = hd(e, n.getAnchorRect);
  if (!t || !o) return;
  const s = Object.assign({}, Ed, n), r = t.querySelector("[data-part=arrow]"), i = [
    Id(r, s),
    kd(s),
    Od(s),
    Td(r, s),
    bd(r),
    vd,
    xd(s),
    Pd(s),
    yd
  ], { placement: a, strategy: l, onComplete: c, onPositioned: d } = s, f = async () => {
    if (!o || !t) return;
    const b = await gd(o, t, {
      placement: a,
      middleware: i,
      strategy: l
    });
    c?.(b), d?.({ placed: !0 });
    const k = fe(t), $ = vr(k, b.x), I = vr(k, b.y);
    t.style.setProperty("--x", `${$}px`), t.style.setProperty("--y", `${I}px`), s.hideWhenDetached && (b.middlewareData.hide?.referenceHidden ? (t.style.setProperty("visibility", "hidden"), t.style.setProperty("pointer-events", "none")) : (t.style.removeProperty("visibility"), t.style.removeProperty("pointer-events")));
    const x = t.firstElementChild;
    if (x) {
      const m = Co(x);
      t.style.setProperty("--z-index", m.zIndex);
    }
  }, p = async () => {
    n.updatePosition ? (await n.updatePosition({ updatePosition: f }), d?.({ placed: !0 })) : await f();
  }, g = wd(s.listeners), h = s.listeners ? rd(o, t, p, g) : Hl;
  return p(), () => {
    h?.(), d?.({ placed: !1 });
  };
}
function zt(e, t, n = {}) {
  const { defer: o, ...s } = n, r = o ? U : (a) => a(), i = [];
  return i.push(
    r(() => {
      const a = typeof e == "function" ? e() : e, l = typeof t == "function" ? t() : t;
      i.push(Sd(a, l, s));
    })
  ), () => {
    i.forEach((a) => a?.());
  };
}
var Rd = {
  bottom: "rotate(45deg)",
  left: "rotate(135deg)",
  top: "rotate(225deg)",
  right: "rotate(315deg)"
};
function Ms(e = {}) {
  const { placement: t, sameWidth: n, fitViewport: o, strategy: s = "absolute" } = e;
  return {
    arrow: {
      position: "absolute",
      width: Ze.arrowSize.reference,
      height: Ze.arrowSize.reference,
      [Ze.arrowSizeHalf.variable]: `calc(${Ze.arrowSize.reference} / 2)`,
      [Ze.arrowOffset.variable]: `calc(${Ze.arrowSizeHalf.reference} * -1)`
    },
    arrowTip: {
      // @ts-expect-error - Fix this
      transform: t ? Rd[t.split("-")[0]] : void 0,
      background: Ze.arrowBg.reference,
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "inherit"
    },
    floating: {
      position: s,
      isolation: "isolate",
      minWidth: n ? void 0 : "max-content",
      width: n ? "var(--reference-width)" : void 0,
      maxWidth: o ? "var(--available-width)" : void 0,
      maxHeight: o ? "var(--available-height)" : void 0,
      pointerEvents: t ? void 0 : "none",
      top: "0px",
      left: "0px",
      // move off-screen if placement is not defined
      transform: t ? "translate3d(var(--x), var(--y), 0)" : "translate3d(0, -100vh, 0)",
      zIndex: "var(--z-index)"
    }
  };
}
function $d(e) {
  const t = {
    each(n) {
      for (let o = 0; o < e.frames?.length; o += 1) {
        const s = e.frames[o];
        s && n(s);
      }
    },
    addEventListener(n, o, s) {
      return t.each((r) => {
        try {
          r.document.addEventListener(n, o, s);
        } catch {
        }
      }), () => {
        try {
          t.removeEventListener(n, o, s);
        } catch {
        }
      };
    },
    removeEventListener(n, o, s) {
      t.each((r) => {
        try {
          r.document.removeEventListener(n, o, s);
        } catch {
        }
      });
    }
  };
  return t;
}
function Vd(e) {
  const t = e.frameElement != null ? e.parent : null;
  return {
    addEventListener: (n, o, s) => {
      try {
        t?.addEventListener(n, o, s);
      } catch {
      }
      return () => {
        try {
          t?.removeEventListener(n, o, s);
        } catch {
        }
      };
    },
    removeEventListener: (n, o, s) => {
      try {
        t?.removeEventListener(n, o, s);
      } catch {
      }
    }
  };
}
var yr = "pointerdown.outside", br = "focus.outside";
function Ad(e) {
  for (const t of e)
    if (ue(t) && Ht(t)) return !0;
  return !1;
}
var Zi = (e) => "clientY" in e;
function Ld(e, t) {
  if (!Zi(t) || !e) return !1;
  const n = e.getBoundingClientRect();
  return n.width === 0 || n.height === 0 ? !1 : n.top <= t.clientY && t.clientY <= n.top + n.height && n.left <= t.clientX && t.clientX <= n.left + n.width;
}
function Nd(e, t) {
  return e.y <= t.y && t.y <= e.y + e.height && e.x <= t.x && t.x <= e.x + e.width;
}
function Cr(e, t) {
  if (!t || !Zi(e)) return !1;
  const n = t.scrollHeight > t.clientHeight, o = n && e.clientX > t.offsetLeft + t.clientWidth, s = t.scrollWidth > t.clientWidth, r = s && e.clientY > t.offsetTop + t.clientHeight, i = {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: t.clientWidth + (n ? 16 : 0),
    height: t.clientHeight + (s ? 16 : 0)
  }, a = {
    x: e.clientX,
    y: e.clientY
  };
  return Nd(i, a) ? o || r : !1;
}
function Dd(e, t) {
  const { exclude: n, onFocusOutside: o, onPointerDownOutside: s, onInteractOutside: r, defer: i } = t;
  if (!e) return;
  const a = Ke(e), l = fe(e), c = $d(l), d = Vd(l);
  function f(I, x) {
    if (!ue(x) || !x.isConnected || Je(e, x) || Ld(e, I)) return !1;
    const m = a.querySelector(`[aria-controls="${e.id}"]`);
    if (m) {
      const w = Zo(m);
      if (Cr(I, w)) return !1;
    }
    const y = Zo(e);
    return Cr(I, y) ? !1 : !n?.(x);
  }
  const p = /* @__PURE__ */ new Set(), g = Tn(e?.getRootNode());
  function h(I) {
    function x(m) {
      const y = i && !rr() ? U : (S) => S(), w = m ?? I, N = w?.composedPath?.() ?? [w?.target];
      y(() => {
        const S = g ? N[0] : me(I);
        if (!(!e || !f(I, S))) {
          if (s || r) {
            const D = qo(s, r);
            e.addEventListener(yr, D, { once: !0 });
          }
          _r(e, yr, {
            bubbles: !1,
            cancelable: !0,
            detail: {
              originalEvent: w,
              contextmenu: _s(w),
              focusable: Ad(N),
              target: S
            }
          });
        }
      });
    }
    I.pointerType === "touch" ? (p.forEach((m) => m()), p.add(oe(a, "click", x, { once: !0 })), p.add(d.addEventListener("click", x, { once: !0 })), p.add(c.addEventListener("click", x, { once: !0 }))) : x();
  }
  const b = /* @__PURE__ */ new Set(), k = setTimeout(() => {
    b.add(oe(a, "pointerdown", h, !0)), b.add(d.addEventListener("pointerdown", h, !0)), b.add(c.addEventListener("pointerdown", h, !0));
  }, 0);
  function $(I) {
    (i ? U : (m) => m())(() => {
      const m = me(I);
      if (!(!e || !f(I, m))) {
        if (o || r) {
          const y = qo(o, r);
          e.addEventListener(br, y, { once: !0 });
        }
        _r(e, br, {
          bubbles: !1,
          cancelable: !0,
          detail: {
            originalEvent: I,
            contextmenu: !1,
            focusable: Ht(m),
            target: m
          }
        });
      }
    });
  }
  return rr() || (b.add(oe(a, "focusin", $, !0)), b.add(d.addEventListener("focusin", $, !0)), b.add(c.addEventListener("focusin", $, !0))), () => {
    clearTimeout(k), p.forEach((I) => I()), b.forEach((I) => I());
  };
}
function Bd(e, t) {
  const { defer: n } = t, o = n ? U : (r) => r(), s = [];
  return s.push(
    o(() => {
      const r = typeof e == "function" ? e() : e;
      s.push(Dd(r, t));
    })
  ), () => {
    s.forEach((r) => r?.());
  };
}
function _r(e, t, n) {
  const o = e.ownerDocument.defaultView || window, s = new o.CustomEvent(t, n);
  return e.dispatchEvent(s);
}
function Md(e, t) {
  const n = (o) => {
    o.key === "Escape" && (o.isComposing || t?.(o));
  };
  return oe(Ke(e), "keydown", n, { capture: !0 });
}
var Ie = {
  layers: [],
  branches: [],
  count() {
    return this.layers.length;
  },
  pointerBlockingLayers() {
    return this.layers.filter((e) => e.pointerBlocking);
  },
  topMostPointerBlockingLayer() {
    return [...this.pointerBlockingLayers()].slice(-1)[0];
  },
  hasPointerBlockingLayer() {
    return this.pointerBlockingLayers().length > 0;
  },
  isBelowPointerBlockingLayer(e) {
    const t = this.indexOf(e), n = this.topMostPointerBlockingLayer() ? this.indexOf(this.topMostPointerBlockingLayer()?.node) : -1;
    return t < n;
  },
  isTopMost(e) {
    return this.layers[this.count() - 1]?.node === e;
  },
  getNestedLayers(e) {
    return Array.from(this.layers).slice(this.indexOf(e) + 1);
  },
  isInNestedLayer(e, t) {
    return this.getNestedLayers(e).some((n) => Je(n.node, t));
  },
  isInBranch(e) {
    return Array.from(this.branches).some((t) => Je(t, e));
  },
  add(e) {
    const t = this.layers.push(e);
    e.node.style.setProperty("--layer-index", `${t}`);
  },
  addBranch(e) {
    this.branches.push(e);
  },
  remove(e) {
    const t = this.indexOf(e);
    t < 0 || (t < this.count() - 1 && this.getNestedLayers(e).forEach((o) => o.dismiss()), this.layers.splice(t, 1), e.style.removeProperty("--layer-index"));
  },
  removeBranch(e) {
    const t = this.branches.indexOf(e);
    t >= 0 && this.branches.splice(t, 1);
  },
  indexOf(e) {
    return this.layers.findIndex((t) => t.node === e);
  },
  dismiss(e) {
    this.layers[this.indexOf(e)]?.dismiss();
  },
  clear() {
    this.remove(this.layers[0].node);
  }
}, Er;
function Tr() {
  Ie.layers.forEach(({ node: e }) => {
    e.style.pointerEvents = Ie.isBelowPointerBlockingLayer(e) ? "none" : "auto";
  });
}
function Fd(e) {
  e.style.pointerEvents = "";
}
function Gd(e, t) {
  const n = Ke(e), o = [];
  if (Ie.hasPointerBlockingLayer() && !n.body.hasAttribute("data-inert") && (Er = document.body.style.pointerEvents, queueMicrotask(() => {
    n.body.style.pointerEvents = "none", n.body.setAttribute("data-inert", "");
  })), t) {
    const s = eu(t, (r) => {
      o.push(Di(r, { pointerEvents: "auto" }));
    });
    o.push(s);
  }
  return () => {
    Ie.hasPointerBlockingLayer() || (queueMicrotask(() => {
      n.body.style.pointerEvents = Er, n.body.removeAttribute("data-inert"), n.body.style.length === 0 && n.body.removeAttribute("style");
    }), o.forEach((s) => s()));
  };
}
function Hd(e, t) {
  const { warnOnMissingNode: n = !0 } = t;
  if (n && !e) {
    oo("[@zag-js/dismissable] node is `null` or `undefined`");
    return;
  }
  if (!e)
    return;
  const { onDismiss: o, pointerBlocking: s, exclude: r, debug: i } = t, a = { dismiss: o, node: e, pointerBlocking: s };
  Ie.add(a), Tr();
  function l(g) {
    const h = me(g.detail.originalEvent);
    Ie.isBelowPointerBlockingLayer(e) || Ie.isInBranch(h) || (t.onPointerDownOutside?.(g), t.onInteractOutside?.(g), !g.defaultPrevented && (i && console.log("onPointerDownOutside:", g.detail.originalEvent), o?.()));
  }
  function c(g) {
    const h = me(g.detail.originalEvent);
    Ie.isInBranch(h) || (t.onFocusOutside?.(g), t.onInteractOutside?.(g), !g.defaultPrevented && (i && console.log("onFocusOutside:", g.detail.originalEvent), o?.()));
  }
  function d(g) {
    Ie.isTopMost(e) && (t.onEscapeKeyDown?.(g), !g.defaultPrevented && o && (g.preventDefault(), o()));
  }
  function f(g) {
    if (!e) return !1;
    const h = typeof r == "function" ? r() : r, b = Array.isArray(h) ? h : [h], k = t.persistentElements?.map(($) => $()).filter(ue);
    return k && b.push(...k), b.some(($) => Je($, g)) || Ie.isInNestedLayer(e, g);
  }
  const p = [
    s ? Gd(e, t.persistentElements) : void 0,
    Md(e, d),
    Bd(e, { exclude: f, onFocusOutside: c, onPointerDownOutside: l, defer: t.defer })
  ];
  return () => {
    Ie.remove(e), Tr(), Fd(e), p.forEach((g) => g?.());
  };
}
function Fs(e, t) {
  const { defer: n } = t, o = n ? U : (r) => r(), s = [];
  return s.push(
    o(() => {
      const r = lt(e) ? e() : e;
      s.push(Hd(r, t));
    })
  ), () => {
    s.forEach((r) => r?.());
  };
}
function Ud(e, t = {}) {
  const { defer: n } = t, o = n ? U : (r) => r(), s = [];
  return s.push(
    o(() => {
      const r = lt(e) ? e() : e;
      if (!r) {
        oo("[@zag-js/dismissable] branch node is `null` or `undefined`");
        return;
      }
      Ie.addBranch(r), s.push(() => {
        Ie.removeBranch(r);
      });
    })
  ), () => {
    s.forEach((r) => r?.());
  };
}
var zd = Pe("hoverCard").parts("arrow", "arrowTip", "trigger", "positioner", "content"), Jt = zd.build(), Qi = (e) => e.ids?.trigger ?? `hover-card:${e.id}:trigger`, Ji = (e) => e.ids?.content ?? `hover-card:${e.id}:content`, ea = (e) => e.ids?.positioner ?? `hover-card:${e.id}:popper`, Wd = (e) => e.ids?.arrow ?? `hover-card:${e.id}:arrow`, Ho = (e) => e.getById(Qi(e)), Kd = (e) => e.getById(Ji(e)), Ir = (e) => e.getById(ea(e));
function jd(e, t) {
  const { state: n, send: o, prop: s, context: r, scope: i } = e, a = n.hasTag("open"), l = Ms({
    ...s("positioning"),
    placement: r.get("currentPlacement")
  });
  return {
    open: a,
    setOpen(c) {
      n.hasTag("open") !== c && o({ type: c ? "OPEN" : "CLOSE" });
    },
    reposition(c = {}) {
      o({ type: "POSITIONING.SET", options: c });
    },
    getArrowProps() {
      return t.element({
        id: Wd(i),
        ...Jt.arrow.attrs,
        dir: s("dir"),
        style: l.arrow
      });
    },
    getArrowTipProps() {
      return t.element({
        ...Jt.arrowTip.attrs,
        dir: s("dir"),
        style: l.arrowTip
      });
    },
    getTriggerProps() {
      return t.element({
        ...Jt.trigger.attrs,
        dir: s("dir"),
        "data-placement": r.get("currentPlacement"),
        id: Qi(i),
        "data-state": a ? "open" : "closed",
        onPointerEnter(c) {
          c.pointerType !== "touch" && o({ type: "POINTER_ENTER", src: "trigger" });
        },
        onPointerLeave(c) {
          c.pointerType !== "touch" && o({ type: "POINTER_LEAVE", src: "trigger" });
        },
        onFocus() {
          o({ type: "TRIGGER_FOCUS" });
        },
        onBlur() {
          o({ type: "TRIGGER_BLUR" });
        }
      });
    },
    getPositionerProps() {
      return t.element({
        id: ea(i),
        ...Jt.positioner.attrs,
        dir: s("dir"),
        style: l.floating
      });
    },
    getContentProps() {
      return t.element({
        ...Jt.content.attrs,
        dir: s("dir"),
        id: Ji(i),
        hidden: !a,
        tabIndex: -1,
        "data-state": a ? "open" : "closed",
        "data-placement": r.get("currentPlacement"),
        onPointerEnter(c) {
          c.pointerType !== "touch" && o({ type: "POINTER_ENTER", src: "content" });
        },
        onPointerLeave(c) {
          c.pointerType !== "touch" && o({ type: "POINTER_LEAVE", src: "content" });
        }
      });
    }
  };
}
var { not: Fn, and: kr } = nt(), qd = {
  props({ props: e }) {
    return {
      openDelay: 700,
      closeDelay: 300,
      ...e,
      positioning: {
        placement: "bottom",
        ...e.positioning
      }
    };
  },
  initialState({ prop: e }) {
    return e("open") || e("defaultOpen") ? "open" : "closed";
  },
  context({ prop: e, bindable: t }) {
    return {
      open: t(() => ({
        defaultValue: e("defaultOpen"),
        value: e("open"),
        onChange(n) {
          e("onOpenChange")?.({ open: n });
        }
      })),
      currentPlacement: t(() => ({
        defaultValue: void 0
      })),
      isPointer: t(() => ({
        defaultValue: !1
      }))
    };
  },
  watch({ track: e, context: t, action: n }) {
    e([() => t.get("open")], () => {
      n(["toggleVisibility"]);
    });
  },
  states: {
    closed: {
      tags: ["closed"],
      entry: ["clearIsPointer"],
      on: {
        "CONTROLLED.OPEN": {
          target: "open"
        },
        POINTER_ENTER: {
          target: "opening",
          actions: ["setIsPointer"]
        },
        TRIGGER_FOCUS: {
          target: "opening"
        },
        OPEN: {
          target: "opening"
        }
      }
    },
    opening: {
      tags: ["closed"],
      effects: ["waitForOpenDelay"],
      on: {
        OPEN_DELAY: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen"]
          }
        ],
        "CONTROLLED.OPEN": {
          target: "open"
        },
        "CONTROLLED.CLOSE": {
          target: "closed"
        },
        POINTER_LEAVE: [
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["invokeOnClose", "toggleVisibility"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        TRIGGER_BLUR: [
          {
            guard: kr("isOpenControlled", Fn("isPointer")),
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["invokeOnClose", "toggleVisibility"]
          },
          {
            guard: Fn("isPointer"),
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        CLOSE: [
          {
            guard: "isOpenControlled",
            // We trigger toggleVisibility manually since the `ctx.open` has not changed yet (at this point)
            actions: ["invokeOnClose", "toggleVisibility"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ]
      }
    },
    open: {
      tags: ["open"],
      effects: ["trackDismissableElement", "trackPositioning"],
      on: {
        "CONTROLLED.CLOSE": {
          target: "closed"
        },
        POINTER_ENTER: {
          actions: ["setIsPointer"]
        },
        POINTER_LEAVE: {
          target: "closing"
        },
        CLOSE: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        TRIGGER_BLUR: [
          {
            guard: kr("isOpenControlled", Fn("isPointer")),
            actions: ["invokeOnClose"]
          },
          {
            guard: Fn("isPointer"),
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "POSITIONING.SET": {
          actions: ["reposition"]
        }
      }
    },
    closing: {
      tags: ["open"],
      effects: ["trackPositioning", "waitForCloseDelay"],
      on: {
        CLOSE_DELAY: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "CONTROLLED.CLOSE": {
          target: "closed"
        },
        "CONTROLLED.OPEN": {
          target: "open"
        },
        POINTER_ENTER: {
          target: "open",
          // no need to invokeOnOpen here because it's still open (but about to close)
          actions: ["setIsPointer"]
        }
      }
    }
  },
  implementations: {
    guards: {
      isPointer: ({ context: e }) => !!e.get("isPointer"),
      isOpenControlled: ({ prop: e }) => e("open") != null
    },
    effects: {
      waitForOpenDelay({ send: e, prop: t }) {
        const n = setTimeout(() => {
          e({ type: "OPEN_DELAY" });
        }, t("openDelay"));
        return () => clearTimeout(n);
      },
      waitForCloseDelay({ send: e, prop: t }) {
        const n = setTimeout(() => {
          e({ type: "CLOSE_DELAY" });
        }, t("closeDelay"));
        return () => clearTimeout(n);
      },
      trackPositioning({ context: e, prop: t, scope: n }) {
        e.get("currentPlacement") || e.set("currentPlacement", t("positioning").placement);
        const o = () => Ir(n);
        return zt(Ho(n), o, {
          ...t("positioning"),
          defer: !0,
          onComplete(s) {
            e.set("currentPlacement", s.placement);
          }
        });
      },
      trackDismissableElement({ send: e, scope: t, prop: n }) {
        return Fs(() => Kd(t), {
          defer: !0,
          exclude: [Ho(t)],
          onDismiss() {
            e({ type: "CLOSE", src: "interact-outside" });
          },
          onInteractOutside: n("onInteractOutside"),
          onPointerDownOutside: n("onPointerDownOutside"),
          onFocusOutside(s) {
            s.preventDefault(), n("onFocusOutside")?.(s);
          }
        });
      }
    },
    actions: {
      invokeOnClose({ prop: e }) {
        e("onOpenChange")?.({ open: !1 });
      },
      invokeOnOpen({ prop: e }) {
        e("onOpenChange")?.({ open: !0 });
      },
      setIsPointer({ context: e }) {
        e.set("isPointer", !0);
      },
      clearIsPointer({ context: e }) {
        e.set("isPointer", !1);
      },
      reposition({ context: e, prop: t, scope: n, event: o }) {
        const s = () => Ir(n);
        zt(Ho(n), s, {
          ...t("positioning"),
          ...o.options,
          defer: !0,
          listeners: !1,
          onComplete(r) {
            e.set("currentPlacement", r.placement);
          }
        });
      },
      toggleVisibility({ prop: e, event: t, send: n }) {
        queueMicrotask(() => {
          n({ type: e("open") ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE", previousEvent: t });
        });
      }
    }
  }
};
ne()([
  "closeDelay",
  "dir",
  "getRootNode",
  "id",
  "ids",
  "onOpenChange",
  "defaultOpen",
  "open",
  "openDelay",
  "positioning",
  "onInteractOutside",
  "onPointerDownOutside",
  "onFocusOutside"
]);
const [Ay, He] = X("EnvironmentContext"), qe = L(() => ({
  dir: "ltr",
  locale: "en-US"
})), [Ly, Ue] = X("LocaleContext"), Xe = (e) => {
  const t = {};
  for (const [n, o] of Object.entries(e))
    o !== void 0 && (t[n] = o);
  return t;
}, Xd = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = L(() => {
    const a = ce(e);
    return {
      id: n,
      dir: s.value.dir,
      getRootNode: o?.value.getRootNode,
      ...Xe(a),
      onOpenChange: (l) => {
        t?.("openChange", l), t?.("update:open", l.open), a.onOpenChange?.(l);
      },
      onFocusOutside: (l) => {
        t?.("focusOutside", l), a.onFocusOutside?.(l);
      },
      onInteractOutside: (l) => {
        t?.("interactOutside", l), a.onInteractOutside?.(l);
      },
      onPointerDownOutside: (l) => {
        t?.("pointerDownOutside", l), a.onPointerDownOutside?.(l);
      }
    };
  }), i = Se(qd, r);
  return L(() => jd(i, Ne));
}, Yd = /* @__PURE__ */ _({
  __name: "hover-card-root",
  props: /* @__PURE__ */ ve({
    closeDelay: {},
    defaultOpen: { type: Boolean },
    id: {},
    ids: {},
    open: { type: Boolean },
    openDelay: {},
    positioning: {},
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean }
  }, {
    defaultOpen: void 0,
    open: void 0
  }),
  emits: ["focusOutside", "interactOutside", "openChange", "pointerDownOutside", "update:open"],
  setup(e, { emit: t }) {
    const n = e, s = Xd(n, t);
    return Fi(s), ft(L(() => ({ lazyMount: n.lazyMount, unmountOnExit: n.unmountOnExit }))), R(), (r, i) => E(r.$slots, "default");
  }
}), Zd = /* @__PURE__ */ _({
  __name: "hover-card-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = jt();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arrow: vu,
  ArrowTip: mu,
  Content: yu,
  Context: bu,
  Positioner: Eu,
  Root: Yd,
  RootProvider: Tu,
  Trigger: Zd
}, Symbol.toStringTag, { value: "Module" })), Qd = /* @__PURE__ */ _({
  __name: "BaseHoverCard",
  props: {
    modelValue: { type: Boolean },
    positionerStyle: {},
    positioning: {},
    openDelay: {},
    closeDelay: {},
    showArrow: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = t;
    return (o, s) => (v(), T(u(xt).Root, {
      open: o.modelValue,
      positioning: o.positioning,
      "open-delay": o.openDelay || 100,
      "close-delay": o.closeDelay || 300,
      "onUpdate:open": s[0] || (s[0] = (r) => n("update:modelValue", r))
    }, {
      default: C(() => [
        F(u(xt).Trigger, null, {
          default: C(() => [
            E(o.$slots, "trigger", {}, void 0, !0)
          ]),
          _: 3
        }),
        (v(), T(gi, { to: "body" }, [
          F(u(xt).Positioner, {
            style: En(o.positionerStyle),
            class: "hover-card"
          }, {
            default: C(() => [
              F(u(xt).Content, { class: "content-wrapper" }, {
                default: C(() => [
                  o.showArrow ? (v(), T(u(xt).Arrow, {
                    key: 0,
                    class: "arrow"
                  }, {
                    default: C(() => [
                      F(u(xt).ArrowTip, { class: "arrow-tip" })
                    ]),
                    _: 1
                  })) : Z("", !0),
                  E(o.$slots, "content", {}, void 0, !0)
                ]),
                _: 3
              })
            ]),
            _: 3
          }, 8, ["style"])
        ]))
      ]),
      _: 3
    }, 8, ["open", "positioning", "open-delay", "close-delay"]));
  }
}), Ny = /* @__PURE__ */ Q(Qd, [["__scopeId", "data-v-c3ea5903"]]), [ta, ae] = X("MenuContext"), Jd = /* @__PURE__ */ _({
  __name: "menu-arrow-tip",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getArrowTipProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), ep = /* @__PURE__ */ _({
  __name: "menu-arrow",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getArrowProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), [Gs, tp] = X("MenuItemContext"), [na, oa] = X("MenuOptionItemPropsContext"), np = /* @__PURE__ */ _({
  __name: "menu-checkbox-item",
  props: /* @__PURE__ */ ve({
    checked: { type: Boolean },
    value: {},
    disabled: { type: Boolean },
    valueText: {},
    closeOnSelect: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    checked: void 0,
    disabled: void 0,
    closeOnSelect: void 0
  }),
  emits: ["update:checked"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ae(), r = L(() => ({
      ...n,
      type: "checkbox",
      onCheckedChange: (a) => o("update:checked", a)
    })), i = L(() => s.value.getOptionItemState(r.value));
    return Gs(i), na(r), R(), (a, l) => (v(), T(u(A).div, V(u(s).getOptionItemProps(r.value), { "as-child": a.asChild }), {
      default: C(() => [
        E(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), op = /* @__PURE__ */ _({
  __name: "menu-content",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae(), n = Rs(), o = L(() => Kt(t.value.getContentProps(), n.value.presenceProps));
    return R(), (s, r) => u(n).unmounted ? Z("", !0) : (v(), T(u(A).div, V({ key: 0 }, o.value, { "as-child": s.asChild }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), sp = /* @__PURE__ */ _({
  __name: "menu-context-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getContextTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), rp = /* @__PURE__ */ _({
  __name: "menu-context",
  setup(e) {
    const t = ae();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), ip = /* @__PURE__ */ _({
  __name: "menu-indicator",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getIndicatorProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), ap = /* @__PURE__ */ _({
  __name: "menu-item-context",
  setup(e) {
    const t = tp();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), [sa, ra] = X("MenuItemGroupContext"), lp = /* @__PURE__ */ _({
  __name: "menu-item-group-label",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae(), n = ra();
    return R(), (o, s) => (v(), T(u(A).div, V(u(t).getItemGroupLabelProps({ htmlFor: u(n).id }), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), cp = /* @__PURE__ */ _({
  __name: "menu-item-group",
  props: {
    id: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ae(), o = t.id ?? Ce(), s = L(() => ({ id: o }));
    return sa(s), R(), (r, i) => (v(), T(u(A).div, V(u(n).getItemGroupProps(s.value), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), up = /* @__PURE__ */ _({
  __name: "menu-item-indicator",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae(), n = oa();
    return R(), (o, s) => (v(), T(u(A).div, V(u(t).getItemIndicatorProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), dp = /* @__PURE__ */ _({
  __name: "menu-item-text",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae(), n = oa();
    return R(), (o, s) => (v(), T(u(A).div, V(u(t).getItemTextProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), pp = /* @__PURE__ */ _({
  __name: "menu-item",
  props: /* @__PURE__ */ ve({
    value: {},
    disabled: { type: Boolean },
    valueText: {},
    closeOnSelect: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    disabled: void 0,
    closeOnSelect: void 0
  }),
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ae(), r = L(() => s.value.getItemState(n));
    return Gs(r), dl((i) => {
      const a = s.value.addItemListener({ id: r.value.id, onSelect: () => o("select") });
      i(() => a?.());
    }), R(), (i, a) => (v(), T(u(A).div, V(u(s).getItemProps(n), { "as-child": i.asChild }), {
      default: C(() => [
        E(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), gp = /* @__PURE__ */ _({
  __name: "menu-positioner",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae(), n = Oo(), o = xo(
      L(() => ({
        ...n.value,
        present: t.value.open
      }))
    );
    return ko(o), R(), (s, r) => u(o).unmounted ? Z("", !0) : (v(), T(u(A).div, V({ key: 0 }, u(t).getPositionerProps(), { "as-child": s.asChild }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), fp = /* @__PURE__ */ _({
  __name: "menu-radio-item-group",
  props: {
    id: {},
    modelValue: {},
    asChild: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ae(), r = n.id ?? Ce(), i = L(() => ({
      id: r,
      value: n.modelValue,
      onValueChange: (a) => o("update:modelValue", a.value)
    }));
    return sa(i), R(), (a, l) => (v(), T(u(A).div, V(u(s).getItemGroupProps(i.value), { "as-child": a.asChild }), {
      default: C(() => [
        E(a.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), hp = /* @__PURE__ */ _({
  __name: "menu-radio-item",
  props: /* @__PURE__ */ ve({
    value: {},
    disabled: { type: Boolean },
    valueText: {},
    closeOnSelect: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    disabled: void 0,
    closeOnSelect: void 0
  }),
  setup(e) {
    const t = e, n = ae(), o = ra(), s = L(() => ({
      ...t,
      checked: o.value.value === t.value,
      type: "radio",
      onCheckedChange: () => o.value.onValueChange?.({ value: t.value })
    })), r = L(() => n.value.getOptionItemState(s.value));
    return Gs(r), na(s), R(), (i, a) => (v(), T(u(A).div, V(u(n).getOptionItemProps(s.value), { "as-child": i.asChild }), {
      default: C(() => [
        E(i.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), [ia, aa] = X("MenuMachineContext"), [la, mp] = X("MenuTriggerItemContext"), vp = /* @__PURE__ */ _({
  __name: "menu-root-provider",
  props: {
    value: {},
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, {
      value: { machine: n, api: o }
    } = t, s = ae(), r = aa();
    return us(() => {
      r && (s.value.setChild(n), o.value.setParent(r));
    }), la(L(() => s.value.getTriggerItemProps(o.value))), ia(n), ta(o), ft(L(() => ({ lazyMount: t.lazyMount, unmountOnExit: t.unmountOnExit }))), R(), (i, a) => E(i.$slots, "default");
  }
});
var pn = (e, t) => ({ x: e, y: t });
function yp(e) {
  const { x: t, y: n, width: o, height: s } = e, r = t + o / 2, i = n + s / 2;
  return {
    x: t,
    y: n,
    width: o,
    height: s,
    minX: t,
    minY: n,
    maxX: t + o,
    maxY: n + s,
    midX: r,
    midY: i,
    center: pn(r, i)
  };
}
function bp(e) {
  const t = pn(e.minX, e.minY), n = pn(e.maxX, e.minY), o = pn(e.maxX, e.maxY), s = pn(e.minX, e.maxY);
  return { top: t, right: n, bottom: o, left: s };
}
function Cp(e, t) {
  const n = yp(e), { top: o, right: s, left: r, bottom: i } = bp(n), [a] = t.split("-");
  return {
    top: [r, o, s, i],
    right: [o, s, i, r],
    bottom: [o, r, i, s],
    left: [s, o, r, i]
  }[a];
}
function _p(e, t) {
  const { x: n, y: o } = t;
  let s = !1;
  for (let r = 0, i = e.length - 1; r < e.length; i = r++) {
    const a = e[r].x, l = e[r].y, c = e[i].x, d = e[i].y;
    l > o != d > o && n < (c - a) * (o - l) / (d - l) + a && (s = !s);
  }
  return s;
}
var Ep = Pe("menu").parts(
  "arrow",
  "arrowTip",
  "content",
  "contextTrigger",
  "indicator",
  "item",
  "itemGroup",
  "itemGroupLabel",
  "itemIndicator",
  "itemText",
  "positioner",
  "separator",
  "trigger",
  "triggerItem"
), he = Ep.build(), lo = (e) => e.ids?.trigger ?? `menu:${e.id}:trigger`, ca = (e) => e.ids?.contextTrigger ?? `menu:${e.id}:ctx-trigger`, vn = (e) => e.ids?.content ?? `menu:${e.id}:content`, Tp = (e) => e.ids?.arrow ?? `menu:${e.id}:arrow`, ua = (e) => e.ids?.positioner ?? `menu:${e.id}:popper`, Ip = (e, t) => e.ids?.group?.(t) ?? `menu:${e.id}:group:${t}`, On = (e, t) => `${e.id}/${t}`, ht = (e) => e?.dataset.value ?? null, Or = (e, t) => e.ids?.groupLabel?.(t) ?? `menu:${e.id}:group-label:${t}`, rt = (e) => e.getById(vn(e)), xr = (e) => e.getById(ua(e)), Gn = (e) => e.getById(lo(e)), da = (e, t) => t ? e.getById(On(e, t)) : null, Pr = (e) => e.getById(ca(e)), Sn = (e) => {
  const n = `[role^="menuitem"][data-ownedby=${CSS.escape(vn(e))}]:not([data-disabled])`;
  return Pn(rt(e), n);
}, kp = (e) => ps(Sn(e)), Op = (e) => gs(Sn(e)), Hs = (e, t) => t ? e.id === t || e.dataset.value === t : !1, xp = (e, t) => {
  const n = Sn(e), o = n.findIndex((s) => Hs(s, t.value));
  return Ll(n, o, { loop: t.loop ?? t.loopFocus });
}, Pp = (e, t) => {
  const n = Sn(e), o = n.findIndex((s) => Hs(s, t.value));
  return Nl(n, o, { loop: t.loop ?? t.loopFocus });
}, wp = (e, t) => {
  const n = Sn(e), o = n.find((s) => Hs(s, t.value));
  return Bi(n, { state: t.typeaheadState, key: t.key, activeId: o?.id ?? null });
}, Hn = (e) => ue(e) && (e.dataset.disabled === "" || e.hasAttribute("disabled")), Sp = (e) => !!e?.getAttribute("role")?.startsWith("menuitem") && !!e?.hasAttribute("aria-controls"), ns = "menu:select";
function Rp(e, t) {
  if (!e) return;
  const n = fe(e), o = new n.CustomEvent(ns, { detail: { value: t } });
  e.dispatchEvent(o);
}
function $p(e, t) {
  const { context: n, send: o, state: s, computed: r, prop: i, scope: a } = e, l = s.hasTag("open"), c = r("isSubmenu"), d = r("isTypingAhead"), f = i("composite"), p = n.get("currentPlacement"), g = n.get("anchorPoint"), h = n.get("highlightedValue"), b = Ms({
    ...i("positioning"),
    placement: g ? "bottom" : p
  });
  function k(m) {
    return {
      id: On(a, m.value),
      disabled: !!m.disabled,
      highlighted: h === m.value
    };
  }
  function $(m) {
    const y = m.valueText ?? m.value;
    return { ...m, id: m.value, valueText: y };
  }
  function I(m) {
    return {
      ...k($(m)),
      checked: !!m.checked
    };
  }
  function x(m) {
    const { closeOnSelect: y, valueText: w, value: N } = m, S = k(m), D = On(a, N);
    return t.element({
      ...he.item.attrs,
      id: D,
      role: "menuitem",
      "aria-disabled": mn(S.disabled),
      "data-disabled": B(S.disabled),
      "data-ownedby": vn(a),
      "data-highlighted": B(S.highlighted),
      "data-value": N,
      "data-valuetext": w,
      onDragStart(O) {
        O.currentTarget.matches("a[href]") && O.preventDefault();
      },
      onPointerMove(O) {
        if (S.disabled || O.pointerType !== "mouse") return;
        const P = O.currentTarget;
        S.highlighted || o({ type: "ITEM_POINTERMOVE", id: D, target: P, closeOnSelect: y });
      },
      onPointerLeave(O) {
        if (S.disabled || O.pointerType !== "mouse" || !e.event.previous()?.type.includes("POINTER")) return;
        const G = O.currentTarget;
        o({ type: "ITEM_POINTERLEAVE", id: D, target: G, closeOnSelect: y });
      },
      onPointerDown(O) {
        if (S.disabled) return;
        const P = O.currentTarget;
        o({ type: "ITEM_POINTERDOWN", target: P, id: D, closeOnSelect: y });
      },
      onClick(O) {
        if (Yo(O) || Xo(O) || S.disabled) return;
        const P = O.currentTarget;
        o({ type: "ITEM_CLICK", target: P, id: D, closeOnSelect: y });
      }
    });
  }
  return {
    highlightedValue: h,
    open: l,
    setOpen(m) {
      s.hasTag("open") !== m && o({ type: m ? "OPEN" : "CLOSE" });
    },
    setHighlightedValue(m) {
      o({ type: "HIGHLIGHTED.SET", value: m });
    },
    setParent(m) {
      o({ type: "PARENT.SET", value: m, id: m.prop("id") });
    },
    setChild(m) {
      o({ type: "CHILD.SET", value: m, id: m.prop("id") });
    },
    reposition(m = {}) {
      o({ type: "POSITIONING.SET", options: m });
    },
    addItemListener(m) {
      const y = a.getById(m.id);
      if (!y) return;
      const w = () => m.onSelect?.();
      return y.addEventListener(ns, w), () => y.removeEventListener(ns, w);
    },
    getContextTriggerProps() {
      return t.element({
        ...he.contextTrigger.attrs,
        dir: i("dir"),
        id: ca(a),
        onPointerDown(m) {
          if (m.pointerType === "mouse") return;
          const y = Nt(m);
          o({ type: "CONTEXT_MENU_START", point: y });
        },
        onPointerCancel(m) {
          m.pointerType !== "mouse" && o({ type: "CONTEXT_MENU_CANCEL" });
        },
        onPointerMove(m) {
          m.pointerType !== "mouse" && o({ type: "CONTEXT_MENU_CANCEL" });
        },
        onPointerUp(m) {
          m.pointerType !== "mouse" && o({ type: "CONTEXT_MENU_CANCEL" });
        },
        onContextMenu(m) {
          const y = Nt(m);
          o({ type: "CONTEXT_MENU", point: y }), m.preventDefault();
        },
        style: {
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          userSelect: "none"
        }
      });
    },
    getTriggerItemProps(m) {
      const y = m.getTriggerProps();
      return Kt(x({ value: y.id }), y);
    },
    getTriggerProps() {
      return t.button({
        ...c ? he.triggerItem.attrs : he.trigger.attrs,
        "data-placement": n.get("currentPlacement"),
        type: "button",
        dir: i("dir"),
        id: lo(a),
        "data-uid": i("id"),
        "aria-haspopup": f ? "menu" : "dialog",
        "aria-controls": vn(a),
        "aria-expanded": l || void 0,
        "data-state": l ? "open" : "closed",
        onPointerMove(m) {
          if (m.pointerType !== "mouse" || Hn(m.currentTarget) || !c) return;
          const w = Nt(m);
          o({ type: "TRIGGER_POINTERMOVE", target: m.currentTarget, point: w });
        },
        onPointerLeave(m) {
          if (Hn(m.currentTarget) || m.pointerType !== "mouse" || !c) return;
          const y = Nt(m);
          o({
            type: "TRIGGER_POINTERLEAVE",
            target: m.currentTarget,
            point: y
          });
        },
        onPointerDown(m) {
          Hn(m.currentTarget) || _s(m) || m.preventDefault();
        },
        onClick(m) {
          m.defaultPrevented || Hn(m.currentTarget) || o({ type: "TRIGGER_CLICK", target: m.currentTarget });
        },
        onBlur() {
          o({ type: "TRIGGER_BLUR" });
        },
        onFocus() {
          o({ type: "TRIGGER_FOCUS" });
        },
        onKeyDown(m) {
          if (m.defaultPrevented) return;
          const y = {
            ArrowDown() {
              o({ type: "ARROW_DOWN" });
            },
            ArrowUp() {
              o({ type: "ARROW_UP" });
            },
            Enter() {
              o({ type: "ARROW_DOWN", src: "enter" });
            },
            Space() {
              o({ type: "ARROW_DOWN", src: "space" });
            }
          }, w = yt(m, {
            orientation: "vertical",
            dir: i("dir")
          }), N = y[w];
          N && (m.preventDefault(), N(m));
        }
      });
    },
    getIndicatorProps() {
      return t.element({
        ...he.indicator.attrs,
        dir: i("dir"),
        "data-state": l ? "open" : "closed"
      });
    },
    getPositionerProps() {
      return t.element({
        ...he.positioner.attrs,
        dir: i("dir"),
        id: ua(a),
        style: b.floating
      });
    },
    getArrowProps() {
      return t.element({
        id: Tp(a),
        ...he.arrow.attrs,
        dir: i("dir"),
        style: b.arrow
      });
    },
    getArrowTipProps() {
      return t.element({
        ...he.arrowTip.attrs,
        dir: i("dir"),
        style: b.arrowTip
      });
    },
    getContentProps() {
      return t.element({
        ...he.content.attrs,
        id: vn(a),
        "aria-label": i("aria-label"),
        hidden: !l,
        "data-state": l ? "open" : "closed",
        role: f ? "menu" : "dialog",
        tabIndex: 0,
        dir: i("dir"),
        "aria-activedescendant": r("highlightedId") || void 0,
        "aria-labelledby": lo(a),
        "data-placement": p,
        onPointerEnter(m) {
          m.pointerType === "mouse" && o({ type: "MENU_POINTERENTER" });
        },
        onKeyDown(m) {
          if (m.defaultPrevented || !Cs(m)) return;
          const y = me(m);
          if (!(y?.closest("[role=menu]") === m.currentTarget || y === m.currentTarget)) return;
          if (m.key === "Tab" && !Ac(m)) {
            m.preventDefault();
            return;
          }
          const N = da(a, h), S = {
            ArrowDown() {
              o({ type: "ARROW_DOWN" });
            },
            ArrowUp() {
              o({ type: "ARROW_UP" });
            },
            ArrowLeft() {
              o({ type: "ARROW_LEFT" });
            },
            ArrowRight() {
              o({ type: "ARROW_RIGHT" });
            },
            Enter() {
              o({ type: "ENTER" }), vs(N) && i("navigate")?.({ value: h, node: N });
            },
            Space(P) {
              d ? o({ type: "TYPEAHEAD", key: P.key }) : S.Enter?.(P);
            },
            Home() {
              o({ type: "HOME" });
            },
            End() {
              o({ type: "END" });
            }
          }, D = yt(m, { dir: i("dir") }), O = S[D];
          if (O) {
            O(m), m.stopPropagation(), m.preventDefault();
            return;
          }
          i("typeahead") && yc(m) && (_c(m) || Ti(y) || (o({ type: "TYPEAHEAD", key: m.key }), m.preventDefault()));
        }
      });
    },
    getSeparatorProps() {
      return t.element({
        ...he.separator.attrs,
        role: "separator",
        dir: i("dir"),
        "aria-orientation": "horizontal"
      });
    },
    getItemState: k,
    getItemProps: x,
    getOptionItemState: I,
    getOptionItemProps(m) {
      const { type: y, disabled: w, onCheckedChange: N, closeOnSelect: S } = m, D = $(m), O = I(m);
      return {
        ...x(D),
        ...t.element({
          "data-type": y,
          ...he.item.attrs,
          dir: i("dir"),
          "data-value": D.value,
          role: `menuitem${y}`,
          "aria-checked": !!O.checked,
          "data-state": O.checked ? "checked" : "unchecked",
          onClick(P) {
            if (w || Yo(P) || Xo(P)) return;
            const G = P.currentTarget;
            o({ type: "ITEM_CLICK", target: G, option: D, closeOnSelect: S }), N?.(!O.checked);
          }
        })
      };
    },
    getItemIndicatorProps(m) {
      const y = I(m);
      return t.element({
        ...he.itemIndicator.attrs,
        dir: i("dir"),
        "data-disabled": B(y.disabled),
        "data-highlighted": B(y.highlighted),
        "data-state": y.checked ? "checked" : "unchecked",
        hidden: !y.checked
      });
    },
    getItemTextProps(m) {
      const y = I(m);
      return t.element({
        ...he.itemText.attrs,
        dir: i("dir"),
        "data-disabled": B(y.disabled),
        "data-highlighted": B(y.highlighted),
        "data-state": y.checked ? "checked" : "unchecked"
      });
    },
    getItemGroupLabelProps(m) {
      return t.element({
        ...he.itemGroupLabel.attrs,
        id: Or(a, m.htmlFor),
        dir: i("dir")
      });
    },
    getItemGroupProps(m) {
      return t.element({
        id: Ip(a, m.id),
        ...he.itemGroup.attrs,
        dir: i("dir"),
        "aria-labelledby": Or(a, m.id),
        role: "group"
      });
    }
  };
}
var { not: $e, and: Pt, or: Vp } = nt(), Ap = {
  props({ props: e }) {
    return {
      closeOnSelect: !0,
      typeahead: !0,
      composite: !0,
      loopFocus: !1,
      navigate(t) {
        xs(t.node);
      },
      ...e,
      positioning: {
        placement: "bottom-start",
        gutter: 8,
        ...e.positioning
      }
    };
  },
  initialState({ prop: e }) {
    return e("open") || e("defaultOpen") ? "open" : "idle";
  },
  context({ bindable: e, prop: t }) {
    return {
      suspendPointer: e(() => ({
        defaultValue: !1
      })),
      highlightedValue: e(() => ({
        defaultValue: t("defaultHighlightedValue") || null,
        value: t("highlightedValue"),
        onChange(n) {
          t("onHighlightChange")?.({ highlightedValue: n });
        }
      })),
      lastHighlightedValue: e(() => ({
        defaultValue: null
      })),
      currentPlacement: e(() => ({
        defaultValue: void 0
      })),
      intentPolygon: e(() => ({
        defaultValue: null
      })),
      anchorPoint: e(() => ({
        defaultValue: null,
        hash(n) {
          return `x: ${n?.x}, y: ${n?.y}`;
        }
      }))
    };
  },
  refs() {
    return {
      parent: null,
      children: {},
      typeaheadState: { ...Bi.defaultOptions },
      positioningOverride: {}
    };
  },
  computed: {
    isSubmenu: ({ refs: e }) => e.get("parent") != null,
    isRtl: ({ prop: e }) => e("dir") === "rtl",
    isTypingAhead: ({ refs: e }) => e.get("typeaheadState").keysSoFar !== "",
    highlightedId: ({ context: e, scope: t, refs: n }) => Np(n.get("children"), e.get("highlightedValue"), t)
  },
  watch({ track: e, action: t, context: n, computed: o, prop: s }) {
    e([() => o("isSubmenu")], () => {
      t(["setSubmenuPlacement"]);
    }), e([() => n.hash("anchorPoint")], () => {
      t(["reposition"]);
    }), e([() => s("open")], () => {
      t(["toggleVisibility"]);
    });
  },
  on: {
    "PARENT.SET": {
      actions: ["setParentMenu"]
    },
    "CHILD.SET": {
      actions: ["setChildMenu"]
    },
    OPEN: [
      {
        guard: "isOpenControlled",
        actions: ["invokeOnOpen"]
      },
      {
        target: "open",
        actions: ["invokeOnOpen"]
      }
    ],
    OPEN_AUTOFOCUS: [
      {
        guard: "isOpenControlled",
        actions: ["invokeOnOpen"]
      },
      {
        // internal: true,
        target: "open",
        actions: ["highlightFirstItem", "invokeOnOpen"]
      }
    ],
    CLOSE: [
      {
        guard: "isOpenControlled",
        actions: ["invokeOnClose"]
      },
      {
        target: "closed",
        actions: ["invokeOnClose"]
      }
    ],
    "HIGHLIGHTED.RESTORE": {
      actions: ["restoreHighlightedItem"]
    },
    "HIGHLIGHTED.SET": {
      actions: ["setHighlightedItem"]
    }
  },
  states: {
    idle: {
      tags: ["closed"],
      on: {
        "CONTROLLED.OPEN": {
          target: "open"
        },
        "CONTROLLED.CLOSE": {
          target: "closed"
        },
        CONTEXT_MENU_START: {
          target: "opening:contextmenu",
          actions: ["setAnchorPoint"]
        },
        CONTEXT_MENU: [
          {
            guard: "isOpenControlled",
            actions: ["setAnchorPoint", "invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setAnchorPoint", "invokeOnOpen"]
          }
        ],
        TRIGGER_CLICK: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen"]
          }
        ],
        TRIGGER_FOCUS: {
          guard: $e("isSubmenu"),
          target: "closed"
        },
        TRIGGER_POINTERMOVE: {
          guard: "isSubmenu",
          target: "opening"
        }
      }
    },
    "opening:contextmenu": {
      tags: ["closed"],
      effects: ["waitForLongPress"],
      on: {
        "CONTROLLED.OPEN": { target: "open" },
        "CONTROLLED.CLOSE": { target: "closed" },
        CONTEXT_MENU_CANCEL: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "LONG_PRESS.OPEN": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen"]
          }
        ]
      }
    },
    opening: {
      tags: ["closed"],
      effects: ["waitForOpenDelay"],
      on: {
        "CONTROLLED.OPEN": {
          target: "open"
        },
        "CONTROLLED.CLOSE": {
          target: "closed"
        },
        BLUR: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        TRIGGER_POINTERLEAVE: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        "DELAY.OPEN": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen"]
          }
        ]
      }
    },
    closing: {
      tags: ["open"],
      effects: ["trackPointerMove", "trackInteractOutside", "waitForCloseDelay"],
      on: {
        "CONTROLLED.OPEN": {
          target: "open"
        },
        "CONTROLLED.CLOSE": {
          target: "closed",
          actions: ["focusParentMenu", "restoreParentHighlightedItem"]
        },
        // don't invoke on open here since the menu is still open (we're only keeping it open)
        MENU_POINTERENTER: {
          target: "open",
          actions: ["clearIntentPolygon"]
        },
        POINTER_MOVED_AWAY_FROM_SUBMENU: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["focusParentMenu", "restoreParentHighlightedItem"]
          }
        ],
        "DELAY.CLOSE": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "closed",
            actions: ["focusParentMenu", "restoreParentHighlightedItem", "invokeOnClose"]
          }
        ]
      }
    },
    closed: {
      tags: ["closed"],
      entry: ["clearHighlightedItem", "focusTrigger", "resumePointer"],
      on: {
        "CONTROLLED.OPEN": [
          {
            guard: Vp("isOpenAutoFocusEvent", "isArrowDownEvent"),
            target: "open",
            actions: ["highlightFirstItem"]
          },
          {
            guard: "isArrowUpEvent",
            target: "open",
            actions: ["highlightLastItem"]
          },
          {
            target: "open"
          }
        ],
        CONTEXT_MENU_START: {
          target: "opening:contextmenu",
          actions: ["setAnchorPoint"]
        },
        CONTEXT_MENU: [
          {
            guard: "isOpenControlled",
            actions: ["setAnchorPoint", "invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["setAnchorPoint", "invokeOnOpen"]
          }
        ],
        TRIGGER_CLICK: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["invokeOnOpen"]
          }
        ],
        TRIGGER_POINTERMOVE: {
          guard: "isTriggerItem",
          target: "opening"
        },
        TRIGGER_BLUR: { target: "idle" },
        ARROW_DOWN: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["highlightFirstItem", "invokeOnOpen"]
          }
        ],
        ARROW_UP: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "open",
            actions: ["highlightLastItem", "invokeOnOpen"]
          }
        ]
      }
    },
    open: {
      tags: ["open"],
      effects: ["trackInteractOutside", "trackPositioning", "scrollToHighlightedItem"],
      entry: ["focusMenu", "resumePointer"],
      on: {
        "CONTROLLED.CLOSE": [
          {
            target: "closed",
            guard: "isArrowLeftEvent",
            actions: ["focusParentMenu"]
          },
          {
            target: "closed"
          }
        ],
        TRIGGER_CLICK: [
          {
            guard: Pt($e("isTriggerItem"), "isOpenControlled"),
            actions: ["invokeOnClose"]
          },
          {
            guard: $e("isTriggerItem"),
            target: "closed",
            actions: ["invokeOnClose"]
          }
        ],
        CONTEXT_MENU: {
          actions: ["setAnchorPoint", "focusMenu"]
        },
        ARROW_UP: {
          actions: ["highlightPrevItem", "focusMenu"]
        },
        ARROW_DOWN: {
          actions: ["highlightNextItem", "focusMenu"]
        },
        ARROW_LEFT: [
          {
            guard: Pt("isSubmenu", "isOpenControlled"),
            actions: ["invokeOnClose"]
          },
          {
            guard: "isSubmenu",
            target: "closed",
            actions: ["focusParentMenu", "invokeOnClose"]
          }
        ],
        HOME: {
          actions: ["highlightFirstItem", "focusMenu"]
        },
        END: {
          actions: ["highlightLastItem", "focusMenu"]
        },
        ARROW_RIGHT: {
          guard: "isTriggerItemHighlighted",
          actions: ["openSubmenu"]
        },
        ENTER: [
          {
            guard: "isTriggerItemHighlighted",
            actions: ["openSubmenu"]
          },
          {
            actions: ["clickHighlightedItem"]
          }
        ],
        ITEM_POINTERMOVE: [
          {
            guard: $e("isPointerSuspended"),
            actions: ["setHighlightedItem", "focusMenu"]
          },
          {
            actions: ["setLastHighlightedItem"]
          }
        ],
        ITEM_POINTERLEAVE: {
          guard: Pt($e("isPointerSuspended"), $e("isTriggerItem")),
          actions: ["clearHighlightedItem"]
        },
        ITEM_CLICK: [
          // == grouped ==
          {
            guard: Pt(
              $e("isTriggerItemHighlighted"),
              $e("isHighlightedItemEditable"),
              "closeOnSelect",
              "isOpenControlled"
            ),
            actions: ["invokeOnSelect", "setOptionState", "closeRootMenu", "invokeOnClose"]
          },
          {
            guard: Pt($e("isTriggerItemHighlighted"), $e("isHighlightedItemEditable"), "closeOnSelect"),
            target: "closed",
            actions: ["invokeOnSelect", "setOptionState", "closeRootMenu", "invokeOnClose"]
          },
          //
          {
            guard: Pt($e("isTriggerItemHighlighted"), $e("isHighlightedItemEditable")),
            actions: ["invokeOnSelect", "setOptionState"]
          },
          { actions: ["setHighlightedItem"] }
        ],
        TRIGGER_POINTERMOVE: {
          guard: "isTriggerItem",
          actions: ["setIntentPolygon"]
        },
        TRIGGER_POINTERLEAVE: {
          target: "closing"
        },
        ITEM_POINTERDOWN: {
          actions: ["setHighlightedItem"]
        },
        TYPEAHEAD: {
          actions: ["highlightMatchedItem"]
        },
        FOCUS_MENU: {
          actions: ["focusMenu"]
        },
        "POSITIONING.SET": {
          actions: ["reposition"]
        }
      }
    }
  },
  implementations: {
    guards: {
      closeOnSelect: ({ prop: e, event: t }) => !!(t?.closeOnSelect ?? e("closeOnSelect")),
      // whether the trigger is also a menu item
      isTriggerItem: ({ event: e }) => Sp(e.target),
      // whether the trigger item is the active item
      isTriggerItemHighlighted: ({ event: e, scope: t, computed: n }) => !!(e.target ?? t.getById(n("highlightedId")))?.hasAttribute("aria-controls"),
      isSubmenu: ({ computed: e }) => e("isSubmenu"),
      isPointerSuspended: ({ context: e }) => e.get("suspendPointer"),
      isHighlightedItemEditable: ({ scope: e, computed: t }) => Ti(e.getById(t("highlightedId"))),
      // guard assertions (for controlled mode)
      isOpenControlled: ({ prop: e }) => e("open") !== void 0,
      isArrowLeftEvent: ({ event: e }) => e.previousEvent?.type === "ARROW_LEFT",
      isArrowUpEvent: ({ event: e }) => e.previousEvent?.type === "ARROW_UP",
      isArrowDownEvent: ({ event: e }) => e.previousEvent?.type === "ARROW_DOWN",
      isOpenAutoFocusEvent: ({ event: e }) => e.previousEvent?.type === "OPEN_AUTOFOCUS"
    },
    effects: {
      waitForOpenDelay({ send: e }) {
        const t = setTimeout(() => {
          e({ type: "DELAY.OPEN" });
        }, 100);
        return () => clearTimeout(t);
      },
      waitForCloseDelay({ send: e }) {
        const t = setTimeout(() => {
          e({ type: "DELAY.CLOSE" });
        }, 300);
        return () => clearTimeout(t);
      },
      waitForLongPress({ send: e }) {
        const t = setTimeout(() => {
          e({ type: "LONG_PRESS.OPEN" });
        }, 700);
        return () => clearTimeout(t);
      },
      trackPositioning({ context: e, prop: t, scope: n, refs: o }) {
        if (Pr(n)) return;
        const s = {
          ...t("positioning"),
          ...o.get("positioningOverride")
        };
        e.set("currentPlacement", s.placement);
        const r = () => xr(n);
        return zt(Gn(n), r, {
          ...s,
          defer: !0,
          onComplete(i) {
            e.set("currentPlacement", i.placement);
          }
        });
      },
      trackInteractOutside({ refs: e, scope: t, prop: n, computed: o, send: s }) {
        const r = () => rt(t);
        let i = !0;
        return Fs(r, {
          defer: !0,
          exclude: [Gn(t)],
          onInteractOutside: n("onInteractOutside"),
          onFocusOutside: n("onFocusOutside"),
          onEscapeKeyDown(a) {
            n("onEscapeKeyDown")?.(a), o("isSubmenu") && a.preventDefault(), wr({ parent: e.get("parent") });
          },
          onPointerDownOutside(a) {
            const l = me(a.detail.originalEvent);
            if (Je(Pr(t), l) && a.detail.contextmenu) {
              a.preventDefault();
              return;
            }
            i = !a.detail.focusable, n("onPointerDownOutside")?.(a);
          },
          onDismiss() {
            s({ type: "CLOSE", src: "interact-outside", restoreFocus: i });
          }
        });
      },
      trackPointerMove({ context: e, scope: t, send: n, refs: o, flush: s }) {
        const r = o.get("parent");
        s(() => {
          r.context.set("suspendPointer", !0);
        });
        const i = t.getDoc();
        return oe(i, "pointermove", (a) => {
          Lp(e.get("intentPolygon"), {
            x: a.clientX,
            y: a.clientY
          }) || (n({ type: "POINTER_MOVED_AWAY_FROM_SUBMENU" }), r.context.set("suspendPointer", !1));
        });
      },
      scrollToHighlightedItem({ event: e, scope: t, computed: n }) {
        const o = () => {
          if (e.type.startsWith("ITEM_POINTER")) return;
          const r = t.getById(n("highlightedId")), i = rt(t);
          Ri(r, { rootEl: i, block: "nearest" });
        };
        return U(() => o()), wi(() => rt(t), {
          defer: !0,
          attributes: ["aria-activedescendant"],
          callback: o
        });
      }
    },
    actions: {
      setAnchorPoint({ context: e, event: t }) {
        e.set("anchorPoint", t.point);
      },
      setSubmenuPlacement({ computed: e, refs: t }) {
        if (!e("isSubmenu")) return;
        const n = e("isRtl") ? "left-start" : "right-start";
        t.set("positioningOverride", { placement: n, gutter: 0 });
      },
      reposition({ context: e, scope: t, prop: n, event: o, refs: s }) {
        const r = () => xr(t), i = e.get("anchorPoint"), a = i ? () => ({ width: 0, height: 0, ...i }) : void 0, l = {
          ...n("positioning"),
          ...s.get("positioningOverride")
        };
        zt(Gn(t), r, {
          ...l,
          defer: !0,
          getAnchorRect: a,
          ...o.options ?? {},
          listeners: !1,
          onComplete(c) {
            e.set("currentPlacement", c.placement);
          }
        });
      },
      setOptionState({ event: e }) {
        if (!e.option) return;
        const { checked: t, onCheckedChange: n, type: o } = e.option;
        o === "radio" ? n?.(!0) : o === "checkbox" && n?.(!t);
      },
      clickHighlightedItem({ scope: e, computed: t }) {
        const n = e.getById(t("highlightedId"));
        !n || n.dataset.disabled || queueMicrotask(() => n.click());
      },
      setIntentPolygon({ context: e, scope: t, event: n }) {
        const o = rt(t), s = e.get("currentPlacement");
        if (!o || !s) return;
        const r = o.getBoundingClientRect(), i = Cp(r, s);
        if (!i) return;
        const l = _d(s) === "right" ? -5 : 5;
        e.set("intentPolygon", [{ ...n.point, x: n.point.x + l }, ...i]);
      },
      clearIntentPolygon({ context: e }) {
        e.set("intentPolygon", null);
      },
      resumePointer({ refs: e, flush: t }) {
        const n = e.get("parent");
        n && t(() => {
          n.context.set("suspendPointer", !1);
        });
      },
      setHighlightedItem({ context: e, event: t }) {
        const n = t.value || ht(t.target);
        e.set("highlightedValue", n);
      },
      clearHighlightedItem({ context: e }) {
        e.set("highlightedValue", null);
      },
      focusMenu({ scope: e }) {
        U(() => {
          const t = rt(e);
          Vc({
            root: t,
            enabled: !Je(t, e.getActiveElement()),
            filter(o) {
              return !o.role?.startsWith("menuitem");
            }
          })?.focus({ preventScroll: !0 });
        });
      },
      highlightFirstItem({ context: e, scope: t }) {
        (rt(t) ? queueMicrotask : U)(() => {
          const o = kp(t);
          o && e.set("highlightedValue", ht(o));
        });
      },
      highlightLastItem({ context: e, scope: t }) {
        (rt(t) ? queueMicrotask : U)(() => {
          const o = Op(t);
          o && e.set("highlightedValue", ht(o));
        });
      },
      highlightNextItem({ context: e, scope: t, event: n, prop: o }) {
        const s = xp(t, {
          loop: n.loop,
          value: e.get("highlightedValue"),
          loopFocus: o("loopFocus")
        });
        e.set("highlightedValue", ht(s));
      },
      highlightPrevItem({ context: e, scope: t, event: n, prop: o }) {
        const s = Pp(t, {
          loop: n.loop,
          value: e.get("highlightedValue"),
          loopFocus: o("loopFocus")
        });
        e.set("highlightedValue", ht(s));
      },
      invokeOnSelect({ context: e, prop: t, scope: n }) {
        const o = e.get("highlightedValue");
        if (o == null) return;
        const s = da(n, o);
        Rp(s, o), t("onSelect")?.({ value: o });
      },
      focusTrigger({ scope: e, context: t, event: n, computed: o }) {
        o("isSubmenu") || t.get("anchorPoint") || n.restoreFocus === !1 || queueMicrotask(() => Gn(e)?.focus({ preventScroll: !0 }));
      },
      highlightMatchedItem({ scope: e, context: t, event: n, refs: o }) {
        const s = wp(e, {
          key: n.key,
          value: t.get("highlightedValue"),
          typeaheadState: o.get("typeaheadState")
        });
        s && t.set("highlightedValue", ht(s));
      },
      setParentMenu({ refs: e, event: t }) {
        e.set("parent", t.value);
      },
      setChildMenu({ refs: e, event: t }) {
        const n = e.get("children");
        n[t.id] = t.value, e.set("children", n);
      },
      closeRootMenu({ refs: e }) {
        wr({ parent: e.get("parent") });
      },
      openSubmenu({ refs: e, scope: t, computed: n }) {
        const s = t.getById(n("highlightedId"))?.getAttribute("data-uid"), r = e.get("children");
        (s ? r[s] : null)?.send({ type: "OPEN_AUTOFOCUS" });
      },
      focusParentMenu({ refs: e }) {
        e.get("parent")?.send({ type: "FOCUS_MENU" });
      },
      setLastHighlightedItem({ context: e, event: t }) {
        e.set("lastHighlightedValue", ht(t.target));
      },
      restoreHighlightedItem({ context: e }) {
        e.get("lastHighlightedValue") && (e.set("highlightedValue", e.get("lastHighlightedValue")), e.set("lastHighlightedValue", null));
      },
      restoreParentHighlightedItem({ refs: e }) {
        e.get("parent")?.send({ type: "HIGHLIGHTED.RESTORE" });
      },
      invokeOnOpen({ prop: e }) {
        e("onOpenChange")?.({ open: !0 });
      },
      invokeOnClose({ prop: e }) {
        e("onOpenChange")?.({ open: !1 });
      },
      toggleVisibility({ prop: e, event: t, send: n }) {
        n({
          type: e("open") ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE",
          previousEvent: t
        });
      }
    }
  }
};
function wr(e) {
  let t = e.parent;
  for (; t && t.computed("isSubmenu"); )
    t = t.refs.get("parent");
  t?.send({ type: "CLOSE" });
}
function Lp(e, t) {
  return e ? _p(e, t) : !1;
}
function Np(e, t, n) {
  const o = Object.keys(e).length > 0;
  if (!t) return null;
  if (!o)
    return On(n, t);
  for (const s in e) {
    const r = e[s], i = lo(r.scope);
    if (i === t)
      return i;
  }
  return On(n, t);
}
ne()([
  "anchorPoint",
  "aria-label",
  "closeOnSelect",
  "composite",
  "defaultHighlightedValue",
  "defaultOpen",
  "dir",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "loopFocus",
  "navigate",
  "onEscapeKeyDown",
  "onFocusOutside",
  "onHighlightChange",
  "onInteractOutside",
  "onOpenChange",
  "onPointerDownOutside",
  "onSelect",
  "open",
  "positioning",
  "typeahead"
]);
ne()(["closeOnSelect", "disabled", "value", "valueText"]);
ne()(["htmlFor"]);
ne()(["id"]);
ne()([
  "checked",
  "closeOnSelect",
  "disabled",
  "onCheckedChange",
  "type",
  "value",
  "valueText"
]);
const Dp = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = L(() => {
    const l = ce(e);
    return {
      id: n,
      dir: s.value.dir,
      getRootNode: o?.value.getRootNode,
      ...Xe(l),
      onOpenChange: (c) => {
        t?.("openChange", c), t?.("update:open", c.open), l.onOpenChange?.(c);
      },
      onEscapeKeyDown: (c) => {
        t?.("escapeKeyDown", c), l.onEscapeKeyDown?.(c);
      },
      onFocusOutside: (c) => {
        t?.("focusOutside", c), l.onFocusOutside?.(c);
      },
      onHighlightChange: (c) => {
        t?.("highlightChange", c), t?.("update:highlightedValue", c.highlightedValue), l.onHighlightChange?.(c);
      },
      onInteractOutside: (c) => {
        t?.("interactOutside", c), l.onInteractOutside?.(c);
      },
      onPointerDownOutside: (c) => {
        t?.("pointerDownOutside", c), l.onPointerDownOutside?.(c);
      },
      onSelect: (c) => {
        t?.("select", c), l.onSelect?.(c);
      }
    };
  }), i = Se(Ap, r);
  return {
    api: L(() => $p(i, Ne)),
    machine: i
  };
}, Bp = /* @__PURE__ */ _({
  __name: "menu-root",
  props: /* @__PURE__ */ ve({
    anchorPoint: {},
    "aria-label": {},
    closeOnSelect: { type: Boolean },
    composite: { type: Boolean },
    defaultHighlightedValue: {},
    defaultOpen: { type: Boolean },
    highlightedValue: {},
    id: {},
    ids: {},
    loopFocus: { type: Boolean },
    navigate: { type: Function },
    open: { type: Boolean },
    positioning: {},
    typeahead: { type: Boolean },
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    closeOnSelect: void 0,
    composite: void 0,
    defaultOpen: void 0,
    loopFocus: void 0,
    open: void 0,
    typeahead: void 0
  }),
  emits: ["escapeKeyDown", "focusOutside", "highlightChange", "interactOutside", "openChange", "pointerDownOutside", "select", "update:open", "update:highlightedValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, { api: s, machine: r } = Dp(n, o), i = ae(), a = aa();
    return us(() => {
      a && (i.value.setChild(r), s.value.setParent(a));
    }), la(L(() => i.value.getTriggerItemProps(s.value))), ia(r), ta(s), ft(L(() => ({ lazyMount: n.lazyMount, unmountOnExit: n.unmountOnExit }))), R(), (l, c) => E(l.$slots, "default");
  }
}), Mp = /* @__PURE__ */ _({
  __name: "menu-separator",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae();
    return R(), (n, o) => (v(), T(u(A).hr, V(u(t).getSeparatorProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Fp = /* @__PURE__ */ _({
  __name: "menu-trigger-item",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = mp();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Gp = /* @__PURE__ */ _({
  __name: "menu-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ae();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Arrow: ep,
  ArrowTip: Jd,
  CheckboxItem: np,
  Content: op,
  Context: rp,
  ContextTrigger: sp,
  Indicator: ip,
  Item: pp,
  ItemContext: ap,
  ItemGroup: cp,
  ItemGroupLabel: lp,
  ItemIndicator: up,
  ItemText: dp,
  Positioner: gp,
  RadioItem: hp,
  RadioItemGroup: fp,
  Root: Bp,
  RootProvider: vp,
  Separator: Mp,
  Trigger: Gp,
  TriggerItem: Fp
}, Symbol.toStringTag, { value: "Module" })), Hp = /* @__PURE__ */ _({
  __name: "BaseMenu",
  props: {
    items: {
      type: Array,
      required: !0
    },
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey: {
      type: String,
      default: "value"
    },
    showTriggerIndicator: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    return (t, n) => (v(), T(u(wt).Root, null, {
      default: C(() => [
        F(u(wt).Trigger, { class: "menu-trigger" }, {
          default: C(() => [
            E(t.$slots, "trigger", {}, void 0, !0),
            e.showTriggerIndicator ? (v(), T(u(wt).Indicator, {
              key: 0,
              class: "menu-indicator"
            }, {
              default: C(() => n[0] || (n[0] = [
                ee("▼")
              ])),
              _: 1
            })) : Z("", !0)
          ]),
          _: 3
        }),
        F(u(wt).Positioner, null, {
          default: C(() => [
            F(u(wt).Content, { class: "menu-content" }, {
              default: C(() => [
                (v(!0), M(re, null, xe(e.items, (o) => (v(), T(u(wt).Item, {
                  key: o[e.labelKey],
                  value: o[e.valueKey],
                  class: "menu-item"
                }, {
                  default: C(() => [
                    E(t.$slots, "default", { item: o }, () => [
                      ee(W(o[e.labelKey]), 1)
                    ], !0)
                  ]),
                  _: 2
                }, 1032, ["value"]))), 128))
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }));
  }
}), Dy = /* @__PURE__ */ Q(Hp, [["__scopeId", "data-v-ade0c28b"]]), Up = { class: "base-table-wrapper" }, zp = {
  key: 0,
  class: "base-table"
}, Wp = ["onClick"], Kp = ["onInput", "textContent"], jp = {
  key: 1,
  class: "table-empty-state"
}, qp = {
  key: 2,
  class: "table-loading-state"
}, Xp = /* @__PURE__ */ _({
  __name: "BaseTable",
  props: {
    columns: {},
    data: {},
    isEditable: { type: Boolean, default: !1 },
    isLoading: { type: Boolean, default: !1 },
    emptyStateMessage: { default: "No data available" }
  },
  emits: ["columnSort", "update:rows"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = L(() => n.data.length > 0);
    function r(l) {
      l.sortable && o("columnSort", l);
    }
    function i(l, c, d, f) {
      const g = l.target.textContent?.trim() ?? "", h = [...n.data];
      h[f] = { ...c, [d.key]: g }, o("update:rows", h);
    }
    function a(l) {
      l.preventDefault();
      const c = l.clipboardData?.getData("text/plain") ?? "";
      document.execCommand("insertText", !1, c);
    }
    return (l, c) => (v(), M("div", Up, [
      s.value ? (v(), M("table", zp, [
        H("thead", null, [
          H("tr", null, [
            (v(!0), M(re, null, xe(l.columns, (d) => (v(), M("th", {
              key: d.key,
              class: ie([
                `text-${d.align || "left"}`,
                { "is-sortable": d.sortable }
              ]),
              onClick: (f) => r(d)
            }, [
              d.type === "custom" ? E(l.$slots, `header-${d.key}`, {
                key: 0,
                column: d
              }, () => [
                ee(W(d.label), 1)
              ], !0) : (v(), M(re, { key: 1 }, [
                ee(W(d.label), 1)
              ], 64))
            ], 10, Wp))), 128))
          ])
        ]),
        H("tbody", null, [
          (v(!0), M(re, null, xe(l.data, (d, f) => (v(), M("tr", {
            key: d.id ?? f,
            class: ie(d.rowClass)
          }, [
            (v(!0), M(re, null, xe(l.columns, (p) => (v(), M("td", {
              key: p.key,
              class: ie([
                `text-${p.align || "left"}`,
                p.class,
                { "is-editable": l.isEditable && p.editable !== !1 }
              ])
            }, [
              E(l.$slots, `cell-${p.key}`, {
                row: d,
                column: p
              }, () => [
                l.isEditable && p.editable !== !1 ? (v(), M("div", {
                  key: 0,
                  contenteditable: "",
                  class: "editable-cell",
                  onInput: (g) => i(g, d, p, f),
                  onPaste: a,
                  textContent: W(d[p.key])
                }, null, 40, Kp)) : (v(), M(re, { key: 1 }, [
                  ee(W(d[p.key]), 1)
                ], 64))
              ], !0)
            ], 2))), 128))
          ], 2))), 128))
        ])
      ])) : l.isLoading ? l.isLoading ? (v(), M("div", qp, [
        E(l.$slots, "loading", {}, () => [
          c[0] || (c[0] = ee("Loading..."))
        ], !0)
      ])) : Z("", !0) : (v(), M("div", jp, [
        E(l.$slots, "empty", {}, () => [
          ee(W(l.emptyStateMessage), 1)
        ], !0)
      ]))
    ]));
  }
}), By = /* @__PURE__ */ Q(Xp, [["__scopeId", "data-v-63d6dec3"]]), [pa, Rn] = X("TabsContext"), Yp = /* @__PURE__ */ _({
  __name: "presence",
  props: /* @__PURE__ */ ve({
    immediate: { type: Boolean },
    lazyMount: { type: Boolean },
    present: { type: Boolean },
    skipAnimationOnMount: { type: Boolean },
    unmountOnExit: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    immediate: void 0,
    lazyMount: void 0,
    present: void 0,
    skipAnimationOnMount: void 0,
    unmountOnExit: void 0
  }),
  emits: ["exitComplete"],
  setup(e, { emit: t }) {
    const s = xo(e, t);
    return ko(s), R(), (r, i) => u(s).unmounted ? Z("", !0) : (v(), T(u(A).div, V({ key: 0 }, u(s).presenceProps, {
      "as-child": r.asChild,
      "data-scope": "presence",
      "data-part": "root"
    }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Zp = /* @__PURE__ */ _({
  __name: "tab-content",
  props: {
    value: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Rn(), o = Oo();
    return R(), (s, r) => (v(), T(u(Yp), V(u(n).getContentProps(t), {
      present: u(n).value === t.value,
      "lazy-mount": u(o).lazyMount,
      "unmount-on-exit": u(o).unmountOnExit,
      immediate: !0
    }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["present", "lazy-mount", "unmount-on-exit"]));
  }
}), Qp = /* @__PURE__ */ _({
  __name: "tab-indicator",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Rn();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getIndicatorProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Jp = /* @__PURE__ */ _({
  __name: "tab-list",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Rn();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getListProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), eg = /* @__PURE__ */ _({
  __name: "tab-trigger",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Rn();
    return R(), (o, s) => (v(), T(u(A).button, V(u(n).getTriggerProps(t), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), tg = /* @__PURE__ */ _({
  __name: "tabs-context",
  setup(e) {
    const t = Rn();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), ng = /* @__PURE__ */ _({
  __name: "tabs-root-provider",
  props: {
    value: {},
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return pa(n), ft(L(() => ({ lazyMount: t.lazyMount, unmountOnExit: t.unmountOnExit }))), R(), (o, s) => (v(), T(u(A).div, V(n.value.getRootProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
});
var og = Pe("tabs").parts("root", "list", "trigger", "content", "indicator"), en = og.build(), sg = (e) => e.ids?.root ?? `tabs:${e.id}`, yn = (e) => e.ids?.list ?? `tabs:${e.id}:list`, os = (e, t) => e.ids?.content ?? `tabs:${e.id}:content-${t}`, vt = (e, t) => e.ids?.trigger ?? `tabs:${e.id}:trigger-${t}`, ga = (e) => e.ids?.indicator ?? `tabs:${e.id}:indicator`, rg = (e) => e.getById(yn(e)), ig = (e, t) => e.getById(os(e, t)), Yn = (e, t) => e.getById(vt(e, t)), Sr = (e) => e.getById(ga(e)), $n = (e) => {
  const n = `[role=tab][data-ownedby='${CSS.escape(yn(e))}']:not([disabled])`;
  return Pn(rg(e), n);
}, ag = (e) => ps($n(e)), lg = (e) => gs($n(e)), cg = (e, t) => Ai($n(e), vt(e, t.value), t.loopFocus), ug = (e, t) => Li($n(e), vt(e, t.value), t.loopFocus), fa = (e) => ({
  left: e?.offsetLeft ?? 0,
  top: e?.offsetTop ?? 0,
  width: e?.offsetWidth ?? 0,
  height: e?.offsetHeight ?? 0
}), dg = (e, t) => {
  const n = Vi($n(e), vt(e, t));
  return ha(fa(n));
}, ha = (e) => ({
  width: `${e.width}px`,
  height: `${e.height}px`,
  left: `${e.left}px`,
  top: `${e.top}px`
});
function pg(e, t) {
  const { state: n, send: o, context: s, prop: r, scope: i } = e, a = r("translations"), l = n.matches("focused"), c = r("orientation") === "vertical", d = r("orientation") === "horizontal", f = r("composite");
  function p(g) {
    return {
      selected: s.get("value") === g.value,
      focused: s.get("focusedValue") === g.value,
      disabled: !!g.disabled
    };
  }
  return {
    value: s.get("value"),
    focusedValue: s.get("focusedValue"),
    setValue(g) {
      o({ type: "SET_VALUE", value: g });
    },
    clearValue() {
      o({ type: "CLEAR_VALUE" });
    },
    setIndicatorRect(g) {
      const h = vt(i, g);
      o({ type: "SET_INDICATOR_RECT", id: h });
    },
    syncTabIndex() {
      o({ type: "SYNC_TAB_INDEX" });
    },
    selectNext(g) {
      o({ type: "TAB_FOCUS", value: g, src: "selectNext" }), o({ type: "ARROW_NEXT", src: "selectNext" });
    },
    selectPrev(g) {
      o({ type: "TAB_FOCUS", value: g, src: "selectPrev" }), o({ type: "ARROW_PREV", src: "selectPrev" });
    },
    focus() {
      const g = s.get("value");
      g && Yn(i, g)?.focus();
    },
    getRootProps() {
      return t.element({
        ...en.root.attrs,
        id: sg(i),
        "data-orientation": r("orientation"),
        "data-focus": B(l),
        dir: r("dir")
      });
    },
    getListProps() {
      return t.element({
        ...en.list.attrs,
        id: yn(i),
        role: "tablist",
        dir: r("dir"),
        "data-focus": B(l),
        "aria-orientation": r("orientation"),
        "data-orientation": r("orientation"),
        "aria-label": a?.listLabel,
        onKeyDown(g) {
          if (g.defaultPrevented || !Cs(g) || Oi(g)) return;
          const h = {
            ArrowDown() {
              d || o({ type: "ARROW_NEXT", key: "ArrowDown" });
            },
            ArrowUp() {
              d || o({ type: "ARROW_PREV", key: "ArrowUp" });
            },
            ArrowLeft() {
              c || o({ type: "ARROW_PREV", key: "ArrowLeft" });
            },
            ArrowRight() {
              c || o({ type: "ARROW_NEXT", key: "ArrowRight" });
            },
            Home() {
              o({ type: "HOME" });
            },
            End() {
              o({ type: "END" });
            },
            Enter() {
              o({ type: "ENTER" });
            }
          };
          let b = yt(g, {
            dir: r("dir"),
            orientation: r("orientation")
          });
          const k = h[b];
          k && (g.preventDefault(), k(g));
        }
      });
    },
    getTriggerState: p,
    getTriggerProps(g) {
      const { value: h, disabled: b } = g, k = p(g);
      return t.button({
        ...en.trigger.attrs,
        role: "tab",
        type: "button",
        disabled: b,
        dir: r("dir"),
        "data-orientation": r("orientation"),
        "data-disabled": B(b),
        "aria-disabled": b,
        "data-value": h,
        "aria-selected": k.selected,
        "data-selected": B(k.selected),
        "data-focus": B(k.focused),
        "aria-controls": k.selected ? os(i, h) : void 0,
        "data-ownedby": yn(i),
        "data-ssr": B(s.get("ssr")),
        id: vt(i, h),
        tabIndex: k.selected && f ? 0 : -1,
        onFocus() {
          o({ type: "TAB_FOCUS", value: h });
        },
        onBlur($) {
          $.relatedTarget?.getAttribute("role") !== "tab" && o({ type: "TAB_BLUR" });
        },
        onClick($) {
          $.defaultPrevented || b || (To() && $.currentTarget.focus(), o({ type: "TAB_CLICK", value: h }));
        }
      });
    },
    getContentProps(g) {
      const { value: h } = g, b = s.get("value") === h;
      return t.element({
        ...en.content.attrs,
        dir: r("dir"),
        id: os(i, h),
        tabIndex: f ? 0 : -1,
        "aria-labelledby": vt(i, h),
        role: "tabpanel",
        "data-ownedby": yn(i),
        "data-selected": B(b),
        "data-orientation": r("orientation"),
        hidden: !b
      });
    },
    getIndicatorProps() {
      const g = s.get("indicatorRect"), h = s.get("indicatorTransition");
      return t.element({
        id: ga(i),
        ...en.indicator.attrs,
        dir: r("dir"),
        "data-orientation": r("orientation"),
        style: {
          "--transition-property": "left, right, top, bottom, width, height",
          "--left": g.left,
          "--top": g.top,
          "--width": g.width,
          "--height": g.height,
          position: "absolute",
          willChange: "var(--transition-property)",
          transitionProperty: "var(--transition-property)",
          transitionDuration: h ? "var(--transition-duration, 150ms)" : "0ms",
          transitionTimingFunction: "var(--transition-timing-function)",
          [d ? "left" : "top"]: d ? "var(--left)" : "var(--top)"
        }
      });
    }
  };
}
var { not: gg } = nt(), fg = {
  props({ props: e }) {
    return {
      dir: "ltr",
      orientation: "horizontal",
      activationMode: "automatic",
      loopFocus: !0,
      composite: !0,
      navigate(t) {
        xs(t.node);
      },
      defaultValue: null,
      ...e
    };
  },
  initialState() {
    return "idle";
  },
  context({ prop: e, bindable: t }) {
    return {
      value: t(() => ({
        defaultValue: e("defaultValue"),
        value: e("value"),
        onChange(n) {
          e("onValueChange")?.({ value: n });
        }
      })),
      focusedValue: t(() => ({
        defaultValue: e("value") || e("defaultValue"),
        sync: !0,
        onChange(n) {
          e("onFocusChange")?.({ focusedValue: n });
        }
      })),
      ssr: t(() => ({ defaultValue: !0 })),
      indicatorTransition: t(() => ({ defaultValue: !1 })),
      indicatorRect: t(() => ({
        defaultValue: { left: "0px", top: "0px", width: "0px", height: "0px" }
      }))
    };
  },
  watch({ context: e, prop: t, track: n, action: o }) {
    n([() => e.get("value")], () => {
      o(["allowIndicatorTransition", "syncIndicatorRect", "syncTabIndex", "navigateIfNeeded"]);
    }), n([() => t("dir"), () => t("orientation")], () => {
      o(["syncIndicatorRect"]);
    });
  },
  on: {
    SET_VALUE: {
      actions: ["setValue"]
    },
    CLEAR_VALUE: {
      actions: ["clearValue"]
    },
    SET_INDICATOR_RECT: {
      actions: ["setIndicatorRect"]
    },
    SYNC_TAB_INDEX: {
      actions: ["syncTabIndex"]
    }
  },
  entry: ["syncIndicatorRect", "syncTabIndex", "syncSsr"],
  exit: ["cleanupObserver"],
  states: {
    idle: {
      on: {
        TAB_FOCUS: {
          target: "focused",
          actions: ["setFocusedValue"]
        },
        TAB_CLICK: {
          target: "focused",
          actions: ["setFocusedValue", "setValue"]
        }
      }
    },
    focused: {
      on: {
        TAB_CLICK: {
          target: "focused",
          actions: ["setFocusedValue", "setValue"]
        },
        ARROW_PREV: [
          {
            guard: "selectOnFocus",
            actions: ["focusPrevTab", "selectFocusedTab"]
          },
          {
            actions: ["focusPrevTab"]
          }
        ],
        ARROW_NEXT: [
          {
            guard: "selectOnFocus",
            actions: ["focusNextTab", "selectFocusedTab"]
          },
          {
            actions: ["focusNextTab"]
          }
        ],
        HOME: [
          {
            guard: "selectOnFocus",
            actions: ["focusFirstTab", "selectFocusedTab"]
          },
          {
            actions: ["focusFirstTab"]
          }
        ],
        END: [
          {
            guard: "selectOnFocus",
            actions: ["focusLastTab", "selectFocusedTab"]
          },
          {
            actions: ["focusLastTab"]
          }
        ],
        ENTER: {
          guard: gg("selectOnFocus"),
          actions: ["selectFocusedTab"]
        },
        TAB_FOCUS: {
          actions: ["setFocusedValue"]
        },
        TAB_BLUR: {
          target: "idle",
          actions: ["clearFocusedValue"]
        }
      }
    }
  },
  implementations: {
    guards: {
      selectOnFocus: ({ prop: e }) => e("activationMode") === "automatic"
    },
    actions: {
      selectFocusedTab({ context: e, prop: t }) {
        U(() => {
          const n = e.get("focusedValue");
          if (!n) return;
          const s = t("deselectable") && e.get("value") === n ? null : n;
          e.set("value", s);
        });
      },
      setFocusedValue({ context: e, event: t, flush: n }) {
        t.value != null && n(() => {
          e.set("focusedValue", t.value);
        });
      },
      clearFocusedValue({ context: e }) {
        e.set("focusedValue", null);
      },
      setValue({ context: e, event: t, prop: n }) {
        const o = n("deselectable") && e.get("value") === e.get("focusedValue");
        e.set("value", o ? null : t.value);
      },
      clearValue({ context: e }) {
        e.set("value", null);
      },
      focusFirstTab({ scope: e }) {
        U(() => {
          ag(e)?.focus();
        });
      },
      focusLastTab({ scope: e }) {
        U(() => {
          lg(e)?.focus();
        });
      },
      focusNextTab({ context: e, prop: t, scope: n, event: o }) {
        const s = o.value ?? e.get("focusedValue");
        if (!s) return;
        const r = cg(n, {
          value: s,
          loopFocus: t("loopFocus")
        });
        U(() => {
          t("composite") ? r?.focus() : r?.dataset.value != null && e.set("focusedValue", r.dataset.value);
        });
      },
      focusPrevTab({ context: e, prop: t, scope: n, event: o }) {
        const s = o.value ?? e.get("focusedValue");
        if (!s) return;
        const r = ug(n, {
          value: s,
          loopFocus: t("loopFocus")
        });
        U(() => {
          t("composite") ? r?.focus() : r?.dataset.value != null && e.set("focusedValue", r.dataset.value);
        });
      },
      syncTabIndex({ context: e, scope: t }) {
        U(() => {
          const n = e.get("value");
          if (!n) return;
          const o = ig(t, n);
          if (!o) return;
          Pi(o).length > 0 ? o.removeAttribute("tabindex") : o.setAttribute("tabindex", "0");
        });
      },
      cleanupObserver({ refs: e }) {
        const t = e.get("indicatorCleanup");
        t && t();
      },
      allowIndicatorTransition({ context: e }) {
        e.set("indicatorTransition", !0);
      },
      setIndicatorRect({ context: e, event: t, scope: n }) {
        const o = t.id ?? e.get("value");
        if (!Sr(n)) return;
        if (!o) {
          e.set("indicatorTransition", !1);
          return;
        }
        Yn(n, o) && (e.set("indicatorRect", dg(n, o)), Os(() => {
          e.set("indicatorTransition", !1);
        }));
      },
      syncSsr({ context: e }) {
        e.set("ssr", !1);
      },
      syncIndicatorRect({ context: e, refs: t, scope: n }) {
        const o = t.get("indicatorCleanup");
        o && o();
        const s = e.get("value");
        if (!s) {
          e.set("indicatorTransition", !1);
          return;
        }
        const r = Yn(n, s), i = Sr(n);
        if (!r || !i) return;
        const a = Ni([r], {
          measure(l) {
            return fa(l);
          },
          onEntry({ rects: l }) {
            const [c] = l;
            e.set("indicatorRect", ha(c));
          }
        });
        t.set("indicatorCleanup", a);
      },
      navigateIfNeeded({ context: e, prop: t, scope: n }) {
        const o = e.get("value");
        if (!o) return;
        const s = Yn(n, o);
        vs(s) && t("navigate")?.({ value: o, node: s });
      }
    }
  }
};
ne()([
  "activationMode",
  "composite",
  "deselectable",
  "dir",
  "getRootNode",
  "id",
  "ids",
  "loopFocus",
  "navigate",
  "onFocusChange",
  "onValueChange",
  "orientation",
  "translations",
  "value",
  "defaultValue"
]);
ne()(["disabled", "value"]);
ne()(["value"]);
const hg = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = L(() => {
    const a = ce(e);
    return {
      id: n,
      dir: s.value.dir,
      value: a.modelValue,
      getRootNode: o?.value.getRootNode,
      ...Xe(a),
      onFocusChange: (l) => {
        t?.("focusChange", l), a.onFocusChange?.(l);
      },
      onValueChange: (l) => {
        t?.("valueChange", l), t?.("update:modelValue", l.value), a.onValueChange?.(l);
      }
    };
  }), i = Se(fg, r);
  return L(() => pg(i, Ne));
}, mg = /* @__PURE__ */ _({
  __name: "tabs-root",
  props: /* @__PURE__ */ ve({
    activationMode: {},
    composite: { type: Boolean },
    defaultValue: {},
    deselectable: { type: Boolean },
    id: {},
    ids: {},
    loopFocus: { type: Boolean },
    modelValue: {},
    navigate: { type: Function },
    orientation: {},
    translations: {},
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    composite: void 0,
    deselectable: void 0,
    loopFocus: void 0
  }),
  emits: ["focusChange", "valueChange", "update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, s = hg(n, t);
    return pa(s), ft(L(() => ({ lazyMount: n.lazyMount, unmountOnExit: n.unmountOnExit }))), R(), (r, i) => (v(), T(u(A).div, V(u(s).getRootProps(), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Content: Zp,
  Context: tg,
  Indicator: Qp,
  List: Jp,
  Root: mg,
  RootProvider: ng,
  Trigger: eg
}, Symbol.toStringTag, { value: "Module" })), vg = /* @__PURE__ */ _({
  __name: "BaseTabs",
  setup(e) {
    const t = J("tab2");
    return (n, o) => (v(), T(u(Rr).Root, {
      modelValue: t.value,
      "onUpdate:modelValue": o[0] || (o[0] = (s) => t.value = s)
    }, {
      default: C(() => [
        F(u(Rr).List, { class: "tabs-list" }, {
          default: C(() => [
            E(n.$slots, "tabs", {}, void 0, !0)
          ]),
          _: 3
        }),
        E(n.$slots, "content", {}, () => [
          E(n.$slots, "default", {}, void 0, !0)
        ], !0)
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}), My = /* @__PURE__ */ Q(vg, [["__scopeId", "data-v-f2282817"]]), [ma, va] = X("ToggleGroupContext"), yg = /* @__PURE__ */ _({
  __name: "toggle-group-context",
  setup(e) {
    const t = va();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), bg = /* @__PURE__ */ _({
  __name: "toggle-group-item",
  props: {
    value: {},
    disabled: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = va();
    return R(), (o, s) => (v(), T(u(A).button, V(u(n).getItemProps(t), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Cg = /* @__PURE__ */ _({
  __name: "toggle-group-root-provider",
  props: {
    value: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return ma(n), R(), (o, s) => (v(), T(u(A).div, V(n.value.getRootProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
});
var _g = Pe("toggle-group").parts("root", "item"), $r = _g.build(), co = (e) => e.ids?.root ?? `toggle-group:${e.id}`, Eg = (e, t) => e.ids?.item?.(t) ?? `toggle-group:${e.id}:${t}`, ya = (e) => e.getById(co(e)), Ro = (e) => {
  const n = `[data-ownedby='${CSS.escape(co(e))}']:not([data-disabled])`;
  return Pn(ya(e), n);
}, Vr = (e) => ps(Ro(e)), Tg = (e) => gs(Ro(e)), Ig = (e, t, n) => Ai(Ro(e), t, n), kg = (e, t, n) => Li(Ro(e), t, n);
function Og(e, t) {
  const { context: n, send: o, prop: s, scope: r } = e, i = n.get("value"), a = s("disabled"), l = !s("multiple"), c = s("rovingFocus"), d = s("orientation") === "horizontal";
  function f(p) {
    const g = Eg(r, p.value);
    return {
      id: g,
      disabled: !!(p.disabled || a),
      pressed: !!i.includes(p.value),
      focused: n.get("focusedId") === g
    };
  }
  return {
    value: i,
    setValue(p) {
      o({ type: "VALUE.SET", value: p });
    },
    getRootProps() {
      return t.element({
        ...$r.root.attrs,
        id: co(r),
        dir: s("dir"),
        role: l ? "radiogroup" : "group",
        tabIndex: n.get("isTabbingBackward") ? -1 : 0,
        "data-disabled": B(a),
        "data-orientation": s("orientation"),
        "data-focus": B(n.get("focusedId") != null),
        style: { outline: "none" },
        onMouseDown() {
          a || o({ type: "ROOT.MOUSE_DOWN" });
        },
        onFocus(p) {
          a || p.currentTarget === me(p) && (n.get("isClickFocus") || n.get("isTabbingBackward") || o({ type: "ROOT.FOCUS" }));
        },
        onBlur() {
          a || o({ type: "ROOT.BLUR" });
        }
      });
    },
    getItemState: f,
    getItemProps(p) {
      const g = f(p), h = g.focused ? 0 : -1;
      return t.button({
        ...$r.item.attrs,
        id: g.id,
        type: "button",
        "data-ownedby": co(r),
        "data-focus": B(g.focused),
        disabled: g.disabled,
        tabIndex: c ? h : void 0,
        // radio
        role: l ? "radio" : void 0,
        "aria-checked": l ? g.pressed : void 0,
        "aria-pressed": l ? void 0 : g.pressed,
        //
        "data-disabled": B(g.disabled),
        "data-orientation": s("orientation"),
        dir: s("dir"),
        "data-state": g.pressed ? "on" : "off",
        onFocus() {
          g.disabled || o({ type: "TOGGLE.FOCUS", id: g.id });
        },
        onClick(b) {
          g.disabled || (o({ type: "TOGGLE.CLICK", id: g.id, value: p.value }), To() && b.currentTarget.focus({ preventScroll: !0 }));
        },
        onKeyDown(b) {
          if (b.defaultPrevented || !Cs(b) || g.disabled) return;
          const $ = {
            Tab(I) {
              const x = I.shiftKey;
              o({ type: "TOGGLE.SHIFT_TAB", isShiftTab: x });
            },
            ArrowLeft() {
              !c || !d || o({ type: "TOGGLE.FOCUS_PREV" });
            },
            ArrowRight() {
              !c || !d || o({ type: "TOGGLE.FOCUS_NEXT" });
            },
            ArrowUp() {
              !c || d || o({ type: "TOGGLE.FOCUS_PREV" });
            },
            ArrowDown() {
              !c || d || o({ type: "TOGGLE.FOCUS_NEXT" });
            },
            Home() {
              c && o({ type: "TOGGLE.FOCUS_FIRST" });
            },
            End() {
              c && o({ type: "TOGGLE.FOCUS_LAST" });
            }
          }[yt(b)];
          $ && ($(b), b.key !== "Tab" && b.preventDefault());
        }
      });
    }
  };
}
var { not: Ar, and: xg } = nt(), Pg = {
  props({ props: e }) {
    return {
      defaultValue: [],
      orientation: "horizontal",
      rovingFocus: !0,
      loopFocus: !0,
      ...e
    };
  },
  initialState() {
    return "idle";
  },
  context({ prop: e, bindable: t }) {
    return {
      value: t(() => ({
        defaultValue: e("defaultValue"),
        value: e("value"),
        onChange(n) {
          e("onValueChange")?.({ value: n });
        }
      })),
      focusedId: t(() => ({
        defaultValue: null
      })),
      isTabbingBackward: t(() => ({
        defaultValue: !1
      })),
      isClickFocus: t(() => ({
        defaultValue: !1
      })),
      isWithinToolbar: t(() => ({
        defaultValue: !1
      }))
    };
  },
  computed: {
    currentLoopFocus: ({ context: e, prop: t }) => t("loopFocus") && !e.get("isWithinToolbar")
  },
  entry: ["checkIfWithinToolbar"],
  on: {
    "VALUE.SET": {
      actions: ["setValue"]
    },
    "TOGGLE.CLICK": {
      actions: ["setValue"]
    },
    "ROOT.MOUSE_DOWN": {
      actions: ["setClickFocus"]
    }
  },
  states: {
    idle: {
      on: {
        "ROOT.FOCUS": {
          target: "focused",
          guard: Ar(xg("isClickFocus", "isTabbingBackward")),
          actions: ["focusFirstToggle", "clearClickFocus"]
        },
        "TOGGLE.FOCUS": {
          target: "focused",
          actions: ["setFocusedId"]
        }
      }
    },
    focused: {
      on: {
        "ROOT.BLUR": {
          target: "idle",
          actions: ["clearIsTabbingBackward", "clearFocusedId"]
        },
        "TOGGLE.FOCUS": {
          actions: ["setFocusedId"]
        },
        "TOGGLE.FOCUS_NEXT": {
          actions: ["focusNextToggle"]
        },
        "TOGGLE.FOCUS_PREV": {
          actions: ["focusPrevToggle"]
        },
        "TOGGLE.FOCUS_FIRST": {
          actions: ["focusFirstToggle"]
        },
        "TOGGLE.FOCUS_LAST": {
          actions: ["focusLastToggle"]
        },
        "TOGGLE.SHIFT_TAB": [
          {
            guard: Ar("isFirstToggleFocused"),
            target: "idle",
            actions: ["setIsTabbingBackward"]
          },
          {
            actions: ["setIsTabbingBackward"]
          }
        ]
      }
    }
  },
  implementations: {
    guards: {
      isClickFocus: ({ context: e }) => e.get("isClickFocus"),
      isTabbingBackward: ({ context: e }) => e.get("isTabbingBackward"),
      isFirstToggleFocused: ({ context: e, scope: t }) => e.get("focusedId") === Vr(t)?.id
    },
    actions: {
      setIsTabbingBackward({ context: e }) {
        e.set("isTabbingBackward", !0);
      },
      clearIsTabbingBackward({ context: e }) {
        e.set("isTabbingBackward", !1);
      },
      setClickFocus({ context: e }) {
        e.set("isClickFocus", !0);
      },
      clearClickFocus({ context: e }) {
        e.set("isClickFocus", !1);
      },
      checkIfWithinToolbar({ context: e, scope: t }) {
        const n = ya(t)?.closest("[role=toolbar]");
        e.set("isWithinToolbar", !!n);
      },
      setFocusedId({ context: e, event: t }) {
        e.set("focusedId", t.id);
      },
      clearFocusedId({ context: e }) {
        e.set("focusedId", null);
      },
      setValue({ context: e, event: t, prop: n }) {
        ms(t, ["value"]);
        let o = e.get("value");
        yi(t.value) ? o = t.value : n("multiple") ? o = jo(o, t.value) : o = Wt(o, [t.value]) ? [] : [t.value], e.set("value", o);
      },
      focusNextToggle({ context: e, scope: t, prop: n }) {
        U(() => {
          const o = e.get("focusedId");
          o && Ig(t, o, n("loopFocus"))?.focus({ preventScroll: !0 });
        });
      },
      focusPrevToggle({ context: e, scope: t, prop: n }) {
        U(() => {
          const o = e.get("focusedId");
          o && kg(t, o, n("loopFocus"))?.focus({ preventScroll: !0 });
        });
      },
      focusFirstToggle({ scope: e }) {
        U(() => {
          Vr(e)?.focus({ preventScroll: !0 });
        });
      },
      focusLastToggle({ scope: e }) {
        U(() => {
          Tg(e)?.focus({ preventScroll: !0 });
        });
      }
    }
  }
};
ne()([
  "dir",
  "disabled",
  "getRootNode",
  "id",
  "ids",
  "loopFocus",
  "multiple",
  "onValueChange",
  "orientation",
  "rovingFocus",
  "value",
  "defaultValue"
]);
ne()(["value", "disabled"]);
const wg = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = L(() => {
    const a = ce(e);
    return {
      id: n,
      dir: s.value.dir,
      value: a.modelValue,
      getRootNode: o?.value.getRootNode,
      ...Xe(a),
      onValueChange: (l) => {
        t?.("valueChange", l), t?.("update:modelValue", l.value), a.onValueChange?.(l);
      }
    };
  }), i = Se(Pg, r);
  return L(() => Og(i, Ne));
}, Sg = /* @__PURE__ */ _({
  __name: "toggle-group-root",
  props: /* @__PURE__ */ ve({
    defaultValue: {},
    disabled: { type: Boolean },
    id: {},
    ids: {},
    loopFocus: { type: Boolean },
    modelValue: {},
    multiple: { type: Boolean },
    orientation: {},
    rovingFocus: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    disabled: void 0,
    loopFocus: void 0,
    multiple: void 0,
    rovingFocus: void 0
  }),
  emits: ["valueChange", "update:modelValue"],
  setup(e, { emit: t }) {
    const s = wg(e, t);
    return ma(s), (r, i) => (v(), T(u(A).div, V(u(s).getRootProps(), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Context: yg,
  Item: bg,
  Root: Sg,
  RootProvider: Cg
}, Symbol.toStringTag, { value: "Module" })), Rg = /* @__PURE__ */ _({
  __name: "BaseToggleGroup",
  props: /* @__PURE__ */ ut({
    items: {
      type: Array,
      default: () => []
    },
    radioGroupMode: {
      type: Boolean,
      default: !0
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Qe(e, "modelValue");
    let n = "";
    const o = (r) => {
      if (r.value.length === 0) {
        vo(() => {
          s.value = [n];
        });
        return;
      }
      t.value = r.value[0], n = r.value[0];
    }, s = J([t.value || ""]);
    return (r, i) => (v(), T(u(Lr).Root, {
      modelValue: s.value,
      "onUpdate:modelValue": i[0] || (i[0] = (a) => s.value = a),
      class: "toggle-group-root",
      onValueChange: o
    }, {
      default: C(() => [
        (v(!0), M(re, null, xe(e.items, (a, l) => (v(), T(u(Lr).Item, {
          key: l,
          value: a,
          class: "toggle-group-item"
        }, {
          default: C(() => [
            E(r.$slots, "item", { item: a }, () => [
              ee(W(a), 1)
            ], !0)
          ]),
          _: 2
        }, 1032, ["value"]))), 128))
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}), Fy = /* @__PURE__ */ Q(Rg, [["__scopeId", "data-v-22f78043"]]), [ba, Et] = X("SegmentGroupContext"), $g = /* @__PURE__ */ _({
  __name: "segment-group-context",
  setup(e) {
    const t = Et();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
});
function Vg(e) {
  return !(e.metaKey || !Eo() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
var Ag = /* @__PURE__ */ new Set(["checkbox", "radio", "range", "color", "file", "image", "button", "submit", "reset"]);
function Lg(e, t, n) {
  const o = n ? me(n) : null, s = fe(o);
  return e = e || o instanceof s.HTMLInputElement && !Ag.has(o?.type) || o instanceof s.HTMLTextAreaElement || o instanceof s.HTMLElement && o.isContentEditable, !(e && t === "keyboard" && n instanceof s.KeyboardEvent && !Reflect.has(Ng, n.key));
}
var Tt = null, ss = /* @__PURE__ */ new Set(), bn = /* @__PURE__ */ new Map(), Ct = !1, rs = !1, Ng = {
  Tab: !0,
  Escape: !0
};
function $o(e, t) {
  for (let n of ss)
    n(e, t);
}
function uo(e) {
  Ct = !0, Vg(e) && (Tt = "keyboard", $o("keyboard", e));
}
function Ve(e) {
  Tt = "pointer", (e.type === "mousedown" || e.type === "pointerdown") && (Ct = !0, $o("pointer", e));
}
function Ca(e) {
  bc(e) && (Ct = !0, Tt = "virtual");
}
function _a(e) {
  const t = me(e);
  t === fe(t) || t === Ke(t) || (!Ct && !rs && (Tt = "virtual", $o("virtual", e)), Ct = !1, rs = !1);
}
function Ea() {
  Ct = !1, rs = !0;
}
function Dg(e) {
  if (typeof window > "u" || bn.get(fe(e)))
    return;
  const t = fe(e), n = Ke(e);
  let o = t.HTMLElement.prototype.focus;
  t.HTMLElement.prototype.focus = function() {
    Tt = "virtual", $o("virtual", null), Ct = !0, o.apply(this, arguments);
  }, n.addEventListener("keydown", uo, !0), n.addEventListener("keyup", uo, !0), n.addEventListener("click", Ca, !0), t.addEventListener("focus", _a, !0), t.addEventListener("blur", Ea, !1), typeof t.PointerEvent < "u" ? (n.addEventListener("pointerdown", Ve, !0), n.addEventListener("pointermove", Ve, !0), n.addEventListener("pointerup", Ve, !0)) : (n.addEventListener("mousedown", Ve, !0), n.addEventListener("mousemove", Ve, !0), n.addEventListener("mouseup", Ve, !0)), t.addEventListener(
    "beforeunload",
    () => {
      Bg(e);
    },
    { once: !0 }
  ), bn.set(t, { focus: o });
}
var Bg = (e, t) => {
  const n = fe(e), o = Ke(e);
  bn.has(n) && (n.HTMLElement.prototype.focus = bn.get(n).focus, o.removeEventListener("keydown", uo, !0), o.removeEventListener("keyup", uo, !0), o.removeEventListener("click", Ca, !0), n.removeEventListener("focus", _a, !0), n.removeEventListener("blur", Ea, !1), typeof n.PointerEvent < "u" ? (o.removeEventListener("pointerdown", Ve, !0), o.removeEventListener("pointermove", Ve, !0), o.removeEventListener("pointerup", Ve, !0)) : (o.removeEventListener("mousedown", Ve, !0), o.removeEventListener("mousemove", Ve, !0), o.removeEventListener("mouseup", Ve, !0)), bn.delete(n));
};
function xn() {
  return Tt === "keyboard";
}
function Us(e = {}) {
  const { isTextInput: t, autoFocus: n, onChange: o, root: s } = e;
  Dg(s), o?.({ isFocusVisible: n || xn(), modality: Tt });
  const r = (i, a) => {
    Lg(!!t, i, a) && o?.({ isFocusVisible: xn(), modality: i });
  };
  return ss.add(r), () => {
    ss.delete(r);
  };
}
var Ta = Pe("radio-group").parts(
  "root",
  "label",
  "item",
  "itemText",
  "itemControl",
  "indicator"
), St = Ta.build(), po = (e) => e.ids?.root ?? `radio-group:${e.id}`, Nr = (e) => e.ids?.label ?? `radio-group:${e.id}:label`, Ia = (e, t) => e.ids?.item?.(t) ?? `radio-group:${e.id}:radio:${t}`, is = (e, t) => e.ids?.itemHiddenInput?.(t) ?? `radio-group:${e.id}:radio:input:${t}`, Mg = (e, t) => e.ids?.itemControl?.(t) ?? `radio-group:${e.id}:radio:control:${t}`, Fg = (e, t) => e.ids?.itemLabel?.(t) ?? `radio-group:${e.id}:radio:label:${t}`, ka = (e) => e.ids?.indicator ?? `radio-group:${e.id}:indicator`, Vo = (e) => e.getById(po(e)), Gg = (e, t) => e.getById(is(e, t)), Hg = (e) => e.getById(ka(e)), Ug = (e) => Vo(e)?.querySelector("input:not(:disabled)"), zg = (e) => Vo(e)?.querySelector("input:not(:disabled):checked"), Dr = (e) => {
  const n = `input[type=radio][data-ownedby='${CSS.escape(po(e))}']:not([disabled])`;
  return Pn(Vo(e), n);
}, Wg = (e, t) => {
  if (t)
    return e.getById(Ia(e, t));
}, Kg = (e) => ({
  left: e?.offsetLeft ?? 0,
  top: e?.offsetTop ?? 0,
  width: e?.offsetWidth ?? 0,
  height: e?.offsetHeight ?? 0
}), jg = (e) => ({
  width: `${e.width}px`,
  height: `${e.height}px`,
  left: `${e.left}px`,
  top: `${e.top}px`
});
function Oa(e, t) {
  const { context: n, send: o, computed: s, prop: r, scope: i } = e, a = s("isDisabled"), l = r("readOnly");
  function c(p) {
    const g = n.get("focusedValue") === p.value, h = g && xn();
    return {
      value: p.value,
      invalid: !!p.invalid,
      disabled: !!p.disabled || a,
      checked: n.get("value") === p.value,
      focused: g,
      focusVisible: h,
      hovered: n.get("hoveredValue") === p.value,
      active: n.get("activeValue") === p.value
    };
  }
  function d(p) {
    const g = c(p);
    return {
      "data-focus": B(g.focused),
      "data-focus-visible": B(g.focusVisible),
      "data-disabled": B(g.disabled),
      "data-readonly": B(l),
      "data-state": g.checked ? "checked" : "unchecked",
      "data-hover": B(g.hovered),
      "data-invalid": B(g.invalid),
      "data-orientation": r("orientation"),
      "data-ssr": B(n.get("ssr"))
    };
  }
  const f = () => {
    (zg(i) ?? Ug(i))?.focus();
  };
  return {
    focus: f,
    value: n.get("value"),
    setValue(p) {
      o({ type: "SET_VALUE", value: p, isTrusted: !1 });
    },
    clearValue() {
      o({ type: "SET_VALUE", value: null, isTrusted: !1 });
    },
    getRootProps() {
      return t.element({
        ...St.root.attrs,
        role: "radiogroup",
        id: po(i),
        "aria-labelledby": Nr(i),
        "data-orientation": r("orientation"),
        "data-disabled": B(a),
        "aria-orientation": r("orientation"),
        dir: r("dir"),
        style: {
          position: "relative"
        }
      });
    },
    getLabelProps() {
      return t.element({
        ...St.label.attrs,
        dir: r("dir"),
        "data-orientation": r("orientation"),
        "data-disabled": B(a),
        id: Nr(i),
        onClick: f
      });
    },
    getItemState: c,
    getItemProps(p) {
      const g = c(p);
      return t.label({
        ...St.item.attrs,
        dir: r("dir"),
        id: Ia(i, p.value),
        htmlFor: is(i, p.value),
        ...d(p),
        onPointerMove() {
          g.disabled || g.hovered || o({ type: "SET_HOVERED", value: p.value, hovered: !0 });
        },
        onPointerLeave() {
          g.disabled || o({ type: "SET_HOVERED", value: null });
        },
        onPointerDown(h) {
          g.disabled || (g.focused && h.pointerType === "mouse" && h.preventDefault(), o({ type: "SET_ACTIVE", value: p.value, active: !0 }));
        },
        onPointerUp() {
          g.disabled || o({ type: "SET_ACTIVE", value: null });
        },
        onClick() {
          !g.disabled && To() && Gg(i, p.value)?.focus();
        }
      });
    },
    getItemTextProps(p) {
      return t.element({
        ...St.itemText.attrs,
        dir: r("dir"),
        id: Fg(i, p.value),
        ...d(p)
      });
    },
    getItemControlProps(p) {
      const g = c(p);
      return t.element({
        ...St.itemControl.attrs,
        dir: r("dir"),
        id: Mg(i, p.value),
        "data-active": B(g.active),
        "aria-hidden": !0,
        ...d(p)
      });
    },
    getItemHiddenInputProps(p) {
      const g = c(p);
      return t.input({
        "data-ownedby": po(i),
        id: is(i, p.value),
        type: "radio",
        name: r("name") || r("id"),
        form: r("form"),
        value: p.value,
        onClick(h) {
          if (l) {
            h.preventDefault();
            return;
          }
          h.currentTarget.checked && o({ type: "SET_VALUE", value: p.value, isTrusted: !0 });
        },
        onBlur() {
          o({ type: "SET_FOCUSED", value: null, focused: !1 });
        },
        onFocus() {
          o({ type: "SET_FOCUSED", value: p.value, focused: !0 });
        },
        onKeyDown(h) {
          h.defaultPrevented || h.key === " " && o({ type: "SET_ACTIVE", value: p.value, active: !0 });
        },
        onKeyUp(h) {
          h.defaultPrevented || h.key === " " && o({ type: "SET_ACTIVE", value: null });
        },
        disabled: g.disabled,
        defaultChecked: g.checked,
        style: Ss
      });
    },
    getIndicatorProps() {
      const p = n.get("indicatorRect");
      return t.element({
        id: ka(i),
        ...St.indicator.attrs,
        dir: r("dir"),
        hidden: n.get("value") == null,
        "data-disabled": B(a),
        "data-orientation": r("orientation"),
        style: {
          "--transition-property": "left, top, width, height",
          "--left": p?.left,
          "--top": p?.top,
          "--width": p?.width,
          "--height": p?.height,
          position: "absolute",
          willChange: "var(--transition-property)",
          transitionProperty: "var(--transition-property)",
          transitionDuration: n.get("canIndicatorTransition") ? "var(--transition-duration, 150ms)" : "0ms",
          transitionTimingFunction: "var(--transition-timing-function)",
          [r("orientation") === "horizontal" ? "left" : "top"]: r("orientation") === "horizontal" ? "var(--left)" : "var(--top)"
        }
      });
    }
  };
}
var { not: qg } = nt(), xa = {
  props({ props: e }) {
    return {
      orientation: "vertical",
      ...e
    };
  },
  initialState() {
    return "idle";
  },
  context({ prop: e, bindable: t }) {
    return {
      value: t(() => ({
        defaultValue: e("defaultValue"),
        value: e("value"),
        onChange(n) {
          e("onValueChange")?.({ value: n });
        }
      })),
      activeValue: t(() => ({
        defaultValue: null
      })),
      focusedValue: t(() => ({
        defaultValue: null
      })),
      hoveredValue: t(() => ({
        defaultValue: null
      })),
      indicatorRect: t(() => ({
        defaultValue: {}
      })),
      canIndicatorTransition: t(() => ({
        defaultValue: !1
      })),
      fieldsetDisabled: t(() => ({
        defaultValue: !1
      })),
      ssr: t(() => ({
        defaultValue: !0
      }))
    };
  },
  refs() {
    return {
      indicatorCleanup: null
    };
  },
  computed: {
    isDisabled: ({ prop: e, context: t }) => !!e("disabled") || t.get("fieldsetDisabled")
  },
  entry: ["syncIndicatorRect", "syncSsr"],
  exit: ["cleanupObserver"],
  effects: ["trackFormControlState", "trackFocusVisible"],
  watch({ track: e, action: t, context: n }) {
    e([() => n.get("value")], () => {
      t(["setIndicatorTransition", "syncIndicatorRect", "syncInputElements"]);
    });
  },
  on: {
    SET_VALUE: [
      {
        guard: qg("isTrusted"),
        actions: ["setValue", "dispatchChangeEvent"]
      },
      {
        actions: ["setValue"]
      }
    ],
    SET_HOVERED: {
      actions: ["setHovered"]
    },
    SET_ACTIVE: {
      actions: ["setActive"]
    },
    SET_FOCUSED: {
      actions: ["setFocused"]
    }
  },
  states: {
    idle: {}
  },
  implementations: {
    guards: {
      isTrusted: ({ event: e }) => !!e.isTrusted
    },
    effects: {
      trackFormControlState({ context: e, scope: t }) {
        return Is(Vo(t), {
          onFieldsetDisabledChange(n) {
            e.set("fieldsetDisabled", n);
          },
          onFormReset() {
            e.set("value", e.initial("value"));
          }
        });
      },
      trackFocusVisible({ scope: e }) {
        return Us({ root: e.getRootNode?.() });
      }
    },
    actions: {
      setValue({ context: e, event: t }) {
        e.set("value", t.value);
      },
      setHovered({ context: e, event: t }) {
        e.set("hoveredValue", t.value);
      },
      setActive({ context: e, event: t }) {
        e.set("activeValue", t.value);
      },
      setFocused({ context: e, event: t }) {
        e.set("focusedValue", t.value);
      },
      syncInputElements({ context: e, scope: t }) {
        Dr(t).forEach((o) => {
          o.checked = o.value === e.get("value");
        });
      },
      setIndicatorTransition({ context: e }) {
        e.set("canIndicatorTransition", fn(e.get("value")));
      },
      cleanupObserver({ refs: e }) {
        e.get("indicatorCleanup")?.();
      },
      syncSsr({ context: e }) {
        e.set("ssr", !1);
      },
      syncIndicatorRect({ context: e, scope: t, refs: n }) {
        if (n.get("indicatorCleanup")?.(), !Hg(t)) return;
        const o = e.get("value"), s = Wg(t, o);
        if (o == null || !s) {
          e.set("canIndicatorTransition", !1), e.set("indicatorRect", {});
          return;
        }
        const r = Ni([s], {
          measure(i) {
            return Kg(i);
          },
          onEntry({ rects: i }) {
            e.set("indicatorRect", jg(i[0]));
          }
        });
        n.set("indicatorCleanup", r);
      },
      dispatchChangeEvent({ context: e, scope: t }) {
        Dr(t).forEach((o) => {
          const s = o.value === e.get("value");
          s !== o.checked && Ts(o, { checked: s });
        });
      }
    }
  }
};
ne()([
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "name",
  "onValueChange",
  "orientation",
  "readOnly",
  "value",
  "defaultValue"
]);
ne()(["value", "disabled", "invalid"]);
const Xg = Ta.rename("segment-group"), be = Xg.build(), Yg = /* @__PURE__ */ _({
  __name: "segment-group-indicator",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Et();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getIndicatorProps(), {
      "as-child": n.asChild,
      "data-scope": u(be).indicator.attrs["data-scope"],
      "data-part": u(be).indicator.attrs["data-part"]
    }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child", "data-scope", "data-part"]));
  }
}), [Zg, Qg] = X("SegmentGroupItemContext"), Jg = /* @__PURE__ */ _({
  __name: "segment-group-item-context",
  setup(e) {
    const t = Qg();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), [ef, zs] = X("SegmentGroupItemPropsContext"), tf = /* @__PURE__ */ _({
  __name: "segment-group-item-control",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Et(), n = zs();
    return R(), (o, s) => (v(), T(u(A).div, V(u(t).getItemControlProps(u(n)), {
      "as-child": o.asChild,
      "data-scope": u(be).itemControl.attrs["data-scope"],
      "data-part": u(be).itemControl.attrs["data-part"]
    }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child", "data-scope", "data-part"]));
  }
}), nf = /* @__PURE__ */ _({
  __name: "segment-group-item-hidden-input",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Et(), n = zs();
    return R(), (o, s) => (v(), T(u(A).input, V(u(t).getItemHiddenInputProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), of = /* @__PURE__ */ _({
  __name: "segment-group-item-text",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Et(), n = zs();
    return R(), (o, s) => (v(), T(u(A).span, V(u(t).getItemTextProps(u(n)), {
      "data-scope": u(be).itemText.attrs["data-scope"],
      "data-part": u(be).itemText.attrs["data-part"],
      "as-child": o.asChild
    }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-scope", "data-part", "as-child"]));
  }
}), sf = /* @__PURE__ */ _({
  __name: "segment-group-item",
  props: {
    value: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Et();
    return ef(t), Zg(L(() => n.value.getItemState(t))), R(), (o, s) => (v(), T(u(A).label, V(u(n).getItemProps(t), {
      "data-scope": u(be).item.attrs["data-scope"],
      "data-part": u(be).item.attrs["data-part"],
      "as-child": o.asChild
    }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-scope", "data-part", "as-child"]));
  }
}), rf = /* @__PURE__ */ _({
  __name: "segment-group-label",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Et();
    return R(), (n, o) => (v(), T(u(A).label, V(u(t).getLabelProps(), {
      "as-child": n.asChild,
      "data-scope": u(be).label.attrs["data-scope"],
      "data-part": u(be).label.attrs["data-part"]
    }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child", "data-scope", "data-part"]));
  }
}), af = /* @__PURE__ */ _({
  __name: "segment-group-root-provider",
  props: {
    value: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return ba(n), R(), (o, s) => (v(), T(u(A).div, V(n.value.getRootProps(), {
      "data-scope": u(be).root.attrs["data-scope"],
      "data-part": u(be).root.attrs["data-part"],
      "as-child": o.asChild
    }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-scope", "data-part", "as-child"]));
  }
}), lf = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = L(() => {
    const a = ce(e);
    return {
      id: n,
      dir: s.value.dir,
      value: a.modelValue,
      getRootNode: o?.value.getRootNode,
      ...Xe(a),
      onValueChange: (l) => {
        t?.("valueChange", l), t?.("update:modelValue", l.value), a.onValueChange?.(l);
      }
    };
  }), i = Se(xa, r);
  return L(() => Oa(i, Ne));
}, cf = /* @__PURE__ */ _({
  __name: "segment-group-root",
  props: /* @__PURE__ */ ve({
    defaultValue: {},
    disabled: { type: Boolean },
    form: {},
    id: {},
    ids: {},
    modelValue: {},
    name: {},
    orientation: {},
    readOnly: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    disabled: void 0,
    readOnly: void 0
  }),
  emits: ["valueChange", "update:modelValue"],
  setup(e, { emit: t }) {
    const s = lf(e, t);
    return ba(s), R(), (r, i) => (v(), T(u(A).div, V(u(s).getRootProps(), {
      "data-scope": u(be).root.attrs["data-scope"],
      "data-part": u(be).root.attrs["data-part"],
      "as-child": r.asChild
    }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["data-scope", "data-part", "as-child"]));
  }
}), Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Context: $g,
  Indicator: Yg,
  Item: sf,
  ItemContext: Jg,
  ItemControl: tf,
  ItemHiddenInput: nf,
  ItemText: of,
  Label: rf,
  Root: cf,
  RootProvider: af
}, Symbol.toStringTag, { value: "Module" })), uf = /* @__PURE__ */ _({
  __name: "BaseSegmentGroup",
  props: /* @__PURE__ */ ut({
    items: {
      type: Array,
      default: () => []
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = Qe(e, "modelValue");
    return (o, s) => (v(), T(u(Rt).Root, {
      modelValue: n.value,
      "onUpdate:modelValue": s[0] || (s[0] = (r) => n.value = r),
      orientation: "horizontal",
      class: "segment-group"
    }, {
      default: C(() => [
        (v(!0), M(re, null, xe(t.items, (r) => (v(), T(u(Rt).Item, {
          key: r,
          value: r,
          class: "item"
        }, {
          default: C(() => [
            F(u(Rt).ItemText, { class: "item-text" }, {
              default: C(() => [
                E(o.$slots, "item", { item: r }, () => [
                  ee(W(r), 1)
                ], !0)
              ]),
              _: 2
            }, 1024),
            F(u(Rt).ItemControl, { class: "item-control" }),
            F(u(Rt).ItemHiddenInput)
          ]),
          _: 2
        }, 1032, ["value"]))), 128)),
        F(u(Rt).Indicator, { class: "indicator" })
      ]),
      _: 3
    }, 8, ["modelValue"]));
  }
}), Gy = /* @__PURE__ */ Q(uf, [["__scopeId", "data-v-4e157f65"]]), df = { class: "collapsable-hint" }, pf = ["innerHTML"], gf = /* @__PURE__ */ _({
  __name: "BaseCollapsableHint",
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    return (t, n) => (v(), M("details", df, [
      H("summary", null, W(e.title), 1),
      E(t.$slots, "content", {}, () => [
        H("div", {
          class: "content",
          innerHTML: e.content
        }, null, 8, pf)
      ], !0)
    ]));
  }
}), Hy = /* @__PURE__ */ Q(gf, [["__scopeId", "data-v-a61f3f67"]]), [Pa, ot] = X("CarouselContext"), ff = /* @__PURE__ */ _({
  __name: "carousel-autoplay-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ot();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getAutoplayTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), hf = /* @__PURE__ */ _({
  __name: "carousel-context",
  setup(e) {
    const t = ot();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), mf = /* @__PURE__ */ _({
  __name: "carousel-control",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ot();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getControlProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), vf = /* @__PURE__ */ _({
  __name: "carousel-indicator-group",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ot();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getIndicatorGroupProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), yf = /* @__PURE__ */ _({
  __name: "carousel-indicator",
  props: {
    index: {},
    readOnly: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ot();
    return R(), (o, s) => (v(), T(u(A).button, V(u(n).getIndicatorProps(t), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), bf = /* @__PURE__ */ _({
  __name: "carousel-item-group",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ot();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getItemGroupProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Cf = /* @__PURE__ */ _({
  __name: "carousel-item",
  props: {
    index: {},
    snapAlign: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ot();
    return R(), (o, s) => (v(), T(u(A).div, V(u(n).getItemProps(t), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), _f = /* @__PURE__ */ _({
  __name: "carousel-next-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ot();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getNextTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Ef = /* @__PURE__ */ _({
  __name: "carousel-prev-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = ot();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getPrevTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Tf = /* @__PURE__ */ _({
  __name: "carousel-root-provider",
  props: {
    value: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return Pa(n), R(), (o, s) => (v(), T(u(A).div, V(n.value.getRootProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
});
function If(e) {
  const t = Co(e), n = e.getBoundingClientRect();
  let o = t.getPropertyValue("scroll-padding-left").replace("auto", "0px"), s = t.getPropertyValue("scroll-padding-top").replace("auto", "0px"), r = t.getPropertyValue("scroll-padding-right").replace("auto", "0px"), i = t.getPropertyValue("scroll-padding-bottom").replace("auto", "0px");
  function a(p, g) {
    let h = parseFloat(p);
    return /%/.test(p) && (h /= 100, h *= g), Number.isNaN(h) ? 0 : h;
  }
  let l = a(o, n.width), c = a(s, n.height), d = a(r, n.width), f = a(i, n.height);
  return {
    x: { before: l, after: d },
    y: { before: c, after: f }
  };
}
function kf(e, t, n = "both") {
  return n === "x" && e.right >= t.left && e.left <= t.right || n === "y" && e.bottom >= t.top && e.top <= t.bottom || n === "both" && e.right >= t.left && e.left <= t.right && e.bottom >= t.top && e.top <= t.bottom;
}
function wa(e) {
  let t = [];
  for (const n of e.children)
    t = t.concat(n, wa(n));
  return t;
}
function Sa(e, t = !1) {
  const n = e.getBoundingClientRect(), o = {
    x: { start: [], center: [], end: [] },
    y: { start: [], center: [], end: [] }
  }, s = t ? wa(e) : e.children;
  for (const r of ["x", "y"]) {
    const i = r === "x" ? "y" : "x", a = r === "x" ? "left" : "top", l = r === "x" ? "width" : "height", c = r === "x" ? "scrollLeft" : "scrollTop";
    for (const d of s) {
      const f = d.getBoundingClientRect();
      if (!kf(n, f, i))
        continue;
      const p = Co(d);
      let [g, h] = p.getPropertyValue("scroll-snap-align").split(" ");
      typeof h > "u" && (h = g);
      const b = r === "x" ? h : g, k = f[a] - n[a] + e[c];
      switch (b) {
        case "none":
          break;
        case "start":
          o[r].start.push({ node: d, position: k });
          break;
        case "center":
          o[r].center.push({ node: d, position: k + f[l] / 2 });
          break;
        case "end":
          o[r].end.push({ node: d, position: k + f[l] });
          break;
      }
    }
  }
  return o;
}
function Br(e) {
  const t = e.getBoundingClientRect(), n = If(e), o = Sa(e), s = {
    x: e.scrollWidth - e.offsetWidth,
    y: e.scrollHeight - e.offsetHeight
  };
  return {
    x: Mr(
      [
        ...o.x.start.map((r) => r.position - n.x.before),
        ...o.x.center.map((r) => r.position - t.width / 2),
        ...o.x.end.map((r) => r.position - t.width + n.x.after)
      ].map(Fr(0, s.x))
    ),
    y: Mr(
      [
        ...o.y.start.map((r) => r.position - n.y.before),
        ...o.y.center.map((r) => r.position - t.height / 2),
        ...o.y.end.map((r) => r.position - t.height + n.y.after)
      ].map(Fr(0, s.y))
    )
  };
}
function Of(e, t, n) {
  const o = Sa(e), s = [...o[t].start, ...o[t].center, ...o[t].end];
  for (const r of s)
    if (n(r.node))
      return r.position;
}
var Mr = (e) => [...new Set(e)], Fr = (e, t) => (n) => Math.max(e, Math.min(t, n)), xf = Pe("carousel").parts(
  "root",
  "itemGroup",
  "item",
  "control",
  "nextTrigger",
  "prevTrigger",
  "indicatorGroup",
  "indicator",
  "autoplayTrigger"
), Ye = xf.build(), Pf = (e) => e.ids?.root ?? `carousel:${e.id}`, wf = (e, t) => e.ids?.item?.(t) ?? `carousel:${e.id}:item:${t}`, Zn = (e) => e.ids?.itemGroup ?? `carousel:${e.id}:item-group`, Sf = (e) => e.ids?.nextTrigger ?? `carousel:${e.id}:next-trigger`, Rf = (e) => e.ids?.prevTrigger ?? `carousel:${e.id}:prev-trigger`, $f = (e) => e.ids?.indicatorGroup ?? `carousel:${e.id}:indicator-group`, Ra = (e, t) => e.ids?.indicator?.(t) ?? `carousel:${e.id}:indicator:${t}`, Te = (e) => e.getById(Zn(e)), Gr = (e) => Pn(Te(e), "[data-part=item]"), Vf = (e, t) => e.getById(Ra(e, t)), Hr = (e) => {
  const t = Te(e);
  if (!t) return;
  Io(t).length > 0 ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", "0");
};
function Af(e, t) {
  const { state: n, context: o, computed: s, send: r, scope: i, prop: a } = e, l = n.matches("autoplay"), c = n.matches("dragging"), d = s("canScrollNext"), f = s("canScrollPrev"), p = s("isHorizontal"), g = Array.from(o.get("pageSnapPoints")), h = o.get("page"), b = a("slidesPerPage"), k = a("padding"), $ = a("translations");
  return {
    isPlaying: l,
    isDragging: c,
    page: h,
    pageSnapPoints: g,
    canScrollNext: d,
    canScrollPrev: f,
    getProgress() {
      return h / g.length;
    },
    scrollToIndex(I, x) {
      r({ type: "INDEX.SET", index: I, instant: x });
    },
    scrollTo(I, x) {
      r({ type: "PAGE.SET", index: I, instant: x });
    },
    scrollNext(I) {
      r({ type: "PAGE.NEXT", instant: I });
    },
    scrollPrev(I) {
      r({ type: "PAGE.PREV", instant: I });
    },
    play() {
      r({ type: "AUTOPLAY.START" });
    },
    pause() {
      r({ type: "AUTOPLAY.PAUSE" });
    },
    isInView(I) {
      return Array.from(o.get("slidesInView")).includes(I);
    },
    refresh() {
      r({ type: "SNAP.REFRESH" });
    },
    getRootProps() {
      return t.element({
        ...Ye.root.attrs,
        id: Pf(i),
        role: "region",
        "aria-roledescription": "carousel",
        "data-orientation": a("orientation"),
        dir: a("dir"),
        style: {
          "--slides-per-page": b,
          "--slide-spacing": a("spacing"),
          "--slide-item-size": "calc(100% / var(--slides-per-page) - var(--slide-spacing) * (var(--slides-per-page) - 1) / var(--slides-per-page))"
        }
      });
    },
    getItemGroupProps() {
      return t.element({
        ...Ye.itemGroup.attrs,
        id: Zn(i),
        "data-orientation": a("orientation"),
        "data-dragging": B(c),
        dir: a("dir"),
        "aria-live": l ? "off" : "polite",
        onMouseDown(I) {
          if (!a("allowMouseDrag") || I.button !== 0 || I.defaultPrevented) return;
          const x = me(I);
          Ht(x) && x !== I.currentTarget || (I.preventDefault(), r({ type: "DRAGGING.START" }));
        },
        onWheel: Ul(() => {
          r({ type: "USER.SCROLL" });
        }, 150),
        onTouchStart() {
          r({ type: "USER.SCROLL" });
        },
        style: {
          display: "grid",
          gap: "var(--slide-spacing)",
          scrollSnapType: [p ? "x" : "y", a("snapType")].join(" "),
          gridAutoFlow: p ? "column" : "row",
          scrollbarWidth: "none",
          overscrollBehavior: "contain",
          [p ? "gridAutoColumns" : "gridAutoRows"]: "var(--slide-item-size)",
          [p ? "scrollPaddingInline" : "scrollPaddingBlock"]: k,
          [p ? "paddingInline" : "paddingBlock"]: k,
          [p ? "overflowX" : "overflowY"]: "auto"
        }
      });
    },
    getItemProps(I) {
      const x = o.get("slidesInView").includes(I.index);
      return t.element({
        ...Ye.item.attrs,
        id: wf(i, I.index),
        dir: a("dir"),
        role: "group",
        "data-index": I.index,
        "data-inview": B(x),
        "aria-roledescription": "slide",
        "data-orientation": a("orientation"),
        "aria-label": $.item(I.index, a("slideCount")),
        "aria-hidden": mn(!x),
        style: {
          scrollSnapAlign: (() => {
            const m = I.snapAlign ?? "start", y = a("slidesPerMove"), w = y === "auto" ? Math.floor(a("slidesPerPage")) : y;
            return (I.index + w) % w === 0 ? m : void 0;
          })()
        }
      });
    },
    getControlProps() {
      return t.element({
        ...Ye.control.attrs,
        "data-orientation": a("orientation")
      });
    },
    getPrevTriggerProps() {
      return t.button({
        ...Ye.prevTrigger.attrs,
        id: Rf(i),
        type: "button",
        disabled: !f,
        dir: a("dir"),
        "aria-label": $.prevTrigger,
        "data-orientation": a("orientation"),
        "aria-controls": Zn(i),
        onClick(I) {
          I.defaultPrevented || r({ type: "PAGE.PREV", src: "trigger" });
        }
      });
    },
    getNextTriggerProps() {
      return t.button({
        ...Ye.nextTrigger.attrs,
        dir: a("dir"),
        id: Sf(i),
        type: "button",
        "aria-label": $.nextTrigger,
        "data-orientation": a("orientation"),
        "aria-controls": Zn(i),
        disabled: !d,
        onClick(I) {
          I.defaultPrevented || r({ type: "PAGE.NEXT", src: "trigger" });
        }
      });
    },
    getIndicatorGroupProps() {
      return t.element({
        ...Ye.indicatorGroup.attrs,
        dir: a("dir"),
        id: $f(i),
        "data-orientation": a("orientation"),
        onKeyDown(I) {
          if (I.defaultPrevented) return;
          const x = "indicator", m = {
            ArrowDown(N) {
              p || (r({ type: "PAGE.NEXT", src: x }), N.preventDefault());
            },
            ArrowUp(N) {
              p || (r({ type: "PAGE.PREV", src: x }), N.preventDefault());
            },
            ArrowRight(N) {
              p && (r({ type: "PAGE.NEXT", src: x }), N.preventDefault());
            },
            ArrowLeft(N) {
              p && (r({ type: "PAGE.PREV", src: x }), N.preventDefault());
            },
            Home(N) {
              r({ type: "PAGE.SET", index: 0, src: x }), N.preventDefault();
            },
            End(N) {
              r({ type: "PAGE.SET", index: g.length - 1, src: x }), N.preventDefault();
            }
          }, y = yt(I, {
            dir: a("dir"),
            orientation: a("orientation")
          }), w = m[y];
          w?.(I);
        }
      });
    },
    getIndicatorProps(I) {
      return t.button({
        ...Ye.indicator.attrs,
        dir: a("dir"),
        id: Ra(i, I.index),
        type: "button",
        "data-orientation": a("orientation"),
        "data-index": I.index,
        "data-readonly": B(I.readOnly),
        "data-current": B(I.index === h),
        "aria-label": $.indicator(I.index),
        onClick(x) {
          x.defaultPrevented || I.readOnly || r({ type: "PAGE.SET", index: I.index, src: "indicator" });
        }
      });
    },
    getAutoplayTriggerProps() {
      return t.button({
        ...Ye.autoplayTrigger.attrs,
        type: "button",
        "data-orientation": a("orientation"),
        "data-pressed": B(l),
        "aria-label": l ? $.autoplayStop : $.autoplayStart,
        onClick(I) {
          I.defaultPrevented || r({ type: l ? "AUTOPLAY.PAUSE" : "AUTOPLAY.START" });
        }
      });
    }
  };
}
var Lf = {
  props({ props: e }) {
    return ms(e, ["slideCount"], "carousel"), {
      dir: "ltr",
      defaultPage: 0,
      orientation: "horizontal",
      snapType: "mandatory",
      loop: !!e.autoplay,
      slidesPerPage: 1,
      slidesPerMove: "auto",
      spacing: "0px",
      autoplay: !1,
      allowMouseDrag: !1,
      inViewThreshold: 0.6,
      ...e,
      translations: {
        nextTrigger: "Next slide",
        prevTrigger: "Previous slide",
        indicator: (t) => `Go to slide ${t + 1}`,
        item: (t, n) => `${t + 1} of ${n}`,
        autoplayStart: "Start slide rotation",
        autoplayStop: "Stop slide rotation",
        ...e.translations
      }
    };
  },
  refs() {
    return {
      timeoutRef: void 0
    };
  },
  initialState({ prop: e }) {
    return e("autoplay") ? "autoplay" : "idle";
  },
  context({ prop: e, bindable: t, getContext: n }) {
    return {
      page: t(() => ({
        defaultValue: e("defaultPage"),
        value: e("page"),
        onChange(o) {
          const r = n().get("pageSnapPoints");
          e("onPageChange")?.({ page: o, pageSnapPoint: r[o] });
        }
      })),
      pageSnapPoints: t(() => ({
        defaultValue: Nf(e("slideCount"), e("slidesPerMove"), e("slidesPerPage"))
      })),
      slidesInView: t(() => ({
        defaultValue: []
      }))
    };
  },
  computed: {
    isRtl: ({ prop: e }) => e("dir") === "rtl",
    isHorizontal: ({ prop: e }) => e("orientation") === "horizontal",
    canScrollNext: ({ prop: e, context: t }) => e("loop") || t.get("page") < t.get("pageSnapPoints").length - 1,
    canScrollPrev: ({ prop: e, context: t }) => e("loop") || t.get("page") > 0,
    autoplayInterval: ({ prop: e }) => {
      const t = e("autoplay");
      return qn(t) ? t.delay : 4e3;
    }
  },
  watch({ track: e, action: t, context: n, prop: o }) {
    e([() => o("slidesPerPage"), () => o("slidesPerMove")], () => {
      t(["setSnapPoints"]);
    }), e([() => n.get("page")], () => {
      t(["scrollToPage", "focusIndicatorEl"]);
    }), e([() => o("orientation")], () => {
      t(["setSnapPoints", "scrollToPage"]);
    });
  },
  on: {
    "PAGE.NEXT": {
      target: "idle",
      actions: ["clearScrollEndTimer", "setNextPage"]
    },
    "PAGE.PREV": {
      target: "idle",
      actions: ["clearScrollEndTimer", "setPrevPage"]
    },
    "PAGE.SET": {
      target: "idle",
      actions: ["clearScrollEndTimer", "setPage"]
    },
    "INDEX.SET": {
      target: "idle",
      actions: ["clearScrollEndTimer", "setMatchingPage"]
    },
    "SNAP.REFRESH": {
      actions: ["setSnapPoints", "clampPage"]
    },
    "PAGE.SCROLL": {
      actions: ["scrollToPage"]
    }
  },
  effects: ["trackSlideMutation", "trackSlideIntersections", "trackSlideResize"],
  entry: ["setSnapPoints", "setPage"],
  exit: ["clearScrollEndTimer"],
  states: {
    idle: {
      on: {
        "DRAGGING.START": {
          target: "dragging",
          actions: ["invokeDragStart"]
        },
        "AUTOPLAY.START": {
          target: "autoplay",
          actions: ["invokeAutoplayStart"]
        },
        "USER.SCROLL": {
          target: "userScroll"
        }
      }
    },
    dragging: {
      effects: ["trackPointerMove"],
      entry: ["disableScrollSnap"],
      on: {
        DRAGGING: {
          actions: ["scrollSlides", "invokeDragging"]
        },
        "DRAGGING.END": {
          target: "idle",
          actions: ["endDragging", "invokeDraggingEnd"]
        }
      }
    },
    userScroll: {
      effects: ["trackScroll"],
      on: {
        "SCROLL.END": {
          target: "idle",
          actions: ["setClosestPage"]
        }
      }
    },
    autoplay: {
      effects: ["trackDocumentVisibility", "trackScroll", "autoUpdateSlide"],
      exit: ["invokeAutoplayEnd"],
      on: {
        "AUTOPLAY.TICK": {
          actions: ["setNextPage", "invokeAutoplay"]
        },
        "DRAGGING.START": {
          target: "dragging",
          actions: ["invokeDragStart"]
        },
        "AUTOPLAY.PAUSE": {
          target: "idle"
        }
      }
    }
  },
  implementations: {
    effects: {
      autoUpdateSlide({ computed: e, send: t }) {
        const n = setInterval(() => {
          t({ type: "AUTOPLAY.TICK", src: "autoplay.interval" });
        }, e("autoplayInterval"));
        return () => clearInterval(n);
      },
      trackSlideMutation({ scope: e, send: t }) {
        const n = Te(e);
        if (!n) return;
        const o = e.getWin(), s = new o.MutationObserver(() => {
          t({ type: "SNAP.REFRESH", src: "slide.mutation" }), Hr(e);
        });
        return Hr(e), s.observe(n, { childList: !0, subtree: !0 }), () => s.disconnect();
      },
      trackSlideResize({ scope: e, send: t }) {
        if (!Te(e)) return;
        const o = e.getWin(), s = () => {
          t({ type: "SNAP.REFRESH", src: "slide.resize" });
        };
        U(() => {
          s(), U(() => {
            t({ type: "PAGE.SCROLL", instant: !0 });
          });
        });
        const r = new o.ResizeObserver(s);
        return Gr(e).forEach((i) => r.observe(i)), () => r.disconnect();
      },
      trackSlideIntersections({ scope: e, prop: t, context: n }) {
        const o = Te(e), s = e.getWin(), r = new s.IntersectionObserver(
          (i) => {
            const a = i.reduce((l, c) => {
              const d = c.target, f = Number(d.dataset.index ?? "-1");
              return f == null || Number.isNaN(f) || f === -1 ? l : c.isIntersecting ? mi(l, f) : fs(l, f);
            }, n.get("slidesInView"));
            n.set("slidesInView", Al(a));
          },
          {
            root: o,
            threshold: t("inViewThreshold")
          }
        );
        return Gr(e).forEach((i) => r.observe(i)), () => r.disconnect();
      },
      trackScroll({ send: e, refs: t, scope: n }) {
        const o = Te(n);
        return o ? oe(o, "scroll", () => {
          clearTimeout(t.get("timeoutRef")), t.set("timeoutRef", void 0), t.set(
            "timeoutRef",
            setTimeout(() => {
              e({ type: "SCROLL.END" });
            }, 150)
          );
        }, { passive: !0 }) : void 0;
      },
      trackDocumentVisibility({ scope: e, send: t }) {
        const n = e.getDoc();
        return oe(n, "visibilitychange", () => {
          n.visibilityState !== "visible" && t({ type: "AUTOPLAY.PAUSE", src: "doc.hidden" });
        });
      },
      trackPointerMove({ scope: e, send: t }) {
        const n = e.getDoc();
        return zc(n, {
          onPointerMove({ event: o }) {
            t({ type: "DRAGGING", left: -o.movementX, top: -o.movementY });
          },
          onPointerUp() {
            t({ type: "DRAGGING.END" });
          }
        });
      }
    },
    actions: {
      clearScrollEndTimer({ refs: e }) {
        e.get("timeoutRef") != null && (clearTimeout(e.get("timeoutRef")), e.set("timeoutRef", void 0));
      },
      scrollToPage({ context: e, event: t, scope: n, computed: o }) {
        const s = t.instant ? "instant" : "smooth", r = sr(t.index ?? e.get("page"), 0, e.get("pageSnapPoints").length - 1), i = Te(n);
        if (!i) return;
        const a = o("isHorizontal") ? "left" : "top";
        i.scrollTo({ [a]: e.get("pageSnapPoints")[r], behavior: s });
      },
      setClosestPage({ context: e, scope: t, computed: n }) {
        const o = Te(t);
        if (!o) return;
        const s = n("isHorizontal") ? o.scrollLeft : o.scrollTop, r = e.get("pageSnapPoints").findIndex((i) => Math.abs(i - s) < 1);
        r !== -1 && e.set("page", r);
      },
      setNextPage({ context: e, prop: t, state: n }) {
        const o = n.matches("autoplay") || t("loop"), s = hs(e.get("pageSnapPoints"), e.get("page"), { loop: o });
        e.set("page", s);
      },
      setPrevPage({ context: e, prop: t, state: n }) {
        const o = n.matches("autoplay") || t("loop"), s = vi(e.get("pageSnapPoints"), e.get("page"), { loop: o });
        e.set("page", s);
      },
      setMatchingPage({ context: e, event: t, computed: n, scope: o }) {
        const s = Te(o);
        if (!s) return;
        const r = Of(
          s,
          n("isHorizontal") ? "x" : "y",
          (a) => a.dataset.index === t.index.toString()
        );
        if (r == null) return;
        const i = e.get("pageSnapPoints").findIndex((a) => Math.abs(a - r) < 1);
        e.set("page", i);
      },
      setPage({ context: e, event: t }) {
        const n = t.index ?? e.get("page");
        e.set("page", n);
      },
      clampPage({ context: e }) {
        const t = sr(e.get("page"), 0, e.get("pageSnapPoints").length - 1);
        e.set("page", t);
      },
      setSnapPoints({ context: e, computed: t, scope: n }) {
        const o = Te(n);
        if (!o) return;
        const s = Br(o);
        e.set("pageSnapPoints", t("isHorizontal") ? s.x : s.y);
      },
      disableScrollSnap({ scope: e }) {
        const t = Te(e);
        if (!t) return;
        const n = getComputedStyle(t);
        t.dataset.scrollSnapType = n.getPropertyValue("scroll-snap-type"), t.style.setProperty("scroll-snap-type", "none");
      },
      scrollSlides({ scope: e, event: t }) {
        Te(e)?.scrollBy({ left: t.left, top: t.top, behavior: "instant" });
      },
      endDragging({ scope: e, context: t, computed: n }) {
        const o = Te(e);
        if (!o) return;
        const s = o.scrollLeft, r = o.scrollTop, i = Br(o), a = i.x.reduce((c, d) => Math.abs(d - s) < Math.abs(c - s) ? d : c, i.x[0]), l = i.y.reduce((c, d) => Math.abs(d - r) < Math.abs(c - r) ? d : c, i.y[0]);
        U(() => {
          o.scrollTo({ left: a, top: l, behavior: "smooth" });
          const c = n("isHorizontal") ? a : l;
          t.set("page", t.get("pageSnapPoints").indexOf(c)), o.dataset.scrollSnapType && (o.style.removeProperty("scroll-snap-type"), delete o.dataset.scrollSnapType);
        });
      },
      focusIndicatorEl({ context: e, event: t, scope: n }) {
        if (t.src !== "indicator") return;
        const o = Vf(n, e.get("page"));
        o && U(() => o.focus({ preventScroll: !0 }));
      },
      invokeDragStart({ context: e, prop: t }) {
        t("onDragStatusChange")?.({ type: "dragging.start", isDragging: !0, page: e.get("page") });
      },
      invokeDragging({ context: e, prop: t }) {
        t("onDragStatusChange")?.({ type: "dragging", isDragging: !0, page: e.get("page") });
      },
      invokeDraggingEnd({ context: e, prop: t }) {
        t("onDragStatusChange")?.({ type: "dragging.end", isDragging: !1, page: e.get("page") });
      },
      invokeAutoplay({ context: e, prop: t }) {
        t("onAutoplayStatusChange")?.({ type: "autoplay", isPlaying: !0, page: e.get("page") });
      },
      invokeAutoplayStart({ context: e, prop: t }) {
        t("onAutoplayStatusChange")?.({ type: "autoplay.start", isPlaying: !0, page: e.get("page") });
      },
      invokeAutoplayEnd({ context: e, prop: t }) {
        t("onAutoplayStatusChange")?.({ type: "autoplay.stop", isPlaying: !1, page: e.get("page") });
      }
    }
  }
};
function Nf(e, t, n) {
  if (e == null) return [];
  const o = [], s = t === "auto" ? Math.floor(n) : t;
  for (let r = 0; r < e - 1; r += s) o.push(r);
  return o;
}
ne()([
  "dir",
  "getRootNode",
  "id",
  "ids",
  "loop",
  "page",
  "defaultPage",
  "onPageChange",
  "orientation",
  "slideCount",
  "slidesPerPage",
  "slidesPerMove",
  "spacing",
  "padding",
  "autoplay",
  "allowMouseDrag",
  "inViewThreshold",
  "translations",
  "snapType",
  "onDragStatusChange",
  "onAutoplayStatusChange"
]);
ne()(["index", "readOnly"]);
ne()(["index", "snapAlign"]);
const Df = (e, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = L(() => {
    const a = ce(e);
    return {
      id: n,
      dir: s.value.dir,
      getRootNode: o?.value.getRootNode,
      ...Xe(a),
      onAutoplayStatusChange: (l) => {
        t?.("autoplayStatusChange", l), a.onAutoplayStatusChange?.(l);
      },
      onDragStatusChange: (l) => {
        t?.("dragStatusChange", l), a.onDragStatusChange?.(l);
      },
      onPageChange: (l) => {
        t?.("pageChange", l), t?.("update:page", l.page), a.onPageChange?.(l);
      }
    };
  }), i = Se(Lf, r);
  return L(() => Af(i, Ne));
}, Bf = /* @__PURE__ */ _({
  __name: "carousel-root",
  props: /* @__PURE__ */ ve({
    allowMouseDrag: { type: Boolean },
    autoplay: { type: [Boolean, Object] },
    defaultPage: {},
    id: {},
    ids: {},
    inViewThreshold: {},
    loop: { type: Boolean },
    orientation: {},
    padding: {},
    page: {},
    slideCount: {},
    slidesPerMove: {},
    slidesPerPage: {},
    snapType: {},
    spacing: {},
    translations: {},
    asChild: { type: Boolean }
  }, {
    allowMouseDrag: void 0,
    loop: void 0,
    autoplay: void 0
  }),
  emits: ["autoplayStatusChange", "dragStatusChange", "pageChange", "update:page"],
  setup(e, { emit: t }) {
    const s = Df(e, t);
    return Pa(s), R(), (r, i) => (v(), T(u(A).div, V(u(s).getRootProps(), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), st = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AutoplayTrigger: ff,
  Context: hf,
  Control: mf,
  Indicator: yf,
  IndicatorGroup: vf,
  Item: Cf,
  ItemGroup: bf,
  NextTrigger: _f,
  PrevTrigger: Ef,
  Root: Bf,
  RootProvider: Tf
}, Symbol.toStringTag, { value: "Module" })), Mf = { class: "input-wrapper" }, Ff = {
  key: 0,
  class: "input-label"
}, Gf = {
  key: 0,
  class: "required"
}, Hf = ["type", "placeholder", "required", "disabled"], Uf = /* @__PURE__ */ _({
  __name: "BaseInput",
  props: /* @__PURE__ */ ut({
    placeholder: { default: "" },
    type: { default: "text" },
    state: { default: "default" },
    label: { default: "" },
    required: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  }, {
    modelValue: { type: [String, Number, Boolean] },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = Qe(e, "modelValue");
    return (o, s) => (v(), M("div", Mf, [
      t.label ? (v(), M("label", Ff, [
        ee(W(t.label) + " ", 1),
        t.required ? (v(), M("span", Gf, "*")) : Z("", !0)
      ])) : Z("", !0),
      Ft(H("input", {
        "onUpdate:modelValue": s[0] || (s[0] = (r) => n.value = r),
        type: t.type,
        placeholder: t.placeholder,
        required: t.required,
        disabled: t.disabled,
        class: ie(["base-input", [t.state, { disabled: t.disabled }]])
      }, null, 10, Hf), [
        [pl, n.value]
      ])
    ]));
  }
}), Uy = /* @__PURE__ */ Q(Uf, [["__scopeId", "data-v-dcaf2c62"]]), zf = {
  key: 0,
  class: "base-select__label"
}, Wf = ["disabled"], Kf = {
  key: 0,
  value: "",
  disabled: "",
  hidden: ""
}, jf = ["value", "disabled"], qf = { class: "base-select__display" }, Xf = { class: "base-select__display-text" }, Yf = /* @__PURE__ */ _({
  __name: "BaseSelect",
  props: {
    modelValue: { default: void 0 },
    options: {},
    label: { default: "" },
    placeholder: { default: "" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = L({
      get: () => n.modelValue,
      set: (i) => {
        o("update:modelValue", i), o("change", i);
      }
    }), r = L(() => {
      const i = n.options.find(
        (a) => a.value === n.modelValue
      );
      return i ? i.label : n.placeholder;
    });
    return (i, a) => (v(), M("div", {
      class: ie(["base-select", {
        "base-select--disabled": n.disabled
      }])
    }, [
      n.label ? (v(), M("label", zf, W(n.label), 1)) : Z("", !0),
      H("div", {
        class: ie(["base-select__wrapper", {
          "base-select__wrapper--active": s.value
        }])
      }, [
        Ft(H("select", {
          "onUpdate:modelValue": a[0] || (a[0] = (l) => s.value = l),
          disabled: n.disabled,
          class: "base-select__native"
        }, [
          n.placeholder ? (v(), M("option", Kf, W(n.placeholder), 1)) : Z("", !0),
          (v(!0), M(re, null, xe(n.options, (l) => (v(), M("option", {
            key: l.value,
            value: l.value,
            disabled: l.disabled,
            class: "option"
          }, W(l.label), 9, jf))), 128))
        ], 8, Wf), [
          [gl, s.value]
        ]),
        H("div", qf, [
          H("span", Xf, W(r.value), 1),
          a[1] || (a[1] = H("span", { class: "base-select__icon" }, "▼", -1))
        ])
      ], 2)
    ], 2));
  }
}), zy = /* @__PURE__ */ Q(Yf, [["__scopeId", "data-v-f048c248"]]), [$a, Vn] = X("CheckboxContext"), Zf = /* @__PURE__ */ _({
  __name: "checkbox-context",
  setup(e) {
    const t = Vn();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), Qf = /* @__PURE__ */ _({
  __name: "checkbox-control",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Vn();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getControlProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
});
var Va = Pe("checkbox").parts("root", "label", "control", "indicator"), Un = Va.build(), Aa = (e) => e.ids?.root ?? `checkbox:${e.id}`, Ur = (e) => e.ids?.label ?? `checkbox:${e.id}:label`, Jf = (e) => e.ids?.control ?? `checkbox:${e.id}:control`, as = (e) => e.ids?.hiddenInput ?? `checkbox:${e.id}:input`, eh = (e) => e.getById(Aa(e)), gn = (e) => e.getById(as(e));
function th(e, t) {
  const { send: n, context: o, prop: s, computed: r, scope: i } = e, a = s("disabled"), l = s("readOnly"), c = s("invalid"), d = !a && o.get("focused"), f = !a && o.get("focusVisible"), p = r("checked"), g = r("indeterminate"), h = {
    "data-active": B(o.get("active")),
    "data-focus": B(d),
    "data-focus-visible": B(f),
    "data-readonly": B(l),
    "data-hover": B(o.get("hovered")),
    "data-disabled": B(a),
    "data-state": g ? "indeterminate" : p ? "checked" : "unchecked",
    "data-invalid": B(c)
  };
  return {
    checked: p,
    disabled: a,
    indeterminate: g,
    focused: d,
    checkedState: p,
    setChecked(b) {
      n({ type: "CHECKED.SET", checked: b, isTrusted: !1 });
    },
    toggleChecked() {
      n({ type: "CHECKED.TOGGLE", checked: p, isTrusted: !1 });
    },
    getRootProps() {
      return t.label({
        ...Un.root.attrs,
        ...h,
        dir: s("dir"),
        id: Aa(i),
        htmlFor: as(i),
        onPointerMove() {
          a || n({ type: "CONTEXT.SET", context: { hovered: !0 } });
        },
        onPointerLeave() {
          a || n({ type: "CONTEXT.SET", context: { hovered: !1 } });
        },
        onClick(b) {
          me(b) === gn(i) && b.stopPropagation();
        }
      });
    },
    getLabelProps() {
      return t.element({
        ...Un.label.attrs,
        ...h,
        dir: s("dir"),
        id: Ur(i)
      });
    },
    getControlProps() {
      return t.element({
        ...Un.control.attrs,
        ...h,
        dir: s("dir"),
        id: Jf(i),
        "aria-hidden": !0
      });
    },
    getIndicatorProps() {
      return t.element({
        ...Un.indicator.attrs,
        ...h,
        dir: s("dir"),
        hidden: !g && !p
      });
    },
    getHiddenInputProps() {
      return t.input({
        id: as(i),
        type: "checkbox",
        required: s("required"),
        defaultChecked: p,
        disabled: a,
        "aria-labelledby": Ur(i),
        "aria-invalid": c,
        name: s("name"),
        form: s("form"),
        value: s("value"),
        style: Ss,
        onFocus() {
          const b = xn();
          n({ type: "CONTEXT.SET", context: { focused: !0, focusVisible: b } });
        },
        onBlur() {
          n({ type: "CONTEXT.SET", context: { focused: !1, focusVisible: !1 } });
        },
        onClick(b) {
          if (l) {
            b.preventDefault();
            return;
          }
          const k = b.currentTarget.checked;
          n({ type: "CHECKED.SET", checked: k, isTrusted: !0 });
        }
      });
    }
  };
}
var { not: zr } = nt(), nh = {
  props({ props: e }) {
    return {
      value: "on",
      ...e,
      defaultChecked: !!e.defaultChecked
    };
  },
  initialState() {
    return "ready";
  },
  context({ prop: e, bindable: t }) {
    return {
      checked: t(() => ({
        defaultValue: e("defaultChecked"),
        value: e("checked"),
        onChange(n) {
          e("onCheckedChange")?.({ checked: n });
        }
      })),
      fieldsetDisabled: t(() => ({ defaultValue: !1 })),
      focusVisible: t(() => ({ defaultValue: !1 })),
      active: t(() => ({ defaultValue: !1 })),
      focused: t(() => ({ defaultValue: !1 })),
      hovered: t(() => ({ defaultValue: !1 }))
    };
  },
  watch({ track: e, context: t, prop: n, action: o }) {
    e([() => n("disabled")], () => {
      o(["removeFocusIfNeeded"]);
    }), e([() => t.get("checked")], () => {
      o(["syncInputElement"]);
    });
  },
  effects: ["trackFormControlState", "trackPressEvent", "trackFocusVisible"],
  on: {
    "CHECKED.TOGGLE": [
      {
        guard: zr("isTrusted"),
        actions: ["toggleChecked", "dispatchChangeEvent"]
      },
      {
        actions: ["toggleChecked"]
      }
    ],
    "CHECKED.SET": [
      {
        guard: zr("isTrusted"),
        actions: ["setChecked", "dispatchChangeEvent"]
      },
      {
        actions: ["setChecked"]
      }
    ],
    "CONTEXT.SET": {
      actions: ["setContext"]
    }
  },
  computed: {
    indeterminate: ({ context: e }) => Qn(e.get("checked")),
    checked: ({ context: e }) => oh(e.get("checked")),
    disabled: ({ context: e, prop: t }) => !!t("disabled") || e.get("fieldsetDisabled")
  },
  states: {
    ready: {}
  },
  implementations: {
    guards: {
      isTrusted: ({ event: e }) => !!e.isTrusted
    },
    effects: {
      trackPressEvent({ context: e, computed: t, scope: n }) {
        if (!t("disabled"))
          return $i({
            pointerNode: eh(n),
            keyboardNode: gn(n),
            isValidKey: (o) => o.key === " ",
            onPress: () => e.set("active", !1),
            onPressStart: () => e.set("active", !0),
            onPressEnd: () => e.set("active", !1)
          });
      },
      trackFocusVisible({ computed: e, scope: t }) {
        if (!e("disabled"))
          return Us({ root: t.getRootNode?.() });
      },
      trackFormControlState({ context: e, scope: t }) {
        return Is(gn(t), {
          onFieldsetDisabledChange(n) {
            e.set("fieldsetDisabled", n);
          },
          onFormReset() {
            e.set("checked", e.initial("checked"));
          }
        });
      }
    },
    actions: {
      setContext({ context: e, event: t }) {
        for (const n in t.context)
          e.set(n, t.context[n]);
      },
      syncInputElement({ context: e, computed: t, scope: n }) {
        const o = gn(n);
        o && (Es(o, t("checked")), o.indeterminate = Qn(e.get("checked")));
      },
      removeFocusIfNeeded({ context: e, prop: t }) {
        t("disabled") && e.get("focused") && (e.set("focused", !1), e.set("focusVisible", !1));
      },
      setChecked({ context: e, event: t }) {
        e.set("checked", t.checked);
      },
      toggleChecked({ context: e, computed: t }) {
        const n = Qn(t("checked")) ? !0 : !t("checked");
        e.set("checked", n);
      },
      dispatchChangeEvent({ computed: e, scope: t }) {
        queueMicrotask(() => {
          const n = gn(t);
          Ts(n, { checked: e("checked") });
        });
      }
    }
  }
};
function Qn(e) {
  return e === "indeterminate";
}
function oh(e) {
  return Qn(e) ? !1 : !!e;
}
ne()([
  "defaultChecked",
  "checked",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "name",
  "onCheckedChange",
  "readOnly",
  "required",
  "value"
]);
const sh = Va.extendWith("group");
function rh(e, t, n, o = {}) {
  const { passive: s = !1, eventName: r, defaultValue: i } = o, a = pi(), l = n || a?.emit || a?.$emit?.bind(a) || a?.proxy?.$emit?.bind(a?.proxy), c = t, d = () => e[c] ?? i, f = (p) => {
    if (!r)
      l(r || `update:${c.toString()}`, p);
    else
      for (const g of r)
        l(g, p);
  };
  if (s) {
    const p = d(), g = J(p);
    let h = !1;
    return ct(
      () => e[c],
      (b) => {
        h || (h = !0, g.value = b, vo(() => {
          h = !1;
        }));
      }
    ), ct(g, (b) => {
      !h && b !== e[c] && f(b);
    }), g;
  }
  return L({
    get() {
      return d();
    },
    set(p) {
      f(p);
    }
  });
}
function ih(e, t) {
  const n = L(() => !(e.disabled || e.readOnly)), { defaultValue: o } = fl(e), s = rh(e, "modelValue", t, {
    defaultValue: o?.value ?? [],
    passive: e.modelValue === void 0,
    eventName: ["valueChange", "update:modelValue"]
  }), r = (f) => s.value.some((p) => String(p) === String(f)), i = (f) => {
    r(f) ? l(f) : a(f);
  }, a = (f) => {
    n.value && (r(f) || (s.value = s.value.concat(f)));
  }, l = (f) => {
    n.value && (s.value = s.value.filter((p) => String(p) !== String(f)));
  }, c = (f) => ({
    checked: f.value != null ? r(f.value) : void 0,
    onCheckedChange() {
      f.value != null && i(f.value);
    },
    name: e.name,
    disabled: e.disabled,
    readOnly: e.readOnly,
    invalid: e.invalid
  }), d = (f) => {
    s.value = f;
  };
  return L(() => ({
    isChecked: r,
    value: s.value,
    name: e.name,
    disabled: e.disabled,
    readOnly: e.readOnly,
    invalid: e.invalid,
    addValue: a,
    setValue: d,
    toggleValue: i,
    getItemProps: c
  }));
}
const [ah, lh] = X("CheckboxGroupContext"), ch = /* @__PURE__ */ _({
  __name: "checkbox-group",
  props: /* @__PURE__ */ ve({
    defaultValue: {},
    modelValue: {},
    disabled: { type: Boolean },
    readOnly: { type: Boolean },
    name: {},
    invalid: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    disabled: void 0,
    readOnly: void 0,
    invalid: void 0
  }),
  emits: ["valueChange", "update:modelValue"],
  setup(e, { emit: t }) {
    const s = ih(e, t);
    return ah(s), R(), (r, i) => (v(), T(u(A).div, V({ role: "group" }, { ...u(sh).build().group.attrs }, { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), [Wy, Yt] = X("FieldContext"), uh = /* @__PURE__ */ _({
  __name: "checkbox-hidden-input",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Vn(), n = Yt();
    return R(), (o, s) => (v(), T(u(A).input, V({
      "aria-describedby": u(n)?.ariaDescribedby
    }, u(t).getHiddenInputProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-describedby", "as-child"]));
  }
}), dh = /* @__PURE__ */ _({
  __name: "checkbox-indicator",
  props: {
    indeterminate: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = Vn(), o = L(() => t.indeterminate ? n.value.indeterminate : n.value.checked);
    return R(), (s, r) => (v(), T(u(A).div, V(u(n).getIndicatorProps(), {
      hidden: !o.value,
      "as-child": s.asChild
    }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["hidden", "as-child"]));
  }
}), ph = /* @__PURE__ */ _({
  __name: "checkbox-label",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Vn();
    return R(), (n, o) => (v(), T(u(A).span, V(u(t).getLabelProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), gh = /* @__PURE__ */ _({
  __name: "checkbox-root-provider",
  props: {
    value: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return $a(n), R(), (o, s) => (v(), T(u(A).label, V(n.value.getRootProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), fh = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = Yt(), i = lh(), a = L(() => {
    const d = ce(e);
    return Kt(d, i?.value.getItemProps({ value: d.value }) ?? {});
  }), l = L(() => {
    const d = ce(e);
    return {
      id: n,
      ids: {
        label: r?.value.ids.label,
        hiddenInput: r?.value.ids.control
      },
      disabled: r?.value.disabled,
      readOnly: r?.value.readOnly,
      invalid: r?.value.invalid,
      required: r?.value.required,
      dir: s.value.dir,
      getRootNode: o?.value.getRootNode,
      ...Xe(a.value),
      onCheckedChange(f) {
        t?.("checkedChange", f), t?.("update:checked", f.checked), d.onCheckedChange?.(f);
      }
    };
  }), c = Se(nh, l);
  return L(() => th(c, Ne));
}, hh = /* @__PURE__ */ _({
  __name: "checkbox-root",
  props: /* @__PURE__ */ ve({
    checked: {},
    defaultChecked: {},
    disabled: { type: Boolean },
    form: {},
    id: {},
    ids: {},
    invalid: { type: Boolean },
    name: {},
    readOnly: { type: Boolean },
    required: { type: Boolean },
    value: {},
    asChild: { type: Boolean }
  }, {
    checked: void 0,
    defaultChecked: void 0,
    disabled: void 0,
    invalid: void 0,
    readOnly: void 0,
    required: void 0
  }),
  emits: ["checkedChange", "update:checked"],
  setup(e, { emit: t }) {
    const s = fh(e, t);
    return $a(s), R(), (r, i) => (v(), T(u(A).label, V(u(s).getRootProps(), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Context: Zf,
  Control: Qf,
  Group: ch,
  HiddenInput: uh,
  Indicator: dh,
  Label: ph,
  Root: hh,
  RootProvider: gh
}, Symbol.toStringTag, { value: "Module" })), mh = /* @__PURE__ */ _({
  __name: "BaseCheckbox",
  props: {
    modelValue: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    indeterminate: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = L({
      get: () => n.indeterminate ? "indeterminate" : n.modelValue,
      set: (r) => {
        r !== "indeterminate" && o("update:modelValue", r);
      }
    });
    return (r, i) => (v(), T(u($t).Root, {
      checked: s.value,
      "onUpdate:checked": i[0] || (i[0] = (a) => s.value = a),
      disabled: n.disabled,
      class: "base-checkbox"
    }, {
      default: C(() => [
        F(u($t).Control, { class: "checkbox-control" }, {
          default: C(() => [
            F(u($t).Indicator, null, {
              default: C(() => [
                F(u(Gt), {
                  name: "check",
                  size: "18",
                  class: "checkbox-icon"
                })
              ]),
              _: 1
            }),
            F(u($t).Indicator, { indeterminate: "" }, {
              default: C(() => [
                F(u(Gt), {
                  name: "minus",
                  size: "18",
                  class: "checkbox-icon"
                })
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        F(u($t).Label, { class: "checkbox-label" }, {
          default: C(() => [
            E(r.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        }),
        F(u($t).HiddenInput)
      ]),
      _: 3
    }, 8, ["checked", "disabled"]));
  }
}), Ky = /* @__PURE__ */ Q(mh, [["__scopeId", "data-v-0f6246c7"]]), [La, It] = X("RadioGroupContext"), vh = /* @__PURE__ */ _({
  __name: "radio-group-context",
  setup(e) {
    const t = It();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), yh = /* @__PURE__ */ _({
  __name: "radio-group-indicator",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = It();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getIndicatorProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), [bh, Ch] = X("RadioGroupItemContext"), _h = /* @__PURE__ */ _({
  __name: "radio-group-item-context",
  setup(e) {
    const t = Ch();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), [Eh, Ws] = X("RadioGroupItemPropsContext"), Th = /* @__PURE__ */ _({
  __name: "radio-group-item-control",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = It(), n = Ws();
    return R(), (o, s) => (v(), T(u(A).div, V(u(t).getItemControlProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Ih = /* @__PURE__ */ _({
  __name: "radio-group-item-hidden-input",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = It(), n = Ws();
    return R(), (o, s) => (v(), T(u(A).input, V(u(t).getItemHiddenInputProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), kh = /* @__PURE__ */ _({
  __name: "radio-group-item-text",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = It(), n = Ws();
    return R(), (o, s) => (v(), T(u(A).span, V(u(t).getItemTextProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Oh = /* @__PURE__ */ _({
  __name: "radio-group-item",
  props: {
    value: {},
    disabled: { type: Boolean },
    invalid: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = It();
    return Eh(t), bh(L(() => n.value.getItemState(t))), R(), (o, s) => (v(), T(u(A).label, V(u(n).getItemProps(t), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), xh = /* @__PURE__ */ _({
  __name: "radio-group-label",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = It();
    return R(), (n, o) => (v(), T(u(A).label, V(u(t).getLabelProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Ph = /* @__PURE__ */ _({
  __name: "radio-group-root-provider",
  props: {
    value: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return La(n), R(), (o, s) => (v(), T(u(A).div, V(n.value.getRootProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), wh = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = L(() => {
    const a = ce(e);
    return {
      id: n,
      dir: s.value.dir,
      value: a.modelValue,
      getRootNode: o?.value.getRootNode,
      ...Xe(a),
      onValueChange: (l) => {
        t?.("valueChange", l), t?.("update:modelValue", l.value), a.onValueChange?.(l);
      }
    };
  }), i = Se(xa, r);
  return L(() => Oa(i, Ne));
}, Sh = /* @__PURE__ */ _({
  __name: "radio-group-root",
  props: /* @__PURE__ */ ve({
    defaultValue: {},
    disabled: { type: Boolean },
    form: {},
    id: {},
    ids: {},
    modelValue: {},
    name: {},
    orientation: {},
    readOnly: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    disabled: void 0,
    readOnly: void 0
  }),
  emits: ["valueChange", "update:modelValue"],
  setup(e, { emit: t }) {
    const s = wh(e, t);
    return La(s), R(), (r, i) => (v(), T(u(A).div, V(u(s).getRootProps(), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), mt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Context: vh,
  Indicator: yh,
  Item: Oh,
  ItemContext: _h,
  ItemControl: Th,
  ItemHiddenInput: Ih,
  ItemText: kh,
  Label: xh,
  Root: Sh,
  RootProvider: Ph
}, Symbol.toStringTag, { value: "Module" })), Rh = /* @__PURE__ */ _({
  __name: "BaseRadioGroup",
  props: {
    modelValue: {},
    items: {},
    name: {},
    label: {},
    disabled: { type: Boolean },
    orientation: { default: "vertical" },
    size: { default: "md" }
  },
  emits: ["update:modelValue", "valueChange"],
  setup(e, { emit: t }) {
    const n = e, o = t;
    return (s, r) => (v(), T(u(mt).Root, {
      "model-value": n.modelValue,
      name: n.name,
      disabled: n.disabled,
      orientation: n.orientation,
      class: ie(["radioGroup__root", `radioGroup__root--size_${n.size}`]),
      "onUpdate:modelValue": r[0] || (r[0] = (i) => o("update:modelValue", i)),
      onValueChange: r[1] || (r[1] = (i) => o("valueChange", i))
    }, {
      default: C(() => [
        n.label ? (v(), T(u(mt).Label, {
          key: 0,
          class: ie(["radioGroup__label", `radioGroup__label--size_${n.size}`])
        }, {
          default: C(() => [
            ee(W(n.label), 1)
          ]),
          _: 1
        }, 8, ["class"])) : Z("", !0),
        F(u(mt).Indicator),
        (v(!0), M(re, null, xe(n.items, (i) => (v(), T(u(mt).Item, {
          key: i.value,
          value: i.value,
          disabled: i.disabled,
          class: ie(["radioGroup__item", `radioGroup__item--size_${n.size}`])
        }, {
          default: C(() => [
            F(u(mt).ItemControl, {
              class: ie(["radioGroup__itemControl", `radioGroup__itemControl--size_${n.size}`])
            }, null, 8, ["class"]),
            F(u(mt).ItemText, {
              class: ie(["radioGroup__itemText", `radioGroup__itemText--size_${n.size}`])
            }, {
              default: C(() => [
                ee(W(i.label), 1)
              ]),
              _: 2
            }, 1032, ["class"]),
            F(u(mt).ItemHiddenInput)
          ]),
          _: 2
        }, 1032, ["value", "disabled", "class"]))), 128))
      ]),
      _: 1
    }, 8, ["model-value", "name", "disabled", "orientation", "class"]));
  }
}), jy = /* @__PURE__ */ Q(Rh, [["__scopeId", "data-v-a462b9e0"]]), [Na, An] = X("SwitchContext"), $h = /* @__PURE__ */ _({
  __name: "switch-context",
  setup(e) {
    const t = An();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), Vh = /* @__PURE__ */ _({
  __name: "switch-control",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = An();
    return R(), (n, o) => (v(), T(u(A).span, V(u(t).getControlProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Ah = /* @__PURE__ */ _({
  __name: "switch-hidden-input",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = An(), n = Yt();
    return R(), (o, s) => (v(), T(u(A).input, V({
      "aria-describedby": u(n)?.ariaDescribedby
    }, u(t).getHiddenInputProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-describedby", "as-child"]));
  }
}), Lh = /* @__PURE__ */ _({
  __name: "switch-label",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = An();
    return R(), (n, o) => (v(), T(u(A).span, V(u(t).getLabelProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Nh = /* @__PURE__ */ _({
  __name: "switch-root-provider",
  props: {
    value: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return Na(n), R(), (o, s) => (v(), T(u(A).label, V(n.value.getRootProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
});
var Dh = Pe("switch").parts("root", "label", "control", "thumb"), zn = Dh.build(), Da = (e) => e.ids?.root ?? `switch:${e.id}`, Wr = (e) => e.ids?.label ?? `switch:${e.id}:label`, Bh = (e) => e.ids?.thumb ?? `switch:${e.id}:thumb`, Mh = (e) => e.ids?.control ?? `switch:${e.id}:control`, ls = (e) => e.ids?.hiddenInput ?? `switch:${e.id}:input`, Fh = (e) => e.getById(Da(e)), Bt = (e) => e.getById(ls(e));
function Gh(e, t) {
  const { context: n, send: o, prop: s, scope: r } = e, i = s("disabled"), a = s("readOnly"), l = !!n.get("checked"), c = !i && n.get("focused"), d = !i && n.get("focusVisible"), f = {
    "data-active": B(n.get("active")),
    "data-focus": B(c),
    "data-focus-visible": B(d),
    "data-readonly": B(a),
    "data-hover": B(n.get("hovered")),
    "data-disabled": B(i),
    "data-state": l ? "checked" : "unchecked",
    "data-invalid": B(s("invalid"))
  };
  return {
    checked: l,
    disabled: i,
    focused: c,
    setChecked(p) {
      o({ type: "CHECKED.SET", checked: p, isTrusted: !1 });
    },
    toggleChecked() {
      o({ type: "CHECKED.TOGGLE", checked: l, isTrusted: !1 });
    },
    getRootProps() {
      return t.label({
        ...zn.root.attrs,
        ...f,
        dir: s("dir"),
        id: Da(r),
        htmlFor: ls(r),
        onPointerMove() {
          i || o({ type: "CONTEXT.SET", context: { hovered: !0 } });
        },
        onPointerLeave() {
          i || o({ type: "CONTEXT.SET", context: { hovered: !1 } });
        },
        onClick(p) {
          if (i) return;
          me(p) === Bt(r) && p.stopPropagation(), To() && Bt(r)?.focus();
        }
      });
    },
    getLabelProps() {
      return t.element({
        ...zn.label.attrs,
        ...f,
        dir: s("dir"),
        id: Wr(r)
      });
    },
    getThumbProps() {
      return t.element({
        ...zn.thumb.attrs,
        ...f,
        dir: s("dir"),
        id: Bh(r),
        "aria-hidden": !0
      });
    },
    getControlProps() {
      return t.element({
        ...zn.control.attrs,
        ...f,
        dir: s("dir"),
        id: Mh(r),
        "aria-hidden": !0
      });
    },
    getHiddenInputProps() {
      return t.input({
        id: ls(r),
        type: "checkbox",
        required: s("required"),
        defaultChecked: l,
        disabled: i,
        "aria-labelledby": Wr(r),
        "aria-invalid": s("invalid"),
        name: s("name"),
        form: s("form"),
        value: s("value"),
        style: Ss,
        onFocus() {
          const p = xn();
          o({ type: "CONTEXT.SET", context: { focused: !0, focusVisible: p } });
        },
        onBlur() {
          o({ type: "CONTEXT.SET", context: { focused: !1, focusVisible: !1 } });
        },
        onClick(p) {
          if (a) {
            p.preventDefault();
            return;
          }
          const g = p.currentTarget.checked;
          o({ type: "CHECKED.SET", checked: g, isTrusted: !0 });
        }
      });
    }
  };
}
var { not: Kr } = nt(), Hh = {
  props({ props: e }) {
    return {
      defaultChecked: !1,
      label: "switch",
      value: "on",
      ...e
    };
  },
  initialState() {
    return "ready";
  },
  context({ prop: e, bindable: t }) {
    return {
      checked: t(() => ({
        defaultValue: e("defaultChecked"),
        value: e("checked"),
        onChange(n) {
          e("onCheckedChange")?.({ checked: n });
        }
      })),
      fieldsetDisabled: t(() => ({
        defaultValue: !1
      })),
      focusVisible: t(() => ({
        defaultValue: !1
      })),
      active: t(() => ({
        defaultValue: !1
      })),
      focused: t(() => ({
        defaultValue: !1
      })),
      hovered: t(() => ({
        defaultValue: !1
      }))
    };
  },
  computed: {
    isDisabled: ({ context: e, prop: t }) => t("disabled") || e.get("fieldsetDisabled")
  },
  watch({ track: e, prop: t, context: n, action: o }) {
    e([() => t("disabled")], () => {
      o(["removeFocusIfNeeded"]);
    }), e([() => n.get("checked")], () => {
      o(["syncInputElement"]);
    });
  },
  effects: ["trackFormControlState", "trackPressEvent", "trackFocusVisible"],
  on: {
    "CHECKED.TOGGLE": [
      {
        guard: Kr("isTrusted"),
        actions: ["toggleChecked", "dispatchChangeEvent"]
      },
      {
        actions: ["toggleChecked"]
      }
    ],
    "CHECKED.SET": [
      {
        guard: Kr("isTrusted"),
        actions: ["setChecked", "dispatchChangeEvent"]
      },
      {
        actions: ["setChecked"]
      }
    ],
    "CONTEXT.SET": {
      actions: ["setContext"]
    }
  },
  states: {
    ready: {}
  },
  implementations: {
    guards: {
      isTrusted: ({ event: e }) => !!e.isTrusted
    },
    effects: {
      trackPressEvent({ computed: e, scope: t, context: n }) {
        if (!e("isDisabled"))
          return $i({
            pointerNode: Fh(t),
            keyboardNode: Bt(t),
            isValidKey: (o) => o.key === " ",
            onPress: () => n.set("active", !1),
            onPressStart: () => n.set("active", !0),
            onPressEnd: () => n.set("active", !1)
          });
      },
      trackFocusVisible({ computed: e, scope: t }) {
        if (!e("isDisabled"))
          return Us({ root: t.getRootNode() });
      },
      trackFormControlState({ context: e, send: t, scope: n }) {
        return Is(Bt(n), {
          onFieldsetDisabledChange(o) {
            e.set("fieldsetDisabled", o);
          },
          onFormReset() {
            const o = e.initial("checked");
            t({ type: "CHECKED.SET", checked: !!o, src: "form-reset" });
          }
        });
      }
    },
    actions: {
      setContext({ context: e, event: t }) {
        for (const n in t.context)
          e.set(n, t.context[n]);
      },
      syncInputElement({ context: e, scope: t }) {
        const n = Bt(t);
        n && Es(n, !!e.get("checked"));
      },
      removeFocusIfNeeded({ context: e, prop: t }) {
        t("disabled") && e.set("focused", !1);
      },
      setChecked({ context: e, event: t }) {
        e.set("checked", t.checked);
      },
      toggleChecked({ context: e }) {
        e.set("checked", !e.get("checked"));
      },
      dispatchChangeEvent({ context: e, scope: t }) {
        const n = Bt(t);
        Ts(n, { checked: e.get("checked") });
      }
    }
  }
};
ne()([
  "checked",
  "defaultChecked",
  "dir",
  "disabled",
  "form",
  "getRootNode",
  "id",
  "ids",
  "invalid",
  "label",
  "name",
  "onCheckedChange",
  "readOnly",
  "required",
  "value"
]);
const Uh = (e = {}, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = Yt(), i = L(() => {
    const l = ce(e);
    return {
      id: n,
      ids: {
        label: r?.value.ids.label,
        hiddenInput: r?.value.ids.control
      },
      disabled: r?.value.disabled,
      readOnly: r?.value.readOnly,
      invalid: r?.value.invalid,
      required: r?.value.required,
      dir: s.value.dir,
      getRootNode: o?.value.getRootNode,
      ...Xe(l),
      onCheckedChange(c) {
        t?.("checkedChange", c), t?.("update:checked", c.checked), l.onCheckedChange?.(c);
      }
    };
  }), a = Se(Hh, i);
  return L(() => Gh(a, Ne));
}, zh = /* @__PURE__ */ _({
  __name: "switch-root",
  props: /* @__PURE__ */ ve({
    checked: { type: Boolean },
    defaultChecked: { type: Boolean },
    disabled: { type: Boolean },
    form: {},
    id: {},
    ids: {},
    invalid: { type: Boolean },
    label: {},
    name: {},
    readOnly: { type: Boolean },
    required: { type: Boolean },
    value: {},
    asChild: { type: Boolean }
  }, {
    checked: void 0,
    defaultChecked: void 0,
    disabled: void 0,
    invalid: void 0,
    readOnly: void 0,
    required: void 0
  }),
  emits: ["checkedChange", "update:checked"],
  setup(e, { emit: t }) {
    const s = Uh(e, t);
    return Na(s), R(), (r, i) => (v(), T(u(A).label, V(u(s).getRootProps(), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Wh = /* @__PURE__ */ _({
  __name: "switch-thumb",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = An();
    return R(), (n, o) => (v(), T(u(A).span, V(u(t).getThumbProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), tn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Context: $h,
  Control: Vh,
  HiddenInput: Ah,
  Label: Lh,
  Root: zh,
  RootProvider: Nh,
  Thumb: Wh
}, Symbol.toStringTag, { value: "Module" })), Kh = /* @__PURE__ */ _({
  __name: "BaseSwitch",
  props: /* @__PURE__ */ ut({
    label: { default: "" }
  }, {
    modelValue: { type: Boolean },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = e, n = Qe(e, "modelValue");
    return (o, s) => (v(), T(u(tn).Root, {
      checked: n.value,
      "onUpdate:checked": s[0] || (s[0] = (r) => n.value = r),
      class: "switch-root"
    }, {
      default: C(() => [
        F(u(tn).Control, { class: "control" }, {
          default: C(() => [
            F(u(tn).Thumb, { class: "thumb" })
          ]),
          _: 1
        }),
        t.label ? (v(), T(u(tn).Label, {
          key: 0,
          class: "label"
        }, {
          default: C(() => [
            ee(W(t.label), 1)
          ]),
          _: 1
        })) : Z("", !0),
        F(u(tn).HiddenInput)
      ]),
      _: 1
    }, 8, ["checked"]));
  }
}), qy = /* @__PURE__ */ Q(Kh, [["__scopeId", "data-v-d3767e8f"]]);
var jh = Object.defineProperty, qh = (e, t, n) => t in e ? jh(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, z = (e, t, n) => qh(e, typeof t != "symbol" ? t + "" : t, n), Jn = {
  itemToValue(e) {
    return typeof e == "string" ? e : qn(e) && Lo(e, "value") ? e.value : "";
  },
  itemToString(e) {
    return typeof e == "string" ? e : qn(e) && Lo(e, "label") ? e.label : Jn.itemToValue(e);
  },
  isItemDisabled(e) {
    return qn(e) && Lo(e, "disabled") ? !!e.disabled : !1;
  }
}, Ks = class Ba {
  constructor(t) {
    this.options = t, z(this, "items"), z(this, "copy", (n) => new Ba({ ...this.options, items: n ?? [...this.items] })), z(this, "isEqual", (n) => Wt(this.items, n.items)), z(this, "setItems", (n) => this.copy(n)), z(this, "getValues", (n = this.items) => Array.from(n).map((o) => this.getItemValue(o)).filter(Boolean)), z(this, "find", (n) => {
      if (n == null) return null;
      const o = this.items.findIndex((s) => this.getItemValue(s) === n);
      return o != null ? this.items[o] : null;
    }), z(this, "findMany", (n) => Array.from(n).map((o) => this.find(o)).filter((o) => o != null)), z(this, "at", (n) => this.items[n] ?? null), z(this, "sortFn", (n, o) => {
      const s = this.indexOf(n), r = this.indexOf(o);
      return (s ?? 0) - (r ?? 0);
    }), z(this, "sort", (n) => [...n].sort(this.sortFn.bind(this))), z(this, "getItemValue", (n) => n == null ? null : this.options.itemToValue?.(n) ?? Jn.itemToValue(n)), z(this, "getItemDisabled", (n) => n == null ? !1 : this.options.isItemDisabled?.(n) ?? Jn.isItemDisabled(n)), z(this, "stringifyItem", (n) => n == null ? null : this.options.itemToString?.(n) ?? Jn.itemToString(n)), z(this, "stringify", (n) => n == null ? null : this.stringifyItem(this.find(n))), z(this, "stringifyItems", (n, o = ", ") => Array.from(n).map((s) => this.stringifyItem(s)).filter(Boolean).join(o)), z(this, "stringifyMany", (n, o) => this.stringifyItems(this.findMany(n), o)), z(this, "has", (n) => this.indexOf(n) !== -1), z(this, "hasItem", (n) => n == null ? !1 : this.has(this.getItemValue(n))), z(this, "getNextValue", (n, o = 1, s = !1) => {
      let r = this.indexOf(n);
      if (r === -1) return null;
      for (r = s ? Math.min(r + o, this.size - 1) : r + o; r <= this.size && this.getItemDisabled(this.at(r)); ) r++;
      return this.getItemValue(this.at(r));
    }), z(this, "getPreviousValue", (n, o = 1, s = !1) => {
      let r = this.indexOf(n);
      if (r === -1) return null;
      for (r = s ? Math.max(r - o, 0) : r - o; r >= 0 && this.getItemDisabled(this.at(r)); ) r--;
      return this.getItemValue(this.at(r));
    }), z(this, "indexOf", (n) => n == null ? -1 : this.items.findIndex((o) => this.getItemValue(o) === n)), z(this, "getByText", (n, o) => {
      let s = o != null ? Yh(this.items, this.indexOf(o)) : this.items;
      return n.length === 1 && (s = s.filter((i) => this.getItemValue(i) !== o)), s.find((i) => Xh(this.stringifyItem(i), n));
    }), z(this, "search", (n, o) => {
      const { state: s, currentValue: r, timeout: i = 350 } = o, a = s.keysSoFar + n, c = a.length > 1 && Array.from(a).every((h) => h === a[0]) ? a[0] : a, d = this.getByText(c, r), f = this.getItemValue(d);
      function p() {
        clearTimeout(s.timer), s.timer = -1;
      }
      function g(h) {
        s.keysSoFar = h, p(), h !== "" && (s.timer = +setTimeout(() => {
          g(""), p();
        }, i));
      }
      return g(a), f;
    }), z(this, "update", (n, o) => {
      let s = this.items.findIndex((r) => this.getItemValue(r) === n);
      return s === -1 ? this : this.copy([...this.items.slice(0, s), o, ...this.items.slice(s + 1)]);
    }), z(this, "insert", (n, ...o) => this.copy(nn(this.items, n, ...o))), z(this, "insertBefore", (n, ...o) => {
      let s = this.indexOf(n);
      if (s === -1)
        if (this.items.length === 0) s = 0;
        else return this;
      return this.copy(nn(this.items, s, ...o));
    }), z(this, "insertAfter", (n, ...o) => {
      let s = this.indexOf(n);
      if (s === -1)
        if (this.items.length === 0) s = 0;
        else return this;
      return this.copy(nn(this.items, s + 1, ...o));
    }), z(this, "prepend", (...n) => this.copy(nn(this.items, 0, ...n))), z(this, "append", (...n) => this.copy(nn(this.items, this.items.length, ...n))), z(this, "remove", (...n) => {
      const o = n.map(
        (s) => typeof s == "string" ? s : this.getItemValue(s)
      );
      return this.copy(
        this.items.filter((s) => {
          const r = this.getItemValue(s);
          return r == null ? !1 : !o.includes(r);
        })
      );
    }), z(this, "move", (n, o) => {
      const s = this.indexOf(n);
      return s === -1 ? this : this.copy(jr(this.items, [s], o));
    }), z(this, "reorder", (n, o) => this.copy(jr(this.items, [n], o))), z(this, "compareValue", (n, o) => {
      const s = this.indexOf(n), r = this.indexOf(o);
      return s < r ? -1 : s > r ? 1 : 0;
    }), z(this, "range", (n, o) => {
      let s = [], r = n;
      for (; r != null; ) {
        if (this.find(r) && s.push(r), r === o) return s;
        r = this.getNextValue(r);
      }
      return [];
    }), z(this, "getValueRange", (n, o) => n && o ? this.compareValue(n, o) <= 0 ? this.range(n, o) : this.range(o, n) : []), z(this, "toString", () => {
      let n = "";
      for (const o of this.items) {
        const s = this.getItemValue(o), r = this.stringifyItem(o), i = this.getItemDisabled(o), a = [s, r, i].filter(Boolean).join(":");
        n += a + ",";
      }
      return n;
    }), z(this, "toJSON", () => ({
      size: this.size,
      first: this.firstValue,
      last: this.lastValue
    })), this.items = [...t.items];
  }
  /**
   * Returns the number of items in the collection
   */
  get size() {
    return this.items.length;
  }
  /**
   * Returns the first value in the collection
   */
  get firstValue() {
    let t = 0;
    for (; this.getItemDisabled(this.at(t)); ) t++;
    return this.getItemValue(this.at(t));
  }
  /**
   * Returns the last value in the collection
   */
  get lastValue() {
    let t = this.size - 1;
    for (; this.getItemDisabled(this.at(t)); ) t--;
    return this.getItemValue(this.at(t));
  }
  *[Symbol.iterator]() {
    yield* this.items;
  }
}, Xh = (e, t) => !!e?.toLowerCase().startsWith(t.toLowerCase()), Yh = (e, t) => e.map((n, o) => e[(Math.max(t, 0) + o) % e.length]);
function nn(e, t, ...n) {
  return [...e.slice(0, t), ...n, ...e.slice(t)];
}
function jr(e, t, n) {
  t = [...t].sort((s, r) => s - r);
  const o = t.map((s) => e[s]);
  for (let s = t.length - 1; s >= 0; s--)
    e = [...e.slice(0, t[s]), ...e.slice(t[s] + 1)];
  return n = Math.max(0, n - t.filter((s) => s < n).length), [...e.slice(0, n), ...o, ...e.slice(n)];
}
const Zh = (e) => new Ks(e), [Ma, _e] = (
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  X("ComboboxContext")
), Qh = /* @__PURE__ */ _({
  __name: "combobox-clear-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getClearTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Jh = /* @__PURE__ */ _({
  __name: "combobox-content",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e(), n = Rs(), o = L(() => Kt(t.value.getContentProps(), n.value.presenceProps));
    return R(), (s, r) => u(n).unmounted ? Z("", !0) : (v(), T(u(A).div, V({ key: 0 }, o.value, { "as-child": s.asChild }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), em = /* @__PURE__ */ _({
  __name: "combobox-context",
  setup(e) {
    const t = _e();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), tm = /* @__PURE__ */ _({
  __name: "combobox-control",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getControlProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), nm = /* @__PURE__ */ _({
  __name: "combobox-input",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e(), n = Yt();
    return R(), (o, s) => (v(), T(u(A).input, V({
      "aria-describedby": u(n)?.ariaDescribedby
    }, u(t).getInputProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-describedby", "as-child"]));
  }
}), [om, sm] = X("ComboboxItemContext"), rm = /* @__PURE__ */ _({
  __name: "combobox-item-context",
  setup(e) {
    const t = sm();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), [im, am] = X("ComboboxItemGroupPropsContext"), lm = /* @__PURE__ */ _({
  __name: "combobox-item-group-label",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e(), n = am();
    return R(), (o, s) => (v(), T(u(A).div, V(u(t).getItemGroupLabelProps({ htmlFor: u(n).id }), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), cm = /* @__PURE__ */ _({
  __name: "combobox-item-group",
  props: {
    id: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = _e(), o = t.id ?? Ce();
    return im({ id: o }), R(), (s, r) => (v(), T(u(A).div, V(u(n).getItemGroupProps({ id: u(o) }), { "as-child": s.asChild }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), [um, Fa] = X("ComboboxItemPropsContext"), dm = /* @__PURE__ */ _({
  __name: "combobox-item-indicator",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e(), n = Fa();
    return R(), (o, s) => (v(), T(u(A).div, V(u(t).getItemIndicatorProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), pm = /* @__PURE__ */ _({
  __name: "combobox-item-text",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e(), n = Fa();
    return R(), (o, s) => (v(), T(u(A).span, V(u(t).getItemTextProps(u(n)), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), gm = /* @__PURE__ */ _({
  __name: "combobox-item",
  props: {
    persistFocus: { type: Boolean },
    item: {},
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = _e();
    return um(t), om(L(() => n.value.getItemState(t))), R(), (o, s) => (v(), T(u(A).div, V(u(n).getItemProps(t), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), fm = /* @__PURE__ */ _({
  __name: "combobox-label",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e();
    return R(), (n, o) => (v(), T(u(A).label, V(u(t).getLabelProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), hm = /* @__PURE__ */ _({
  __name: "combobox-list",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getListProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), mm = /* @__PURE__ */ _({
  __name: "combobox-positioner",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = _e(), n = Oo(), o = xo(
      L(() => ({
        ...n.value,
        present: t.value.open
      }))
    );
    return ko(o), R(), (s, r) => u(o).unmounted ? Z("", !0) : (v(), T(u(A).div, V({ key: 0 }, u(t).getPositionerProps(), { "as-child": s.asChild }), {
      default: C(() => [
        E(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), vm = /* @__PURE__ */ _({
  __name: "combobox-root-provider",
  props: {
    value: {},
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = L(() => t.value);
    return Ma(n), ft(L(() => ({ lazyMount: t.lazyMount, unmountOnExit: t.unmountOnExit }))), R(), (o, s) => (v(), T(u(A).div, V(n.value.getRootProps(), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
});
var Vt = /* @__PURE__ */ new WeakMap(), Wn = /* @__PURE__ */ new WeakMap(), Kn = {}, Uo = 0, Ga = (e) => e && (e.host || Ga(e.parentNode)), ym = (e, t) => t.map((n) => {
  if (e.contains(n)) return n;
  const o = Ga(n);
  return o && e.contains(o) ? o : (console.error("[zag-js > ariaHidden] target", n, "in not contained inside", e, ". Doing nothing"), null);
}).filter((n) => !!n), bm = (e) => e.localName === "next-route-announcer" || e.localName === "script" || e.hasAttribute("aria-live") ? !0 : e.matches("[data-live-announcer]"), Cm = (e, t) => {
  const { parentNode: n, markerName: o, controlAttribute: s } = t, r = ym(n, Array.isArray(e) ? e : [e]);
  Kn[o] || (Kn[o] = /* @__PURE__ */ new WeakMap());
  const i = Kn[o], a = [], l = /* @__PURE__ */ new Set(), c = new Set(r), d = (p) => {
    !p || l.has(p) || (l.add(p), d(p.parentNode));
  };
  r.forEach(d);
  const f = (p) => {
    !p || c.has(p) || Array.prototype.forEach.call(p.children, (g) => {
      if (l.has(g))
        f(g);
      else
        try {
          if (bm(g)) return;
          const b = g.getAttribute(s) === "true", k = (Vt.get(g) || 0) + 1, $ = (i.get(g) || 0) + 1;
          Vt.set(g, k), i.set(g, $), a.push(g), k === 1 && b && Wn.set(g, !0), $ === 1 && g.setAttribute(o, ""), b || g.setAttribute(s, "true");
        } catch (h) {
          console.error("[zag-js > ariaHidden] cannot operate on ", g, h);
        }
    });
  };
  return f(n), l.clear(), Uo++, () => {
    a.forEach((p) => {
      const g = Vt.get(p) - 1, h = i.get(p) - 1;
      Vt.set(p, g), i.set(p, h), g || (Wn.has(p) || p.removeAttribute(s), Wn.delete(p)), h || p.removeAttribute(o);
    }), Uo--, Uo || (Vt = /* @__PURE__ */ new WeakMap(), Vt = /* @__PURE__ */ new WeakMap(), Wn = /* @__PURE__ */ new WeakMap(), Kn = {});
  };
}, _m = (e) => (Array.isArray(e) ? e[0] : e).ownerDocument.body, Em = (e, t = _m(e), n = "data-aria-hidden") => {
  if (t)
    return Cm(e, {
      parentNode: t,
      markerName: n,
      controlAttribute: "aria-hidden"
    });
}, Tm = (e) => {
  const t = requestAnimationFrame(() => e());
  return () => cancelAnimationFrame(t);
};
function Im(e, t = {}) {
  const { defer: n = !0 } = t, o = n ? Tm : (r) => r(), s = [];
  return s.push(
    o(() => {
      const i = (typeof e == "function" ? e() : e).filter(Boolean);
      i.length !== 0 && s.push(Em(i));
    })
  ), () => {
    s.forEach((r) => r?.());
  };
}
var km = Pe("combobox").parts(
  "root",
  "clearTrigger",
  "content",
  "control",
  "input",
  "item",
  "itemGroup",
  "itemGroupLabel",
  "itemIndicator",
  "itemText",
  "label",
  "list",
  "positioner",
  "trigger"
), ye = km.build(), Ha = (e) => new Ks(e);
Ha.empty = () => new Ks({ items: [] });
var Om = (e) => e.ids?.root ?? `combobox:${e.id}`, zo = (e) => e.ids?.label ?? `combobox:${e.id}:label`, Ua = (e) => e.ids?.control ?? `combobox:${e.id}:control`, eo = (e) => e.ids?.input ?? `combobox:${e.id}:input`, to = (e) => e.ids?.content ?? `combobox:${e.id}:content`, za = (e) => e.ids?.positioner ?? `combobox:${e.id}:popper`, Wa = (e) => e.ids?.trigger ?? `combobox:${e.id}:toggle-btn`, Ka = (e) => e.ids?.clearTrigger ?? `combobox:${e.id}:clear-btn`, xm = (e, t) => e.ids?.itemGroup?.(t) ?? `combobox:${e.id}:optgroup:${t}`, qr = (e, t) => e.ids?.itemGroupLabel?.(t) ?? `combobox:${e.id}:optgroup-label:${t}`, Xr = (e, t) => e.ids?.item?.(t) ?? `combobox:${e.id}:option:${t}`, it = (e) => e.getById(to(e)), at = (e) => e.getById(eo(e)), Yr = (e) => e.getById(za(e)), Zr = (e) => e.getById(Ua(e)), Cn = (e) => e.getById(Wa(e)), Qr = (e) => e.getById(Ka(e)), ja = (e, t) => {
  if (t == null) return;
  const n = `[role=option][data-value="${CSS.escape(t)}"`;
  return Wc(it(e), n);
}, Jr = (e) => {
  const t = at(e);
  e.isActiveElement(t) || t?.focus({ preventScroll: !0 });
}, Pm = (e) => {
  const t = Cn(e);
  e.isActiveElement(t) || t?.focus({ preventScroll: !0 });
};
function wm(e, t) {
  const { context: n, prop: o, state: s, send: r, scope: i, computed: a, event: l } = e, c = o("translations"), d = o("collection"), f = o("disabled"), p = a("isInteractive"), g = o("invalid"), h = o("readOnly"), b = s.hasTag("open"), k = s.hasTag("focused"), $ = o("composite"), I = n.get("highlightedValue"), x = Ms({
    ...o("positioning"),
    placement: n.get("currentPlacement")
  });
  function m(y) {
    const w = d.getItemDisabled(y.item), N = d.getItemValue(y.item);
    return Ci(N, () => `[zag-js] No value found for item ${JSON.stringify(y.item)}`), {
      value: N,
      disabled: !!(w || w),
      highlighted: I === N,
      selected: n.get("value").includes(N)
    };
  }
  return {
    focused: k,
    open: b,
    inputValue: n.get("inputValue"),
    highlightedValue: I,
    highlightedItem: n.get("highlightedItem"),
    value: n.get("value"),
    valueAsString: n.get("valueAsString"),
    hasSelectedItems: a("hasSelectedItems"),
    selectedItems: n.get("selectedItems"),
    collection: o("collection"),
    multiple: !!o("multiple"),
    disabled: !!f,
    syncSelectedItems() {
      r({ type: "SELECTED_ITEMS.SYNC" });
    },
    reposition(y = {}) {
      r({ type: "POSITIONING.SET", options: y });
    },
    setHighlightValue(y) {
      r({ type: "HIGHLIGHTED_VALUE.SET", value: y });
    },
    selectValue(y) {
      r({ type: "ITEM.SELECT", value: y });
    },
    setValue(y) {
      r({ type: "VALUE.SET", value: y });
    },
    setInputValue(y) {
      r({ type: "INPUT_VALUE.SET", value: y });
    },
    clearValue(y) {
      y != null ? r({ type: "ITEM.CLEAR", value: y }) : r({ type: "VALUE.CLEAR" });
    },
    focus() {
      at(i)?.focus();
    },
    setOpen(y) {
      s.hasTag("open") !== y && r({ type: y ? "OPEN" : "CLOSE" });
    },
    getRootProps() {
      return t.element({
        ...ye.root.attrs,
        dir: o("dir"),
        id: Om(i),
        "data-invalid": B(g),
        "data-readonly": B(h)
      });
    },
    getLabelProps() {
      return t.label({
        ...ye.label.attrs,
        dir: o("dir"),
        htmlFor: eo(i),
        id: zo(i),
        "data-readonly": B(h),
        "data-disabled": B(f),
        "data-invalid": B(g),
        "data-focus": B(k),
        onClick(y) {
          $ || (y.preventDefault(), Cn(i)?.focus({ preventScroll: !0 }));
        }
      });
    },
    getControlProps() {
      return t.element({
        ...ye.control.attrs,
        dir: o("dir"),
        id: Ua(i),
        "data-state": b ? "open" : "closed",
        "data-focus": B(k),
        "data-disabled": B(f),
        "data-invalid": B(g)
      });
    },
    getPositionerProps() {
      return t.element({
        ...ye.positioner.attrs,
        dir: o("dir"),
        id: za(i),
        style: x.floating
      });
    },
    getInputProps() {
      return t.input({
        ...ye.input.attrs,
        dir: o("dir"),
        "aria-invalid": mn(g),
        "data-invalid": B(g),
        name: o("name"),
        form: o("form"),
        disabled: f,
        autoFocus: o("autoFocus"),
        required: o("required"),
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "none",
        spellCheck: "false",
        readOnly: h,
        placeholder: o("placeholder"),
        id: eo(i),
        type: "text",
        role: "combobox",
        defaultValue: n.get("inputValue"),
        "aria-autocomplete": a("autoComplete") ? "both" : "list",
        "aria-controls": to(i),
        "aria-expanded": b,
        "data-state": b ? "open" : "closed",
        "aria-activedescendant": I ? Xr(i, I) : void 0,
        onClick(y) {
          y.defaultPrevented || o("openOnClick") && p && r({ type: "INPUT.CLICK" });
        },
        onFocus() {
          f || r({ type: "INPUT.FOCUS" });
        },
        onBlur() {
          f || r({ type: "INPUT.BLUR" });
        },
        onChange(y) {
          r({ type: "INPUT.CHANGE", value: y.currentTarget.value });
        },
        onKeyDown(y) {
          if (y.defaultPrevented || !p || y.ctrlKey || y.shiftKey || Oi(y)) return;
          const w = o("openOnKeyPress"), N = y.ctrlKey || y.metaKey || y.shiftKey, S = !0, D = {
            ArrowDown(G) {
              !w && !b || (r({ type: G.altKey ? "OPEN" : "INPUT.ARROW_DOWN", keypress: S }), G.preventDefault());
            },
            ArrowUp() {
              !w && !b || (r({ type: y.altKey ? "CLOSE" : "INPUT.ARROW_UP", keypress: S }), y.preventDefault());
            },
            Home(G) {
              N || (r({ type: "INPUT.HOME", keypress: S }), b && G.preventDefault());
            },
            End(G) {
              N || (r({ type: "INPUT.END", keypress: S }), b && G.preventDefault());
            },
            Enter(G) {
              r({ type: "INPUT.ENTER", keypress: S }), b && G.preventDefault();
              const K = n.get("highlightedValue"), te = ja(i, K);
              vs(te) && o("navigate")({ value: K, node: te });
            },
            Escape() {
              r({ type: "INPUT.ESCAPE", keypress: S }), y.preventDefault();
            }
          }, O = yt(y, { dir: o("dir") }), P = D[O];
          P?.(y);
        }
      });
    },
    getTriggerProps(y = {}) {
      return t.button({
        ...ye.trigger.attrs,
        dir: o("dir"),
        id: Wa(i),
        "aria-haspopup": $ ? "listbox" : "dialog",
        type: "button",
        tabIndex: y.focusable ? void 0 : -1,
        "aria-label": c.triggerLabel,
        "aria-expanded": b,
        "data-state": b ? "open" : "closed",
        "aria-controls": b ? to(i) : void 0,
        disabled: f,
        "data-invalid": B(g),
        "data-focusable": B(y.focusable),
        "data-readonly": B(h),
        "data-disabled": B(f),
        onFocus() {
          y.focusable && r({ type: "INPUT.FOCUS", src: "trigger" });
        },
        onClick(w) {
          w.defaultPrevented || p && Cc(w) && r({ type: "TRIGGER.CLICK" });
        },
        onPointerDown(w) {
          p && w.pointerType !== "touch" && (w.preventDefault(), queueMicrotask(() => {
            at(i)?.focus({ preventScroll: !0 });
          }));
        },
        onKeyDown(w) {
          if (w.defaultPrevented || $) return;
          const N = {
            ArrowDown() {
              r({ type: "INPUT.ARROW_DOWN", src: "trigger" });
            },
            ArrowUp() {
              r({ type: "INPUT.ARROW_UP", src: "trigger" });
            }
          }, S = yt(w, { dir: o("dir") }), D = N[S];
          D && (D(w), w.preventDefault());
        }
      });
    },
    getContentProps() {
      return t.element({
        ...ye.content.attrs,
        dir: o("dir"),
        id: to(i),
        role: $ ? "listbox" : "dialog",
        tabIndex: -1,
        hidden: !b,
        "data-state": b ? "open" : "closed",
        "data-placement": n.get("currentPlacement"),
        "aria-labelledby": zo(i),
        "aria-multiselectable": o("multiple") && $ ? !0 : void 0,
        onPointerDown(y) {
          y.preventDefault();
        }
      });
    },
    getListProps() {
      return t.element({
        ...ye.list.attrs,
        role: $ ? void 0 : "listbox",
        "aria-labelledby": zo(i),
        "aria-multiselectable": o("multiple") && !$ ? !0 : void 0
      });
    },
    getClearTriggerProps() {
      return t.button({
        ...ye.clearTrigger.attrs,
        dir: o("dir"),
        id: Ka(i),
        type: "button",
        tabIndex: -1,
        disabled: f,
        "data-invalid": B(g),
        "aria-label": c.clearTriggerLabel,
        "aria-controls": eo(i),
        hidden: !n.get("value").length,
        onPointerDown(y) {
          y.preventDefault();
        },
        onClick(y) {
          y.defaultPrevented || p && r({ type: "VALUE.CLEAR", src: "clear-trigger" });
        }
      });
    },
    getItemState: m,
    getItemProps(y) {
      const w = m(y), N = w.value;
      return t.element({
        ...ye.item.attrs,
        dir: o("dir"),
        id: Xr(i, N),
        role: "option",
        tabIndex: -1,
        "data-highlighted": B(w.highlighted),
        "data-state": w.selected ? "checked" : "unchecked",
        "aria-selected": mn(w.highlighted),
        "aria-disabled": mn(w.disabled),
        "data-disabled": B(w.disabled),
        "data-value": w.value,
        onPointerMove() {
          w.disabled || w.highlighted || r({ type: "ITEM.POINTER_MOVE", value: N });
        },
        onPointerLeave() {
          y.persistFocus || w.disabled || !l.previous()?.type.includes("POINTER") || r({ type: "ITEM.POINTER_LEAVE", value: N });
        },
        onClick(S) {
          Yo(S) || Xo(S) || _s(S) || w.disabled || r({ type: "ITEM.CLICK", src: "click", value: N });
        }
      });
    },
    getItemTextProps(y) {
      const w = m(y);
      return t.element({
        ...ye.itemText.attrs,
        dir: o("dir"),
        "data-state": w.selected ? "checked" : "unchecked",
        "data-disabled": B(w.disabled),
        "data-highlighted": B(w.highlighted)
      });
    },
    getItemIndicatorProps(y) {
      const w = m(y);
      return t.element({
        "aria-hidden": !0,
        ...ye.itemIndicator.attrs,
        dir: o("dir"),
        "data-state": w.selected ? "checked" : "unchecked",
        hidden: !w.selected
      });
    },
    getItemGroupProps(y) {
      const { id: w } = y;
      return t.element({
        ...ye.itemGroup.attrs,
        dir: o("dir"),
        id: xm(i, w),
        "aria-labelledby": qr(i, w),
        role: "group"
      });
    },
    getItemGroupLabelProps(y) {
      const { htmlFor: w } = y;
      return t.element({
        ...ye.itemGroupLabel.attrs,
        dir: o("dir"),
        id: qr(i, w),
        role: "presentation"
      });
    }
  };
}
var { and: le, not: Ee } = nt(), Sm = {
  props({ props: e }) {
    return {
      loopFocus: !0,
      openOnClick: !1,
      defaultValue: [],
      closeOnSelect: !e.multiple,
      allowCustomValue: !1,
      inputBehavior: "none",
      selectionBehavior: e.multiple ? "clear" : "replace",
      openOnKeyPress: !0,
      openOnChange: !0,
      composite: !0,
      navigate({ node: t }) {
        xs(t);
      },
      collection: Ha.empty(),
      ...e,
      positioning: {
        placement: "bottom",
        sameWidth: !0,
        ...e.positioning
      },
      translations: {
        triggerLabel: "Toggle suggestions",
        clearTriggerLabel: "Clear value",
        ...e.translations
      }
    };
  },
  initialState({ prop: e }) {
    return e("open") || e("defaultOpen") ? "suggesting" : "idle";
  },
  context({ prop: e, bindable: t, getContext: n }) {
    return {
      currentPlacement: t(() => ({
        defaultValue: void 0
      })),
      value: t(() => ({
        defaultValue: e("defaultValue"),
        value: e("value"),
        isEqual: Wt,
        hash(o) {
          return o.join(",");
        },
        onChange(o) {
          const s = n(), r = s.get("selectedItems"), i = e("collection"), a = o.map((l) => r.find((d) => i.getItemValue(d) === l) || i.find(l));
          s.set("selectedItems", a), s.set("valueAsString", i.stringifyItems(a)), e("onValueChange")?.({ value: o, items: a });
        }
      })),
      highlightedValue: t(() => ({
        defaultValue: e("defaultHighlightedValue") || null,
        value: e("highlightedValue"),
        onChange(o) {
          const s = e("collection").find(o);
          e("onHighlightChange")?.({ highlightedValue: o, highlightedItem: s });
        }
      })),
      inputValue: t(() => {
        let o = e("inputValue") || e("defaultInputValue") || "";
        const s = e("defaultValue") || e("value") || [];
        if (!o.trim() && !e("multiple")) {
          const r = e("collection").stringifyMany(s);
          o = hn(e("selectionBehavior"), {
            preserve: o || r,
            replace: r,
            clear: ""
          });
        }
        return {
          defaultValue: o,
          value: e("inputValue"),
          onChange(r) {
            e("onInputValueChange")?.({ inputValue: r });
          }
        };
      }),
      highlightedItem: t(() => {
        const o = e("highlightedValue");
        return { defaultValue: e("collection").find(o) };
      }),
      selectedItems: t(() => {
        const o = e("value") || e("defaultValue") || [];
        return { defaultValue: e("collection").findMany(o) };
      }),
      valueAsString: t(() => {
        const o = e("value") || e("defaultValue") || [];
        return { sync: !0, defaultValue: e("collection").stringifyMany(o) };
      })
    };
  },
  computed: {
    isInputValueEmpty: ({ context: e }) => e.get("inputValue").length === 0,
    isInteractive: ({ prop: e }) => !(e("readOnly") || e("disabled")),
    autoComplete: ({ prop: e }) => e("inputBehavior") === "autocomplete",
    autoHighlight: ({ prop: e }) => e("inputBehavior") === "autohighlight",
    hasSelectedItems: ({ context: e }) => e.get("value").length > 0
  },
  watch({ context: e, prop: t, track: n, action: o }) {
    n([() => e.hash("value")], () => {
      o(["syncSelectedItems"]);
    }), n([() => e.get("inputValue")], () => {
      o(["syncInputValue"]);
    }), n([() => e.get("highlightedValue")], () => {
      o(["syncHighlightedItem", "autofillInputValue"]);
    }), n([() => t("open")], () => {
      o(["toggleVisibility"]);
    });
  },
  on: {
    "SELECTED_ITEMS.SYNC": {
      actions: ["syncSelectedItems"]
    },
    "HIGHLIGHTED_VALUE.SET": {
      actions: ["setHighlightedItem"]
    },
    "ITEM.SELECT": {
      actions: ["selectItem"]
    },
    "ITEM.CLEAR": {
      actions: ["clearItem"]
    },
    "VALUE.SET": {
      actions: ["setValue"]
    },
    "INPUT_VALUE.SET": {
      actions: ["setInputValue"]
    },
    "POSITIONING.SET": {
      actions: ["reposition"]
    }
  },
  states: {
    idle: {
      tags: ["idle", "closed"],
      entry: ["scrollContentToTop", "clearHighlightedItem"],
      on: {
        "CONTROLLED.OPEN": {
          target: "interacting"
        },
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["setInitialFocus", "highlightFirstSelectedItem", "invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["setInitialFocus", "highlightFirstSelectedItem", "invokeOnOpen"]
          }
        ],
        "INPUT.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
          }
        ],
        "INPUT.FOCUS": {
          target: "focused"
        },
        OPEN: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["invokeOnOpen"]
          }
        ],
        "VALUE.CLEAR": {
          target: "focused",
          actions: ["clearInputValue", "clearSelectedItems", "setInitialFocus"]
        }
      }
    },
    focused: {
      tags: ["focused", "closed"],
      entry: ["scrollContentToTop", "clearHighlightedItem"],
      on: {
        "CONTROLLED.OPEN": [
          {
            guard: "isChangeEvent",
            target: "suggesting"
          },
          {
            target: "interacting"
          }
        ],
        "INPUT.CHANGE": [
          {
            guard: le("isOpenControlled", "openOnChange"),
            actions: ["setInputValue", "invokeOnOpen", "highlightFirstItemIfNeeded"]
          },
          {
            guard: "openOnChange",
            target: "suggesting",
            actions: ["setInputValue", "invokeOnOpen", "highlightFirstItemIfNeeded"]
          },
          {
            actions: ["setInputValue"]
          }
        ],
        "LAYER.INTERACT_OUTSIDE": {
          target: "idle"
        },
        "INPUT.ESCAPE": {
          guard: le("isCustomValue", Ee("allowCustomValue")),
          actions: ["revertInputValue"]
        },
        "INPUT.BLUR": {
          target: "idle"
        },
        "INPUT.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["highlightFirstSelectedItem", "invokeOnOpen"]
          }
        ],
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["setInitialFocus", "highlightFirstSelectedItem", "invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["setInitialFocus", "highlightFirstSelectedItem", "invokeOnOpen"]
          }
        ],
        "INPUT.ARROW_DOWN": [
          // == group 1 ==
          {
            guard: le("isOpenControlled", "autoComplete"),
            actions: ["invokeOnOpen"]
          },
          {
            guard: "autoComplete",
            target: "interacting",
            actions: ["invokeOnOpen"]
          },
          // == group 2 ==
          {
            guard: "isOpenControlled",
            actions: ["highlightFirstOrSelectedItem", "invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["highlightFirstOrSelectedItem", "invokeOnOpen"]
          }
        ],
        "INPUT.ARROW_UP": [
          // == group 1 ==
          {
            guard: "autoComplete",
            target: "interacting",
            actions: ["invokeOnOpen"]
          },
          {
            guard: "autoComplete",
            target: "interacting",
            actions: ["invokeOnOpen"]
          },
          // == group 2 ==
          {
            target: "interacting",
            actions: ["highlightLastOrSelectedItem", "invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["highlightLastOrSelectedItem", "invokeOnOpen"]
          }
        ],
        OPEN: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnOpen"]
          },
          {
            target: "interacting",
            actions: ["invokeOnOpen"]
          }
        ],
        "VALUE.CLEAR": {
          actions: ["clearInputValue", "clearSelectedItems"]
        }
      }
    },
    interacting: {
      tags: ["open", "focused"],
      entry: ["setInitialFocus"],
      effects: ["scrollToHighlightedItem", "trackDismissableLayer", "trackPlacement", "hideOtherElements"],
      on: {
        "CONTROLLED.CLOSE": [
          {
            guard: "restoreFocus",
            target: "focused",
            actions: ["setFinalFocus"]
          },
          {
            target: "idle"
          }
        ],
        "INPUT.HOME": {
          actions: ["highlightFirstItem"]
        },
        "INPUT.END": {
          actions: ["highlightLastItem"]
        },
        "INPUT.ARROW_DOWN": [
          {
            guard: le("autoComplete", "isLastItemHighlighted"),
            actions: ["clearHighlightedItem", "scrollContentToTop"]
          },
          {
            actions: ["highlightNextItem"]
          }
        ],
        "INPUT.ARROW_UP": [
          {
            guard: le("autoComplete", "isFirstItemHighlighted"),
            actions: ["clearHighlightedItem"]
          },
          {
            actions: ["highlightPrevItem"]
          }
        ],
        "INPUT.ENTER": [
          // == group 1 ==
          {
            guard: le("isOpenControlled", "isCustomValue", Ee("hasHighlightedItem"), Ee("allowCustomValue")),
            actions: ["revertInputValue", "invokeOnClose"]
          },
          {
            guard: le("isCustomValue", Ee("hasHighlightedItem"), Ee("allowCustomValue")),
            target: "focused",
            actions: ["revertInputValue", "invokeOnClose"]
          },
          // == group 2 ==
          {
            guard: le("isOpenControlled", "closeOnSelect"),
            actions: ["selectHighlightedItem", "invokeOnClose"]
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: ["selectHighlightedItem", "invokeOnClose", "setFinalFocus"]
          },
          {
            actions: ["selectHighlightedItem"]
          }
        ],
        "INPUT.CHANGE": [
          {
            guard: "autoComplete",
            target: "suggesting",
            actions: ["setInputValue"]
          },
          {
            target: "suggesting",
            actions: ["clearHighlightedItem", "setInputValue"]
          }
        ],
        "ITEM.POINTER_MOVE": {
          actions: ["setHighlightedItem"]
        },
        "ITEM.POINTER_LEAVE": {
          actions: ["clearHighlightedItem"]
        },
        "ITEM.CLICK": [
          {
            guard: le("isOpenControlled", "closeOnSelect"),
            actions: ["selectItem", "invokeOnClose"]
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: ["selectItem", "invokeOnClose", "setFinalFocus"]
          },
          {
            actions: ["selectItem"]
          }
        ],
        "LAYER.ESCAPE": [
          {
            guard: le("isOpenControlled", "autoComplete"),
            actions: ["syncInputValue", "invokeOnClose"]
          },
          {
            guard: "autoComplete",
            target: "focused",
            actions: ["syncInputValue", "invokeOnClose"]
          },
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["invokeOnClose", "setFinalFocus"]
          }
        ],
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["invokeOnClose"]
          }
        ],
        "LAYER.INTERACT_OUTSIDE": [
          // == group 1 ==
          {
            guard: le("isOpenControlled", "isCustomValue", Ee("allowCustomValue")),
            actions: ["revertInputValue", "invokeOnClose"]
          },
          {
            guard: le("isCustomValue", Ee("allowCustomValue")),
            target: "idle",
            actions: ["revertInputValue", "invokeOnClose"]
          },
          // == group 2 ==
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "idle",
            actions: ["invokeOnClose"]
          }
        ],
        CLOSE: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["invokeOnClose", "setFinalFocus"]
          }
        ],
        "VALUE.CLEAR": [
          {
            guard: "isOpenControlled",
            actions: ["clearInputValue", "clearSelectedItems", "invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["clearInputValue", "clearSelectedItems", "invokeOnClose", "setFinalFocus"]
          }
        ]
      }
    },
    suggesting: {
      tags: ["open", "focused"],
      effects: [
        "trackDismissableLayer",
        "scrollToHighlightedItem",
        "trackPlacement",
        "trackChildNodes",
        "hideOtherElements"
      ],
      entry: ["setInitialFocus"],
      on: {
        "CONTROLLED.CLOSE": [
          {
            guard: "restoreFocus",
            target: "focused",
            actions: ["setFinalFocus"]
          },
          {
            target: "idle"
          }
        ],
        CHILDREN_CHANGE: {
          guard: "autoHighlight",
          actions: ["highlightFirstItem"]
        },
        "INPUT.ARROW_DOWN": {
          target: "interacting",
          actions: ["highlightNextItem"]
        },
        "INPUT.ARROW_UP": {
          target: "interacting",
          actions: ["highlightPrevItem"]
        },
        "INPUT.HOME": {
          target: "interacting",
          actions: ["highlightFirstItem"]
        },
        "INPUT.END": {
          target: "interacting",
          actions: ["highlightLastItem"]
        },
        "INPUT.ENTER": [
          // == group 1 ==
          {
            guard: le("isOpenControlled", "isCustomValue", Ee("hasHighlightedItem"), Ee("allowCustomValue")),
            actions: ["revertInputValue", "invokeOnClose"]
          },
          {
            guard: le("isCustomValue", Ee("hasHighlightedItem"), Ee("allowCustomValue")),
            target: "focused",
            actions: ["revertInputValue", "invokeOnClose"]
          },
          // == group 2 ==
          {
            guard: le("isOpenControlled", "closeOnSelect"),
            actions: ["selectHighlightedItem", "invokeOnClose"]
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: ["selectHighlightedItem", "invokeOnClose", "setFinalFocus"]
          },
          {
            actions: ["selectHighlightedItem"]
          }
        ],
        "INPUT.CHANGE": {
          actions: ["setInputValue"]
        },
        "LAYER.ESCAPE": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["invokeOnClose"]
          }
        ],
        "ITEM.POINTER_MOVE": {
          target: "interacting",
          actions: ["setHighlightedItem"]
        },
        "ITEM.POINTER_LEAVE": {
          actions: ["clearHighlightedItem"]
        },
        "LAYER.INTERACT_OUTSIDE": [
          // == group 1 ==
          {
            guard: le("isOpenControlled", "isCustomValue", Ee("allowCustomValue")),
            actions: ["revertInputValue", "invokeOnClose"]
          },
          {
            guard: le("isCustomValue", Ee("allowCustomValue")),
            target: "idle",
            actions: ["revertInputValue", "invokeOnClose"]
          },
          // == group 2 ==
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "idle",
            actions: ["invokeOnClose"]
          }
        ],
        "TRIGGER.CLICK": [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["invokeOnClose"]
          }
        ],
        "ITEM.CLICK": [
          {
            guard: le("isOpenControlled", "closeOnSelect"),
            actions: ["selectItem", "invokeOnClose"]
          },
          {
            guard: "closeOnSelect",
            target: "focused",
            actions: ["selectItem", "invokeOnClose", "setFinalFocus"]
          },
          {
            actions: ["selectItem"]
          }
        ],
        CLOSE: [
          {
            guard: "isOpenControlled",
            actions: ["invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["invokeOnClose", "setFinalFocus"]
          }
        ],
        "VALUE.CLEAR": [
          {
            guard: "isOpenControlled",
            actions: ["clearInputValue", "clearSelectedItems", "invokeOnClose"]
          },
          {
            target: "focused",
            actions: ["clearInputValue", "clearSelectedItems", "invokeOnClose", "setFinalFocus"]
          }
        ]
      }
    }
  },
  implementations: {
    guards: {
      isInputValueEmpty: ({ computed: e }) => e("isInputValueEmpty"),
      autoComplete: ({ computed: e, prop: t }) => e("autoComplete") && !t("multiple"),
      autoHighlight: ({ computed: e }) => e("autoHighlight"),
      isFirstItemHighlighted: ({ prop: e, context: t }) => e("collection").firstValue === t.get("highlightedValue"),
      isLastItemHighlighted: ({ prop: e, context: t }) => e("collection").lastValue === t.get("highlightedValue"),
      isCustomValue: ({ context: e }) => e.get("inputValue") !== e.get("valueAsString"),
      allowCustomValue: ({ prop: e }) => !!e("allowCustomValue"),
      hasHighlightedItem: ({ context: e }) => e.get("highlightedValue") != null,
      closeOnSelect: ({ prop: e }) => !!e("closeOnSelect"),
      isOpenControlled: ({ prop: e }) => e("open") != null,
      openOnChange: ({ prop: e, context: t }) => {
        const n = e("openOnChange");
        return Bl(n) ? n : !!n?.({ inputValue: t.get("inputValue") });
      },
      restoreFocus: ({ event: e }) => e.restoreFocus == null ? !0 : !!e.restoreFocus,
      isChangeEvent: ({ event: e }) => e.previousEvent?.type === "INPUT.CHANGE"
    },
    effects: {
      trackDismissableLayer({ send: e, prop: t, scope: n }) {
        return t("disableLayer") ? void 0 : Fs(() => it(n), {
          defer: !0,
          exclude: () => [at(n), Cn(n), Qr(n)],
          onFocusOutside: t("onFocusOutside"),
          onPointerDownOutside: t("onPointerDownOutside"),
          onInteractOutside: t("onInteractOutside"),
          onEscapeKeyDown(s) {
            s.preventDefault(), s.stopPropagation(), e({ type: "LAYER.ESCAPE" });
          },
          onDismiss() {
            e({ type: "LAYER.INTERACT_OUTSIDE", restoreFocus: !1 });
          }
        });
      },
      hideOtherElements({ scope: e }) {
        return Im([
          at(e),
          it(e),
          Cn(e),
          Qr(e)
        ]);
      },
      trackPlacement({ context: e, prop: t, scope: n }) {
        const o = () => Zr(n), s = () => Yr(n);
        return e.set("currentPlacement", t("positioning").placement), zt(o, s, {
          ...t("positioning"),
          defer: !0,
          onComplete(r) {
            e.set("currentPlacement", r.placement);
          }
        });
      },
      // in event the options are fetched (async), we still want to auto-highlight the first option
      trackChildNodes({ scope: e, computed: t, send: n }) {
        return t("autoHighlight") ? Bc(() => it(e), {
          callback: () => n({ type: "CHILDREN_CHANGE" })
        }) : void 0;
      },
      scrollToHighlightedItem({ context: e, prop: t, scope: n, event: o }) {
        const s = at(n);
        let r = [];
        const i = (c) => {
          const d = o.current().type.includes("POINTER"), f = e.get("highlightedValue");
          if (d || !f) return;
          const p = ja(n, f), g = it(n), h = t("scrollToIndexFn");
          if (h) {
            const k = t("collection").indexOf(f);
            h({ index: k, immediate: c });
            return;
          }
          const b = U(() => {
            Ri(p, { rootEl: g, block: "nearest" });
          });
          r.push(b);
        }, a = U(() => i(!0));
        r.push(a);
        const l = wi(s, {
          attributes: ["aria-activedescendant"],
          callback: () => i(!1)
        });
        return r.push(l), () => {
          r.forEach((c) => c());
        };
      }
    },
    actions: {
      reposition({ context: e, prop: t, scope: n, event: o }) {
        zt(() => Zr(n), () => Yr(n), {
          ...t("positioning"),
          ...o.options,
          defer: !0,
          listeners: !1,
          onComplete(i) {
            e.set("currentPlacement", i.placement);
          }
        });
      },
      setHighlightedItem(e) {
        const { context: t, event: n } = e;
        n.value != null && t.set("highlightedValue", n.value);
      },
      clearHighlightedItem(e) {
        const { context: t } = e;
        t.set("highlightedValue", null);
      },
      selectHighlightedItem(e) {
        const { context: t, prop: n } = e, o = t.get("highlightedValue");
        if (!o) return;
        const s = n("multiple") ? jo(t.get("value"), o) : [o];
        n("onSelect")?.({ value: s, itemValue: o }), t.set("value", s), t.set("inputValue", on(e));
      },
      selectItem(e) {
        const { context: t, event: n, flush: o, prop: s } = e;
        n.value != null && o(() => {
          const r = s("multiple") ? jo(t.get("value"), n.value) : [n.value];
          s("onSelect")?.({ value: r, itemValue: n.value }), t.set("value", r), t.set("inputValue", on(e));
        });
      },
      clearItem(e) {
        const { context: t, event: n, flush: o } = e;
        n.value != null && o(() => {
          const s = fs(t.get("value"), n.value);
          t.set("value", s), t.set("inputValue", on(e));
        });
      },
      setInitialFocus({ scope: e }) {
        U(() => {
          Jr(e);
        });
      },
      setFinalFocus({ scope: e }) {
        U(() => {
          Cn(e)?.dataset.focusable == null ? Jr(e) : Pm(e);
        });
      },
      syncInputValue({ context: e, scope: t, event: n }) {
        const o = at(t);
        o && (o.value = e.get("inputValue"), queueMicrotask(() => {
          n.current().type !== "INPUT.CHANGE" && Xl(o);
        }));
      },
      setInputValue({ context: e, event: t }) {
        e.set("inputValue", t.value);
      },
      clearInputValue({ context: e }) {
        e.set("inputValue", "");
      },
      revertInputValue({ context: e, prop: t, computed: n }) {
        const o = t("selectionBehavior"), s = hn(o, {
          replace: n("hasSelectedItems") ? e.get("valueAsString") : "",
          preserve: e.get("inputValue"),
          clear: ""
        });
        e.set("inputValue", s);
      },
      setValue(e) {
        const { context: t, flush: n, event: o } = e;
        n(() => {
          t.set("value", o.value), t.set("inputValue", on(e));
        });
      },
      clearSelectedItems(e) {
        const { context: t, flush: n } = e;
        n(() => {
          t.set("value", []), t.set("inputValue", on(e));
        });
      },
      scrollContentToTop({ prop: e, scope: t }) {
        const n = e("scrollToIndexFn");
        if (n)
          n({ index: 0, immediate: !0 });
        else {
          const o = it(t);
          if (!o) return;
          o.scrollTop = 0;
        }
      },
      invokeOnOpen({ prop: e }) {
        e("onOpenChange")?.({ open: !0 });
      },
      invokeOnClose({ prop: e }) {
        e("onOpenChange")?.({ open: !1 });
      },
      highlightFirstItem({ context: e, prop: t, scope: n }) {
        (it(n) ? queueMicrotask : U)(() => {
          const s = t("collection").firstValue;
          s && e.set("highlightedValue", s);
        });
      },
      highlightFirstItemIfNeeded({ computed: e, action: t }) {
        e("autoHighlight") && t(["highlightFirstItem"]);
      },
      highlightLastItem({ context: e, prop: t, scope: n }) {
        (it(n) ? queueMicrotask : U)(() => {
          const s = t("collection").lastValue;
          s && e.set("highlightedValue", s);
        });
      },
      highlightNextItem({ context: e, prop: t }) {
        let n = null;
        const o = e.get("highlightedValue"), s = t("collection");
        o ? (n = s.getNextValue(o), !n && t("loopFocus") && (n = s.firstValue)) : n = s.firstValue, n && e.set("highlightedValue", n);
      },
      highlightPrevItem({ context: e, prop: t }) {
        let n = null;
        const o = e.get("highlightedValue"), s = t("collection");
        o ? (n = s.getPreviousValue(o), !n && t("loopFocus") && (n = s.lastValue)) : n = s.lastValue, n && e.set("highlightedValue", n);
      },
      highlightFirstSelectedItem({ context: e, prop: t }) {
        U(() => {
          const [n] = t("collection").sort(e.get("value"));
          n && e.set("highlightedValue", n);
        });
      },
      highlightFirstOrSelectedItem({ context: e, prop: t, computed: n }) {
        U(() => {
          let o = null;
          n("hasSelectedItems") ? o = t("collection").sort(e.get("value"))[0] : o = t("collection").firstValue, o && e.set("highlightedValue", o);
        });
      },
      highlightLastOrSelectedItem({ context: e, prop: t, computed: n }) {
        U(() => {
          const o = t("collection");
          let s = null;
          n("hasSelectedItems") ? s = o.sort(e.get("value"))[0] : s = o.lastValue, s && e.set("highlightedValue", s);
        });
      },
      autofillInputValue({ context: e, computed: t, prop: n, event: o, scope: s }) {
        const r = at(s), i = n("collection");
        if (!t("autoComplete") || !r || !o.keypress) return;
        const a = i.stringify(e.get("highlightedValue"));
        U(() => {
          r.value = a || e.get("inputValue");
        });
      },
      syncSelectedItems(e) {
        const { context: t, prop: n } = e, o = hn(n("selectionBehavior"), {
          preserve: t.get("inputValue"),
          replace: n("collection").stringifyMany(t.get("value")),
          clear: ""
        });
        t.set("selectedItems", Rm(e)), t.set("inputValue", o);
      },
      syncHighlightedItem({ context: e, prop: t }) {
        const n = t("collection").find(e.get("highlightedValue"));
        e.set("highlightedItem", n);
      },
      toggleVisibility({ event: e, send: t, prop: n }) {
        t({ type: n("open") ? "CONTROLLED.OPEN" : "CONTROLLED.CLOSE", previousEvent: e });
      }
    }
  }
};
function on({ context: e, prop: t }) {
  return hn(t("selectionBehavior"), {
    preserve: e.get("inputValue"),
    replace: e.get("valueAsString"),
    clear: ""
  });
}
function Rm({ context: e, prop: t }) {
  const n = t("collection");
  return e.get("value").map((o) => {
    const s = e.get("selectedItems").find((r) => n.getItemValue(r) === o);
    return s || n.find(o);
  });
}
ne()([
  "allowCustomValue",
  "autoFocus",
  "closeOnSelect",
  "collection",
  "composite",
  "defaultHighlightedValue",
  "defaultInputValue",
  "defaultOpen",
  "defaultValue",
  "dir",
  "disabled",
  "disableLayer",
  "form",
  "getRootNode",
  "highlightedValue",
  "id",
  "ids",
  "inputBehavior",
  "inputValue",
  "invalid",
  "loopFocus",
  "multiple",
  "name",
  "navigate",
  "onFocusOutside",
  "onHighlightChange",
  "onInputValueChange",
  "onInteractOutside",
  "onOpenChange",
  "onOpenChange",
  "onPointerDownOutside",
  "onSelect",
  "onValueChange",
  "open",
  "openOnChange",
  "openOnClick",
  "openOnKeyPress",
  "placeholder",
  "positioning",
  "readOnly",
  "required",
  "scrollToIndexFn",
  "selectionBehavior",
  "translations",
  "value"
]);
ne()(["htmlFor"]);
ne()(["id"]);
ne()(["item", "persistFocus"]);
const $m = (e, t) => {
  const n = Ce(), o = He(), s = Ue(qe), r = Yt(), i = L(() => {
    const l = ce(e);
    return {
      id: n,
      ids: {
        label: r?.value.ids.label,
        input: r?.value.ids.control
      },
      disabled: r?.value.disabled,
      readOnly: r?.value.readOnly,
      required: r?.value.required,
      invalid: r?.value.invalid,
      dir: s.value.dir,
      value: l.modelValue,
      getRootNode: o?.value.getRootNode,
      ...Xe(l),
      onFocusOutside: (c) => {
        t?.("focusOutside", c), l.onFocusOutside?.(c);
      },
      onHighlightChange: (c) => {
        t?.("highlightChange", c), t?.("update:highlightedValue", c.highlightedValue), l.onHighlightChange?.(c);
      },
      onInputValueChange: (c) => {
        t?.("inputValueChange", c), t?.("update:inputValue", c.inputValue), l.onInputValueChange?.(c);
      },
      onInteractOutside: (c) => {
        t?.("interactOutside", c), l.onInteractOutside?.(c);
      },
      onPointerDownOutside: (c) => {
        t?.("pointerDownOutside", c), l.onPointerDownOutside?.(c);
      },
      onOpenChange: (c) => {
        t?.("openChange", c), t?.("update:open", c.open), l.onOpenChange?.(c);
      },
      onValueChange: (c) => {
        t?.("valueChange", c), t?.("update:modelValue", c.value), l.onValueChange?.(c);
      }
    };
  }), a = Se(Sm, i);
  return L(() => wm(a, Ne));
}, Vm = /* @__PURE__ */ _({
  __name: "combobox-root",
  props: /* @__PURE__ */ ve({
    allowCustomValue: { type: Boolean },
    autoFocus: { type: Boolean },
    closeOnSelect: { type: Boolean },
    collection: {},
    composite: { type: Boolean },
    defaultHighlightedValue: {},
    defaultInputValue: {},
    defaultOpen: { type: Boolean },
    defaultValue: {},
    disableLayer: { type: Boolean },
    disabled: { type: Boolean },
    form: {},
    highlightedValue: {},
    id: {},
    ids: {},
    inputBehavior: {},
    inputValue: {},
    invalid: { type: Boolean },
    loopFocus: { type: Boolean },
    modelValue: {},
    multiple: { type: Boolean },
    name: {},
    navigate: { type: Function },
    open: { type: Boolean },
    openOnChange: { type: [Boolean, Function] },
    openOnClick: { type: Boolean },
    openOnKeyPress: { type: Boolean },
    placeholder: {},
    positioning: {},
    readOnly: { type: Boolean },
    required: { type: Boolean },
    scrollToIndexFn: { type: Function },
    selectionBehavior: {},
    translations: {},
    lazyMount: { type: Boolean },
    unmountOnExit: { type: Boolean },
    asChild: { type: Boolean }
  }, {
    allowCustomValue: void 0,
    autoFocus: void 0,
    closeOnSelect: void 0,
    composite: void 0,
    defaultOpen: void 0,
    disabled: void 0,
    disableLayer: void 0,
    invalid: void 0,
    loopFocus: void 0,
    multiple: void 0,
    open: void 0,
    openOnChange: void 0,
    openOnClick: void 0,
    openOnKeyPress: void 0,
    readOnly: void 0,
    required: void 0
  }),
  emits: ["focusOutside", "highlightChange", "inputValueChange", "interactOutside", "openChange", "pointerDownOutside", "valueChange", "select", "update:modelValue", "update:highlightedValue", "update:inputValue", "update:open"],
  setup(e, { emit: t }) {
    const n = e, s = $m(n, t);
    return Ma(s), ft(L(() => ({ lazyMount: n.lazyMount, unmountOnExit: n.unmountOnExit }))), R(), (r, i) => (v(), T(u(A).div, V(u(s).getRootProps(), { "as-child": r.asChild }), {
      default: C(() => [
        E(r.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Am = /* @__PURE__ */ _({
  __name: "combobox-trigger",
  props: {
    focusable: { type: Boolean },
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = e, n = _e();
    return (o, s) => (v(), T(u(A).button, V(u(n).getTriggerProps(t), { "as-child": o.asChild }), {
      default: C(() => [
        E(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClearTrigger: Qh,
  Content: Jh,
  Context: em,
  Control: tm,
  Input: nm,
  Item: gm,
  ItemContext: rm,
  ItemGroup: cm,
  ItemGroupLabel: lm,
  ItemIndicator: dm,
  ItemText: pm,
  Label: fm,
  List: hm,
  Positioner: mm,
  Root: Vm,
  RootProvider: vm,
  Trigger: Am
}, Symbol.toStringTag, { value: "Module" })), Lm = { class: "cb-input-wrapper" }, Nm = { class: "cb-item-content" }, Dm = /* @__PURE__ */ _({
  __name: "BaseCombobox",
  props: /* @__PURE__ */ ut({
    title: { default: "Select" },
    inputPlaceholder: { default: "Search" },
    labelKey: { default: "label" },
    disabled: { type: Boolean, default: !1 },
    multiple: { type: Boolean },
    showActions: { type: Boolean, default: !1 },
    maxHeight: { default: 37.5 },
    positioning: { default: () => ({
      placement: "bottom-start",
      flip: !0,
      overlap: !1,
      sameWidth: !0
    }) }
  }, {
    items: { default: [] },
    itemsModifiers: {},
    selectedItemKeys: {
      default: []
    },
    selectedItemKeysModifiers: {},
    inputValue: { default: "" },
    inputValueModifiers: {}
  }),
  emits: /* @__PURE__ */ ut(["update:selectedItemKeys", "change", "onItemSelect"], ["update:items", "update:selectedItemKeys", "update:inputValue"]),
  setup(e, { emit: t }) {
    const n = e, o = t, s = Qe(e, "items"), r = Qe(e, "selectedItemKeys"), i = Qe(e, "inputValue"), a = L(
      () => Zh({
        items: s.value,
        itemToString: (d) => d[n.labelKey],
        itemToValue: (d) => d[n.labelKey]
      })
    );
    function l(d) {
      console.log("BaseCombobox: handleValueChange called", d), vo(() => {
      });
    }
    function c(d) {
      console.log("BaseCombobox: handleItemSelect called", d), o("onItemSelect", d);
      const f = d[n.labelKey];
      r.value.includes(f) || r.value.push(f);
    }
    return (d, f) => (v(), T(u(Me).Root, {
      "input-value": i.value,
      collection: a.value,
      multiple: !1,
      "selection-behavior": "preserve",
      class: "cb",
      disabled: d.disabled,
      positioning: d.positioning,
      onInputValueChange: l
    }, {
      default: C(() => [
        F(u(Me).Label, { class: "cb-label" }, {
          default: C(() => [
            ee(W(n.title), 1)
          ]),
          _: 1
        }),
        F(u(Me).Control, {
          class: ie(["cb-control", { "cb-control--disabled": d.disabled }])
        }, {
          default: C(() => [
            H("div", Lm, [
              F(u(Me).Input, {
                class: "cb-input",
                placeholder: "hello",
                "aria-disabled": d.disabled
              }, null, 8, ["aria-disabled"]),
              r.value.length > 0 && !d.disabled ? (v(), T(u(Me).ClearTrigger, {
                key: 0,
                class: "cb-clear-trigger",
                "aria-label": "Clear selection"
              }, {
                default: C(() => f[0] || (f[0] = [
                  ee(" × ")
                ])),
                _: 1
              })) : Z("", !0),
              F(u(Me).Trigger, {
                class: "cb-trigger",
                "aria-label": "Toggle dropdown"
              }, {
                default: C(() => f[1] || (f[1] = [
                  ee(" ▼ ")
                ])),
                _: 1
              })
            ])
          ]),
          _: 1
        }, 8, ["class"]),
        (v(), T(gi, { to: "body" }, [
          F(u(Me).Positioner, { class: "cb-positioner" }, {
            default: C(() => [
              F(u(Me).Content, {
                class: "cb-content",
                style: En({ maxHeight: `${n.maxHeight}rem` })
              }, {
                default: C(() => [
                  F(u(Me).ItemGroup, { class: "cb-item-group" }, {
                    default: C(() => [
                      (v(!0), M(re, null, xe(a.value.items, (p) => (v(), T(u(Me).Item, {
                        key: p.id,
                        item: p,
                        class: ie(["cb-item", {
                          "cb-item--disabled": p.disabled
                        }]),
                        onClick: (g) => c(p)
                      }, {
                        default: C(() => [
                          H("div", Nm, [
                            F(u(Me).ItemText, null, {
                              default: C(() => [
                                E(d.$slots, "itemLabel", { item: p }, () => [
                                  ee(W(p[d.labelKey]), 1)
                                ], !0)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["item", "class", "onClick"]))), 128))
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              }, 8, ["style"])
            ]),
            _: 3
          })
        ]))
      ]),
      _: 3
    }, 8, ["input-value", "collection", "disabled", "positioning"]));
  }
}), Xy = /* @__PURE__ */ Q(Dm, [["__scopeId", "data-v-3737eef1"]]), Bm = { class: "form-field" }, Mm = {
  key: 0,
  class: "title"
}, Fm = /* @__PURE__ */ _({
  __name: "FormField",
  props: {
    field: { default: void 0 },
    title: { default: "" },
    validate: { type: Boolean, default: !1 }
  },
  setup(e) {
    const t = e, n = J(!1), o = J(!1);
    return (s, r) => (v(), M("div", Bm, [
      t.title ? (v(), M("div", Mm, W(t.title), 1)) : Z("", !0),
      E(s.$slots, "default", {
        touch: () => {
          n.value = !0;
        },
        blur: () => {
          o.value = !0;
        }
      }, void 0, !0),
      F(hl, null, {
        default: C(() => [
          Ft(H("div", { class: "error-msg" }, W(t.field?.error), 513), [
            [
              ml,
              !t.field?.isValid && (n.value && o.value || t.validate)
            ]
          ])
        ]),
        _: 1
      })
    ]));
  }
}), Yy = /* @__PURE__ */ Q(Fm, [["__scopeId", "data-v-94cfbf25"]]);
function js() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null
  };
}
let kt = js();
function qa(e) {
  kt = e;
}
const Xa = /[&<>"']/, Gm = new RegExp(Xa.source, "g"), Ya = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, Hm = new RegExp(Ya.source, "g"), Um = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}, ei = (e) => Um[e];
function ke(e, t) {
  if (t) {
    if (Xa.test(e))
      return e.replace(Gm, ei);
  } else if (Ya.test(e))
    return e.replace(Hm, ei);
  return e;
}
const zm = /(^|[^\[])\^/g;
function Y(e, t) {
  let n = typeof e == "string" ? e : e.source;
  t = t || "";
  const o = {
    replace: (s, r) => {
      let i = typeof r == "string" ? r : r.source;
      return i = i.replace(zm, "$1"), n = n.replace(s, i), o;
    },
    getRegex: () => new RegExp(n, t)
  };
  return o;
}
function ti(e) {
  try {
    e = encodeURI(e).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return e;
}
const _n = { exec: () => null };
function ni(e, t) {
  const n = e.replace(/\|/g, (r, i, a) => {
    let l = !1, c = i;
    for (; --c >= 0 && a[c] === "\\"; )
      l = !l;
    return l ? "|" : " |";
  }), o = n.split(/ \|/);
  let s = 0;
  if (o[0].trim() || o.shift(), o.length > 0 && !o[o.length - 1].trim() && o.pop(), t)
    if (o.length > t)
      o.splice(t);
    else
      for (; o.length < t; )
        o.push("");
  for (; s < o.length; s++)
    o[s] = o[s].trim().replace(/\\\|/g, "|");
  return o;
}
function sn(e, t, n) {
  const o = e.length;
  if (o === 0)
    return "";
  let s = 0;
  for (; s < o && e.charAt(o - s - 1) === t; )
    s++;
  return e.slice(0, o - s);
}
function Wm(e, t) {
  if (e.indexOf(t[1]) === -1)
    return -1;
  let n = 0;
  for (let o = 0; o < e.length; o++)
    if (e[o] === "\\")
      o++;
    else if (e[o] === t[0])
      n++;
    else if (e[o] === t[1] && (n--, n < 0))
      return o;
  return -1;
}
function oi(e, t, n, o) {
  const s = t.href, r = t.title ? ke(t.title) : null, i = e[1].replace(/\\([\[\]])/g, "$1");
  if (e[0].charAt(0) !== "!") {
    o.state.inLink = !0;
    const a = {
      type: "link",
      raw: n,
      href: s,
      title: r,
      text: i,
      tokens: o.inlineTokens(i)
    };
    return o.state.inLink = !1, a;
  }
  return {
    type: "image",
    raw: n,
    href: s,
    title: r,
    text: ke(i)
  };
}
function Km(e, t) {
  const n = e.match(/^(\s+)(?:```)/);
  if (n === null)
    return t;
  const o = n[1];
  return t.split(`
`).map((s) => {
    const r = s.match(/^\s+/);
    if (r === null)
      return s;
    const [i] = r;
    return i.length >= o.length ? s.slice(o.length) : s;
  }).join(`
`);
}
class go {
  options;
  rules;
  // set by the lexer
  lexer;
  // set by the lexer
  constructor(t) {
    this.options = t || kt;
  }
  space(t) {
    const n = this.rules.block.newline.exec(t);
    if (n && n[0].length > 0)
      return {
        type: "space",
        raw: n[0]
      };
  }
  code(t) {
    const n = this.rules.block.code.exec(t);
    if (n) {
      const o = n[0].replace(/^(?: {1,4}| {0,3}\t)/gm, "");
      return {
        type: "code",
        raw: n[0],
        codeBlockStyle: "indented",
        text: this.options.pedantic ? o : sn(o, `
`)
      };
    }
  }
  fences(t) {
    const n = this.rules.block.fences.exec(t);
    if (n) {
      const o = n[0], s = Km(o, n[3] || "");
      return {
        type: "code",
        raw: o,
        lang: n[2] ? n[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : n[2],
        text: s
      };
    }
  }
  heading(t) {
    const n = this.rules.block.heading.exec(t);
    if (n) {
      let o = n[2].trim();
      if (/#$/.test(o)) {
        const s = sn(o, "#");
        (this.options.pedantic || !s || / $/.test(s)) && (o = s.trim());
      }
      return {
        type: "heading",
        raw: n[0],
        depth: n[1].length,
        text: o,
        tokens: this.lexer.inline(o)
      };
    }
  }
  hr(t) {
    const n = this.rules.block.hr.exec(t);
    if (n)
      return {
        type: "hr",
        raw: sn(n[0], `
`)
      };
  }
  blockquote(t) {
    const n = this.rules.block.blockquote.exec(t);
    if (n) {
      let o = sn(n[0], `
`).split(`
`), s = "", r = "";
      const i = [];
      for (; o.length > 0; ) {
        let a = !1;
        const l = [];
        let c;
        for (c = 0; c < o.length; c++)
          if (/^ {0,3}>/.test(o[c]))
            l.push(o[c]), a = !0;
          else if (!a)
            l.push(o[c]);
          else
            break;
        o = o.slice(c);
        const d = l.join(`
`), f = d.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g, `
    $1`).replace(/^ {0,3}>[ \t]?/gm, "");
        s = s ? `${s}
${d}` : d, r = r ? `${r}
${f}` : f;
        const p = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(f, i, !0), this.lexer.state.top = p, o.length === 0)
          break;
        const g = i[i.length - 1];
        if (g?.type === "code")
          break;
        if (g?.type === "blockquote") {
          const h = g, b = h.raw + `
` + o.join(`
`), k = this.blockquote(b);
          i[i.length - 1] = k, s = s.substring(0, s.length - h.raw.length) + k.raw, r = r.substring(0, r.length - h.text.length) + k.text;
          break;
        } else if (g?.type === "list") {
          const h = g, b = h.raw + `
` + o.join(`
`), k = this.list(b);
          i[i.length - 1] = k, s = s.substring(0, s.length - g.raw.length) + k.raw, r = r.substring(0, r.length - h.raw.length) + k.raw, o = b.substring(i[i.length - 1].raw.length).split(`
`);
          continue;
        }
      }
      return {
        type: "blockquote",
        raw: s,
        tokens: i,
        text: r
      };
    }
  }
  list(t) {
    let n = this.rules.block.list.exec(t);
    if (n) {
      let o = n[1].trim();
      const s = o.length > 1, r = {
        type: "list",
        raw: "",
        ordered: s,
        start: s ? +o.slice(0, -1) : "",
        loose: !1,
        items: []
      };
      o = s ? `\\d{1,9}\\${o.slice(-1)}` : `\\${o}`, this.options.pedantic && (o = s ? o : "[*+-]");
      const i = new RegExp(`^( {0,3}${o})((?:[	 ][^\\n]*)?(?:\\n|$))`);
      let a = !1;
      for (; t; ) {
        let l = !1, c = "", d = "";
        if (!(n = i.exec(t)) || this.rules.block.hr.test(t))
          break;
        c = n[0], t = t.substring(c.length);
        let f = n[2].split(`
`, 1)[0].replace(/^\t+/, ($) => " ".repeat(3 * $.length)), p = t.split(`
`, 1)[0], g = !f.trim(), h = 0;
        if (this.options.pedantic ? (h = 2, d = f.trimStart()) : g ? h = n[1].length + 1 : (h = n[2].search(/[^ ]/), h = h > 4 ? 1 : h, d = f.slice(h), h += n[1].length), g && /^[ \t]*$/.test(p) && (c += p + `
`, t = t.substring(p.length + 1), l = !0), !l) {
          const $ = new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), I = new RegExp(`^ {0,${Math.min(3, h - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), x = new RegExp(`^ {0,${Math.min(3, h - 1)}}(?:\`\`\`|~~~)`), m = new RegExp(`^ {0,${Math.min(3, h - 1)}}#`), y = new RegExp(`^ {0,${Math.min(3, h - 1)}}<(?:[a-z].*>|!--)`, "i");
          for (; t; ) {
            const w = t.split(`
`, 1)[0];
            let N;
            if (p = w, this.options.pedantic ? (p = p.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  "), N = p) : N = p.replace(/\t/g, "    "), x.test(p) || m.test(p) || y.test(p) || $.test(p) || I.test(p))
              break;
            if (N.search(/[^ ]/) >= h || !p.trim())
              d += `
` + N.slice(h);
            else {
              if (g || f.replace(/\t/g, "    ").search(/[^ ]/) >= 4 || x.test(f) || m.test(f) || I.test(f))
                break;
              d += `
` + p;
            }
            !g && !p.trim() && (g = !0), c += w + `
`, t = t.substring(w.length + 1), f = N.slice(h);
          }
        }
        r.loose || (a ? r.loose = !0 : /\n[ \t]*\n[ \t]*$/.test(c) && (a = !0));
        let b = null, k;
        this.options.gfm && (b = /^\[[ xX]\] /.exec(d), b && (k = b[0] !== "[ ] ", d = d.replace(/^\[[ xX]\] +/, ""))), r.items.push({
          type: "list_item",
          raw: c,
          task: !!b,
          checked: k,
          loose: !1,
          text: d,
          tokens: []
        }), r.raw += c;
      }
      r.items[r.items.length - 1].raw = r.items[r.items.length - 1].raw.trimEnd(), r.items[r.items.length - 1].text = r.items[r.items.length - 1].text.trimEnd(), r.raw = r.raw.trimEnd();
      for (let l = 0; l < r.items.length; l++)
        if (this.lexer.state.top = !1, r.items[l].tokens = this.lexer.blockTokens(r.items[l].text, []), !r.loose) {
          const c = r.items[l].tokens.filter((f) => f.type === "space"), d = c.length > 0 && c.some((f) => /\n.*\n/.test(f.raw));
          r.loose = d;
        }
      if (r.loose)
        for (let l = 0; l < r.items.length; l++)
          r.items[l].loose = !0;
      return r;
    }
  }
  html(t) {
    const n = this.rules.block.html.exec(t);
    if (n)
      return {
        type: "html",
        block: !0,
        raw: n[0],
        pre: n[1] === "pre" || n[1] === "script" || n[1] === "style",
        text: n[0]
      };
  }
  def(t) {
    const n = this.rules.block.def.exec(t);
    if (n) {
      const o = n[1].toLowerCase().replace(/\s+/g, " "), s = n[2] ? n[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", r = n[3] ? n[3].substring(1, n[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : n[3];
      return {
        type: "def",
        tag: o,
        raw: n[0],
        href: s,
        title: r
      };
    }
  }
  table(t) {
    const n = this.rules.block.table.exec(t);
    if (!n || !/[:|]/.test(n[2]))
      return;
    const o = ni(n[1]), s = n[2].replace(/^\||\| *$/g, "").split("|"), r = n[3] && n[3].trim() ? n[3].replace(/\n[ \t]*$/, "").split(`
`) : [], i = {
      type: "table",
      raw: n[0],
      header: [],
      align: [],
      rows: []
    };
    if (o.length === s.length) {
      for (const a of s)
        /^ *-+: *$/.test(a) ? i.align.push("right") : /^ *:-+: *$/.test(a) ? i.align.push("center") : /^ *:-+ *$/.test(a) ? i.align.push("left") : i.align.push(null);
      for (let a = 0; a < o.length; a++)
        i.header.push({
          text: o[a],
          tokens: this.lexer.inline(o[a]),
          header: !0,
          align: i.align[a]
        });
      for (const a of r)
        i.rows.push(ni(a, i.header.length).map((l, c) => ({
          text: l,
          tokens: this.lexer.inline(l),
          header: !1,
          align: i.align[c]
        })));
      return i;
    }
  }
  lheading(t) {
    const n = this.rules.block.lheading.exec(t);
    if (n)
      return {
        type: "heading",
        raw: n[0],
        depth: n[2].charAt(0) === "=" ? 1 : 2,
        text: n[1],
        tokens: this.lexer.inline(n[1])
      };
  }
  paragraph(t) {
    const n = this.rules.block.paragraph.exec(t);
    if (n) {
      const o = n[1].charAt(n[1].length - 1) === `
` ? n[1].slice(0, -1) : n[1];
      return {
        type: "paragraph",
        raw: n[0],
        text: o,
        tokens: this.lexer.inline(o)
      };
    }
  }
  text(t) {
    const n = this.rules.block.text.exec(t);
    if (n)
      return {
        type: "text",
        raw: n[0],
        text: n[0],
        tokens: this.lexer.inline(n[0])
      };
  }
  escape(t) {
    const n = this.rules.inline.escape.exec(t);
    if (n)
      return {
        type: "escape",
        raw: n[0],
        text: ke(n[1])
      };
  }
  tag(t) {
    const n = this.rules.inline.tag.exec(t);
    if (n)
      return !this.lexer.state.inLink && /^<a /i.test(n[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(n[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(n[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0]) && (this.lexer.state.inRawBlock = !1), {
        type: "html",
        raw: n[0],
        inLink: this.lexer.state.inLink,
        inRawBlock: this.lexer.state.inRawBlock,
        block: !1,
        text: n[0]
      };
  }
  link(t) {
    const n = this.rules.inline.link.exec(t);
    if (n) {
      const o = n[2].trim();
      if (!this.options.pedantic && /^</.test(o)) {
        if (!/>$/.test(o))
          return;
        const i = sn(o.slice(0, -1), "\\");
        if ((o.length - i.length) % 2 === 0)
          return;
      } else {
        const i = Wm(n[2], "()");
        if (i > -1) {
          const l = (n[0].indexOf("!") === 0 ? 5 : 4) + n[1].length + i;
          n[2] = n[2].substring(0, i), n[0] = n[0].substring(0, l).trim(), n[3] = "";
        }
      }
      let s = n[2], r = "";
      if (this.options.pedantic) {
        const i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);
        i && (s = i[1], r = i[3]);
      } else
        r = n[3] ? n[3].slice(1, -1) : "";
      return s = s.trim(), /^</.test(s) && (this.options.pedantic && !/>$/.test(o) ? s = s.slice(1) : s = s.slice(1, -1)), oi(n, {
        href: s && s.replace(this.rules.inline.anyPunctuation, "$1"),
        title: r && r.replace(this.rules.inline.anyPunctuation, "$1")
      }, n[0], this.lexer);
    }
  }
  reflink(t, n) {
    let o;
    if ((o = this.rules.inline.reflink.exec(t)) || (o = this.rules.inline.nolink.exec(t))) {
      const s = (o[2] || o[1]).replace(/\s+/g, " "), r = n[s.toLowerCase()];
      if (!r) {
        const i = o[0].charAt(0);
        return {
          type: "text",
          raw: i,
          text: i
        };
      }
      return oi(o, r, o[0], this.lexer);
    }
  }
  emStrong(t, n, o = "") {
    let s = this.rules.inline.emStrongLDelim.exec(t);
    if (!s || s[3] && o.match(/[\p{L}\p{N}]/u))
      return;
    if (!(s[1] || s[2] || "") || !o || this.rules.inline.punctuation.exec(o)) {
      const i = [...s[0]].length - 1;
      let a, l, c = i, d = 0;
      const f = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (f.lastIndex = 0, n = n.slice(-1 * t.length + i); (s = f.exec(n)) != null; ) {
        if (a = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !a)
          continue;
        if (l = [...a].length, s[3] || s[4]) {
          c += l;
          continue;
        } else if ((s[5] || s[6]) && i % 3 && !((i + l) % 3)) {
          d += l;
          continue;
        }
        if (c -= l, c > 0)
          continue;
        l = Math.min(l, l + c + d);
        const p = [...s[0]][0].length, g = t.slice(0, i + s.index + p + l);
        if (Math.min(i, l) % 2) {
          const b = g.slice(1, -1);
          return {
            type: "em",
            raw: g,
            text: b,
            tokens: this.lexer.inlineTokens(b)
          };
        }
        const h = g.slice(2, -2);
        return {
          type: "strong",
          raw: g,
          text: h,
          tokens: this.lexer.inlineTokens(h)
        };
      }
    }
  }
  codespan(t) {
    const n = this.rules.inline.code.exec(t);
    if (n) {
      let o = n[2].replace(/\n/g, " ");
      const s = /[^ ]/.test(o), r = /^ /.test(o) && / $/.test(o);
      return s && r && (o = o.substring(1, o.length - 1)), o = ke(o, !0), {
        type: "codespan",
        raw: n[0],
        text: o
      };
    }
  }
  br(t) {
    const n = this.rules.inline.br.exec(t);
    if (n)
      return {
        type: "br",
        raw: n[0]
      };
  }
  del(t) {
    const n = this.rules.inline.del.exec(t);
    if (n)
      return {
        type: "del",
        raw: n[0],
        text: n[2],
        tokens: this.lexer.inlineTokens(n[2])
      };
  }
  autolink(t) {
    const n = this.rules.inline.autolink.exec(t);
    if (n) {
      let o, s;
      return n[2] === "@" ? (o = ke(n[1]), s = "mailto:" + o) : (o = ke(n[1]), s = o), {
        type: "link",
        raw: n[0],
        text: o,
        href: s,
        tokens: [
          {
            type: "text",
            raw: o,
            text: o
          }
        ]
      };
    }
  }
  url(t) {
    let n;
    if (n = this.rules.inline.url.exec(t)) {
      let o, s;
      if (n[2] === "@")
        o = ke(n[0]), s = "mailto:" + o;
      else {
        let r;
        do
          r = n[0], n[0] = this.rules.inline._backpedal.exec(n[0])?.[0] ?? "";
        while (r !== n[0]);
        o = ke(n[0]), n[1] === "www." ? s = "http://" + n[0] : s = n[0];
      }
      return {
        type: "link",
        raw: n[0],
        text: o,
        href: s,
        tokens: [
          {
            type: "text",
            raw: o,
            text: o
          }
        ]
      };
    }
  }
  inlineText(t) {
    const n = this.rules.inline.text.exec(t);
    if (n) {
      let o;
      return this.lexer.state.inRawBlock ? o = n[0] : o = ke(n[0]), {
        type: "text",
        raw: n[0],
        text: o
      };
    }
  }
}
const jm = /^(?:[ \t]*(?:\n|$))+/, qm = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, Xm = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, Ln = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, Ym = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, Za = /(?:[*+-]|\d{1,9}[.)])/, Qa = Y(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, Za).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(), qs = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, Zm = /^[^\n]+/, Xs = /(?!\s*\])(?:\\.|[^\[\]\\])+/, Qm = Y(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Xs).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), Jm = Y(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Za).getRegex(), Ao = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ys = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, ev = Y("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ys).replace("tag", Ao).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), Ja = Y(qs).replace("hr", Ln).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ao).getRegex(), tv = Y(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", Ja).getRegex(), Zs = {
  blockquote: tv,
  code: qm,
  def: Qm,
  fences: Xm,
  heading: Ym,
  hr: Ln,
  html: ev,
  lheading: Qa,
  list: Jm,
  newline: jm,
  paragraph: Ja,
  table: _n,
  text: Zm
}, si = Y("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ln).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ao).getRegex(), nv = {
  ...Zs,
  table: si,
  paragraph: Y(qs).replace("hr", Ln).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", si).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Ao).getRegex()
}, ov = {
  ...Zs,
  html: Y(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ys).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
  heading: /^(#{1,6})(.*)(?:\n+|$)/,
  fences: _n,
  // fences not supported
  lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
  paragraph: Y(qs).replace("hr", Ln).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Qa).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
}, el = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, sv = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, tl = /^( {2,}|\\)\n(?!\s*$)/, rv = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Nn = "\\p{P}\\p{S}", iv = Y(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, Nn).getRegex(), av = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g, lv = Y(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, Nn).getRegex(), cv = Y("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, Nn).getRegex(), uv = Y("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, Nn).getRegex(), dv = Y(/\\([punct])/, "gu").replace(/punct/g, Nn).getRegex(), pv = Y(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), gv = Y(Ys).replace("(?:-->|$)", "-->").getRegex(), fv = Y("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", gv).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), fo = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, hv = Y(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", fo).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), nl = Y(/^!?\[(label)\]\[(ref)\]/).replace("label", fo).replace("ref", Xs).getRegex(), ol = Y(/^!?\[(ref)\](?:\[\])?/).replace("ref", Xs).getRegex(), mv = Y("reflink|nolink(?!\\()", "g").replace("reflink", nl).replace("nolink", ol).getRegex(), Qs = {
  _backpedal: _n,
  // only used for GFM url
  anyPunctuation: dv,
  autolink: pv,
  blockSkip: av,
  br: tl,
  code: sv,
  del: _n,
  emStrongLDelim: lv,
  emStrongRDelimAst: cv,
  emStrongRDelimUnd: uv,
  escape: el,
  link: hv,
  nolink: ol,
  punctuation: iv,
  reflink: nl,
  reflinkSearch: mv,
  tag: fv,
  text: rv,
  url: _n
}, vv = {
  ...Qs,
  link: Y(/^!?\[(label)\]\((.*?)\)/).replace("label", fo).getRegex(),
  reflink: Y(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", fo).getRegex()
}, cs = {
  ...Qs,
  escape: Y(el).replace("])", "~|])").getRegex(),
  url: Y(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
  _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
  del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
  text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
}, yv = {
  ...cs,
  br: Y(tl).replace("{2,}", "*").getRegex(),
  text: Y(cs.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
}, jn = {
  normal: Zs,
  gfm: nv,
  pedantic: ov
}, rn = {
  normal: Qs,
  gfm: cs,
  breaks: yv,
  pedantic: vv
};
class Ae {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(t) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = t || kt, this.options.tokenizer = this.options.tokenizer || new go(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
      inLink: !1,
      inRawBlock: !1,
      top: !0
    };
    const n = {
      block: jn.normal,
      inline: rn.normal
    };
    this.options.pedantic ? (n.block = jn.pedantic, n.inline = rn.pedantic) : this.options.gfm && (n.block = jn.gfm, this.options.breaks ? n.inline = rn.breaks : n.inline = rn.gfm), this.tokenizer.rules = n;
  }
  /**
   * Expose Rules
   */
  static get rules() {
    return {
      block: jn,
      inline: rn
    };
  }
  /**
   * Static Lex Method
   */
  static lex(t, n) {
    return new Ae(n).lex(t);
  }
  /**
   * Static Lex Inline Method
   */
  static lexInline(t, n) {
    return new Ae(n).inlineTokens(t);
  }
  /**
   * Preprocessing
   */
  lex(t) {
    t = t.replace(/\r\n|\r/g, `
`), this.blockTokens(t, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      const o = this.inlineQueue[n];
      this.inlineTokens(o.src, o.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(t, n = [], o = !1) {
    this.options.pedantic && (t = t.replace(/\t/g, "    ").replace(/^ +$/gm, ""));
    let s, r, i;
    for (; t; )
      if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some((a) => (s = a.call({ lexer: this }, t, n)) ? (t = t.substring(s.raw.length), n.push(s), !0) : !1))) {
        if (s = this.tokenizer.space(t)) {
          t = t.substring(s.raw.length), s.raw.length === 1 && n.length > 0 ? n[n.length - 1].raw += `
` : n.push(s);
          continue;
        }
        if (s = this.tokenizer.code(t)) {
          t = t.substring(s.raw.length), r = n[n.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(s);
          continue;
        }
        if (s = this.tokenizer.fences(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (s = this.tokenizer.heading(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (s = this.tokenizer.hr(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (s = this.tokenizer.blockquote(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (s = this.tokenizer.list(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (s = this.tokenizer.html(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (s = this.tokenizer.def(t)) {
          t = t.substring(s.raw.length), r = n[n.length - 1], r && (r.type === "paragraph" || r.type === "text") ? (r.raw += `
` + s.raw, r.text += `
` + s.raw, this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = {
            href: s.href,
            title: s.title
          });
          continue;
        }
        if (s = this.tokenizer.table(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (s = this.tokenizer.lheading(t)) {
          t = t.substring(s.raw.length), n.push(s);
          continue;
        }
        if (i = t, this.options.extensions && this.options.extensions.startBlock) {
          let a = 1 / 0;
          const l = t.slice(1);
          let c;
          this.options.extensions.startBlock.forEach((d) => {
            c = d.call({ lexer: this }, l), typeof c == "number" && c >= 0 && (a = Math.min(a, c));
          }), a < 1 / 0 && a >= 0 && (i = t.substring(0, a + 1));
        }
        if (this.state.top && (s = this.tokenizer.paragraph(i))) {
          r = n[n.length - 1], o && r?.type === "paragraph" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(s), o = i.length !== t.length, t = t.substring(s.raw.length);
          continue;
        }
        if (s = this.tokenizer.text(t)) {
          t = t.substring(s.raw.length), r = n[n.length - 1], r && r.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = r.text) : n.push(s);
          continue;
        }
        if (t) {
          const a = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(a);
            break;
          } else
            throw new Error(a);
        }
      }
    return this.state.top = !0, n;
  }
  inline(t, n = []) {
    return this.inlineQueue.push({ src: t, tokens: n }), n;
  }
  /**
   * Lexing/Compiling
   */
  inlineTokens(t, n = []) {
    let o, s, r, i = t, a, l, c;
    if (this.tokens.links) {
      const d = Object.keys(this.tokens.links);
      if (d.length > 0)
        for (; (a = this.tokenizer.rules.inline.reflinkSearch.exec(i)) != null; )
          d.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (i = i.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (a = this.tokenizer.rules.inline.blockSkip.exec(i)) != null; )
      i = i.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    for (; (a = this.tokenizer.rules.inline.anyPunctuation.exec(i)) != null; )
      i = i.slice(0, a.index) + "++" + i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; t; )
      if (l || (c = ""), l = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some((d) => (o = d.call({ lexer: this }, t, n)) ? (t = t.substring(o.raw.length), n.push(o), !0) : !1))) {
        if (o = this.tokenizer.escape(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.tag(t)) {
          t = t.substring(o.raw.length), s = n[n.length - 1], s && o.type === "text" && s.type === "text" ? (s.raw += o.raw, s.text += o.text) : n.push(o);
          continue;
        }
        if (o = this.tokenizer.link(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.reflink(t, this.tokens.links)) {
          t = t.substring(o.raw.length), s = n[n.length - 1], s && o.type === "text" && s.type === "text" ? (s.raw += o.raw, s.text += o.text) : n.push(o);
          continue;
        }
        if (o = this.tokenizer.emStrong(t, i, c)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.codespan(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.br(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.del(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (o = this.tokenizer.autolink(t)) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (!this.state.inLink && (o = this.tokenizer.url(t))) {
          t = t.substring(o.raw.length), n.push(o);
          continue;
        }
        if (r = t, this.options.extensions && this.options.extensions.startInline) {
          let d = 1 / 0;
          const f = t.slice(1);
          let p;
          this.options.extensions.startInline.forEach((g) => {
            p = g.call({ lexer: this }, f), typeof p == "number" && p >= 0 && (d = Math.min(d, p));
          }), d < 1 / 0 && d >= 0 && (r = t.substring(0, d + 1));
        }
        if (o = this.tokenizer.inlineText(r)) {
          t = t.substring(o.raw.length), o.raw.slice(-1) !== "_" && (c = o.raw.slice(-1)), l = !0, s = n[n.length - 1], s && s.type === "text" ? (s.raw += o.raw, s.text += o.text) : n.push(o);
          continue;
        }
        if (t) {
          const d = "Infinite loop on byte: " + t.charCodeAt(0);
          if (this.options.silent) {
            console.error(d);
            break;
          } else
            throw new Error(d);
        }
      }
    return n;
  }
}
class ho {
  options;
  parser;
  // set by the parser
  constructor(t) {
    this.options = t || kt;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: n, escaped: o }) {
    const s = (n || "").match(/^\S*/)?.[0], r = t.replace(/\n$/, "") + `
`;
    return s ? '<pre><code class="language-' + ke(s) + '">' + (o ? r : ke(r, !0)) + `</code></pre>
` : "<pre><code>" + (o ? r : ke(r, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: t }) {
    return `<blockquote>
${this.parser.parse(t)}</blockquote>
`;
  }
  html({ text: t }) {
    return t;
  }
  heading({ tokens: t, depth: n }) {
    return `<h${n}>${this.parser.parseInline(t)}</h${n}>
`;
  }
  hr(t) {
    return `<hr>
`;
  }
  list(t) {
    const n = t.ordered, o = t.start;
    let s = "";
    for (let a = 0; a < t.items.length; a++) {
      const l = t.items[a];
      s += this.listitem(l);
    }
    const r = n ? "ol" : "ul", i = n && o !== 1 ? ' start="' + o + '"' : "";
    return "<" + r + i + `>
` + s + "</" + r + `>
`;
  }
  listitem(t) {
    let n = "";
    if (t.task) {
      const o = this.checkbox({ checked: !!t.checked });
      t.loose ? t.tokens.length > 0 && t.tokens[0].type === "paragraph" ? (t.tokens[0].text = o + " " + t.tokens[0].text, t.tokens[0].tokens && t.tokens[0].tokens.length > 0 && t.tokens[0].tokens[0].type === "text" && (t.tokens[0].tokens[0].text = o + " " + t.tokens[0].tokens[0].text)) : t.tokens.unshift({
        type: "text",
        raw: o + " ",
        text: o + " "
      }) : n += o + " ";
    }
    return n += this.parser.parse(t.tokens, !!t.loose), `<li>${n}</li>
`;
  }
  checkbox({ checked: t }) {
    return "<input " + (t ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: t }) {
    return `<p>${this.parser.parseInline(t)}</p>
`;
  }
  table(t) {
    let n = "", o = "";
    for (let r = 0; r < t.header.length; r++)
      o += this.tablecell(t.header[r]);
    n += this.tablerow({ text: o });
    let s = "";
    for (let r = 0; r < t.rows.length; r++) {
      const i = t.rows[r];
      o = "";
      for (let a = 0; a < i.length; a++)
        o += this.tablecell(i[a]);
      s += this.tablerow({ text: o });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + n + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: t }) {
    return `<tr>
${t}</tr>
`;
  }
  tablecell(t) {
    const n = this.parser.parseInline(t.tokens), o = t.header ? "th" : "td";
    return (t.align ? `<${o} align="${t.align}">` : `<${o}>`) + n + `</${o}>
`;
  }
  /**
   * span level renderer
   */
  strong({ tokens: t }) {
    return `<strong>${this.parser.parseInline(t)}</strong>`;
  }
  em({ tokens: t }) {
    return `<em>${this.parser.parseInline(t)}</em>`;
  }
  codespan({ text: t }) {
    return `<code>${t}</code>`;
  }
  br(t) {
    return "<br>";
  }
  del({ tokens: t }) {
    return `<del>${this.parser.parseInline(t)}</del>`;
  }
  link({ href: t, title: n, tokens: o }) {
    const s = this.parser.parseInline(o), r = ti(t);
    if (r === null)
      return s;
    t = r;
    let i = '<a href="' + t + '"';
    return n && (i += ' title="' + n + '"'), i += ">" + s + "</a>", i;
  }
  image({ href: t, title: n, text: o }) {
    const s = ti(t);
    if (s === null)
      return o;
    t = s;
    let r = `<img src="${t}" alt="${o}"`;
    return n && (r += ` title="${n}"`), r += ">", r;
  }
  text(t) {
    return "tokens" in t && t.tokens ? this.parser.parseInline(t.tokens) : t.text;
  }
}
class Js {
  // no need for block level renderers
  strong({ text: t }) {
    return t;
  }
  em({ text: t }) {
    return t;
  }
  codespan({ text: t }) {
    return t;
  }
  del({ text: t }) {
    return t;
  }
  html({ text: t }) {
    return t;
  }
  text({ text: t }) {
    return t;
  }
  link({ text: t }) {
    return "" + t;
  }
  image({ text: t }) {
    return "" + t;
  }
  br() {
    return "";
  }
}
class Le {
  options;
  renderer;
  textRenderer;
  constructor(t) {
    this.options = t || kt, this.options.renderer = this.options.renderer || new ho(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new Js();
  }
  /**
   * Static Parse Method
   */
  static parse(t, n) {
    return new Le(n).parse(t);
  }
  /**
   * Static Parse Inline Method
   */
  static parseInline(t, n) {
    return new Le(n).parseInline(t);
  }
  /**
   * Parse Loop
   */
  parse(t, n = !0) {
    let o = "";
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const a = r, l = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (l !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(a.type)) {
          o += l || "";
          continue;
        }
      }
      const i = r;
      switch (i.type) {
        case "space": {
          o += this.renderer.space(i);
          continue;
        }
        case "hr": {
          o += this.renderer.hr(i);
          continue;
        }
        case "heading": {
          o += this.renderer.heading(i);
          continue;
        }
        case "code": {
          o += this.renderer.code(i);
          continue;
        }
        case "table": {
          o += this.renderer.table(i);
          continue;
        }
        case "blockquote": {
          o += this.renderer.blockquote(i);
          continue;
        }
        case "list": {
          o += this.renderer.list(i);
          continue;
        }
        case "html": {
          o += this.renderer.html(i);
          continue;
        }
        case "paragraph": {
          o += this.renderer.paragraph(i);
          continue;
        }
        case "text": {
          let a = i, l = this.renderer.text(a);
          for (; s + 1 < t.length && t[s + 1].type === "text"; )
            a = t[++s], l += `
` + this.renderer.text(a);
          n ? o += this.renderer.paragraph({
            type: "paragraph",
            raw: l,
            text: l,
            tokens: [{ type: "text", raw: l, text: l }]
          }) : o += l;
          continue;
        }
        default: {
          const a = 'Token with "' + i.type + '" type was not found.';
          if (this.options.silent)
            return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return o;
  }
  /**
   * Parse Inline Tokens
   */
  parseInline(t, n) {
    n = n || this.renderer;
    let o = "";
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[r.type]) {
        const a = this.options.extensions.renderers[r.type].call({ parser: this }, r);
        if (a !== !1 || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(r.type)) {
          o += a || "";
          continue;
        }
      }
      const i = r;
      switch (i.type) {
        case "escape": {
          o += n.text(i);
          break;
        }
        case "html": {
          o += n.html(i);
          break;
        }
        case "link": {
          o += n.link(i);
          break;
        }
        case "image": {
          o += n.image(i);
          break;
        }
        case "strong": {
          o += n.strong(i);
          break;
        }
        case "em": {
          o += n.em(i);
          break;
        }
        case "codespan": {
          o += n.codespan(i);
          break;
        }
        case "br": {
          o += n.br(i);
          break;
        }
        case "del": {
          o += n.del(i);
          break;
        }
        case "text": {
          o += n.text(i);
          break;
        }
        default: {
          const a = 'Token with "' + i.type + '" type was not found.';
          if (this.options.silent)
            return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return o;
  }
}
class no {
  options;
  block;
  constructor(t) {
    this.options = t || kt;
  }
  static passThroughHooks = /* @__PURE__ */ new Set([
    "preprocess",
    "postprocess",
    "processAllTokens"
  ]);
  /**
   * Process markdown before marked
   */
  preprocess(t) {
    return t;
  }
  /**
   * Process HTML after marked is finished
   */
  postprocess(t) {
    return t;
  }
  /**
   * Process all tokens before walk tokens
   */
  processAllTokens(t) {
    return t;
  }
  /**
   * Provide function to tokenize markdown
   */
  provideLexer() {
    return this.block ? Ae.lex : Ae.lexInline;
  }
  /**
   * Provide function to parse tokens
   */
  provideParser() {
    return this.block ? Le.parse : Le.parseInline;
  }
}
class bv {
  defaults = js();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = Le;
  Renderer = ho;
  TextRenderer = Js;
  Lexer = Ae;
  Tokenizer = go;
  Hooks = no;
  constructor(...t) {
    this.use(...t);
  }
  /**
   * Run callback for every token
   */
  walkTokens(t, n) {
    let o = [];
    for (const s of t)
      switch (o = o.concat(n.call(this, s)), s.type) {
        case "table": {
          const r = s;
          for (const i of r.header)
            o = o.concat(this.walkTokens(i.tokens, n));
          for (const i of r.rows)
            for (const a of i)
              o = o.concat(this.walkTokens(a.tokens, n));
          break;
        }
        case "list": {
          const r = s;
          o = o.concat(this.walkTokens(r.items, n));
          break;
        }
        default: {
          const r = s;
          this.defaults.extensions?.childTokens?.[r.type] ? this.defaults.extensions.childTokens[r.type].forEach((i) => {
            const a = r[i].flat(1 / 0);
            o = o.concat(this.walkTokens(a, n));
          }) : r.tokens && (o = o.concat(this.walkTokens(r.tokens, n)));
        }
      }
    return o;
  }
  use(...t) {
    const n = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return t.forEach((o) => {
      const s = { ...o };
      if (s.async = this.defaults.async || s.async || !1, o.extensions && (o.extensions.forEach((r) => {
        if (!r.name)
          throw new Error("extension name required");
        if ("renderer" in r) {
          const i = n.renderers[r.name];
          i ? n.renderers[r.name] = function(...a) {
            let l = r.renderer.apply(this, a);
            return l === !1 && (l = i.apply(this, a)), l;
          } : n.renderers[r.name] = r.renderer;
        }
        if ("tokenizer" in r) {
          if (!r.level || r.level !== "block" && r.level !== "inline")
            throw new Error("extension level must be 'block' or 'inline'");
          const i = n[r.level];
          i ? i.unshift(r.tokenizer) : n[r.level] = [r.tokenizer], r.start && (r.level === "block" ? n.startBlock ? n.startBlock.push(r.start) : n.startBlock = [r.start] : r.level === "inline" && (n.startInline ? n.startInline.push(r.start) : n.startInline = [r.start]));
        }
        "childTokens" in r && r.childTokens && (n.childTokens[r.name] = r.childTokens);
      }), s.extensions = n), o.renderer) {
        const r = this.defaults.renderer || new ho(this.defaults);
        for (const i in o.renderer) {
          if (!(i in r))
            throw new Error(`renderer '${i}' does not exist`);
          if (["options", "parser"].includes(i))
            continue;
          const a = i, l = o.renderer[a], c = r[a];
          r[a] = (...d) => {
            let f = l.apply(r, d);
            return f === !1 && (f = c.apply(r, d)), f || "";
          };
        }
        s.renderer = r;
      }
      if (o.tokenizer) {
        const r = this.defaults.tokenizer || new go(this.defaults);
        for (const i in o.tokenizer) {
          if (!(i in r))
            throw new Error(`tokenizer '${i}' does not exist`);
          if (["options", "rules", "lexer"].includes(i))
            continue;
          const a = i, l = o.tokenizer[a], c = r[a];
          r[a] = (...d) => {
            let f = l.apply(r, d);
            return f === !1 && (f = c.apply(r, d)), f;
          };
        }
        s.tokenizer = r;
      }
      if (o.hooks) {
        const r = this.defaults.hooks || new no();
        for (const i in o.hooks) {
          if (!(i in r))
            throw new Error(`hook '${i}' does not exist`);
          if (["options", "block"].includes(i))
            continue;
          const a = i, l = o.hooks[a], c = r[a];
          no.passThroughHooks.has(i) ? r[a] = (d) => {
            if (this.defaults.async)
              return Promise.resolve(l.call(r, d)).then((p) => c.call(r, p));
            const f = l.call(r, d);
            return c.call(r, f);
          } : r[a] = (...d) => {
            let f = l.apply(r, d);
            return f === !1 && (f = c.apply(r, d)), f;
          };
        }
        s.hooks = r;
      }
      if (o.walkTokens) {
        const r = this.defaults.walkTokens, i = o.walkTokens;
        s.walkTokens = function(a) {
          let l = [];
          return l.push(i.call(this, a)), r && (l = l.concat(r.call(this, a))), l;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(t) {
    return this.defaults = { ...this.defaults, ...t }, this;
  }
  lexer(t, n) {
    return Ae.lex(t, n ?? this.defaults);
  }
  parser(t, n) {
    return Le.parse(t, n ?? this.defaults);
  }
  parseMarkdown(t) {
    return (o, s) => {
      const r = { ...s }, i = { ...this.defaults, ...r }, a = this.onError(!!i.silent, !!i.async);
      if (this.defaults.async === !0 && r.async === !1)
        return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof o > "u" || o === null)
        return a(new Error("marked(): input parameter is undefined or null"));
      if (typeof o != "string")
        return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(o) + ", string expected"));
      i.hooks && (i.hooks.options = i, i.hooks.block = t);
      const l = i.hooks ? i.hooks.provideLexer() : t ? Ae.lex : Ae.lexInline, c = i.hooks ? i.hooks.provideParser() : t ? Le.parse : Le.parseInline;
      if (i.async)
        return Promise.resolve(i.hooks ? i.hooks.preprocess(o) : o).then((d) => l(d, i)).then((d) => i.hooks ? i.hooks.processAllTokens(d) : d).then((d) => i.walkTokens ? Promise.all(this.walkTokens(d, i.walkTokens)).then(() => d) : d).then((d) => c(d, i)).then((d) => i.hooks ? i.hooks.postprocess(d) : d).catch(a);
      try {
        i.hooks && (o = i.hooks.preprocess(o));
        let d = l(o, i);
        i.hooks && (d = i.hooks.processAllTokens(d)), i.walkTokens && this.walkTokens(d, i.walkTokens);
        let f = c(d, i);
        return i.hooks && (f = i.hooks.postprocess(f)), f;
      } catch (d) {
        return a(d);
      }
    };
  }
  onError(t, n) {
    return (o) => {
      if (o.message += `
Please report this to https://github.com/markedjs/marked.`, t) {
        const s = "<p>An error occurred:</p><pre>" + ke(o.message + "", !0) + "</pre>";
        return n ? Promise.resolve(s) : s;
      }
      if (n)
        return Promise.reject(o);
      throw o;
    };
  }
}
const _t = new bv();
function q(e, t) {
  return _t.parse(e, t);
}
q.options = q.setOptions = function(e) {
  return _t.setOptions(e), q.defaults = _t.defaults, qa(q.defaults), q;
};
q.getDefaults = js;
q.defaults = kt;
q.use = function(...e) {
  return _t.use(...e), q.defaults = _t.defaults, qa(q.defaults), q;
};
q.walkTokens = function(e, t) {
  return _t.walkTokens(e, t);
};
q.parseInline = _t.parseInline;
q.Parser = Le;
q.parser = Le.parse;
q.Renderer = ho;
q.TextRenderer = Js;
q.Lexer = Ae;
q.lexer = Ae.lex;
q.Tokenizer = go;
q.Hooks = no;
q.parse = q;
q.options;
q.setOptions;
q.use;
q.walkTokens;
q.parseInline;
Le.parse;
Ae.lex;
const Cv = ["placeholder"], _v = ["placeholder"], Ev = ["innerHTML"], Tv = /* @__PURE__ */ _({
  __name: "BaseEditableText",
  props: /* @__PURE__ */ ut({
    isEditable: {
      type: Boolean,
      default: !1
    },
    elementType: {
      type: String,
      default: "div"
    },
    variant: {
      type: String,
      default: "text"
    },
    renderMarkdown: {
      type: Boolean,
      default: !1
    },
    placeholder: {
      type: String,
      default: ""
    },
    customClass: {
      type: [String, Array],
      default: ""
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Qe(e, "modelValue"), n = e;
    return (o, s) => n.isEditable && n.variant === "textarea" && !n.renderMarkdown ? Ft((v(), M("textarea", {
      key: 0,
      "onUpdate:modelValue": s[0] || (s[0] = (r) => t.value = r),
      class: ie([
        "input-field",
        "input-field--textarea",
        { "input-field--content": !0 },
        n.customClass
      ]),
      placeholder: e.placeholder
    }, null, 10, Cv)), [
      [Ko, t.value]
    ]) : n.isEditable && !n.renderMarkdown ? Ft((v(), M("input", {
      key: 1,
      "onUpdate:modelValue": s[1] || (s[1] = (r) => t.value = r),
      class: ie(["input-field", "input-field--text", n.customClass]),
      type: "text",
      placeholder: e.placeholder
    }, null, 10, _v)), [
      [Ko, t.value]
    ]) : !n.isEditable && n.renderMarkdown ? (v(), M("div", {
      key: 2,
      class: "content content--markdown",
      innerHTML: u(q)(t.value || "")
    }, null, 8, Ev)) : (v(), T(vl(n.elementType), {
      key: 3,
      class: ie(["content", "content--text", n.customClass])
    }, {
      default: C(() => [
        ee(W(t.value), 1)
      ]),
      _: 1
    }, 8, ["class"]));
  }
}), Zy = /* @__PURE__ */ Q(Tv, [["__scopeId", "data-v-003b4016"]]), Iv = { class: "table-wrapper" }, kv = { class: "table" }, Ov = ["onClick"], xv = {
  key: 0,
  class: "actions-column"
}, Pv = ["onInput", "textContent"], wv = {
  key: 0,
  class: "actions-column"
}, Sv = {
  key: 0,
  class: "table-actions"
}, Rv = /* @__PURE__ */ _({
  __name: "BaseEditableTable",
  props: /* @__PURE__ */ ut({
    headers: {
      type: Array,
      required: !0
    },
    editable: {
      type: Boolean,
      default: !1
    },
    addButtonText: {
      type: String,
      default: "Add Row"
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(e) {
    const t = Qe(e, "modelValue"), n = e;
    function o(l, c, d, f) {
      const g = l.target.textContent?.trim() ?? "";
      c[d.key] = g, t.value && (t.value[f] = c);
    }
    function s(l) {
      l.preventDefault();
      const c = l.clipboardData?.getData("text/plain") ?? "";
      document.execCommand("insertText", !1, c);
    }
    function r(l) {
      l.sortable;
    }
    function i() {
      const l = { id: crypto.randomUUID() };
      n.headers.forEach((c) => {
        l[c.key] = "";
      }), t.value || (t.value = []), t.value.push(l);
    }
    function a(l) {
      t.value && (t.value = t.value.filter((c, d) => d !== l));
    }
    return (l, c) => (v(), M(re, null, [
      H("div", Iv, [
        H("table", kv, [
          H("thead", null, [
            H("tr", null, [
              (v(!0), M(re, null, xe(e.headers, (d) => (v(), M("th", {
                key: d.key,
                class: ie({
                  sortable: d.sortable,
                  [d.class]: !!d.class
                }),
                onClick: (f) => r(d)
              }, W(d.text || d.label), 11, Ov))), 128)),
              e.editable ? (v(), M("th", xv)) : Z("", !0)
            ])
          ]),
          H("tbody", null, [
            (v(!0), M(re, null, xe(t.value, (d, f) => (v(), M("tr", {
              key: d.id ?? f,
              class: ie(d.rowClass)
            }, [
              (v(!0), M(re, null, xe(e.headers, (p) => (v(), M("td", {
                key: p.key,
                class: ie({
                  [p.class]: !!p.class,
                  editable: e.editable && p.editable
                })
              }, [
                e.editable && p.editable ? (v(), M("div", {
                  key: 0,
                  contenteditable: "",
                  class: "editable-cell",
                  onInput: (g) => o(g, d, p, f),
                  onPaste: s,
                  textContent: W(d[p.key])
                }, null, 40, Pv)) : (v(), M(re, { key: 1 }, [
                  ee(W(d[p.key]), 1)
                ], 64))
              ], 2))), 128)),
              e.editable ? (v(), M("td", wv, [
                F(u(Gt), {
                  name: "delete",
                  size: "18",
                  color: "currentColor",
                  class: "delete-icon",
                  onClick: (p) => a(f)
                }, null, 8, ["onClick"])
              ])) : Z("", !0)
            ], 2))), 128))
          ])
        ])
      ]),
      e.editable ? (v(), M("div", Sv, [
        F(u(Ol), {
          variant: "small",
          onClick: i
        }, {
          default: C(() => [
            ee(W(e.addButtonText), 1)
          ]),
          _: 1
        })
      ])) : Z("", !0)
    ], 64));
  }
}), Qy = /* @__PURE__ */ Q(Rv, [["__scopeId", "data-v-0d26e537"]]);
var $v = Pe("toast").parts(
  "group",
  "root",
  "title",
  "description",
  "actionTrigger",
  "closeTrigger"
), Lt = $v.build(), Vv = (e) => `toast-group:${e}`, ri = (e, t) => e.getById(`toast-group:${t}`), sl = (e) => `toast:${e.id}`, ii = (e) => e.getById(sl(e)), ai = (e) => `toast:${e.id}:title`, li = (e) => `toast:${e.id}:description`, Av = (e) => `toast${e.id}:close`, ci = {
  info: 5e3,
  error: 5e3,
  success: 2e3,
  loading: 1 / 0,
  DEFAULT: 5e3
};
function Wo(e, t) {
  return e ?? ci[t] ?? ci.DEFAULT;
}
var Lv = (e) => typeof e == "string" ? { left: e, right: e, bottom: e, top: e } : e;
function Nv(e, t) {
  const { prop: n, computed: o, context: s } = e, { offsets: r, gap: i } = n("store").attrs, a = s.get("heights"), l = Lv(r), c = n("dir") === "rtl", d = t.replace("-start", c ? "-right" : "-left").replace("-end", c ? "-left" : "-right"), f = d.includes("right"), p = d.includes("left"), g = {
    position: "fixed",
    pointerEvents: o("count") > 0 ? void 0 : "none",
    display: "flex",
    flexDirection: "column",
    "--gap": `${i}px`,
    "--first-height": `${a[0]?.height || 0}px`,
    zIndex: Zl
  };
  let h = "center";
  if (f && (h = "flex-end"), p && (h = "flex-start"), g.alignItems = h, d.includes("top")) {
    const b = l.top;
    g.top = `max(env(safe-area-inset-top, 0px), ${b})`;
  }
  if (d.includes("bottom")) {
    const b = l.bottom;
    g.bottom = `max(env(safe-area-inset-bottom, 0px), ${b})`;
  }
  if (!d.includes("left")) {
    const b = l.right;
    g.insetInlineEnd = `calc(env(safe-area-inset-right, 0px) + ${b})`;
  }
  if (!d.includes("right")) {
    const b = l.left;
    g.insetInlineStart = `calc(env(safe-area-inset-left, 0px) + ${b})`;
  }
  return g;
}
function Dv(e, t) {
  const { prop: n, context: o, computed: s } = e, r = n("parent"), i = r.computed("placement"), { gap: a } = r.prop("store").attrs, [l] = i.split("-"), c = o.get("mounted"), d = o.get("remainingTime"), f = s("height"), p = s("frontmost"), g = !p, h = !n("stacked"), b = n("stacked"), $ = n("type") === "loading" ? Number.MAX_SAFE_INTEGER : d, I = s("heightIndex") * a + s("heightBefore"), x = {
    position: "absolute",
    pointerEvents: "auto",
    "--opacity": "0",
    "--remove-delay": `${n("removeDelay")}ms`,
    "--duration": `${$}ms`,
    "--initial-height": `${f}px`,
    "--offset": `${I}px`,
    "--index": n("index"),
    "--z-index": s("zIndex"),
    "--lift-amount": "calc(var(--lift) * var(--gap))",
    "--y": "100%",
    "--x": "0"
  }, m = (y) => Object.assign(x, y);
  return l === "top" ? m({
    top: "0",
    "--sign": "-1",
    "--y": "-100%",
    "--lift": "1"
  }) : l === "bottom" && m({
    bottom: "0",
    "--sign": "1",
    "--y": "100%",
    "--lift": "-1"
  }), c && (m({
    "--y": "0",
    "--opacity": "1"
  }), b && m({
    "--y": "calc(var(--lift) * var(--offset))",
    "--height": "var(--initial-height)"
  })), t || m({
    "--opacity": "0",
    pointerEvents: "none"
  }), g && h && (m({
    "--base-scale": "var(--index) * 0.05 + 1",
    "--y": "calc(var(--lift-amount) * var(--index))",
    "--scale": "calc(-1 * var(--base-scale))",
    "--height": "var(--first-height)"
  }), t || m({
    "--y": "calc(var(--sign) * 40%)"
  })), g && b && !t && m({
    "--y": "calc(var(--lift) * var(--offset) + var(--lift) * -100%)"
  }), p && !t && m({
    "--y": "calc(var(--lift) * -100%)"
  }), x;
}
function Bv(e, t) {
  const { computed: n } = e, o = {
    position: "absolute",
    inset: "0",
    scale: "1 2",
    pointerEvents: t ? "none" : "auto"
  }, s = (r) => Object.assign(o, r);
  return n("frontmost") && !t && s({
    height: "calc(var(--initial-height) + 80%)"
  }), o;
}
function Mv() {
  return {
    position: "absolute",
    left: "0",
    height: "calc(var(--gap) + 2px)",
    bottom: "100%",
    width: "100%"
  };
}
function Fv(e, t) {
  const { context: n, prop: o, send: s, refs: r, computed: i } = e;
  return {
    getCount() {
      return n.get("toasts").length;
    },
    getToasts() {
      return n.get("toasts");
    },
    getGroupProps(a = {}) {
      const { label: l = "Notifications" } = a, { hotkey: c } = o("store").attrs, d = c.join("+").replace(/Key/g, "").replace(/Digit/g, ""), f = i("placement"), [p, g = "center"] = f.split("-");
      return t.element({
        ...Lt.group.attrs,
        dir: o("dir"),
        tabIndex: -1,
        "aria-label": `${f} ${l} ${d}`,
        id: Vv(f),
        "data-placement": f,
        "data-side": p,
        "data-align": g,
        "aria-live": "polite",
        role: "region",
        style: Nv(e, f),
        onMouseMove() {
          s({ type: "REGION.POINTER_ENTER", placement: f });
        },
        onMouseLeave() {
          s({ type: "REGION.POINTER_LEAVE", placement: f });
        },
        onFocus(h) {
          s({ type: "REGION.FOCUS", target: h.relatedTarget });
        },
        onBlur(h) {
          r.get("isFocusWithin") && !Je(h.currentTarget, h.relatedTarget) && queueMicrotask(() => s({ type: "REGION.BLUR" }));
        }
      });
    },
    subscribe(a) {
      return o("store").subscribe(() => a(n.get("toasts")));
    }
  };
}
var Gv = {
  props({ props: e }) {
    return {
      dir: "ltr",
      id: bi(),
      ...e,
      store: e.store
    };
  },
  initialState({ prop: e }) {
    return e("store").attrs.overlap ? "overlap" : "stack";
  },
  refs() {
    return {
      lastFocusedEl: null,
      isFocusWithin: !1,
      dismissableCleanup: void 0
    };
  },
  context({ bindable: e }) {
    return {
      toasts: e(() => ({
        defaultValue: [],
        sync: !0,
        hash: (t) => t.map((n) => n.id).join(",")
      })),
      heights: e(() => ({
        defaultValue: [],
        sync: !0
      }))
    };
  },
  computed: {
    count: ({ context: e }) => e.get("toasts").length,
    overlap: ({ prop: e }) => e("store").attrs.overlap,
    placement: ({ prop: e }) => e("store").attrs.placement
  },
  effects: ["subscribeToStore", "trackDocumentVisibility", "trackHotKeyPress"],
  watch({ track: e, context: t, action: n }) {
    e([() => t.hash("toasts")], () => {
      queueMicrotask(() => {
        n(["collapsedIfEmpty", "setDismissableBranch"]);
      });
    });
  },
  exit: ["clearDismissableBranch", "clearLastFocusedEl"],
  on: {
    "DOC.HOTKEY": {
      actions: ["focusRegionEl"]
    },
    "REGION.BLUR": [
      {
        guard: "isOverlapping",
        target: "overlap",
        actions: ["collapseToasts", "resumeToasts", "restoreLastFocusedEl"]
      },
      {
        target: "stack",
        actions: ["resumeToasts", "restoreLastFocusedEl"]
      }
    ],
    "TOAST.REMOVE": {
      actions: ["removeToast", "removeHeight"]
    },
    "TOAST.PAUSE": {
      actions: ["pauseToasts"]
    }
  },
  states: {
    stack: {
      on: {
        "REGION.POINTER_LEAVE": [
          {
            guard: "isOverlapping",
            target: "overlap",
            actions: ["resumeToasts", "collapseToasts"]
          },
          {
            actions: ["resumeToasts"]
          }
        ],
        "REGION.OVERLAP": {
          target: "overlap",
          actions: ["collapseToasts"]
        },
        "REGION.FOCUS": {
          actions: ["setLastFocusedEl", "pauseToasts"]
        },
        "REGION.POINTER_ENTER": {
          actions: ["pauseToasts"]
        }
      }
    },
    overlap: {
      on: {
        "REGION.STACK": {
          target: "stack",
          actions: ["expandToasts"]
        },
        "REGION.POINTER_ENTER": {
          target: "stack",
          actions: ["pauseToasts", "expandToasts"]
        },
        "REGION.FOCUS": {
          target: "stack",
          actions: ["setLastFocusedEl", "pauseToasts", "expandToasts"]
        }
      }
    }
  },
  implementations: {
    guards: {
      isOverlapping: ({ computed: e }) => e("overlap")
    },
    effects: {
      subscribeToStore({ context: e, prop: t }) {
        return t("store").subscribe((n) => {
          if (n.dismiss) {
            e.set("toasts", (o) => o.filter((s) => s.id !== n.id));
            return;
          }
          e.set("toasts", (o) => {
            const s = o.findIndex((r) => r.id === n.id);
            return s !== -1 ? [...o.slice(0, s), { ...o[s], ...n }, ...o.slice(s + 1)] : [n, ...o];
          });
        });
      },
      trackHotKeyPress({ prop: e, send: t }) {
        return oe(document, "keydown", (o) => {
          const { hotkey: s } = e("store").attrs;
          s.every((i) => o[i] || o.code === i) && t({ type: "DOC.HOTKEY" });
        }, { capture: !0 });
      },
      trackDocumentVisibility({ prop: e, send: t, scope: n }) {
        const { pauseOnPageIdle: o } = e("store").attrs;
        if (!o) return;
        const s = n.getDoc();
        return oe(s, "visibilitychange", () => {
          const r = s.visibilityState === "hidden";
          t({ type: r ? "PAUSE_ALL" : "RESUME_ALL" });
        });
      }
    },
    actions: {
      setDismissableBranch({ refs: e, context: t, computed: n, scope: o }) {
        const s = t.get("toasts"), r = n("placement"), i = s.length > 0;
        if (!i) {
          e.get("dismissableCleanup")?.();
          return;
        }
        if (i && e.get("dismissableCleanup"))
          return;
        const l = Ud(() => ri(o, r), { defer: !0 });
        e.set("dismissableCleanup", l);
      },
      clearDismissableBranch({ refs: e }) {
        e.get("dismissableCleanup")?.();
      },
      focusRegionEl({ scope: e, computed: t }) {
        queueMicrotask(() => {
          ri(e, t("placement"))?.focus();
        });
      },
      pauseToasts({ prop: e }) {
        e("store").pause();
      },
      resumeToasts({ prop: e }) {
        e("store").resume();
      },
      expandToasts({ prop: e }) {
        e("store").expand();
      },
      collapseToasts({ prop: e }) {
        e("store").collapse();
      },
      removeToast({ prop: e, event: t }) {
        e("store").remove(t.id);
      },
      removeHeight({ event: e, context: t }) {
        e?.id != null && queueMicrotask(() => {
          t.set("heights", (n) => n.filter((o) => o.id !== e.id));
        });
      },
      collapsedIfEmpty({ send: e, computed: t }) {
        !t("overlap") || t("count") > 1 || e({ type: "REGION.OVERLAP" });
      },
      setLastFocusedEl({ refs: e, event: t }) {
        e.get("isFocusWithin") || !t.target || (e.set("isFocusWithin", !0), e.set("lastFocusedEl", t.target));
      },
      restoreLastFocusedEl({ refs: e }) {
        e.get("lastFocusedEl") && (e.get("lastFocusedEl")?.focus({ preventScroll: !0 }), e.set("lastFocusedEl", null), e.set("isFocusWithin", !1));
      },
      clearLastFocusedEl({ refs: e }) {
        e.get("lastFocusedEl") && (e.get("lastFocusedEl")?.focus({ preventScroll: !0 }), e.set("lastFocusedEl", null), e.set("isFocusWithin", !1));
      }
    }
  }
};
function Hv(e, t) {
  const { state: n, send: o, prop: s, scope: r, context: i, computed: a } = e, l = n.hasTag("visible"), c = n.hasTag("paused"), d = i.get("mounted"), f = a("frontmost"), p = s("parent").computed("placement"), g = s("type"), h = s("stacked"), b = s("title"), k = s("description"), $ = s("action"), [I, x = "center"] = p.split("-");
  return {
    type: g,
    title: b,
    description: k,
    placement: p,
    visible: l,
    paused: c,
    closable: !!s("closable"),
    pause() {
      o({ type: "PAUSE" });
    },
    resume() {
      o({ type: "RESUME" });
    },
    dismiss() {
      o({ type: "DISMISS", src: "programmatic" });
    },
    getRootProps() {
      return t.element({
        ...Lt.root.attrs,
        dir: s("dir"),
        id: sl(r),
        "data-state": l ? "open" : "closed",
        "data-type": g,
        "data-placement": p,
        "data-align": x,
        "data-side": I,
        "data-mounted": B(d),
        "data-paused": B(c),
        "data-first": B(f),
        "data-sibling": B(!f),
        "data-stack": B(h),
        "data-overlap": B(!h),
        role: "status",
        "aria-atomic": "true",
        "aria-describedby": k ? li(r) : void 0,
        "aria-labelledby": b ? ai(r) : void 0,
        tabIndex: 0,
        style: Dv(e, l),
        onKeyDown(m) {
          m.defaultPrevented || m.key == "Escape" && (o({ type: "DISMISS", src: "keyboard" }), m.preventDefault());
        }
      });
    },
    /* Leave a ghost div to avoid setting hover to false when transitioning out */
    getGhostBeforeProps() {
      return t.element({
        "data-ghost": "before",
        style: Bv(e, l)
      });
    },
    /* Needed to avoid setting hover to false when in between toasts */
    getGhostAfterProps() {
      return t.element({
        "data-ghost": "after",
        style: Mv()
      });
    },
    getTitleProps() {
      return t.element({
        ...Lt.title.attrs,
        id: ai(r)
      });
    },
    getDescriptionProps() {
      return t.element({
        ...Lt.description.attrs,
        id: li(r)
      });
    },
    getActionTriggerProps() {
      return t.button({
        ...Lt.actionTrigger.attrs,
        type: "button",
        onClick(m) {
          m.defaultPrevented || ($?.onClick?.(), o({ type: "DISMISS", src: "user" }));
        }
      });
    },
    getCloseTriggerProps() {
      return t.button({
        id: Av(r),
        ...Lt.closeTrigger.attrs,
        type: "button",
        "aria-label": "Dismiss notification",
        onClick(m) {
          m.defaultPrevented || o({ type: "DISMISS", src: "user" });
        }
      });
    }
  };
}
var { not: Uv } = nt(), zv = {
  props({ props: e }) {
    return ms(e, ["id", "type", "parent", "removeDelay"], "toast"), {
      closable: !0,
      ...e,
      duration: Wo(e.duration, e.type)
    };
  },
  initialState({ prop: e }) {
    return e("type") === "loading" || e("duration") === 1 / 0 ? "visible:persist" : "visible";
  },
  context({ prop: e, bindable: t }) {
    return {
      remainingTime: t(() => ({
        defaultValue: Wo(e("duration"), e("type"))
      })),
      createdAt: t(() => ({
        defaultValue: Date.now()
      })),
      mounted: t(() => ({
        defaultValue: !1
      })),
      initialHeight: t(() => ({
        defaultValue: 0
      }))
    };
  },
  refs() {
    return {
      closeTimerStartTime: Date.now(),
      lastCloseStartTimerStartTime: 0
    };
  },
  computed: {
    zIndex: ({ prop: e }) => {
      const t = e("parent").context.get("toasts"), n = t.findIndex((o) => o.id === e("id"));
      return t.length - n;
    },
    height: ({ prop: e }) => e("parent").context.get("heights").find((o) => o.id === e("id"))?.height ?? 0,
    heightIndex: ({ prop: e }) => e("parent").context.get("heights").findIndex((n) => n.id === e("id")),
    frontmost: ({ prop: e }) => e("index") === 0,
    heightBefore: ({ prop: e }) => {
      const t = e("parent").context.get("heights"), n = t.findIndex((o) => o.id === e("id"));
      return t.reduce((o, s, r) => r >= n ? o : o + s.height, 0);
    },
    shouldPersist: ({ prop: e }) => e("type") === "loading" || e("duration") === 1 / 0
  },
  watch({ track: e, prop: t, send: n }) {
    e([() => t("message")], () => {
      const o = t("message");
      o && n({ type: o, src: "programmatic" });
    }), e([() => t("type"), () => t("duration")], () => {
      n({ type: "UPDATE" });
    });
  },
  on: {
    UPDATE: [
      {
        guard: "shouldPersist",
        target: "visible:persist",
        actions: ["resetCloseTimer"]
      },
      {
        target: "visible:updating",
        actions: ["resetCloseTimer"]
      }
    ],
    MEASURE: {
      actions: ["measureHeight"]
    }
  },
  entry: ["setMounted", "measureHeight", "invokeOnVisible"],
  effects: ["trackHeight"],
  states: {
    "visible:updating": {
      tags: ["visible", "updating"],
      effects: ["waitForNextTick"],
      on: {
        SHOW: {
          target: "visible"
        }
      }
    },
    "visible:persist": {
      tags: ["visible", "paused"],
      on: {
        RESUME: {
          guard: Uv("isLoadingType"),
          target: "visible",
          actions: ["setCloseTimer"]
        },
        DISMISS: {
          target: "dismissing"
        }
      }
    },
    visible: {
      tags: ["visible"],
      effects: ["waitForDuration"],
      on: {
        DISMISS: {
          target: "dismissing"
        },
        PAUSE: {
          target: "visible:persist",
          actions: ["syncRemainingTime"]
        }
      }
    },
    dismissing: {
      entry: ["invokeOnDismiss"],
      effects: ["waitForRemoveDelay"],
      on: {
        REMOVE: {
          target: "unmounted",
          actions: ["notifyParentToRemove"]
        }
      }
    },
    unmounted: {
      entry: ["invokeOnUnmount"]
    }
  },
  implementations: {
    effects: {
      waitForRemoveDelay({ prop: e, send: t }) {
        return No(() => {
          t({ type: "REMOVE", src: "timer" });
        }, e("removeDelay"));
      },
      waitForDuration({ send: e, context: t, computed: n }) {
        if (!n("shouldPersist"))
          return No(() => {
            e({ type: "DISMISS", src: "timer" });
          }, t.get("remainingTime"));
      },
      waitForNextTick({ send: e }) {
        return No(() => {
          e({ type: "SHOW", src: "timer" });
        }, 0);
      },
      trackHeight({ scope: e, prop: t }) {
        let n;
        return U(() => {
          const o = ii(e);
          if (!o) return;
          const s = () => {
            const a = o.style.height;
            o.style.height = "auto";
            const l = o.getBoundingClientRect().height;
            o.style.height = a;
            const c = { id: t("id"), height: l };
            ui(t("parent"), c);
          }, r = e.getWin(), i = new r.MutationObserver(s);
          i.observe(o, {
            childList: !0,
            subtree: !0,
            characterData: !0
          }), n = () => i.disconnect();
        }), () => n?.();
      }
    },
    guards: {
      isLoadingType: ({ prop: e }) => e("type") === "loading",
      shouldPersist: ({ computed: e }) => e("shouldPersist")
    },
    actions: {
      setMounted({ context: e }) {
        U(() => {
          e.set("mounted", !0);
        });
      },
      measureHeight({ scope: e, prop: t, context: n }) {
        queueMicrotask(() => {
          const o = ii(e);
          if (!o) return;
          const s = o.style.height;
          o.style.height = "auto";
          const r = o.getBoundingClientRect().height;
          o.style.height = s, n.set("initialHeight", r);
          const i = { id: t("id"), height: r };
          ui(t("parent"), i);
        });
      },
      setCloseTimer({ refs: e }) {
        e.set("closeTimerStartTime", Date.now());
      },
      resetCloseTimer({ context: e, refs: t, prop: n }) {
        t.set("closeTimerStartTime", Date.now()), e.set("remainingTime", Wo(n("duration"), n("type")));
      },
      syncRemainingTime({ context: e, refs: t }) {
        e.set("remainingTime", (n) => {
          const o = t.get("closeTimerStartTime"), s = Date.now() - o;
          return t.set("lastCloseStartTimerStartTime", Date.now()), n - s;
        });
      },
      notifyParentToRemove({ prop: e }) {
        e("parent").send({ type: "TOAST.REMOVE", id: e("id") });
      },
      invokeOnDismiss({ prop: e, event: t }) {
        e("onStatusChange")?.({ status: "dismissing", src: t.src });
      },
      invokeOnUnmount({ prop: e }) {
        e("onStatusChange")?.({ status: "unmounted" });
      },
      invokeOnVisible({ prop: e }) {
        e("onStatusChange")?.({ status: "visible" });
      }
    }
  }
};
function ui(e, t) {
  const { id: n, height: o } = t;
  e.context.set("heights", (s) => s.find((i) => i.id === n) ? s.map((i) => i.id === n ? { ...i, height: o } : i) : [{ id: n, height: o }, ...s]);
}
var Wv = (e, t) => ({ ...t, ...yo(e) });
function Kv(e) {
  const t = Wv(e, {
    placement: "bottom",
    overlap: !1,
    max: 24,
    gap: 16,
    offsets: "1rem",
    hotkey: ["altKey", "KeyT"],
    removeDelay: 200,
    pauseOnPageIdle: !0
  });
  let n = [], o = [], s = /* @__PURE__ */ new Set();
  const r = (O) => (n.push(O), () => {
    const P = n.indexOf(O);
    n.splice(P, 1);
  }), i = (O) => (n.forEach((P) => P(O)), O), a = (O) => {
    o.length >= t.max || (i(O), o.unshift(O));
  }, l = (O) => {
    const P = O.id ?? `toast:${bi()}`, G = o.find((K) => K.id === P);
    return s.has(P) && s.delete(P), G ? o = o.map((K) => K.id === P ? i({ ...K, ...O, id: P }) : K) : a({
      id: P,
      duration: t.duration,
      removeDelay: t.removeDelay,
      type: "info",
      ...O,
      stacked: !t.overlap,
      gap: t.gap
    }), P;
  }, c = (O) => (s.add(O), O ? (n.forEach((P) => P({ id: O, dismiss: !0 })), o = o.filter((P) => P.id !== O)) : (o.forEach((P) => {
    n.forEach((G) => G({ id: P.id, dismiss: !0 }));
  }), o = []), O);
  return {
    attrs: t,
    subscribe: r,
    create: l,
    update: (O, P) => l({ id: O, ...P }),
    remove: c,
    dismiss: (O) => {
      O != null ? o = o.map((P) => P.id === O ? i({ ...P, message: "DISMISS" }) : P) : o = o.map((P) => i({ ...P, message: "DISMISS" }));
    },
    error: (O) => l({ ...O, type: "error" }),
    success: (O) => l({ ...O, type: "success" }),
    info: (O) => l({ ...O, type: "info" }),
    warning: (O) => l({ ...O, type: "warning" }),
    loading: (O) => l({ ...O, type: "loading" }),
    getVisibleToasts: () => o.filter((O) => !s.has(O.id)),
    getCount: () => o.length,
    promise: (O, P, G = {}) => {
      if (!P) return;
      let K;
      P.loading !== void 0 && (K = l({
        ...G,
        ...P.loading,
        promise: O,
        type: "loading"
      }));
      let te = K !== void 0, Re;
      const De = un(O).then(async (se) => {
        if (Re = ["resolve", se], jv(se) && !se.ok) {
          te = !1;
          const de = un(P.error, `HTTP Error! status: ${se.status}`);
          l({ ...G, ...de, id: K, type: "error" });
        } else if (P.success !== void 0) {
          te = !1;
          const de = un(P.success, se);
          l({ ...G, ...de, id: K, type: "success" });
        }
      }).catch(async (se) => {
        if (Re = ["reject", se], P.error !== void 0) {
          te = !1;
          const de = un(P.error, se);
          l({ ...G, ...de, id: K, type: "error" });
        }
      }).finally(() => {
        te && (c(K), K = void 0), P.finally?.();
      });
      return { id: K, unwrap: () => new Promise(
        (se, de) => De.then(() => Re[0] === "reject" ? de(Re[1]) : se(Re[1])).catch(de)
      ) };
    },
    pause: (O) => {
      O != null ? o = o.map((P) => P.id === O ? i({ ...P, message: "PAUSE" }) : P) : o = o.map((P) => i({ ...P, message: "PAUSE" }));
    },
    resume: (O) => {
      O != null ? o = o.map((P) => P.id === O ? i({ ...P, message: "RESUME" }) : P) : o = o.map((P) => i({ ...P, message: "RESUME" }));
    },
    isVisible: (O) => !s.has(O) && !!o.find((P) => P.id === O),
    isDismissed: (O) => s.has(O),
    expand: () => {
      o = o.map((O) => i({ ...O, stacked: !0 }));
    },
    collapse: () => {
      o = o.map((O) => i({ ...O, stacked: !1 }));
    }
  };
}
var jv = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", di = {
  connect: Fv,
  machine: Gv
};
const qv = (e) => Kv(e), [Xv, Zt] = X("ToastContext"), Yv = /* @__PURE__ */ _({
  __name: "toast-action-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getActionTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Zv = /* @__PURE__ */ _({
  __name: "toast-close-trigger",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return R(), (n, o) => (v(), T(u(A).button, V(u(t).getCloseTriggerProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), Qv = /* @__PURE__ */ _({
  __name: "toast-context",
  setup(e) {
    const t = Zt();
    return (n, o) => E(n.$slots, "default", pe(ge(u(t))));
  }
}), Jv = /* @__PURE__ */ _({
  __name: "toast-description",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getDescriptionProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), ey = /* @__PURE__ */ _({
  __name: "toast-root",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getRootProps(), { "as-child": n.asChild }), {
      default: C(() => [
        H("div", pe(ge(u(t).getGhostBeforeProps())), null, 16),
        E(n.$slots, "default"),
        H("div", pe(ge(u(t).getGhostAfterProps())), null, 16)
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
}), ty = /* @__PURE__ */ _({
  __name: "toast-title",
  props: {
    asChild: { type: Boolean }
  },
  setup(e) {
    const t = Zt();
    return R(), (n, o) => (v(), T(u(A).div, V(u(t).getTitleProps(), { "as-child": n.asChild }), {
      default: C(() => [
        E(n.$slots, "default")
      ]),
      _: 3
    }, 16, ["as-child"]));
  }
});
function ny(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !yl(e);
}
const oy = /* @__PURE__ */ _((e, {
  attrs: t,
  slots: n
}) => {
  const o = Ue(), s = He(), r = Se(di.machine, {
    store: e.toaster,
    id: Ce(),
    dir: o?.value.dir,
    getRootNode: s?.value.getRootNode
  }), i = L(() => di.connect(r, Ne));
  return () => {
    let a;
    return F(A.div, V(i.value.getGroupProps(), t), ny(a = i.value.getToasts().map((l, c) => F(sy, {
      value: l,
      key: l.id,
      parent: r,
      index: c
    }, {
      default: (d) => n.default?.(d)
    }))) ? a : {
      default: () => [a]
    });
  };
}, {
  name: "Toaster",
  props: {
    toaster: {
      type: Object,
      required: !0
    }
  },
  slots: Object
}), sy = /* @__PURE__ */ _((e, {
  slots: t
}) => {
  const n = L(() => ({
    ...e.value,
    index: e.index,
    parent: e.parent
  })), o = Se(zv, n.value), s = L(() => Hv(o, Ne));
  return Xv(s), () => t.default?.(e.value);
}, {
  name: "ToastItem",
  props: {
    value: {
      type: Object,
      required: !0
    },
    index: {
      type: Number,
      required: !0
    },
    parent: {
      type: Object,
      required: !0
    }
  }
}), an = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ActionTrigger: Yv,
  CloseTrigger: Zv,
  Context: Qv,
  Description: Jv,
  Root: ey,
  Title: ty
}, Symbol.toStringTag, { value: "Module" })), ln = {
  info: "Information",
  success: "Success",
  error: "Error",
  warning: "Warning",
  loading: "Loading"
}, mo = qv({
  placement: "bottom",
  gap: 12
  // duration: 300000,
}), cn = (e, t, n) => mo.create({
  title: t,
  description: n,
  type: e
}), Jy = {
  create: (e) => mo.create(e),
  info: (e, t) => cn("info", t ?? ln.info, e),
  success: (e, t) => cn("success", t ?? ln.success, e),
  error: (e, t) => cn("error", t ?? ln.error, e),
  warning: (e, t) => cn("warning", t ?? ln.warning, e),
  loading: (e, t) => cn("loading", t ?? ln.loading, e),
  dismiss: (e) => mo.dismiss(e)
}, ry = { class: "content-wrapper" }, iy = { class: "content" }, ay = /* @__PURE__ */ _({
  __name: "BaseToaster",
  setup(e) {
    return (t, n) => (v(), T(u(oy), { toaster: u(mo) }, {
      default: C((o) => [
        (v(), T(u(an).Root, {
          key: o.id,
          class: "toast",
          type: o.type,
          "data-testid": `${o.type}-toast`
        }, {
          default: C(() => [
            H("div", ry, [
              F(u(Gt), {
                name: o.type,
                class: "icon",
                size: "20"
              }, null, 8, ["name"]),
              H("div", iy, [
                o.title ? (v(), T(u(an).Title, {
                  key: 0,
                  class: "title"
                }, {
                  default: C(() => [
                    ee(W(o.title), 1)
                  ]),
                  _: 2
                }, 1024)) : Z("", !0),
                o.description ? (v(), T(u(an).Description, {
                  key: 1,
                  class: "description"
                }, {
                  default: C(() => [
                    ee(W(o.description), 1)
                  ]),
                  _: 2
                }, 1024)) : Z("", !0)
              ])
            ]),
            o.action ? (v(), T(u(an).ActionTrigger, {
              key: 0,
              class: "action"
            }, {
              default: C(() => [
                ee(W(o.action.label), 1)
              ]),
              _: 2
            }, 1024)) : Z("", !0),
            F(u(an).CloseTrigger, { class: "close" }, {
              default: C(() => n[0] || (n[0] = [
                ee("✕")
              ])),
              _: 1
            })
          ]),
          _: 2
        }, 1032, ["type", "data-testid"]))
      ]),
      _: 1
    }, 8, ["toaster"]));
  }
}), eb = /* @__PURE__ */ Q(ay, [["__scopeId", "data-v-f3946a4b"]]), j = bl({
  alert: {
    message: "",
    isOpen: !1,
    resolve: null
  },
  confirm: {
    message: "",
    isOpen: !1,
    resolve: null
  },
  prompt: {
    message: "",
    defaultValue: "",
    isOpen: !1,
    resolve: null
  }
});
function ly(e) {
  return new Promise((t) => {
    j.alert.message = e, j.alert.resolve = t, j.alert.isOpen = !0;
  });
}
function cy(e) {
  return new Promise((t) => {
    j.confirm.message = e, j.confirm.resolve = t, j.confirm.isOpen = !0;
  });
}
function uy(e, t = "") {
  return new Promise((n) => {
    j.prompt.message = e, j.prompt.defaultValue = t, j.prompt.resolve = n, j.prompt.isOpen = !0;
  });
}
function tb() {
  return {
    alert: ly,
    confirm: cy,
    prompt: uy
  };
}
const dy = { class: "carousel-container" }, py = {
  key: 0,
  class: "carousel-controls"
}, gy = /* @__PURE__ */ _({
  __name: "BaseCarousel",
  props: {
    slideCount: {
      type: Number,
      required: !0
    },
    autoplay: {
      type: Boolean,
      default: !1
    },
    loop: {
      type: Boolean,
      default: !1
    },
    slideDuration: {
      type: Number,
      default: 3e3
    },
    showControls: {
      type: Boolean,
      default: !0
    },
    slidesPerMove: {
      type: Number,
      default: 1
    },
    slidesPerPage: {
      type: Number,
      default: 1
    }
  },
  setup(e) {
    const t = e, n = J(0);
    return (o, s) => (v(), M("div", dy, [
      F(u(st).Root, {
        page: n.value,
        "onUpdate:page": s[0] || (s[0] = (r) => n.value = r),
        "slide-count": t.slideCount,
        autoplay: t.autoplay,
        loop: t.loop,
        "slide-duration": t.slideDuration,
        "slides-per-move": t.slidesPerMove,
        "slides-per-page": t.slidesPerPage
      }, {
        default: C(() => [
          F(u(st).ItemGroup, null, {
            default: C(() => [
              E(o.$slots, "items", {}, void 0, !0)
            ]),
            _: 3
          }),
          t.showControls ? (v(), M("div", py, [
            F(u(st).Control, null, {
              default: C(() => [
                F(u(st).PrevTrigger, { class: "carousel-nav-button prev" }, {
                  default: C(() => [
                    E(o.$slots, "prev-trigger", {}, () => [
                      F(u(Gt), {
                        name: "chevron-left",
                        size: "24"
                      })
                    ], !0)
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }),
            F(u(st).Control, null, {
              default: C(() => [
                F(u(st).NextTrigger, { class: "carousel-nav-button next" }, {
                  default: C(() => [
                    E(o.$slots, "next-trigger", {}, () => [
                      F(u(Gt), {
                        name: "chevron-right",
                        size: "24"
                      })
                    ], !0)
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })
          ])) : Z("", !0),
          F(u(st).IndicatorGroup, { class: "carousel-indicators" }, {
            default: C(() => [
              (v(!0), M(re, null, xe(t.slideCount, (r) => (v(), T(u(st).Indicator, {
                key: r - 1,
                index: r - 1,
                class: "carousel-indicator"
              }, null, 8, ["index"]))), 128))
            ]),
            _: 1
          })
        ]),
        _: 3
      }, 8, ["page", "slide-count", "autoplay", "loop", "slide-duration", "slides-per-move", "slides-per-page"])
    ]));
  }
}), nb = /* @__PURE__ */ Q(gy, [["__scopeId", "data-v-97cbfbc4"]]), fy = {
  class: "alert-dialog",
  "data-testid": "alert-dialog"
}, hy = { class: "alert-content" }, my = { class: "alert-actions" }, vy = /* @__PURE__ */ _({
  __name: "BaseAlertDialog",
  props: {
    okText: {
      type: String,
      default: "OK"
    }
  },
  setup(e, { expose: t }) {
    const n = J(null), o = J(""), s = J(null);
    function r(a) {
      return o.value = a, n.value?.show(), new Promise((l) => {
        s.value = l;
      });
    }
    function i() {
      s.value?.(), n.value?.close();
    }
    return t({ show: r }), (a, l) => (v(), T(ds, {
      ref_key: "dialog",
      ref: n
    }, {
      default: C(() => [
        H("div", fy, [
          H("div", hy, [
            H("p", null, W(o.value), 1),
            H("div", my, [
              H("button", {
                class: "btn btn-primary",
                "data-testid": "alert-dialog-ok",
                onClick: i
              }, W(e.okText), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }, 512));
  }
}), yy = /* @__PURE__ */ Q(vy, [["__scopeId", "data-v-bfb4c911"]]), by = {
  class: "confirm-dialog",
  "data-testid": "confirm-dialog"
}, Cy = { class: "confirm-content" }, _y = { class: "confirm-actions" }, Ey = /* @__PURE__ */ _({
  __name: "BaseConfirmDialog",
  props: {
    cancelText: {
      type: String,
      default: "Cancel"
    },
    confirmText: {
      type: String,
      default: "Confirm"
    }
  },
  setup(e, { expose: t }) {
    const n = J(null), o = J(""), s = J(null);
    function r(a) {
      return o.value = a, n.value?.show(), new Promise((l) => {
        s.value = l;
      });
    }
    function i(a) {
      s.value?.(a), n.value?.close();
    }
    return t({ show: r }), (a, l) => (v(), T(ds, {
      ref_key: "dialog",
      ref: n
    }, {
      default: C(() => [
        H("div", by, [
          H("div", Cy, [
            H("p", null, W(o.value), 1),
            H("div", _y, [
              H("button", {
                class: "btn btn-secondary",
                "data-testid": "confirm-dialog-cancel",
                onClick: l[0] || (l[0] = (c) => i(!1))
              }, W(e.cancelText), 1),
              H("button", {
                class: "btn btn-primary",
                "data-testid": "confirm-dialog-confirm",
                onClick: l[1] || (l[1] = (c) => i(!0))
              }, W(e.confirmText), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }, 512));
  }
}), Ty = /* @__PURE__ */ Q(Ey, [["__scopeId", "data-v-2b56265f"]]), Iy = {
  class: "prompt-dialog",
  "data-testid": "prompt-dialog"
}, ky = { class: "prompt-content" }, Oy = ["placeholder"], xy = { class: "prompt-actions" }, Py = /* @__PURE__ */ _({
  __name: "BasePromptDialog",
  props: {
    cancelText: {
      type: String,
      default: "Cancel"
    },
    okText: {
      type: String,
      default: "OK"
    }
  },
  setup(e, { expose: t }) {
    const n = J(null), o = J(""), s = J(""), r = J(""), i = J(null);
    function a(d, f = "") {
      return o.value = d, r.value = f, s.value = f, n.value?.show(), new Promise((p) => {
        i.value = p;
      });
    }
    function l() {
      i.value?.(s.value), n.value?.close();
    }
    function c() {
      i.value?.(null), n.value?.close();
    }
    return t({ show: a }), (d, f) => (v(), T(ds, {
      ref_key: "dialog",
      ref: n
    }, {
      default: C(() => [
        H("div", Iy, [
          H("div", ky, [
            H("p", null, W(o.value), 1),
            Ft(H("input", {
              "onUpdate:modelValue": f[0] || (f[0] = (p) => s.value = p),
              type: "text",
              class: "prompt-input",
              placeholder: r.value,
              onKeyup: Cl(l, ["enter"])
            }, null, 40, Oy), [
              [Ko, s.value]
            ]),
            H("div", xy, [
              H("button", {
                class: "btn btn-secondary",
                "data-testid": "prompt-dialog-cancel",
                onClick: c
              }, W(e.cancelText), 1),
              H("button", {
                class: "btn btn-primary",
                "data-testid": "prompt-dialog-confirm",
                onClick: l
              }, W(e.okText), 1)
            ])
          ])
        ])
      ]),
      _: 1
    }, 512));
  }
}), wy = /* @__PURE__ */ Q(Py, [["__scopeId", "data-v-fb5c01c5"]]), Sy = /* @__PURE__ */ _({
  __name: "DialogsManager",
  props: {
    // Тексты для кнопок в диалогах
    okText: {
      type: String,
      default: "OK"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    },
    confirmText: {
      type: String,
      default: "Confirm"
    }
  },
  setup(e) {
    const t = J(null), n = J(null), o = J(null);
    return ct(
      () => j.alert.isOpen,
      async (s) => {
        if (s && t.value)
          try {
            await t.value.show(j.alert.message), j.alert.resolve && (j.alert.resolve(), j.alert.resolve = null);
          } finally {
            j.alert.isOpen = !1;
          }
      }
    ), ct(
      () => j.confirm.isOpen,
      async (s) => {
        if (s && n.value)
          try {
            const r = await n.value.show(
              j.confirm.message
            );
            j.confirm.resolve && (j.confirm.resolve(r), j.confirm.resolve = null);
          } finally {
            j.confirm.isOpen = !1;
          }
      }
    ), ct(
      () => j.prompt.isOpen,
      async (s) => {
        if (s && o.value)
          try {
            const r = await o.value.show(
              j.prompt.message,
              j.prompt.defaultValue
            );
            j.prompt.resolve && (j.prompt.resolve(r), j.prompt.resolve = null);
          } finally {
            j.prompt.isOpen = !1;
          }
      }
    ), (s, r) => (v(), M(re, null, [
      F(yy, {
        ref_key: "alertDialog",
        ref: t,
        "ok-text": e.okText
      }, null, 8, ["ok-text"]),
      F(Ty, {
        ref_key: "confirmDialog",
        ref: n,
        "cancel-text": e.cancelText,
        "confirm-text": e.confirmText
      }, null, 8, ["cancel-text", "confirm-text"]),
      F(wy, {
        ref_key: "promptDialog",
        ref: o,
        "ok-text": e.okText,
        "cancel-text": e.cancelText
      }, null, 8, ["ok-text", "cancel-text"])
    ], 64));
  }
}), ob = /* @__PURE__ */ Q(Sy, [["__scopeId", "data-v-fe910c18"]]);
function sb(e) {
  return getComputedStyle(document.documentElement, null).getPropertyValue(
    e
  );
}
function rb(e, t) {
  return document.documentElement.style.setProperty(e, t);
}
function ib(e) {
  return +e.replace("px", "");
}
export {
  Ol as BaseButton,
  nb as BaseCarousel,
  Ky as BaseCheckbox,
  Hy as BaseCollapsableHint,
  Xy as BaseCombobox,
  ds as BaseDialog,
  Qy as BaseEditableTable,
  Zy as BaseEditableText,
  Ny as BaseHoverCard,
  Gt as BaseIcon,
  Uy as BaseInput,
  Dy as BaseMenu,
  jy as BaseRadioGroup,
  Gy as BaseSegmentGroup,
  zy as BaseSelect,
  Tl as BaseSpinner,
  qy as BaseSwitch,
  By as BaseTable,
  My as BaseTabs,
  eb as BaseToaster,
  Fy as BaseToggleGroup,
  ob as DialogsManager,
  Yy as FormField,
  sb as getCssVar,
  Vy as loadIcons,
  rb as setCssVar,
  ib as toNumber,
  Jy as toast,
  mo as toaster,
  tb as useDialogs
};
