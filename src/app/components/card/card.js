const Card = ({children ,classes}) => {
    return (
        <div className={`card shadow-md hover:shadow-lg flex border border-inherit rounded-xl ${classes}`}>
            <div className="card-body p-4 w-full">
                {children}
            </div>
        </div>
    )
};
export default Card;