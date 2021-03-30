import React from "react";

interface IPagesProps {
  page: number;
  totalPage: number;
  setPage: (p: number) => void;
}

const getPageArray = (page: number, totalPages: number): number[] => {
  let pageArray = [];
  let startPage = Math.max(1, page - 4);
  let endPage = Math.min(totalPages, page + 4);
  for (let num = startPage; num <= endPage; ++num) {
    pageArray.push(num);
  }
  if (pageArray.length < 9) {
    startPage -= 1;
    while (startPage >= 1 && pageArray.length < 9) {
      pageArray.splice(0, 0, startPage);
      startPage -= 1;
    }
    endPage += 1;
    while (endPage <= totalPages && pageArray.length < 9) {
      pageArray.push(endPage);
      endPage += 1;
    }
  }
  return pageArray;
};

export const Pages: React.FC<IPagesProps> = ({ page, totalPage, setPage }) => {
  const pageArray = getPageArray(page, totalPage);
  return (
    <div className="flex items-center justify-center px-4 py-3 overflow-auto">
      {pageArray.map((p, idx) => (
        <div className="flex" key={p}>
          <span
            className={`mx-1 px-2 ${
              page === p ? "bg-blue-600" : "bg-blue-400"
            } hover:bg-blue-600 cursor-pointer rounded-3xl text-white`}
            onClick={() => setPage(p)}
          >
            {p}
          </span>
        </div>
      ))}
    </div>
  );
};
