<template>
  <v-app id="inspire">
    <v-main class="bg"> 
      <template>
        <div class="centered">
          <v-card flat color="rgba(255,255,255,0.3)" class="pa-8 rounded-xl"> 
            <v-card-title class="justify-center text-h1 font-weight-bold">
                <v-icon class="text-h1" x-large>mdi-spotify</v-icon> Musify
            </v-card-title>
            <v-card-subtitle class="text-center pt-5 text-h5">Obtén estadísticas sobre tus escuchas en Spotify y aprende datos curiosos sobre tus canciones favoritas.</v-card-subtitle>
            <v-card-actions class="justify-center">
              <v-btn href="http://localhost:8082/login" class="white--text" elevation="0" block x-large color="rgba(255, 255, 255, 0.2)" rounded>Regístrate con Spotify</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </template>
    </v-main>
  </v-app>
</template>
      
<script>
import Vue from 'vue'

export default {
    name: 'Home',
    data() {
        return {}
    },
    computed: {
        user() {
            return this.$store.getters.getUser
        }
    },
    methods: {  
        getAccessToken() {
            return this.access_token;
        }
    },
    created() {
        
        if (this.$route.query) {
            
            this.$root.setAccessToken(this.$route.query.access_token);
            this.$root.setRefreshToken(this.$route.query.refresh_token);
            
            localStorage.setItem('credenciales', this.$route.query.access_token);

            Vue.axios.get('https://api.spotify.com/v1/me/', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('credenciales')
                }
            }).then((response) => {
                this.$store.commit('mutateUser', response.data);
                this.$router.push({ name: 'Principal'})
            })
        }

        
    }
}
</script>

<style scoped>

    .v-card__title {
        color: #42443d34;
    }

    .font-type {
        font-family: "Lucida Console", "Courier New", monospace;
    }
  
    .bg {
        background: rgb(34,193,195);
        background-image: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
    }
    .centered {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>