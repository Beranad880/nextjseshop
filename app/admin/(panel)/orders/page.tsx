import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { ClipboardList } from "lucide-react";
import AdminOrdersList from "@/components/AdminOrdersList";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  await dbConnect();
  const orders = await Order.find({}).sort({ createdAt: -1 });

  // Convert to plain objects for the client component
  const plainOrders = JSON.parse(JSON.stringify(orders));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            <ClipboardList className="w-4 h-4" />
            Správa objednávek
          </div>
          <h1 className="text-4xl font-extrabold text-black uppercase tracking-tight">Objednávky</h1>
        </div>
        <p className="text-sm text-gray-500 font-medium">
          Celkem: <span className="font-black text-black">{orders.length}</span>
        </p>
      </div>

      <AdminOrdersList orders={plainOrders} />
    </div>
  );
}
