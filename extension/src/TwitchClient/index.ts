import { ChatClient } from '@twurple/chat';
import { Commands } from './commands';

type MessageConsumerCallback = (command: Commands, content: string) => Promise<void>;

const create = (channel: string, onMessage: MessageConsumerCallback) => {
    const chatClient = new ChatClient({ channels: [channel] });
    chatClient.connect();

    chatClient.onMessage(async (channel, user, text, completeMessage ) => {
        console.log(`${channel}  - ${user} - ${text} `);
        if (!text.length) return;

        const words = text.split(' ');
        const firstWord = words[0];
        if (firstWord.charAt(0) !== '!') return;
        const command = firstWord.replace('!', '');
        const rest = words.slice(1).join(' ');
        await onMessage((command.toLowerCase()) as Commands, rest);
    });

    return chatClient;
};

const twitchClient = {
    create
};

export default twitchClient;