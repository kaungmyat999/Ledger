"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Separator } from "@/src/components/ui/separator";
import { cn } from "@/src/lib/utils";
import { useState } from "react";

export default function SettingsCard() {
  const [connectedBank, setConnectedBank] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="line-clamp-1 text-xl">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col items-center gap-y-2 py-4 lg:flex-row">
          <p className="w-full text-sm font-medium lg:w-66">Bank account</p>
          <div className="flex w-full items-center justify-between">
            <div
              className={cn(
                "flex items-center truncate text-sm",
                !connectedBank && "text-muted-foreground",
              )}
            >
              {connectedBank
                ? "Bank account connected"
                : "No bank account connected"}
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size={"sm"} variant={"ghost"} disabled={connectedBank}>
                  {connectedBank ? "Connected" : "Connect"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Connect Your Bank Account</DialogTitle>
                  <DialogDescription>
                    This feature is coming soon.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                  <Button
                    onClick={() => {
                      setDialogOpen(false);
                    }}
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setConnectedBank(true);
                      setDialogOpen(false);
                    }}
                  >
                    Connect
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
