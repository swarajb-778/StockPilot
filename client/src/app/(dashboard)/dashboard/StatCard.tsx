"use client";

import { LucideIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

// Animated counter component using GSAP
const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };
    
    gsap.to(counter, {
      value: value,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayValue(Math.round(counter.value * 100) / 100);
      },
    });
  }, [value]);

  return (
    <span ref={counterRef}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { 
          y: 30, 
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        }
      );

      // Icon animation
      gsap.fromTo(
        iconRef.current,
        { 
          scale: 0, 
          rotation: -180,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "elastic.out(1, 0.5)",
        }
      );

      // Details stagger animation
      if (detailsRef.current) {
        gsap.fromTo(
          detailsRef.current.children,
          { 
            x: -20, 
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.15,
            delay: 0.4,
            ease: "power3.out",
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  // Hover animation
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(iconRef.current, {
      scale: 1.1,
      rotation: 10,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(iconRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div 
      ref={cardRef}
      className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700">{title}</h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex mb-6 items-center justify-around gap-4 px-5">
        <div 
          ref={iconRef}
          className="rounded-full p-5 bg-purple-50 border-purple-300 border-[1px]"
        >
          {primaryIcon}
        </div>
        <div ref={detailsRef} className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-4">
                <span className="text-gray-500">{detail.title}</span>
                <span className="font-bold text-gray-800">
                  <AnimatedCounter value={parseFloat(detail.amount)} prefix="$" />
                </span>
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
