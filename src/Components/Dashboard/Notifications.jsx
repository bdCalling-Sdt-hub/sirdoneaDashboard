/* eslint-disable no-unused-vars */
import React from "react";
import { FiBell } from "react-icons/fi";
import { MdArrowBackIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllNotificationQuery } from "../../Redux/api/notificationApi";
import moment from "moment";

// const notifications = [
//   { id: 1, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 2, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 3, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 4, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 5, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 6, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 7, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 8, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 9, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 10, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 11, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 12, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 13, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 14, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 15, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 16, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 17, message: "You have a story request.", time: "Fri, 12:30pm" },
//   { id: 18, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 19, message: "An user joined in app.", time: "Fri, 12:30pm" },
//   { id: 20, message: "An user joined in app.", time: "Fri, 12:30pm" },
// ];

const Notifications = () => {

   const {data:notification1} = useGetAllNotificationQuery();
  // console.log('noti', notification1?.data);
  return (
    <div className=" bg-slate-50">
      <div className="flex items-center bg-[#1b7743] gap-1 py-3 px-5 mb-3 rounded-lg">
        <Link to="/dashboard">
          <MdArrowBackIos className="text-xl sm:text-2xl lg:text-3xl text-primary-color" />
        </Link>
        <h1 className="text-3xl font-bold text-primary-color">Notification</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-8 ">
        {notification1?.data?.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center space-x-3 p-2 border-b border-gray-300 last:border-none"
          >
            {/* Icon */}
            <div className="bg-[#1b7743] p-2 rounded-full">
              <FiBell className="text-white w-6 h-6" />
            </div>

            {/* Notification text */}
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-700">
                {notification.message}
              </span>
              <span className="text-sm text-gray-500">{moment(notification.createdAt).fromNow()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notifications;
