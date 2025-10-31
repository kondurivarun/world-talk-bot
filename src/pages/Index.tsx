import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { MessageSquare, Loader2 } from "lucide-react";

const Index = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                PolyChat
              </h1>
              <p className="text-sm text-muted-foreground">
                Multilingual AI Assistant
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden">
        <div className="container mx-auto px-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 mb-6">
                  <MessageSquare className="h-16 w-16 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">
                  Welcome to PolyChat!
                </h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  I can understand and respond in multiple languages including
                  English, Hindi, Tamil, Telugu, Kannada, and more. Just type
                  in your preferred language!
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground max-w-sm">
                  <div className="p-3 rounded-lg bg-card border border-border">
                    English
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    हिंदी
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    தமிழ்
                  </div>
                  <div className="p-3 rounded-lg bg-card border border-border">
                    తెలుగు
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                role={message.role}
                content={message.content}
              />
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-card text-card-foreground border border-border rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Thinking...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
