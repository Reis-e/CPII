var role = localStorage.getItem("role");
switch (role) {
  case "admin":
    document.getElementById("accordionSidebar").innerHTML = `
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../pages/dashboard.html">
            <img class="img_logo" src="../assets/img/logo_batis.png">
            <div class="sidebar-brand-text">eProseso</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item" id="dashboard">
            <a class="nav-link" href="../pages/dashboard.html">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span></a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">

        <!-- Heading -->
        <!-- <div class="sidebar-heading">
            Admin
        </div> -->

        <li class="nav-item" id="profile">
            <a class="nav-link" href="../pages/profile.html">
                <i class="fas fa-fw fa-user"></i>
                <span>Profile</span></a>
        </li>

        <li class="nav-item" id="announcements">
            <a class="nav-link" href="../pages/announcements.html">
                <i class="fas fa-fw fa-bullhorn"></i>
                <span>Announcements</span></a>
        </li>

        <li class="nav-item" id="users">
            <a class="nav-link" href="../pages/users.html">
                <i class="fas fa-fw fa-users"></i>
                <span>Users</span></a>
        </li>

        <li class="nav-item" id="transactions">
            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                aria-expanded="true" aria-controls="collapseUtilities">
                <i class="fas fa-fw fa-file"></i>
                <span>Transactions</span>
            </a>
            <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar">
                <div class="bg-white py-2 collapse-inner rounded">
                    <h6 class="collapse-header">Requests:</h6>
                    <a class="collapse-item" id="active" href="../pages/active-transactions.html">Active</a>
                    <a class="collapse-item" id="submitted" href="../pages/submitted-transactions.html">Submitted</a>
                    <a class="collapse-item" id="onprocess" href="../pages/onprocess-transactions.html">On Process</a>
                    <a class="collapse-item" id="completed" href="../pages/completed-transactions.html">Completed</a>
                    <a class="collapse-item" id="denied" href="../pages/denied-transactions.html">Denied</a>
                </div>
            </div>
        </li>

        <li class="nav-item" id="chat">
            <a class="nav-link" href="../pages/chat.html">
                <i class="fas fa-fw fa-comment-alt"></i>
                <span>Chat Support</span></a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider">


        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
            <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
    `;
    break;
  case "user":
    document.getElementById("accordionSidebar").innerHTML = `
                        <!-- Sidebar - Brand -->
                        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../pages/dashboard.html">
                            <img class="img_logo" src="../assets/img/logo_batis.png">
                            <div class="sidebar-brand-text">eProseso</div>
                        </a>
    
                        <!-- Divider -->
                        <hr class="sidebar-divider my-0">
    
                        <!-- Nav Item - Dashboard -->
                        <li class="nav-item" id="dashboard">
                            <a class="nav-link" href="../pages/dashboard.html">
                                <i class="fas fa-fw fa-tachometer-alt"></i>
                                <span>Dashboard</span></a>
                        </li>
    
                        <!-- Divider -->
                        <hr class="sidebar-divider">
    
                        <!-- Heading -->
                        <!-- <div class="sidebar-heading">
                            Admin
                        </div> -->
    
                        <li class="nav-item" id="profile">
                            <a class="nav-link" href="../pages/profile.html">
                                <i class="fas fa-fw fa-user"></i>
                                <span>Profile</span></a>
                        </li>

                        <li class="nav-item" id="request">
                            <a class="nav-link" href="../pages/requests.html">
                                <i class="fas fa-fw fa-cog"></i>
                                <span>Request</span></a>
                        </li>
    
                        <li class="nav-item" id="transactions">
                            <a class="nav-link" href="../pages/transactions.html">
                                <i class="fas fa-fw fa-file"></i>
                                <span>Transactions</span></a>
                        </li>
    
                        <li class="nav-item" id="chat">
                            <a class="nav-link" href="../pages/chat.html">
                                <i class="fas fa-fw fa-comment-alt"></i>
                                <span>Chat Support</span></a>
                        </li>
    
                        <!-- Divider -->
                        <hr class="sidebar-divider">
    
    
                        <!-- Sidebar Toggler (Sidebar) -->
                        <div class="text-center d-none d-md-inline">
                            <button class="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>
                    `;
    break;
  case "staff":
    document.getElementById("accordionSidebar").innerHTML = `
            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../pages/dashboard.html">
                <img class="img_logo" src="../assets/img/logo_batis.png">
                <div class="sidebar-brand-text">eProseso</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item" id="dashboard">
                <a class="nav-link" href="../pages/dashboard.html">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <!-- <div class="sidebar-heading">
                Admin
            </div> -->

            <li class="nav-item" id="profile">
                <a class="nav-link" href="../pages/profile.html">
                    <i class="fas fa-fw fa-user"></i>
                    <span>Profile</span></a>
            </li>

            <li class="nav-item" id="announcements">
                <a class="nav-link" href="../pages/announcements.html">
                    <i class="fas fa-fw fa-bullhorn"></i>
                    <span>Announcements</span></a>
            </li>

            <li class="nav-item" id="users">
                <a class="nav-link" href="../pages/users.html">
                    <i class="fas fa-fw fa-users"></i>
                    <span>Users</span></a>
            </li>

            <li class="nav-item" id="transactions">
                <a class="nav-link" href="../pages/transactions.html">
                    <i class="fas fa-fw fa-file"></i>
                    <span>Transactions</span></a>
            </li>

            <li class="nav-item" id="chat">
                <a class="nav-link" href="../pages/chat.html">
                    <i class="fas fa-fw fa-comment-alt"></i>
                    <span>Chat Support</span></a>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider">


            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>
        `;
    break;
}

