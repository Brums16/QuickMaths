import './Style.css';
import React, { useState, useEffect } from "react";







const TransformationStation = () => {


const randInt2 = () => {
    return (Math.floor(Math.random()*2)===0)
}


const generateStartingShapeState = () => {
        let startingLocation
        let startingShapeState
        if (randInt2()){
            do {
            (startingLocation = Math.floor(Math.random()*80)+20)
            }
            while (startingLocation % 10 ===9||startingLocation % 10 ===0)
        if (randInt2()){
            startingShapeState = [startingLocation, startingLocation-10, startingLocation-20, startingLocation+1]
        } else {
            startingShapeState = [startingLocation, startingLocation-10, startingLocation-20, startingLocation-1]
        }
    }
        else  {
            do{
            (startingLocation = Math.floor(Math.random()*80))
            }
            while (startingLocation % 10 ===9||startingLocation % 10 ===0)
        if (randInt2()){
            startingShapeState = [startingLocation, startingLocation+10, startingLocation+20, startingLocation+1]
        } else {
            startingShapeState = [startingLocation, startingLocation+10, startingLocation+20, startingLocation-1]
        }
        }
        return startingShapeState
    
    }
    
    const generateTargetState = () => {
        let startingTargetLocation
        let startingTargetState
        if (randInt2()){
            do {
                (startingTargetLocation = Math.floor(Math.random()*80)+20)
            }
            while (startingTargetLocation % 10 ===9||startingTargetLocation % 10 === 0)
            if (randInt2()){
                startingTargetState = [startingTargetLocation, startingTargetLocation-10, startingTargetLocation-20, startingTargetLocation+1]
            } else {
                startingTargetState = [startingTargetLocation, startingTargetLocation-10, startingTargetLocation-20, startingTargetLocation-1]
            }
        }
        else {
            do {
                (startingTargetLocation = Math.floor(Math.random()*80))
            }
            while (startingTargetLocation % 10 ===9||startingTargetLocation % 10 === 0)
            if (randInt2()){
                startingTargetState = [startingTargetLocation, startingTargetLocation+10, startingTargetLocation+20, startingTargetLocation+1]
            } else {
                startingTargetState = [startingTargetLocation, startingTargetLocation+10, startingTargetLocation+20, startingTargetLocation-1]
            }
        }
        return startingTargetState
    }
    

const startingShapeState = generateStartingShapeState()
const startingTargetState = generateTargetState()
const [shapeState, setShapeState] = useState(startingShapeState)
const [targetShapeState, setTargetShapeState] = useState(startingTargetState)
const [correctShapeState, setCorrectShapeState] = useState()
const [userXAnswer, setUserXAnswer] = useState()
const [userYAnswer, setUserYAnswer] = useState()
const [userMirrorAxis, setUserMirrorAxis] = useState()
const [userMirrorValue, setUserMirrorValue] = useState()






const gridSquares = () => {
    let gridArray = []
    for(let i = 0; i < 100; i++){
        if (shapeState.includes(i)){
            gridArray.push(<div key={i} id ="shape" className="grid-item" 
            style={{
                backgroundColor: correctShapeState ?  "green" : targetShapeState.includes(i) ? "#315ea1" : "#366ed8"
            }}></div>)
        }
        else if (targetShapeState.includes(i)){
            gridArray.push(<div key={i} id ="shape" className="grid-item" 
            style={{
                backgroundColor: "#041562"
            }}></div>)
        }
        else if (i % 5 === 0 && i % 10 !==0 && i !==55){
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item y-axis">{(i+5)/(-10)+6}</div>)
        }
        else if (i >49 && i <60 && i !==55){
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item x-axis">{i-55}</div>)
        }     
        else if (i===55){
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item x-axis y-axis">{i-55}</div>)
        } else {
            gridArray.push(<div key={i} id ="grid-{i}" className="grid-item"></div>)
        }
        
           
    }
    return gridArray
}

const translate = () => {
    
    setShapeState(shapeState.map((x) => x + userXAnswer + (userYAnswer*(-10))))

}


const reflecty = () => {
    let mirror = 50-userMirrorValue*10
    setShapeState(shapeState.map((x) => {if (mirror > x){
        if (mirror - x < 10){
            return  x+10
        } else {
            return x + 2*(mirror - Math.floor(x/10)*10) - 10
        }
    }
        else if (mirror <= x){
            if (x- mirror < 10){
                return x - 10
            } else {
            return x + 2*(mirror - Math.floor(x/10)*10) - 10
        } 
    }
    

}))
}

const reflectx = () => {
    let mirror = 5+userMirrorValue
    setShapeState(shapeState.map((x) => {if (mirror > x % 10){
        if (mirror - x  % 10<= 1){
            return  x + 1
        } else {
            return x + 2*(mirror - x % 10) - 1
        }
    }
        else if (mirror <= x % 10){
            if (x- mirror < 1){
                return x - 1
            } else {
            return x + 2*(mirror - (x % 10)) - 1
        } 
    }
    

}))
}



const reflect = () => {
    if (userMirrorAxis==="y"){
    reflecty()
    }
    if (userMirrorAxis==="x"){
        reflectx()
    }
}


const handleXChange = event => {
    setUserXAnswer(parseInt(event.target.value))
}

const handleYChange = event => {
    setUserYAnswer(parseInt(event.target.value))
}

const handleMirrorAxisChange = event => {
    setUserMirrorAxis(event.target.value)
}

const handleMirrorValueChange = event => {
    setUserMirrorValue(parseInt(event.target.value))
}


useEffect(() => {

    if(arraysEqual(shapeState,targetShapeState)){
    setCorrectShapeState(true)
    } else setCorrectShapeState(false)
}, [shapeState, targetShapeState])


const arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }






const vectorTranslation = () => {
    return(<div className="bracket-div"><p>Translation Vector: </p><p className="bracketClass">(</p>
        <div className = "vector-div">
            <input type="text"
             id="userXAnswer" 
             name="userXAnswer"  
             onChange={handleXChange} 
              />
             <input type="text"
             id="userYAnswer" 
             name="userYAnswer"  
             onChange={handleYChange} 
             />
        </div><p className="bracketClass">)</p>
        </div>
    )
    
    }

const reflection = () => {
    return(
        <div className = "reflection-div">
            Mirror Line: <div><input type="text" className="mirror-input"
             id="userMirrorAxisAnswer" 
             name="userMirrorAxisAnswer"  
             onChange={handleMirrorAxisChange} 
             /> = 
            <input type="text" className='mirror-input'
             id="userMirrorValueAnswer" 
             name="userMirrorValueAnswer"  
             onChange={handleMirrorValueChange} 
             /></div>
             
        </div>
       
    )


    
    }

    return (
        <div className='main'>
        <div className="main-grid">
            {gridSquares()}
            
            </div>     
            <div className = "transformation-button-div">
            {vectorTranslation()}
            
            
            <button onClick={translate} className="transformation-button">Translate</button> 


        </div>
        <div className = "transformation-button-div">
            {reflection()}
            
            
            <button onClick={reflect} className="transformation-button">Reflect</button> 


        </div>



        </div>
    )

}













export default TransformationStation