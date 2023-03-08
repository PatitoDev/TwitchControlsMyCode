import * as vscode from 'vscode';

export const onMoveToLine = async (content: string) => {
    const args = content.split(' ');
    if (args.length < 2) return;
    try {
        const targetLine = Number.parseInt(args[0]);
        const targetCharacter = Number.parseInt(args[1]);
        
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
    
        const { line: currentLine, character: currentCharacter} = editor.selection.start;
        const diff = targetLine - (currentLine + 1);
        if (diff !== 0) {
            await vscode.commands.executeCommand('cursorMove', {
                to: diff > 0 ? 'down' : 'up',
                by: 'line',
                value: Math.abs(diff),
            });
        }

        await vscode.commands.executeCommand('cursorMove', {
            to: 'wrappedLineStart',
            by: 'line',
        });

        if (targetCharacter > 1){
            await vscode.commands.executeCommand('cursorMove', {
                to: 'right',
                by: 'character',
                value: targetCharacter - 1,
            });
        }
    } catch { }
};