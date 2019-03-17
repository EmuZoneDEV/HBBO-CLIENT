import Vue from 'vue';
import Wibbo from '../../../Wibbo';

export default Vue.component('settings-box', {
    template: `

            <div v-if="data.connected" v-show="data.settings_box && data.in_room" class="box" style="width: 340px;left: 200px;top: 200px;" movebox>
                <div class="box_head" v-draggable>
                <div class="box_croix" v-on:click="Close"></div>
                Paramètres avancée
                </div>
                <div class="box_body">
                    <div class="box_form">
                    <div class="box_field">
                        <input name="setspeed" v-bind:value="setspeed" type="text" class="box_input_number"/>
                        <p>Vitesse de roullement des rollers : {{ setspeed }}</p>
                        </div>

                        <div class="box_field">
                        <label for="titre">Titre</label>
                        <input name="titre" type="text" class="box_input" />
                        </div>

                        <div class="box_field">
                        <label for="desc">Description</label>
                        <textarea name="desc" class="box_textarea"></textarea>
                        </div>

                        <div class="box_field">
                        <label for="troc">Troc</label>
                        <select name="troc" id="troc">
                            <option value="france">Troc interdit</option>
                            <option value="espagne">Troc autoriser</option>
                            <option value="italie">Troc je sais pas quoi mettre ici</option>
                        </select>
                        </div>

                        <div class="box_field">
                        <input type="checkbox" name="vehicle" value="Bike" class="box_checkbox"> I have a bike
                        </div>
                    </div>
                </div>
		    </div>
            
            `,

    data: function () {
        return {
            data: Wibbo.GetStore(),
            setspeed: 0
        }
    },

    methods: {
        Close: function () {
            Wibbo.GetStore().settings_box = false;
        }


    }
});