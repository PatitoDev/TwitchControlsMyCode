import * as vscode from 'vscode';
import { ascii } from '../ascii';

export const onQuackHandler = async (_: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const currentPosition = editor.selection.start;
    if (!currentPosition) return;

    await editor.edit((builder) => {
        builder.insert(currentPosition, ascii.duckAscii);
    });
};