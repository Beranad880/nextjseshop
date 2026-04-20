"use client";

import { useState } from "react";
import OrderStatusSelect from "@/components/OrderStatusSelect";
import DeleteOrderButton from "@/components/DeleteOrderButton";
import OrderDetailsModal from "@/components/OrderDetailsModal";

const fmt = (price: number) => price.toLocaleString("cs-CZ") + "\u00a0Kč";

interface Order {
  _id: string;
  items: any[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminOrdersList({ orders }: { orders: any[] }) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <>
      <div className="border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[11px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-200">
                <th className="px-6 py-4">Č. objednávky</th>
                <th className="px-6 py-4">Zákazník</th>
                <th className="px-6 py-4">Položky</th>
                <th className="px-6 py-4">Celkem</th>
                <th className="px-6 py-4">Datum</th>
                <th className="px-6 py-4">Stav</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-20 text-center">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Žádné objednávky</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const id = order._id.toString();
                  const date = new Date(order.createdAt).toLocaleDateString("cs-CZ", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  const itemsSummary = order.items
                    .map((i: { name: string; quantity: number }) => `${i.name} ×${i.quantity}`)
                    .join(", ");

                  return (
                    <tr 
                      key={id} 
                      className="hover:bg-gray-50 transition-colors align-top cursor-pointer group"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-bold text-gray-500 group-hover:text-black">
                          #{id.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm text-black group-hover:underline decoration-black decoration-2 underline-offset-4">
                          {order.customer.name}
                        </p>
                        <p className="text-xs text-gray-500">{order.customer.email}</p>
                        <p className="text-xs text-gray-400">{order.customer.phone}</p>
                        <p className="text-xs text-gray-400 mt-1 max-w-[150px] leading-tight italic">
                          {order.customer.address}
                        </p>
                      </td>
                      <td className="px-6 py-4 max-w-[220px]">
                        <p className="text-xs text-gray-600 line-clamp-2">{itemsSummary}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {order.items.reduce((s: number, i: { quantity: number }) => s + i.quantity, 0)} ks
                        </p>
                      </td>
                      <td className="px-6 py-4 font-black text-black text-sm">{fmt(order.total)}</td>
                      <td className="px-6 py-4 text-xs text-gray-500 font-medium whitespace-nowrap">{date}</td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <OrderStatusSelect id={id} status={order.status} />
                      </td>
                      <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}>
                        <DeleteOrderButton id={id} />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <OrderDetailsModal 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
      />
    </>
  );
}
