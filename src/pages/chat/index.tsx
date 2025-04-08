'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Send, Search, Menu, Spline, LoaderCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import GujjuTraderLogo from '../../assets/gujjutradetslogo.png';
import app from '@/firebaseConfig';
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  onChildAdded,
} from 'firebase/database';
import Toast from '@/components/toast/commonToast';
import dayjs from 'dayjs';
import { useAllUsers, useUsers } from '@/hooks/api/users/useUsers';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { ref as dbRef } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
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
  const [userData, setUserData] = useState<any>();
  const [selectedUser, setSelectedUser] = useState<any>([0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [updateMessageList, setUpdateMessageList] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [chatUserList, setChatUserList] = useState<string[]>([]);
  const [sendImage, setSendImage] = useState<boolean>(false);

  const userEmailId = sessionStorage.getItem('userEmail');
  const userName = userEmailId?.split('@')[0];
  const senderId = sessionStorage.getItem('user_id');

  const { data, isLoading } = useAllUsers({
    search: searchTerm,
  });

  useEffect(() => {
    if (data?.data) {
      if (!searchTerm) {
        setUserData(
          data?.data.filter((user: any) => {
            return chatUserList.includes(user._id);
          })
        );
        setSelectedUser(
          data?.data.filter((user: any) => {
            return chatUserList.includes(user._id);
          })[0]
        );
      } else {
        setUserData(data?.data);
        setSelectedUser(data?.data[0]);
      }
    }
  }, [data?.data]);


  // Filter users based on search term
  // const filteredUsers = userData?.filter((user: any) => {
  //   user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase());
  // });

  // console.log("Filtered Users:>>", filteredUsers);

  // const filteredUsers = userData?.filter((user)=>{
  //   console.log("USER:>>", user);

  // })

  // Scroll to bottom of messages when messages change or user changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser]);

  // Handle sending a new message
  // const handleSendMessage = async () => {
  //   if (newMessage.trim() === '') return;

  //   let imageUrl = null;

  //   if (selectedImage) {
  //     const storage = getStorage();
  //     const imageRef = storageRef(
  //       storage,
  //       `chatImages/${Date.now()}-${selectedImage.name}`
  //     );
  //     await uploadBytes(imageRef, selectedImage);
  //     imageUrl = await getDownloadURL(imageRef);
  //   }

  //   // const updatedMessages = {
  //   //   ...messages,
  //   //   [selectedUser._id]: [
  //   //     ...(messages[selectedUser._id as keyof typeof messages] || []),
  //   //     {
  //   //       id: Date.now(),
  //   //       receiverId: selectedUserId,
  //   //       senderId: senderId,
  //   //       senderName: userName,
  //   //       imageUrl: imageUrl || null,
  //   //       text: newMessage,
  //   //       timestamp: new Date().toLocaleTimeString([], {
  //   //         hour: '2-digit',
  //   //         minute: '2-digit',
  //   //       }),
  //   //     },
  //   //   ],
  //   // };

  //   // setMessages(updatedMessages);
  //   setNewMessage('');

  //   const db = getDatabase(app);
  //   const messagesRef = ref(db, 'chatAdminToUser/' + selectedUserId);
  //   set(push(messagesRef), {
  //     receiverId: selectedUserId,
  //     senderId: senderId,
  //     senderName: userName,
  //     imageUrl: imageUrl,
  //     text: newMessage,
  //     timestamp: new Date().getTime(),
  //   })
  //     .then(() => {
  //       Toast('success', 'Message sent successfully');
  //     })
  //     .catch((error) => {
  //       Toast('info', error.message || 'Failed to send message');
  //     });

  //   setUpdateMessageList(!updateMessageList);
  //   setNewMessage('');
  //   setSelectedImage(null);
  //   setPreviewUrl(null);
  // };

  const route = useNavigate();

  const handleSendMessage = async () => {
    if (newMessage.trim() === '' && !selectedImage) return;

    let imageUrl = null;

    setSendImage(true);

    if (selectedImage) {
      try {
        const storage = getStorage();
        const imageRef = storageRef(
          storage,
          `chatImages/${Date.now()}-${selectedImage.name}`
        );
        await uploadBytes(imageRef, selectedImage);
        imageUrl = await getDownloadURL(imageRef);
        setSendImage(false);
      } catch (error) {
        setSendImage(false);
        Toast('info', 'Image upload failed');
        return;
      }
    }

    const db = getDatabase(app);
    const messagesRef = ref(db, 'chatAdminToUser/' + selectedUserId);
    const newMessageRef = push(messagesRef); // Correct way to push

    const messageData = {
      receiverId: selectedUserId,
      senderId: senderId,
      senderName: userName,
      imageUrl: imageUrl || null,
      text: newMessage || '',
      timestamp: Date.now(),
    };

    try {
      setSendImage(false);
      await set(newMessageRef, messageData);
    } catch (error: any) {
      Toast('info', error.message || 'Failed to send message');
    }

    setUpdateMessageList(!updateMessageList);
    setNewMessage('');
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  useEffect(() => {
    const db = getDatabase(app);

    const chatRef = ref(db, 'chatAdminToUser/' + selectedUserId);

    const unsubscribe = onChildAdded(chatRef, (snapshot) => {
      const message = snapshot.val();
      if (message) {
        setMessageList((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedUserId]);

  useEffect(() => {
    handleGetMessages();
  }, [selectedUserId, updateMessageList]);

  const getChatUserList = async () => {
    const db = getDatabase(app);
    try {
      const data = await get(ref(db, 'chatAdminToUser'));

      if (!data.exists()) {
        setChatUserList([]);
      } else {
        const result = data.val();
        const userList = Object.keys(result); // returns ['userId1', 'userId2', ...]
        setChatUserList(userList);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getChatUserList();
  }, []);

  const handleGetMessages = async () => {
    const db = getDatabase(app);

    const messagesRef = ref(db, 'chatAdminToUser/' + selectedUserId);
    const messagesList = await get(messagesRef);
    if (messagesList.exists()) {
      setMessageList(Object.values(messagesList.val()));
    } else {
      setMessageList([]);
    }
  };

  // Handle pressing Enter to send a message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // const handleSendMessage = async () => {
  //   if (!newMessage.trim() && !selectedImage) return;

  //   const db = getDatabase();
  //   const messageRef = dbRef(db, `chatAdminToUser/${selectedUserId}`);
  //   await push(messageRef, {
  //     senderId,
  //     receiverId: selectedUserId,
  //     message: newMessage || '',
  //     image: imageUrl,
  //     date: Date.now(),
  //   });

  //   // Reset states
  //   setNewMessage('');
  //   setSelectedImage(null);
  //   setPreviewUrl(null);
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // For showing preview
    }
  };
  const endOfMessagesRef = useRef(null);
  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

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
                <img src={GujjuTraderLogo} alt='Your Avatar' />
              </Avatar>
              <div>
                <h2 className='font-semibold'>{userName}</h2>
                <p className='text-xs text-muted-foreground'>{userEmailId}</p>
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

        <div className='flex-1 h-[calc(100vh-250px)] overflow-y-auto'>
          {isLoading ? (
            <div className='flex items-center justify-center h-full'>
              <p className='text-muted-foreground'>Loading users...</p>
            </div>
          ) : (
            userData?.map((user: any) => (
              <div
                key={user._id}
                className={cn(
                  'flex items-center p-4 hover:bg-primary cursor-pointer border-b',
                  selectedUser._id === user._id && 'bg-primary'
                )}
                onClick={() => {
                  setSelectedUser(user);
                  setShowSidebar(false);
                  setSelectedUserId(user._id);
                }}
              >
                <div className='relative'>
                  <Avatar
                    className='h-12 w-12 overflow-hidden mr-3'
                    onClick={() => route(`/users/${user._id}`)}
                  >
                    {/* <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback> */}
                    <img
                      src={
                        user.profile_image ||
                        `https://ui-avatars.com/api/?name=${user.full_name}`
                      }
                      alt={user.name}
                      className='h-full w-full object-cover'
                    />
                  </Avatar>
                  {/* {user.online && (
                      <span className='absolute bottom-0 right-2 h-3 w-3 rounded-full bg-green-500 border-2 border-background'></span>
                    )} */}
                </div>
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between items-baseline'>
                    <h3 className='font-medium truncate'>{user.full_name}</h3>
                    {/* <span className='text-xs whitespace-nowrap ml-2'>
                        {user.lastSeen}
                      </span> */}
                  </div>
                  <p className='text-sm  truncate'>{user.email}</p>
                </div>
              </div>
            ))
          )}
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
            <Avatar className='h-10 w-10 overflow-hidden mr-3'>
              {/* <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
              <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback> */}
              <img
                src={
                  selectedUser.profile_image ||
                  `https://ui-avatars.com/api/?name=${selectedUser.full_name}`
                }
                alt={selectedUser.full_name}
                className='h-full w-full object-cover'
              />
            </Avatar>
            <div>
              <h2 className='font-semibold flex items-center'>
                {selectedUser.full_name}
                {/* {selectedUser.online && (
                  <span className='ml-2 text-xs text-green-500 font-normal'>
                    ● Online
                  </span>
                )} */}
              </h2>
              <p className='text-xs text-muted-foreground'>
                {selectedUser.email}
              </p>
            </div>
          </div>
          {/* <div className='flex items-center space-x-2'>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Phone size={18} />
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Video size={18} />
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <MoreVertical size={18} />
            </Button>
          </div> */}
        </div>

        {/* Messages area */}
        <div className='flex-1 overflow-y-auto p-4 bg-accent/20'>
          {messageList.length > 0 ? (
            <div className='space-y-4'>
              {messageList.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex',
                    message.receiverId === senderId
                      ? 'justify-start'
                      : 'justify-end'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-4 py-2 shadow-sm',
                      message.receiverId === senderId
                        ? 'bg-card rounded-bl-none'
                        : 'bg-primary text-primary-foreground rounded-br-none'
                    )}
                  >
                    <p>
                      {message.text === '' ? (
                        <>
                          <img
                            className='h-[100px] object-cover'
                            src={message.imageUrl}
                            alt='preview'
                            onClick={() => setPreviewImage(message.imageUrl)}
                          />
                        </>
                      ) : (
                        message.text
                      )}
                    </p>
                    {previewImage && (
                      <div
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70'
                        onClick={() => setPreviewImage(null)} // close on background click
                      >
                        <img
                          src={previewImage}
                          alt='Full Preview'
                          className='max-w-full max-h-full rounded shadow-lg'
                        />
                      </div>
                    )}
                    <p
                      className={cn(
                        'text-xs mt-1',
                        message.receiverId === senderId
                          ? 'text-muted-foreground'
                          : 'text-primary-foreground/70'
                      )}
                    >
                      {new Date(message.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>
          ) : (
            <div className='flex items-center justify-center h-full'>
              <p className='text-muted-foreground'>No messages yet.</p>
            </div>
          )}
        </div>

        {/* Message input */}
        <div className='p-4 border-t bg-card'>
          <div className='flex items-center space-x-2'>
            <label className='cursor-pointer'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                hidden
              />
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='#2D9D90'
                width='30px'
                height='30px'
                viewBox='0 0 32 32'
                version='1.1'
              >
                <title>clip</title>
                <path d='M5.469 16.688l8.75-8.75c0.094-0.094 0.844-0.844 2.031-1.25 1.656-0.531 3.344-0.094 4.688 1.25 1.375 1.344 1.781 3 1.25 4.656-0.375 1.188-1.156 2-1.25 2.094l-9.406 9.406c-1.625 1.625-5.688 3.719-9.438 0-3.719-3.719-1.594-7.813 0-9.406l10.094-10.125c0.375-0.375 0.969-0.375 1.344 0s0.375 0.969 0 1.344l-10.063 10.125c-0.156 0.125-3.313 3.406 0 6.719 3.219 3.219 6.375 0.344 6.719 0l9.406-9.438s0.531-0.531 0.781-1.281c0.313-1 0.094-1.875-0.781-2.75-1.875-1.875-3.688-0.313-4.031 0l-8.75 8.719c-0.313 0.313-0.531 0.844 0 1.375s1.031 0.281 1.344 0l6.063-6.063c0.375-0.344 1-0.344 1.344 0 0.375 0.375 0.375 1 0 1.375l-6.063 6.031c-0.844 0.813-2.563 1.469-4.031 0-1.5-1.469-0.844-3.219 0-4.031z' />
              </svg>
            </label>

            <Input
              className='flex-1'
              placeholder='Type a message...'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />

            {sendImage ? (
              <Button
                onClick={handleSendMessage}
                disabled={sendImage}
                size='icon'
              >
                <LoaderCircle size={18} className='animate-spin' />
              </Button>
            ) : (
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && !selectedImage}
                size='icon'
              >
                <Send size={18} />
              </Button>
            )}
          </div>

          {/* Show preview if image is selected */}
          {previewUrl && (
            <div className='mt-2'>
              <img
                src={previewUrl}
                alt='Preview'
                className='max-h-32 rounded-md'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
