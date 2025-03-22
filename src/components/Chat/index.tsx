"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { SendHorizontal, Paperclip, Smile } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useChat } from "@ai-sdk/react";

interface ChatInterfaceProps {
  agentId: string;
  departmentId: string;
}

export default function Chat({ agentId, departmentId }: ChatInterfaceProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get agent context based on department and agent type
  const getAgentContext = (department: string, agent: string): string => {
    const contexts: Record<string, string> = {
      "hr-onboarding":
        "You are an Employee Onboarding/Offboarding assistant. Help with collecting new hire data, checking policies, setting up accounts, and managing offboarding tasks.",
      "hr-performance":
        "You are a Performance Review assistant. Help analyze feedback, identify themes, spot skill gaps, and suggest training plans.",
      "finance-expenses":
        "You are an Expense Approval assistant. Review expenses for policy compliance, flag suspicious items, and streamline approvals.",
      "finance-forecasting":
        "You are a Financial Forecasting assistant. Help with financial modeling, predictions, and generating reports.",
      "marketing-leads":
        "You are a Lead Qualification assistant. Help score leads, analyze conversion data, and recommend follow-up actions.",
      "marketing-content":
        "You are a Content Generation assistant. Create social media posts, emails, and blog outlines in the company's brand voice.",
      "legal-contracts":
        "You are a Contract Drafting assistant. Help create standard contract clauses, highlight risks, and ensure compliance.",
      "legal-compliance":
        "You are a Compliance Check assistant. Cross-check policies with regulations and identify potential compliance issues.",
    };

    const key = `${department}-${agent}`;
    return contexts[key] || "You are a helpful assistant.";
  };

  const agentContext = getAgentContext(departmentId, agentId);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/chat",
      initialMessages: [
        {
          id: "welcome",
          role: "assistant",
          content: `Hello! I'm your ${
            agentContext.split(".")[0]
          }. How can I help you today?`,
          createdAt: new Date(),
        },
      ],
      body: {
        agentContext,
      },
    });

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Format timestamp
  const formatTime = (date: Date | undefined) => {
    return date
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "";
  };

  return (
    <Card className="flex flex-col h-full border-muted shadow-sm">
      <CardContent className="flex-1 overflow-y-auto p-4 pt-6">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[85%] ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar
                  className={
                    message.role === "user" ? "bg-primary" : "bg-muted"
                  }
                >
                  {message.role === "user" ? (
                    <AvatarFallback>U</AvatarFallback>
                  ) : (
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt="Agent"
                    />
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <div
                    className={`rounded-2xl p-4 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-foreground border border-border/50"
                    }`}
                  >
                    {message.content}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 px-2">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <Avatar className="bg-muted">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt="Agent"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <div className="rounded-2xl p-4 bg-muted/50 text-foreground border border-border/50">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="text-sm text-red-500">
                Error: {error.message || "Something went wrong"}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={handleSubmit}
          className="flex w-full gap-2 items-center"
        >
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              className="pr-10 rounded-full"
              disabled={isLoading}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            >
              <Smile className="h-4 w-4" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-full h-10 w-10 bg-primary"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
