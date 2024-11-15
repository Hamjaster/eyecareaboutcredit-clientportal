import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Printer, Check, MinusCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { InvoiceStatus } from "./Billings";

interface InvoiceViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: {
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
  onStatusChange: (status: InvoiceStatus) => void;
}

export default function InvoiceViewer({
  open,
  onOpenChange,
  invoice,
  onStatusChange,
}: InvoiceViewerProps) {
  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
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
  const componentRef = useRef<HTMLDivElement>(null);

  const getStatusIcon = (status: InvoiceStatus) => {
    switch (status) {
      case "paid":
        return <Check className="h-4 w-4" />;
      case "partial":
        return <MinusCircle className="h-4 w-4" />;
      case "unpaid":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadPDF = async () => {
    if (!componentRef.current) return;

    // Capture the component as an image
    const canvas = await html2canvas(componentRef.current);
    const imgData = canvas.toDataURL("image/png");

    // Create a new PDF document
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // Adjust image width to fit the page
    const pageHeight = 297; // A4 Page height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("download.pdf"); // Download the PDF
  };

  const handleDownload = () => {
    // Implementation for PDF download would go here
    console.log("Downloading invoice...");
    downloadPDF();
  };

  return (
    <>
      {invoice && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="max-w-3xl">
            <DialogHeader className="flex-row justify-between items-center">
              <DialogTitle>Invoice {invoice?.number}</DialogTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </DialogHeader>

            <div ref={componentRef} className="space-y-8 p-6">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <img
                    src={invoice.biller.logo}
                    alt={invoice.biller.name}
                    className="h-16 w-32 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold text-xl">
                      {invoice.biller.name}
                    </h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {invoice.biller.address}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold">
                    INVOICE {invoice.number}
                  </h2>
                  <div className="mt-2 flex flex-col gap-1 text-sm">
                    <p>Date: {new Date(invoice.date).toLocaleDateString()}</p>
                    <p>
                      Due Date: {new Date(invoice.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Bill To
                  </h4>
                  <p className="font-medium">{invoice.client.name}</p>
                  <p className="text-sm whitespace-pre-line">
                    {invoice.client.address}
                  </p>
                  <p className="text-sm">
                    Business Number: {invoice.client.businessNumber}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Status
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    {["paid", "partial", "unpaid", "pending"].map((status) => (
                      <Button
                        key={status}
                        variant="outline"
                        size="sm"
                        className={cn(
                          "capitalize",
                          invoice.status === status &&
                            getStatusColor(status as InvoiceStatus),
                          invoice.status === status && "text-white",
                          ` ${
                            invoice.status === status
                              ? `hover:${getStatusColor(
                                  status as InvoiceStatus
                                )}`
                              : "hover:bg-gray-200"
                          } `
                        )}
                        onClick={() => onStatusChange(status as InvoiceStatus)}
                      >
                        {getStatusIcon(status as InvoiceStatus)}
                        <span className="ml-2">{status}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Total Amount Due</h4>
                  <p className="text-2xl font-bold">
                    ${invoice.amount.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="text-sm text-muted-foreground">
                <p>Tax/VAT Number: {invoice.biller.taxNumber}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
