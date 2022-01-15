import React, { useState } from "react";
import './DashBoardScore.scss'

const cleanPercentage = (percentage:number) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

interface Props{
  colour: string; 
  pct?: number;

  
}

const DashBoardScore = ({ colour, pct }:Props) => {
 
  const r = 30;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct!) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"5px"}
      strokeDasharray={circ}
      strokeDashoffset={pct ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};





const InputPie = ({ name, percentage, colour, label, value, changeValue   }: { name:string ,percentage:number, colour:string, label:string, value:any, changeValue?: (value:any) => void }) => {
  const pct = cleanPercentage(percentage);
  const [ inputValue, setInputValue ] = useState<number>(0)
  
  const handleChange = (e:any) => {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('Input only numbers');
    } else {
      if(e.target.value < 101){
        setInputValue(e.target.value);
        if(changeValue){
          changeValue({ ...value, condition: e.target.value})
        }
        

      }
    }
    
  }

  return (
    <div className='scoreWrapper'>
      {label}
    <svg width={70} height={70}>
      <g transform={`rotate(-90 ${"36 100"})`}>
        <DashBoardScore colour="lightgrey" />
        <DashBoardScore colour={colour} pct={inputValue} />
      </g>
    </svg>
    <input name={name} pattern="[0-9.]+" placeholder="Score" onChange={handleChange} value={inputValue}></input>
  </div>
  );
};

export default InputPie;
