import React, {useState} from 'react';

function AssignStuff(props) {
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
        <div>

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

        </div>
    );
}

export default AssignStuff;
