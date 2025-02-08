import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import moment from "moment";

const Services = () => {
    const { portfolioData } = useSelector((state) => state.root);
    if (!portfolioData || !portfolioData.service) {
        return <div>loading.........</div>
    }
    const { service } = portfolioData
    
       
    return (
        <Layout>
            <div className="blog-section  py-12 container mx-auto bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-white mb-8">Latest Service </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-48 h-48 p-5 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4">{post.description}</p>
                                    <p className="text-gray-500 text-sm mb-4">
                                        {moment(post.createdAt).format("YYYY-MM-DD")}
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </Layout>
    );
};

export default Services;