export default class DraggableManager {
        private isDragging: boolean = false;
        private mouseDown = false;
        private currentlyDragging: HTMLElement | null;
        private OldX = 0;
        private OldY = 0;

        constructor() {
            document.addEventListener('mousemove', this.onMouseMove.bind(this));
            document.addEventListener('mouseup', this.onMouseUp.bind(this));
            this.currentlyDragging = null;
        }

        public onMouseDown(el: HTMLElement, evt: MouseEvent) {

            let current: HTMLElement = <HTMLElement>el;
            while (current.parentElement){
                current = <HTMLElement>current.parentElement;
                
                if(current.attributes.getNamedItem("movebox"))
                    break;
            }

            this.currentlyDragging = <HTMLElement>current;
            this.mouseDown = true;

            let posX = evt.clientX;
            let posY = evt.clientY;
            let divTop = parseInt((<string>this.currentlyDragging.style.top).replace('px', ''));
            let divLeft = parseInt((<string>this.currentlyDragging.style.left).replace('px', ''));

            this.OldX = posX - divLeft;
            this.OldY = posY - divTop;
        }

        private onMouseUp() {
            this.isDragging = false;
            this.mouseDown = false;
        }

        private onMouseMove(event: MouseEvent) {

            if (!this.mouseDown)
                return;

            if (!this.isDragging) {
                this.isDragging = true;
                return;
            }

            if(this.currentlyDragging == null)
                return;

            let eWi: number = this.currentlyDragging.offsetWidth;
            let eHe: number = this.currentlyDragging.offsetHeight;
            let cWi: number = window.innerWidth || (document != null && document.documentElement != null && document.documentElement.clientWidth) || document.body.clientWidth;
            let cHe: number = window.innerHeight || (document != null && document.documentElement != null && document.documentElement.clientHeight) || document.body.clientHeight;

            let posX: number = event.clientX;
            let posY: number = event.clientY;
            let aX: number = posX - this.OldX;
            let aY: number = posY - this.OldY;


            if (aX <= 0) aX = 0;
            if (aY <= 0) aY = 0;
            if (aX + eWi >= cWi) aX = cWi - eWi - 1;
            if (aY + eHe >= cHe) aY = cHe - eHe - 1;

            this.currentlyDragging.style.left = aX + "px";
            this.currentlyDragging.style.top = aY + "px";
        }
}