<template>
    <div>
        <base-event 
            :show="more"
            :eventData="eventData"
            @close="more = false"
            @getEvents="getEvents()">
        </base-event>
        <div class="wrapper">
            <base-form @getEvents="getEvents()"></base-form>
            <div class="list">
                <h1>Events List</h1>
                <base-spinner v-if="isLoading"></base-spinner>
                <p v-if="isError">Something went wrong, please try again later...</p>
                <p v-if="noEvents">You don't have any Events.</p>
                <div class="event-wrapper" v-for="event in eventsData" :key="event.id">
                    <div class="event">
                        <h2>{{ event.name }} - {{ event.date }}</h2>
                        <div class="btn-wrapper">
                            <base-button :isButton="true" @click="getEvent(event.id)">More</base-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BaseForm from '../components/ui/BaseForm.vue';
import BaseEvent from '../components/ui/BaseEvent.vue';

export default {
  components: { BaseForm, BaseEvent },
    data() {
        return {
            eventsData: [],
            eventData: {},
            more: false,
            isLoading: false,
            isError: false,
            noEvents: false,
            responseDataDate: '',
            responseDataName: '',
            responseDataDesc: '',
            eventId: '',
        }
    },
    methods: {
        async getEvents() {

            this.more = false;
            this.isLoading = true;

            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            const config = {
                headers:{
                    userId: localStorage.getItem('userId'),
                }
            };

            await axios.get('http://localhost:5005/api/v1/events', config).then((responseData) => {
                const events = [];
                for (const id in responseData.data.result) {
                    events.push({
                        id: responseData.data.result[id].event_id, 
                        name: responseData.data.result[id].name,
                        date: responseData.data.result[id].date,
                        desc: responseData.data.result[id].description,
                    });
                }
                this.eventsData = events;
            }).catch((error) => {
                console.log(error);
                this.isLoading = false;
                this.isError = true;
            });
            if (this.eventsData.length === 0) {
                this.noEvents = true;
            } else {
                this.noEvents = false;
            }
            this.isLoading = false;
        },
        async getEvent(id) {
            this.more = true;
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

            await axios.get(`http://localhost:5005/api/v1/${id}`).then((responseData) => {
                this.eventData = responseData.data.result;
                console.log(this.eventData);
            })
        }
    },
    created() {
        this.getEvents();
    }
}
</script>

<style scoped>
.wrapper {
    margin-top: 120px;
    display: flex;
    justify-content: space-evenly;
}
.list {
    border: 2px black solid;
    border-radius: 20px;
    width: 65%;
    height: auto;
    text-align: center;
}
.event-wrapper {
    display: flex;
    justify-content: center;
    margin: 20px 0px;
}
.event {
    text-align: start;
    border: 2px solid black;
    border-radius: 20px;
    padding-left: 30px;
    width: 80%;
    height: auto;
    display: flex;
    justify-content: space-between;
}
.btn-wrapper {
    margin-right: 30px;
    margin-top: 14px;
}
.edit-btn:hover {
    cursor: pointer;
}
</style>