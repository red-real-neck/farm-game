export class AudioController {
  private static instance: AudioController;
  private _context: AudioContext;
  private _gainNode: GainNode;
  click;

  private constructor() {}
  static getInstance() {
    if (!AudioController.instance) {
      AudioController.instance = new AudioController();
    }
    return AudioController.instance;
  }

  createContext() {
    this._context = new AudioContext();
    this._gainNode = this._context.createGain();
    this._gainNode.connect(this._context.destination);
    this._gainNode.gain.value = 0.05;
    this.createSound("./sounds/dirt.mp3", "dirt");
    this.createSound("./sounds/music.mp3", "music");
    this.createSound("./sounds/ambient.mp3", "ambient");
    this.createSound("./sounds/cash.mp3", "cash");
    this.createSound("./sounds/click.mp3", "click");
    this.createSound("./sounds/cow.mp3", "cow");
    this.createSound("./sounds/chicken.mp3", "chicken");
    this.createSound("./sounds/wheat.mp3", "wheat");
  }

  createSound(path: string, name: string) {
    this[name] = new Audio();
    this[name].src = path;
    const source = this._context.createMediaElementSource(this[name]);

    this[name].addEventListener("canplay", () => {
      source.connect(this._gainNode);
    });
  }

  playSound(name: string) {
    const audio: HTMLAudioElement = this[name];
    if (!audio) debugger;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }
}
