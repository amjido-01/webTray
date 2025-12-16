import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Copy, Info, X, SquareArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CopyField = "current" | "cname" | "arecord";

interface CopyPayload {
  text: string;
  field: CopyField;
}

export function DomainSettingsSheet({
  currentDomain = "johncoffee@webtray.com",
}) {
  const [customDomain, setCustomDomain] = useState("");
  const [copiedField, setCopiedField] = useState("");

  const handleCopy = ({ text, field }: CopyPayload) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const handleVisitDomain = () => {
    window.open(`https://${currentDomain}`, "_blank");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="rounded-full" variant="outline" size="sm">
          <Globe className="w-4 h-4 mr-2" />
          Edit Domain
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-2 p-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-[16px] text-[#4D4D4D] font-bold">
              Domain Settings
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-4">
          {/* Current Domain Card */}
          <Card className=" shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-700" />
                <CardTitle className="text-[16px] font-bold text-[#4D4D4D]">
                  Current Domain
                </CardTitle>
              </div>
              <CardDescription className="text-[#4D4D4D] font-normal text-[14px]">
                Your store is currently accessible at this domain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-[#1A1A1A] text-[14px] font-normal rounded-[10px] text-white hover:bg-black text-xs px-3 py-1">
                  Active
                </Badge>
                <span className="text-sm font-normal text-[#365BEB]">
                  {currentDomain}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[10px] text-[#1A1A1A] text-[14px] font-normal"
                  onClick={() =>
                    handleCopy({ text: currentDomain, field: "current" })
                  }
                >
                  <Copy className="h-3 w-3 mr-1 text-[#1A1A1A]" />
                  {copiedField === "current" ? "Copied!" : "Copy"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[10px] text-[#1A1A1A] text-[14px] font-normal"
                  onClick={handleVisitDomain}
                >
                  <SquareArrowUpRight className="h-3 w-3 mr-1 text-[#1A1A1A]" />
                  Visit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Custom Domain Card */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-[16px] font-bold text-[#4D4D4D]">
                Custom Domain
              </CardTitle>
              <CardDescription className="text-[#4D4D4D] font-normal text-[14px]">
                Connect your own domain to your WebTray store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="domain-name"
                  className="text-[16px] font-normal text-[#1A1A1A]"
                >
                  Domain Name
                </Label>
                <Input
                  id="domain-name"
                  placeholder="yourdomain.com"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="rounded-lg h-[44px] placeholder:text-[#676767] placeholder:text-[14px] placeholder:font-normal"
                />
              </div>

              <Button
                size="lg"
                disabled
                className="w-1/2 rounded-full"
                variant="default"
              >
                Verify
              </Button>

              {/* Domain Setup Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Domain Setup Instructions
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      To connect your custom domain, you'll need to update your
                      DNS settings with your domain provider.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DNS Configuration Card */}
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle className="text-[16px] font-bold text-[#4D4D4D]">
                DNS Configuration
              </CardTitle>
              <CardDescription className="text-[#4D4D4D] font-normal text-[14px]">
                Add these DNS records to your domain provider
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* CNAME Record */}
              <div className="space-y-3 border p-[16px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-[12px] text-[#1A1A1A]">
                    CNAME Record
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-[10px] text-[#1A1A1A] text-[12px] font-normal"
                    onClick={() => handleCopy({ text: "www", field: "cname" })}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    {copiedField === "cname" ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-[#4D4D4D] font-normal text-xs mb-1">
                      Type
                    </p>
                    <p className="text-[#1A1A1A] font-normal">CNAME</p>
                  </div>
                  <div>
                    <p className="text-[#4D4D4D] font-normal text-xs mb-11">
                      Name
                    </p>
                    <p className="text-[#1A1A1A] font-normal">www</p>
                  </div>
                  <div>
                    <p className="text-[#4D4D4D] font-normal text-xs mb-1">
                      Value
                    </p>
                    <p className="font-medium text-blue-600 truncate">
                      {currentDomain}
                    </p>
                  </div>
                </div>
              </div>

              {/* A Record */}
              <div className="space-y-3 border p-[16px] rounded-[10px]">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-[12px] text-[#1A1A1A]">
                    A Record
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-[10px] text-[#1A1A1A] text-[12px] font-normal"
                    onClick={() =>
                      handleCopy({ text: "76.76.19.123", field: "arecord" })
                    }
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    {copiedField === "arecord" ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-[#4D4D4D] font-normal text-xs mb-1">
                      Type
                    </p>
                    <p className="text-[#1A1A1A] font-normal">A</p>
                  </div>
                  <div>
                    <p className="text-[#4D4D4D] font-normal text-xs mb-1">
                      Name
                    </p>
                    <p className="text-[#1A1A1A] font-normal">@</p>
                  </div>
                  <div>
                    <p className="text-[#4D4D4D] font-normal text-xs mb-1">
                      Value
                    </p>
                    <p className="text-[#1A1A1A] font-normal">76.76.19.123</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SSL Certificate Card */}
          <Card className="shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[16px] font-bold text-[#4D4D4D]">
                  SSL Certificate
                </CardTitle>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                  Active
                </Badge>
              </div>
              <CardDescription className="text-[#4D4D4D] font-normal text-[14px]">
                Your store is secured with SSL encryption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700 font-medium">
                  SSL Certificate Active
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Your store is secured with HTTPS encryption
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Domain History Card */}
          <Card className="mb-10 shadow-none">
            <CardHeader>
              <CardTitle className="text-[16px] font-bold text-[#4D4D4D]">
                Domain History
              </CardTitle>
              <CardDescription className="text-[#4D4D4D] font-normal text-[14px]">
                Previous domain configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-[12px] text-[#1A1A1A] font-semobold">
                    yourstore.webtray.com
                  </p>
                  <p className="text-[10px] font-normal text-[#4D4D4D]">
                    Default domain • Active Nov 10, 2024
                  </p>
                </div>
                <Badge className="bg-black text-white hover:bg-black text-xs">
                  Current
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                <div>
                  <p className="text-[12px] text-[#1A1A1A] font-semobold">
                    yourstore.webtray.com
                  </p>
                  <p className="text-[10px] font-normal text-[#4D4D4D]">
                    Default domain • Parked Nov 10, 2024
                  </p>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Failed
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
