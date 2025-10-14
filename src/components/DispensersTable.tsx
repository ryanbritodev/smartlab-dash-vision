import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

const dispensers = [
  { unit: "Unidade A", location: "Enfermaria 1", level: "Alto", status: "operational" },
  { unit: "Unidade B", location: "Enfermaria 2", level: "Médio", status: "operational" },
  { unit: "Unidade C", location: "Enfermaria 3", level: "Baixo", status: "alert" },
];

export function DispensersTable() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Dispensers</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unidade</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Nível</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dispensers.map((dispenser, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{dispenser.unit}</TableCell>
                <TableCell>{dispenser.location}</TableCell>
                <TableCell>{dispenser.level}</TableCell>
                <TableCell>
                  {dispenser.status === "operational" ? (
                    <Badge variant="outline" className="border-success text-success bg-success-light">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Operacional
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-warning text-warning bg-warning-light">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Alerta
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
