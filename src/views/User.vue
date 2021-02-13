<template>
  <v-app>
    <v-main class="bg">
      <template v-if="this.user">
        <menu-buttons></menu-buttons>
        <v-container align="center" class="centered">
          <div class="pb-5 text-h4 font-weight-bold white--text">{{ this.user.display_name }}, estos son tus datos de usuario:</div>
          <v-card color="rgba(255,255,255,0.3)" flat class="pa-8"> 
            <v-container>
              <v-row>
                <v-col class="flex-grow-0 flex-shrink-1">
                  <img :src="this.user.images[0].url" alt="profile_picture" class="profile_pic">
                  <v-btn :href="this.user.external_urls.spotify" target="_blank" color="rgba(255, 255, 255, 0.6)" block filled rounded depressed>Link al perfil</v-btn>
                </v-col>
                <v-col class="pl-8">
                  <div class="text-button">E-mail:</div>
                  <div class="text-h5 font-weight-bold pb-4">{{ this.user.email }}</div>
                  <div class="text-button">URI:</div>
                  <div class="text-h5 font-weight-bold pb-4">{{ this.user.uri }}</div>
                  <div class="text-button">Seguidores:</div>
                  <div class="text-h5 font-weight-bold pb-4">{{ this.user.followers.total }}</div>
                </v-col>
                <v-col>
                  <div class="text-button">País:</div>
                  <div class="text-h5 font-weight-bold pb-4">{{ this.user.country }}</div>
                  <div class="text-button">Tipo de membresía:</div>
                  <div class="text-h5 font-weight-bold pb-4">{{ this.user.product }}</div>
                  <div class="text-button">Tipo de cuenta:</div>
                  <div class="text-h5 font-weight-bold pb-4">{{ this.user.type }}</div>
                </v-col> 
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </template>
    </v-main>  
  </v-app>
</template>
<script>

import Vue from 'vue'

export default {
  name: 'User',             
  data() {
      return {
        /*photoExists(){
          var photo_profile ='';
          if(typeof(this.user.images[0].url) != 'undefined') {
              photo_profile = this.user.images[0].url
              return photo_profile
          }else{
              photo_profile = 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
              return photo_profile
          }
        },*/
      }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },    
  methods: {},

  created() {   
                        
    if(localStorage.getItem('credenciales') == ""){
      this.$router.push({ name: 'Home'});
    }

    if (this.$route.query) {
      Vue.axios.get('https://api.spotify.com/v1/me/', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('credenciales')
        }
      }).then((response) => {
        this.$store.commit('mutateUser', response.data);
        // eslint-disable-next-line no-console
        //console.log("token local then user:" +localStorage.getItem('credenciales'));
        //console.log('Response from server: ');
        //console.log(this.$store.state.user);
      })
    }
  }
}
</script>
<style scoped>

  .change-font {
    font-family: "Arial", Helvetica, sans-serif;
  }

  .v-application h1 {
    font-family: "Arial", Helvetica, sans-serif;
    color: rgb(255, 255, 255, 0.4)
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

  .profile_pic {
    width: 400px;
    border-radius: 5%;
  }
  
</style>
