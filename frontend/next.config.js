/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    rewrites: async () => {
        return [
            {
                source: "/chat",
                destination: "/chatbox/chat.html",
            },
            {
                source: "/messages",
                destination: "/messages/messages.html",
            },
        ];
    },
};

module.exports = nextConfig;
