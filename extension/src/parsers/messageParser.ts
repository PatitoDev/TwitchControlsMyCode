const messageParser = {
    parse: (msg: string) => (
        msg
        .replace(/\\n/gm, '\n')
        .replace(/\\t/gm, '\t')
    )
};