import MoveKeyBoard from './move/MoveKeyBoard';
import MoveGamePad from './move/MoveGamePad';

export default class InteractionManager {
    constructor()
    {
        new MoveKeyBoard();
        new MoveGamePad();
    }   
}