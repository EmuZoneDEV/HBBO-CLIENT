import Sound from './Sound';
import Logger from '../util/Logger';
import { SoundType } from './SoundType';

export default class SoundManager {
    private _tracks: Sound[];
    private _volume: number[];

    constructor() {
        this._tracks = Array();
        this._volume = Array(3);
        this.setVolume(1, 1, 1);
    }

    public setVolume(systeme: number, furni: number, trax: number) {
        this._volume[0] = systeme;
        this._volume[1] = furni;
        this._volume[2] = trax;

        for(let track of this._tracks) {
            track.volume = this._getVolume(track.type);
        }
    }

    private _getId(): number {
        for (var i: number = 0; i < this._tracks.length; i++) {
            if(this._tracks.hasOwnProperty(i))
                continue;

            return i;
        }

        return this._tracks.length;
    }

    private _getVolume(type: SoundType) {
        switch(type) {
            case SoundType.SYSTEME:
                return this._volume[0];
            case SoundType.FURNI:
                return this._volume[1];
            case SoundType.TRAX:
                return this._volume[2];
        }

        return 1;
    }

    public playSound(url: string, type: SoundType) {
        let id = this._getId();
        let newSound = new Sound(id, url, type);
        this._tracks[id] = newSound;

        newSound.play();
        newSound.volume = this._getVolume(type);

        Logger.Log("Play Sound: " + id);
    }

    public playSoundTrack(num: number) {
        this.playSound("https://swf.wibbo.me/dcr/dcr/hof_furni2/mp3/sound_machine_sample_" + num + ".mp3", SoundType.TRAX);
    }

    public stopSound() {
        for(let track of this._tracks) {
            track.stop();
        }
    }

    public endSound(id: number) {
        Logger.Log("End Sound: " + id);

        if(!this._tracks.hasOwnProperty(id))
            return;

        this._tracks.splice(id, 1);
    }
}