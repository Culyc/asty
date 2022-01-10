(() => {
  "use strict";
  let e = !0,
    t = (t = 500) => {
      let o = document.querySelector("body");
      if (e) {
        let r = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < r.length; e++) {
            r[e].style.paddingRight = "0px";
          }
          (o.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, t),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    },
    o = (t = 500) => {
      let o = document.querySelector("body");
      if (e) {
        let r = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < r.length; e++) {
          r[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (o.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (e = !1),
          setTimeout(function () {
            e = !0;
          }, t);
      }
    };
  function r(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  let n = (e, o = !1, n = 500, l = 0) => {
    const a = document.querySelector(e);
    if (a) {
      let s = "",
        c = 0;
      o &&
        ((s = "header.header"), (c = document.querySelector(s).offsetHeight));
      let i = {
        speedAsDuration: !0,
        speed: n,
        header: s,
        offset: l,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (t(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(a, "", i);
      else {
        let e = a.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: c ? e - c : e, behavior: "smooth" });
      }
      r(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else r(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  const l = { inputMaskModule: null, selectModule: null };
  let a = {
    getErrors(e) {
      let t = 0,
        o = e.querySelectorAll("*[data-required]");
      return (
        o.length &&
          o.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const o = t[e];
            o.parentElement.classList.remove("_form-focus"),
              o.classList.remove("_form-focus"),
              a.removeError(o),
              (o.value = o.dataset.placeholder);
          }
          let o = e.querySelectorAll(".checkbox__input");
          if (o.length > 0)
            for (let e = 0; e < o.length; e++) {
              o[e].checked = !1;
            }
          if (l.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const o = t[e].querySelector("select");
                l.selectModule.selectBuild(o);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  let s = !1;
  setTimeout(() => {
    if (s) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let r = document.querySelector(".icon-menu");
      r &&
        r.addEventListener("click", function (r) {
          e &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? t(e) : o(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            o(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              a.formClean(t);
            });
      async function o(t, o) {
        if (0 === (e ? a.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            o.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              r = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              n = new FormData(t);
            t.classList.add("_sending");
            const a = await fetch(e, { method: r, body: n });
            if (a.ok) {
              await a.json();
              t.classList.remove("_sending"), l(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (o.preventDefault(), l(t));
        } else {
          o.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && n(e, !0, 1e3);
        }
      }
      function l(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          a.formClean(e),
          r(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const o = t.closest("[data-goto]"),
              r = o.dataset.goto ? o.dataset.goto : "",
              l = !!o.hasAttribute("data-goto-header"),
              a = o.dataset.gotoSpeed ? o.dataset.gotoSpeed : "500";
            n(r, l, a), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            o = t.target;
          if ("navigator" === o.dataset.watch) {
            const e = o.id,
              r =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? r && r.classList.add("_navigator-active")
              : r && r.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })();
})();
