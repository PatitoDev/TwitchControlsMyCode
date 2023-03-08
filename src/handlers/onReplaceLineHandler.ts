import * as vscode from 'vscode';
import { messageParser } from '../parsers/messageParser';

export const onReplaceLineHandler = async (content: string) => {
    const args = content.split(' ');
    if (args.length < 2) return;
    const [lineAsString, ...rest] = args;
    try {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const maxLines = editor.document.lineCount;
        const line = Number.parseInt(lineAsString) - 1;
        if (line < 0 || line >= maxLines) return;

        const lineRange = editor.document.lineAt(line).range;
        await editor.edit((builder) => {
            builder.replace(lineRange, messageParser.parse(rest.join(' ')));
        });
    } catch {}
};