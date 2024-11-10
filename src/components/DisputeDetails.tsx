import { Check, X, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CreditEntry {
  date: string;
  creditor: string;
  equifax: {
    status: "Verified" | "Negative" | "Positive" | "In Dispute";
  };
  experian: {
    status:
      | "Deleted"
      | "Negative"
      | "Positive"
      | "Repaired"
      | "In Dispute"
      | "Verified";
  };
  transunion: {
    status: "Repaired" | "Positive" | "Negative" | "Verified";
  };
}

const creditData: CreditEntry[] = [
  {
    date: "06/07/2012",
    creditor: "Bank Of America Mortgage",
    equifax: { status: "Verified" },
    experian: { status: "Deleted" },
    transunion: { status: "Repaired" },
  },
  {
    date: "01/01/1970",
    creditor: "Sears Card",
    equifax: { status: "Negative" },
    experian: { status: "Negative" },
    transunion: { status: "Positive" },
  },
  // Add more entries as needed
];

export default function DisputeDetails() {
  const StatusIcon = ({ status }: { status: string }) => {
    if (
      status === "Verified" ||
      status === "Positive" ||
      status === "Repaired" ||
      status === "Deleted"
    ) {
      return <Check className="h-4 w-4 text-green-500" />;
    }
    if (status === "Negative") {
      return <X className="h-4 w-4 text-red-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-orange-500" />;
  };

  const StatusCell = ({ status }: { status: string }) => (
    <div className="flex flex-col items-center gap-1">
      <StatusIcon status={status} />
      <span className="text-xs">{status}</span>
    </div>
  );

  return (
    <div className="w-full px-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Creditor/Furnisher</TableHead>
              <TableHead className="text-center">
                <img
                  src={
                    "https://app.creditrepaircloud.com/assets/images/equifax.png?v1"
                  }
                  className="mx-auto w-16"
                  alt=""
                />
              </TableHead>
              <TableHead className="text-center">
                <img
                  src={
                    "https://app.creditrepaircloud.com/assets/images/experian.png?v1"
                  }
                  className="w-16 mx-auto"
                  alt=""
                />
              </TableHead>
              <TableHead className="text-center">
                <img
                  src={
                    "https://app.creditrepaircloud.com/assets/images/trans_union.png?v1"
                  }
                  className="w-16 mx-auto"
                  alt=""
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditData.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="text-sm text-blue-600">
                  {entry.date}
                </TableCell>
                <TableCell>{entry.creditor}</TableCell>
                <TableCell className="text-center">
                  <StatusCell status={entry.equifax.status} />
                </TableCell>
                <TableCell className="text-center">
                  <StatusCell status={entry.experian.status} />
                </TableCell>
                <TableCell className="text-center">
                  <StatusCell status={entry.transunion.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
