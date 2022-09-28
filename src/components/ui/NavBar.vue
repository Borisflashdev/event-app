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
        <ul class="register">
            <ul>
                <li><base-button :isButton="true">Login</base-button></li>
                <li><base-button :isButton="true">SignUp</base-button></li>
            </ul>
        </ul>
    </nav>
</template>

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
#logo {
    height: 120px;
    width: 120px;
}
</style>