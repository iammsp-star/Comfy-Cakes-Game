/**
 * Authentic Purble Place Web Audio Synthesizer
 * Generates skeuomorphic retro arcade audio effects:
 * - Jaunty Bakery BGM Loop
 * - Tactile Plastic "CLACK-POP" Button Clicks
 * - Continuous Mechanical Conveyor Hum
 * - Success "KA-CHING" Cash Register Bell
 * - Failure "Sad Trombone" Comical SFX
 */

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmInterval: number | null = null;
  private bgmStep: number = 0;
  private conveyorOsc: OscillatorNode | null = null;
  private conveyorGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopBGM();
      this.stopConveyorHum();
    } else {
      this.startBGM();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Tactile Plastic "CLACK-POP" Button Click
   */
  public playClickPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  /**
   * Station 0: Metallic Pan Drop
   */
  public playPanDrop() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  /**
   * Station 1: Batter Dispense
   */
  public playBatterDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(360, this.ctx.currentTime + 0.09);
    osc.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.23);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.23);
  }

  /**
   * Station 2: Filling Dispense
   */
  public playFillingDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.18);
  }

  /**
   * Station 3: Icing Pipe
   */
  public playIcingDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(540, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.12);
    osc.frequency.linearRampToValueAtTime(620, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  /**
   * Station 4: Topping Drop
   */
  public playToppingDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(420, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  /**
   * Continuous Mechanical Conveyor Hum
   */
  public startConveyorHum() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || this.conveyorOsc) return;

    this.conveyorOsc = this.ctx.createOscillator();
    this.conveyorGain = this.ctx.createGain();

    this.conveyorOsc.type = 'sawtooth';
    this.conveyorOsc.frequency.setValueAtTime(75, this.ctx.currentTime);

    this.conveyorGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.conveyorOsc.connect(this.conveyorGain);
    this.conveyorGain.connect(this.ctx.destination);

    this.conveyorOsc.start();
  }

  public stopConveyorHum() {
    if (this.conveyorOsc && this.ctx) {
      try {
        this.conveyorGain?.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
        this.conveyorOsc.stop(this.ctx.currentTime + 0.1);
      } catch (e) {
        // ignore
      }
      this.conveyorOsc = null;
      this.conveyorGain = null;
    }
  }

  public playConveyorStep() {
    this.playClickPop();
    this.startConveyorHum();
    setTimeout(() => {
      this.stopConveyorHum();
    }, 400);
  }

  /**
   * Success Delivery: Authentic "KA-CHING" Cash Register Bell
   */
  public playSuccessDelivery() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Metallic latch clack
    const oscClick = this.ctx.createOscillator();
    const gainClick = this.ctx.createGain();
    oscClick.type = 'square';
    oscClick.frequency.setValueAtTime(200, now);
    gainClick.gain.setValueAtTime(0.4, now);
    gainClick.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    oscClick.connect(gainClick);
    gainClick.connect(this.ctx.destination);
    oscClick.start(now);
    oscClick.stop(now + 0.06);

    // High Cash Register Bell Chime (C6 & E6)
    [1046.5, 1318.5, 1567.98].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.05 + idx * 0.04);

      gain.gain.setValueAtTime(0, now + 0.05 + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.05 + idx * 0.04 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05 + idx * 0.04 + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + 0.05 + idx * 0.04);
      osc.stop(now + 0.05 + idx * 0.04 + 0.5);
    });
  }

  /**
   * Failure / Trash: Comical "Sad Trombone" SFX (wa-wa-wa-waaa)
   */
  public playWrongDelivery() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [293.66, 277.18, 261.63, 246.94]; // D4, C#4, C4, B3
    const durations = [0.22, 0.22, 0.22, 0.55];

    let timeOffset = 0;
    notes.forEach((freq, idx) => {
      const dur = durations[idx];
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + timeOffset);

      if (idx === 3) {
        // Pitch bend down on final note
        osc.frequency.linearRampToValueAtTime(220, now + timeOffset + dur);
      }

      gain.gain.setValueAtTime(0.3, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.01, now + timeOffset + dur);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + dur);

      timeOffset += dur + 0.03;
    });
  }

  public playTrashScrap() {
    this.playWrongDelivery();
  }

  /**
   * Jaunty Purble Place Bakery BGM Synthesizer
   */
  public startBGM() {
    if (this.isMuted || this.bgmInterval) return;

    // Upbeat jaunty notes melody in F major
    const melody = [
      349.23, 440.00, 523.25, 440.00, 349.23, 440.00, 523.25, 587.33,
      659.25, 587.33, 523.25, 440.00, 349.23, 392.00, 440.00, 349.23
    ];

    this.bgmStep = 0;
    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted) {
        this.stopBGM();
        return;
      }
      this.initCtx();
      if (!this.ctx) return;

      const freq = melody[this.bgmStep % melody.length];
      this.bgmStep++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.22);
    }, 280);
  }

  public stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const audioSynth = new SoundEffectsEngine();
