
<script 
    async 
    src="https://tganalytics.xyz/index.js" 
    onload="initAnalytics(eyJhcHBfbmFtZSI6InRvbmtiYXR0bGVzIiwiYXBwX3VybCI6Imh0dHBzOi8vdC5tZS9UYW5rQnR0bEJvdCIsImFwcF9kb21haW4iOiJodHRwczovL3JlemFkemVkLmdpdGh1Yi5pby9Ub25rLUJhdHRsZWZpbGQvIn0=!qmRav+Z2gGGcBVx3tyAsAcwHVMORlgDiVwpreDCLS/M=)" 
    type="text/javascript"
></script>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>نبرد تانک ها</title>
    
    <!-- Import Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet">

    <!-- Import Tailwind CSS for styling -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Import Phaser.js for the game engine -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js"></script>
    
    <!-- Import Tone.js for audio effects -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>

    <style>
        /* Custom styles */
        body {
            font-family: 'Vazirmatn', sans-serif;
            background-color: #1a1a1a;
            color: #e0e0e0;
            overflow: hidden;
            touch-action: none; /* Disable pinch zoom */
        }
        #game-container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }
        canvas {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-image: url('https://www.transparenttextures.com/patterns/cracks.png');
            background-color: #4a4a4a; /* Fallback color */
        }
        .hud {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 1.2rem;
            color: white;
            text-shadow: 2px 2px 4px #000;
            pointer-events: none;
        }
        .team-score {
            padding: 5px 15px;
            border-radius: 8px;
            font-weight: bold;
        }
        .blue-team {
            background-color: rgba(59, 130, 246, 0.7);
        }
        .red-team {
            background-color: rgba(239, 68, 68, 0.7);
        }
        .controls {
            position: absolute;
            bottom: 20px;
            left: 20px;
            right: 20px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            pointer-events: none; /* Parent container doesn't block game clicks */
        }
        .control-btn {
            width: 60px;
            height: 60px;
            background-color: rgba(0, 0, 0, 0.5);
            border: 2px solid #888;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2rem;
            user-select: none;
            pointer-events: auto; /* Buttons are interactive */
            transition: background-color 0.2s;
        }
        .control-btn:active {
            background-color: rgba(255, 255, 255, 0.3);
        }
        .d-pad {
            display: grid;
            grid-template-columns: repeat(3, 60px);
            grid-template-rows: repeat(3, 60px);
            gap: 5px;
        }
        #up-btn { grid-column: 2; grid-row: 1; }
        #left-btn { grid-column: 1; grid-row: 2; }
        #right-btn { grid-column: 3; grid-row: 2; }
        #down-btn { grid-column: 2; grid-row: 3; }

        .modal {
            display: none; /* Hidden by default */
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.8);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background-color: #2d2d2d;
            margin: 5% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 90%;
            max-width: 600px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5);
        }
        .modal-header {
            padding-bottom: 10px;
            border-bottom: 1px solid #555;
            font-size: 1.5rem;
            font-weight: bold;
            color: #fca5a5; /* Red accent */
        }
        .modal-body {
            padding-top: 15px;
            max-height: 70vh;
            overflow-y: auto;
        }
        .close-btn {
            color: #aaa;
            float: left;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        .shop-item, .leaderboard-item {
            background-color: #3a3a3a;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .buy-btn {
            background-color: #3b82f6;
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .buy-btn:disabled {
            background-color: #555;
            cursor: not-allowed;
            opacity: 0.6;
        }
        .buy-btn:hover:not(:disabled) {
            background-color: #2563eb;
        }
        .buy-btn-ton {
            background-color: #0098EA;
        }
         .buy-btn-ton:hover:not(:disabled) {
            background-color: #0078be;
        }
        #toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: #fff;
            padding: 10px 20px;
            border-radius: 8px;
            z-index: 1000;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.5s, visibility 0.5s;
        }
        #toast.show {
            visibility: visible;
            opacity: 1;
        }
    </style>
