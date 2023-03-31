<template>
    <div>
        <div v-if="modalAberto" id="modal">
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
        </div>
        <h1>Lista de Possíveis Encontristas:</h1>
        <div v-for="item in items" :key="item.id">
            {{ item.name }}
            <button @click="abrirModal(item)">Adicionar informações</button>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'ListagemDeItens',
    data() {
        return {
            items: [],
            modalAberto: true,
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
        }
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
.form-radio{
    display: flex;
  justify-content: center;
  margin: 5%;
}
</style>