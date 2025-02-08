import { useNavigate } from 'react-router-dom';
const Testimonial_home = () => {
    const navigate = useNavigate();
    const click = ()=>{
          navigate('/testimonials')
    }
    return (
     

        <div className='p-4'>
            <h1 className='text-white'>Client Says</h1>
            <h1 className='text-white text-blod text-[24px] cursor-pointer'> <span className='text-[#2FF093]' onClick={click}>T E S T I M O N I A L S</span> </h1>
        </div>


    );
};

export default Testimonial_home;
