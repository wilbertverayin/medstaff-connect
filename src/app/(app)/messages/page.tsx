import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { messages } from "@/lib/data"
import { Search, Send } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="grid h-[calc(100vh-5rem)] w-full grid-cols-1 md:grid-cols-[300px_1fr]">
      <div className="flex flex-col border-r bg-background">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold">Inbox</h1>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-10" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-4">
            {messages.map((message) => (
              <button
                key={message.id}
                className="flex items-start gap-4 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent"
              >
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={message.avatar} alt={message.name} />
                  <AvatarFallback>{message.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{message.name}</p>
                    <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                  </div>
                  <p className="line-clamp-2 text-muted-foreground">{message.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-4 border-b p-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Juanito Reyes" />
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Dr. Juanito Reyes</p>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Juanito Reyes" />
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] rounded-lg bg-muted p-3">
                <p className="text-sm">Hi Dr. Maria! I received the patient files. Looks straightforward.</p>
              </div>
            </div>
            <div className="flex items-end gap-2 justify-end">
              <div className="max-w-[70%] rounded-lg bg-primary text-primary-foreground p-3">
                <p className="text-sm">That's great to hear. Let me know if you need anything else from my end.</p>
              </div>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="https://placehold.co/100x100.png" alt="You" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-end gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="https://placehold.co/100x100.png" alt="Dr. Juanito Reyes" />
                <AvatarFallback>JR</AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] rounded-lg bg-muted p-3">
                <p className="text-sm">Thank you for the referral, Dr. Maria. The patient is scheduled for consultation next week.</p>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <form className="relative">
            <Textarea
              placeholder="Type your message..."
              className="min-h-[48px] resize-none rounded-lg pr-16"
            />
            <Button type="submit" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
