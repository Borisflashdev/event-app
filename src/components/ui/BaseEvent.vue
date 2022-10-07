<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <p v-if="!editName">
            {{ eventData.name }} 
            <font-awesome-icon icon="fa-solid fa-pen-to-square" class="edit-btn" @click="editName = true" />
          </p>
          <div v-else class="edit-div">
            <input type="text" v-model="newName" @keypress.enter="nameEdit()">
            <font-awesome-icon icon="fa-solid fa-check" class="icon" @click="nameEdit()"/>
          </div>
        </header>
        <section>
          <div>
            <h2 v-if="!editDate">
              Date: {{ eventData.date }}
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="edit-btn" @click="editDate = true" />
            </h2>
            <div v-else>
              <input type="date" class="date" v-model="newDate" @keypress.enter="dateEdit()">
              <font-awesome-icon icon="fa-solid fa-check" class="icon" @click="dateEdit()"/>
            </div>
          </div>
          <div class="desc-wrapper">
            <h2 v-if="!editDesc">
              Description: {{ eventData.description }}
              <font-awesome-icon icon="fa-solid fa-pen-to-square" class="edit-btn" @click="editDesc = true" />
            </h2>
            <div v-else>
              <input type="text" class="date" v-model="newDesc" @keypress.enter="descEdit()">
              <font-awesome-icon icon="fa-solid fa-check" class="icon" @click="descEdit()"/>
            </div>
          </div>
        </section>
        <menu>
          <base-button :isButton="true" class="delete-btn" @click="deleteEvent">Delete</base-button>
          <base-button :isButton="true" @click="tryClose">Cancle</base-button>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
    eventData: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'getEvents'],
  data() {
    return {
      editName: false,
      editDate: false,
      editDesc: false,
      newName: this.eventData.name,
      newDate: this.eventData.date,
      newDesc: this.eventData.description
    }
  },
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.editName = false;
      this.editDate = false;
      this.editDesc = false;
      this.$emit('close');
    },
    async nameEdit() {
      const id = this.eventData._id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      await axios.patch(`http://localhost:5005/api/v1/${id}`, { name: this.newName }).then((responseData) => {
        console.log(responseData);
      }).catch((error) => {
        console.log(error);
      });
      this.editName = false;
      this.$emit('getEvents');
    },
    async dateEdit() {
      const id = this.eventData._id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      await axios.patch(`http://localhost:5005/api/v1/${id}`, { date: this.newDate }).then((responseData) => {
        console.log(responseData);
      }).catch((error) => {
        console.log(error);
      });
      this.editDate = false;
      this.$emit('getEvents');
    },
    async descEdit() {
      const id = this.eventData._id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      await axios.patch(`http://localhost:5005/api/v1/${id}`, { description: this.newDesc }).then((responseData) => {
        console.log(responseData);
      }).catch((error) => {
        console.log(error);
      });
      this.editDesc = false;
      this.$emit('getEvents');
    },
    async deleteEvent() {
      const id = this.eventData._id;
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      await axios.delete(`http://localhost:5005/api/v1/${id}`).then((responseData) => {
        console.log(responseData);
      }).catch((error) => {
        console.log(error);
      });
      this.$emit('getEvents');
    }
  },
};
</script>

<style scoped>
.desc-wrapper {
  margin-top: 10px;
}
.date {
  width: 70% !important;
  margin: 0px;
}
h2 {
  margin: 0px;
}
.delete-btn {
  background-color: red;
  margin-right: 10px;
}
.icon {
  margin-left: 10px;
}
.icon:hover {
  cursor: pointer;
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}
dialog {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0;
  margin: 0;
  overflow: hidden;
  background-color: white;
}
header {
  background-color: black;
  color: white;
  width: 100%;
  padding: 1rem;
}
header h2 {
  margin: 0;
}
menu {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  margin: 0;
}
section {
  padding: 16px;
}

.edit-btn {
  cursor: pointer;
}

input, textarea {
    width: 25%;
    border:2px solid #aaa;
    border-radius:4px;
    margin: 8px 0px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
}
input:focus {
    border-color: black;
    box-shadow:0 0 8px 0 black;
}
.invalidInput, .invalidText {
    width:80%;
    border:2px solid red;
    border-radius:4px;
    margin:8px 10px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
}
.invalidInput:focus {
    border-color: red;
    box-shadow:0 0 8px 0 red;
}
.form {
    margin: 0px 20px;
    border: 2px black solid;
    border-radius: 20px;
    text-align: center;
    width: 338.430px;
    height: 435.875px;
}
.btn {
    margin: 12px 0px;
}
.red-text {
    margin: 0px;
    color: red;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
</style>