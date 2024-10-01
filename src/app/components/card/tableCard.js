const TableCard = ({children}) => {
    return(
        <div className="card shadow-md hover:shadow-lg h-full border border-inherit rounded-xl py-4 mt-12">
            {children}
        </div>
    )
};
export default TableCard;