<template>
    <div>
        <!-- <div v-if="modalAberto" id="modal">
            <span id="close-modal" v-if="modalAberto" @click="fecharModal">X</span>
            <form>
                <div class="form-input">
                    <label for="name">Nome</label>
                    <input id="name" type="text" placeholder="Nome" v-model="form.name">
                </div>

                <div class="form-input">
                    <label for="leader">Líder</label>
                    <input id="leader" type="text" placeholder="Líder" v-model="form.leader">
                </div>

                <div class="form-input">
                    <label for="number">Número</label>
                    <input id="number" type="tel" placeholder="(XX) XXXXX-XXXX" v-model="form.number">
                </div>

                <div class="form-input">
                    <label for="numberFamily">Número parente</label>
                    <input id="numberFamily" type="tel" placeholder="(XX) XXXXX-XXXX" v-model="form.numberFamily">
                </div>

                <div class="form-input">
                    <label for="city">Cidade</label>
                    <input id="city" type="text" placeholder="Cidade" v-model="form.city">
                </div>

                <div class="form-input">
                    <label for="church">Igreja</label>
                    <input id="church" type="text" placeholder="Igreja" v-model="form.church">
                </div>

                <div class="form-input">
                    <p>Faz uso de alguma medicação ou possui alguma alergia?</p>
                    <div class="form-radio">
                        <label for="sim">Sim</label>
                        <input id="sim" name="alergia" type="radio" value="true" v-model="alergia">
                        <label for="nao">Não</label>
                        <input id="nao" name="alergia" type="radio" value="false" v-model="alergia">
                    </div>
                </div>

                <div class="form-input" v-if="alergia === 'true'">
                    <label for="textare">Descrição de alergias</label>
                    <textarea id="textare" v-model="form.allergy"></textarea>
                </div>

                <div class="form-input">
                    <label for="baggage">Nº de Volumes</label>
                    <input id="baggage" type="number" placeholder="Nº Volumes" v-model="form.baggage">
                </div>

            </form>
        </div> -->

        <h1>Lista de Encontristas confirmados:</h1>

        <div class="container">
            <table class="rwd-table">
                <tr>
                    <th>Encontrista</th>
                    <th>Lider</th>
                    <!-- <th>Acoes</th> -->
                </tr>
                <tr v-for="item in items" :key="item.id">
                    <div v-if="item == 1">
                        <td data-th="Movie Title">{{ item.name }}</td>
                        <td data-th="Movie Title">{{ item.leader }}</td>
                        <!-- <td class="btns">
                            <button class="btn open" @click="abrirModal(item)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z" />
                                </svg>
                            </button>
                            <button class="btn close" @click="remover(item._id)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z" />
                                </svg>
                            </button>
                        </td> -->
                    </div>
                </tr>
            </table>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'ListagemFinal',
    data() {
        return {
            items: [],
            modalAberto: false,
            form: {
                name: '',
                leader: '',
                number: null,
                numberFamily: null,
                check: true,
                city: '',
                church: '',
                allergy: '',
                baggage: null,
            },
            alergia: 'false',
        }
    },
    created() {
        axios.get('https://backend-encontro.herokuapp.com/listar')
            .then(response => {
                this.items = response.data.users;
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        abrirModal(person) {
            this.modalAberto = true
            this.form = person
        },
        fecharModal() {
            this.modalAberto = false
            this.form = {
                id: '',
                name: '',
                leader: '',
                number: null,
                numberFamily: null,
                check: null,
                city: '',
                church: '',
                allergy: '',
                baggage: null,
            }
        },
        async remover(id) {
            await axios.delete(`https://backend-encontro.herokuapp.com/remover/${id}`)
                .then(response => {
                    // console.log(response);
                    alert(response.data.message);
                    location.reload();
                })
                .catch(error => {
                    alert(error.response.data.message);
                    // console.log(error);
                });
        },
    }
}
</script>

<style>
#modal {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .8);
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#close-modal {
    cursor: pointer;
    position: absolute;
    top: 70px;
    right: 90px;
    font-size: 32px;
}

.lista {
    display: flex;
    flex-direction: column;
}

.form-input {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-input input {
    padding: 7px 12px;
    border-radius: 5px;
}

.form-input textarea {
    width: 400px;
    min-width: 400px;
    max-width: 400px;
    min-height: 100px;
    max-height: 100px;
    margin: 0 auto;
}

.form-radio {
    display: flex;
    justify-content: center;
    margin: 5%;
}

h1 {
    margin-bottom: 2rem;
}

@import "https://fonts.googleapis.com/css?family=Montserrat:300,400,700";

.container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.rwd-table {
    margin: 1em 0;
    width: 500px;
    min-width: 300px;
    max-width: 500px;
}

.rwd-table .btns {
    display: flex;
    align-items: center;
}

.rwd-table .btn {
    border-radius: 50%;
    padding: 10px;
    /* width: 10px; */
    /* height: 10px; */
    /* display: flex; */
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.rwd-table .btn.open {
    /* border: solid 2px green; */
    background-color: green;
    /* background-color: greenyellow; */
}

.rwd-table .btn.close {
    /* border: solid 2px red; */
    background-color: red;
    /* background-color: rgb(255, 123, 123); */
}

.rwd-table tr {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
}

.rwd-table th {
    display: none;
}

.rwd-table td {
    /* display: block; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.rwd-table td:first-child {
    padding-top: .5em;
}

.rwd-table td:last-child {
    padding-bottom: .5em;
}

.rwd-table td:before {
    content: attr(data-th) ": ";
    font-weight: bold;
    width: 6.5em;
    display: inline-block;
}

@media (min-width: 480px) {
    .rwd-table td:before {
        display: none;
    }
}

.rwd-table th,
.rwd-table td {
    text-align: left;
}

@media (min-width: 480px) {

    .rwd-table th,
    .rwd-table td {
        display: flex;
        padding: .25em .5em;
    }

    .rwd-table th:first-child,
    .rwd-table td:first-child {
        padding-left: 0;
    }

    .rwd-table th:last-child,
    .rwd-table td:last-child {
        padding-right: 0;
    }
}

.rwd-table {
    background: #34495E;
    color: #fff;
    border-radius: .4em;
    overflow: hidden;
}

.rwd-table tr {
    border-color: #46637f;
}

.rwd-table th,
.rwd-table td {
    margin: .5em 1em;
}

@media (min-width: 480px) {

    .rwd-table th,
    .rwd-table td {
        padding: 1em !important;
    }
}

.rwd-table th,
.rwd-table td:before {
    color: #dd5;
}
</style>