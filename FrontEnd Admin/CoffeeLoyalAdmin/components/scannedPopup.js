import { View, Text, Button, Pressable, StyleSheet,Image } from "react-native";
import { getUser, getUserCard } from "../firebaseFunctions";
import { useState, useEffect } from "react";
import FontistoIcon from "react-native-vector-icons/Fontisto";
import { ConfirmCoffee } from "./confirmCoffeeStamp";
import { TouchableOpacity,Dimensions } from 'react-native';

// export function ScannedPopUp({ userid, store, navigation , route }) {
export function ScannedPopUp({ route, navigation }) {
  const { userid, store } = route.params;
  const [changed, setChanged] = useState(false);
  const [addCoffees, setAddCoffees] = useState(0);
  const [userCard, setUserCard] = useState(null);
  const [user, setUser] = useState(null);
  const [cardsCompleted, setCardsCompleted] = useState(0);
  const [stampCardCount, setStampCardCount] = useState(0);
  
  useEffect(() => {
    async function fetchdata() {
      const card = await getUserCard(userid, store.id);
      const userdata = await getUser(userid);
      setUserCard(card);
      setUser(userdata);
      setStampCardCount(card.coffeesEarnt);
    }
    fetchdata();
  }, []);
  const stamplist = [...Array(store.coffees_required).keys()];
  const handleAdd = () => {
    console.log("adding coffee");
    setAddCoffees((prev) => prev + 1);
    setStampCardCount(stampCardCount + 1);
    setChanged(true);

    if ((addCoffees + userCard.coffeesEarnt) % store.coffees_required == 0) {
      setCardsCompleted(cardsCompleted + 1);
      setStampCardCount(1);
    }
  };

  if (user == null || userCard == null) {
    return null;
  }

  // setTimeout(() => {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: "green",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text style={{ color: "white", fontSize: 50 }}>
  //         {user.name} Scanned
  //       </Text>
  //     </View>
  //   );
  // }, 500000);

  const onUndoPress = () => {
    setAddCoffees(0);
    setChanged(false);
    setStampCardCount(userCard.coffeesEarnt);
    setCardsCompleted(0);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.text,{fontWeight:"bold"}]}>{user.name}</Text>
      <Text style={styles.text}> Stamp Card</Text>
      <Pressable style={styles.stampContainer} onPress={handleAdd}>
      <Image source={{ uri: store.logo  }} style={styles.storelogo} />
        {stamplist.map((i) => {
          return (
            <View style={styles.stamps} key={i}>
              <View>
                {/* {i < userCard.coffeesEarnt + addCoffees ? ( */}
                {i < stampCardCount ? (
                  <FontistoIcon
                    name="checkbox-active"
                    size={80}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                ) : (
                  <FontistoIcon
                    name="checkbox-passive"

                    size={80}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                  />
                )}
                
              </View>
              
            </View>
            
          );
          
        })}
       
        {/* <View style={{borderWidth:6,alignItems:'center',width:80,height:80}}>
        <Text style={{textAlign:"center",fontStyle:"bold"}}>Free</Text><Text style={{textAlign:"center",fontStyle:"bold"}}>Coffee</Text></View>  */}
     
      </Pressable>
     
      {/* <Text style={styles.text}>Stamps: {addCoffees}</Text> */}
      {/* {cardsCompleted > 0 && <Text style={styles.text}>Cards completed: {cardsCompleted}</Text>} */}
      <View>
      <ConfirmCoffee
        user={user}
        card={userCard}
        store={store}
        stampsToAdd={addCoffees}
        cardsCompleted={cardsCompleted}
        navigation={navigation}
      /> {changed && (
        <Pressable onPress={() => onUndoPress()} style={{borderRadius:20, backgroundColor:"#c08552" ,alignSelf:"center", width:"50%"}}><Text style={{fontSize:20, textAlign:"center", padding:15}}>X</Text></Pressable>
        )}</View>
      <TouchableOpacity onPress={() => navigation.navigate("Main Page")}>
        <Text style={{textDecorationLine: 'underline', fontSize:16,textAlign:"center",color:"grey"}}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customerDetails:{fontStyle:"bold"},
  stampContainer:{flexDirection:"row",rowGap:20,borderRadius:20,
width:"100%",flex:7,borderWidth:2,flexWrap:"wrap",justifyContent:"space-around",alignItems:"stretch",alignContent:"space-around",backgroundColor:"#DAB49D",gap:40,padding:20
},
  stamps:{},
  text:{fontSize:35,textAlign:"center",textTransform:"capitalize"},
  stampbutton:{flex:1},
  mainContainer:{flex:1 ,padding:20},
  storelogo:{position:"absolute",width: Dimensions.get('window').width*0.60 ,height:Dimensions.get('window').width*0.60, resizeMode:"contain",opacity:0.7,top:"50%",left:"50%",transform:"translate(-50%, -50%)"}

})