import { db } from "../firebaseConfig/firebaseConfig.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    var userdata = await getDoc(doc(db, "users", user.uid));
    var role = userdata.data().role;

    switch (role) {
      case "admin":
        document.getElementById("sidebar").innerHTML = `
                    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    
                        <!-- Sidebar - Brand -->
                        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../pages/dashboard.html">
                            <div class="sidebar-brand-text mx-3">eProseso</div>
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
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-bullhorn"></i>
                                <span>Announcements</span></a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-users"></i>
                                <span>Users</span></a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-cog"></i>
                                <span>Request</span></a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-file"></i>
                                <span>Transactions</span></a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-comments"></i>
                                <span>Chat</span></a>
                        </li>
    
                        <!-- Divider -->
                        <hr class="sidebar-divider">
    
    
                        <!-- Sidebar Toggler (Sidebar) -->
                        <div class="text-center d-none d-md-inline">
                            <button class="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>
    
                    </ul>
                    <script src="../assets/js/sb-admin-2.min.js"></script>
                    `;
        break;
      case "user":
        document.getElementById("sidebar").innerHTML = `
                    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    
                        <!-- Sidebar - Brand -->
                        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../pages/dashboard.html">
                            <div class="sidebar-brand-text mx-3">eProseso</div>
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
    
                        <!-- Divider -->
                        <hr class="sidebar-divider">
    
    
                        <!-- Sidebar Toggler (Sidebar) -->
                        <div class="text-center d-none d-md-inline">
                            <button class="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>
    
                    </ul>
                    <script src="../assets/js/sb-admin-2.min.js"></script>
                    `;
        break;
      case "staff":
        document.getElementById("sidebar").innerHTML = `
                    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
    
                        <!-- Sidebar - Brand -->
                        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="../pages/dashboard.html">
                            <div class="sidebar-brand-text mx-3">eProseso</div>
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
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-bullhorn"></i>
                                <span>Announcements</span></a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-cog"></i>
                                <span>Request</span></a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-file"></i>
                                <span>Transactions</span></a>
                        </li>
    
                        <li class="nav-item">
                            <a class="nav-link" href="charts.html">
                                <i class="fas fa-fw fa-comments"></i>
                                <span>Chat</span></a>
                        </li>
    
                        <!-- Divider -->
                        <hr class="sidebar-divider">
    
    
                        <!-- Sidebar Toggler (Sidebar) -->
                        <div class="text-center d-none d-md-inline">
                            <button class="rounded-circle border-0" id="sidebarToggle"></button>
                        </div>
    
                    </ul>
                    <script src="../assets/js/sb-admin-2.min.js"></script>
                    `;
        break;
    }

    if (window.location.toString().includes("dashboard")) {
      var dashboard = document.getElementById("dashboard");
      var profile = document.getElementById("profile");
      dashboard.classList.add("active");
      profile.classList.remove("active");
    } else if (window.location.toString().includes("profile")) {
      var dashboard = document.getElementById("dashboard");
      var profile = document.getElementById("profile");
      profile.classList.add("active");
      dashboard.classList.remove("active");
    }
  }
});
