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
import { Eye } from "lucide-react";

import InvoiceViewer from "./InvoiceViewer";
import { stat } from "fs";
export type InvoiceStatus = "paid" | "partial" | "unpaid" | "pending";

type InvoiceType = {
  number: string;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  amount: number;
  biller: {
    name: string;
    logo: string;
    address: string;
    taxNumber: string;
  };
  client: {
    name: string;
    address: string;
    businessNumber: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
};

export default function Billings() {
  const [invoices, setInvoices] = useState<InvoiceType[]>([
    {
      number: "INV-90765",
      date: "2024-01-15",
      dueDate: "2024-02-15",
      status: "pending",
      amount: 618.045,
      biller: {
        name: "MacroTech",
        logo: "https://accufy.originlabsoft.com/uploads/medium/mt_medium-310x240_medium-310x240.png",
        address: "215/Road B, Park Lane\nAndorra",
        taxNumber: "346346546",
      },
      client: {
        name: "Ammar Zaheer",
        address: "388783 fhjgsd\nJamaica",
        businessNumber: "B-1234/234123",
      },
      items: [],
    },
    {
      number: "INV-90766",
      date: "2024-01-12",
      dueDate: "2024-03-12",
      status: "paid",
      amount: 118.05,
      biller: {
        name: "TechInfo sys.",
        logo: "https://accufy.originlabsoft.com/uploads/medium/mt_medium-310x240_medium-310x240.png",
        address: "215/Road B, Park Lane\nAndorra",
        taxNumber: "346346546",
      },
      client: {
        name: "Ammar Zaheer",
        address: "388783 fhjgsd\nJamaica",
        businessNumber: "B-1234/234123",
      },
      items: [
        {
          description: "Hy",
          price: 344,
          quantity: 21,
        },
      ],
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const updateStatus = (status: InvoiceStatus) => {
    if (!selectedInvoice) return;
    const updatedInvoices = invoices.map((invoice) => {
      if (invoice.number === selectedInvoice.number) {
        return { ...invoice, status: status };
      }
      return invoice;
    });
    setSelectedInvoice({ ...selectedInvoice, status });
    setInvoices(updatedInvoices);
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
                <TableRow key={invoice.number}>
                  <TableCell>
                    {new Date(invoice.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{invoice.number}</TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    ${invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`${getStatusColor(
                        invoice.status
                      )} hover:${getStatusColor(invoice.status)} text-white`}
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

      {selectedInvoice && (
        <InvoiceViewer
          invoice={selectedInvoice}
          onOpenChange={setIsModalOpen}
          open={isModalOpen}
          onStatusChange={updateStatus}
        />
      )}
    </div>
  );
}
