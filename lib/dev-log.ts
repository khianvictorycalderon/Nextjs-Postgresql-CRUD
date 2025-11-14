const dev = {
    log: (message: string) => {
        if (process.env.NODE_ENV === "development") {
            console.log(message);
        }
    }
}

export default dev;

// Usage:
/*

    dev.log("Hello World");
    // This will only print for development environment only!

*/