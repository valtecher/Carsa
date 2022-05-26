import './carStateScore.scss'

const cleanPercentage = (percentage:number) => {
  const tooLow = !Number.isFinite(+percentage) || percentage < 0;
  const tooHigh = percentage > 100;
  return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

interface Props{
  color: string; 
  pct?: number;

  
}

const DashBoardScore = ({ color, pct }:Props) => {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - pct!) * circ) / 100;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={strokePct !== circ ? color : ""} // remove colour as 0% sets full circumference
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
      fill='white'
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({ percentage, color = '#fff', label = '', id }: { percentage:number, color:string, label:string, id?:string }) => {
  const pct = cleanPercentage(percentage);
  return (
    <div id={id} className='scoreWrapper'>
      {label}
    <svg width={70} height={70}>
      <g transform={`rotate(-90 ${"36 100"})`}>
        <DashBoardScore color="lightgrey" />
        <DashBoardScore color={color} pct={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  </div>
  );
};

export default Pie;