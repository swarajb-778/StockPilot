"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/app/(components)/Header";
import PageTransition from "@/app/(components)/PageTransition";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
  { label: "Username", value: "admin", type: "text" },
  { label: "Email", value: "admin@stockpilot.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  return (
    <PageTransition>
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header name="User Settings" />
        </motion.div>
        <motion.div
          className="overflow-x-auto mt-5 shadow-md rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <table className="min-w-full bg-white rounded-lg">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Setting
                </th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {userSettings.map((setting, index) => (
                <motion.tr
                  className="hover:bg-purple-50 border-b"
                  key={setting.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 5, backgroundColor: "#faf5ff" }}
                >
                  <td className="py-3 px-4 font-medium">{setting.label}</td>
                  <td className="py-3 px-4">
                    {setting.type === "toggle" ? (
                      <label className="inline-flex relative items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={setting.value as boolean}
                          onChange={() => handleToggleChange(index)}
                        />
                        <motion.div
                          className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-purple-400 peer-focus:ring-4 
                          transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                          after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                          after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                          peer-checked:bg-purple-600"
                          whileTap={{ scale: 0.95 }}
                        ></motion.div>
                      </label>
                    ) : (
                      <motion.input
                        type="text"
                        className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        value={setting.value as string}
                        onChange={(e) => {
                          const settingsCopy = [...userSettings];
                          settingsCopy[index].value = e.target.value;
                          setUserSettings(settingsCopy);
                        }}
                        whileFocus={{ scale: 1.02 }}
                      />
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Settings;
