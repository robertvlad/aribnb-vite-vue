<template>
    <div class="map-container my-3">
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { fromLonLat } from 'ol/proj';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import { Map, View, Overlay } from 'ol';
  
  export default {
    data() {
      return {
        map: null,
        marker: null,
        view: null,
        apiKey: '186r2iPLXxGSFMemhylqjC36urDbgOV2',
      };
    },
    props: {
        address: String,
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        this.view = new View({
          center: fromLonLat([0, 0]),
          zoom: 2,
        });
        this.map = new Map({
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          target: 'map',
          view: this.view,
        });
        this.geocodeAddress()
      },
      geocodeAddress() {
        console.log("ciaooo")
        axios.get('https://api.tomtom.com/search/2/geocode/' + encodeURIComponent(this.address) + '.json', {
        params: {
          key: this.apiKey,
        },
        })
        .then(response => {
          if (response.data.results.length > 0) {
            const result = response.data.results[0];
            const coords = fromLonLat([result.position.lon, result.position.lat]);
            this.view.animate({
              center: coords,
              zoom: 18,
              duration: 2000,
            });
            if (!this.marker) {
              this.marker = new Overlay({
                position: coords,
                positioning: 'center-center',
                element: document.createElement('div'),
                stopEvent: false,
              });
              this.map.addOverlay(this.marker);
            }
            this.marker.setPosition(coords);
          }
        })
        .catch(error => {
          console.log(error);
        });
      },
    },
  };
  </script>
  
  <style scoped lang="scss">
  .map-container {
    position: relative;
    width: 100%;
    height: 700px; /* altezza desiderata */
    overflow: hidden;
  }
  
  #map {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  </style>
  