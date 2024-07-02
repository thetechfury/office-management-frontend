const Card = ({children}) => {
    return (
        <div className="card shadow-md hover:shadow-lg h-full flex border border-inherit rounded-xl">
            <div className="card-body p-4 w-full">
                {children}
            </div>
        </div>
    )
};
export default Card;