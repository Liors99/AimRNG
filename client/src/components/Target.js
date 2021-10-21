import React from 'react';
import constants from '../constants'; 

const Target = ({onClick,xValue,yValue,fade}) => {
    //console.log("XvalueTAR",xValue,"yvalue",yValue)
    const style = {
        left: `${xValue*constants.BLOCKSIZE}%`,
        top: `${yValue*constants.BLOCKSIZE}%`
    }
    const style2 = {
        left: `${(xValue*constants.BLOCKSIZE)+.9}%`,
        top: `${(yValue*constants.BLOCKSIZE)+.9}%`
    }
    const style3 = {
        left: `${(xValue*constants.BLOCKSIZE)+1.9}%`,
        top: `${(yValue*constants.BLOCKSIZE)+1.9}%`
    }
    
    return(
    <div onClick={onClick}>
        <div className="target-dot" style={style3}></div>
        <div className="target-ring" style={style2}></div>
        <div className="target-inner" style={style}></div>
    </div>
    );
}

export default Target; 