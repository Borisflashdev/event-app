<template>
    <div class="wrapper">
        <div class="display" v-for="panel in panels" :key="panel">
            <div class="text">
                <h1>{{ panel.title }}</h1>
                <p>{{ panel.text }}</p>
                <div>
                    <base-button :to="panel.btnLink" class="btn">
                        <base-button :isButton="true">{{ panel.btn }}</base-button>
                    </base-button>
                </div>
            </div>
            <div>
                <img :src="require('../../assets/images/' + panel.imageLink)" :alt="panel.altImg">
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            panels: [{ 
                imageLink: 'party_img.jpg',
                altImg: 'party_image',
                text: 'Zero hidden service fees, price match guarantee, group discounts, and more. Because it should be this easy.',
                title: 'The Best Event app on the internet.',
                btn: 'Go to the Calendar',
                btnLink: '/calendar'
            }, {
                imageLink: 'team.jpg',
                altImg: 'team_image',
                text: 'We are registered event organization under the legal name EVENTS (118878511RR0001), founded in 2022 as a merger between the Canadian Guild of Events and the Ontario Event Foundation.',
                title: 'Who are we?',
                btn: 'Find out more',
                btnLink: '/aboutus'
            }]
        }
    }
}
</script>

<style scoped>
h1 {
    margin-top: 100px;
    font-size: 60px;
    margin-bottom: 10px;
}
img {
    height: 500px;
    width: 700px;
    margin-right: 5rem;
    margin-top: 30px;
    border-radius: 20px;
}
.wrapper {
    margin-top: 100px;
}
.display {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
}
.text {
    padding-left: 70px;
    width: 500px;
    font-size: 20px;
    margin-left: 4px;
}
.btn {
    padding: 0px !important;
}
</style>