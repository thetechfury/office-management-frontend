import Card from "@/app/components/card/card";
import Image from "next/image";
import Clothes from "@/app/assets/images/laptop.jpeg";
import Shoes from "@/app/assets/images/iphone.jpeg";
import Hat from "@/app/assets/images/table.jpeg";
import Pens from "@/app/assets/images/accessory.jpeg";
import Button from "@/app/components/button/button";
import {useRouter} from "next/navigation";
import React from "react";

const SalesTopCategories = () => {
    const router = useRouter();
    const handleProducts = () => {
         router.push('/pages/category');
    }
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 mx-auto my-4">
          <div className=''>
              <Card>
                  <h2>Top items categories</h2>
                  <div className=' mt-2'>
                      <div
                          className="flex justify-between items-center border border-inherite p-2 rounded-md">
                          <p>Laptop</p>
                          <Image src={Clothes} alt='Clothes' className='rounded-md w-[3.36875rem]'/>
                      </div>
                      <div
                          className="flex justify-between items-center border border-inherite p-2 rounded-md">
                          <p>Mobile</p>
                          <Image src={Shoes} alt='shoes' className='rounded-md w-[3.36875rem]'/>
                      </div>
                      <div
                          className="flex justify-between items-center border border-inherite p-2 rounded-md">
                          <p>Furniture</p>
                          <Image src={Hat} alt='Hat' className='rounded-md w-[3.36875rem]'/>
                      </div>
                      <div
                          className="flex justify-between items-center border border-inherite p-2 rounded-md">
                          <p>Accessory</p>
                          <Image src={Pens} alt='Pens' className='rounded-md w-[3.36875rem]'/>
                      </div>

                  </div>
                  <div className="flex justify-center mt-3">
                      <Button text="View All Categories" onClick={handleProducts}/>
                  </div>
              </Card>
          </div>
      </div>
  )
}
export default SalesTopCategories;