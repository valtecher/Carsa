import React from "react";
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


const Text = ({ percentage }: {percentage:number}) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"15px"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({ percentage, colour, label }: { percentage:number, colour:string, label:string }) => {
  const pct = cleanPercentage(percentage);
  return (
    <div className='scoreWrapper'>
      {label}
    <svg width={70} height={70}>
      <g transform={`rotate(-90 ${"36 100"})`}>
        <DashBoardScore colour="lightgrey" />
        <DashBoardScore colour={colour} pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  </div>
  );
};

export default Pie;
