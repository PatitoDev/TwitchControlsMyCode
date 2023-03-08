import * as vscode from 'vscode';
import handlerMap from './handlerMap';
import TwitchClient from './TwitchClient';

let client:TwitchClient;

export const activate = async (context: vscode.ExtensionContext) => {
	console.log('Activated Extension');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('twitchcontrolsmycode.enable', async () => {

		const resp = await vscode.window.showInputBox({
			 placeHolder: 'Twitch channel name',
			 prompt: 'Please enter your twitch channel',
			 title: 'Twitch controls your code'
		});

		if (!resp) {
			vscode.window.showErrorMessage('Invalid channel name');
			return;
		}

		if (client) {
			client.close();
		}

		client = new TwitchClient(resp, async (type, content) => {
			const handler = handlerMap[type];
			if (handler) {
				await handler(content);
			}
		});	

		vscode.window.showInformationMessage(`Connected to ${resp}`);
	});

	context.subscriptions.push(disposable);
};

// This method is called when your extension is deactivated
export function deactivate() {
	client.close();
}