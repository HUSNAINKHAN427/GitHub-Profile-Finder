async function getUser() {
    const username = document.querySelector('#username').value;
    const profile = document.querySelector('#profile');

    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    profile.innerHTML = "Loading...";
    profile.classList.remove("hidden");

    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res) {
            profile.innerHTML = "<p>User not found ❌</p>";
            return;
        }

        const user = await res.json();

        profile.innerHTML = `
          <h2>${user.name || user.login}</h2>
          <img src="${user.avatar_url}" alt="Avatar">
          <p><strong>Bio:</strong> ${user.bio || "No bio available"}</p>
          <p><strong>Location:</strong> ${user.location || "Unknown"}</p>
          <p><strong>Public Repos:</strong> ${user.public_repos}</p>
          <a href="${user.html_url}" target="_blank">Visit GitHub Profile</a>
        `;
    } catch (error) {
        profile.innerHTML = `<p>Something went wrong 😢${error}</p>`;
        console.error(error);
    }
}
