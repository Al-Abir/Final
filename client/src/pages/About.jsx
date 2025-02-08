import { useSelector } from "react-redux";
import Layout from "../Layout/Layout";
import BioData from "../components/BioData";

const About = () => {
    const { portfolioData } = useSelector((state) => state.root);

    // Ensure data exists before rendering
    if (!portfolioData || !portfolioData.about || !portfolioData.team) {
        return <div>Loading...</div>;
    }

    const { about, team } = portfolioData;
    const { title, description } = about;
 

    return (
        <Layout>
            <div className="container mx-auto py-10">
                <div className="flex flex-col xl:flex-row gap-10">
                    {/* Left Section - BioData */}
                    <div className="w-full xl:w-1/4 flex justify-center">
                        <div className="w-[370px] h-[736px] bg-[#1D1C22] rounded-lg shadow-xl p-4">
                            <BioData />
                        </div>
                    </div>

                    {/* Right Section - About Content */}
                    <div className="xl:w-3/4 p-10 md:p-1 text-white rounded-lg shadow-xl mx-auto">
                        <div className="bg-[#1D1C22] md:w-[850px] p-10 md:p-5 rounded-lg">
                            <h2 className="text-2xl font-semibold">{title}</h2>
                            <div className="mt-4 space-y-2">
                                <p className="text-gray-300">{description}</p>
                            </div>
                        </div>

                        {/* Dynamic Stats Section */}
                        <div className="mt-5 flex md:flex-row justify-center items-center">
                            <div className="font-semibold text-[26px]">
                                <h2>Content More Add ...... </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dynamic Team Section */}
                <section className="py-12 text-white">
                    <div className="container mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-8">Meet Our Team</h2>
                        <div className="grid px-5 md:grid-cols-3 gap-8">
                            {team.length > 0 ? (
                                team.map((member, index) => (
                                    <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                                        <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
                                        <h3 className="text-xl font-semibold">{member.name}</h3>
                                        <p className="text-gray-400">{member.role}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No team members available.</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default About;
