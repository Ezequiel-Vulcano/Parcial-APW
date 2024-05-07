const app = Vue.createApp({
    data() {
        return {
            showBienvenida: true, //Aca cambie a false la bienvenida para que me muestre primero las preguntas = valor original (false)
            showCuestionario: false, //Aca tambien cambie = valor original (true)
            showFinal: false,
            contador: 1,
            datosseleccionados: {},
            error: "No selecciono ninguna opcion, seleccione alguna para poder continuar.",
            errorbolean: false,
            final: {},
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
                    img: "../img/logo/druida.avif",
                    alt: "imagen de un druida"
                },
                {
                    id: "2",
                    funcion: "sanador",
                    nombre: "Chaman",
                    rol: "Tanque, Sanador, Daño",
                    descripcion: "Durante el combate, el chamán coloca totems de control y daño en el suelo para maximizar su efectividad y ponerle las cosas más difíciles a los enemigos Los chamanes son lo suficientemente versátiles para luchar contra los enemigos de cerca o a distancia, pero los chamanes sabios eligen su camino de ataque basado en los puntos fuertes y débiles de sus enemigos.",
                    img: "../img/logo/chaman.avif",
                    alt: "imagen de un chaman"
                },
                {
                    id: "3",
                    funcion: "sanador",
                    nombre: "Sacerdote",
                    rol: "Sanador, Daño",
                    descripcion: "Los sacerdotes usan poderosa magia de sanación para asegurarse de que tanto ellos como sus compañeros no son derribados. También controlan poderosos hechizos ofensivos a distancia, pero pueden verse sobrepasados por los enemigos debido a su fragilidad física y a su ligera armadura. Los sacerdotes más experimentados combinan el uso de sus hechizos ofensivos y de control con la importancia de mantener vivo al resto del grupo.",
                    img: "../img/logo/sacerdote.avif",
                    alt: "imagen de un sacerdote"
                },
                {
                    id: "1",
                    funcion: "tanque",
                    nombre: "Guerrero",
                    rol: "Tanque, Daño",
                    descripcion: "Los guerreros se equipan con cuidado para el combate y se enfrentan a sus enemigos de frente, dejando que los ataques resbalen contra su pesada armadura. Usan diversas tácticas de combate y una gran variedad de tipos de armas para proteger a los combatientes menos hábiles. Los guerreros deben controlar cuidadosamente su ira (el poder detrás de sus ataques más fuertes) para maximizar su efectividad en el combate.",
                    img: "../img/logo/guerrero.avif",
                    alt: "imagen de un guerrero"


                },
                {
                    id: "2",
                    funcion: "tanque",
                    nombre: "Caballero de la Muerte",
                    rol: "Tanque, Daño",
                    descripcion: "Los caballeros de la Muerte se enfrentan a sus enemigos de cerca, asestando golpes con sus armas con magia oscura que vuelve a los enemigos vulnerables o les inflige daño con poder oscuro. Arrastran a los enemigos a enfrentamientos uno contra uno, obligándoles a concentrar sus ataques lejos de sus compañeros más débiles. Para evitar que sus enemigos escapen de sus garras, los caballeros de la Muerte deben ser conscientes del poder que invocan de las runas y controlar sus ataques de forma apropiada.",
                    img: "../img/logo/caballeroMuerte.avif",
                    alt: "imagen de un caballero de la muerte"
                },
                {
                    id: "3",
                    funcion: "tanque",
                    nombre: "Paladin",
                    rol: "Tanque, Sanador, Daño",
                    descripcion: "Los paladines se colocan justo delante de sus enemigos, confiando en su pesada armadura y la sanación para poder sobrevivir a una lluvia de ataques. Ya sea con enormes escudos o con aplastantes armas a dos manos, los paladines pueden aguantar zarpas y espadas de sus compañeros más débiles, pero deben usar la magia sanadora con cuidado para asegurarse de que se mantienen en pie.",
                    img: "../img/logo/paladin.avif",
                    alt: "imagen de un paladin"
                },
                {
                    id: "1",
                    funcion: "ofensivo",
                    nombre: "Cazador",
                    rol: "Daño",
                    descripcion: "Desde temprana edad, la llamada de la naturaleza atrae a algunos aventureros desde la comodidad de sus hogares hacia el implacable mundo primario. Aquellos que aguantan se convierten en cazadores. Maestros de su entorno, son capaces de escabullirse como fantasmas entre los árboles y poner trampas en el camino de sus enemigos.",
                    img: "../img/logo/cazador.webp",
                    alt: "imagen de un cazador"
                },
                {
                    id: "2",
                    funcion: "ofensivo",
                    nombre: "Mago",
                    rol: "Daño",
                    descripcion: "Los magos destruyen a sus enemigos con encantamientos arcanos. Aunque controlan poderosos hechizos ofensivos, los magos son frágiles y su armadura es ligera, lo que los hace particularmente vulnerables a los ataques a corta distancia. Los magos sabios usan sus hechizos con cuidado para mantener a sus enemigos a distancia o retenerlos en el lugar.",
                    img: "../img/logo/mago.avif",
                    alt: "imagen de un mago"
                },
                {
                    id: "3",
                    funcion: "ofensivo",
                    nombre: "Picaro",
                    rol: "Daño",
                    descripcion: "Los pícaros a menudo inician sus batallas entre las sombras, comenzando con sanguinarios golpes cuerpo a cuerpo. En batallas largas, usan ataques sucesivos, cuidadosamente seleccionados para preparar al enemigo para el golpe final. Los pícaros deben tener especial cuidado al seleccionar a sus objetivos para no malgastar sus ataques de combo y deben saber cuándo esconderse o huir si la batalla se vuelve contra ellos.",
                    img: "../img/logo/picaro.avif",
                    alt: "imagen de un picaro"
                }
            ],
            largostorage: "",
            objetostorage: [],
            btnvaciar: true
        }
    },

    methods: {
        historial() {
            this.objetostorage = []
            this.largostorage = localStorage.length

            if(this.largostorage > 0){
                for(let i = 0; i < localStorage.length ; i++){
                    let clave = localStorage.key(i); 
                    let contenidoLocalStorage = localStorage.getItem(clave);
                    let contenido = JSON.parse(contenidoLocalStorage)

                    this.objetostorage.push(contenido)
                    console.log(this.objetostorage)

                }

            }
        },


        guardarvalor() {
            this.showBienvenida = true;
            this.showCuestionario = false;
            this.showFinal = false;

            //Busco en mis clases cual de todas es la que pertenece a la recomendacion de personaje brindada.
            var clase = this.clases.find(clase => clase.id == this.final.id && clase.funcion == this.final.funcion)


            //Almaceno el dato en el JSON
            var jsonString = JSON.stringify(clase);
            localStorage.setItem(clase.nombre, jsonString);
            window.location.reload()
        },

        mostrarCuestionario() {
            this.showBienvenida = false;
            this.showCuestionario = true;
        },

        resultado() {
            this.showBienvenida = false;
            this.showCuestionario = false;
            this.showFinal = true
            this.final.id = this.datosseleccionados[2]
            this.final.funcion = this.datosseleccionados[1]
            console.log(this.final)
        },

        incrementar() {
            if (this.datosseleccionados[this.contador - 1]) {
                this.contador++
                this.errorbolean = false
            } else {
                this.errorbolean = true
            }
        },

        decrementar() {
            if (this.datosseleccionados[this.contador - 1]) {
                this.contador--
                this.errorbolean = false
            } else {
                this.errorbolean = true
            }
        },

        capturorespuesta(nombre) {
            console.log(nombre)
            this.datosseleccionados[this.contador - 1] = nombre
            //console.log(this.datosSeleccionados[this.contador - 1])
            console.log(this.datosseleccionados)
        },

        vaciarhistorial(){
            this.btnvaciar = false
            this.objetostorage = []
            localStorage.clear()
        }
    }
})