var sidenav = window.location.toString();
var dashboard = document.getElementById("dashboard");
var profile = document.getElementById("profile");
var users = document.getElementById("users");
var announcements = document.getElementById("announcements");
var request = document.getElementById("request");
var transactions = document.getElementById("transactions");
var chat = document.getElementById("chat");
var role = localStorage.getItem("role")
var active = document.getElementById("active");
var submitted = document.getElementById("submitted");
var onprocess = document.getElementById("onprocess");
var completed = document.getElementById("completed");
var denied = document.getElementById("denied");

if (sidenav.includes("dashboard")) {
  dashboard.classList.add("active");
  profile.classList.remove("active");
  transactions.classList.remove("active");
  chat.classList.remove("active");
  if (role === "admin" || role === "staff"){
      users.classList.remove("active");
      announcements.classList.remove("active");
  }
  if (role === "user"){
      request.classList.remove("active");
  }
} else if (sidenav.includes("profile")) {
  dashboard.classList.remove("active");
  profile.classList.add("active");
  transactions.classList.remove("active");
  chat.classList.remove("active");
  if (role === "admin" || role === "staff"){
    users.classList.remove("active");
    announcements.classList.remove("active");
  }
  if (role === "user"){
    request.classList.remove("active");
  }
} else if (sidenav.includes("users")) {
  dashboard.classList.remove("active");
  profile.classList.remove("active");
  transactions.classList.remove("active");
  chat.classList.remove("active");
  if (role === "admin" || role === "staff"){
    users.classList.add("active");
    announcements.classList.remove("active");
  }
  if (role === "user"){
    request.classList.remove("active");
  }
} else if (sidenav.includes("announcements")) {
  dashboard.classList.remove("active");
  profile.classList.remove("active");
  transactions.classList.remove("active");
  chat.classList.remove("active");
  if (role === "admin" || role === "staff"){
    users.classList.remove("active");
    announcements.classList.add("active");
  }
  if (role === "user"){
    request.classList.remove("active");
  }
} else if (sidenav.includes("request")) {
  dashboard.classList.remove("active");
  profile.classList.remove("active");
  transactions.classList.remove("active");
  chat.classList.remove("active");
  if (role === "admin" || role === "staff"){
    users.classList.remove("active");
    announcements.classList.remove("active");
  }
  if (role === "user"){
    request.classList.add("active");
  }
} else if (sidenav.includes("transactions")) {
  dashboard.classList.remove("active");
  profile.classList.remove("active");
  transactions.classList.add("active");
  chat.classList.remove("active");
  if (role === "admin" || role === "staff"){
    users.classList.remove("active");
    announcements.classList.remove("active");

    if (sidenav.includes("active")){
      active.classList.add("active");
      submitted.classList.remove("active");
      onprocess.classList.remove("active");
      completed.classList.remove("active");
      denied.classList.remove("active");
    } else if (sidenav.includes("submitted")){
      active.classList.remove("active");
      submitted.classList.add("active");
      onprocess.classList.remove("active");
      completed.classList.remove("active");
      denied.classList.remove("active");
    } else if (sidenav.includes("onprocess")){
      active.classList.remove("active");
      submitted.classList.remove("active");
      onprocess.classList.add("active");
      completed.classList.remove("active");
      denied.classList.remove("active");
    } else if (sidenav.includes("completed")){
      active.classList.remove("active");
      submitted.classList.remove("active");
      onprocess.classList.remove("active");
      completed.classList.add("active");
      denied.classList.remove("active");
    } else if (sidenav.includes("denied")){
      active.classList.remove("active");
      submitted.classList.remove("active");
      onprocess.classList.remove("active");
      completed.classList.remove("active");
      denied.classList.add("active");
    }
  }
  if (role === "user"){
    request.classList.remove("active");
  }
} else {
  dashboard.classList.remove("active");
  profile.classList.remove("active");
  transactions.classList.remove("active");
  chat.classList.add("active");
  if (role === "admin" || role === "staff"){
    users.classList.remove("active");
    announcements.classList.remove("active");
  }
  if (role === "user"){
    request.classList.remove("active");
  }
}
