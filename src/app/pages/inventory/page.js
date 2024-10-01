'use client'
import MainDiv from "@/app/components/mainDiv/mainDiv";
import Card from "@/app/components/card/card";
import SalesTopCategories from "@/app/pages/inventory/sections/salesTopCategories";
import StockStoresList from "@/app/pages/inventory/sections/stockStoresList";

const Inventory = () => {
    return (
        <MainDiv>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:w-10/12">
                <h1>Recent activity</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                    <Card classes='text-center'>
                        <h2 className="hover:text-blue-600">741</h2>
                        <div className='my-2'>Qty</div>
                        <p>All ITEMS</p>
                    </Card>
                    <Card classes='text-center'>
                        <h2 className="hover:text-blue-600">123</h2>
                        <div className='my-2'>Qty</div>
                        <p>Use Items</p>
                    </Card>
                    <Card classes='text-center'>
                        <h2 className="hover:text-blue-600">32</h2>
                        <div className='my-2'>Qty</div>
                        <p>Un Used</p>
                    </Card>
                </div>
                <SalesTopCategories/>
            </div>
        </MainDiv>
    )
}
export default Inventory;