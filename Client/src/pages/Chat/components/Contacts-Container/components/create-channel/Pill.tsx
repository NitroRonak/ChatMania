const Pill = ({text, onClick}:{text:string,onClick:()=>void}) => {
    return (
      <span className="cursor-pointer hover:bg-amber-700 bg-purple-500 text-white px-2 py-1 rounded text-xs" onClick={onClick}>
        <span>{text} &times;</span>
      </span>
    );
  };
  
  export default Pill;