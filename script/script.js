// ===============================
// Init AOS
// ===============================

AOS.init({
    duration: 900,
    easing: "ease-in-out",
    once: true,
    offset: 100,
    delay: 10
});
// ===============================
// Mobile Menu Toggle
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuBtn.classList.toggle("open");
    const expanded = menuBtn.classList.contains("open");
    menuBtn.setAttribute("aria-expanded", expanded);
});

// ===============================
// Close Menu After Clicking a Link
// ===============================

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

// ===============================
// Sticky Navbar
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 50);
});

// ===============================
// Active Nav Link on Scroll
// ===============================

const sections = document.querySelectorAll("section[id]");

function setActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (navLink) {
            if (scrollPos >= top && scrollPos < top + height) {
                links.forEach(l => l.classList.remove("active"));
                navLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", setActiveLink);

// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length < 2) return;

        const target = document.querySelector(targetId);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// ===============================
// Header Typing Animation
// ===============================

const titleEl = document.getElementById("title");
const text = "Innovation Hub Association";
let i = 0;

function typeText() {
    if (i < text.length) {
        titleEl.insertAdjacentText("beforeend", text[i]);
        i++;
        setTimeout(typeText, 90);
    }
}

// Start typing after the cursor span is in place
window.addEventListener("DOMContentLoaded", () => {
    // Move cursor to the end and start typing before it
    const cursor = titleEl.querySelector(".cursor");
    titleEl.textContent = ""; // clear
    if (cursor) titleEl.appendChild(cursor);
    typeText();
});

// // ===============================
// // Smooth Section Reveal on Scroll
// // ===============================

// const allSections = document.querySelectorAll("section");

// if ("IntersectionObserver" in window) {
//     const revealObserver = new IntersectionObserver((entries, observer) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add("in-view");
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, { threshold: 0.1, rootMargin: "0px 0px -80px 0px" });

//     allSections.forEach(section => revealObserver.observe(section));
// } else {
//     // Fallback: just show everything if the browser can't observe
//     allSections.forEach(section => section.classList.add("in-view"));
// }

// ===============================
// Animated Stat Counters
// ===============================

const statNumbers = document.querySelectorAll(".stat-box h2[data-count]");

function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        el.textContent = value + (progress >= 1 && target >= 10 ? "+" : "");
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target + "+";
        }
    }

    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// ===============================
// Back to Top Button
// ===============================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});