<template>
 <div>
  <div v-if="modalAberto" id="modal">
   <span id="close-modal" v-if="modalAberto" @click="fecharModal">X</span>
   <form @submit.prevent="checkin()">
    <div class="form-input">
     <label for="name">Nome</label>
     <input
      required
      id="name"
      type="text"
      placeholder="Nome"
      v-model="form.name"
     />
    </div>

    <div class="form-input">
      <label for="age">Idade</label>
      <input
       required
       id="age"
       type="number"
       placeholder="Idade"
       v-model="form.age"
      />
     </div>

    <div class="form-input">
     <label for="leader">Líder</label>
     <input
      required
      id="leader"
      type="text"
      placeholder="Líder"
      v-model="form.leader"
     />
    </div>

    <div class="form-input">
     <label for="number">Número</label>
     <input
      required
      id="number"
      type="tel"
      placeholder="(XX) XXXXX-XXXX"
      v-model="form.number"
     />
    </div>

    <div class="form-input">
     <label for="numberFamily">Número parente</label>
     <input
      required
      id="numberFamily"
      type="tel"
      placeholder="(XX) XXXXX-XXXX"
      v-model="form.numberFamily"
     />
    </div>

    <div class="form-input">
     <label for="city">Cidade</label>
     <input
      required
      id="city"
      type="text"
      placeholder="Cidade"
      v-model="form.city"
     />
    </div>

    <div class="form-input">
     <label for="church">Igreja</label>
     <input
      required
      id="church"
      type="text"
      placeholder="Igreja"
      v-model="form.church"
     />
    </div>

    <div class="form-input">
     <p>Faz uso de alguma medicação ou possui alguma alergia?</p>
     <div class="form-radio">
      <label for="sim">Sim</label>
      <input
       id="sim"
       name="alergia"
       type="radio"
       value="true"
       v-model="alergia"
      />
      <label for="nao">Não</label>
      <input
       id="nao"
       name="alergia"
       type="radio"
       value="false"
       v-model="alergia"
      />
     </div>
    </div>

    <div class="form-input" v-if="alergia === 'true'">
     <label for="textare">Descrição de alergias</label>
     <textarea id="textare" v-model="form.allergy"></textarea>
    </div>

    <div class="form-input">
     <label for="baggage">Nº de Volumes</label>
     <input
      required
      id="baggage"
      type="number"
      placeholder="Nº Volumes"
      v-model="form.baggage"
     />
    </div>
    <button class="btn scale-up-center-back" type="submit">
     Fazer Checkin
    </button>
   </form>
  </div>

  <div class="modal" v-if="ModalConfirm">
   <div class="modal-content">
    <h2>Tem certeza que deseja remover este encontrista?</h2>
    <button
     class="btn scale-up-center-back"
     style="background: red"
     @click="remover()"
    >
     Remover
    </button>
    <button class="btn scale-up-center-back" @click="closeModalConfirm()">
     Cancelar
    </button>
   </div>
  </div>

  <h1>Inscritos:</h1>

  <div class="container">
   <div class="search-wrapper">
    <input
     type="text"
     v-model="searchQuery"
     placeholder="Digite para pesquisar..."
    />
   </div>
   <ul class="participants-list">
    <li v-for="(item, index) in filteredItems" :key="index">
     <div class="participant-name">{{ item.name }}</div>
     <div class="participant-leader">Líder: {{ item.leader }}</div>
     <div class="participant-actions">
      <button class="checkin-button" @click="abrirModal(item)">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
       >
        <path
         fill="currentColor"
         d="m21.1 12.5l1.4 1.41l-6.53 6.59L12.5 17l1.4-1.41l2.07 2.08l5.13-5.17M10 17l3 3H3v-2c0-2.21 3.58-4 8-4l1.89.11L10 17m1-13a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4Z"
        />
       </svg>
      </button>
      <button class="remove-button" @click="showModalConfirm(item._id)">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
       >
        <path
         fill="currentColor"
         d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
        />
       </svg>
      </button>
     </div>
    </li>
   </ul>
  </div>
  <div>
   <button class="btn scale-up-center-back" @click="confirmados()">
    Lista de Confirmados
   </button>
  </div>
  <div>
   <button class="btn scale-up-center-back" @click="voltar()">
    Voltar para Home
   </button>
  </div>
 </div>
</template>
  
<script>
import axios from "axios";
import Pusher from "pusher-js";

