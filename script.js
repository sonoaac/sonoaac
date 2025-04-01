document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("nav ul li a, .hero-buttons a").forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