</head>
<body>

    <div id="game-container">
        <!-- Phaser game canvas will be injected here -->
    </div>

    <!-- Game UI -->
    <div class="hud" style="visibility: hidden;">
        <div id="blue-score" class="team-score blue-team">تیم آبی: 0</div>
        <div id="red-score" class="team-score red-team">تیم قرمز: 0</div>
    </div>
    
    <div class="controls" style="visibility: hidden;">
        <div class="d-pad">
            <button id="up-btn" class="control-btn">▲</button>
            <button id="left-btn" class="control-btn">◀</button>
            <button id="right-btn" class="control-btn">▶</button>
            <button id="down-btn" class="control-btn">▼</button>
        </div>
        <button id="fire-btn" class="control-btn" style="width: 80px; height: 80px;">💥</button>
    </div>

    <!-- Menu Buttons -->
    <div id="menu-buttons" style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; visibility: hidden;">
        <button id="shop-btn" class="buy-btn">🛒 فروشگاه</button>
        <button id="leaderboard-btn" class="buy-btn">🏆 جدول رده‌بندی</button>
    </div>

    <!-- Toast Notification -->
    <div id="toast"></div>

    <!-- Shop Modal -->
    <div id="shop-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-btn" data-modal="shop-modal">&times;</span>
                فروشگاه
            </div>
            <div class="modal-body">
                <h3 class="text-xl font-bold mb-4 text-amber-300">ارتقای قدرت تانک</h3>
                <div class="shop-item">
                    <div>
                        <p class="font-bold">سطح ۱ قدرت</p>
                        <p class="text-sm text-gray-400">قدرت شلیک را افزایش می‌دهد.</p>
                    </div>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('power', 1, 1.0)">خرید (1 TON)</button>
                </div>
                <div class="shop-item">
                    <div>
                        <p class="font-bold">سطح ۲ قدرت</p>
                        <p class="text-sm text-gray-400">قدرت شلیک را به میزان قابل توجهی افزایش می‌دهد.</p>
                    </div>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('power', 2, 3.0)">خرید (3 TON)</button>
                </div>
                <div class="shop-item">
                    <div>
                        <p class="font-bold">سطح ۳ قدرت (نهایی)</p>
                        <p class="text-sm text-gray-400">قدرت تخریب نهایی! ۴ برابر قدرت اولیه.</p>
                    </div>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('power', 3, 10.0)">خرید (10 TON)</button>
                </div>

                <h3 class="text-xl font-bold my-4 text-amber-300">تغییرات ظاهری</h3>
                <div class="shop-item">
                    <p class="font-bold">پوسته چریکی</p>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('skin', 'camo', 0.5)">خرید (0.5 TON)</button>
                </div>
                <div class="shop-item">
                    <p class="font-bold">پوسته طلایی</p>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('skin', 'gold', 0.5)">خرید (0.5 TON)</button>
                </div>
                <div class="shop-item">
                    <p class="font-bold">پوسته آتشین</p>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('skin', 'fire', 0.5)">خرید (0.5 TON)</button>
                </div>

                <h3 class="text-xl font-bold my-4 text-amber-300">خرید تانک جدید</h3>
                <div class="shop-item">
                    <p class="font-bold">تانک سریع (Scout)</p>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('tank', 'scout', 5.0)">خرید (5 TON)</button>
                </div>
                <div class="shop-item">
                    <p class="font-bold">تانک سنگین (Juggernaut)</p>
                    <button class="buy-btn buy-btn-ton" onclick="purchase('tank', 'juggernaut', 20.0)">خرید (20 TON)</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Leaderboard Modal -->
    <div id="leaderboard-modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-btn" data-modal="leaderboard-modal">&times;</span>
                جدول رده‌بندی
            </div>
            <div id="leaderboard-body" class="modal-body">
                <!-- Leaderboard items will be injected here -->
                <p>در حال بارگذاری اطلاعات...</p>
            </div>
        </div>
    </div>

    <!-- Welcome Modal -->
    <div id="welcome-modal" class="modal" style="display: flex;">
        <div class="modal-content text-center">
            <h2 class="text-2xl font-bold mb-4">به نبرد تانک‌ها خوش آمدید!</h2>
            <p class="mb-2">وضعیت اتصال:</p>
            <p id="user-id-display" class="mb-4 bg-gray-800 p-2 rounded-lg break-all">در حال اتصال به سرور...</p>
            <p class="mb-6">از دکمه‌های روی صفحه برای حرکت و شلیک استفاده کنید. تیم حریف را نابود کنید!</p>
            <button id="start-game-btn" class="buy-btn text-xl p-4" disabled>لطفاً منتظر بمانید...</button>
        </div>
    </div>




        // --- Global Variables ---
        let game;
        let currentGameId = null;
        let currentPlayerId = null;
        let playerTeam = null;
        let unsubscribeGameListener = null;
        const TON_WALLET_ADDRESS = "UQB26SX8qZT9F64lBld5J1QRncdeKwxhVVFDHdkI7dJvvuiF";

        // --- UI Elements ---
        const shopModal = document.getElementById('shop-modal');
        const leaderboardModal = document.getElementById('leaderboard-modal');
        const welcomeModal = document.getElementById('welcome-modal');
        const startGameBtn = document.getElementById('start-game-btn');
        const userIdDisplay = document.getElementById('user-id-display');

        // --- Toast Notification ---
        function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
         toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // --- Modal Logic ---
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.onclick = () => document.getElementById(btn.dataset.modal).style.display = 'none';
        });
        document.getElementById('shop-btn').onclick = () => shopModal.style.display = 'block';
        document.getElementById('leaderboard-btn').onclick = () => {
            leaderboardModal.style.display = 'block';
            loadLeaderboard();
        };
        window.onclick = (event) => {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = 'none';
            }
        };
        
        // --- TON Payment Logic ---
        window.purchase = function(itemType, itemId, amount) {
            console.log(`Attempting purchase: ${itemType} ${itemId} for ${amount} TON`);
            showToast(`برای تکمیل خرید، تراکنش را در Tonkeeper تایید کنید.`);
            const deepLink = `ton://transfer/${TON_WALLET_ADDRESS}?amount=${amount * 1e9}&text=purchase_${itemType}_${itemId}`;
            console.log("Generated TON Deep Link:", deepLink);
            // window.open(deepLink); // In a real app, this would open the wallet
            setTimeout(() => {
                showToast(`خرید ${itemId} موفقیت آمیز بود! (شبیه‌سازی)`);
            }, 2000);
        }

        // --- Leaderboard Logic ---
        async function loadLeaderboard() {
            const leaderboardBody = document.getElementById('leaderboard-body');
            leaderboardBody.innerHTML = '<p>در حال بارگذاری اطلاعات...</p>';
            try {
                const q = query(collection(db, "artifacts", appId, "public", "data", "users"));
                const querySnapshot = await getDocs(q);
                let users = [];
                querySnapshot.forEach((doc) => users.push({ id: doc.id, ...doc.data() }));
                users.sort((a, b) => (b.score || 0) - (a.score || 0));

                if (users.length === 0) {
                    leaderboardBody.innerHTML = '<p>هنوز کسی در جدول رده‌بندی نیست.</p>';
                    return;
                }
                
                leaderboardBody.innerHTML = ''; // Clear loading message
                users.slice(0, 10).forEach((user, index) => {
                    const item = document.createElement('div');
                    item.className = 'leaderboard-item';
                    item.innerHTML = `
                        <div class="flex items-center gap-4">
                            <span class="font-bold text-lg">${index + 1}.</span>
                            <p class="truncate max-w-[200px]">${user.id}</p>
                        </div>
                        <p class="font-bold text-amber-300">${user.score || 0} امتیاز</p>
                    `;
                    leaderboardBody.appendChild(item);
                });
            } catch (error) {
                console.error("Error loading leaderboard: ", error);
                leaderboardBody.innerHTML = `<p>خطا در بارگذاری اطلاعات: ${error.message}</p>`;
            }
        }
        
        // --- Authentication & Game Start ---
        function setupAuthListener() {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    if (currentPlayerId) return; // Already handled
                    currentPlayerId = user.uid;
                    console.log("Authenticated User ID:", currentPlayerId);
                    
                    const userDocRef = doc(db, "artifacts", appId, "public", "data", "users", currentPlayerId);
                    try {
                        const userDoc = await getDoc(userDocRef);
                        if (!userDoc.exists()) {
                            await setDoc(userDocRef, { score: 0, items: {}, createdAt: serverTimestamp() });
                        }
                        userIdDisplay.textContent = `شناسه شما: ${currentPlayerId}`;
                        userIdDisplay.classList.remove('text-red-400');
                        startGameBtn.disabled = false;
                        startGameBtn.textContent = "شروع بازی";
                    } catch (error) {
                         console.error("Error setting up user document:", error);
                         userIdDisplay.textContent = `خطا در دسترسی به دیتابیس: ${error.message}`;
                         userIdDisplay.classList.add('text-red-400');
                         startGameBtn.disabled = true;
                    }
                } else {
                    currentPlayerId = null;
                    userIdDisplay.textContent = "قطع اتصال.";
                    startGameBtn.disabled = true;
                    startGameBtn.textContent = "در حال اتصال...";
                }
            });
        }

        async function signInUser() {
            try {
                if (initialAuthToken) {
                    console.log("Attempting sign-in with custom token...");
                    await signInWithCustomToken(auth, initialAuthToken);
                } else {
                    console.log("No custom token found. Attempting anonymous sign-in...");
                    await signInAnonymously(auth);
                }
            } catch (error) {
                console.error("Sign-in failed:", error);
                throw new Error(`Firebase sign-in failed: ${error.message}`);
            }
        }
        
        startGameBtn.onclick = () => {
            welcomeModal.style.display = 'none';
            document.querySelector('.hud').style.visibility = 'visible';
            document.querySelector('.controls').style.visibility = 'visible';
            document.getElementById('menu-buttons').style.visibility = 'visible';
            findOrCreateGame();
        };

        // --- Matchmaking Logic ---
        async function findOrCreateGame() {
            if (!currentPlayerId) {
                showToast("خطا: کاربر احراز هویت نشده است.");
                return;
            }
            showToast("در جستجوی بازی...");
            const gameRef = doc(db, "artifacts", appId, "public", "data", "gameFinder", "activeGame");

            try {
                await runTransaction(db, async (transaction) => {
                    const gameFinderDoc = await transaction.get(gameRef);
                    
