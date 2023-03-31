<template>
    <div class="hello">
      <h1>Cadastro de encontristas</h1>
      <p>
        Igreja Evangélica
        <a href="https://linktr.ee/el_shaday" target="_blank" rel="noopener"
          >NOVA ALIANÇA EL SHADAY</a
        >.
      </p>
    </div>
    <div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="nomeCompleto"></label>
          <input
            type="text"
            id="nomeCompleto"
            v-model="form.nomeCompleto"
            placeholder="Nome Completo"
          />
        </div>
        <div class="form-group">
          <label for="numeroCelular"></label>
          <input
            type="text"
            id="numeroCelular"
            v-model="form.numeroCelular"
            placeholder="Número de Celular"
          />
        </div>
        <div class="form-group">
          <label for="lider"></label>
          <input
            type="text"
            id="lider"
            v-model="form.lider"
            placeholder="Líder"
          />
        </div>
        <div class="form-group">
          <label for="formaPagamento"></label>
          <select id="formaPagamento" class="form-control">
            <option disabled selected>Selecione a forma de pagamento</option>
            <option>Pix</option>
            <option>Cartão de crédito</option>
            <option>Dinheiro</option>
          </select>
          <button type="submit">Enviar</button>
        </div>
      </form>
      <div>
        <h1>Página Inicial</h1>
        <router-link to="/outra-pagina">Ir para Outra Página</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";

  export default {
    name: 'HomeCadastro',
    data() {
      return {
        form: {
          nomeCompleto: "",
          numeroCelular: "",
          lider: "",
          formaPagamento: "",
          pago: false,
        },
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await axios.post("/form-data", this.form);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .form-group {
    width: 25%;
    margin: 0 auto;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
  }
  
  select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  </style>
  