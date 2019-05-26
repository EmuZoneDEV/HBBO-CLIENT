import Wibbo from "../../Wibbo";
import MoveAvatarComposer from "../../networking/composers/handshake/MoveAvatarComposer";

export default class MoveGamePad {
  private _left: boolean;
  private _right: boolean;
  private _up: boolean;
  private _down: boolean;

  private X: number;
  private Y: number;

  private haveEvents = "GamepadEvent" in window;
  private controllers: (Gamepad | null)[] = [];

  constructor() {
    this.X = 0;
    this.Y = 0;
    this._up = false;
    this._down = false;
    this._left = false;
    this._right = false;

    (<any>window).addEventListener("gamepadconnected", this.connecthandler.bind(this));
    (<any>window).addEventListener("gamepaddisconnected", this.disconnecthandler.bind(this));
    setInterval(this.scangamepads, 1000);
    setInterval(this.CheckDirection.bind(this), 250);
  }

  private scangamepads() {
    let gamepads = navigator.getGamepads ? navigator.getGamepads(): [];
    if(gamepads == null || this.controllers == null)
        return;

    for (let i = 0; i < gamepads.length; i++) {
        let gamepad = gamepads[i];

        if(gamepad == null)
            continue;

        if (!(gamepad.index in this.controllers)) {
          this.addgamepad(gamepad);
        } else {
          this.controllers[gamepad.index] = gamepad;
        }
    }
  }

  private connecthandler(evt: GamepadEvent): void {

    this.addgamepad(evt.gamepad);
  }

  private addgamepad(gamepad: Gamepad): void {
    this.controllers[gamepad.index] = gamepad;

    console.log("Ajout Gamepad");

    requestAnimationFrame(this.updateStatus.bind(this));
  }

  private disconnecthandler(e: GamepadEvent): void {
    this.removegamepad(e.gamepad);
  }

  private removegamepad(gamepad: Gamepad) {
    delete this.controllers[gamepad.index];

    console.log("Suppression Gamepad");
  }

  private updateStatus() {
    if (!this.haveEvents) {
      this.scangamepads();
    }

    this._up = false;
    this._down = false;
    this._left = false;
    this._right = false;

    for (let j in this.controllers) {
      let controller = this.controllers[j];
      if (controller == null) continue;

      for (let i = 0; i < controller.buttons.length; i++) {
        let btnval = controller.buttons[i];
        let pressed = btnval.value == 1.0;
        let val = 0;

        if (typeof btnval == "object") {
          pressed = btnval.pressed;
          val = btnval.value;
        }

        if (pressed) {
          if (i == 13) this._down = true;
          else if (i == 12) this._up = true;
          else if (i == 14) this._left = true;
          else if (i == 15) this._right = true;
        } else {
          //console.log("button " + i);
        }
      }

      for (let i = 0; i < controller.axes.length; i++) {
        if (i == 0 || i == 2) {
          //Droite Gauche
          if (controller.axes[i] > 0.1) {
            this._right = true;
          }
          if (controller.axes[i] < -0.1) {
            this._left = true;
          }
        }

        if (i == 1 || i == 3) {
          //Haut Bas
          if (controller.axes[i] > 0.1) {
            this._down = true;
          }
          if (controller.axes[i] < -0.1) {
            this._up = true;
          }
        }
      }
    }
    requestAnimationFrame(this.updateStatus.bind(this));
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
    )
    {
        this.X = -1;
        this.Y = -1;
    }
    else if (
      this._up == false &&
      this._right &&
      this._left == false &&
      this._down == false
    )
    {
        this.X = 1;
        this.Y = -1;
    }
    else if (
      this._up == false &&
      this._right == false &&
      this._left &&
      this._down == false
    )
    {
        this.X = -1;
        this.Y = 1;
    }
    else if (
      this._up == false &&
      this._right == false &&
      this._left == false &&
      this._down
    )
      {
        this.X = 1;
        this.Y = 1;
      }
    else if (
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
    else 
    {
        this.X = 0;
        this.Y = 0;
    }

    if (oldX == this.X && oldY == this.Y) return;

    //Envoyer la nouvelle direction
    Wibbo.GetWebSocketManager().SendPacket(new MoveAvatarComposer(this.X, this.Y));
  }
}
