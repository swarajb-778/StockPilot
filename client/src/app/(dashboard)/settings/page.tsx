"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Bell, 
  Moon, 
  Globe, 
  Shield,
  Save,
  Check
} from "lucide-react";
import Header from "@/app/(components)/Header";

type UserSetting = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
  icon: React.ElementType;
  description: string;
};

const mockSettings: UserSetting[] = [
  { 
    label: "Username", 
    value: "admin", 
    type: "text", 
    icon: User,
    description: "Your display name across the platform"
  },
  { 
    label: "Email", 
    value: "admin@stockpilot.com", 
    type: "text", 
    icon: Mail,
    description: "Your primary email for notifications"
  },
  { 
    label: "Notifications", 
    value: true, 
    type: "toggle", 
    icon: Bell,
    description: "Receive alerts for low stock and updates"
  },
  { 
    label: "Dark Mode", 
    value: false, 
    type: "toggle", 
    icon: Moon,
    description: "Toggle dark theme for the dashboard"
  },
  { 
    label: "Language", 
    value: "English", 
    type: "text", 
    icon: Globe,
    description: "Preferred language for the interface"
  },
];

const Settings = () => {
  const router = useRouter();
  const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);
  const [saved, setSaved] = useState(false);

  const handleToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };

  const handleInputChange = (index: number, value: string) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = value;
    setUserSettings(settingsCopy);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Back Button and Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-md hover:shadow-lg transition-all border border-gray-100"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div>
            <Header name="Settings" />
            <p className="text-sm text-gray-500 mt-1">
              Manage your account preferences and settings
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings Cards */}
      <div className="grid gap-4">
        {userSettings.map((setting, index) => {
          const IconComponent = setting.icon;
          return (
            <motion.div
              key={setting.label}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -2, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-200">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{setting.label}</h3>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {setting.type === "toggle" ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={() => handleToggleChange(index)}
                      />
                      <motion.div
                        className="w-14 h-7 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 
                        peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-md
                        peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-purple-600"
                        whileTap={{ scale: 0.95 }}
                      />
                    </label>
                  ) : (
                    <motion.input
                      type="text"
                      className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-700 
                        focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100
                        bg-gray-50 hover:bg-white transition-colors w-48"
                      value={setting.value as string}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      whileFocus={{ scale: 1.02 }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Security Section */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-200">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Security</h3>
            <p className="text-sm text-gray-500">Manage your account security settings</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <motion.button
            className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 text-sm font-medium transition-colors text-left"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Change Password
          </motion.button>
          <motion.button
            className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 text-sm font-medium transition-colors text-left"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Two-Factor Authentication
          </motion.button>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all ${
            saved 
              ? "bg-green-500 shadow-green-200" 
              : "bg-gradient-to-r from-purple-600 to-purple-700 shadow-purple-200 hover:from-purple-500 hover:to-purple-600"
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Settings;

