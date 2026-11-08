(function() {
    const iframe = document.getElementById('main-iframe');
    const navLinks = document.querySelectorAll('aside nav a');
    const headerTitle = document.querySelector('.header-title');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const MOBILE_BREAKPOINT = 900;

    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    function loadPage(linkElement) {
        const url = linkElement.getAttribute('data-url');
        if (!url) return;

        navLinks.forEach(link => link.classList.remove('active'));
        linkElement.classList.add('active');

        const textSpan = linkElement.querySelector('span');
        if (textSpan) {
            headerTitle.textContent = textSpan.textContent;
        }

        iframe.src = url;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.target === '_blank') return;

            e.preventDefault();
            loadPage(this);

            if (isMobile()) {
                sidebar.classList.add('collapsed');
                overlay.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    const defaultLink = document.querySelector('aside nav a[data-url]');
    if (defaultLink) loadPage(defaultLink);

    function toggleSidebar() {
        const collapsed = sidebar.classList.toggle('collapsed');
        toggleBtn.setAttribute('aria-expanded', String(!collapsed));

        if (isMobile()) {
            overlay.classList.toggle('active', !collapsed);
        }
    }

    toggleBtn.addEventListener('click', toggleSidebar);

    overlay.addEventListener('click', () => {
        sidebar.classList.add('collapsed');
        overlay.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
    });

    window.addEventListener('resize', () => {
        if (isMobile()) {
            if (!sidebar.classList.contains('collapsed')) {
                overlay.classList.add('active');
            }
        } else {
            overlay.classList.remove('active');
        }
    });

    if (isMobile()) {
        sidebar.classList.add('collapsed');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }
})();
