import * as vscode from 'vscode';

export const onDeleteLine = async (content: string) => {
    const args = content.split(' ');

    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    let targetLine = editor?.selection.start.line;
    if (args.length > 0) {
        try {
            const line = Number.parseInt(args[0]) - 1;
            const maxLine = editor.document.lineCount;
            if (line < 0 || line > maxLine) {
                throw new Error();
            }
            targetLine = line;
        } catch { 
            return; 
        }
    }

    if (typeof targetLine !== 'number') return;

    await editor.edit((builder) => {
        const lineToRemove = editor.document.lineAt(targetLine);
        builder.delete(lineToRemove.rangeIncludingLineBreak);
    });
};