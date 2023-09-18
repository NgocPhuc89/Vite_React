import { useState } from "react";
import { SingerList } from "./SingerList";
import StudentList from "./StudentList";

const UseEffect = () => {
    const [ListSinger, setListSinger] = useState(false)
    const [student, setSudent] = useState(false);
    return (
        <>
            <button className="btn btn-primary" onClick={() => setListSinger(!ListSinger)}>
                Singer List
            </button>
            {ListSinger && <SingerList />}
            <button className="btn btn-primary" onClick={() => setSudent(!student)}>
                Student List
            </button>
            {student && <StudentList />}
        </>
    )
}

export default UseEffect;