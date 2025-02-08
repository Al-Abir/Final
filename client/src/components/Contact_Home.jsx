
import { useNavigate } from 'react-router-dom';

const Contact_Home = () => {
    const navigate = useNavigate();
    const click = ()=>{
        navigate('/contact')
    }
    return (
        <div className='p-4'>
            <h1 className='text-white'>Let's Work</h1>
            <h1 className='text-white text-blod text-[24px] cursor-pointer'> <span className='text-[#2FF093]' onClick={click}>C O N T A C T</span> </h1>
        </div>
    );
};

export default Contact_Home;