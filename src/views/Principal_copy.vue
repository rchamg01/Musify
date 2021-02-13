<template>
  <v-app id="inspire">
    <v-main class="bg">
      <template v-if="this.user">
      <menu-buttons></menu-buttons>  
      <v-container
        align="center"
        class="centered"
      >
      <h1 class="pa-5">Hola, {{ this.user.display_name }}:</h1>
        <v-row
          align="center"
          style="height: 150px;"
        ><v-flex  v-for="item in items"
            :key="item.title">
          <v-col>
            <v-card
              class="pa-8"
              outlined
              shaped
              height="200px"
              color="rgba(255,255,255,0.3)"
              
            ><v-card-text class="text-justify">{{item.title}}</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn  :to="item.link" text color="rgba(255, 255, 255, 1)" outlined rounded >ir</v-btn>
            </v-card-actions>
              
            </v-card>
          </v-col>
          </v-flex>
        </v-row>
      </v-container>
      <v-main>
      <router-view></router-view>
    </v-main>
      </template>
      <template v-else>
        <div class="centered">
          <v-card flat color="rgba(255,255,255,0.3)" class="pa-8"> 
            <v-card-title class="justify-center">Musify</v-card-title>
            <v-card-subtitle>Obtén estadísticas sobre tus escuchas en spotify y aprende datos curiosos sobre tus canciones favoritas</v-card-subtitle>
            <v-card-actions class="justify-center">
              <v-btn href="http://localhost:8082/login" text color="rgba(255, 255, 255, 1)" outlined rounded>Regístrate con Spotify
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </template>
      <!--<v-footer
    color="primary lighten-1"
    padless
    absolute
    persistent
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="n in 4"
        :key="n"
        color="white"
        text
        rounded
        class="my-2"
      >
        link {{n}}
      </v-btn>
      <v-col
        class="primary lighten-2 py-2 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Musify</strong>
      </v-col>
    </v-row>
  </v-footer>-->
    </v-main>
  </v-app>
</template>
      
<script>
    import Vue from 'vue'
    import { MenuButtons } from "@/components/MenuButtons.vue";

    export default {
        name: 'Principal',
        data() {
            return {
                email: '',
                items: [
                  { 
                    title: 'Ver información de mi perfil',
                    link: "/user"
                  },
                  { 
                    title: 'Estadisticas de artistas',
                    link: "/stats"
                  
                  },
                  { 
                    title: 'Estadisticas de canciones',
                    link: "/statsSongs"
                  
                  },
                  { 
                    title: 'Aprende qué esconden las canciones',
                    link: "/features"
                  },
                  { 
                    title: 'Busca información sobre una canción',
                    link: "/search"
                  },
                ],
                components: {
                  MenuButtons,
                }
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser
            }
        },
        methods: {
            
            getAccessToken()
            {
              return this.access_token;
            }
        },
        created() {
          //buscar si estan ya las credenciales
          


          if (this.$route.query) {
              
              this.$root.setAccessToken(this.$route.query.access_token);
              this.$root.setRefreshToken(this.$route.query.refresh_token);
              
              if(localStorage.getItem('credenciales') != undefined){
                localStorage.setItem('credenciales', this.$route.query.access_token);
              }
                 // eslint-disable-next-line no-console
                    console.log("credenciales antes get: " + localStorage.getItem('credenciales'));

                Vue.axios.get('https://api.spotify.com/v1/me/', {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('credenciales')
                    }
                }).then((response) => {
                    this.$store.commit('mutateUser', response.data);
                    this.$router.push({ name: 'Home'})
                    
                    // eslint-disable-next-line no-console
                    console.log("credenciales then: " + localStorage.getItem('credenciales'));
                  
                    // eslint-disable-next-line no-console
                    //console.log('Response from server: ');
                    // eslint-disable-next-line no-console
                    //console.log(this.$store.state.user);
                })
            }

            
        }
    }
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
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
    width: 50px;
  }
</style>