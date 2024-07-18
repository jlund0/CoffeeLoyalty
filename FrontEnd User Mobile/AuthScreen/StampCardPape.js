import { Image, Text, View } from "react-native";
import { RedeemButton } from "../components/buttons";

export function StampPage({ route, navigation }){
    const { card ,user } = route.params;
    console.log("stamp page")
    console.log(card)
    return(
    <View style={{ justifyContent:"space-between", alignItems:"center", flex:1}}>
        <Image/>
        <Text>{card.name}</Text>
        <View>
            <Text>Your stamps</Text>
            <View id="card details" style={{flexDirection:"row"}}>
            {[...Array(card.coffees_required).keys()].map((stamp)=>{
                return(
                    <View>
                        <Text>{stamp+1}</Text>
                    </View>
                )
            })}
            </View>
        </View>
        <RedeemButton
            disabled={card.coffees_required == card.points ? false : true}
            card={card}
            uid={user.uid}
            // fetchCards={fetchCards}
          />
    <View>
        <Text>Details</Text>
        
    </View>
    </View>)
}