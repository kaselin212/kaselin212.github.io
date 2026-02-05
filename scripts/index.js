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

    // --- 新增：Tab 切換邏輯 ---
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. 移除所有按鈕的 active 狀態
            toggleBtns.forEach(b => b.classList.remove('active'));
            // 2. 移除所有內容的 active 狀態
            tabContents.forEach(c => c.classList.remove('active'));

            // 3. 加上當前點擊按鈕的 active
            btn.classList.add('active');

            // 4. 顯示對應的內容區塊 (根據 data-target)
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 新增：流星生成邏輯 ---
    const meteorContainer = document.getElementById('meteor-container');
    const meteorCount = 12; // 流星數量，可自行調整

    for (let i = 0; i < meteorCount; i++) {
        createMeteor();
    }

    function createMeteor() {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');

        // 隨機設定流星參數
        const left = Math.random() * 100; // 隨機水平位置 (0-100vw)
        const delay = Math.random() * 5;  // 隨機延遲 (0-5s)
        const duration = Math.random() * 3 + 2; // 隨機速度 (2-5s)
        const width = Math.random() * 100 + 50; // 隨機長度 (50-150px)

        // 套用樣式
        meteor.style.left = `${left}vw`;
        meteor.style.top = `${Math.random() * -20}vh`; // 讓起點稍微有些垂直差異
        meteor.style.width = `${width}px`;
        meteor.style.animationDelay = `${delay}s`;
        meteor.style.animationDuration = `${duration}s`;

        meteorContainer.appendChild(meteor);
    }
});