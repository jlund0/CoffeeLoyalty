import { View, Text } from 'react-native'
import {createNewCard, updateUserCard, setCardComplete} from "../firebaseFunctions"


export function ConfirmCoffee({navigation , stampsToAdd ,stampsRequired, currentStamps}){
if(stampsToAdd+currentStamps >= stampsRequired){
    const addToNewCard = stampRequired-(stampsToAdd+stampsEarnt)
    createNewCard(addToNewCard)
    updateUserCard(stampRequired)
    setCardComplete(cardId)
}
else if(stampsToAdd+currentStamps < stampsRequired){
    updateUserCard(stampsToAdd)
}


}
    return(
        <View>

        </View>
    )

}