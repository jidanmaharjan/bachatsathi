import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/getCookie";
import Loader from "../components/Loader";
import { getMembers } from "../services/userApi";

const Members = () => {
  const { members, isLoading, isError, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!members) {
      if (getCookie("token")) {
        dispatch(getMembers());
      }
    }
  }, [isAuthenticated]);

  useEffect(()=>{
    if(!isLoading){
      if(!getCookie('token')){
        navigate('/')
        
      }
  }
  },[])


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" p-4 mt-4 mb-16 sm:mb-0">
      <h1 className="my-2 font-bold text-gray-600">MEMBERS</h1>
      <div className="p-4 rounded-md bg-gray-100">
        <div>
          <div className="rounded-md">
            <table className="w-full rounded-md overflow-hidden ">
              <thead className="bg-blue-400 text-gray-100 font-semibold text-sm sm:text-md 2xl:text-lg">
                <tr className="">
                  <th className="p-2 text-left hidden sm:block">S.No.</th>
                  <th className="p-2 text-left">Profile</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm sm:text-md 2xl:text-lg">
                {members && members.map((member, index) =>(
                  <tr className="bg-gray-300 odd:bg-gray-200" key={index}>
                  <td className="p-2 hidden sm:block"><p>{index+1}</p></td>
                  <td className="p-2"><p className="p-1 bg-blue-400 w-8 h-8 flex justify-center items-center font-bold text-white rounded-full mr-2">
                {members && member.name.slice(0,1)[0].toUpperCase()}
              </p></td>
              <td className="p-2 capitalize"><p>{member.name}</p></td>
              <td className="p-2"><p>{member.email  }</p></td>
                </tr>
                ))}
                
              </tbody>
            
            </table>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
