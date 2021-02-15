<template>
  <v-app id="inspire">
    <v-main class="bg">
      <template v-if="this.user">
        <menu-buttons></menu-buttons>  
        <v-container class="centered">
            <h1 class="pb-8">Hola, {{ this.user.display_name }}:</h1>
            <v-row justify="center">
                <v-flex v-for="item in items" :key="item.title">
                    <v-col class="d-flex flex-wrap justify-center">
                        <v-card class="pa-8 rounded-xl" width="450" flat color="rgba(255,255,255,0.3)">
                            <v-card-text class="text-center text-h5">{{item.title}}</v-card-text>
                            <v-card-actions>
                                <v-btn  :to="item.link" block class="white--text" elevation="0" x-large color="rgba(255, 255, 255, 0.2)" rounded>ir</v-btn>
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
            
            items: [
                { 
                title: 'Ver información de mi perfil',
                link: "/user"
                },
                { 
                title: 'Top artistas escuchados',
                link: "/stats"
                
                },
                { 
                title: 'Top canciones escuchadas',
                link: "/statsSongs"
                
                },
                { 
                title: 'Glosario cualidades de la música',
                link: "/features"
                },
                { 
                title: 'Buscador',
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
            return this.$store.getters.getUser;
        }
    },
    methods: {
        
        getAccessToken()
        {
            return this.access_token;
        }
    },
    created() {
        if (this.$route.query) {
            Vue.axios.get('https://api.spotify.com/v1/me/', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('credenciales')
                }
            }).then((response) => {
                this.$store.commit('mutateUser', response.data);
                localStorage.setItem('username', this.user.display_name);
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