app.component(`componente-bienvenida`, {
    $emits: ['historial', 'vaciarhistorial'],
    props: ['largostorage','objetostorage', 'btnvaciar'],

    data() {
        return {
            titulo: "El 21 de mayo de 2024, llega una nueva era de Cataclysm",
            parrafo: "¡ Realiza nuestro test para saber que clase es la indicada para ti !",
            boton: "Comenzar"
        }
    },

    template: `

        <section class="fondo-inicio col-5">
            <div class="p-5 text-center position-absolute">
                <img src="./img/logo.avif" alt="logo del wow" class="img-fluid">
                <h1 class="mt-5">{{titulo}}</h1>
                <p class="parrafo-inicio">{{parrafo}}</p>
                <button class="boton-inicio" @click="$emit('comenzar')">{{boton}}</button>

                <!-- BOTON PARA ABRIR EL HISTORIAL -->
                <button @click="$emit('historial')"
                        class="historial" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
                        aria-label="Toggle navigation">Historial
                </button>

                <!-- HISTORIAL -->
                <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar"
                    aria-labelledby="offcanvasDarkNavbarLabel">

                    <div class="offcanvas-header">
                        <h2 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Historial</h2>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                                aria-label="Close"></button>
                    </div>

                    <div class="offcanvas-body overflow-auto container p-5 pt-0">
                        <template v-if="largostorage > 0">      
                            <div>
                            
                                <template v-for="(item, index) in objetostorage" :key="index">             
                                    
                                        <div class="tarjeta-final d-flex p-0 mb-5 row">
                                            <div class="col-12"> 
                                                <h3>{{item.nombre}}</h3>
                                                <span>{{item.funcion}}</span>
                                            </div>
                                            <img :src="item.img" alt="item.alt" class="col-12 p-0"> 
                                        </div>
                                    
                                </template>  

                                <span v-if="btnvaciar" class="p-3 siguiente" @click="$emit('vaciarhistorial')">Vaciar historial</span>
                                <span v-if="!btnvaciar"> No hay ninguna recomendacion guardada </span>
                            </div>                                                                           
                        </template>

                        <template v-else>
                            <span> No hay ninguna recomendacion guardada </span>
                        </template>
                    </div>   

                </div>
            </div>
        </section>
        
        <video autoplay muted loop class="fondo-video">
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

    data() {
        return {
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

                
                <!-- CODIGO A EJECUTAR EN CASO DE QUE ESTE EN LA PREGUNTA 3 Y LA RESPUESTA SEA "tanque" 
                *
                *
                *                 
                -->

                    <template  v-if="contador >= 3 && datosseleccionados[1] === 'tanque'">
                        <template v-for="(subItem) in item.opcionestanque">
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
            <button class="position-absolute start-0 btn anterior m-3" @click="$emit('decrementar')" v-if="contador !== 1">{{prev}}</button>
            <button class="position-absolute end-0 btn siguiente m-3" @click="$emit('incrementar')" v-if="contador <= 2">{{next}}</button>
            <button class="position-absolute end-0 btn siguiente m-3" @click="$emit('resultado')" v-if="contador == 3">Finalizar</button>

        </div>
    </div>



    `,

    methods: {



    }
})

