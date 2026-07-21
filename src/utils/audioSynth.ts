/**
 * Authentic Purble Place Web Audio Synthesizer (Exact Video Specification Edition)
 * Generates tactile skeuomorphic arcade & factory audio effects:
 * - Mechanical Thunk: Heavy rubber/metal impact on green floor button press
 * - Plastic Pop: Tactile button snap with organic pitch variation
 * - Pneumatic Nozzle Whirr & Piping Squeaks
 * - Liquid Sloshing & Cream Squirts for Batter, Filling, and Icing
 * - Box Wrap SFX: Slide & tape snap sound when gift box covers completed cake
 * - Xylophone Victory Jingle: Bright wooden mallet glissando on order match
 * - Comical Pitch-Bending "Sad Trombone" & Trash Scrap SFX on mistake
 * - Motor Hum: 300ms mechanical whirr during belt stepping
 * - Jaunty Bakery BGM Loop
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

  private varyPitch(baseFreq: number, maxVariancePercent = 0.07): number {
    const factor = 1 + (Math.random() * 2 - 1) * maxVariancePercent;
    return baseFreq * factor;
  }

  /**
   * Tactile Plastic Pop Button Click (Counter Option Buttons)
   */
  public playClickPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const baseFreq = this.varyPitch(480);

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.3, now + 0.04);
    gain1.gain.setValueAtTime(0.45, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.04);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(baseFreq * 0.4, now);
    osc2.frequency.linearRampToValueAtTime(110, now + 0.03);
    gain2.gain.setValueAtTime(0.2, now);
    gain2.gain.exponentialRampToValueAtTime(0.005, now + 0.03);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.03);
  }

  /**
   * Heavy Mechanical Thunk (Green Circular Floor Belt Buttons)
   */
  public playMechanicalThunk() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Heavy Rubber/Metal Impact Thud
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(this.varyPitch(160), now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);

    // Spring clunk transient
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(this.varyPitch(320), now);
    osc2.frequency.exponentialRampToValueAtTime(90, now + 0.06);
    gain2.gain.setValueAtTime(0.3, now);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.06);
  }

  /**
   * Pneumatic Machine Nozzle Lowering/Retracting Whirr
   */
  public playNozzleWhirr(isLowering: boolean = true) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    const startFreq = isLowering ? this.varyPitch(600) : this.varyPitch(300);
    const endFreq = isLowering ? startFreq * 0.5 : startFreq * 2.0;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.12);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  /**
   * Station 0: Vertical Pan Drop & Impact Bounce
   */
  public playPanDrop() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(this.varyPitch(340), now);
    osc1.frequency.exponentialRampToValueAtTime(90, now + 0.18);
    gain1.gain.setValueAtTime(0.5, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.18);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(this.varyPitch(780), now + 0.02);
    osc2.frequency.exponentialRampToValueAtTime(400, now + 0.14);
    gain2.gain.setValueAtTime(0.2, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.005, now + 0.14);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.02);
    osc2.stop(now + 0.14);
  }

  /**
   * Station 1: Liquid Batter Glug & Squirt SFX
   */
  public playBatterDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    const startF = this.varyPitch(160);
    osc.frequency.setValueAtTime(startF, now);
    osc.frequency.linearRampToValueAtTime(startF * 2.2, now + 0.12);
    osc.frequency.linearRampToValueAtTime(startF * 1.3, now + 0.28);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Station 2: Creamy Filling Dispense Squeeze
   */
  public playFillingDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startF = this.varyPitch(380);
    osc.frequency.setValueAtTime(startF, now);
    osc.frequency.exponentialRampToValueAtTime(startF * 1.8, now + 0.2);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  /**
   * Station 3: Piping Icing Swoop & Rotating Squeak SFX
   */
  public playIcingDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Swoop Squeak Tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const startF = this.varyPitch(580);
    osc.frequency.setValueAtTime(startF, now);
    osc.frequency.linearRampToValueAtTime(startF * 1.7, now + 0.14);
    osc.frequency.linearRampToValueAtTime(startF * 1.2, now + 0.28);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Station 4: Topping Shaker Drop & Plop SFX
   */
  public playToppingDispense() {
    this.playClickPop();
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startF = this.varyPitch(880);
    osc.frequency.setValueAtTime(startF, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.14);

    gain.gain.setValueAtTime(0.42, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Station 5: Gift Box Wrap Slide & Ribbon Tape SFX
   */
  public playBoxWrapSFX() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Cardboard Box Drop Friction Slide
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.28);

    // Ribbon Snap Tape Tone
    const oscTape = this.ctx.createOscillator();
    const gainTape = this.ctx.createGain();
    oscTape.type = 'sine';
    oscTape.frequency.setValueAtTime(950, now + 0.15);
    oscTape.frequency.exponentialRampToValueAtTime(1400, now + 0.28);
    gainTape.gain.setValueAtTime(0.3, now + 0.15);
    gainTape.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    oscTape.connect(gainTape);
    gainTape.connect(this.ctx.destination);
    oscTape.start(now + 0.15);
    oscTape.stop(now + 0.3);
  }

  /**
   * Victory Jingle: Bright Wooden Mallet Xylophone Glissando (Order Match)
   */
  public playXylophoneVictory() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Xylophone scale (C5, E5, G5, C6, E6, G6)
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.06;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Sharp wooden mallet hit transient
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.45, startTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  /**
   * 300ms Motor Hum during Conveyor Belt Steps
   */
  public startConveyorHum() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx || this.conveyorOsc) return;

    const now = this.ctx.currentTime;
    this.conveyorOsc = this.ctx.createOscillator();
    this.conveyorGain = this.ctx.createGain();

    this.conveyorOsc.type = 'sawtooth';
    this.conveyorOsc.frequency.setValueAtTime(75, now);
    this.conveyorGain.gain.setValueAtTime(0.08, now);

    this.conveyorOsc.connect(this.conveyorGain);
    this.conveyorGain.connect(this.ctx.destination);

    this.conveyorOsc.start(now);
  }

  public stopConveyorHum() {
    if (this.conveyorOsc && this.ctx) {
      const now = this.ctx.currentTime;
      try {
        this.conveyorGain?.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        this.conveyorOsc.stop(now + 0.06);
      } catch (e) {
        // ignore
      }
      this.conveyorOsc = null;
      this.conveyorGain = null;
    }
  }

  public playConveyorStep() {
    this.playMechanicalThunk();
    this.startConveyorHum();
    setTimeout(() => {
      this.stopConveyorHum();
    }, 320);
  }

  /**
   * Success Delivery: Cash Register Bell + Xylophone
   */
  public playSuccessDelivery() {
    this.playBoxWrapSFX();
    setTimeout(() => {
      this.playXylophoneVictory();
    }, 250);
  }

  /**
   * Failure / Trash: Comical "Sad Trombone" SFX
   */
  public playWrongDelivery() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [293.66, 277.18, 261.63, 246.94];
    const durations = [0.2, 0.2, 0.2, 0.55];

    let timeOffset = 0;
    notes.forEach((freq, idx) => {
      const dur = durations[idx];
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + timeOffset);

      if (idx === 3) {
        osc.frequency.linearRampToValueAtTime(205.0, now + timeOffset + dur);
      }

      gain.gain.setValueAtTime(0.35, now + timeOffset);
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

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
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
