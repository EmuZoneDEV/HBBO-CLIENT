import Wibbo from "../../Wibbo";
import MoveAvatarComposer from "../../networking/composers/handshake/MoveAvatarComposer";

export default class MoveKeyBoard {
  private _left: boolean;
  private _right: boolean;
  private _up: boolean;
  private _down: boolean;

  private X: number;
  private Y: number;

  constructor() {
    this.X = 0;
    this.Y = 0;
    this._up = false;
    this._down = false;
    this._left = false;
    this._right = false;

    document.addEventListener("keydown", this.OnPress.bind(this));
    document.addEventListener("keyup", this.OnDown.bind(this));

    setInterval(this.CheckDirection.bind(this), 250);
  }

  private CheckDirection() {
    let oldX: number = this.X;
    let oldY: number = this.Y;

    this.Y = 0;
    this.X = 0;

    if (
      this._up &&
      this._right == false &&
      this._left == false &&
      this._down == false
    ) {
      this.X = -1;
      this.Y = -1;
    } else if (
      this._up == false &&
      this._right &&
      this._left == false &&
      this._down == false
    ) {
      this.X = 1;
      this.Y = -1;
    } else if (
      this._up == false &&
      this._right == false &&
      this._left &&
      this._down == false
    ) {
      this.X = -1;
      this.Y = 1;
    } else if (
      this._up == false &&
      this._right == false &&
      this._left == false &&
      this._down
    ) {
        this.X = 1;
        this.Y = 1;
    } else if (
      this._up &&
      this._right &&
      this._left == false &&
      this._down == false
    )
      this.Y = -1;
    else if (
      this._up &&
      this._right == false &&
      this._left &&
      this._down == false
    )
      this.X = -1;
    else if (
      this._up == false &&
      this._right &&
      this._left == false &&
      this._down
    )
      this.X = 1;
    else if (
      this._up == false &&
      this._right == false &&
      this._left &&
      this._down
    )
      this.Y = 1;
    else {
      this.X = 0;
      this.Y = 0;
    }

    if (oldX == this.X && oldY == this.Y) return;

    //Envoyer la nouvelle direction
    Wibbo.GetWebSocketManager().SendPacket(new MoveAvatarComposer(this.X, this.Y));
  }

  private OnDown(e: KeyboardEvent) {
    if (e.keyCode == 38) this._up = false;
    else if (e.keyCode == 40) this._down = false;
    else if (e.keyCode == 37) this._left = false;
    else if (e.keyCode == 39) this._right = false;
  }

  private OnPress(e: KeyboardEvent) {
    if (e.keyCode == 38) this._up = true;
    else if (e.keyCode == 40) this._down = true;
    else if (e.keyCode == 37) this._left = true;
    else if (e.keyCode == 39) this._right = true;
  }
}
