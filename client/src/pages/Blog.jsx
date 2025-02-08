
import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
const Blog = () => {
    const { portfolioData } = useSelector((state) => state.root);
    if(!portfolioData || !portfolioData.blog){
        return <div>loading.........</div>
    }
    const{blog} = portfolioData;
    return (
        <Layout>
    <div className="blog-section  py-12 container mx-auto bg-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-8">Latest Blog Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blog.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.description}</p>
                                <a
                                    href={post.link}
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                >
                                    Updated Soon ..
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
            
        
        </Layout>
    );
};

export default Blog;