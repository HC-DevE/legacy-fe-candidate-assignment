"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  History,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
} from "lucide-react";
import { useSignedMessages } from "@/hooks/use-signed-messages";
import {
  truncateAddress,
  formatTimestamp,
  truncateSignature,
} from "@/lib/utils";
import { toast } from "sonner";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function MessageHistory() {
  const { messages, clearMessages } = useSignedMessages();
  const { primaryWallet } = useDynamicContext();

  const filteredMessages = messages.filter(
    (msg) => msg.address === primaryWallet?.address
  );

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`, {
      description: "Copied to clipboard",
    });
  };

  if (filteredMessages.length === 0) {
    return (
      <Card className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition-all">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Message History
              </CardTitle>
              <CardDescription className="text-sm mt-0.5 text-gray-600">
                Your signed messages will appear here
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 rounded-2xl bg-linear-to-br from-purple-100 to-indigo-100 flex items-center justify-center mb-6 shadow-lg">
              <FileText className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No messages yet
            </h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
              Sign your first message to start building your signature history
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-700">
                Ready to sign
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl hover:shadow-2xl transition-all">
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <History className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
                {filteredMessages.length}
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Message History
              </CardTitle>
              <CardDescription className="text-sm mt-0.5 text-gray-600">
                {filteredMessages.length} message
                {filteredMessages.length !== 1 ? "s" : ""} signed
              </CardDescription>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 px-3 font-medium transition-all"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            {filteredMessages.map((msg, index) => (
              <div
                key={msg.id}
                className="group p-5 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-200/80 hover:border-purple-300 hover:bg-white transition-all hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 rounded-lg bg-linear-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold shadow-sm">
                        #{filteredMessages.length - index}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTimestamp(msg.timestamp)}
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900 wrap-break-word leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 pt-4 border-t border-gray-200">
                  {/* Address */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-gray-600">
                      Address
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="px-3 py-1.5 rounded-lg bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-800 text-xs font-mono shadow-sm">
                        {truncateAddress(msg.address, 6)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-100 hover:text-purple-600"
                        onClick={() => copyToClipboard(msg.address, "Address")}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-gray-600">
                      Signature
                    </span>
                    <div className="flex items-center gap-2">
                      <code className="px-3 py-1.5 rounded-lg bg-linear-to-r from-gray-50 to-gray-100 border border-gray-200 text-gray-800 text-xs font-mono shadow-sm">
                        {truncateSignature(msg.signature)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-100 hover:text-purple-600"
                        onClick={() =>
                          copyToClipboard(msg.signature, "Signature")
                        }
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-linear-to-r from-green-500 to-emerald-500 shadow-lg">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="vertical" className="bg-purple-200" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
