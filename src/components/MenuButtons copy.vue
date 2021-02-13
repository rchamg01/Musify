<template>
    
    <v-row class="pt-6">
        <v-col >
            <v-btn to="/principal" color="rgba(255, 255, 255, 1)" outlined rounded >Home</v-btn>
        </v-col>
        <v-col class="text-right">
            <v-btn right v-on:click="logOut()" color="rgba(255, 255, 255, 1)" outlined rounded >Log out</v-btn>
        </v-col>
    </v-row>
            
</template>
        
<script>
    export default {
        name: 'MenuButtons',
        data() {
            return {}
        },
        computed: {},
        methods: {
            logOut() {
                this.$store.commit('mutateUser', null);
                this.$router.push({ name: 'Home'})
            }
        },
        created() {}
    }
</script>

<style scoped>
  .bg {
    background-image: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  }
</style>