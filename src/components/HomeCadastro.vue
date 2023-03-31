<template>
    <!-- <a href="https://linktr.ee/el_shaday" target="_blank" rel="noopener">NOVA ALIANÇA EL SHADAY</a>. -->

    <div class="wrapper-form">
        <div class="card-glass">

            <div class="card-glass-header">
                <div class="glass-header-text">Cadastro de encontristas</div>
            </div>

            <form @submit.prevent="submitForm" class="glass-container">
                <div class="form-glass-group">
                    <label for="nomeCompleto"></label>
                    <input type="text" id="nomeCompleto" class="form-glass-control" v-model="form.nomeCompleto"
                        placeholder="Nome Completo">
                </div>
                <div class="form-glass-group">
                    <label for="lider"></label>
                    <input type="text" id="lider" class="form-glass-control" v-model="form.lider" placeholder="Líder" />
                </div>
                <button type="submit" class="btn scale-up-center">Cadastrar</button>
            </form>

        </div>
    </div>

    <!-- <div>
        <div>
            <h1>Página Inicial</h1>
            <router-link to="/outra-pagina">Ir para Outra Página</router-link>
        </div>
    </div> -->
</template>
  
<script>
// import axios from "axios";

export default {
    name: 'HomeCadastro',
    data() {
        return {
            form: {
                nomeCompleto: "",
                lider: "",
            },
        };
    },
    methods: {
        async submitForm() {
            console.log('Its work');
            // try {
            //     const response = await axios.post("/form-data", this.form);
            //     console.log(response.data);
            // } catch (error) {
            //     console.error(error);
            // }
        },
    },
};
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: "Poppins", sans-serif;
    --color-highlight: #111;
    --color-common: #555;
}

.wrapper-form {
    /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
    /* background-size: cover; */
    /* background-position: center; */
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 25px;
    overflow: hidden;
    position: relative;
}

.card-glass {
    position: relative;
    width: 944px;
    background: radial-gradient(100.21% 271.27% a t 2.81% 7.08%, rgba(255, 252, 252, 0.3) 0%, rgba(250, 250, 250, 0.07) 100%);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 30px 20px 70px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(50px);
    border-radius: 30px;
    display: flex;
    justify-content: space-between;
    margin: 30px;
    align-items: center;
    flex-direction: column;
}

.card-glass-header {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.form-glass-group {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 0 35px;
}

.glass-header-text {
    font-weight: 600;
    font-size: 2em;
    color: var(--color-highlight);
}

input.form-glass-control {
    padding: 13px 16px;
    border: none;
    max-width: 100%;
    outline: none;
    font-size: 1.5em;
    color: var(--color-common);
    background: rgba(193, 193, 193, 0.09);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1), 0px -2px 5px rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    margin: 15px auto;
}

input.form-glass-control::placeholder {
    font-size: 0.7em;
    color: var(--color-common);
}

.glass-container {
    margin: 20px 40px;
}

.btn {
    padding: 10px 16px;
    border: none;
    outline: none;
    border-radius: 10px;
    margin: 13px 7px;
    display: inline-block;
    color: white;
    background-color: var(--color-highlight);
    /* margin-left: 33px; */
    text-decoration: none;
}

.scale-up-center:hover {
    -webkit-animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes scale-up-center {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    
    100% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
}

@keyframes scale-up-center {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    100% {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
}
</style>
  