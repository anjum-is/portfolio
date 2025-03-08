// nav bar and img lazy load script
function loadNavbar() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'nav.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('navbar-placeholder').innerHTML = xhr.responseText;
            
            // Now attach event listeners for smooth scrolling
            setupNavigation();
        }
    };
    xhr.send();
}

function setupNavigation() {
    document.querySelectorAll("#navbar-placeholder .nav-link").forEach(link => {
        link.addEventListener("click", function (e) {
            if (this.hash) {
                e.preventDefault();
                const targetSection = document.querySelector(this.hash);
                
                if (targetSection) {
                    // If already on the homepage, scroll smoothly
                    targetSection.scrollIntoView({ behavior: "smooth" });
                } else {
                    // If on another page, redirect to homepage with hash
                    window.location.href = "index.html" + this.hash;
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadNavbar();

    // Handle direct page loads with hash (e.g., user lands on index.html#about)
    if (window.location.hash) {
        setTimeout(() => {
            const section = document.querySelector(window.location.hash);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }, 500); // Give time for navbar to load
    }

    // ✅ Lazy load all images
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("loading", "lazy");
    });
});
