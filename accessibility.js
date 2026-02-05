(function() {
    // יצירת ה-HTML של התוסף
    const accessibilityHTML = `
    <div id="acc-wrapper" dir="rtl">
        <button id="acc-trigger" title="תפריט נגישות" aria-label="פתח תפריט נגישות">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1046 2 12 2 12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6C13.1046 6 14 5.10457 14 4C14 2.89543 13.1046 2 12 2Z" fill="white"/>
                <path d="M15 7H9C7.89543 7 7 7.89543 7 9V14H9V22H11V18H13V22H15V14H17V9C17 7.89543 16.1046 7 15 7Z" fill="white"/>
            </svg>
        </button>
        <div id="acc-panel">
            <div class="acc-header">נגישות תבל פוליגרף</div>
            <div class="acc-body">
                <button class="acc-btn" onclick="adjustText(1.1)">➕ הגדל טקסט</button>
                <button class="acc-btn" onclick="adjustText(0.9)">➖ הקטן טקסט</button>
                <button class="acc-btn" onclick="toggleAcc('high-contrast')">🌓 ניגודיות</button>
                <button class="acc-btn" onclick="toggleAcc('underline-links')">🔗 הדגש קישורים</button>
                <button class="acc-btn" onclick="toggleAcc('readable-font')">🅰️ פונט קריא</button>
                <button class="acc-btn" onclick="toggleAcc('stop-animations')">🚫 אנימציות</button>
                <button class="acc-btn acc-full-btn" onclick="resetAcc()">🔄 איפוס הגדרות</button>
                <a href="https://tevel-polygraph.co.il/accessibility.html" class="acc-btn acc-full-btn statement-link">📜 הצהרת נגישות</a>
            </div>
        </div>
    </div>
    <style>
       #acc-wrapper { position: fixed; bottom: 15px; left: 15px; z-index: 99999; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        #acc-trigger {
            width: 50px; height: 50px; background: linear-gradient(135deg, #004a99 0%, #0066cc 100%);
            border: 2px solid rgba(255,255,255,0.2); border-radius: 50%; cursor: pointer;
            box-shadow: 0 3px 10px rgba(0,74,153,0.3); display: flex; align-items: center;
            justify-content: center; transition: all 0.3s ease;
        }
        #acc-trigger:hover {
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 5px 15px rgba(0,74,153,0.4);
            background: linear-gradient(135deg, #0066cc 0%, #004a99 100%);
        }
        #acc-trigger svg { width: 26px; height: 26px; }
        #acc-panel {
            display: none; position: absolute; bottom: 60px; left: 0; width: 240px;
            background: #fff; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.12);
            border: 1px solid #e5e7eb; overflow: hidden;
        }
        .acc-header { background: #004a99; color: #fff; padding: 12px; text-align: center; font-size: 16px; font-weight: 600; }
        .acc-body { padding: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .acc-btn { 
            background: #f8f9fa; border: 1px solid #e9ecef; padding: 10px 5px; cursor: pointer; border-radius: 8px;
            font-size: 13px; transition: all 0.2s ease; font-weight: 500; color: #333;
        }
        .acc-btn:hover { background: #e9ecef; border-color: #dee2e6; }
        .acc-full-btn { grid-column: span 2; }
        .statement-link { text-decoration: none; color: #004a99 !important; background: #eef5ff; border: 1px dashed #004a99; margin-top: 5px; display: block; text-align: center; }
        
        /* Classes for functionality */
        body.high-contrast { background: #000 !important; color: #ffff00 !important; }
        body.high-contrast *:not(.acc-btn) { background: #000 !important; color: #ffff00 !important; border-color: #ffff00 !important; }
        body.underline-links a { text-decoration: underline !important; text-underline-offset: 4px; }
        body.readable-font { font-family: Arial, sans-serif !important; }
        body.stop-animations * { animation: none !important; transition: none !important; }
    </style>
    `;

    // הזרקת ה-HTML לדף
    document.body.insertAdjacentHTML('beforeend', accessibilityHTML);

    // לוגיקה
    const trigger = document.getElementById('acc-trigger');
    const panel = document.getElementById('acc-panel');

    trigger.addEventListener('click', () => {
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });

    window.adjustText = function(multiplier) {
        document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, label').forEach(el => {
            let currentSize = parseFloat(window.getComputedStyle(el).fontSize);
            el.style.fontSize = (currentSize * multiplier) + 'px';
        });
    };

    window.toggleAcc = function(className) {
        document.body.classList.toggle(className);
    };

    window.resetAcc = function() {
        location.reload();
    };

    // סגירה בלחיצה בחוץ
    document.addEventListener('click', (e) => {
        if (!document.getElementById('acc-wrapper').contains(e.target)) {
            panel.style.display = 'none';
        }
    });
})();