import * as vscode from 'vscode';

export const onNewLineHandler = async (_: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const position = editor.selection;
    if (!position) return;
    await editor.edit(builder => {
        builder.insert(position.start,'\n');
    });
};