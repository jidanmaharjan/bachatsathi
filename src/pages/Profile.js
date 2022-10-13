import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getProfile } from "../services/userApi";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    profile,
    user,
    isLoading,
    isError,
    isSuccess,
    message,
    isAuthenticated,
  } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if(!profile){
      dispatch(getProfile())
    }
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          navigate("/");
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  console.log(profile);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" p-4 mt-4">
      <h1 className="my-2 font-bold text-gray-600">PROFILE</h1>
      <div className="grid grid-cols-2 gap-4 align-items-center ">
        <div className="grid  bg-gray-100 rounded-md p-4 ">
          <div className="grid mx-auto w-full">
            <p className="p-1 bg-blue-400 text-5xl w-40 h-40 flex justify-center items-center font-bold text-white rounded-full mx-auto">
              {profile && profile.user.name.slice(0, 1)[0].toUpperCase()}
            </p>
            <button className="mt-4  bg-blue-400 text-gray-100 py-2 px-4 rounded-md">
              Change Profile Picture
            </button>
          </div>
          {profile && (
            <div className="mt-4 grid">
              <div className="ml-4 ">
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Full Name
                </h3>
                <p className="mb-2 text-gray-700 capitalize">{profile.user.name}</p>
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Email Address
                </h3>
                <p className="mb-2 text-gray-700">{profile.user.email}</p>
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Role
                </h3>
                <p className="mb-2 text-gray-700">{profile.user.role}</p>
                <h3 className="font-semibold text-blue-400 text-lg 2xl:text-xl ">
                  Status
                </h3>
                <p className="mb-2 text-gray-700">
                  {profile.user.verified && "Verified"}
                </p>
              </div>

              <button className="mt-4 bg-blue-400 text-gray-100 py-2 px-4 rounded-md">
                Change Password
              </button>
            </div>
          )}
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
