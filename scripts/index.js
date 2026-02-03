document.addEventListener('DOMContentLoaded', () => {
    
    // 選取所有需要動畫的元素
    const fadeElements = document.querySelectorAll('.fade-in');

    // 設定 Intersection Observer 的選項
    const options = {
        root: null, // 視窗作為 viewport
        threshold: 0.1, // 當元素出現 10% 時觸發
        rootMargin: "0px"
    };

    // 定義觀察器的 callback
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 當元素進入視窗，加入 .visible class
                entry.target.classList.add('visible');
                
                // (可選) 如果只想觸發一次，可以取消觀察
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // 開始觀察每個元素
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 平滑捲動 (針對舊版瀏覽器的 Fallback，現代瀏覽器已有 CSS scroll-behavior: smooth)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});