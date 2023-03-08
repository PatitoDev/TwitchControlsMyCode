import * as vscode from 'vscode';

export const onWriteHandler = async (content: string) => {
    const editor = vscode.window.activeTextEditor;

    if (!editor) return;

    const selection = editor.selection.active;
    editor.edit((buffer) => {
        const contentParsed = messageParser.parse(content);
        buffer.insert(selection, contentParsed);
    });
};