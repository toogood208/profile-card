const profileTime = document.querySelector('[data-testid="test-user-time"]');
const avatarImage = document.querySelector('[data-testid="test-user-avatar"]');
const avatarUrlInput = document.getElementById("avatar-url-input");
const applyAvatarUrlButton = document.getElementById("apply-avatar-url-btn");
const avatarFileInput = document.getElementById("avatar-file-input");

function updateEpochTime() {
  const now = Date.now();
  profileTime.textContent = String(now);
  profileTime.setAttribute("datetime", new Date(now).toISOString());
}

function normalizeAvatarSource(source) {
  if (!source) {
    return "";
  }

  try {
    const url = new URL(source);

    if (url.hostname === "unsplash.com") {
      const pathSegments = url.pathname.split("/").filter(Boolean);

      if (pathSegments[0] === "photos" && pathSegments[1]) {
        return "https://unsplash.com/photos/" + pathSegments[1] + "/download?force=true&w=640&q=80";
      }
    }

    return url.toString();
  } catch {
    return source;
  }
}

function applyAvatarSource(source) {
  if (!source || !avatarImage) {
    return;
  }

  avatarImage.src = normalizeAvatarSource(source);
}

if (applyAvatarUrlButton && avatarUrlInput) {
  applyAvatarUrlButton.addEventListener("click", function () {
    applyAvatarSource(avatarUrlInput.value.trim());
  });

  avatarUrlInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      applyAvatarSource(avatarUrlInput.value.trim());
    }
  });
}

if (avatarFileInput) {
  avatarFileInput.addEventListener("change", function () {
    const [file] = avatarFileInput.files;

    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    applyAvatarSource(objectUrl);
  });
}

updateEpochTime();
setInterval(updateEpochTime, 1000);