const app = Vue.createApp({
    data() {
        return {
            showBienvenida: false, //Aca cambie a false la bienvenida para que me muestre primero las preguntas = valor original (false)
            showCuestionario: true, //Aca tambien cambie = valor original (true)
            contador: 1,
            datosSeleccionados: [],
            preguntas: [
                {
                    pregunta: "PREGUNTA 1",
                    opciones: [
                        { id: 1, texto: "Orcos" },
                        { id: 2, texto: "Elfos" },
                        { id: 3, texto: "Humanos" },
                        { id: 4, texto: "Muertos" },
                        { id: 5, texto: "Taurens" }
                    ]
                },
                {
                    pregunta: "PREGUNTA 2",
                    opciones: [
                        { id: 1, texto: "Espadas" },
                        { id: 2, texto: "Arcos" },
                        { id: 3, texto: "Flecha" },

                    ]
                },
                {
                    pregunta: "PREGUNTA 3",
                    opciones: [
                        { id: 1, texto: "aire" },
                        { id: 2, texto: "tierra" },
                        { id: 3, texto: "fuego" },

                    ]
                },
            ],
            error: "No selecciono ninguna opcion, seleccione alguna para poder continuar.",
            errorbolean: false
        }
    },

    methods: {
        mostrarCuestionario() {
            this.showBienvenida = false;
            this.showCuestionario = true;
        },

        incrementar(){
            if(this.datosSeleccionados[this.contador - 1]){
                this.contador++
                this.errorbolean = false
            } else {
                this.errorbolean = true
            }
        },

        decrementar(){
            if(this.datosSeleccionados[this.contador - 1]){
                this.contador--
                this.errorbolean = false
            } else {
                this.errorbolean = true
            }
        },

        capturarValor(){

        },

        capturorespuesta(nombre){
            console.log(nombre)
            this.datosSeleccionados[this.contador - 1] = nombre
            //console.log(this.datosSeleccionados[this.contador - 1])
            console.log(this.datosSeleccionados)
        },
    }
})

app.component(`componente-bienvenida`, {
    data() {
        return {
            titulo: "Hola Mundo",
            parrafo: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero voluptates, omnis repellat quod voluptatem molestiae reprehenderit quasi vitae cupiditate doloremque suscipit dolorum minima assumenda veritatis nostrum ex quisquam dicta libero.",
            boton: "Comenzar"
        }
    },

    template: `
        <div class="col-12 p-5">
            <h1>{{titulo}}</h1>
            <p>{{parrafo}}</p>
            <button class="btn btn-primary" @click="$emit('comenzar')">{{boton}}</button>
        </div>
    `,

    methods: {
        
    }
    
})

app.component(`componente-cuestionario`, {
    //props: ['contador', 'preguntas', 'datosSeleccionados'], // Define el prop 'contador'
    //emits: ['incrementar', 'decrementar', 'capturarValor'], // Define los eventos personalizados que emite el componente
    props: ['contador', 'preguntas', 'datosSeleccionados', 'error', 'errorbolean'], 
    emits: ['incrementar', 'decrementar', 'capturarValor', 'capturorespuesta', 'capturarvalor'],

    data(){
        return{
            next: "siguiente",
            prev: "anterior",
        }
    },

    template: `

    <div>
        <div class="mt-5" v-for="(item, index) in preguntas.slice((contador-1), contador)" :key="index"> 
            
            {{item.pregunta}} 

            <div v-for="(subItem) in item.opciones" class="d-flex justify-content-center">
                <label :for="subItem.texto">{{subItem.texto}}
                    <input 
                        type="radio" 
                        :value="subItem.texto" 
                        :name="'group_' + index" 
                        :id="subItem.texto" 
                        @click="$emit('capturorespuesta', subItem.texto)
                    ">
                </label>
            </div>
            
        </div>

        <div v-if="errorbolean" class="mt-4">
            <p class="text-center">{{error}}</p>
        </div>

        <div class="position-relative">
            <button class="position-absolute start-0 btn btn-danger m-3" @click="$emit('decrementar')" v-if="contador !== 1">{{prev}}</button>
            <button class="position-absolute end-0 btn btn-primary m-3" @click="$emit('incrementar')" v-if="contador <= 2">{{next}}</button>
        </div>
    </div>



    `,

    methods: {
        


    }
})

app.mount("#app")
