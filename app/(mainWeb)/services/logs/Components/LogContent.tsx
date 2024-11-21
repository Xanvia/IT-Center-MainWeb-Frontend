import { Log } from '../data/logs'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LogContentProps {
  selectedLog: Log | null;
}

export function LogContent({ selectedLog }: LogContentProps) {
  if (!selectedLog) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select a log entry to view details</p>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{selectedLog.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <img
          src={selectedLog.imageUrl}
          alt={`Illustration for ${selectedLog.name}`}
          className="mx-auto h-48 w-48 rounded-lg object-cover"
        />
        <p className="text-muted-foreground">{selectedLog.description}</p>
      </CardContent>
    </Card>
  )
}

