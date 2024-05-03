const app = Vue.createApp({
    data() {
        return {
            showBienvenida: true, //Aca cambie a false la bienvenida para que me muestre primero las preguntas = valor original (false)
            showCuestionario: false, //Aca tambien cambie = valor original (true)
            contador: 1,
            datosSeleccionados: [],
            preguntas: [
                {
                    pregunta: "Con cuál de las siguientes facciones te identificas mejor?",
                    opciones: [
                        { id: 1, texto: "Horda" },
                        { id: 2, texto: "Alianza" },
                    ]
                },
                {
                    pregunta: "¿En una batalla, cuál sería tu rol ideal?",
                    opciones: [
                        { id: 1, texto: "Sanador" },
                        { id: 2, texto: "Taque" },
                        { id: 3, texto: "DPS (Daño por segundo)" },
                    ]
                },
                {
                    pregunta: "PREGUNTA 3",
                    opciones: [
                        { id: 1, texto: "aire" },
                        { id: 2, texto: "tierra" },
                        { id: 3, texto: "fuego" },

                    ],
                    preguntaDPS: "De qué manera te gustaría infligir daño",
                    opcionesDPS: [
                        { id: 1, texto: "A distancia con armas de fuego." },
                        { id: 2, texto: "A distancia con potentes echizos." },
                        { id: 3, texto: "En combate cuerpo a cuerpo con poderosos ataques." },

                    ],
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
            titulo: "El 21 de mayo de 2024, llega una nueva era de Cataclysm",
            parrafo: "¡ Realiza nuestro test para saber que clase es la indicada para ti !",
            boton: "Comenzar"
        }
    },

    template: `
        <section class="fondo-inicio col-5">
            <div class="p-5 text-center">
                <img src="./img/logo.avif" alt="logo del wow" class="img-fluid">
                <h1 class="mt-5">{{titulo}}</h1>
                <p class="parrafo-inicio"> {{parrafo}}</p>
                <button class=" boton-inicio" @click="$emit('comenzar')">{{boton}}</button>
            </div>
        </section>
        <video autoplay muted loop  class="fondo-video">
            <source src="./video/videoInicio.webm" type="video/mp4">
            Tu navegador no admite la etiqueta de video.
        </video>
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

    <div class="fondo-preguntas">
        <div class="mt-5" v-for="(item, index) in preguntas.slice((contador-1), contador)" :key="index"> 
            <p class="text-center pregunta-preguntas">
                {{item.pregunta}} 
            </p>
            <span class="posicion-preguntas">
    pregunta {{contador}}/10
            </span>

            <div class="d-flex align-items-center justify-content-center">
                <template v-for="(subItem) in item.opciones">
                    <input class="btn-check"
                            type="radio" 
                            :value="subItem.texto" 
                            :name="'group_' + index" 
                            :id="subItem.texto" 
                            @click="$emit('capturorespuesta', subItem.texto)
                    ">
                    <label :for="subItem.texto" class="btn m-5 boton-preguntas btn">
                        {{subItem.texto}}
                    </label>
                </template>
            </div>
            
            
        </div>

        <div v-if="errorbolean" class="mt-4">
            <p class="text-center error-pregunta">{{error}}</p>
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
