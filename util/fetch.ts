// Exports
/** Fetches and returns text from an url. */
export async function text(url: URL | string): Promise<string> {
    // Fetches response
    const response = await fetch(url, {
        headers: {
            "Accept": "text/plain"
        }
    });

    // Returns text
    return await response.text();
}
