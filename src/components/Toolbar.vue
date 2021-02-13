<template>
  <v-navigation-drawer
    id="app-drawer"
    
    app
    dark
    floating
    persistent
    
    width="260"
  >
    
      <v-layout class="fill-height" tag="v-list" column>
        <v-list-tile avatar>
          <v-list-tile-avatar color="white">
            <v-img :src="logo" height="34" />
          </v-list-tile-avatar>
          <v-list-tile-title class="title">Songify</v-list-tile-title>
        </v-list-tile>
        <v-divider />
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          
          avatar
          class="v-list-item"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="link.text" />
        </v-list-tile>
      </v-layout>
    
  </v-navigation-drawer>
</template>

<script>
// Utilities
//import { mapMutations, mapState } from "vuex";

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo:
      "https://cdn.imgbin.com/17/21/15/imgbin-music-record-listen-to-music-icon-sBuVDZ5C0BupVmnGfRsHNYjPv.jpg",

    links: [
      {
        to: "/",
        icon: "mdi-magnify",
        text: " Track Search"
      },
      {
        to: "/",
        icon: "mdi-library-music",
        text: "Audio Features"
      }
    ]
  }),
  computed: {
    
    
  },

  methods: {
    
  }
};
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;
  }
}
</style>

