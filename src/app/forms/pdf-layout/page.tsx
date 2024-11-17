"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePicker from "react-datepicker";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
// import {
//   getCity,
//   getCountries,
//   getState,
// } from "@/app/redux/slices/countryInfo/countrySlice";
import { getDevice, getTimeZone } from "@/app/redux/slices/devices/deviceSlice";
import { getPdf } from "@/app/redux/slices/pdfInfo/pdfInfoSlice";
import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FormLayout = () => {
  const optionsArray = [
    { value: "pdfTempHumidity", label: "pdf Temp & Humidity" },
    {
      value: "pdfTempHumidityNoSummary",
      label: "pdf Temp & Humidity without summary",
    },
    { value: "pdfTempHumidityNoGraph", label: "pdf Temp & Humidity no graph" },
    {
      value: "pdfTempHumidityOnlyTables",
      label: "pdf Temp & Humidity tables only",
    },
    { value: "CSVTempHumidity", label: "CSV Temp & Humidity" },
    { value: "HTMLTempHumidity", label: "HTML Temp & Humidity" },
    { value: "pdfTemp", label: "pdf Temp" },
    { value: "pdfTempNoSummary", label: "pdf Temp without summary" },
    { value: "pdfTempNoGraph", label: "pdf Temp no graph" },
    { value: "pdfTempOnlyTables", label: "pdf Temp tables only" },
    { value: "CSVTemp", label: "CSV Temp" },
    { value: "HTMLTemp", label: "HTML Temp" },
    { value: "pdfHumidity", label: "pdf Humidity" },
    { value: "pdfHumidityNoSummary", label: "pdf Humidity without summary" },
    { value: "pdfHumidityNoGraph", label: "pdf Humidity no graph" },
    { value: "pdfHumidityOnlyTables", label: "pdf Humidity tables only" },
    { value: "CSVHumidity", label: "CSV Humidity" },
    { value: "HTMLHumidity", label: "HTML Humidity" },
  ];

  const { register, handleSubmit, setValue } = useForm();
  // const { error, loading, token, userId } = useSelector((store) => store.user);
  // const dispatch = useDispatch();
  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState();
  const [state, setState] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [devices, setDevices] = useState([]);
  const [temp, setTemp] = useState();
  const [selectDevice, setSelectDevice] = useState();
  const [selectCountry, setSelectCountry] = useState();
  const [selectTimeZone, setSelectTimeZone] = useState();
  const [selectState, setSelectState] = useState();
  const [selectAggregation, setSelectAggregation] = useState();
  const [selectInterval, setSelectInterval] = useState();
  const [pdfData, setPdfData] = useState();
  return (
    <DefaultLayout>
      <Breadcrumb pageName="pdf creation" />

      <div>
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Data Explorer trough PDF
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                {/* <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      ID
                    </label>
                    <input
                      type="text"
                      placeholder="user id"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div> */}

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="userid"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    DEVICE <span className="text-meta-1">*</span>
                  </label>
                  {/* <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  /> */}
                  <Select
                    // defaultValue={selectedOption}
                    // onChange={setSelectedOption}
                    // options={options}
                    isMulti
                  />
                </div>
                <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-20">
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    Refresh
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    See
                  </Link>
                </div>

                <div className="mb-4.5">
                  <div className="margin-left-5 -mx-3 mb-6 flex flex-wrap">
                    <div className="mb-6 w-full px-1 md:mb-0 md:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Start Time <span className="text-meta-1">*</span>
                      </label>
                      <DatePicker
                        className="bg-gray-200 text-gray-700 border-gray-200 focus:border-gray-500 block w-full appearance-none rounded border px-4 py-3 leading-tight focus:bg-white focus:outline-none"
                        // selected={startTime}
                        // onChange={handleStartTimeChange}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select start time"
                        showIcon
                      />
                    </div>
                    <div className="w-full px-3 md:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        End Time <span className="text-meta-1">*</span>
                      </label>
                      <DatePicker
                        className="bg-gray-200 text-gray-700 border-gray-200 focus:border-gray-500 block w-full appearance-none rounded border px-4 py-3 leading-tight focus:bg-white focus:outline-none"
                        // selected={endTime}
                        // onChange={handleEndTimeChange}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select end time"
                        showIcon
                      />
                    </div>
                  </div>
                </div>

                {/* <SelectGroupOne /> */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    TEMP OR HUMIDITY <span className="text-meta-1">*</span>
                  </label>

                  <Select
                    // defaultValue={selectedOption}
                    // onChange={setSelectedOption}
                    // options={options}
                    isMulti
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      iNTERVAL IN MINUTE
                    </label>
                    <input
                      type="text"
                      placeholder="user id"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      AGGREGAION
                    </label>
                    <Select
                      // defaultValue={selectedOption}
                      // onChange={setSelectedOption}
                      // options={options}
                      isMulti
                    />
                  </div>
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    COUNTRY <span className="text-meta-1">*</span>
                  </label>

                  <Select
                    // defaultValue={selectedOption}
                    // onChange={setSelectedOption}
                    // options={options}
                    isMulti
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    STATE <span className="text-meta-1">*</span>
                  </label>

                  <Select
                    // defaultValue={selectedOption}
                    // onChange={setSelectedOption}
                    // options={options}
                    isMulti
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    TIME+ZONE <span className="text-meta-1">*</span>
                  </label>

                  <Select
                    // defaultValue={selectedOption}
                    // onChange={setSelectedOption}
                    // options={options}
                    isMulti
                  />
                </div>
                {/* <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Type your message"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div> */}

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
