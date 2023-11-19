(function () {
    const e = "Home - Service Finder",
        t = "https://d2mr1k8kix77a1.cloudfront.net/",
        o = "service-finder-tool";
    let n;
    (window.openServiceFinderTool = (i) => {
        i && ((n = i.target), i.preventDefault());
        const l = document.getElementById(o);
        if (l instanceof Element) return void l.focus();
        const d = document.createElement("div");
        (d.id = o), (d.tabIndex = "-1"), (d.style.position = "fixed"), (d.style.top = 0), (d.style.left = 0), (d.style.right = 0), (d.style.bottom = 0), (d.style.zIndex = 9999);
        const r = document.createElement("div");
        (r.style.background = "rgba(0, 0, 0, 0.6)"), (r.style.position = "absolute"), (r.style.top = 0), (r.style.left = 0), (r.style.right = 0), (r.style.bottom = 0);
        const s = document.createElement("iframe");
        s.setAttribute("src", t),
            s.setAttribute("title", e),
            (s.style.border = "none"),
            (s.style.width = "90%"),
            (s.style.height = "90%"),
            (s.style.position = "absolute"),
            (s.style.top = "5%"),
            (s.style.left = "5%"),
            r.addEventListener("click", window.closeServiceFinderTool),
            d.addEventListener("keydown", (e) => {
                "Escape" === e.key && window.closeServiceFinderTool();
            }),
            d.appendChild(r),
            r.appendChild(s),
            document.querySelector("body").appendChild(d),
            (document.querySelector("body").style.overflow = "hidden"),
            d.focus();
    }),
        (window.closeServiceFinderTool = () => {
            document.querySelector("body").style.overflow = "";
            const e = document.getElementById(o);
            e instanceof Element && (e.remove(), n instanceof Element && n.focus());
        }),
        (window.initServiceFinderTool = (e = ".js-service-finder-tool-trigger") => {
            const t = document.querySelectorAll(e);
            t.length &&
            t.forEach((e) => {
                e.addEventListener("click", window.openServiceFinderTool);
            });
        }),
        document.addEventListener("DOMContentLoaded", () => {
            window.initServiceFinderTool();
        }),
        window.addEventListener("message", (e) => {
            "closeServiceFinderTool" === e.data && window.closeServiceFinderTool();
        });
})();
