import { ChatClient } from '@twurple/chat';
import { Commands } from './commands';

const DELAY = 5000;

type MessageConsumerCallback = (command: Commands, content: string) => Promise<void>;

class TwitchClient {
    private client: ChatClient;
    private onMessageCallback: MessageConsumerCallback;
    private store: Record<string, Array<
    {
        messageId: string,
        timeoutId: NodeJS.Timeout,
    }
    >> = {
    };

    constructor(channel: string, onMessage: MessageConsumerCallback){
        this.onMessageCallback = onMessage;
        this.client = new ChatClient({ channels: [channel] });
        this.client.connect();

        this.client.onBan((channel, user, msg) => {
            console.log(`banned user ${user}`);
            this.clearMessagesForUser(user);
        });

        this.client.onTimeout((channel, user, duration, msg) => {
            console.log(`timeouted user ${user}`);
            this.clearMessagesForUser(user);
        });

        this.client.onMessage(async (channel, user, text, completeMessage ) => {
            console.log(`${channel}  - ${user} - ${text} `);
            if (!text.length) return;

            const words = text.split(' ');
            const firstWord = words[0];
            if (firstWord.charAt(0) !== '!') return;
            const command = firstWord.replace('!', '');
            const rest = words.slice(1).join(' ');
            const timeoutId = setTimeout(async () => {
                await this.actionMessage((command.toLowerCase()) as Commands, rest, completeMessage.id, user);
            }, DELAY);

            this.store[user] = [
                ...this.store[user] ?? [],
                {
                    timeoutId,
                    messageId: completeMessage.id
                }
            ];
        });
    }

    async actionMessage(command: Commands, args:string, messageId: string, user: string){
        await this.onMessageCallback(command, args);
        this.store[user] = (this.store[user] ?? []).filter((item) => item.messageId !== messageId);
    }

    clearMessagesForUser(user: string) {
        const items = this.store[user];
        console.log(`clearing ${items.length} for user ${user}`);
        this.store[user] = [];
        items.forEach((item) => {
            clearTimeout(item.timeoutId);
        });
    }

    close(){
        this.client.quit();
    }
}

export default TwitchClient;