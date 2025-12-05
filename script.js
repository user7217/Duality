document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // ---------- Mode load ----------
  const saved = localStorage.getItem("duality-mode");
  const initialMode = saved === "work" ? "work" : "personal";
  body.classList.remove("mode-personal","mode-work");
  body.classList.add(`mode-${initialMode}`);

  const modeBtn = document.getElementById("modeToggle");
  if (modeBtn) {
    modeBtn.textContent = initialMode === "personal" ? "Personal" : "Work";
    modeBtn.addEventListener("click", () => {
      const isPersonal = body.classList.contains("mode-personal");
      body.classList.toggle("mode-personal", !isPersonal);
      body.classList.toggle("mode-work", isPersonal);
      const newMode = isPersonal ? "work" : "personal";
      modeBtn.textContent = newMode === "personal" ? "Personal" : "Work";
      localStorage.setItem("duality-mode", newMode);
    });
  }

  // ---------- Greeting (home) ----------
  const greet = document.getElementById("greet");
  if (greet) {
    const h = new Date().getHours();
    greet.textContent =
      h < 12 ? "Good morning 👋" :
      h < 17 ? "Good afternoon 👋" :
               "Good evening 👋";
  }

  // ---------- Search in messages ----------
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      const q = searchBox.value.toLowerCase();
      document.querySelectorAll(".dm-item").forEach(el => {
        el.style.display =
          el.textContent.toLowerCase().includes(q) ? "flex" : "none";
      });
    });
  }

  // ---------- Typing indicator ----------
  const msgBox = document.getElementById("msgBox");
  const typing = document.getElementById("typing");
  if (msgBox && typing) {
    msgBox.addEventListener("input", () => {
      typing.style.opacity = 1;
      clearTimeout(window._typingTimer);
      window._typingTimer = setTimeout(() => {
        typing.style.opacity = 0;
      }, 700);
    });
  }

  // ---------- Auto scroll chat ----------
  const chatBody = document.querySelector(".chat-body");
  if (chatBody) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // ---------- Image modal (posts + explore) ----------
  const modal = document.createElement("div");
  modal.style.cssText =
    "position:fixed;inset:0;background:rgba(0,0,0,0.75);" +
    "display:none;justify-content:center;align-items:center;z-index:9999;";
  modal.addEventListener("click", () => { modal.style.display = "none"; });
  document.body.appendChild(modal);

  document.querySelectorAll(".post-img,.explore-img").forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      modal.innerHTML =
        `<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:14px;">`;
      modal.style.display = "flex";
    });
  });
});
