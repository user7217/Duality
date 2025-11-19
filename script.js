// Duality mode toggle (persists across pages)
(function () {
  const KEY = 'duality-mode'; // 'personal' or 'work'

  function applyMode(mode) {
    document.body.classList.remove('mode-personal', 'mode-work');
    document.body.classList.add(mode === 'work' ? 'mode-work' : 'mode-personal');

    document.querySelectorAll('#modeToggle, .mode-toggle').forEach(btn => {
      btn.textContent = mode === 'work' ? 'Work' : 'Personal';
      btn.setAttribute('aria-pressed', mode === 'work');
    });
  }

  function toggleMode() {
    const current = localStorage.getItem(KEY) || 'personal';
    const next = current === 'personal' ? 'work' : 'personal';
    localStorage.setItem(KEY, next);
    applyMode(next);
  }

  document.addEventListener('DOMContentLoaded', () => {
    // apply saved mode (default personal)
    const saved = localStorage.getItem(KEY) || 'personal';
    applyMode(saved);

    // wire up all toggles
    document.querySelectorAll('#modeToggle, .mode-toggle').forEach(btn => {
      btn.addEventListener('click', toggleMode);
    });
  });

  // Simple demo login: set personal and go to home
  window.handleLogin = function (e) {
    e && e.preventDefault && e.preventDefault();
    localStorage.setItem(KEY, 'personal');
    window.location.href = 'home.html';
    return false;
  };
})();
