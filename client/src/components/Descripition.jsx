import { useSelector } from "react-redux";

const Descripition = () => {
    const { loading, portfolioData } = useSelector((state) => state.root);

    // Ensure data exists before destructuring
    if (!portfolioData || !portfolioData.intro) {
        return <div>Loading...</div>;
    }

    const { intro } = portfolioData;
    const { welcomeText, title, description } = intro;

    return (
        <div className="text-white p-3">
            <h4>
                <span className="text-[#2FF093]">Hi! </span>
                {` ${welcomeText}`}
            </h4>
            <p className="text-[42px]">
               {title} <span className="text-[#2FF093]">WEB DEVELOPER</span>
            </p>
            <p>
                Full Stack Web Developer specializing in {" "}
                <span className="text-[#2FF093]">Back-end development</span> for
                web applications. {description}
            </p>
        </div>
    );
};

export default Descripition;
