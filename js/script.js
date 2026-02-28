// Open external links in new tab automatically
document.querySelectorAll("a").forEach(link => {
  if (link.hostname !== window.location.hostname) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
});