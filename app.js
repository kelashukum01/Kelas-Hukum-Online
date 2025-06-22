const rssURL = 'https://kelashukumonline.blogspot.com/feeds/posts/default?alt=rss';
const proxyURL = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rssURL);

fetch(proxyURL)
    .then(response => {
        if (!response.ok) throw new Error('Gagal mengambil data RSS');
        return response.text();
    })
    .then(str => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');

        let output = "";
        for (let i = 0; i < Math.min(5, items.length); i++) {
            const title = items[i].getElementsByTagName('title')[0].textContent;
            const link = items[i].getElementsByTagName('link')[0].textContent;
            const pubDate = items[i].getElementsByTagName('pubDate')[0].textContent;

            output += `
                <div class="post">
                    <h2><a href="${link}" target="_blank">${title}</a></h2>
                    <small>Dipublikasikan: ${new Date(pubDate).toLocaleDateString("id-ID")}</small>
                </div>
            `;
        }

        document.getElementById("content").innerHTML = output;
    })
    .catch(error => {
        console.error('Error fetching RSS:', error);
        document.getElementById("content").innerHTML = "<p>Gagal memuat artikel. Silakan coba lagi nanti.</p>";
    });
