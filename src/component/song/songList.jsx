/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import SongService from "../../services/songService";
import { Modal } from "bootstrap";

const SongList = () => {
    const [song, setSong] = useState([]);
    useEffect(() => {
        async function getAllSong() {
            let listSong = await SongService.getAllSong();
            setSong(listSong.data);
            console.log(listSong);
        }
        getAllSong();
    }, [])


    return (
        <>
            <div className="container justify-content-center">
                <div className="row mt-4">
                    {song.map(item =>
                    (
                        <>
                            <div key={item.id} className="col mb-4"
                                style={{ cursor: 'pointer' }}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                < div className="card" style={{ width: "18rem" }}>
                                    <img src={item.avatar} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title text-danger">{item.title}</h5>
                                        <p className="card-text fst-italic"> {item.author} </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex={-1}
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">
                                                Modal title
                                            </h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">...</div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Close
                                            </button>
                                            <button type="button" className="btn btn-primary">
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                    )
                    )}
                </div>
            </div>


        </>
    )
}

export default SongList;