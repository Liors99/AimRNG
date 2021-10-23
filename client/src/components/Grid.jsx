import React, { useState, useEffect,useCallback } from 'react';

import constants from '../constants';
import Target from './Target';

const Grid = () => {
    const [grid,setGrid] = useState([]);
    const [,forceRender] = useState()
    const [activeTargets,setActiveTargets] = useState([]);

    const shuffle = (arr) => {
        return arr.sort( ()=>Math.random()-0.5 );
    }

    const targetClick = useCallback((x,y) => {
        console.log("TargetClick")
        let pos; 
        setGrid(prev=>{
            let temp = prev;
            temp.push([x,y]);
            temp = shuffle(temp);
            pos = temp.pop(); 
            return temp;
        })
        setActiveTargets((prev) => ([...prev, <Target onClick={() => {targetClick(pos[0],pos[1])}} xValue={pos[0]} yValue={pos[1]} fade={5}/>]))
        //forceRender([])
      },[]);

    useEffect(() => {
        let targetPos = [];
        for(let i = 0; i < 12; i++){
            for(let j=0; j<12; j++){
                targetPos.push([i,j]);
            }
        }
        //setGrid(targetPos.shuffle())
        let targets = []
        for(let k=0; k<constants.MAX_ACTIVE; k++)
        {
            targetPos = shuffle(targetPos)
            let pos = targetPos.pop()
            targets.push(<Target onClick={() => {targetClick(pos[0],pos[1])}} xValue={pos[0]} yValue={pos[1]} fade={5}/>)
        }
        setGrid(targetPos);
        setActiveTargets(targets);
        console.log("targetPos",targetPos)
        console.log("targets",targets)
    },[targetClick]);

    return(<div className="game-area">
    {activeTargets}
</div>
    );
}

export default Grid; 