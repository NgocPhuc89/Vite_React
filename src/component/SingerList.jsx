/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useState } from "react"


function SingerList() {
    const [singerList, setSingerList] = useState([
        "Bằng Kiều", "Tùng Dương"
    ])
    const [name, setName] = useState('');
    const [editName, setEditName] = useState('')
    const [index, setIndex] = useState(null)

    const addSinger = (e) => {
        e.preventDefault();
        if (name.trim() !== '') {
            setSingerList([
                ...singerList,
                name]);
            setName('')
        }

    }

    const editSinger = (e) => {
        e.preventDefault();
        if (editName.trim() !== '') {
            const updateSinger = [...singerList];
            updateSinger[index] = editName;
            setSingerList(updateSinger);
            setEditName('');
            document.getElementById("add").style.display = "block";
            document.getElementById("edit").style.display = "none";
        }

    }

    const showEditSinger = (edit, index) => {
        setEditName(edit);
        setIndex(index)
        document.getElementById("add").style.display = "none";
        document.getElementById("edit").style.display = "block";
    }

    const deleteSinger = (removeSinger) => {
        let confirm = window.confirm("Bạn Chắc Chắn Muốn Xóa Ca Sĩ  " + removeSinger + " Khỏi Danh Sách ?")
        if (!confirm) return;
        setSingerList((prev) => {
            let newSingerList = prev.filter((item) => item != removeSinger)
            return newSingerList;
        })
    }

    return (
        <div>
            <h2 className="text-primary">Singer List</h2>
            <form onSubmit={addSinger} id="add" >
                <div className="form-group d-flex align-items-center">
                    <input type="text" className="form-control me-3"
                        onInput={(e) => setName(e.target.value)}
                        value={name} />
                    <button id="addInput" type="submit" className="btn btn-primary ">
                        <i className="fa fa-plus me-1" />Add
                    </button>
                </div>
            </form>
            <form onSubmit={editSinger} id="edit" >
                <div className="form-group d-flex align-items-center">
                    <input type="text" className="form-control me-3"
                        onInput={(e) => setEditName(e.target.value)}
                        value={editName} />
                    <button id="addInput" type="submit" className="btn btn-primary ">
                        <i className="fa fa-pen me-1" />Edit
                    </button>
                </div>
            </form>
            <ul className="list-group mt-3">
                {
                    singerList.map((singer, index) => (
                        <li key={index} className="list-group-item list-group-item-info d-flex justify-content-between">
                            {singer}
                            <span>
                                <i role="button" className="fa fa-pen me-3 btn btn-success"
                                    onClick={() => showEditSinger(singer, index)} />
                                <i role="button" className="fa fa-trash me-1 btn btn-danger"
                                    onClick={() => deleteSinger(singer)} />
                            </span>
                        </li>
                    ))
                }
            </ul>
        </div >
    )
}

export { SingerList }