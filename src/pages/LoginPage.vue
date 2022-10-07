<template>
    <div class="wrapper">
        <div class="input-div">
            <div class="title">
                <h1>Login</h1>
            </div>
            <form @submit.prevent="Login()">
                <div>
                    <input 
                        class="inpt" 
                        type="text" 
                        placeholder="Username"
                        v-model.trim="username"
                        :class="{ invalidInput: invalidUsername }"
                        @click="invalidUsername = false"
                    >
                    <p class="invalid-text" v-if="invalidUsername">Please enter a valid Username.</p>
                </div>
                <div>
                    <input 
                        class="inpt" 
                        :type="passwordType" 
                        placeholder="Password"
                        v-model.trim="password"
                        :class="{ invalidInput: invalidPassword }"
                        @click="invalidPassword = false"
                    >
                    <p class="invalid-text" v-if="invalidPassword">Password must be at least 6 characters.</p>
                </div>
                <div class="checkbox-inpt">
                    <input type="checkbox" v-model="showPassword"> Show Password
                </div>
                <div class="checkbox-inpt">
                    <base-button :isButton="true">Login</base-button>
                </div>
                <div class="error-box" v-show="isError">
                    <p>{{ errorMsg }}</p>
                </div>
                <div class="checkbox-inpt">
                    <p>Don't have an account, please <router-link class="link" to="/signup">signup</router-link></p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            showPassword: false,
            username: '',
            password: '',
            invalidUsername: false,
            invalidPassword: false,
            isError: false,
            errorMsg: '',
        }
    },
    computed: {
        passwordType() {
            if (this.showPassword === false) {
                return 'password';
            } else {
                return 'text';
            }
        }
    },  
    methods: {
        async Login() {
            if (this.username === '') {
                this.invalidUsername = true;
                return;
            }
            if (this.password === '' || this.password.length < 6) {
                this.invalidPassword = true;
                return;
            }

            const formData = {
                username: this.username,
                password: this.password
            }

            await axios.post('http://localhost:5005/api/v1/login', formData).then((responseData) => {
                const token = responseData.data.existingUser.token;
                const username = responseData.data.existingUser.username;

                this.$store.state.token = token;
                this.$store.state.userName = username;

                localStorage.setItem('token', token);
                localStorage.setItem('userName', username);
                this.$router.replace('/calendar');
                console.log(responseData);
            }).catch((error) => {
                console.log(error);
                this.errorMsg = error.response.data.msg || 'Something went wrong, please refresh and try again later.';
                this.isError = true;
                return;
            });
        }
    }
}
</script>

<style scoped>
.inpt {
    width:50%;
    border:2px solid #aaa;
    border-radius:4px;
    margin:8px 10px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
    margin-left: 25%;
}
.inpt:focus {
    border-color: black;
    box-shadow:0 0 8px 0 black;
}
.checkbox-inpt {
    text-align: center;
    margin: 8px 0px ;
}
.input-div {
    border: 2px black solid;
    border-radius: 20px;
    width: 50%;
    margin-bottom: 70px;
}
.invalidInput, .invalidText {
    width:50%;
    border:2px solid red;
    border-radius:4px;
    margin:8px 10px;
    outline:none;
    padding:8px;
    box-sizing:border-box;
    transition:.3s;
    margin-left: 25%;
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
.error-box {
    text-align: center;
    color: red;
}
.invalid-text {
    margin: 0px;
    color: red;
    text-align: center;
}
.wrapper {
    margin-top: 150px;
    display: flex;
    justify-content: center;
}
.title {
    text-align: center;
}
.link {
    color: black;
}
</style>