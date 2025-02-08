import { useNavigate } from 'react-router-dom';
import amazon from '../images/amazon.png';
import food  from '../images/Food.png'

const Porjects_Home = () => {
    const navigate = useNavigate();
    const click = ()=>{

        navigate('/projects');

    }
    return (

        <>
          <div className='flex justify-between items-center p-5 gap-3'>
            <div>
                <img src={amazon}alt="" className='w-[200px] rounded-xl ' />
            </div>
            <div>
                <img src={food}alt="" className='w-[200px] rounded-xl'/>
            </div>
            
        </div>
        <h1 className='text-white text-center'><span className='text-[#2FF093]'>Creative Gallery</span></h1>
        <h1 className='font-semibold text-[26px]  text-center text-white cursor-pointer' onClick={click}>PROJECTS</h1>
        </>
      
        
    );
};

export default Porjects_Home;