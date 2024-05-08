// Function to create and display the Social App icon on the desktop
function setupSocialAppIcon(desk) {
    const icon = document.createElement('div');
    icon.style.width = '64px';  // Icon width
    icon.style.height = '64px';  // Icon height
    icon.style.backgroundImage = 'url("path/to/social_app_icon.png")';  // Path to icon image
    icon.style.backgroundSize = 'cover';
    icon.style.position = 'absolute';
    icon.style.top = '100px';  // Adjust position as needed
    icon.style.left = '100px';  // Adjust position as needed
    icon.style.cursor = 'pointer';
    icon.title = 'Social App';  // Tooltip on hover

    // Event listener to launch the Social App window
    icon.addEventListener('click', () => {
        Desk.openApp(app);  // Make sure Desk.openApp is the correct method to open applications
    });

    // Append the icon to the desktop environment
    desk.appendChild(icon);
}

// Define the Social App's functionality within a window
export const app = function(Win, Desk) {
    // Setting the content of the main window to social media links
    Win.main.innerHTML = `
        <div style="text-align: center; padding: 20px; background-color: #fff; color: #333;">
            <h1>Connect with us!</h1>
            <p><a href="https://facebook.com" target="_blank">Facebook</a></p>
            <p><a href="https://twitter.com" target="_blank">Twitter</a></p>
            <p><a href="https://instagram.com" target="_blank">Instagram</a></p>
        </div>
    `;
    // Additional styles if needed
    Win.main.style.backgroundColor = '#fff';
    Win.main.style.color = '#333';
    Win.main.style.padding = '20px';
    Win.main.style.textAlign = 'center';
};

// Ensure this function is called when the desktop environment is ready
document.addEventListener('DOMContentLoaded', () => {
    const desk = document.getElementById('desktop');  // Make sure 'desk' is the ID of your desktop container
    console.log(desk);
    if (desk) {
        setupSocialAppIcon(desk);
    } else {
        console.error('Desk container not found');
    }
});
