import * as vscode from 'vscode';

export const onMinifyHandler = async (_: string) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    await editor.edit((builder) => {
        const maxLines = editor.document.lineCount;
        for (let i = 0; i < maxLines; i++) {
            const line = editor.document.lineAt(i);
            const replaceWith = line.text.replace(/\s*/g, '');
            builder.replace(line.rangeIncludingLineBreak, replaceWith);
        }
    });   
};