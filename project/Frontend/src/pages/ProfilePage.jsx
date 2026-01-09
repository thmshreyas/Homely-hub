import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updatePassword } from "../store/User/user-action.js";
import { User, Mail, Phone, Edit2, Lock, Save } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [passwordData, setPasswordData] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProfile(profileData));
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.password !== passwordData.passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    const result = await dispatch(updatePassword(passwordData));
    if (result.success) {
      setIsEditingPassword(false);
      setPasswordData({
        passwordCurrent: "",
        password: "",
        passwordConfirm: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
            {!isEditing && (
              <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 hover-text-primary"
                >
                <Edit2 className="h-5 w-5" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
                  required
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 btn-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
                  style={{ border: 'none' }}
                >
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setProfileData({
                      name: user?.name || "",
                      email: user?.email || "",
                      phoneNumber: user?.phoneNumber || "",
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="text-lg font-semibold text-gray-800">{user?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-800">{user?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-lg font-semibold text-gray-800">{user?.phoneNumber || "N/A"}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-primary" />
              Change Password
            </h2>
            {!isEditingPassword && (
              <button
                onClick={() => setIsEditingPassword(true)}
                className="flex items-center space-x-2 hover-text-primary"
              >
                <Edit2 className="h-5 w-5" />
                <span>Change Password</span>
              </button>
            )}
          </div>

          {isEditingPassword && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="passwordCurrent"
                  value={passwordData.passwordCurrent}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                  <input
                    type="password"
                    name="password"
                    value={passwordData.password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
                    required
                  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    value={passwordData.passwordConfirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-theme"
                    required
                  />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 btn-primary text-white px-6 py-2 rounded-lg hover:opacity-90"
                  style={{ border: 'none' }}
                >
                  <Save className="h-5 w-5" />
                  <span>Update Password</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPassword(false);
                    setPasswordData({
                      passwordCurrent: "",
                      password: "",
                      passwordConfirm: "",
                    });
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

