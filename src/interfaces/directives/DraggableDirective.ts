import Vue from 'vue';
import DraggableManager from './DraggableManager';

export default class DraggableDirective {

    private static _draggableManager: DraggableManager;

    public static Register() {

        DraggableDirective._draggableManager = new DraggableManager();

        Vue.directive('draggable', {

            bind: function (el: HTMLElement) {
                el.addEventListener('mousedown', DraggableDirective._draggableManager.onMouseDown.bind(DraggableDirective._draggableManager, el));
            },

            unbind: function(el: HTMLElement) {
                el.removeEventListener('mouvedown', DraggableDirective._draggableManager.onMouseDown.bind(DraggableDirective._draggableManager, el));
            }
        })

    }

}