export default {
 name: "ListagemDeItens",
 data() {
  return {
   searchQuery: "",
   items: [],
   id_delete: "",
   modalAberto: false,
   ModalConfirm: false,
   channel: null,
   form: {
    _id: "",
    name: "",
    leader: "",
    number: null,
    numberFamily: null,
    age: null,
    check: true,
    city: "",
    church: "",
    allergy: "",
    baggage: null,
   },
   alergia: "false",
  };
 },
 mounted() {
  axios
   .get("https://encontro.herokuapp.com/listar")
   .then((response) => {
    this.items = response.data.users.filter((e) => !e.check);
   })
   .catch((error) => {
    console.log(error);
   });
  const pusher = new Pusher("b9fd36fe72d986cec08f", {
   cluster: "us2",
   authEndpoint: "/pusher/auth",
   auth: {
    headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
   },
  });

  this.channel = pusher.subscribe("my-channel");
  this.channel.bind("new-user", (res) => {
   this.items.push(res.newUser);
  });
  this.channel.bind("remove-user", (res) => {
   const index = this.items.findIndex((e) => e._id == res.deletedUser._id);
   this.items.splice(index, 1);
  });
 },
 computed: {
  filteredItems() {
   if (this.searchQuery.trim() === "") {
    return this.items;
   }
   return this.items.filter((item) =>
    item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
   );
  },
 },
 methods: {
  async checkin() {
   this.form.check = true;
   await axios
    .patch(
     `https://encontro.herokuapp.com/atualizar/${this.form._id}`,
     this.form
    )
    .then(() => {
     const index = this.items.findIndex((e) => e._id == this.form._id);
     this.items.splice(index, 1);
     this.fecharModal();
     // location.reload();
    })
    .catch((error) => {
     console.log(error);
    });
  },
  confirmados() {
   this.$router.push("/check-final");
  },
  voltar() {
   this.$router.push("/");
  },
  abrirModal(person) {
   this.modalAberto = true;
   this.form = person;
   window.scrollTo(0, 0);
  },
  showModalConfirm(id) {
   this.id_delete = id;
   this.ModalConfirm = true;
  },
  closeModalConfirm() {
   this.id_delete = "";
   this.ModalConfirm = false;
  },
  fecharModal() {
   this.modalAberto = false;
   this.form = {
    id: "",
    name: "",
    leader: "",
    number: null,
    numberFamily: null,
    age: null,
    check: null,
    city: "",
    church: "",
    allergy: "",
    baggage: null,
   };
  },
  async remover() {
   await axios
    .delete(`https://encontro.herokuapp.com/remover/${this.id_delete}`)
    .then((response) => {
     // console.log(response);
     // alert(response.data.message);
     const index = this.items.findIndex(
      (e) => e._id == response.deletedUser._id
     );
     this.items.splice(index, 1);
     // location.reload();
    })
    .catch((error) => {
     console.log(error);
    });
   this.closeModalConfirm();
  },
 },
};
</script>

<style>
.search-wrapper {
 display: flex;
 justify-content: center;
 margin-bottom: 20px;
}

.search-wrapper input[type="text"] {
 width: 100%;
 max-width: 400px;
 padding: 12px 20px;
 margin: 8px 0;
 box-sizing: border-box;
 border: 2px solid #ccc;
 border-radius: 4px;
 font-size: 16px;
 background-color: white;
 transition: 0.3s;
}

.search-wrapper input[type="text"]:focus {
 border: 2px solid #3f51b5;
 outline: none;
}
#modal {
 position: absolute;
 top: 0;
 left: 0;
 background: rgba(0, 0, 0, 0.8);
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
}

/* lista */
.participants-list {
 list-style: none;
 margin: 0;
 padding: 0;
}

.participants-list li {
 display: flex;
 gap: 20px;
 align-items: center;
 justify-content: space-between;
 border: 1px solid #ccc;
 border-radius: 4px;
 padding: 10px;
 min-width: 300px;
 max-width: 90%;
 margin: 10px auto 0 auto;
}

.participant-name {
 font-weight: regular;
 font-size: 18px;
}

.participant-leader {
 color: #555;
}

.participant-actions {
 display: flex;
 gap: 10px;
}

.checkin-button,
.remove-button {
 padding: 8px;
 border: none;
 border-radius: 4px;
 cursor: pointer;
}

.checkin-button {
 background-color: #28a745;
 color: #fff;
}

.remove-button {
 background-color: #dc3545;
 color: #fff;
}

.remove-button.pending {
 opacity: 0.5;
 cursor: not-allowed;
}
/* Estilo do modal */
.modal {
 display: block;
 position: fixed;
 z-index: 1;
 left: 0;
 top: 0;
 width: 100%;
 height: 100%;
 overflow: auto;
 background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
 background-color: #f5f5f5;
 color: #333333;
 margin: 15% auto;
 padding: 20px;
 border-radius: 5px;
 width: 80%;
 max-width: 600px;
}

.modal h2 {
 font-size: 24px;
 font-weight: bold;
 margin-bottom: 20px;
}

.modal p {
 font-size: 16px;
 margin-bottom: 10px;
 line-height: 1.5;
}

.modal button {
 background-color: #333333;
 color: #ffffff;
 border: none;
 border-radius: 5px;
 padding: 10px 20px;
 margin-top: 20px;
 cursor: pointer;
 font-size: 16px;
 transition: background-color 0.2s;
}

.modal button:hover {
 background-color: #222222;
}
</style>