<template>
    <div class="form">
        <h1>Create Event</h1>
        <form @submit.prevent="addEvent">
            <div>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="Name" 
                    v-model="name" 
                    :class="{ invalidInput: invalidName }"
                    @click="this.invalidName = false">
                <p class="red-text" v-show="invalidName">Please enter Event name.</p>
            </div>
            <div>
                <input 
                    type="date" 
                    id="date" 
                    placeholder="Name" 
                    v-model="date"
                    :class="{ invalidInput: invalidDate }"
                    @click="this.invalidDate = false">
                <p class="red-text" v-show="invalidDate">Please enter Event name.</p>
            </div>
            <div>
                <textarea 
                    id="description" 
                    cols="40" 
                    rows="6" 
                    placeholder="Description" 
                    v-model="description"
                    :class="{ invalidText: invalidDesc }"
                @click="this.invalidDesc = false">>
                </textarea>
                 <p class="red-text" v-show="invalidDesc">Please enter Event description.</p>
            </div>
            <base-button class="btn" :isButton="true">Create</base-button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    emits: ['getEvents'],
    data() {
        return {
            name: null,
            date: null,
            description: null,
            invalidName: false,
            invalidDate: false,
            invalidDesc: false,

            eventData: [],
            more: false,
            isLoading: false,
            isError: false,
            noEvents: false,
            responseDataDate: '',
            responseDataName: '',
            responseDataDesc: ''
        }
    },
    methods: {
        async addEvent() {
            if (this.name === '') {
                this.invalidName = true;
                return;
            } 
            if (this.date === '') {
                this.invalidDate = true;
                return;
            }
            if (this.description === '') {
                this.invalidDesc = true;
                return;
            }

            const eventData = {
                name: this.name,
                date: this.date,
                description: this.description,
                userId: localStorage.getItem('userId')
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            await axios.post('http://localhost:5005/api/v1/event', eventData).then((responseData) => {
                console.log(responseData);
            }).catch((error) => {
                console.log(error);
            });
            this.name = '';
            this.date = '';
            this.description = ''
            this.$emit('getEvents');
        }
    },
}
</script>

<style scoped>
input, textarea {
    width:80%;
    border:2px solid #aaa;
    border-radius:4px;
    margin:8px 10px;
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
</style>