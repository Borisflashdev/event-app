<template>
    <div class="wrapper">
        <div>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>
                The resource request could not be found on this server. Return to the 
                <router-link class="link" to="/">homepage</router-link>.
            </p>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    margin-top: 150px;
    display: flex;
    justify-content: center;
    
}
.text {
    display: flex;
    justify-content: center;
}
.link {
    color: black;
}
h1 {
    font-size: 100px;
    margin: 0px;
}
h2 {
    font-size: 50px;
    margin: 0px;
}
p {
    margin-bottom: 130.5px;
}
</style>