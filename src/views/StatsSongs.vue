<template>
  <v-app>
    <v-main class="bg">
      <menu-buttons></menu-buttons>
      <v-container align="center" class="centered">
        <v-card :height="height" class="pa-8" flat color="rgba(255,255,255,0.3)"> 
          <v-row>
            <v-col class="flex-grow-1 flex-shrink-0">
              <h1 class="pb-3">{{ this.user }}, aquí tienes tu top de canciones: </h1> 
            </v-col>
            <v-col class="flex-shrink-0 flex-grow-1">
              <v-select dense v-model="select" :items="options" :menu-props="{ bottom: true, offsetY: true }" label="Tiempo" color="rgba(255,255,255)" filled rounded></v-select>
            </v-col>
            <v-col class="flex-shrink-0 flex-grow-1">
              <v-select dense v-model="select2" :items="options2" :menu-props="{ bottom: true, offsetY: true }" label="Nº canciones" color="rgba(255,255,255)" filled rounded></v-select>
            </v-col>
            <v-col class="flex-grow-0 flex-shrink-1">
              <v-btn class="white--text" elevation="0" x-large color="rgba(255, 255, 255, 0.2)" rounded @click="send" >Mostrar</v-btn>
            </v-col>
          </v-row>
          <v-card :height="height-180" color="rgb(0,0,0,0)" class="overflow-auto" flat>
            <v-row v-if="loaded" class="justify-center" no-gutters>
              <v-flex v-for="(item, index) in this.topTracks.items" :key="index" xl3 md5>
                <v-col>
                  <v-card class="pa-3 rounded-xl justify-center" max-height="180" flat color="rgb(255,255,255,0.5)">
                    <v-row>
                      <v-col class="flex-grow-0 flex-shrink-1"> 
                        <v-img class="profile_pic" :aspect-ratio="1/1" :src="item.album.images[0].url">
                          <v-tooltip color="rgb(255,255,255,0.3)" bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn class="profile_pic" height="160" color="rgb(0,0,0,0.2)" target="_blank" v-on="on" v-bind="attrs" :href="item.external_urls.spotify">
                                <h1 class="text-h1 font-weight-bold white--text">{{index+1}}</h1>
                              </v-btn>
                            </template>
                            <span>link a la canción</span>
                          </v-tooltip>
                        </v-img>
                      </v-col>
                      <v-col >
                        <v-card-text class="overflow-y-auto">
                          <h2>{{ item.name }}</h2>   
                          <v-subheader>
                            <div class="pt-10 font-weight-normal" v-for="artist in item.artists" :key="artist.id">
                              <p>{{artist.name}}‏‏‎</p>
                            </div>
                          </v-subheader>
                        </v-card-text>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-flex> 
            </v-row>
          </v-card>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>

import Vue from 'vue'

export default {
  name: 'Stats',
  
  data() {
    return {
      select: 'un mes',
      options: ['un mes', '6 meses', 'desde siempre'],
      select2: '10',
      options2: ['10', '20', '30', '50'],
      loaded: false,
      value: ""          
    }
  },
  computed: {
    user() {
      return localStorage.getItem('username');
    },
    topTracks(){
      return this.$store.getters.getTopTracks
    },
    // eslint-disable-next-line vue/return-in-computed-property
    height(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 220
        case 'sm': return 400
        case 'md': return 500
        case 'lg': return 620
        case 'xl': return 800
      }
    },
  },
  methods: { 
    send(){         
      if(localStorage.getItem('credenciales') == ""){
        this.$router.push({ name: 'Home'});
      }

      if(this.select == "desde siempre"){
        this.value = "long_term";
      }else if(this.select == "6 meses"){
        this.value = "medium_term";
      }else{
        this.value = "short_term";
      }
                
      Vue.axios.get('https://api.spotify.com/v1/me/top/tracks?time_range='+this.value+'&limit='+this.select2+'&offset=0', { 
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('credenciales')
        }
      }).then((response) => {
        this.$store.commit('mutateTopTracks', response.data);
        this.loaded = true;
        
        // eslint-disable-next-line no-console
        //console.log('Response from server: ');
        // eslint-disable-next-line no-console
        console.log(this.$store.state.items);
      })
    }      
  },
  created() {}
}
</script>
<style scoped>

  html {
    overflow: hidden !important;
  }

  .v-card {
    display: flex !important;
    flex-direction: column;
  }

  .v-card__text {
    flex-grow: 1;
    overflow: auto;
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
    width: 150px;
    border-radius: 5%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #e6e6e621;
   
  }

  ::-webkit-scrollbar-thumb {
    background: #0000001c;
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.281);
  }
</style>
