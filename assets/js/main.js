document.addEventListener("DOMContentLoaded", function () {
    const target = document.getElementById("intro");
    const link = document.getElementById("expand-link");
    if (link && target) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            if (!target.classList.contains("expanded")) {
                target.classList.add("expanded");
            }
        });
    }

    document.querySelectorAll('.toggle-box h3').forEach(header => {
        header.addEventListener('click', () => {
            const toggleBox = header.closest('.toggle-box');
            const contentBox = toggleBox.querySelector('.content-box');

            if (!toggleBox.classList.contains('expanded')) {
                    toggleBox.classList.add('expanded');
                    contentBox.style.maxHeight = contentBox.scrollHeight + "px";
                } else {
                    contentBox.style.maxHeight = "0";
                    toggleBox.classList.remove('expanded');
                }
        });
    });

    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const closePopup = document.getElementById("close-popup");
    const videoContainer = document.getElementById("video-container");
    const videoLinks = document.querySelectorAll(".popup-link");

    function fadeIn(el) {
        el.style.opacity = 0;
        el.style.display = "flex";
        let last = +new Date();
        const tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 200;
            last = +new Date();
            if (+el.style.opacity < 1) requestAnimationFrame(tick);
        };
        tick();
    }

    function fadeOut(el, callback) {
        el.style.opacity = 1;
        const tick = function () {
            el.style.opacity = +el.style.opacity - 0.05;
            if (+el.style.opacity > 0) {
                requestAnimationFrame(tick);
            } else {
                el.style.display = 'none';
            if (callback) callback();
            }
        };
        tick();
    }

    videoLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const videoId = this.dataset.videoId;
            const type = this.dataset.type;
    
            const iframe = document.createElement("iframe");
            iframe.frameBorder = "0";
            iframe.allow = "encrypted-media";

            iframe.onload = () => {
                iframe.style.transition = "opacity 0.3s ease";
                iframe.style.opacity = "1";
            };

            iframe.style.opacity = "0";
    
            if (type === "youtube") {
                iframe.width = "560";
                iframe.height = "315";
                iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
                iframe.allowFullscreen = true;
                iframe.referrerPolicy = "no-referrer";
                videoContainer.style.height = "auto";

            } else if (type === "spotify") {
                iframe.width = "100%";
                iframe.height = "232";
                iframe.src = `https://open.spotify.com/embed/episode/${videoId}?theme=0`;
                iframe.allowTransparency = true;
                videoContainer.style.height = "232px";
            }
    
            videoContainer.innerHTML = "";
            videoContainer.appendChild(iframe);
            fadeIn(overlay);
        });
    });

    function closePopupHandler(e) {
        e.preventDefault();
        fadeOut(overlay);
        videoContainer.innerHTML = "";
    }

    closePopup.addEventListener("click", closePopupHandler);
    overlay.addEventListener("click", closePopupHandler);

    const yearSpan = document.getElementById("cyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});