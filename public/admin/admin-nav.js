try {
    document.getElementById("sidebar-wrapper").innerHTML = `
    <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i class="fas fa-user-secret me-2"></i>eProseso</div>
            <div class="list-group list-group-flush my-3">
                <a href="dashboard.html" class="list-group-item list-group-item-action bg-transparent second-text active"><i
                        class="fas fa-tachometer-alt me-2"></i>Dashboard</a>
                <a href="profile.html" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-project-diagram me-2"></i>Profile</a>
                <a href="announcements.html" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-chart-line me-2"></i>Announcements</a>
                <a href="users.html" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-paperclip me-2"></i>Users</a>
                <a href="transactions.html" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-shopping-cart me-2"></i>Transactions</a>
                <a href="chat.html" class="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                        class="fas fa-comment-dots me-2"></i>Chat</a>
                <a href="../index.html" class="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                class="fas fa-power-off me-2"></i>Logout</a>
            </div>`;
} catch (error) {
    
}