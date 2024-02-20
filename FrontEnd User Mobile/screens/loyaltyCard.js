import { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

function Redeem(){
  return(
<View style={styles.redeemBox}>
          <Image src={require("../assets/coffeeGuy.png")} />
          <Text style={{fontSize:40,textAlign:"center"}}>Its free coffee time!</Text>
          <Pressable style={styles.freeCoffeeStamp}
            onPress={() => {
              RedeemCoffee;
            }}
          >
            <Text style={styles.freeCoffeeText}>Redeem</Text>
          </Pressable>
        </View>
  )
}

function CoffeeTicker({ cardDetails }) {
  console.log(cardDetails.coffees_required, cardDetails.coffeesEarnt);
  const list = [...Array(cardDetails.coffees_required).keys()];
  const [stampBoxSize, setStampSize]= useState({height:10})
  let stampHeight = (stampBoxSize.height / (list.length/2) )
  return (
      
    <View style={styles.card}>
      <View style={styles.title}>
        <Text adjustsFontSizeToFit={true} style={styles.titleText}>{cardDetails.name}</Text>
      </View>
      {cardDetails.coffeesEarnt === list.length ? (
        <Redeem/>
      ) : (<>
        <View style={styles.stampContainer} onLayout={(event)=>{setStampSize(event.nativeEvent.layout)}}>
          {list.map((i) => {
            return (
              <View
                style={[styles.stamp, {maxHeight:stampHeight ,width:stampHeight ,maxWidth:"40%"}
                  // {
                  // maxHeight:stampHeight-20 ,maxWidth:"30%",aspectRatio:1}
                ]
                }
                key={i}
              >
                  <Image
                    source={{ uri: cardDetails.logo }}
                    style={{
                      width:"100%",
                      height: "100%",
                      opacity: 0.4,
                      aspectRatio:1,
                    }}
                  />
                  {i < cardDetails.coffeesEarnt &&
                    <Image
                      source={require("../assets/bean_stamp.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        // top: "50%",
                        // left: "50%",
                        // transform: "translateY(-50%) translateX(-50%)",
                      }}
                    />
                   }
              </View>
            );
          })}
          
        </View>
      <View style={styles.freeCoffeeStamp}>
        <Text style={styles.freeCoffeeText}>Free Coffee</Text>
      </View></>
      )}
    </View>
  );
}

export default function LoyaltyCard({ navigation, route }) {
  console.log("LoyaltyCard");
  const cardDetails = route.params;
  console.log(cardDetails);
  return (
    <View
      style={styles.mainContainer}
    >
      <CoffeeTicker cardDetails={cardDetails} />
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    justifyContent:"center",
    alignContent:"center",
    padding:30,
    paddingVertical:50,
    backgroundColor: "#936748"
  },
  titleText:{
    textAlign:"center",
    fontSize:36
  },

  freeCoffeeStamp:{
    justifyContent:"center",
    alignContent:"center",
    borderRadius:20,
    backgroundColor:"#EADDCA",
  alignSelf:"center",
  marginVertical:10,
  },
  freeCoffeeText:{
    textAlign:"center",
    paddingHorizontal:40,
    paddingVertical:20,
    fontSize:30
  },
  stamp:{
    maxWidth:"50%",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:20,
    backgroundColor:"#EADDCA",
    padding:10,
    aspectRatio:"1/1",
    alignSelf:"center"
  },
  card: {
    // alignContent: "space-around",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    borderWidth: 10,
    borderRadius: 10,
    borderColor: "#4B2D0B",
    backgroundColor: "#cdb891",   
    flex:1,
    padding:20,
  },
  title:{
    justifyContent:"center",
    alignItems:"center",
    padding:20,
   }
    ,
  stampContainer:{
    alignContent:"stretch",
    width:"100%",
    flexWrap:"wrap",
    justifyContent:"space-evenly",
    flexDirection:"row",
    flex:1,
    padding:"auto",
    // r1wGap:20,
    gap:5



  },
  redeemBox:{
    flexDirection:"column",
    justifyContent:"space-around",
    height:"85%",
    alignItems:"center"
  }
});
