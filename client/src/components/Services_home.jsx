import react from "../images/react.png"
import node from '../images/node.png'
import mongoDb  from '../images/mongoDB.png'
import { useNavigate } from "react-router-dom";
const Services_home = () => {
    const navigate = useNavigate()
    const click = ()=>{
           navigate('/services')
   } 
   return (
        <>
         <div className="flex gap-4 justify-center items-center mt-3">

              <img src={react}alt="" className=' hover:scale-105 bg-[#29282D] w-[60px] bg-b rounded-xl p-[10px] '/>

              <img src={node}alt="" className='  hover:scale-105 bg-[#29282D] w-[60px]  rounded-xl p-[10px]'/>


              <img src={mongoDb}alt="" className='  hover:scale-105 bg-[#29282D] w-[60px] rounded-xl p-[10px]'/>



         </div>

         <h1 className="text-white text-center text-[23px] font-semibold mt-1 cursor-pointer" onClick={click}>SERVICES <span className="text-[#2FF093]">OFFER</span></h1>
            
        </>
    );
};

export default Services_home;