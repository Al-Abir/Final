import { useNavigate } from "react-router-dom";


const AboutUs = () => {
    const navigate = useNavigate();
    const click =()=>{
        navigate('/about')
    }

    return (
        <div className='text-center text-white'>
        
            <h1 className="mt-2 text-[20px]"> <span className="text-[#2FF093]">ABIR</span> </h1>
            <p>
                Want to Konw More
            </p>
            <h2 className="hover:scale-105 cursor-pointer" onClick={click}>ABOUT US</h2>
        </div>
    );
};

export default AboutUs;