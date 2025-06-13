type WikipediaImageResponse = {
    query?: {
        pages: {
            [key: string]: {
                original?: {
                    source: string;
                    width: number;
                    height: number;
                };
            };
        };
    };
};

export async function getWikipediaImage(city: string): Promise<string | null> {
    try {
        const res = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(city)}&origin=*`
        );

        const data: WikipediaImageResponse = await res.json();

        const pages = data.query?.pages;

        if (pages) {
            const firstPage = Object.values(pages)[0];
            return firstPage?.original?.source ?? null;
        }

        return null;
    } catch {
        return null;
    }
}
