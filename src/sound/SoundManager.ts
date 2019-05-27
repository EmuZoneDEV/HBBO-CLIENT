import Sound from './Sound';
import Logger from '../util/Logger';
import SoundType from './SoundType';

export default class SoundManager {
    private _tracks: { id: number, sound: Sound }[];
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
            track.sound.volume = this._getVolume(track.sound.type);
        }
    }

    private _getId(): number {
        for (var i = 0; i < this._tracks.length; i++) {
            if(this._tracks.filter(x => x.id === i).length != 0)
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

    public playSound(name: string, type: SoundType, loop: boolean) {
        let Id: number = this._getId();
        let newSound = new Sound(Id, name, type, loop);
        this._tracks.push({ id: Id, sound: newSound });

        newSound.play();
        newSound.volume = this._getVolume(type);

        Logger.Log("Play Sound: " + Id);
    }

    public stopSound(name?: string) {
        if(this._tracks.length == 0)
            return;

        Logger.Log("Stop count: " + this._tracks.length);

        let deleteTrack = Array();
        for(let track of this._tracks) {
            if(name && name != track.sound.name)
                continue;
                
            deleteTrack.push(track);
        }

        for(let track of deleteTrack) {
            track.sound.stop();
        }

        deleteTrack.splice(0, deleteTrack.length); //Clean
    }

    public endSound(id: number) {
        let track = this._tracks.filter(x => x.id === id);
        if (track.length == 0)
           return;

        for (let i = 0; i < this._tracks.length ; i++) {
            if(this._tracks[i].id == id) {
                this._tracks.splice(i, 1);
                break;
            }
        }
    }
}