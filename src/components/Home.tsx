import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import TasksProgress from "./ProgressTasksIndicator";

export default function Home() {
  const scores = [
    { date: "11/29/2012", equifax: 735, experian: 740, transunion: 738 },
    { date: "10/01/2012", equifax: 650, experian: 649, transunion: 652 },
    { date: "09/03/2012", equifax: 550, experian: 552, transunion: 551 },
    { date: "08/01/2012", equifax: 450, experian: 451, transunion: 452 },
  ];
  const navigate = useNavigate();
  const disputeStatus = [
    { status: "Unspecified", equifax: 0, experian: 0, transunion: 0 },
    { status: "Positive", equifax: 1, experian: 2, transunion: 1 },
    { status: "Deleted", equifax: 0, experian: 2, transunion: 0 },
    { status: "Repaired", equifax: 0, experian: 1, transunion: 4 },
    { status: "Updated", equifax: 0, experian: 0, transunion: 0 },
    { status: "In Dispute", equifax: 8, experian: 2, transunion: 0 },
    { status: "Verified", equifax: 2, experian: 1, transunion: 1 },
    { status: "Negative", equifax: 1, experian: 1, transunion: 1 },
  ];

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <TasksProgress />
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            CLIENT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">Sample Client</h3>
              <p className="text-sm text-gray-500">(310) 111-1111</p>
              <p className="text-sm text-blue-600">Sample@client.com</p>
              <p className="text-sm text-gray-500">
                Referred By: Sample Affiliate
              </p>
              <p className="text-sm text-gray-500">Status: Client</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-gray-500">
              DISPUTE STATUS
            </CardTitle>
            {/* <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select> */}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                      {" "}
                      <img
                        src={
                          "https://app.creditrepaircloud.com/assets/images/equifax.png?v1"
                        }
                        className="w-16 float-end"
                        alt=""
                      />
                    </TableHead>
                    <TableHead className="text-right ">
                      {" "}
                      <img
                        src={
                          "https://app.creditrepaircloud.com/assets/images/experian.png?v1"
                        }
                        className="w-16 float-end"
                        alt=""
                      />
                    </TableHead>
                    <TableHead className="text-right ">
                      {" "}
                      <img
                        src={
                          "https://app.creditrepaircloud.com/assets/images/trans_union.png?v1"
                        }
                        className="w-16 float-end"
                        alt=""
                      />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disputeStatus.map((item) => (
                    <TableRow key={item.status}>
                      <TableCell>{item.status}</TableCell>
                      <TableCell className="text-right">
                        {item.equifax}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.experian}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.transunion}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Progress Donut Chart */}
              {/* <div className="flex justify-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-green-500 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                    />
                    <circle
                      className="text-yellow-500 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="188.4"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      className="text-pink-500 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="188.4"
                      transform="rotate(90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium">Progress</span>
                  </div>
                </div>
              </div> */}

              <Button
                onClick={() => navigate("/client-portal/dispute-details")}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                See Detailed View
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              SCORES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Equifax</TableHead>
                  <TableHead className="text-right">Experian</TableHead>
                  <TableHead className="text-right">TransUnion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((score) => (
                  <TableRow key={score.date}>
                    <TableCell>{score.date}</TableCell>
                    <TableCell className="text-right">
                      {score.equifax}
                    </TableCell>
                    <TableCell className="text-right">
                      {score.experian}
                    </TableCell>
                    <TableCell className="text-right">
                      {score.transunion}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
