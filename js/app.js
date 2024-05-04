const app = Vue.createApp({
    data() {
        return {
            showBienvenida: false, //Aca cambie a false la bienvenida para que me muestre primero las preguntas = valor original (false)
            showCuestionario: false, //Aca tambien cambie = valor original (true)
            showFinal: true,
            contador: 1,
            datosseleccionados: {id: "1", funcion: "sanador"},  
            error: "No selecciono ninguna opcion, seleccione alguna para poder continuar.",
            errorbolean: false,
            resultadoFinal: [],
            preguntas: [
                {
                    pregunta: "¿Con cuál de las siguientes facciones te identificas mejor?",
                    opciones: [
                        { id: 1, texto: "Horda" },
                        { id: 2, texto: "Alianza" },
                    ]
                },
                {
                    pregunta: "¿En una batalla, cuál sería tu rol ideal?",
                    opciones: [
                        { id: 1, texto: "sanador" },
                        { id: 2, texto: "tanque" },
                        { id: 3, texto: "ofensivo" },
                    ]
                },
                {
                    preguntaofensivo: "¿De qué manera te gustaría infligir daño?",
                    opcionesofensivo: [
                        { id: 1, texto: "A distancia con armas de fuego." },
                        { id: 2, texto: "A distancia con potentes echizos." },
                        { id: 3, texto: "En combate cuerpo a cuerpo con poderosos ataques." },

                    ],

                    preguntatanque: "¿Qué tipo de tanque te gustaría ser en la batalla?",
                    opcionestanque: [
                        { id: 1, texto: "Formidable y temerario, con grandes cantidades de daño a su disposición." },
                        { id: 2, texto: "Resistente y duradero, capaz de soportar una gran cantidad de ataques enemigos." },
                        { id: 3, texto: "Inquebrantable y protector, con la fuerza necesaria para defender, curar y potenciar a su equipo." },

                    ],

                    preguntasanador: " ¿Qué tipo de sanador te gustaría ser en la batalla?",
                    opcionessanador: [
                        { id: 1, texto: "Sanador de curación directa, manteniendo con vida en situaciones críticas." },
                        { id: 2, texto: "Sanador versátil, capaz de curar, potenciar y brindar soporte al equipo." },
                        { id: 3, texto: "Sanador resistente, capaz de curar en área a todo el equipo." },
                    ],
                }
            ],
            clases: [
                {
                    id: "1",
                    funcion: "sanador",
                    nombre: "druida",
                    rol: "Tanque, Sanador, Daño",
                    descripcion: "Los druidas poseen una gran variedad de estilos de combate. Pueden llevar a cabo todos los roles: sanación, tanqueo, daño cuerpo a cuerpo y daño a distancia. Es vital que los druidas adopten la forma adecuada para cada situación ya que cada forma conlleva un propósito diferente.",
                    img: "./img/logo/druida.avif",
                    alt: "imagen de un druida"
                },
                {
                    id: "2",
                    funcion: "sanador",
                    nombre: "Paladin",
                    rol: "Tanque, Sanador, Daño",
                    descripcion: "asehasheashashea.",
                    img: "./img/logo/druida.avif",
                    alt: "imagen de un druida"
                }
            ]
        }
    },

    methods: {
        mostrarCuestionario() {
            this.showBienvenida = false;
            this.showCuestionario = true;
        },

        resultado(){
            this.showBienvenida = false;
            this.showCuestionario = false;
            this.showFinal = true
            this.resultadoFinal.id = this.datosseleccionados[2]
            this.resultadoFinal.funcion = this.datosseleccionados[1]
            console.log(this.resultadoFinal)
        },

        incrementar(){
            if(this.datosseleccionados[this.contador - 1]){
                this.contador++
                this.errorbolean = false
            } else {
                this.errorbolean = true
            }
        },

        decrementar(){
            if(this.datosseleccionados[this.contador - 1]){
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
            this.datosseleccionados[this.contador - 1] = nombre
            //console.log(this.datosSeleccionados[this.contador - 1])
            console.log(this.datosseleccionados)
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
    props: ['contador', 'preguntas', 'datosseleccionados', 'error', 'errorbolean'], 
    emits: ['incrementar', 'decrementar', 'capturorespuesta', 'resultado'],

    data(){
        return{
            next: "siguiente",
            prev: "anterior",
        }
    },

    template: `

    <div class="fondo-preguntas">
        <div class="mt-5" v-for="(item, index) in preguntas.slice((contador-1), contador)" :key="index"> 
            
                <template v-if="contador >= 3">
                    <template v-if="contador >= 3 && datosseleccionados[1] === 'ofensivo'">
                        <p class="text-center pregunta-preguntas">
                            {{ item.preguntaofensivo }}
                        </p>
                    </template>
                    <template v-if="contador >= 3 && datosseleccionados[1] === 'tanque'">
                        <p class="text-center pregunta-preguntas">
                            {{ item.preguntatanque }}
                        </p>
                    </template>
                    <template v-if="contador >= 3 && datosseleccionados[1] === 'sanador'">
                        <p class="text-center pregunta-preguntas">
                            {{ item.preguntasanador }}
                        </p>
                    </template>
                </template>
                <template v-else>
                    <p class="text-center pregunta-preguntas">
                        {{ item.pregunta }} 
                    </p>
                </template>
                


                <span class="posicion-preguntas">
                    Pregunta {{contador}}/3
                </span>

                <div class="d-flex align-items-center justify-content-center">


                <!-- CODIGO A EJECUTAR EN CASO DE QUE NO ALLA LLEGADO A LA PREGUNTA 3 
                *
                *
                *                 
                -->

                    <template  v-if="contador <= 2">
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
                    </template>


                <!-- CODIGO A EJECUTAR EN CASO DE QUE ESTE EN LA PREGUNTA 3 Y LA RESPUESTA SEA "Ofensivo" 
                *
                *
                *                 
                -->

                    <template  v-if="contador >= 3 && datosseleccionados[1] === 'ofensivo'">
                        <template v-for="(subItem) in item.opcionesofensivo">
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
                    </template>

                
                <!-- CODIGO A EJECUTAR EN CASO DE QUE ESTE EN LA PREGUNTA 3 Y LA RESPUESTA SEA "tanque" 
                *
                *
                *                 
                -->

                    <template  v-if="contador >= 3 && datosseleccionados[1] === 'tanque'">
                        <template v-for="(subItem) in item.opcionestanque">
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
                    </template>


                <!-- CODIGO A EJECUTAR EN CASO DE QUE ESTE EN LA PREGUNTA 3 Y LA RESPUESTA SEA "sanador" 
                *
                *
                *                 
                -->

                    <template  v-if="contador >= 3 && datosseleccionados[1] === 'sanador'">
                        <template v-for="(subItem) in item.opcionessanador">
                            <input class="btn-check"
                                type="radio" 
                                :value="subItem.id" 
                                :name="'group_' + index" 
                                :id="subItem.id" 
                                @click="$emit('capturorespuesta', subItem.id)
                            ">
                            <label :for="subItem.id" class="btn m-5 boton-preguntas btn">
                                {{subItem.texto}}
                            </label>
                        </template>
                    </template>

                </div>

            
        </div>

        <div v-if="errorbolean" class="mt-4">
            <p class="text-center error-pregunta">{{error}}</p>
        </div>

        <div class="position-relative">
            <button class="position-absolute start-0 btn btn-danger m-3" @click="$emit('decrementar')" v-if="contador !== 1">{{prev}}</button>
            <button class="position-absolute end-0 btn btn-primary m-3" @click="$emit('incrementar')" v-if="contador <= 2">{{next}}</button>
            <button class="position-absolute end-0 btn btn-primary m-3" @click="$emit('resultado')" v-if="contador == 3">FINALIZAR</button>

        </div>
    </div>



    `,

    methods: {
        


    }
})

app.component(`componente-final`, {
    props: ['clases', 'datosseleccionados'], 

    template: `
        <div class="fondo-final"> 
            <template v-for="(item, index) in clases" :key="index">
                <p v-if=((item.id) == )> {{item}}</p>
            </template>
        </div>
    `,

    methods: {
        
    }
    
})
app.mount("#app")
