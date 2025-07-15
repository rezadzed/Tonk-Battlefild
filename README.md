<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Chosen Palette: Wartime Ember -->
    <!-- Application Structure Plan: A single-page dashboard with a fixed top navigation to scroll to different sections: Overview, Battlefield, Shop, Roadmap, and Technical Info. This structure organizes the user's detailed game plan into logical, thematic chunks, making the complex project easy to explore. The interactive elements in each section (e.g., charts, diagrams) are designed to make the data and concepts more engaging and understandable than a static document. -->
    <!-- Visualization & Content Choices: 
        - Overview: Inform -> Animated Canvas header of a tank -> Engages user immediately -> Vanilla JS Canvas.
        - Battlefield: Organize -> HTML/CSS grid for map layout, interactive diagram for controls -> Visualizes game space and mechanics -> HTML/Tailwind.
        - Shop: Compare/Analyze -> Chart.js bar chart for upgrade cost vs. power, interactive cards for items -> Translates raw numbers into a clear visual comparison -> Chart.js.
        - Roadmap: Organize -> Vertical timeline with clickable phases -> Structures the project plan sequentially -> HTML/Tailwind/JS for interaction.
        - Technical Info: Utility -> Copy-to-clipboard buttons -> Improves usability for key data points -> Vanilla JS.
        -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <title>Tonk Battlefield Project Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #1A202C;
            color: #E2E8F0;
        }
        html {
            scroll-behavior: smooth;
        }
        .section-title {
            border-bottom: 2px solid #F6AD55;
            padding-bottom: 0.5rem;
            display: inline-block;
        }
        .nav-link {
            transition: all 0.2s ease-in-out;
            border-bottom: 2px solid transparent;
        }
        .nav-link:hover, .nav-link.active {
            color: #F6AD55;
            border-bottom-color: #F6AD55;
        }
        .card {
            background-color: #2D3748;
            border: 1px solid #4A5568;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
        }
        .timeline-item:before {
            content: '';
            position: absolute;
            left: -21px;
            top: 10px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #F6AD55;
            border: 2px solid #2D3748;
        }
        .timeline-line {
            position: absolute;
            left: -16px;
            top: 10px;
            bottom: -10px;
            width: 2px;
            background-color: #4A5568;
        }
        .tooltip {
            visibility: hidden;
            background-color: #F6AD55;
            color: #1A202C;
            text-align: center;
            border-radius: 6px;
            padding: 5px 10px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -60px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        .has-tooltip:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }
    </style>
