import React, { SetStateAction } from "react";
import { subject } from "../model";
import "../css/table.css";

function Table<T extends subject>({
  year,
  data,
  stateLift,
}: {
  year: number;
  data: T[];
  stateLift: React.Dispatch<SetStateAction<subject[]>>;
}) {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.target as HTMLButtonElement;
    const myArr = data.filter((ele) => ele.subject_id !== button.value);

    console.log(Number(button.value));
    console.log(myArr);
    stateLift(myArr);
  };
  return (
    <div className="table">
      <div className="table-header">
        <h1>ปี {year}</h1>
        <div className="table-header-button"></div>
      </div>
      <table className="table-table">
        <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>หลักสูตร</th>
            <th>ชื่อวิชา</th>
            <th>เรียนหรือยัง</th>
            <th>หน่วยกิต</th>
          </tr>
        </thead>

        <tbody>
          {data.map((data: T, index: number) => (
            <tr key={index}>
              <td>{data.subject_id}</td>
              <td>{data.type}</td>
              <td>{data.subject_name}</td>
              <td></td>
              <td>{data.credit}</td>

              <td>
                <button
                  className="table-del-btn"
                  key={data.subject_id}
                  value={data.subject_id}
                  onClick={handleDelete}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
