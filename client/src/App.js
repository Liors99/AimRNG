import React, { Component } from 'react';

import constants from './constants';
import Target from './components/Target';

const getRandomCoordinates = () => {
  let max = constants.MAX_TARGETS;
  let x = Math.floor(Math.random()*(max))
  let y = Math.floor(Math.random()*(max))
  console.log("Xvalue1Coor",x,"yvalue1Coor",y)
  return [x,y,5];
}

const update = (temp2, i) => {
  let temp = temp2
  console.log("temp",temp[i])
  let coor=getRandomCoordinates();
  console.log("coor, ",coor,"tempIncluded, ",temp.includes(coor))
  while(temp.includes(coor)){
    coor=getRandomCoordinates(); 
  }
  temp[i]=coor
  console.log("changed temp",temp[i])
  return temp; 
}

const initialize = (targetPos) => {
  let numTargets = 0;
  while (numTargets <= constants.MAX_ACTIVE){
    numTargets = numTargets+1;
    console.log("Current",numTargets)
    let coor=getRandomCoordinates()
    while(targetPos.includes(coor)){
      console.log("coor, ",coor,"targetPosincluded, ",targetPos.includes(coor))
      coor=getRandomCoordinates();
    }
    targetPos.push(coor);
  }
  return targetPos
} 

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentActive: 0, 
      targetPos:initialize([])}
  }
  
  render(){
    console.log("targetPos,",this.state.targetPos)
    console.log()
    return(<div className="game-area">
        {this.state.targetPos.map((ele,i) => {
            return(
                <Target key={i} onClick={(j)=>{this.setState({targetPos:update(this.state.targetPos,i)})}} xValue={ele[0]} yValue={ele[1]} fade={ele[2]}/>
        )})}
    </div>
    );
}
}