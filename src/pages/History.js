import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../components/getCookie";
import Loader from "../components/Loader";
import { getAllMonth } from "../services/bachatApi";
import moment from "moment/moment";

const History = () => {
  const { allMonth, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.bachat
  );
  const { isAuthenticated, isLoading: userisLoading } = useSelector(
    (state) => state.user
  );
  const [month, setMonth] = useState(
    moment().subtract(1, "months").format("MM")
  );
  const [year, setYear] = useState(
    moment().subtract(1, "months").format("YYYY")
  );
  const [loading, setLoading] = useState(false);
  const [totalmonthamount, setTotalmonthamount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectMonthData, setSelectMonthData] = useState([]);
  const [selectYearData, setSelectYearData] = useState([]);

  useEffect(() => {
    if (!allMonth) {
      if (getCookie("token")) {
        dispatch(getAllMonth());
        setLoading(true);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isLoading) {
      if (!getCookie("token")) {
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    const selectmonth = [];
    const selectyear = [];
    allMonth &&
      allMonth.length > 0 &&
      allMonth.map((unit) => {
        selectmonth.push(unit.date.split(" ")[0]);
        selectyear.push(unit.date.split(" ")[1]);
      });
    if (allMonth && allMonth.length > 0) {
      setSelectMonthData([...new Set(selectmonth)].sort());
      setSelectYearData([...new Set(selectyear)]);
    }

    setLoading(false);
    // setSelectData(allMonth && allMonth.date)
  }, [allMonth]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  if (isLoading || userisLoading) {
    return <Loader />;
  }

  return (
    <div className=" p-4 mt-4 mb-16 sm:mb-0">
      <h1 className="my-2 font-bold text-gray-600">HISTORY</h1>
      <div className="p-4 rounded-md bg-gray-100 mb-4">
        {loading ? (
          "loading"
        ) : (
          <form onSubmit={(e) => submitHandler(e)}>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 outline-none sm:w-40 bg-inherit border border-gray-300 mr-2 cursor-pointer rounded-md"
            >
              {selectYearData.length > 0 &&
                selectYearData.map((y) => (
                  <option key={y} value={y}>
                    {moment(y).format("YYYY")}
                  </option>
                ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-2 outline-none sm:w-40 bg-inherit border border-gray-300 mx-2 cursor-pointer rounded-md"
            >
              {selectMonthData.length > 0 &&
                selectMonthData.map((m) => (
                  <option key={m} value={m}>
                    {moment(m).format("MMMM")}
                  </option>
                ))}
            </select>
          </form>
        )}
      </div>
      <div className="p-4 rounded-md bg-gray-100 mb-4 transition-all ease-in-out duration-300">
        {allMonth &&
          allMonth.length > 0 &&
          allMonth
            .filter(
              (fmonth) =>
                fmonth && fmonth.date && fmonth.date === `${month} ${year}`
            )
            .map((final) => (
              <div
                key={final.date}
                className="transition-all ease-in-out duration-300"
              >
                <p className="text-lg font-semibold text-blue-400">
                  {moment(
                    final.date.split(" ")[1] + final.date.split(" ")[0]
                  ).format("MMMM YYYY")}
                </p>
                {final.collected.length > 0 ? (
                  <table className="w-full mt-2 rounded-md overflow-hidden ">
                    <thead className="bg-blue-400 text-gray-100 font-semibold text-sm sm:text-md 2xl:text-lg">
                      <tr className="">
                        <th className="p-2 text-left hidden sm:block">S.No.</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Fine</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm sm:text-md 2xl:text-lg">
                      {final.collected &&
                        final.collected
                          .filter((unit) => unit.status === "Verified")
                          .map((member, index) => (
                            <tr
                              className="bg-gray-300 odd:bg-gray-200"
                              key={index}
                            >
                              <td className="p-2 hidden sm:block">
                                <p>{index + 1}</p>
                              </td>

                              <td className="p-2 capitalize">
                                <p>{member.name}</p>
                              </td>
                              <td className="p-2">
                                <p>{member.amount}</p>
                              </td>
                              <td className="p-2">
                                <p>{member.fine}</p>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="mt-4 text-gray-700">No Data Found</p>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default History;
