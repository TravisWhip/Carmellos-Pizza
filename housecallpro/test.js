!function () {
    let n = "";

    function e() {
        return new URL(document.currentScript?.src || n || "")
    }

    function t() {
        const {token: n, orgName: t} = function () {
            const n = document.querySelectorAll(".hcp-button[data-orgname][data-token]")[0], t = e(), o = t.searchParams.get("token"),
                a = t.searchParams.get("orgName");
            return n || o ? {token: n && n.getAttribute("data-token") || o, orgName: n && n.getAttribute("data-orgname") || a} : {token: null, orgName: null}
        }();
        if (n) return `https://book.housecallpro.com/book/${t}/${n}?v2=true`
    }

    function o() {
        if (n || (n = document.currentScript?.src), document.getElementsByClassName("hcp-widget").length > 0) return void console.warn("HCP widget is already initialized.");
        const o = t(), a = "true" === e()?.searchParams?.get("disableLazy");
        if (!o) return;
        const i = document.createElement("iframe");
        i.src = o, i.className = "hcp-iframe", i.width = "100%", a || (i.loading = "lazy"), i.height = "100%";
        const r = document.createElement("div");
        r.className = "hcp-widget", function (n) {
            const e = document.createElement("style");
            e.textContent = `
      .hcp-no-scroll {
        overflow: hidden !important;
      }

      iframe.hcp-iframe {
        display: block;
        visibility: visible;
        opacity: 1;
        border: none;
        background: transparent;
      }

      div.hcp-widget {
        display: none;
        position: fixed;
        z-index: 2147483647;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        justify-content: center;
        align-items: center;
      }

      div.hcp-widget.hcp-widget--visible {
        display: flex;
      }

      button.hcp-button {
        font-weight: 600;
        line-height: 1.14;
        padding: 12px 24px;
        box-shadow: none;
        border-radius: 100px;
        color: #fff;
        background-color: #0f77cc;
        text-transform: uppercase;
        position: relative;
        border: 0;
        cursor: pointer;
        margin: 0;
        display: inline-flex;
        outline: 0;
        text-decoration: none;
        user-select: none;
        -webkit-appearance: none;
        -webkit-tap-highlight-color: transparent;
        text-indent: 0px;
        text-shadow: none;
        font-weight: normal;
        align-items: center;
        transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        overflow: auto;
      }
      button.hcp-button:hover {
        background-color: #1565c0;
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
      }
      button.hcp-button:active {
        box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);        background-color: rgba(15, 119, 204, 0.7)
      }
    `, document.head.append(e)
        }(), r.appendChild(i), document.body.appendChild(r);
        var c = null;

        function d() {
            c && (i?.contentWindow ? i?.contentWindow?.postMessage(c, "*") : setTimeout((() => {
                i?.contentWindow?.postMessage(c, "*")
            }), 1e3))
        }

        function s(n) {
            "hcp:close" === n.data && (r.classList.remove("hcp-widget--visible"), document.body.classList.remove("hcp-no-scroll"), window.removeEventListener("message", s)), "hcp:iframe-loaded" === n.data && r.classList.contains("hcp-widget--visible") && d(), n.data.type && "hcp:redirect" === n.data.type && "string" == typeof n.data.url && (window.location.href = n.data.url)
        }

        function p() {
            r.classList.add("hcp-widget--visible"), document.body.classList.add("hcp-no-scroll"), window.addEventListener("message", s)
        }

        window.HCPWidget = {
            openModal: function () {
                p(), c = "hcp:open", d()
            }, openModalWithParams: function (n) {
                p(), c = {type: "hcp:open", params: n}, d()
            }
        }
    }

    function a() {
        const n = t();
        document.querySelector(`iframe[src="${n}"]`) || o()
    }

    o(), null !== new URLSearchParams(window.location.search).get("booking") && HCPWidget.openModal(), window.addEventListener("load", (() => {
        a(), setTimeout(a, 2e3)
    }))
}(), window.addEventListener("load", (function n() {
    const e = document.getElementById("hcp-lead-iframe");
    e ? window.addEventListener("message", (function (n) {
        "hcp:lead-capture-size" === n.data.type ? e.style.height = n.data.value : n.data.type && "hcp:redirect" === n.data.type && "string" == typeof n.data.url && (window.location.href = n.data.url)
    })) : setTimeout(n, 100)
}));