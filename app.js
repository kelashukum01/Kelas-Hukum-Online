const apiURL = "https://api.rss2json.com/v1/api.json?rss_url=https://kelashukumonline.blogspot.com/feeds/posts/default";

fetch(apiURL)
  .then(response => response.json())
  .then(data => {
    if (data.status !== "ok") throw new Error("Gagal memuat RSS: " + data.message);

    let output = "";
    data.items.slice(0, 5).forEach(item => {
      output += `
        <div class="post">
          <h2><a href="${item.link}" target="_blank">${item.title}</a></h2>
          <small>Diterbitkan: ${new Date(item.pubDate).toLocaleDateString("id-ID")}</small>
        </div>
      `;
    });

    document.getElementById("content").innerHTML = output;
  })
  .catch(error => {
    console.error("RSS ERROR:", error);
    document.getElementById("content").innerHTML = `<p><strong>ERROR:</strong> ${error.message}</p>`;
  });
