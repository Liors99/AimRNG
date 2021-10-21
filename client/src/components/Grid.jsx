import React, { useState, useEffect,useCallback } from 'react';

import constants from '../constants';
import Target from './Target';

const Grid = () => {
    const [grid,setGrid] = useState([]);
    const [activeTargets,setActiveTargets] = useState([]);

    const shuffle = (arr) => {
        return arr.sort( ()=>Math.random()-0.5 );
    }

    const targetClick = useCallback((x,y) => {
        let temp = grid;
        console.log("temp",temp)
        temp.push([x,y]);
        temp = shuffle(temp);
        let targets = activeTargets; 
        console.log("targets",targets)
        let pos = temp.pop()
        targets.push(<Target onClick={() => {targetClick(pos[0],pos[1])}} xValue={pos[0]} yValue={pos[1]} fade={5}/>)
        setGrid(temp);
        setActiveTargets(targets);
      }, [activeTargets,grid]);

    // const targetClick = (x,y) => {
    //     let temp = grid;
    //     console.log("temp",temp)
    //     temp.push([x,y]);
    //     temp = shuffle(temp);
    //     let targets = activeTargets; 
    //     console.log("targets",targets)
    //     let pos = temp.pop()
    //     targets.push(<Target onClick={() => {targetClick(pos[0],pos[1])}} xValue={pos[0]} yValue={pos[1]} fade={5}/>)
    //     setGrid(temp);
    //     setActiveTargets(targets);
    // } 

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
    },[]);

    return(<div className="game-area">
    {activeTargets}
</div>
    );
}

export default Grid; 