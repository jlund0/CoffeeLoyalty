import { Image, Text, View } from "react-native";
import { RedeemButton } from "../components/buttons";

export function StampPage({ route, navigation }){
    const { card } = route.params;
    console.log("stamp page")
    console.log(card)
    return(
    <View>
        <Image/>
        <Text>{card.name}</Text>
        <View>
            <Text>Your stamps</Text>
            <View id="card details">
            {card.stamps.map((stamp)=>{
                return(
                    <View>
                        <Text>{stamp}</Text>
                    </View>
                )
            })}
            </View>
        </View>
      <RedeemButton/>
    <View>
        <Text>Details</Text>
        <Text>{cardDetails.details}</Text>
    </View>
    </View>)
}