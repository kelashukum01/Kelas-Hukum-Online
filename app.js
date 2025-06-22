function showMessage() {
    alert("Hello, welcome to Kelas Hukum Online!");
}
// Mengambil artikel dari RSS feed Blogspot menggunakan Fetch API
fetch('https://kelashukumonline.blogspot.com/feeds/posts/default?alt=rss')
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const items = xmlDoc.getElementsByTagName('item'); // Mengambil setiap artikel
        let output = "";
        for (let i = 0; i < items.length; i++) {
            const title = items[i].getElementsByTagName('title')[0].textContent; // Judul artikel
            const link = items[i].getElementsByTagName('link')[0].textContent;   // Link ke artikel
            output += `<div><h2><a href="${link}" target="_blank">${title}</a></h2></div>`;
        }
        // Menampilkan artikel di dalam div dengan id 'content'
        document.getElementById("content").innerHTML = output;
    })
    .catch(error => console.log('Error fetching RSS:', error)); // Menangani error