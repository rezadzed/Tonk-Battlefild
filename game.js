const tg = window.Telegram.WebApp;
tg.ready();

// --- تابع برای مدیریت رویداد کلیک دکمه اصلی تلگرام ---
// این تابع کمک می‌کند تا از ثبت چندباره رویداد جلوگیری شود
function setMainButtonAction(text, callback) {
    tg.MainButton.offClick(this._mainButtonCallback); // پاک کردن رویداد قبلی
    this._mainButtonCallback = callback; // ذخیره رویداد جدید
    tg.MainButton.setText(text);
    tg.MainButton.onClick(this._mainButtonCallback);
    tg.MainButton.show();
}

class MainMenuScene extends Phaser.Scene {
    constructor() { super('MainMenuScene'); }

    create() {
        document.getElementById('controls').classList.add('hidden');
        this.cameras.main.setBackgroundColor(tg.themeParams.bg_color || '#2d2d2d');
        
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;
        const user = tg.initDataUnsafe?.user;
        const userName = user ? user.first_name : 'بازیکن';

        this.add.text(centerX, centerY - 150, `خوش آمدی، ${userName}!`, { font: '32px Vazirmatn', fill: `#${tg.themeParams.text_color || 'ffffff'}` }).setOrigin(0.5);
        this.add.text(centerX, centerY - 50, 'Tonk Battlefield', { font: '48px Vazirmatn', fill: `#${tg.themeParams.text_color || 'ffffff'}` }).setOrigin(0.5);

        // استفاده از تابع جدید برای تنظیم دکمه
        setMainButtonAction("شروع بازی", () => {
            try {
                if (Tone.context.state !== 'running') Tone.start();
            } catch (e) {
                console.error("Tone.js start failed:", e);
            }
            this.scene.start('GameScene');
        });
    }
}

class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) { super(scene, x, y, 'bullet'); scene.add.existing(this); scene.physics.add.existing(this); this.setScale(0.5).body.setCircle(8); }
    fire(x, y, angle) { this.setPosition(x, y).setRotation(angle).setActive(true).setVisible(true); this.scene.physics.velocityFromRotation(angle, 600, this.velocity); this.scene.time.addEvent({ delay: 3000, callback: () => this.active && this.destroy() }); }
}

class GameScene extends Phaser.Scene {
    constructor() { super('GameScene'); }

    create() {
        tg.MainButton.hide();
        document.getElementById('controls').classList.remove('hidden');

        this.shootSound = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.1, release: 0.1 } }).toDestination();
        this.explosionSound = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.01, decay: 0.3, release: 0.2 } }).toDestination();

        this.makeGraphics();
        this.cameras.main.setBackgroundColor(tg.themeParams.bg_color || '#4a4a4a');
        this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });

        this.player = this.physics.add.sprite(this.scale.width / 2, this.scale.height / 2, 'tank').setCollideWorldBounds(true).setDamping(true).setDrag(0.98).setMaxVelocity(200);
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(200, 200, 'wall').setScale(2, 0.5).refreshBody();
        this.obstacles.create(this.scale.width - 200, this.scale.height - 200, 'wall').setScale(2, 0.5).refreshBody();

        this.physics.add.collider(this.bullets, this.obstacles, (bullet) => { bullet.destroy(); this.explosionSound.triggerAttackRelease("C2", "8n"); });
        this.physics.add.collider(this.player, this.obstacles, () => { tg.HapticFeedback.notificationOccurred('error'); this.scene.start('GameOverScene'); });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.setupOnScreenControls();
        this.lastFired = 0;
    }
    
    update(time) { this.handlePlayerMovement(); this.handleFiring(time); }
    
    handlePlayerMovement() { if (this.moveLeft) this.player.setAngularVelocity(-150); else if (this.moveRight) this.player.setAngularVelocity(150); else this.player.setAngularVelocity(0); if (this.moveUp) this.physics.velocityFromRotation(this.player.rotation, 300, this.player.body.acceleration); else if (this.moveDown) this.physics.velocityFromRotation(this.player.rotation, -150, this.player.body.acceleration); else this.player.setAcceleration(0); }

    handleFiring(time) { if (this.isFiring && time > this.lastFired) { const bullet = this.bullets.get(); if (bullet) { const vec = new Phaser.Math.Vector2().setToPolar(this.player.rotation, 60); bullet.fire(this.player.x + vec.x, this.player.y + vec.y, this.player.rotation); this.lastFired = time + 500; this.shootSound.triggerAttackRelease("C4", "8n"); tg.HapticFeedback.impactOccurred('light'); } } }

    setupOnScreenControls() { this.moveUp = this.moveDown = this.moveLeft = this.moveRight = this.isFiring = false; const addBtnEvents = (id, flag) => { const el = document.getElementById(id); el.addEventListener('pointerdown', (e) => { e.preventDefault(); this[flag] = true; }); el.addEventListener('pointerup', (e) => { e.preventDefault(); this[flag] = false; }); el.addEventListener('pointerout', (e) => { e.preventDefault(); this[flag] = false; }); }; addBtnEvents('btn-up', 'moveUp'); addBtnEvents('btn-down', 'moveDown'); addBtnEvents('btn-left', 'moveLeft'); addBtnEvents('btn-right', 'moveRight'); addBtnEvents('btn-fire', 'isFiring'); }

    makeGraphics() { const createTexture = (name, drawCallback, width, height) => { let gfx = this.make.graphics({ add: false }); drawCallback(gfx); gfx.generateTexture(name, width, height); gfx.destroy(); }; createTexture('tank', gfx => { gfx.fillStyle(0x336633, 1).fillRect(0, 0, 50, 40); gfx.fillStyle(0x555555, 1).fillRect(50, 15, 30, 10); }, 80, 40); createTexture('bullet', gfx => gfx.fillStyle(0xffcc00, 1).fillCircle(8, 8, 8), 16, 16); createTexture('wall', gfx => gfx.fillStyle(0x795548, 1).fillRect(0, 0, 100, 20), 100, 20); }
}

class GameOverScene extends Phaser.Scene {
    constructor() { super('GameOverScene'); }
    
    create() {
        document.getElementById('controls').classList.add('hidden');
        this.cameras.main.setBackgroundColor('#8c1c1c');
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.add.text(centerX, centerY - 100, 'بازی تمام شد', { font: '48px Vazirmatn', fill: '#ffffff' }).setOrigin(0.5);

        // استفاده از تابع جدید برای تنظیم دکمه
        setMainButtonAction("شروع مجدد", () => {
            this.scene.start('GameScene');
        });
    }
}

window.addEventListener('load', () => {
    const config = { type: Phaser.AUTO, scale: { mode: Phaser.Scale.RESIZE, parent: 'game-container', width: window.innerWidth, height: window.innerHeight }, physics: { default: 'arcade', arcade: { gravity: { y: 0 } } }, scene: [MainMenuScene, GameScene, GameOverScene] };
    new Phaser.Game(config);
});
