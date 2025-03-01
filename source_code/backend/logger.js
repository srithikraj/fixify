const log = (...messages) => console.log("[BACKEND]  ", ...messages);
const error = (...messages) => console.error("[BACKEND]  ", ...messages);
const warn = (...messages) => console.warn("[BACKEND]  ", ...messages);

module.exports = { log, error, warn };