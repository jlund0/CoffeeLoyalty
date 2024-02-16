import { View ,StyleSheet,Text,Pressable ,ScrollView,Image,
  Animated,
  Dimensions,
  ActivityIndicator, } from "react-native";
import NavBar from "../components/NavBar";
// import {  } from "react-native-maps";
import MapView, {PROVIDER_GOOGLE,Marker } from "react-native-maps";
import * as Location from 'expo-location';
import React, { useState, useEffect,useRef } from 'react';
import { getStoreLogo, getStores } from "../firebasefunctions";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome"



const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height/6;
const CARD_WIDTH = width*0.8;

export function MapScreen({ navigation }) {
  console.log("Map")
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [markers ,setMarkers] = useState(null)
  const [loading, setLoading] = useState(true)

  const mapRef = useRef(null);
  const scrollRef = useRef(null)
  // const interpolations = markers.map((marker, index) => {
  //   const inputRange = [
  //     (index - 1) * CARD_WIDTH,
  //     index * CARD_WIDTH,
  //     (index + 1) * CARD_WIDTH,
  //   ];
  // })

  const scrollX = useRef(new Animated.Value(0)).current;


 

  const mapMarkers=()=>{
    return markers.map((marker, index) => {
      return(
      <Marker coordinate={{latitude: marker.coords.latitude, longitude: marker.coords.longitude}} title={marker.name} key={index} image={require('../assets/coffeemarker.png')}
      onPress={(e) => scrollRef.current.scrollTo({x: (index*CARD_WIDTH), animated: true})}
      ></Marker>)})
  }

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      const storefetch = await getStores(location.coords.latitude,
         location.coords.longitude)
      setMarkers(storefetch.sort((p1,p2)=>(p1.distanceAway > p2.distanceAway) ? 1 : (p1.distanceAway < p2.distanceAway) ? -1 : 0))
      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setLoading(false)
    };
    getLocation();
  
  }, []);
  useEffect(()=>{
    scrollX.addListener(({ value }) => {
      if(markers != null){
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coords } = markers[index];
          mapRef.current.animateToRegion(
            {
              latitude: coords.latitude, 
              longitude: coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            350
          );
        }
      }, 10);}
  })},[scrollX])

  const goToCurrentLocation = () => {
    mapRef.current.animateToRegion(initialRegion, 1000);}

  const goToStore = (coords) =>{
    mapRef.current.animateToRegion({latitude:coords.latitude,longitude:coords.longitude,latitudeDelta: 0.005,
      longitudeDelta: 0.005,}, 1000);
  }


  return (
    <View style={styles.mainContainer}>
      <Pressable style={styles.currentLocation} onPress={goToCurrentLocation}>
        <FontAwesomeIcon name="location-arrow" size={40}/>
      </Pressable>
        <MapView ref={mapRef} style={styles.map} 
        initialRegion={initialRegion} 
        showsUserLocation={true} 
        loadingEnabled = {true}
         loadingIndicatorColor="#666666"
         loadingBackgroundColor="#eeeeee"
         followsUserLocation={true}
         showsMyLocationButton={true}
         >
           {markers != null && mapMarkers()}
        </MapView>
      <Animated.ScrollView style={styles.scrollView} horizontal={true}
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH}
      contentContainerStyle={styles.endPadding}
      ref={scrollRef}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
        { useNativeDriver: true }
      )}
        >
      {markers != null ?  
      markers.map((marker, index) => {
        return(
          <Pressable style={styles.card} key={`markercard-${index}`} onPress={()=>{goToStore(marker.coords)}}>
          <Image source={{uri:marker.logo}} style={styles.logo}></Image>
          <View style={styles.textBox}>
           <Text>{marker.name}</Text> 
          <Text>{marker.location}</Text>
          <Text>{Math.floor(marker.distanceAway)} meters away</Text></View>
        </Pressable>   
       )
      }):<View style={styles.card}><ActivityIndicator/></View>}
      </Animated.ScrollView>

      <NavBar navigation={navigation} isFocused={"map"} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: "#936748",
  },
  map:{
    flex:3,
    margin:10,
    borderRadius:20,
    
  },
  currentLocation:
  {
    position:"absolute",
    zIndex:1,
    right:"6%",
    top:"50%",
    backgroundColor:"white",
    paddingHorizontal:20,
    paddingVertical:15,
    borderRadius:60,
  }
  ,  
  scrollView: {
    // position: "absolute",
    // bottom: 100,
    // left: 0,
    // right: 0,
    paddingVertical: 10,
    zIndex:2,
    flex:1

  },  card: {
    padding:20,
    elevation: 2,
    backgroundColor: "#C4A484",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius:20,
    alignContent:"stretch",
    alignItems:"stretch",
    justifyContent:"center", 
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },marginHorizontal: 10,
  },
  logo:{
    width:CARD_WIDTH,
    height:CARD_HEIGHT * 0.7,
    position:"absolute",
    resizeMode:"contain",
    left:0,
  
  },
  textBox:{
    backgroundColor:"rgba(255,255,255,0.8)",
    padding:20,
    borderRadius:10
  },  endPadding: {
    paddingRight: width *0.05,
    paddingLeft: width*0.08,
  },
})