app.component(`componente-final`, {
    props: ['clases', 'final'],
    emits: ['guardarvalor'],

    template: `
        <div class="fondo-final col-12"> 
            <template v-for="(item, index) in clases" :key="index">
                <template v-if="(((item.id) == (final.id)) && ((item.funcion) == (final.funcion)))"> 
                    <div class=" row mt-5 justify-content-center flex-column align-items-center">

                        <div class="col-12 d-flex flex-column align-items-center mb-5">
                            <span class="tarjeta-titulo">Recomendación  de la casa</span>
                            <p class="tarjeta-parrafo">En base a tus elecciones previamente seleccionadas, la clase que te recomendamos jugar es la siguiente.</p>
                        </div>
                        
                        <div class="col-7 tarjeta-final d-flex p-0">
                            <img :src="item.img" :alt="item.alt" class="tarjeta-imagen p-0"> 
                            <div> 
                                <h3>{{item.nombre}}</h3>
                                <span>{{item.rol}}</span>
                                <p>{{item.descripcion}}</p>
                            </div>
                        </div>
                        
                        <div class="col-6 guardar" @click="$emit('guardarvalor')">
                            <span> Guardar recomendacion</span>
                        </div>
                        
                    </div>
                </template>
            </template>
        </div>
    `,

    methods: {

    }

})


app.mount("#app")
