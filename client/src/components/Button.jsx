

const Button = ({ children, color, className, onClick }) => {
    return (


        <button
            style={{ color: color }} // Inline style for text color
            className={`px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition ${className}`} // Tailwind CSS classes
            onClick={onClick} // Optional onClick handler
        >
            {children}
        </button>
    );
};

export default Button;