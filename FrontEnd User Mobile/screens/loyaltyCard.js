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
import LottieView from "lottie-react-native";
import QRCode from "react-native-qrcode-svg";

function Redeem({cardID}){
  const [showQR , setShowQR] = useState(false)
  const RedeemCoffee = () =>{
    setShowQR(true)

  }
  return(
<View style={styles.redeemBox}>
{!showQR?(<View style={{flex:1, justifyContent:"space-between"}}>

<LottieView
      source={require("../assets/cupwalking.json")}
      autoPlay
      loop
    />
          <Text style={{fontSize:40,textAlign:"center" ,paddingTop:40}}>Its free coffee time!</Text>
       
          <Pressable style={styles.freeCoffeeStamp}
            onPress={
              RedeemCoffee
            }
          >
            <Text style={styles.freeCoffeeText}>Redeem</Text>
          </Pressable>
          </View>):
          <View style={{justifyContent:"center" , borderRadius:20,
          backgroundColor:"#EADDCA",padding:30}}>
            <Text style={{textAlign:"center", fontSize:40, fontWeight:"bold"}} numberOfLines={1} adjustsFontSizeToFit={true}>Free Coffee</Text>
          <QRCode
            value={`Redeem/${cardID}`}
            size={Dimensions.get("window").height * 0.25}
            backgroundColor={"transparent"}
          />
         </View>}
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
        <Text adjustsFontSizeToFit={true} style={styles.titleText} numberOfLines={1}>{cardDetails.name}</Text>
      </View>
      {cardDetails.coffeesEarnt === list.length ? (
        <Redeem cardID={cardDetails.cardId}/>
      ) : (<>
        <View style={styles.stampContainer} onLayout={(event)=>{setStampSize(event.nativeEvent.layout)}}>
          {list.map((i) => {
            return (
              <View
              // style={[styles.stamp, {maxHeight:stampHeight ,width:stampHeight ,maxWidth:"40%"}]}
              style={[styles.stamp, {maxHeight:stampHeight ,width:stampHeight ,maxWidth:"40%"}]}
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
    fontSize:36,
    fontWeight:"bold"
  },

  freeCoffeeStamp:{
    justifyContent:"center",
    alignContent:"center",
    borderRadius:20,
    backgroundColor:"#EADDCA",
  alignSelf:"center",
  marginVertical:10,
  borderWidth:5,
  borderColor:"#4B2D0B"
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
    backgroundColor:"#EADDCA",
    borderRadius:20
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
    justifyContent:"space-around",
    flex:8,
    alignItems:"center",
    alignContent:"center",
    width:"100%",
    justifyContent:"center"
  }
});
