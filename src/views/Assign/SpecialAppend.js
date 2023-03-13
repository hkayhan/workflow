import React, {useState} from "react";
import '../../assets/css/Main.css'
import { HalfMalf } from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css'


function SpecialAppend() {

    const [stuffTypes, setStuffTypes]=useState([{"id":1,"name":"Özel Atama"},
        {"id":2,"name":"Görevli Atama"},
        {"id":3,"name":"Havuz Görevlilerini Atama"}])
    const [selectedStuffType, setSelectedStuffType]=useState([])

    const [exams, setExams]=useState([
        {"id":1,"name":"Aof Ara Dönem Sınavı"},
        {"id":2,"name":"Aof Final Sınavı"},
        {"id":3,"name":"SPL"}])
    const [selectedExam, setSelectedExam]=useState([])


    const [sessions, setSessions]=useState([{"id":1,"name":"Oturum 1"},
        {"id":2,"name":"Oturum 2"},
        {"id":3,"name":"Oturum 3"}])


    const selectStuffType = (type) => {
        setSelectedStuffType(type)
    }

    const selectExam = (exam) => {
        setSelectedExam(exam)
    }



    return (
        <div className="container p-2 my-3">
            <div className={"container "}>
                <div className="row">
                    <div className="dropdown col-2">
                        <button className="btn btn-warning btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {selectedStuffType.id!==undefined ? selectedStuffType.name : "Görevli Tipi Seçiniz" }
                        </button>
                        <ul className="dropdown-menu">
                            {stuffTypes.map((s,index)=>
                                <li onClick={()=>selectStuffType(s)} className={"dropdown-item pointer"}>{s.name}</li>
                            )}
                        </ul>
                    </div>

                    {selectedStuffType.id!==undefined &&<div className="dropdown col-2">
                        <button className="btn btn-warning   btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            {selectedExam.id !== undefined ? selectedExam.name : "Sınav Seçiniz"}
                        </button>
                        <ul className="dropdown-menu">
                            {exams.map((s, index) =>
                                <li onClick={() => selectExam(s)} className={"dropdown-item pointer"}>{s.name}</li>
                            )}
                        </ul>
                    </div>}

                    <div className="row mt-2">
                        {
                            selectedExam.id!==undefined&&
                            <div className="input-group mb-3">

                                {sessions.map((s, index) =>
                                    <div className="input-group-text mx-1">
                                        <input className="form-check-input mt-0" type="checkbox" value=""
                                               aria-label="Checkbox for following text input"/>
                                        <span className={"p-1"}> {s.name} </span>
                                    </div>)
                                }

                            </div>
                        }

                    </div>
                </div>

            </div>


            <div className="form-group">
                <h4>
                    <label htmlFor="dataInputArea">Sınava Ait Eklenecek Kişiler</label>
                </h4>
                <textarea className="form-control" id="tcArea" rows="3"/>
            </div>
            <button className={"btn btn-secondary mt-1 float-end"}>Kişileri Ekle</button>





                <table className="table table-striped mt-1">
                    <thead>
                    <tr>
                        <th scope="col">Ekli Kişiler</th>
                    </tr>
                    </thead>
                    <tbody id={"table-names"}>




                    </tbody>
                </table>

        </div>

    );
}

export default SpecialAppend;