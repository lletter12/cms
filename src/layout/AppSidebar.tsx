"use client";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useSidebar} from "@/context/SidebarContext";
import {
    BoxCubeIcon,
    CalenderIcon,
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
} from "../icons/index";
import {useTranslations} from "next-intl";

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const AppSidebar = () => {
    const {isExpanded, isMobileOpen, isHovered, setIsHovered, toggleMobileSidebar} = useSidebar();
    const pathname = usePathname();
    const t = useTranslations("Sidebar");

    const navItems: NavItem[] = [
        {
            name: t("text.posting.label"),
            icon: <PageIcon/>,
            subItems: [
                {name: t("text.banners.label"), path: "/posting-banners", pro: false},
                {name: t("text.modals.label"), path: "/posting-modals", pro: false},
            ],
        },
        {
            icon: <GridIcon/>,
            name: t("text.dashboard.label"),
            path: "/main",
        },
        {
            icon: <CalenderIcon/>,
            name: t("text.calendar.label"),
            path: "/calendar",
        },
        {
            icon: <UserCircleIcon/>,
            name: t("text.userProfile.label"),
            path: "/profile",
        }
    ];

    const createItems: NavItem[] = [
        {
            icon: <PageIcon/>,
            name: t("text.content.label"),
            path: "/create/content",
        },
        {
            icon: <PageIcon/>,
            name: t("text.prompt.label"),
            path: "/create/prompt",
        },
    ];

    const componentItems: NavItem[] = [
        {
            name: t("text.forms.label"),
            icon: <ListIcon/>,
            subItems: [{name: t("text.formElements.label"), path: "/form-elements", pro: false}],
        },
        {
            name: t("text.tables.label"),
            icon: <TableIcon/>,
            subItems: [{name: t("text.basicTables.label"), path: "/basic-tables", pro: false}],
        },
        {
            name: t("text.pages.label"),
            icon: <PageIcon/>,
            subItems: [
                {name: t("text.blankPage.label"), path: "/blank", pro: false},
                {name: "404 Error", path: "/error-404", pro: false},
            ],
        },
        {
            icon: <PieChartIcon/>,
            name: t("text.charts.label"),
            subItems: [
                {name: "Line Chart", path: "/line-chart", pro: false},
                {name: "Bar Chart", path: "/bar-chart", pro: false},
            ],
        },
        {
            icon: <BoxCubeIcon/>,
            name: t("text.uiElements.label"),
            subItems: [
                {name: "Alerts", path: "/alerts", pro: false},
                {name: "Avatar", path: "/avatars", pro: false},
                {name: "Badge", path: "/badge", pro: false},
                {name: "Buttons", path: "/buttons", pro: false},
                {name: "Images", path: "/images", pro: false},
                {name: "Videos", path: "/videos", pro: false},
            ],
        },
        {
            icon: <PlugInIcon/>,
            name: t("text.authentication.label"),
            subItems: [
                {name: "Sign In", path: "/signin", pro: false},
                {name: "Sign Up", path: "/signup", pro: false},
            ],
        },
    ];

    const handlerClose = () => {
        if (window.innerWidth < 1024) {
            toggleMobileSidebar();
        }
    }

    const renderMenuItems = (
        navItems: NavItem[],
        menuType: "main" | "others"
    ) => (
        <ul className="flex flex-col gap-4 overflow-auto">
            {navItems.map((nav, index) => (
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group  ${
                                openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "menu-item-active"
                                    : "menu-item-inactive"
                            } cursor-pointer ${
                                !isExpanded && !isHovered
                                    ? "lg:justify-center"
                                    : "lg:justify-start"
                            }`}
                        >
                          <span
                              className={` ${
                                  openSubmenu?.type === menuType && openSubmenu?.index === index
                                      ? "menu-item-icon-active"
                                      : "menu-item-icon-inactive"
                              }`}
                          >
                            {nav.icon}
                          </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <span className={`menu-item-text`}>{nav.name}</span>
                            )}
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <ChevronDownIcon
                                    className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                                        openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                            ? "rotate-180 text-brand-500"
                                            : ""
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                href={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                                }`}
                                onClick={handlerClose}
                            >
                            <span
                                className={`${
                                    isActive(nav.path)
                                        ? "menu-item-icon-active"
                                        : "menu-item-icon-inactive"
                                }`}
                            >
                              {nav.icon}
                            </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className={`menu-item-text`}>{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className="overflow-hidden transition-all duration-300"
                            style={{
                                height:
                                    openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : "0px",
                            }}
                        >
                            <ul className="mt-2 space-y-1 ml-9">
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            href={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? "menu-dropdown-item-active"
                                                    : "menu-dropdown-item-inactive"
                                            }`}
                                            onClick={handlerClose}
                                        >
                                            {subItem.name}
                                            <span className="flex items-center gap-1 ml-auto">
                                                {subItem.new && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-badge-active"
                                                                : "menu-dropdown-badge-inactive"
                                                        } menu-dropdown-badge `}
                                                    >
                                                    new
                                                  </span>
                                                )}
                                                {subItem.pro && (
                                                    <span
                                                        className={`ml-auto ${
                                                            isActive(subItem.path)
                                                                ? "menu-dropdown-badge-active"
                                                                : "menu-dropdown-badge-inactive"
                                                        } menu-dropdown-badge `}
                                                    >
                                                    pro
                                                  </span>
                                                )}
                                             </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "others";
        index: number;
    } | null>(null);
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    );
    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // const isActive = (path: string) => path === pathname;
    const isActive = useCallback((path: string) => path === pathname, [pathname]);

    useEffect(() => {
        // Check if the current path matches any submenu item
        let submenuMatched = false;
        ["main", "others"].forEach((menuType) => {
            const items = menuType === "main" ? navItems : componentItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: menuType as "main" | "others",
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        // If no submenu item matches, close the open submenu
        if (!submenuMatched) {
            setOpenSubmenu(null);
        }
    }, [pathname, isActive]);

    useEffect(() => {
        // Set the height of the submenu items when the submenu is opened
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
        setOpenSubmenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return {type: menuType, index};
        });
    };

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 overflow-auto
            ${
                isExpanded || isMobileOpen
                    ? "w-[290px]"
                    : isHovered
                        ? "w-[290px]"
                        : "w-[90px]"
            }
            ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                <nav className="mt-3.5 mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    t("text.menu.label")
                                ) : (
                                    <HorizontaLDots/>
                                )}
                            </h2>
                            {renderMenuItems(navItems, "main")}
                        </div>

                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    t("text.create.label")
                                ) : (
                                    <HorizontaLDots/>
                                )}
                            </h2>
                            {renderMenuItems(createItems, "main")}
                        </div>

                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? "lg:justify-center"
                                        : "justify-start"
                                }`}
                            >
                                {isExpanded || isHovered || isMobileOpen ? (
                                    t("text.components.label")
                                ) : (
                                    <HorizontaLDots/>
                                )}
                            </h2>
                            {renderMenuItems(componentItems, "others")}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};