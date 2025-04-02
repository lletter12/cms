"use client"

import React, {useState} from 'react';
import {Button} from "@/components/ui";
import {Input} from "@/components/form/input/InputField";

type Message = {
    sender: 'user' | 'ai';
    text: string;
};

export const OpenAIChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // 사용자 메시지를 메시지 리스트에 추가
        setMessages([...messages, { sender: 'user', text: inputMessage }]);
        setInputMessage('');

        try {

            /*const response = await (
                'https://api.openai.com/v1/completions',
                {
                    model: 'text-davinci-003',
                    prompt: inputMessage,
                    max_tokens: 150,
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );*/

            const aiMessage = "안녕";

            // AI의 응답 메시지를 메시지 리스트에 추가
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'ai', text: aiMessage },
            ]);
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
        }
    };

    return (
        <div className="flex flex-col items-center p-5 size-full">
            <div className="w-full h-80 max-h-screen overflow-y-auto bg-gray-400 shadow-lg rounded-lg p-4 mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                        <div
                            className={`p-2 rounded-lg max-w-xs ${msg.sender === 'ai' ? 'bg-gray-100 text-gray-800' : 'bg-gray-500 text-white'}`}
                        >
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full flex items-center gap-2">
                <div className="flex-1 relative">
                    <Input
                        type="text"
                        value={inputMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        className="w-full p-3 border-2 border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <Button
                    variant={"outline"}
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </div>
        </div>
    );
};