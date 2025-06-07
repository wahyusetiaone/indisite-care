"use client";
import React, {useEffect, useState} from "react";
import {Icon} from "@iconify/react/dist/iconify.js";
import {usePathname} from "next/navigation";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import Link from "next/link";
import {AuthProvider} from "../../contexts/AuthContext";
import { useAuth } from "@/modules/auth/hook/useAuth";

const MasterLayout = ({children}) => {
    let pathname = usePathname();
    let [sidebarActive, seSidebarActive] = useState(false);
    let [mobileMenu, setMobileMenu] = useState(false);
    const location = usePathname(); // Hook to get the current route
    const { logoutUser } = useAuth();
    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleDropdownClick = (event) => {
            event.preventDefault();
            const clickedLink = event.currentTarget;
            const clickedDropdown = clickedLink.closest(".dropdown");

            if (!clickedDropdown) return;

            const isActive = clickedDropdown.classList.contains("open");

            // Close all dropdowns
            const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
            allDropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
                const submenu = dropdown.querySelector(".sidebar-submenu");
                if (submenu) {
                    submenu.style.maxHeight = "0px"; // Collapse submenu
                }
            });

            // Toggle the clicked dropdown
            if (!isActive) {
                clickedDropdown.classList.add("open");
                const submenu = clickedDropdown.querySelector(".sidebar-submenu");
                if (submenu) {
                    submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
                }
            }
        };

        // Attach click event listeners to all dropdown triggers
        const dropdownTriggers = document.querySelectorAll(
            ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
        );

        dropdownTriggers.forEach((trigger) => {
            trigger.addEventListener("click", handleDropdownClick);
        });

        const openActiveDropdown = () => {
            const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
            allDropdowns.forEach((dropdown) => {
                const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
                submenuLinks.forEach((link) => {
                    if (
                        link.getAttribute("href") === location ||
                        link.getAttribute("to") === location
                    ) {
                        dropdown.classList.add("open");
                        const submenu = dropdown.querySelector(".sidebar-submenu");
                        if (submenu) {
                            submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
                        }
                    }
                });
            });
        };

        // Open the submenu that contains the active route
        openActiveDropdown();

        // Cleanup event listeners on unmount
        return () => {
            dropdownTriggers.forEach((trigger) => {
                trigger.removeEventListener("click", handleDropdownClick);
            });
        };
    }, [location.pathname]); 

    const handleLogout = () => {
        logoutUser(); // hapus token/cookies
    };

    let sidebarControl = () => {
        seSidebarActive(!sidebarActive);
    };

    let mobileMenuControl = () => {
        setMobileMenu(!mobileMenu);
    };

    return (
        <AuthProvider>
            <section className={mobileMenu ? "overlay active" : "overlay "}>
                {/* sidebar */}
                <aside
                    className={
                        sidebarActive
                            ? "sidebar active "
                            : mobileMenu
                                ? "sidebar sidebar-open"
                                : "sidebar"
                    }
                >
                    <button
                        onClick={mobileMenuControl}
                        type='button'
                        className='sidebar-close-btn'
                    >
                        <Icon icon='radix-icons:cross-2'/>
                    </button>
                    <div>
                        <Link href='/' className='sidebar-logo'>
                            <img
                                src='/assets/images/logo.png'
                                alt='site logo'
                                className='light-logo'
                            />
                            <img
                                src='/assets/images/logo-light.png'
                                alt='site logo'
                                className='dark-logo'
                            />
                            <img
                                src='/assets/images/logo-icon.png'
                                alt='site logo'
                                className='logo-icon'
                            />
                        </Link>
                    </div>
                    <div className='sidebar-menu-area'>
                        <ul className='sidebar-menu' id='sidebar-menu'>
                            <li>
                                <Link
                                    href='/'
                                    className={pathname === "/" ? "active-page" : ""}
                                >
                                    <Icon icon='solar:home-smile-angle-outline' className='menu-icon'/>
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            {/*Master Data*/}
                            <li className='sidebar-menu-group-title'>Master Data</li>
                            <li>
                                <Link
                                    href='/page/master-data/branch-types'
                                    className={pathname === "/page/master-data/branch-types" ? "active-page" : ""}
                                >
                                    <Icon icon='carbon:batch-job' className='menu-icon'/>
                                    <span>Branch Types</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/page/master-data/roles'
                                    className={pathname === "/page/master-data/roles" ? "active-page" : ""}
                                >
                                    <Icon icon='carbon:share-knowledge' className='menu-icon'/>
                                    <span>Roles</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/page/master-data/features'
                                    className={pathname === "/page/master-data/features" ? "active-page" : ""}
                                >
                                    <Icon icon='carbon:data-unreal' className='menu-icon'/>
                                    <span>Features</span>
                                </Link>
                            </li>
                            {/*End Master Data*/}

                            {/*Core*/}
                            <li className='sidebar-menu-group-title'>Core</li>
                            <li>
                                <Link
                                    href='/page/core/organizations'
                                    className={pathname === "/page/core/organizations" ? "active-page" : ""}
                                >
                                    <Icon icon='carbon:building' className='menu-icon'/>
                                    <span>Organisasi</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/page/core/branchs'
                                    className={pathname === "/page/core/branchs" ? "active-page" : ""}
                                >
                                    <Icon icon='carbon:store' className='menu-icon'/>
                                    <span>Branch</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/page/core/accounts'
                                    className={pathname === "/page/core/accounts" ? "active-page" : ""}
                                >
                                    <Icon icon='carbon:group-security' className='menu-icon'/>
                                    <span>Akun</span>
                                </Link>
                            </li>
                            {/*End Core*/}

                            {/*Clinic*/}
                            <li className='sidebar-menu-group-title'>Clinic</li>
                            <li>
                                <Link href='/page/clinic/doctors' className={pathname === "/page/clinic/doctors" ? "active-page" : ""}>
                                    <Icon icon='mdi:doctor' className='menu-icon'/>
                                    <span>Doctors</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/clinic/patients' className={pathname === "/page/clinic/patients" ? "active-page" : ""}>
                                    <Icon icon='mdi:account-group' className='menu-icon'/>
                                    <span>Patients</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/clinic/patientvisits' className={pathname === "/page/clinic/patientvisits" ? "active-page" : ""}>
                                    <Icon icon='mdi:clipboard-list-outline' className='menu-icon'/>
                                    <span>Patient Visits</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/clinic/polyclinics' className={pathname === "/page/clinic/polyclinics" ? "active-page" : ""}>
                                    <Icon icon='mdi:hospital-building' className='menu-icon'/>
                                    <span>Polyclinics</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/clinic/schedules' className={pathname === "/page/clinic/schedules" ? "active-page" : ""}>
                                    <Icon icon='mdi:calendar-clock' className='menu-icon'/>
                                    <span>Schedules</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/clinic/treatments' className={pathname === "/page/clinic/treatments" ? "active-page" : ""}>
                                    <Icon icon='mdi:medical-bag' className='menu-icon'/>
                                    <span>Treatment</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/clinic/visittypes' className={pathname === "/page/clinic/visittypes" ? "active-page" : ""}>
                                    <Icon icon='mdi:account-arrow-right' className='menu-icon'/>
                                    <span>Visit Types</span>
                                </Link>
                            </li>
                            <li>
                                <Link href='/page/clinic/insurances' className={pathname === "/page/clinic/insurances" ? "active-page" : ""}>
                                    <Icon icon='mdi:shield-check' className='menu-icon'/>
                                    <span>Insurances</span>
                                </Link>
                            </li>
                            {/*End Clinic*/}

                            <li className='sidebar-menu-group-title'>Application</li>
                            <li>
                                <Link
                                    href='/email'
                                    className={pathname === "/email" ? "active-page" : ""}
                                >
                                    <Icon icon='mage:email' className='menu-icon'/>
                                    <span>Email</span>
                                </Link>
                            </li>
                            {/*End Core*/}

                            {/* Settings Dropdown */}
                            <li className='dropdown'>
                                <Link href='#'>
                                    <Icon
                                        icon='icon-park-outline:setting-two'
                                        className='menu-icon'
                                    />
                                    <span>Settings</span>
                                </Link>
                                <ul className='sidebar-submenu'>
                                    <li>
                                        <Link
                                            href='/company'
                                            className={pathname === "/company" ? "active-page" : ""}
                                        >
                                            <i className='ri-circle-fill circle-icon text-primary-600 w-auto'/>{" "}
                                            Company
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/notification'
                                            className={
                                                pathname === "/notification" ? "active-page" : ""
                                            }
                                        >
                                            <i className='ri-circle-fill circle-icon text-warning-main w-auto'/>{" "}
                                            Notification
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/notification-alert'
                                            className={
                                                pathname === "/notification-alert" ? "active-page" : ""
                                            }
                                        >
                                            <i className='ri-circle-fill circle-icon text-info-main w-auto'/>{" "}
                                            Notification Alert
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/theme'
                                            className={pathname === "/theme" ? "active-page" : ""}
                                        >
                                            <i className='ri-circle-fill circle-icon text-danger-main w-auto'/>{" "}
                                            Theme
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/currencies'
                                            className={pathname === "/currencies" ? "active-page" : ""}
                                        >
                                            <i className='ri-circle-fill circle-icon text-danger-main w-auto'/>{" "}
                                            Currencies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/language'
                                            className={pathname === "/language" ? "active-page" : ""}
                                        >
                                            <i className='ri-circle-fill circle-icon text-danger-main w-auto'/>{" "}
                                            Languages
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href='/payment-gateway'
                                            className={
                                                pathname === "/payment-gateway" ? "active-page" : ""
                                            }
                                        >
                                            <i className='ri-circle-fill circle-icon text-danger-main w-auto'/>{" "}
                                            Payment Gateway
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </aside>

                <main
                    className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
                >
                    <div className='navbar-header'>
                        <div className='row align-items-center justify-content-between'>
                            <div className='col-auto'>
                                <div className='d-flex flex-wrap align-items-center gap-4'>
                                    <button
                                        type='button'
                                        className='sidebar-toggle'
                                        onClick={sidebarControl}
                                    >
                                        {sidebarActive ? (
                                            <Icon
                                                icon='iconoir:arrow-right'
                                                className='icon text-2xl non-active'
                                            />
                                        ) : (
                                            <Icon
                                                icon='heroicons:bars-3-solid'
                                                className='icon text-2xl non-active '
                                            />
                                        )}
                                    </button>
                                    <button
                                        onClick={mobileMenuControl}
                                        type='button'
                                        className='sidebar-mobile-toggle'
                                    >
                                        <Icon icon='heroicons:bars-3-solid' className='icon'/>
                                    </button>
                                </div>
                            </div>
                            <div className='col-auto'>
                                <div className='d-flex flex-wrap align-items-center gap-3'>
                                    {/* ThemeToggleButton */}
                                    <ThemeToggleButton/>
                                    <button
                                        className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                                        type='button'
                                        data-bs-toggle='dropdown'
                                    >
                                        <Icon
                                            icon='iconoir:bell'
                                            className='text-primary-light text-xl'
                                        />
                                    </button>
                                    <div className='dropdown'>
                                        <button
                                            className='d-flex justify-content-center align-items-center rounded-circle'
                                            type='button'
                                            data-bs-toggle='dropdown'
                                        >
                                            <img
                                                src='/assets/images/user.png'
                                                alt='image_user'
                                                className='w-40-px h-40-px object-fit-cover rounded-circle'
                                            />
                                        </button>
                                        <div className='dropdown-menu to-top dropdown-menu-sm'>
                                            <div
                                                className='py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2'>
                                                <div>
                                                    <h6 className='text-lg text-primary-light fw-semibold mb-2'>
                                                        Shaidul Islam
                                                    </h6>
                                                    <span className='text-secondary-light fw-medium text-sm'>
                          Admin
                        </span>
                                                </div>
                                                <button type='button' className='hover-text-danger'>
                                                    <Icon
                                                        icon='radix-icons:cross-1'
                                                        className='icon text-xl'
                                                    />
                                                </button>
                                            </div>
                                            <ul className='to-top-list'>
                                                <li>
                                                    <Link
                                                        className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                                                        href='/view-profile'
                                                    >
                                                        <Icon
                                                            icon='solar:user-linear'
                                                            className='icon text-xl'
                                                        />{" "}
                                                        My Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                                                        href='/email'
                                                    >
                                                        <Icon
                                                            icon='tabler:message-check'
                                                            className='icon text-xl'
                                                        />{" "}
                                                        Inbox
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3'
                                                        href='/company'
                                                    >
                                                        <Icon
                                                            icon='icon-park-outline:setting-two'
                                                            className='icon text-xl'
                                                        />
                                                        Setting
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className='dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3'
                                                        href='#'
                                                    >
                                                        <Icon icon='lucide:power' className='icon text-xl'/>{" "}
                                                        Log Out
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Profile dropdown end */}
                                    <button
                                        className='has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center'
                                        type='button'
                                        onClick={handleLogout}
                                    >
                                        <Icon
                                            icon='iconoir:log-out'
                                            className='text-primary-light text-xl'
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* dashboard-main-body */}
                    <div className='dashboard-main-body'>{children}</div>

                    {/* Footer section */}
                    <footer className='d-footer'>
                        <div className='row align-items-center justify-content-between'>
                            <div className='col-auto'>
                                <p className='mb-0'>© 2025 Indisite. All Rights Reserved.</p>
                            </div>
                        </div>
                    </footer>
                </main>
            </section>
        </AuthProvider>
    );
};

export default MasterLayout;