</head>
<body class="bg-gray-900 text-gray-200">

    <!-- Header Navigation -->
    <header class="bg-gray-800 sticky top-0 z-50 shadow-lg">
        <nav class="container mx-auto px-6 py-3">
            <ul class="flex items-center justify-center space-x-8">
                <li><a href="#overview" class="nav-link px-3 py-2">Overview</a></li>
                <li><a href="#battlefield" class="nav-link px-3 py-2">Battlefield</a></li>
                <li><a href="#shop" class="nav-link px-3 py-2">Shop</a></li>
                <li><a href="#roadmap" class="nav-link px-3 py-2">Roadmap</a></li>
                <li><a href="#tech" class="nav-link px-3 py-2">Tech Info</a></li>
            </ul>
        </nav>
    </header>

    <main class="container mx-auto p-4 md:p-8">

        <!-- Section 1: Overview -->
        <section id="overview" class="text-center min-h-screen flex flex-col justify-center items-center py-16">
            <h1 class="text-5xl md:text-7xl font-bold text-amber-400">TONK BATTLEFIELD</h1>
            <p class="text-xl md:text-2xl mt-4 text-gray-400">A Team-Based Online Strategy Game</p>
            <canvas id="tankCanvas" class="mt-8 rounded-lg" width="600" height="200"></canvas>
            <div class="mt-8 text-lg max-w-3xl mx-auto text-gray-300">
                <p>This dashboard serves as an interactive reference for the "Tonk Battlefield" project. In this game, two teams of three players fight in a strategic battle until one team is completely eliminated. The goal of this dashboard is to provide a clear and understandable overview of all project aspects, from gameplay to business model and development roadmap.</p>
            </div>
        </section>

        <!-- Section 2: Battlefield & Controls -->
        <section id="battlefield" class="py-16">
            <h2 class="text-4xl font-bold mb-8 text-center section-title">Battlefield & Controls</h2>
             <p class="text-center max-w-3xl mx-auto mb-12 text-gray-400">The game environment and player interaction with their tank are two key elements of the gameplay experience. This section visually displays the map and the control button layout for easier understanding.</p>
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <div class="card p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-4 text-amber-400">Game Map</h3>
                    <p class="mb-4 text-gray-400">The game map is a square area with a war-torn atmosphere. Walls and rocks serve as cover.</p>
                    <div class="aspect-square bg-gray-700 grid grid-cols-5 grid-rows-5 gap-2 p-2 rounded">
                        <div class="col-start-2 row-start-2 bg-gray-500 rounded h-4"></div>
                        <div class="col-start-4 row-start-4 bg-gray-500 rounded h-4"></div>
                        <div class="col-start-1 row-start-4 bg-gray-600 rounded-full w-8 h-8 self-center justify-self-center"></div>
                        <div class="col-start-5 row-start-2 bg-gray-600 rounded-full w-8 h-8 self-center justify-self-center"></div>
                         <div class="flex items-center justify-center col-span-5 row-start-3">
                            <span class="text-gray-400 text-sm">🔥 War zone with smoke and fire 🔥</span>
                        </div>
                    </div>
                </div>
                <div class="card p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-4 text-amber-400">Controls</h3>
                    <p class="mb-4 text-gray-400">The controls are optimized for mobile touch screens.</p>
                    <div class="flex justify-between items-center bg-gray-700 p-4 rounded-lg">
                        <!-- Left Controls -->
                        <div class="w-48">
                            <p class="text-center mb-2 font-bold">Movement</p>
                            <div class="grid grid-cols-3 gap-2">
                                <div></div>
                                <div class="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center text-xl">▲</div>
                                <div></div>
                                <div class="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center text-xl">◀</div>
                                <div class="w-12 h-12"></div>
                                <div class="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center text-xl">▶</div>
                                <div></div>
                                <div class="bg-gray-600 rounded-full w-12 h-12 flex items-center justify-center text-xl">▼</div>
                                <div></div>
                            </div>
                        </div>
                        <!-- Right Controls -->
                        <div class="w-32 text-center">
                            <p class="text-center mb-2 font-bold">Fire</p>
                            <div class="bg-red-600 rounded-full w-20 h-20 flex items-center justify-center text-4xl mx-auto">🔥</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 3: Shop & Upgrades -->
        <section id="shop" class="py-16">
            <h2 class="text-4xl font-bold mb-8 text-center section-title">Shop & Upgrades</h2>
            <p class="text-center max-w-3xl mx-auto mb-12 text-gray-400">The shop is the core of the game's revenue model. Players can spend TON currency to upgrade their tank's power or customize its appearance. This section provides a visual analysis of the available options.</p>
            <div class="grid md:grid-cols-2 gap-8">
                <!-- Upgrades -->
                <div class="md:col-span-2 card p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-6 text-amber-400">Tank Power Upgrades</h3>
                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <div class="card p-4 rounded-lg border-green-500">
                            <h4 class="font-bold text-xl">Level 1</h4>
                            <p class="text-2xl font-bold my-2 text-green-400">1 TON</p>
                            <p class="text-gray-400">Power: 25%</p>
                        </div>
                        <div class="card p-4 rounded-lg border-blue-500">
                            <h4 class="font-bold text-xl">Level 2</h4>
                            <p class="text-2xl font-bold my-2 text-blue-400">3 TON</p>
                            <p class="text-gray-400">Power: 50%</p>
                        </div>
                        <div class="card p-4 rounded-lg border-purple-500">
                            <h4 class="font-bold text-xl">Level 3</h4>
                            <p class="text-2xl font-bold my-2 text-purple-400">10 TON</p>
                            <p class="text-gray-400">Power: 400%</p>
                        </div>
                    </div>
                    <div class="mt-8">
                        <h4 class="text-xl font-bold mb-4 text-center">Cost-Benefit Analysis</h4>
                        <div class="chart-container relative h-64 md:h-80 w-full max-w-2xl mx-auto">
                            <canvas id="upgradeChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Cosmetics & Tanks -->
                <div class="card p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-4 text-amber-400">Cosmetic Items</h3>
                    <p class="mb-4 text-gray-400">Includes various colors, decals, and tank models.</p>
                    <div class="flex items-center justify-center p-4 bg-gray-700 rounded-lg">
                        <span class="font-bold text-2xl text-cyan-400">0.5 TON</span>
                        <span class="ml-4">per item</span>
                    </div>
                </div>
                <div class="card p-6 rounded-lg">
                    <h3 class="text-2xl font-bold mb-4 text-amber-400">Purchase New Tanks</h3>
                    <p class="mb-4 text-gray-400">More powerful tanks at different price points.</p>
                    <div class="flex items-center justify-center p-4 bg-gray-700 rounded-lg">
                        <span class="font-bold text-2xl text-lime-400">1 to 200 TON</span>
                        <span class="ml-4">depending on model</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 4: Roadmap -->
        <section id="roadmap" class="py-16">
            <h2 class="text-4xl font-bold mb-8 text-center section-title">Project Roadmap</h2>
            <p class="text-center max-w-3xl mx-auto mb-12 text-gray-400">The game development is planned in 8 main phases. This roadmap is displayed as a vertical timeline for clear and sequential tracking of the development stages.</p>
            <div class="max-w-3xl mx-auto relative">
                <div class="timeline-line"></div>
                <div class="space-y-12">
                    <div class="relative timeline-item pl-8">
                        <h3 class="text-xl font-bold text-amber-400">Phase 1: Initial Design</h3>
                        <p class="text-gray-400">Design of the main screen and game entry flow.</p>
                    </div>
                    <div class="relative timeline-item pl-8">
                        <h3 class="text-xl font-bold text-amber-400">Phase 2 & 3: Gameplay & Environment</h3>
                        <p class="text-gray-400">Building the initial tank gameplay, controls, and game environment (smoke, fire, walls).</p>
                    </div>
                    <div class="relative timeline-item pl-8">
                        <h3 class="text-xl font-bold text-amber-400">Phase 4 & 5: Physics & Game Logic</h3>
                        <p class="text-gray-400">Adding movement, firing, bullet collisions, and scoring/victory system.</p>
                    </div>
                    <div class="relative timeline-item pl-8">
                        <h3 class="text-xl font-bold text-amber-400">Phase 6: Shop</h3>
                        <p class="text-gray-400">Designing the shop and integrating with Tonkeeper wallet.</p>
                    </div>
                    <div class="relative timeline-item pl-8">
                        <h3 class="text-xl font-bold text-amber-400">Phase 7: Leaderboard</h3>
                        <p class="text-gray-400">Adding a leaderboard and saving data on a server.</p>
                    </div>
                    <div class="relative timeline-item pl-8">
                        <h3 class="text-xl font-bold text-amber-400">Phase 8: Final Polish</h3>
                        <p class="text-gray-400">Adding professional graphics and full sound design.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section 5: Technical Info -->
        <section id="tech" class="py-16 text-center">
            <h2 class="text-4xl font-bold mb-8 section-title">Technical Info</h2>
             <p class="text-center max-w-3xl mx-auto mb-12 text-gray-400">This section contains key technical information required for development and service integration. You can easily copy the values.</p>
            <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div class="card p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-2">Wallet Address (Tonkeeper)</h3>
                    <div class="relative has-tooltip">
                        <input type="text" id="wallet-address" value="UQB26SX8qZT9F64lBld5J1QRncdeKwxhVVFDHdkI7dJvvuiF" class="w-full bg-gray-700 p-2 rounded border border-gray-600 text-center" readonly>
                        <button onclick="copyToClipboard('wallet-address', 'wallet-tooltip')" class="absolute top-1/2 -translate-y-1/2 right-2 text-gray-400 hover:text-white">📋</button>
                        <div id="wallet-tooltip" class="tooltip">Copied!</div>
                    </div>
                </div>
                <div class="card p-6 rounded-lg">
                    <h3 class="text-xl font-bold mb-2">Telegram Bot API Key</h3>
                     <div class="relative has-tooltip">
                        <input type="text" id="api-key" value="7892052376:AAGowv9aVJ3sxj1Wip1FQTXAmCReSYbKvIY" class="w-full bg-gray-700 p-2 rounded border border-gray-600 text-center" readonly>
                        <button onclick="copyToClipboard('api-key', 'api-tooltip')" class="absolute top-1/2 -translate-y-1/2 right-2 text-gray-400 hover:text-white">📋</button>
                         <div id="api-tooltip" class="tooltip">Copied!</div>
                    </div>
                </div>
            </div>
             <div class="mt-8">
                 <h3 class="text-2xl font-bold mb-4">Recommended Frameworks</h3>
                 <div class="flex justify-center space-x-6">
                    <span class="bg-blue-500 text-white px-4 py-2 rounded-full font-bold">PixiJS</span>
                    <span class="bg-green-500 text-white px-4 py-2 rounded-full font-bold">Phaser</span>
                 </div>
            </div>
        </section>

    </main>

    <script>
        document.addEventListener('DOMContentLoaded', function () {
            
            // --- Tank Animation on Canvas ---
            const canvas = document.getElementById('tankCanvas');
            const ctx = canvas.getContext('2d');
            let tankX = -50;

            function drawTank(x) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Tank Body
                ctx.fillStyle = '#F6AD55';
                ctx.fillRect(x, canvas.height / 2, 50, 20);
                // Tank Turret
                ctx.fillRect(x + 15, canvas.height / 2 - 10, 20, 10);
                // Tank Barrel
                ctx.fillRect(x + 20, canvas.height / 2 - 5, 40, 5);
            }

            function animateTank() {
                tankX += 1;
                if (tankX > canvas.width) {
                    tankX = -60;
                }
                drawTank(tankX);
                requestAnimationFrame(animateTank);
            }
            animateTank();

            // --- Upgrade Chart ---
            const chartCtx = document.getElementById('upgradeChart').getContext('2d');
            const upgradeChart = new Chart(chartCtx, {
                type: 'bar',
                data: {
                    labels: ['Level 1', 'Level 2', 'Level 3'],
                    datasets: [{
                        label: 'Relative Power (%)',
                        data: [25, 50, 400],
                        backgroundColor: ['#48BB78', '#4299E1', '#9F7AEA'],
                        borderColor: ['#2F855A', '#2B6CB0', '#6B46C1'],
                        borderWidth: 1
                    }, {
                        label: 'Cost (TON)',
                        data: [1, 3, 10],
                        backgroundColor: '#F6AD55',
                        borderColor: '#B8741A',
                        borderWidth: 1,
                        yAxisID: 'y1',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            type: 'logarithmic',
                            title: { display: true, text: 'Power (%)', color: '#A0AEC0' },
                            ticks: { color: '#A0AEC0' }
                        },
                        y1: {
                           type: 'linear',
                           display: true,
                           position: 'left',
                           title: { display: true, text: 'Cost (TON)', color: '#F6AD55'},
                           ticks: { color: '#F6AD55' },
                           grid: {
                              drawOnChartArea: false, 
                           },
                        },
                        x: {
                           ticks: { color: '#A0AEC0' }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: '#A0AEC0' } },
                        tooltip: {
                            callbacks: {
                                title: function(tooltipItems) {
                                    const item = tooltipItems[0];
                                    let label = item.chart.data.labels[item.dataIndex];
                                    if (Array.isArray(label)) {
                                      return label.join(' ');
                                    } else {
                                      return label;
                                    }
                                }
                            }
                        }
                    }
                }
            });

            // --- Active Nav Link on Scroll ---
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (pageYOffset >= sectionTop - 70) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(current)) {
                        link.classList.add('active');
                    }
                });
            });
        });

        // --- Copy to Clipboard Function ---
        function copyToClipboard(elementId, tooltipId) {
            const input = document.getElementById(elementId);
            input.select();
            input.setSelectionRange(0, 99999); 
            document.execCommand('copy');
            
            const tooltip = document.getElementById(tooltipId);
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            setTimeout(() => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }, 2000);
        }
    </script>
</body>
</html>
