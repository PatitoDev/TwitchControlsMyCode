import * as vscode from 'vscode';
import { messageParser } from '../parsers/messageParser';

export const onReplaceHandler = async (content: string) => {
    const args = content.split(' ');
    if (args.length !== 2) return;
    const [toReplace, replaceWith] = args;

    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    // for each occurence of the toReplace, find the start and end of the position on the screen
    // replace for each
    const lineCount = editor.document.lineCount;
    const indexesToReplace: Array<{
        line: number,
        starAt: number
    }> = [];

    for (let i = 0; i < lineCount; i++) {
        const line = editor.document.lineAt(i);
        const regex = new RegExp(toReplace, 'g');
        const resultIterator = line.text.matchAll(regex);
        for (const item of resultIterator) {
            if (item.index !== undefined ) {
                indexesToReplace.push({
                    line: i,
                    starAt: item.index
                });
            };
        }
    }

    editor.edit((builder) => {
        indexesToReplace.forEach(({ line, starAt}) => {
            const start = new vscode.Position(line, starAt);
            const end = new vscode.Position(line, starAt + toReplace.length);
            const range = new vscode.Range(start, end);
            builder.replace(range, messageParser.parse(replaceWith));
        });
    });   
}; 