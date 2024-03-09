import { useEffect, useState } from "react";
import Table from "../component/table";
import axios from "axios";
import filterSub from "../util/filterSubject";
import "../css/home.css";
import { curiculum, subject, selectSubject } from "../model";
import sameData from "../util/checkdata";
import Calculate from "../component/calculatecuri";

function Home() {
  //state to handle element
  const [yearState, setYearState] = useState<number>(1);
  const [subjectState, setSubjectState] = useState<string>("");
  const [curriculumState, setCurriculumState] = useState<number>(1);

  //state for store data from api
  const [curiculum, setCuriculum] = useState<curiculum[]>([]);
  const [subject, setSubject] = useState<subject[]>([]);
  const [type, setType] = useState<curiculum[]>([]);

  const [firstYear, setFirstyear] = useState<subject[]>([]);
  const [secondYear, setSecondYear] = useState<subject[]>([]);
  const [thirdYear, setThirdYear] = useState<subject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //function to fetch Curiculum from api
  const getCuriculum = async () => {
    const response = await axios.get("http://localhost:8080/curriculum");
    const data = response.data.data;
    setCuriculum(data);
  };

  //function to fetch subject from api
  const getSubject = async () => {
    const response = await axios.get("http://localhost:8080/subject");
    const data = response.data.data;
    setSubject(data);
  };

  const getType = async () => {
    const response = await axios.get("http://localhost:8080/type");
    const data = response.data.data;
    setType(data);
  };

  useEffect(() => {
    try {
      setLoading(true);
      getSubject();
      getCuriculum();
      getType();
    } catch (ex) {
      console.log(ex);
    } finally {
      setLoading(false);
    }
  }, []);

  //onclick function to add subject to year
  const handleAdd = () => {
    const resultSubject = filterSub<subject>(subjectState, subject);
    const yearStore: selectSubject = {
      firstYear: firstYear,
      secondYear: secondYear,
      thirdYear: thirdYear,
    };
    const checkData = sameData(subjectState, yearStore);
    if (subjectState && !checkData) {
      if (yearState === 1 && subject) {
        setFirstyear((prev: subject[]) => {
          if (resultSubject) {
            return [...prev, resultSubject];
          }
          return prev;
        });
      } else if (yearState === 2 && subject) {
        setSecondYear((prev: subject[]) => {
          if (resultSubject) {
            return [...prev, resultSubject];
          }
          return prev;
        });
      } else if (yearState === 3 && subject) {
        setThirdYear((prev: subject[]) => {
          if (resultSubject) {
            return [...prev, resultSubject];
          }
          return prev;
        });
      }
    } else {
      if (checkData) {
        alert("already have in planner!!");
      } else if (!subjectState) {
        alert("input is None!!");
      }
    }
    setSubjectState("");
  };

  const handleYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setYearState(Number(event.target.value));
  };

  const handleDatalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubjectState(event.target.value);
  };

  const handleCurriculum = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setCurriculumState(Number(event.target.value));
  };
  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="lds-dual-ring"></div>
        </div>
      ) : (
        <div className="home">
          <div className="home-header">
            <div className="home-header-text">
              <p>คณะ วิศวกรรมศาสตร์</p>
              <p>ภาควิชา วิศวกรรมคอมพิวเตอร์</p>
              <p>หลักสูตร วิศวกรรมคอมพิวเตอร์(ต่อเนื่อง)</p>
            </div>
          </div>
          <div className="home-selector">
            <p>ใส่รหัสวิชาเพื่อเพิ่ม</p>
            <input
              type="text"
              id="data_subject"
              list="sub"
              autoComplete="off"
              onChange={handleDatalist}
              value={subjectState}
            />

            <datalist id="sub">
              {subject?.map((item, index) => {
                return <option key={index} value={item.subject_name} />;
              })}
            </datalist>

            {
              <select value={yearState} onChange={handleYear}>
                <option value="1">ปี 1</option>
                <option value="2">ปี 2</option>
                <option value="3">ปี 3</option>
              </select>
            }
            <button className="home__btn home__btn-add" onClick={handleAdd}>
              เพิ่มรายวิชา
            </button>
            <button className="home__btn home__btn-add">ลบ</button>
          </div>
          <div className="home-container">
            <div className="home-sidetable">
              <div className="home-sidetable-checkbox">
                <input type="checkbox" id="year" name="year" />
                <p>ปี 1</p>
              </div>
              <div className="home-sidetable-checkbox">
                <input type="checkbox" id="year" name="year" />
                <p>ปี 2</p>
              </div>
              <div className="home-sidetable-checkbox">
                <input type="checkbox" id="year" name="year" />
                <p>ปี 3</p>
              </div>
              <select value={curriculumState} onChange={handleCurriculum}>
                <option value={2}>วัดคุม(ต่อเนื่อง)</option>
                <option value={1}>คอม(ต่อเนื่อง)</option>
              </select>
              <button className="home__btn home__btn-add__side ">check</button>

              <p>คำนวนเกรด...</p>
            </div>

            <div className="home-table">
              {firstYear && (
                <Table year={1} data={firstYear} stateLift={setFirstyear} />
              )}
              {secondYear && (
                <Table year={2} data={secondYear} stateLift={setSecondYear} />
              )}
              {thirdYear && (
                <Table year={3} data={thirdYear} stateLift={setThirdYear} />
              )}
            </div>
          </div>

          <div className="home-curiculum">
            <div className="home-curriculum-dyanmic">
              <Calculate
                curriculum_id={curriculumState}
                curriculum={curiculum}
                type={type}
                subject={[...firstYear, ...secondYear, ...thirdYear]}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
