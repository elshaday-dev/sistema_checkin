<template>
 <div>
  <h1>Encontristas Confirmados:</h1>

  <div class="card-list">
   <div
    class="card"
    v-for="(item, index) in items"
    :key="index"
    @click="showModal(index)"
   >
    <div class="card-header">{{ item.name }}</div>
    <div class="card-body">
     <div class="card-info">
      <div class="card-info-item">
       <strong>Líder:</strong> {{ item.leader }}
      </div>
      <div class="card-info-item">
        <strong>Idade:</strong> {{ item.age }}
       </div>
      <div class="card-info-item"><strong>Cidade:</strong> {{ item.city }}</div>
      <div class="card-info-item">
       <strong>Volumes:</strong> {{ item.baggage }}
      </div>
     </div>
    </div>
   </div>
   <div class="modal" v-if="showModalValue">
    <div class="modal-content">
     <div class="modal-header">
      <h2>{{ selectedItem.name }}</h2>
     </div>
     <div class="modal-body">
      <div class="modal-info">
       <div class="modal-info-item">
        <strong>Líder:</strong> {{ selectedItem.leader }}
       </div>
       <div class="modal-info-item">
        <strong>Idade:</strong> {{ selectedItem.age }}
       </div>
       <div class="modal-info-item">
        <strong>Telefone:</strong> {{ selectedItem.number }}
       </div>
       <div class="modal-info-item">
        <strong>Cidade:</strong> {{ selectedItem.city }}
       </div>
       <div class="modal-info-item">
        <strong>Volumes:</strong> {{ selectedItem.baggage }}
       </div>
       <div class="modal-info-item">
        <strong>Igreja:</strong> {{ selectedItem.church }}
       </div>
       <div class="modal-info-item">
        <strong>Alergia:</strong> {{ selectedItem.allergy || "Nenhuma" }}
       </div>
       <button class="btn scale-up-center-back" @click="closeModal()">
        Fechar
       </button>
       <button class="btn scale-up-center-back" @click="removeCheckin()">
        Remover Check-in
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
  <div>
   <button class="btn scale-up-center-back" @click="inscritos()">
    Check-in
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

export default {
 name: "ListagemFinal",
 data() {
  return {
   items: [],
   showModalValue: false,
   selectedItem: null,
   form: {
    check: false,
   },
  };
 },
 created() {
  axios
   .get("https://backend-encontro.herokuapp.com/listar")
   .then((response) => {
    this.items = response.data.users.filter((e) => e.check === true);
   })
   .catch((error) => {
    console.log(error);
   });
 },
 methods: {
  async removeCheckin() {
   await axios
    .patch(
     `https://backend-encontro.herokuapp.com/atualizar/${this.selectedItem._id}`,
     this.form
    )
    .then(() => {
     const index = this.items.findIndex((e) => e._id == this.selectedItem._id);
     this.items.splice(index, 1);
     this.closeModal();
     // location.reload();
    })
    .catch((error) => {
     console.log(error);
    });
  },
  inscritos() {
   this.$router.push("/check-in");
  },
  voltar() {
   this.$router.push("/");
  },
  showModal(index) {
   this.selectedItem = this.items[index];
   this.showModalValue = true;
  },
  closeModal() {
   this.showModalValue = false;
   this.selectedItem = null;
  },
 },
};
</script>

<style scoped>
/* Estilo dos cards */
.card-list {
 display: flex;
 margin-top: 20px;
 padding: 0 10px;
 flex-wrap: wrap;
}
.card {
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 padding: 20px;
 border-radius: 10px;
 box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
 background-color: #333333;
 color: #ffffff;
 transition: transform 0.2s;
 cursor: pointer;
 margin: 0 auto 20px auto;
 width: 200px;
 height: 180px;
 gap: 20px;
}

.card:hover {
 transform: translateY(-5px);
}

.card h2 {
 font-size: 20px;
 font-weight: bold;
 margin-bottom: 10px;
}

.card p {
 font-size: 14px;
 margin-bottom: 5px;
 line-height: 1.5;
}

.card button {
 background-color: #f5f5f5;
 color: #333333;
 border: none;
 border-radius: 5px;
 padding: 5px 10px;
 margin-top: 10px;
 cursor: pointer;
 font-size: 14px;
 transition: background-color 0.2s;
}

.card button:hover {
 background-color: #e5e5e5;
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