<template>
  <v-app>
    <v-main class="bg">
     <template>
       <menu-buttons></menu-buttons>
        <v-container grid-list-xl>
        <v-layout justify-center>
          <v-flex class="pb-15">
            <v-container grid-list-md text-xs>
              <v-layout wrap fill-height fill-width>
                <v-flex v-for="item in items" :key="item.id" d-flex xs4>
                  <v-card class="pa-8 rounded-xl" flat color="rgb(255,255,255,0.5)">
                    <v-card-title primary-title>                   
                        <div class="headline">{{ item.name }}</div>
                    </v-card-title>
                        <div class="text-justify">{{ item.description }}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
     </template>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "features",
 
  data (){
    return {
      items: [
      {
        name: "Popularity",
        description:
          "It analyses the number of listens a track has and rates it in a number from 0 to 100: from less known/listened to more known/more listened respectively."
      },
      {
        name: "Mode",
        description:
          "Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0."
      },
      {
        name: "Key",
        description: "The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on.‎‎‎‎‎‎‎‎‎‎‎‏‏‎‎‏‎"
      },
      {
        name: "Tempo",
        description:
          "	The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration."
      },
      {
        name: "Acousticness",
        description:
          "A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. "
      },
      {
        name: "Energy",
        description:
          "Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy."
      },
      {
        name: "Instrumentalness",
        description:
          "Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0. "
      },
      {
        name: "Liveness",
        description:
          "Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live."
      },
      {
        name: "Loudness",
        description:
          "The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typical range between -60 and 0 db. "
      },
      {
        name: "Speechiness",
        description:
          "	Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks. "
      },
      {
        name: "Time signature",
        description:
          "	An estimated overall time signature of a track. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure)."
      },
      {
        name: "Valence",
        description:
          "A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry). "
      },
      {
        name: "Danceability",
        description:
          "	Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable."
      }
      ],
      
    }
    
  }
};
</script>
<style scoped>

  .bg {
    background-image: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);
  }
  .centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
