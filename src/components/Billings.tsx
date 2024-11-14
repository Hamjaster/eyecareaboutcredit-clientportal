"use client";

import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

type InvoiceType = {
  date: string;
  invoiceNo: string;
  dueDate: string;
  balance: number;
  total: number;
  status: string;
  companyName: string;
  companyLogo: string;
  description: string;
};

export default function Billings() {
  const [invoices, setInvoices] = useState<InvoiceType[]>([
    {
      date: "2024-01-15",
      invoiceNo: "INV-2024-001",
      dueDate: "2024-02-15",
      balance: 1500.0,
      total: 3000.0,
      status: "Partial",
      companyName: "TechCorp Inc.",
      companyLogo: "/placeholder.svg?height=50&width=50",
      description: "IT Services - January 2024",
    },
    {
      date: "2024-01-10",
      invoiceNo: "INV-2024-002",
      dueDate: "2024-02-10",
      balance: 0.0,
      total: 2500.0,
      status: "Paid",
      companyName: "DataSys Solutions",
      companyLogo: "/placeholder.svg?height=50&width=50",
      description: "Cloud Hosting - Q1 2024",
    },
    {
      date: "2024-01-05",
      invoiceNo: "INV-2024-003",
      dueDate: "2024-02-05",
      balance: 1800.0,
      total: 1800.0,
      status: "Unpaid",
      companyName: "SecureNet Ltd.",
      companyLogo: "/placeholder.svg?height=50&width=50",
      description: "Cybersecurity Audit - December 2023",
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");

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

  const openModal = (invoice: InvoiceType) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
    setPaymentAmount("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handlePayment = () => {
    if (!selectedInvoice || !paymentAmount) return;

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.invoiceNo === selectedInvoice.invoiceNo) {
        const newBalance = Math.max(0, invoice.balance - amount);
        const newStatus =
          newBalance === 0
            ? "Paid"
            : newBalance < invoice.total
            ? "Partial"
            : "Unpaid";
        return { ...invoice, balance: newBalance, status: newStatus };
      }
      return invoice;
    });

    setInvoices(updatedInvoices);
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Invoices & Payments</h1>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No record found
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.invoiceNo}>
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
                      className={`${getStatusColor(invoice.status)} text-white`}
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openModal(invoice)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <Avatar className="w-12 bg-white border shadow-md h-12 cursor-pointer">
                  <AvatarImage
                    src={selectedInvoice.companyLogo || ""}
                    alt="Company Logo"
                  />
                  <AvatarFallback>
                    {getInitials(selectedInvoice.companyName)}
                  </AvatarFallback>
                </Avatar>

                <h3 className="text-lg font-semibold">
                  {selectedInvoice.companyName}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="invoiceNo">Invoice No.</Label>
                  <Input
                    id="invoiceNo"
                    value={selectedInvoice.invoiceNo}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    value={new Date(selectedInvoice.date).toLocaleDateString()}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={selectedInvoice.description}
                  readOnly
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="total">Total</Label>
                  <Input
                    id="total"
                    value={`$${selectedInvoice.total.toFixed(2)}`}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="balance">Remaining</Label>
                  <Input
                    id="balance"
                    value={`$${selectedInvoice.balance.toFixed(2)}`}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="payment">Payment Amount</Label>
                <Input
                  id="payment"
                  type="number"
                  placeholder="Enter payment amount"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={closeModal} variant="outline">
              Cancel
            </Button>
            <Button onClick={handlePayment}>Make Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
