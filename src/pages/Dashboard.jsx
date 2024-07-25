import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { useDebounce } from "../hooks/useDebounce";
import CheckedIcon from "../assets/CheckIcon";
import SearchIcon from "../assets/SearchIcon";

const itemsPerPage = 5;

export default function Dashboard() {
  const { dashboardData } = useAdmin();
  const [activeTab, setActiveTab] = useState("ตรวจสอบความถูกต้อง");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 250);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = () => {
    if (!dashboardData) return [];
    let tabFilteredData;

    switch (activeTab) {
      case "ตรวจสอบความถูกต้อง":
        tabFilteredData = dashboardData.filter((item) =>
          item.status.includes("รอตรวจสอบ")
        );
        break;
      case "พิจารณาเอกสาร":
        tabFilteredData = dashboardData.filter((item) =>
          item.status.includes("พิจารณาเอกสาร")
        );
        break;
      case "ขึ้นทะเบียน":
        tabFilteredData = dashboardData.filter((item) =>
          item.status.includes("ขึ้นทะเบียน")
        );
        break;
      case "ออกเอกสาร":
        tabFilteredData = dashboardData.filter((item) =>
          item.status.includes("ออกเอกสาร")
        );
        break;
      case "แก้ไข":
        tabFilteredData = dashboardData.filter((item) =>
          item.status.includes("แก้ไข")
        );
        break;
      default:
        tabFilteredData = dashboardData;
    }

    return tabFilteredData.filter((item) => {
      const query = debouncedSearchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query) ||
        item.createDate.toLowerCase().includes(query) ||
        item.verifyBy.toLowerCase().includes(query) ||
        item.verifyDate.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
      );
    });
  };

  const tabArray = [
    { name: "ตรวจสอบความถูกต้อง" },
    { name: "พิจารณาเอกสาร" },
    { name: "ขึ้นทะเบียน" },
    { name: "ออกเอกสาร" },
    { name: "แก้ไข" },
  ];

  const statusColorClasses = {
    ตรวจสอบ: "bg-indigo-400",
    พิจารณาเอกสาร: "bg-fuchsia-500",
    ขึ้นทะเบียน: "bg-emerald-400",
    ออกเอกสาร: "bg-slate-400",
    แก้ไข: "bg-rose-400",
  };

  const paginatedData = () => {
    const data = filteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredData().length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusClass = (status) => {
    for (const key in statusColorClasses) {
      if (status.includes(key)) {
        return statusColorClasses[key];
      }
    }
    return "bg-gray-400";
  };

  const handleClickTab = (e) => {
    setActiveTab(e.target.name);
  };

  return (
    <div className="flex flex-col px-3 pt-20 w-full gap-10">
      <h1 className="pl-16 text-3xl font-semibold">รายการขอขึ้นทะเบียน</h1>
      <div className="max-w-[960px]">
        {/* tab menu */}
        <div className="relative h-[34px]">
          {tabArray.map((tab, index) => (
            <button
              key={tab.name}
              name={tab.name}
              onClick={handleClickTab}
              className={`absolute w-40 py-2 text-xs font-bold text-center border-2 border-b-0 border-neutral-300 rounded-tr-full ${
                activeTab === tab.name ? "bg-neutral-300" : "bg-neutral-200"
              } ${index > 0 ? "rounded-tl-full" : ""}`}
              style={{
                top: "0",
                left: `${index * 135}px`,
                zIndex: activeTab === tab.name ? 10 : 5 - index,
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="bg-neutral-300 px-3 pb-3 flex flex-col rounded-b-lg rounded-tr-lg">
          {/* Searchbox */}
          <div className="bg-neutral-300 py-2 flex justify-end">
            <div className="bg-neutral-200 w-fit px-3 py-1 rounded-full flex gap-1">
              <SearchIcon />
              <input
                className="focus:outline-none bg-neutral-200 text-neutral-400"
                type="text"
                placeholder="ค้นหา"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* table */}
          <div className="bg-white">
            <table className="w-full">
              <thead>
                <tr className="text-sm text-neutral-400">
                  <th
                    scope="col"
                    className="w-48 pl-6 pr-2 py-2 text-left text-xs font-medium text-neutral-400"
                  >
                    ชื่อหน่วยงาน
                  </th>
                  <th
                    scope="col"
                    className="w-28 px-2 py-2 text-left text-xs font-medium text-neutral-400"
                  >
                    รหัสหน่วยบริการ
                  </th>
                  <th
                    scope="col"
                    className="w-28 px-2 py-2 text-left text-xs font-medium text-neutral-400"
                  >
                    วันที่ขึ้นทะเบียน
                  </th>
                  <th
                    scope="col"
                    className="w-36 px-2 py-2 text-center text-xs font-medium text-neutral-400"
                  >
                    ชื่อผู้ตรวจสอบ
                  </th>
                  <th
                    scope="col"
                    className="w-28 px-2 py-2 text-center text-xs font-medium text-neutral-400"
                  >
                    วันที่ตรวจสอบ
                  </th>
                  <th
                    scope="col"
                    className="w-40 px-2 py-2 text-center text-xs font-medium text-neutral-400"
                  >
                    สถานะ
                  </th>
                  <th scope="col" className="pr-6 w-4"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedData().map((item, index, array) => (
                  <tr
                    key={item.code}
                    className={`border-b border-gray-200 ${
                      index === array.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="pl-6 pr-2 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.code}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.createDate}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-xs text-center text-gray-500">
                      {item.verifyBy}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      {item.verifyDate}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                      <div
                        className={`rounded-full py-2 px-3 text-white ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td>
                      <CheckedIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        {totalPages >= 2 && (
          <div className="flex justify-between my-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
