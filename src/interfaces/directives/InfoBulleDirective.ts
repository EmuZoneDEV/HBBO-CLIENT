import Vue, { VNodeDirective } from 'vue';
import InfoBulleManager from './InfoBulleManager';

export default class InfoBulleDirective {

    private static _draggableManager: InfoBulleManager;

    public static Register() {

        InfoBulleDirective._draggableManager = new InfoBulleManager();


        let ShowInfoBulle: boolean = false;
        let InfoBulleMessage: string = "";

        document.addEventListener('mousemove', mouvebulle);

        function mouvebulle(event: MouseEvent) {

            if (!ShowInfoBulle)
                return;

            let posX: number = event.clientX + 20;
            let posY: number = event.clientY + 10;
            let Bulle: HTMLElement = <HTMLElement>document.getElementById("infobulle");
            Bulle.style.left = posX + "px";
            Bulle.style.top = posY + "px";
        }

        let onMouseOver = function (message: string, evt: MouseEvent) {
            if (!ShowInfoBulle) {
                ShowInfoBulle = true;
                let Bulle: HTMLElement = <HTMLElement>document.getElementById("infobulle");
                Bulle.style.display = "inline";
            }
            if (InfoBulleMessage != message) {
                InfoBulleMessage = message;
                let Bulle: HTMLElement = <HTMLElement>document.getElementById("infobulle");
                Bulle.innerHTML = InfoBulleMessage;
            }
        }

        let onMouseOut = function () {
            if (!ShowInfoBulle)
                return;
            ShowInfoBulle = false;
            let Bulle: HTMLElement = <HTMLElement>document.getElementById("infobulle");
            Bulle.style.display = "none";
        }

        Vue.directive('infobulle', {

            bind: function (el: HTMLElement, binding: VNodeDirective) {
                el.addEventListener('mouseover', onMouseOver.bind(InfoBulleDirective._draggableManager, binding.value));
                el.addEventListener('mouseout', onMouseOut);
            },

            update: function(el: HTMLElement, binding: VNodeDirective) {
                el.removeEventListener('mouseover', onMouseOver.bind(InfoBulleDirective._draggableManager, ""));
                el.removeEventListener('mouseout', onMouseOut);

                el.addEventListener('mouseover', onMouseOver.bind(InfoBulleDirective._draggableManager, binding.value));
                el.addEventListener('mouseout', onMouseOut);
            },

            unbind: function (el: HTMLElement) {
                el.removeEventListener('mouseover', onMouseOver.bind(InfoBulleDirective._draggableManager, ""));
                el.removeEventListener('mouseout', onMouseOut);
            }
        })

    }

}