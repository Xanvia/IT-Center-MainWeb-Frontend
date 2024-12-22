import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Request } from "../../admin/courses/students/data";

interface RequestsTableProps {
  requests: Request[];
}

export default function RequestsTable({
  requests: initialRequests,
}: RequestsTableProps) {
  const [requests, setRequests] = useState(initialRequests);

  const handleStateChange = (id: number, newState: Request["state"]) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, state: newState } : request
      )
    );
  };

  const handleGradeChange = (id: number, newGrade: string) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, grade: newGrade } : request
      )
    );
  };

  const handleDelete = (id: number) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Profile</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              <Image
                src={request.profileImg}
                alt={request.studentName}
                width={40}
                height={40}
                className="rounded-full"
              />
            </TableCell>
            <TableCell>{request.studentName}</TableCell>
            <TableCell>{request.email}</TableCell>
            <TableCell>
              <Select
                value={request.grade}
                onValueChange={(value) => handleGradeChange(request.id, value)}
              >
                <SelectTrigger className="w-20">
                  <SelectValue>{request.grade}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {["A", "B", "C", "D", "F"].map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Select
                value={request.state}
                onValueChange={(value) =>
                  handleStateChange(request.id, value as Request["state"])
                }
              >
                <SelectTrigger className="w-28">
                  <SelectValue>
                    <Badge variant={getBadgeVariant(request.state)}>
                      {request.state}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {["PENDING", "NOTPAID", "REJECTED", "ENROLLED"].map(
                    (state) => (
                      <SelectItem key={state} value={state}>
                        <Badge
                          variant={getBadgeVariant(state as Request["state"])}
                        >
                          {state}
                        </Badge>
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(request.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getBadgeVariant(
  state: Request["state"]
): "default" | "secondary" | "destructive" | "outline" {
  switch (state) {
    case "PENDING":
      return "default";
    case "NOTPAID":
      return "secondary";
    case "REJECTED":
      return "destructive";
    case "ENROLLED":
      return "outline";
    default:
      return "default";
  }
}
