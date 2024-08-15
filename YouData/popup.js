// Replace with your own YouTube Data API key
const apiKey = 'AIzaSyCpZxp80I3rEPdDu6FSv5MMfAwWyXcjc_c';

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = new URL(tabs[0].url);
        let videoId = url.searchParams.get("v");

        if (videoId) {
            fetchVideoData(videoId);
        } else {
            document.getElementById('videoData').innerText = "No YouTube video found on this page.";
        }
    });
});

function fetchVideoData(videoId) {
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,statistics,contentDetails`)
        .then(response => response.json())
        .then(data => {
            if (data.items.length > 0) {
                const video = data.items[0];
                displayVideoData(video);
            } else {
                document.getElementById('videoData').innerText = "Video data could not be retrieved.";
            }
        })
        .catch(error => {
            console.error('Error fetching video data:', error);
            document.getElementById('videoData').innerText = "An error occurred while fetching video data.";
        });
}

function displayVideoData(video) {
    const videoData = document.getElementById('videoData');
    videoData.innerHTML = `
        <h2>Video Information</h2>
        <p><strong>Title:</strong> ${video.snippet.title}</p>
        <p><strong>Views:</strong> ${video.statistics.viewCount}</p>
        <p><strong>Likes:</strong> ${video.statistics.likeCount}</p>
        <p><strong>Comments:</strong> ${video.statistics.commentCount}</p>
        <p><strong>Upload Date:</strong> ${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
        <p><strong>Duration:</strong> ${video.contentDetails.duration}</p>
        
        <!-- Unavailable or custom data -->
        <!-- <p><strong>Dislikes:</strong> ${video.statistics.dislikeCount || 'Not available'}</p> -->
        <!-- <p><strong>Shares:</strong> Not available</p> -->
        <!-- <p><strong>Reports:</strong> N/A</p> -->
        <!-- <p><strong>Top Report Type:</strong> N/A</p> -->

        <!-- <h3>Description:</h3>  -->
        <!-- <p class="description">${video.snippet.description}</p> -->
    `;
}