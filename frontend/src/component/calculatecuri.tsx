import { curiculum, subject } from "../model";

export default function Calculate({
  curriculum_id,
  curriculum,
  type,
  subject,
}: {
  curriculum_id: number;
  curriculum: curiculum[];
  type: curiculum[];
  subject: subject[];
}) {
  const filterCurri = curriculum.filter((value) => {
    return curriculum_id === value.curriculum_id;
  });

  const mergeCurri = filterCurri.map((value) => {
    const total_plan = { total_plan: 0 };
    const matching = type.find((ele) => {
      return (
        ele.type_id === value.type_id ||
        (value.type_id === "6 or 7" && ele.type_id === 6)
      );
    });

    return matching ? { ...value, ...matching, ...total_plan } : value;
  });
  console.log(mergeCurri);

  mergeCurri.map((value) => {
    subject.find((ele) => {
      if (ele.type === value.abbreviation) {
        value.total_plan += ele.credit;
      }
    });
  });

  return (
    <>
      <div className="curi-sum">
        <h2>ผลการคำนวน</h2>
        <table className="table-sum">
          <thead>
            <tr>
              <th>หลักสูตร</th>
              <th>หลักสูตร(ชื่อเต็ม)</th>
              <th>หลักสูตร</th>
              <th>Plan</th>
              <th>คงเหลือ</th>
            </tr>
          </thead>
          <tbody>
            {mergeCurri.map((ele, index) => {
              return (
                <tr key={index}>
                  <td>{ele.abbreviation}</td>
                  <td>{ele["stand for"]}</td>
                  <td>{ele.total_credit}</td>
                  <td>{ele.total_plan}</td>
                  <td>{ele.total_credit - ele.total_plan}</td>
                  {ele.total_credit < ele.total_plan && (
                    <td style={{ border: "none", position: "absolute" }}>
                      หน่วยกิตเกินมา {ele.total_plan - ele.total_credit}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
