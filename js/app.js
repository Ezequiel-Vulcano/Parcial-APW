const app = Vue.createApp({
    data() {
        return {
            showBienvenida: false, //Aca cambie a false la bienvenida para que me muestre primero las preguntas = valor original (false)
            showCuestionario: true //Aca tambien cambie = valor original (true)
        }
    },

    methods: {
        mostrarCuestionario() {
            this.showBienvenida = false;
            this.showCuestionario = true;
        }
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
    data(){
        return{
            titulo: "Que comienze el juego",
            next: "siguiente",
            prev: "anterior"
        }
    },

    template: `
        <div class="col-12 p-5">
            <h2>{{titulo}}</h2>
            <div>
                <span>pregunta 1</span>
            </div>
        </div>
        <div>
            <button class="btn btn-danger m-3" >{{prev}}</button>
            <button class="btn btn-primary m-3" >{{next}}</button>
        </div>
    `,

    methods: {

    }
})

app.mount("#app")
