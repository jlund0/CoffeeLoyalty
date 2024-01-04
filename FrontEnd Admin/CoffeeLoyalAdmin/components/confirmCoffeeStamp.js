import { View, Text, Pressable, Alert, Button,StyleSheet } from "react-native";
import {
  createNewCard,
  updateUserCard,
  setCardComplete,
} from "../firebaseFunctions";
import { useState } from "react";

export function ConfirmCoffee({
  user,
  card,
  store,
  stampsToAdd,
  cardsComplete,
  navigation,
}) {
  const [showConfirmAlert, setShowConfirm] = useState(false);
  const onConfirm = () => {
    console.log(
      `stamps to add ${stampsToAdd} , card.coffees earnts ${card.coffeesEarnt}, coffees required ${store.coffees_required}`
    );
    let totalStamps = stampsToAdd + card.coffeesEarnt;
    let stampsRequired = store.coffees_required;
    let AddtoNewCard = totalStamps % stampsRequired;
    let completedCards = Math.floor(totalStamps / stampsRequired);

    if (completedCards == 0) {
      console.log(`no cards complete: adding ${stampsToAdd} to users card`);
      updateUserCard(card.id, stampsToAdd);
    } else if (completedCards >= 1) {
      console.log(
        ` completeing users card and adding ${AddtoNewCard} to new card `
      );
      updateUserCard(card.id , stampsRequired - card.coffeesEarnt);
      createNewCard(user.id, store.id, AddtoNewCard);
      if (completedCards > 1) {
        console.log(`adding ${completedCards - 1} completed cards`);
        for(let i = 0; i < completedCards - 1; i++)
        {createNewCard(user.id, store.id, stampsRequired);}
  
      }
      }
    
    navigation.navigate("Main Page");
  };

  return (
    <>
      <Pressable style={styles.stampbutton} onPress={() => setShowConfirm(true)}>
        <Text style={{textAlign:"center",fontSize:30}}>Stamp Card</Text>
      </Pressable>
      <View>
        {showConfirmAlert && (
          <View style={styles.popup}>
            <Text style={{fontSize:35,textAlign:'center' , color:"#3b2621"}}>Confirm Stamp</Text>
            <Text style={{fontSize:28,textAlign:'center' , color:"#3b2621"}}>{`Add ${stampsToAdd} stamps to ${user.name}`}</Text>
            
            <Pressable onPress={onConfirm}><Text>Confirm</Text></Pressable>
            <Pressable onPress={() => setShowConfirm(false)}>
              <Text style={{textDecorationLine: 'underline', fontSize:16,textAlign:"center",color:"grey"}}>Cancel</Text>
            </Pressable> 
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  stampbutton:{borderRadius:20, backgroundColor:"#c08552" ,alignSelf:"center", width:"100%",padding:15,},
  popup:{ zIndex:1,backgroundColor:"#fff",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)" , width:"100%", height:"90%"}
});