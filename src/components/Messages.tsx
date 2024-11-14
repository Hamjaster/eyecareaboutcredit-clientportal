"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  ChevronLeft,
  Menu,
  MoreVertical,
  Send,
  Users,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Jimmy Seinz",
    avatar: "/placeholder.svg",
    lastMessage:
      "Yes, I've seen the payslip, and it looks like the tax deductions are higher...",
    time: "10:11 AM",
    unread: 2,
    type: "client",
    isTyping: true,
  },
  {
    id: 2,
    name: "Selly Deluna",
    avatar: "/placeholder.svg",
    lastMessage: "Just a quick reminder that the payroll needs to be...",
    time: "10:09 AM",
    unread: 2,
    type: "team",
  },
  {
    id: 3,
    name: "Lana Delrey",
    avatar: "/placeholder.svg",
    lastMessage: "Hey there, I've processed the payroll for this month...",
    time: "10:08 AM",
    unread: 3,
    type: "team",
  },
];

export default function MessagesPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [convs, setConvs] = useState(CONVERSATIONS);
  const [selectedConversation, setSelectedConversation] = useState(
    CONVERSATIONS[0]
  );
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setConvs(
      CONVERSATIONS.filter(
        (conv) =>
          (filter === "all" || conv.type === filter) &&
          conv.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [filter, searchQuery]);

  const Sidebar = () => (
    <div className="w-full md:w-80 flex flex-col bg-red-50 h-full">
      <div className="p-3 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="client">Clients</SelectItem>
              <SelectItem value="team">Team</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        variant={"secondary"}
        className="border-none rounded-none bg-white"
      >
        New Chat
      </Button>
      <div className="flex-1 overflow-y-auto">
        {convs.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-start gap-3 p-4 hover:bg-red-100 cursor-pointer"
            onClick={() => {
              setSelectedConversation(conversation);
              if (isMobileView) {
                document.getElementById("sidebar-sheet")?.click();
              }
            }}
          >
            <Avatar>
              <AvatarImage src={conversation.avatar} />
              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{conversation.name}</span>
                  <Badge
                    variant={
                      conversation.type === "client" ? "default" : "secondary"
                    }
                  >
                    {conversation.type}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {conversation.time}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.isTyping
                    ? "typing..."
                    : conversation.lastMessage}
                </p>
                {conversation.unread > 0 && (
                  <Badge
                    variant="outline"
                    className="ml-auto bg-red-200 rounded-full w-2 flex items-center justify-center text-red-400"
                  >
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-[85vh] border rounded-lg overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block border-r">
        <Sidebar />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobileView && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    id="sidebar-sheet"
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80">
                  <Sidebar />
                </SheetContent>
              </Sheet>
            )}
            <Avatar>
              <AvatarImage src={selectedConversation.avatar} />
              <AvatarFallback>
                {selectedConversation.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{selectedConversation.name}</h2>
                <Badge>{selectedConversation.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Users className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Chat messages would go here */}
          <div className="flex gap-3 max-w-md">
            <Avatar>
              <AvatarImage src={selectedConversation.avatar} />
              <AvatarFallback>
                {selectedConversation.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-200 p-3 rounded-lg">
              <p className="text-sm">
                Hi Admin, I wanted to ask about my salary this month. Why is the
                amount different from what I usually receive?
              </p>
            </div>
          </div>

          <div className="flex gap-3 max-w-md ml-auto">
            <div className="bg-websitePrimary text-primary-foreground p-3 rounded-lg">
              <p className="text-sm">
                Hi {selectedConversation.name}, thanks for reaching out. Let me
                check the details for you. Have you looked at your payslip for
                this month? It could be due to changes in deductions or
                overtime.
              </p>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="p-4 border-t">
          <form className="flex items-center gap-2">
            <Input placeholder="Type a message..." />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
