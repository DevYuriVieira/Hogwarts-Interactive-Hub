const SoundEngine = {
    ctx: null,
    enabled: true,

    init() {
        this.enabled = localStorage.getItem('soundEnabled') !== 'false';
        this.updateIcon();
    },

    getCtx() {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        return this.ctx;
    },

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled);
        this.updateIcon();
        if (this.enabled) this.play('click');
    },

    updateIcon() {
        const btn = document.getElementById('btn-sound');
        if (btn) btn.innerHTML = this.enabled ? '🔊' : '🔇';
    },

    play(type) {
        if (!this.enabled) return;
        try {
            const ctx = this.getCtx();
            switch(type) {
                case 'click': this._tone(ctx, 800, 0.08, 'sine', 0.15); break;
                case 'hover': this._tone(ctx, 1200, 0.04, 'sine', 0.06); break;
                case 'navigate': this._sweep(ctx, 400, 800, 0.15, 0.12); break;
                case 'sorting-start': this._chord(ctx, [220, 330, 440], 0.6, 0.15); break;
                case 'wand-clash': this._clash(ctx); break;
                case 'house-reveal': this._reveal(ctx); break;
                case 'spell-cast': this._spellCast(ctx); break;
                case 'modal-open': this._tone(ctx, 600, 0.12, 'triangle', 0.1); break;
                case 'modal-close': this._tone(ctx, 400, 0.1, 'triangle', 0.08); break;
            }
        } catch(e) {}
    },

    _tone(ctx, freq, dur, type, vol) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.setValueAtTime(vol, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        o.connect(g).connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + dur);
    },

    _sweep(ctx, f1, f2, dur, vol) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(f1, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(f2, ctx.currentTime + dur);
        g.gain.setValueAtTime(vol, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        o.connect(g).connect(ctx.destination);
        o.start(); o.stop(ctx.currentTime + dur);
    },

    _chord(ctx, freqs, dur, vol) {
        freqs.forEach(f => this._tone(ctx, f, dur, 'sine', vol / freqs.length));
    },

    _clash(ctx) {
        const noise = ctx.createBufferSource();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        noise.buffer = buf;
        const filt = ctx.createBiquadFilter();
        filt.type = 'bandpass'; filt.frequency.value = 1000; filt.Q.value = 2;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.25, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        noise.connect(filt).connect(g).connect(ctx.destination);
        noise.start();
        this._sweep(ctx, 200, 2000, 0.3, 0.2);
        this._sweep(ctx, 2000, 200, 0.3, 0.2);
    },

    _reveal(ctx) {
        const t = ctx.currentTime;
        [261, 329, 392, 523].forEach((f, i) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.type = 'sine';
            o.frequency.value = f;
            g.gain.setValueAtTime(0, t + i * 0.15);
            g.gain.linearRampToValueAtTime(0.12, t + i * 0.15 + 0.05);
            g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.15 + 0.4);
            o.connect(g).connect(ctx.destination);
            o.start(t + i * 0.15);
            o.stop(t + i * 0.15 + 0.5);
        });
    },

    _spellCast(ctx) {
        this._sweep(ctx, 300, 1500, 0.25, 0.18);
        setTimeout(() => this._tone(ctx, 1500, 0.3, 'sine', 0.1), 200);
    }
};
