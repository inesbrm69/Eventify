const Input = ({ type, placeholder, value, onChange, className, ...props }) => {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`ml-7 py-2 border-b-2 border-primary-500 text-primary-500 font-poppins text-subtitle ${className}`}
                {...props}
            />
        </div>
    );
};

export default Input;
