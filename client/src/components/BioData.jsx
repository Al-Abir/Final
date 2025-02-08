import abir from '../images/abir.png'
import { FaFacebook } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import Button from './Button';
import { useNavigate } from 'react-router-dom';
const BioData = () => {
    const navigate = useNavigate(); 
    const handleHireMe = () => {
        navigate('/contact'); 
    };

    const handleDownloadCV = () => {
        window.open('https://drive.google.com/file/d/1kBYl3xtH8FWW3EXQqvpJjsqYgxZ-Q6R4/view', '_blank');
    };
    return (
        <div className="flex flex-col rounded-[20px] ">
            <div className='flex justify-center '>
                <img src={abir} alt="" className='w-[200px] rounded-xl mx-auto mt-[30px]' />

            </div>

            <div className="text-[#FFFFFF] text-center mt-4">
                <p className='text-[24px]'>HI I'M <span className='text-[#2FF093]'>ABIR</span></p>
                <p>Software Developer</p>
                <p className='mt-4'>sheikhabir196@gamil.com</p>
                <p className='mt-1'>+88 01402 741287 </p>

                <div className="flex mt-6 space-x-3 text-center justify-center">
                    <a href="https://www.facebook.com/p/Washeikh-Al-Abir-100004245766553/" target="_blank" rel="noopener noreferrer" className='hover:bg-sky-700 p-2 rounded-xl'>
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://www.linkedin.com/in/washeikh-al-abir/" target="_blank" rel="noopener noreferrer"className='hover:bg-sky-700 p-2 rounded-xl'>
                        <CiLinkedin size={24} />
                    </a>
                    <a href="https://github.com/Al-Abir" target="_blank" rel="noopener noreferrer"className='hover:bg-sky-700 p-2 rounded-xl'>
                        <FaGithub size={24} />
                    </a>
                </div>
                
         <div className="flex flex-col w-[75%] mx-auto justify-center gap-3 mt-3">
            {/* Hire Me Button */}
            <Button
                color="white" // Text color
                className="bg-blue-600 hover:bg-blue-700" // Tailwind CSS classes
                onClick={handleHireMe} // Click handler
            >
                Hire Me
            </Button>

            {/* Download CV Button */}
            <Button
                color="white" // Text color
                className="bg-gray-800 hover:bg-gray-900" // Tailwind CSS classes
                onClick={handleDownloadCV} // Click handler
            >
                Download CV
            </Button>
                </div>
             
            </div>

        </div>
    );
};

export default BioData;