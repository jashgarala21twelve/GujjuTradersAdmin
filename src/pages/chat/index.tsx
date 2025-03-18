'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import {
  User,
  Send,
  Search,
  Menu,
  X,
  MoreVertical,
  Phone,
  Video,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Sample data - replace with your actual data source
const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    lastSeen: '2 min ago',
    online: true,
  },
  {
    id: 2,
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    lastSeen: '1 hour ago',
    online: false,
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    lastSeen: '3 hours ago',
    online: false,
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    lastSeen: 'Just now',
    online: true,
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'robert@example.com',
    avatar: '/placeholder.svg?height=40&width=40',
    lastSeen: 'Yesterday',
    online: false,
  },
];

// Sample messages - in a real app, you'd have a structure like this for each user
const sampleMessages = {
  1: [
    { id: 1, text: 'Hey, how are you?', sent: false, timestamp: '09:30 AM' },
    {
      id: 2,
      text: "I'm good, thanks! How about you?",
      sent: true,
      timestamp: '09:32 AM',
    },
    {
      id: 3,
      text: 'Doing well. Did you get a chance to look at the project?',
      sent: false,
      timestamp: '09:35 AM',
    },
    {
      id: 4,
      text: "Yes, I've reviewed it. Let's discuss it in our meeting tomorrow.",
      sent: true,
      timestamp: '09:40 AM',
    },
    {
      id: 5,
      text: "Sounds good! I'll prepare some notes.",
      sent: false,
      timestamp: '09:42 AM',
    },
  ],
  2: [
    {
      id: 1,
      text: 'Hi Sarah, do you have the report ready?',
      sent: true,
      timestamp: 'Yesterday',
    },
    {
      id: 2,
      text: "Almost done, I'll send it by EOD.",
      sent: false,
      timestamp: 'Yesterday',
    },
    { id: 3, text: 'Perfect, thank you!', sent: true, timestamp: 'Yesterday' },
  ],
  3: [
    {
      id: 1,
      text: 'When is the team meeting?',
      sent: false,
      timestamp: 'Monday',
    },
    {
      id: 2,
      text: "It's scheduled for 3 PM tomorrow.",
      sent: true,
      timestamp: 'Monday',
    },
    {
      id: 3,
      text: 'Thanks for the reminder!',
      sent: false,
      timestamp: 'Monday',
    },
  ],
  4: [
    {
      id: 1,
      text: 'Did you see the latest design updates?',
      sent: false,
      timestamp: 'Just now',
    },
    {
      id: 2,
      text: 'Yes, they look great! I especially like the new color scheme.',
      sent: true,
      timestamp: 'Just now',
    },
  ],
  5: [
    {
      id: 1,
      text: 'Hello, I wanted to discuss the new client requirements.',
      sent: false,
      timestamp: 'Yesterday',
    },
    {
      id: 2,
      text: 'Sure, what specifically do you want to go over?',
      sent: true,
      timestamp: 'Yesterday',
    },
    {
      id: 3,
      text: 'The timeline seems tight. Can we extend it by a week?',
      sent: false,
      timestamp: 'Yesterday',
    },
    {
      id: 4,
      text: "I'll check with the project manager and get back to you.",
      sent: true,
      timestamp: 'Yesterday',
    },
  ],
};

function Chat() {
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to bottom of messages when messages change or user changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedMessages = {
      ...messages,
      [selectedUser.id]: [
        ...(messages[selectedUser.id as keyof typeof messages] || []),
        {
          id: Date.now(),
          text: newMessage,
          sent: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ],
    };

    setMessages(updatedMessages);
    setNewMessage('');
  };

  // Handle pressing Enter to send a message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='flex h-full bg-background'>
      {/* Mobile menu button */}
      {/* <button
        className='md:hidden absolute top-4 left-4 z-50'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X size={24} /> : <Menu size={24} />}
      </button> */}

      {/* Left sidebar - Users list */}
      <div
        className={cn(
          'w-full md:w-80 border-r bg-card flex flex-col h-full transition-all duration-300 ease-in-out',
          showSidebar ? 'block' : 'hidden md:block'
        )}
      >
        <div className='p-4 border-b'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <Avatar className='h-10 w-10 mr-2'>
                <AvatarImage
                  src='/placeholder.svg?height=40&width=40'
                  alt='Your Avatar'
                />
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className='font-semibold'>Your Name</h2>
                <p className='text-xs text-muted-foreground'>
                  your.email@example.com
                </p>
              </div>
            </div>
          </div>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='text'
              placeholder='Search users...'
              className='pl-8'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className='flex-1 overflow-y-auto'>
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={cn(
                'flex items-center p-4 hover:bg-primary cursor-pointer border-b',
                selectedUser.id === user.id && 'bg-primary'
              )}
              onClick={() => {
                setSelectedUser(user);
                setShowSidebar(false); // Hide sidebar on mobile after selection
              }}
            >
              <div className='relative'>
                <Avatar className='h-12 w-12 mr-3'>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {user.online && (
                  <span className='absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500 border-2 border-background'></span>
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <div className='flex justify-between items-baseline'>
                  <h3 className='font-medium truncate'>{user.name}</h3>
                  <span className='text-xs whitespace-nowrap ml-2'>
                    {user.lastSeen}
                  </span>
                </div>
                <p className='text-sm  truncate'>{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div
        className={cn(
          'flex-1 flex flex-col h-full',
          !showSidebar ? 'flex' : 'hidden md:flex'
        )}
      >
        {/* Chat header */}
        <div className='p-4 border-b bg-card flex items-center justify-between'>
          <div className='flex items-center'>
            <button
              className='md:hidden mr-2'
              onClick={() => setShowSidebar(true)}
            >
              <Menu size={20} />
            </button>
            <Avatar className='h-10 w-10 mr-3'>
              <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
              <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className='font-semibold flex items-center'>
                {selectedUser.name}
                {selectedUser.online && (
                  <span className='ml-2 text-xs text-green-500 font-normal'>
                    ● Online
                  </span>
                )}
              </h2>
              <p className='text-xs text-muted-foreground'>
                {selectedUser.email}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Phone size={18} />
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Video size={18} />
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>

        {/* Messages area */}
        <div className='flex-1 overflow-y-auto p-4 bg-accent/20'>
          <div className='space-y-4'>
            {messages[selectedUser.id as keyof typeof messages]?.map(
              (message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.sent ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-4 py-2 shadow-sm',
                      message.sent
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-card rounded-bl-none'
                    )}
                  >
                    <p>{message.text}</p>
                    <p
                      className={cn(
                        'text-xs mt-1',
                        message.sent
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message input */}
        <div className='p-4 border-t bg-card'>
          <div className='flex items-center space-x-2'>
            <Input
              className='flex-1'
              placeholder='Type a message...'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <Button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
              size='icon'
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
