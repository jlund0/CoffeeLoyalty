import { useState } from 'react'

export default function MainPage(){
    function newStore(){

    }
    return(
        <div>
            <DashBoard/>
            <button onClick={newStore}>+</button>
            <button>settings</button>
            <Widgets/>
        </div>)
}

function DashBoard(){
    return(
        <div>

        </div>
    )
}

function Widgets(){

}

function getStore(){
    
}