import { View, Image} from "react-native"

function CoffeeIcon({storelogo, storestamp}){
    return(
        <View>
            <Image source={require(storelogo)}/>
            <Image source={require(storestamp)}/>
        </View>
    )
}

export default function LoyaltyCard({navigation, route}){
    const getCoffeesEarnt = ()=>{
        return(1)
    }
    const cardDetails  = route.params;
    const coffeesEarnt = getCoffeesEarnt()
    console.log(cardDetails)
    console.log("LoyaltyCard")
    const CoffeeCount = () => {
        return (
            <>
            <Image source={require(`../assets/${cardDetails.storestamp}`)}/>
            {checked?
                <Image source={require('../assets/'+cardDetails)}
                />:null
            }
            </>
        )


    }
    return(
        <View>
            <Image source={require(cardDetails.cardimage)}/>
            <View>
                <CoffeeCount/>
            </View>
        </View>
    )
}