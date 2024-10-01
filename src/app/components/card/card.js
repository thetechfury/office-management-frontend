const Card = ({children ,classes ,classes2}) => {
    return (
        <div className={`card shadow-md hover:shadow-lg flex border border-inherit rounded-xl ${classes}`}>
            <div className={`card-body p-4 w-full ${classes2}`}>
                {children}
            </div>
        </div>
    )
};
export default Card;