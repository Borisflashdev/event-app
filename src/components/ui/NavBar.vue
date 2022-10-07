<template>
    <nav>
        <ul class="menu">
            <li>
                <router-link to="/">
                    <img id="logo" src="../../assets/logo/event_logo.png" alt="logo_image">
                </router-link>
            </li>
            <li><base-button to="/home">Home</base-button></li>
            <li><base-button to="/aboutus">About Us</base-button></li>
            <li><base-button to="/calendar">Events Calendar</base-button></li>
        </ul>
        <ul class="register" v-if="!isLoggedIn">
            <ul>
                <li class="login-btn"><base-button :isButton="true"><router-link to="/login" class="btn">Login</router-link></base-button></li>
                <li><base-button :isButton="true"><router-link to="/signup" class="btn">SignUp</router-link></base-button></li>
            </ul>
        </ul>
        <ul class="login-register" v-if="isLoggedIn">
            <ul>
                <li class="userName"><font-awesome-icon icon="fa-solid fa-user" /> <b>{{ userName }}</b></li>
                <li class="logout-btn"><base-button :isButton="true" @click="Logout()">Logout</base-button></li>
            </ul>
        </ul>
    </nav>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        },
        userName() {
            return this.$store.state.userName;
        }
    },
    methods: {
        Logout() {
            this.$store.state.token = null;
            this.$store.state.userName = null;
            localStorage.clear('token');
            localStorage.clear('userName');
            this.$router.replace('/home');
        }
    }
}
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #888888;
    box-shadow: 5px 10px 8px #888888;
    overflow: hidden;
    background-color: white;
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
}
nav ul {
    margin: 0px;
    list-style-type: none;
    padding: 0px;
}
nav li {
    display: inline;
    vertical-align: middle;
    padding: 30px;
}
img {
    height: 80px !important;
    width: 80px !important;
}
.register {
    margin-top: 20px;
    margin-right: 30px;
}
.btn {
    text-decoration: none;
    color: white;
}
.login-register {
    margin-top: 20px;
    padding: 0px;
}
.logout-btn {
    margin-right: 30px;
}
.userName {
    font-weight: 500 !important;
    padding-right: 0px;
}
.login-btn {
    padding-right: 0px !important;
}
#logo {
    height: 120px;
    width: 120px;
}
</style>