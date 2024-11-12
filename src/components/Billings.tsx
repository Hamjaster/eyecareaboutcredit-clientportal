import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Billings() {
  const invoices = [
    {
      date: "2024-01-15",
      invoiceNo: "INV-2024-001",
      dueDate: "2024-02-15",
      balance: 1500.0,
      total: 3000.0,
      status: "Partial",
    },
    {
      date: "2024-01-10",
      invoiceNo: "INV-2024-002",
      dueDate: "2024-02-10",
      balance: 0.0,
      total: 2500.0,
      status: "Paid",
    },
    {
      date: "2024-01-05",
      invoiceNo: "INV-2024-003",
      dueDate: "2024-02-05",
      balance: 1800.0,
      total: 1800.0,
      status: "Unpaid",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-500";
      case "partial":
        return "bg-yellow-500";
      case "unpaid":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Invoices & Payments</h1>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Date</TableHead>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No record found
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow className="bg-gray-100" key={invoice.invoiceNo}>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.invoiceNo}</TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    ${invoice.balance.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${invoice.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(
                        invoice.status
                      )} hover:${getStatusColor(
                        invoice.status
                      )} cursor-pointer  text-white`}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
