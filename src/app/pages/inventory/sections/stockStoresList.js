import Card from "@/app/components/card/card";
import Button from "@/app/components/button/button";

import React from "react";

const StockStoresList = () => {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto my-4">
          <div className='lg:col-span-2 card shadow-md hover:shadow-lg h-full border border-inherit rounded-xl py-2'>
              <div className="flex items-center justify-between px-4 pb-2">
                  <h2>Stores List</h2>
                  <Button text='View More'/>
              </div>

              <div className="overflow-x-auto">
                  <table
                      className="table-auto border-collapse w-full"
                  >
                      <thead className="bg-gray-100">
                      <tr>
                          <th className="pl-8 py-2">Store name</th>
                          <th className="pl-8 py-2">Employs</th>
                          <th className="pl-8 py-2">Items</th>
                          <th className="pl-8 py-2">Orders</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <td className="px-8 py-2">Abc</td>
                          <td className="px-8 py-2">23 employs</td>
                          <td className="px-8 py-2">504 items</td>
                          <td className="px-8 py-2">3 orders</td>
                      </tr>
                      <tr>
                          <td className="px-8 py-2">Abc</td>
                          <td className="px-8 py-2">23 employs</td>
                          <td className="px-8 py-2">504 items</td>
                          <td className="px-8 py-2">3 orders</td>
                      </tr>
                      <tr>
                          <td className="px-8 py-2">Abc</td>
                          <td className="px-8 py-2">23 employs</td>
                          <td className="px-8 py-2">504 items</td>
                          <td className="px-8 py-2">3 orders</td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <div className=''>
              <Card>
                  <h2 className="mb-4">Stock number</h2>
                  <div className='flex justify-between'>
                      <p className="text-blue-600">Low stock items</p>
                      <p className="text-blue-600">12</p>
                  </div>
                  <div className='flex justify-between my-6'>
                      <p>Items categories</p>
                      <p>6</p>
                  </div>
                  <div className='flex justify-between'>
                      <p>Refunded items</p>
                      <p>1</p>
                  </div>
              </Card>
          </div>
      </div>

  )
}
export default StockStoresList;