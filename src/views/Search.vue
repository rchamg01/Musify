<template>
  <v-app>
    <v-main class="bg">
      <v-alert prominent dismissible type="error" v-model="error">
        El enlace de Spotify no es válido. Debes introducir en el buscador un enlace de un track. Ej: "https://open.spotify.com/track/6MqfTP3OwngywVTOS5OAFt?si=VgYVInrtR0ysy-rLgdYHPg"
      </v-alert>
      <menu-buttons></menu-buttons>
      <v-container align="center" class="centered">
       <v-card flat color="rgba(255,255,255,0.3)" class="pa-3 pa-xl-10"> 
          <h1 class="pl-8 pt-2">Búsqueda de canciones</h1>
          <v-container class="pa-6">
            <v-row>
              <v-col class="flex-grow-0 flex-shrink-1">
                <v-text-field filled rounded dense clearable prepend-inner-icon="mdi-magnify" v-model="searchSong" label="Track/album/playlist URL" hint="Introduce un enlace de Spotify" color="purple" @keyup.enter="send"/>
                <iframe :src="track" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              </v-col>
              <v-col class="flex-grow-0 flex-shrink-1">
                <v-tooltip color="rgb(255,255,255,0)" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="white--text" elevation="0" x-large color="rgba(255, 255, 255, 0.2)" rounded v-on="on" v-bind="attrs" @click="send">Play</v-btn>
                  </template>
                  <span>Reproduce canciones, álbumes o listas introduciendo un link válido de Spotify.</span>
                </v-tooltip>
              </v-col>
              <v-col>
                <v-tooltip color="rgb(255,255,255,0)" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="white--text" elevation="0" x-large color="rgba(255, 255, 255, 0.2)" rounded v-on="on" v-bind="attrs" @click="find">Search info</v-btn>
                  </template>
                  <span>Encontrarás más información sobre las cualidades del sonido en la Wiki del menú.</span>
                </v-tooltip>
                <div v-if="loaded" class="pt-6">
                  <v-card class="pa-8 rounded-xl" flat color="rgba(255,255,255,0.2)">
                    <v-row>
                    <v-col>
                      <p class="text-h5"><b class="text--secondary">Acousticness:</b> {{ this.trackFeatures.acousticness }}</p>
                      <p class="text-h5"><b class="text--secondary">Danceability:</b> {{ this.trackFeatures.danceability }}</p>
                      <p class="text-h5"><b class="text--secondary">Energy:</b> {{ this.trackFeatures.energy }}</p>
                      <p class="text-h5"><b class="text--secondary">Instrumentalness: </b>{{ this.trackFeatures.instrumentalness }}</p>
                      <p class="text-h5"><b class="text--secondary">Key:</b> {{ this.trackFeatures.key }}</p>
                      <p class="text-h5"><b class="text--secondary">Liveness: </b>{{ this.trackFeatures.liveness }}</p>
                    </v-col>
                    <v-col>
                      <p class="text-h5"><b class="text--secondary">Loudness:</b> {{ this.trackFeatures.loudness }}</p>
                      <p class="text-h5"><b class="text--secondary">Mode:</b> {{ this.trackFeatures.mode }}</p>
                      <p class="text-h5"><b class="text--secondary">Speechiness:</b> {{ this.trackFeatures.speechiness }}</p>
                      <p class="text-h5"><b class="text--secondary">Tempo: </b>{{ this.trackFeatures.tempo }}</p>
                      <p class="text-h5"><b class="text--secondary">Time signature: </b>{{ this.trackFeatures.time_signature }}</p>
                      <p class="text-h5"><b class="text--secondary">Valence:</b> {{ this.trackFeatures.valence }}</p>
                    </v-col>
                  </v-row>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-container>   
        </v-card>                  
      </v-container>
    </v-main>
  </v-app>
</template>
<script>

import Vue from 'vue'

export default {
  name: 'Search',
  data() {
    return {
      searchSong: "",
      track: "",
      trackId: "",
      /*items: [
        {title: "Acousticness: ", value: this.trackFeatures.acousticness },
        {title: "Danceability: ", value: this.trackFeatures.danceability},
        {title: "Energy: ", value: this.trackFeatures.energy},
        {title: "Instrumentalness: ", value: this.trackFeatures.instrumentalness},
        {title: "Key: ", value:  this.trackFeatures.key},
        {title: "Liveness: ", value: this.trackFeatures.liveness},
        {title: "Loudness: ", value: this.trackFeatures.loudness},
        {title: "Mode: ", value: this.trackFeatures.mode},
        {title: "Speechiness: ", value: this.trackFeatures.speechiness},
        {title: "Tempo: ", value: this.trackFeatures.tempo},
        {title: "Time signature: ", value: this.trackFeatures.time_signature},
        {title: "Valence: ", value: this.trackFeatures.valence},
      ],*/
      ej1: "https://open.spotify.com/embed/track/0FD8KMG4pHp0O9clTpChjp",
      ej2: "https://open.spotify.com/track/6MqfTP3OwngywVTOS5OAFt?si=VgYVInrtR0ysy-rLgdYHPg",
      loaded: false,
      error: false
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    trackFeatures(){
      return this.$store.getters.getTrackFeatures;
    }
  },
  methods: {
    logOut() {
      this.$store.commit('mutateUser', null);
      this.$router.push({ name: 'Home'});
    },
    send() {
      if(this.searchSong != null){
        var inte = this.searchSong.indexOf("?");
        if(inte != -1){
          var cutString = this.searchSong.slice(0, inte);
          var stringD = cutString.replace(".com/", ".com/embed/");
          this.track = stringD;
        }else{
          var stringE = this.searchSong.replace(".com/", ".com/embed/");
          this.track = stringE;
        }
      }
      
    },
    find(){ 
      if(this.searchSong != null && !this.searchSong.includes("playlist") && !this.searchSong.includes("album") && this.searchSong.includes("https://open.spotify.com")){

        var inte = this.searchSong.indexOf("?");
        var k = this.searchSong.indexOf("k");

        if(inte != -1){           
          this.trackId = this.searchSong.slice(k+2, inte);
        }else{
          this.trackId = this.searchSong.slice(k+2, this.searchSong.length);
        }

        Vue.axios.get('https://api.spotify.com/v1/audio-features/'+this.trackId, {
          headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('credenciales')
          }
        }).then((response) => {
          this.$store.commit('mutateTrackFeatures', response.data);
          this.loaded = true;
          // eslint-disable-next-line no-console
          //console.log('Response from server: ');
          // eslint-disable-next-line no-console
          //console.log(response.data);
        })
      }else{
        this.error = true;
      }
    }
  },    
  created() {}
}
</script>

<style scoped>
  
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
    width: 50px;
    border-radius: 25%;
  }
  
</style>