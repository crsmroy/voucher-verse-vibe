import { useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

type PendingAction = {
  order_id: string;
  field: string;
  value: string;
  old_value: string | null;
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  pending?: PendingAction;
  pendingState?: 'waiting' | 'done' | 'cancelled';
};

const initialMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      'Hi! I can look up orders and replacement/return requests, or update an order phone, WhatsApp, email or status. Try: Any replacement requests created today?',
  },
];

const AiAssistant = () => {
  // const [hasSession, setHasSession] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   let isMounted = true;
  //   void supabase.auth.getSession().then(({ data }) => {
  //     if (isMounted) setHasSession(Boolean(data.session));
  //   });

  //   const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setHasSession(Boolean(session));
  //     if (!session) {
  //       setOpen(false);
  //       setMessages(initialMessages);
  //     }
  //   });

  //   return () => {
  //     isMounted = false;
  //     authListener.subscription.unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { messages: next.map(({ role, content }) => ({ role, content })) },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: data?.reply ?? 'I could not prepare a reply. Please try again.',
          pending: data?.pending_action,
          pendingState: data?.pending_action ? 'waiting' : undefined,
        },
      ]);
    } catch (error) {
      console.error('AI assistant request failed:', error);
      const detail = error instanceof Error ? error.message : String(error);
      setMessages((previous) => [
        ...previous,
        { role: 'assistant', content: `Sorry, something went wrong: ${detail}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const answerPending = async (index: number, confirm: boolean) => {
    const action = messages[index]?.pending;
    if (!action || loading) return;

    const mark = (state: 'done' | 'cancelled') =>
      setMessages((previous) =>
        previous.map((message, messageIndex) =>
          messageIndex === index ? { ...message, pendingState: state } : message,
        ),
      );

    if (!confirm) {
      mark('cancelled');
      setMessages((previous) => [
        ...previous,
        { role: 'assistant', content: 'Okay, cancelled. Nothing was changed.' },
      ]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { confirm_action: action },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      mark('done');
      setMessages((previous) => [
        ...previous,
        { role: 'assistant', content: data?.reply ?? 'The requested change was completed.' },
      ]);
    } catch (error) {
      console.error('AI assistant action failed:', error);
      const detail = error instanceof Error ? error.message : String(error);
      setMessages((previous) => [
        ...previous,
        { role: 'assistant', content: `Sorry, something went wrong: ${detail}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // if (!hasSession) return null;

  return (
    <>
      {!open && (
        <Button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open AI assistant"
          title="Open AI assistant"
          className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full p-0 shadow-xl"
        >
          <Bot className="h-7 w-7" />
        </Button>
      )}

      {open && (
        <section
          aria-label="AI assistant chat"
          className="fixed bottom-5 right-5 z-50 flex h-[min(70dvh,40rem)] max-h-[calc(100dvh-2.5rem)] w-[92vw] max-w-sm flex-col overflow-hidden rounded-md border border-border bg-card text-card-foreground shadow-xl"
        >
          <header className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
            <span className="font-semibold">AI Assistant (Grok)</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close AI assistant"
              className="text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-md px-3 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.content}
                </div>
                {message.pending && message.pendingState === 'waiting' && (
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      type="button"
                      size="sm"
                      disabled={loading}
                      onClick={() => void answerPending(index, true)}
                    >
                      Confirm
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={loading}
                      onClick={() => void answerPending(index, false)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-muted-foreground">Thinking...</div>}
            <div ref={bottomRef} />
          </div>

          <form
            className="flex gap-2 border-t border-border p-2"
            onSubmit={(event) => {
              event.preventDefault();
              void send();
            }}
          >
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about orders or requests..."
              aria-label="Ask about orders or requests"
              className="min-w-0"
            />
            <Button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      )}
    </>
  );
};

export default AiAssistant;
