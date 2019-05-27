import Wibbo from '../Wibbo';
import SoundType from './SoundType';

export default class Sound {
    private _id: number;
    private _name: string;

    private _instance: HTMLAudioElement;
    private _loop: boolean;
    private _volume: number;
    private _type: SoundType;

    constructor(id: number, name: string, type: SoundType, loop: boolean) {
        this._id = id;
        this._name = name;

        this._instance = new Audio("./sounds/" + name + ".mp3");
        this._loop = loop;
        this._volume = 1;
        this._type = type;
    }

    public get name() {
        return this._name;
    }

    public set type(value: SoundType) {
        this._type = value;
    }
    public get type() {
        return this._type;
    }

    public get id(): number {
        return this._id;
    }

    public set volume(value: number) {
        this._volume = Math.min(Math.max(0, value), 1.0);

        if (this._instance)
            this._instance.volume = this._volume;
    }
    public get volume(): number {
        return this._volume;
    }

    public set loop(value: boolean) {
        this._loop = value;
    
        if (this._instance)
          this._instance.loop = value;
    }
    public get loop() {
        return this._loop;
    }

    public stop() {
        this._instance.pause();
        this._instance.volume = 0;
        this._instance.currentTime = 0;

        this.end();
    }

    public play() {
        this._instance.load();
        this._instance.loop = this.loop;
        this._instance.play();

        this._instance.onended = this.end.bind(this);
    }

    private end() {
        Wibbo.GetSoundManager().endSound(this._id);
    }
}