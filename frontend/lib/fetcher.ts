import { RequestInit } from "next/dist/server/web/spec-extension/request";

export const fetcher = (url: string, method?: string, body?: object) => {
    if (body === undefined) {
        return fetch(url).then((res) => res.json());
    }
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};