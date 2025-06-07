"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

const Breadcrumb = () => {
  const pathname = usePathname(); // contoh: "/page/core/organizations"
  const segments = pathname
      .split("/")
      .filter((segment) => segment !== "");

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return {
      name: capitalize(segment),
      href,
    };
  });

  return (
      <div className='d-flex justify-content-end mb-24'>
        <ul className='d-flex align-items-center gap-2'>
          <li className='fw-medium'>
            <Link
                href='/'
                className='d-flex align-items-center gap-1 hover-text-primary'
            >
              <Icon
                  icon='solar:home-smile-angle-outline'
                  className='icon text-lg'
              />
              Home
            </Link>
          </li>
          {breadcrumbItems.length > 0 && <li>-</li>}
          {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <li>-</li>}
                <li className='fw-medium'>
                  <Link
                      href={item.href}
                      className='hover-text-primary'
                  >
                    {item.name}
                  </Link>
                </li>
              </React.Fragment>
          ))}
        </ul>
      </div>

  );
};

export default Breadcrumb;
