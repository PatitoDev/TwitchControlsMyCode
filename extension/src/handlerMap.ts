import { onDeleteLine } from "./handlers/onDeleteLineHandler";
import { onMinifyHandler } from "./handlers/onMinifyHandler";
import { onMoveToLine } from "./handlers/onMoveToLine";
import { onNewLineHandler } from "./handlers/onNewLineHandler";
import { onQuackHandler } from "./handlers/onQuackHandler";
import { onReplaceHandler } from "./handlers/onReplaceHandler";
import { onReplaceLineHandler } from "./handlers/onReplaceLineHandler";
import { onWriteHandler } from "./handlers/onWriteHandler";
import { Commands } from "./TwitchClient/commands";

const handlerMap: Record<Commands, (content: string) => Promise<void>> = {
    'write' : onWriteHandler,
    'replaceall': onReplaceHandler,
    'replaceline': onReplaceLineHandler,
    'minify': onMinifyHandler,
    'moveto': onMoveToLine,
    'newline': onNewLineHandler,
    'deleteline': onDeleteLine,
    'quack': onQuackHandler,
};

export default handlerMap;