
import { useNavigate } from 'react-router-dom';
import blog from '../images/blog.jpg'
const Blog_home = () => {
    const navigate = useNavigate();
    const click = () =>{
        navigate('/blog')
    }
    return (
        <div className="flex justify-between items-center gap-3 p-1">
            <div className='w-1/2'>
            <h1 className='text-center'>Visit Our Blog</h1>
            <h1 className="text-2xl text-center font-semibold text-black cursor-pointer" onClick={click}>Blog</h1>
            </div>
            <div className='w-1/2 mt-1'>
            <img src={blog} alt='' className=' md:w-[140px] w-[120px] rounded-xl'></img>

            </div>
           
        </div>
    );
};

export default Blog_home;